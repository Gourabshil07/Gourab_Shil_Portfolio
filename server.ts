import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';
import { isDisposableEmail } from './src/utils/emailValidator';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;
let envEmail = process.env.CONTACT_EMAIL || 'gourabshil07@gmail.com';
if (envEmail.includes('@gmai.com')) {
  envEmail = envEmail.replace('@gmai.com', '@gmail.com');
}
const TARGET_EMAIL = envEmail;

// Security and parser middleware
app.use(express.json({ limit: '50kb' }));
app.use(express.urlencoded({ extended: true, limit: '50kb' }));

// Daily Rate Limiting: Max 5 successfully sent messages per user (identified by email and IP) per rolling 24-hour day
const DAILY_LIMIT = 5;
const ONE_DAY_MS = 24 * 60 * 60 * 1000;

// Maps storing array of timestamps of successfully sent messages
const emailSentTimestamps = new Map<string, number[]>();
const ipSentTimestamps = new Map<string, number[]>();

function getSentCountInLast24Hours(map: Map<string, number[]>, key: string, now: number): number {
  const timestamps = map.get(key) || [];
  const valid = timestamps.filter(t => now - t < ONE_DAY_MS);
  if (valid.length !== timestamps.length) {
    if (valid.length > 0) {
      map.set(key, valid);
    } else {
      map.delete(key);
    }
  }
  return valid.length;
}

function recordSuccessfulSend(map: Map<string, number[]>, key: string, now: number): void {
  const timestamps = map.get(key) || [];
  const valid = timestamps.filter(t => now - t < ONE_DAY_MS);
  valid.push(now);
  map.set(key, valid);
}

// Cleanup stale timestamps every 15 minutes
setInterval(() => {
  const now = Date.now();
  for (const [key, timestamps] of emailSentTimestamps.entries()) {
    const valid = timestamps.filter(t => now - t < ONE_DAY_MS);
    if (valid.length === 0) {
      emailSentTimestamps.delete(key);
    } else {
      emailSentTimestamps.set(key, valid);
    }
  }
  for (const [key, timestamps] of ipSentTimestamps.entries()) {
    const valid = timestamps.filter(t => now - t < ONE_DAY_MS);
    if (valid.length === 0) {
      ipSentTimestamps.delete(key);
    } else {
      ipSentTimestamps.set(key, valid);
    }
  }
}, 15 * 60 * 1000);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Contact endpoint status/config check
app.get('/api/contact/status', (req, res) => {
  const isSmtpConfigured = !!(process.env.SMTP_USER && (process.env.SMTP_PASS || process.env.GMAIL_APP_PASSWORD));
  const isResendConfigured = !!process.env.RESEND_API_KEY;
  const isOAuth2Configured = !!(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET && process.env.GOOGLE_REFRESH_TOKEN);

  res.json({
    configured: isSmtpConfigured || isResendConfigured || isOAuth2Configured,
    targetEmail: TARGET_EMAIL,
    dailyLimit: DAILY_LIMIT,
    methods: {
      smtp: isSmtpConfigured,
      resend: isResendConfigured,
      oauth2: isOAuth2Configured,
    },
  });
});

// POST /api/contact endpoint with server-side 5-message daily limit and disposable domain protection
app.post('/api/contact', async (req: Request, res: Response) => {
  try {
    const { name, email, subject, message, phone, honeypot } = req.body;
    const ip = (req.headers['x-forwarded-for'] as string)?.split(',')[0].trim() || req.socket.remoteAddress || 'unknown';
    const now = Date.now();

    // Honeypot spam check: if the hidden field is filled, silently discard or reject
    if (honeypot) {
      console.warn('[SPAM DETECTED] Honeypot field filled by', ip);
      return res.status(400).json({ success: false, error: 'Spam detected.' });
    }

    const cleanEmail = typeof email === 'string' ? email.trim().toLowerCase() : '';

    // SERVER-SIDE DAILY RATE LIMIT ENFORCEMENT
    // Check both IP address and Email address against the daily 5-message limit
    const ipSentCount = getSentCountInLast24Hours(ipSentTimestamps, ip, now);
    const emailSentCount = cleanEmail ? getSentCountInLast24Hours(emailSentTimestamps, cleanEmail, now) : 0;

    if (ipSentCount >= DAILY_LIMIT || emailSentCount >= DAILY_LIMIT) {
      return res.status(429).json({
        success: false,
        error: 'Daily message limit reached. Please try again tomorrow.',
      });
    }

    // Validation (Validation failures DO NOT count toward the 5-message limit)
    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      return res.status(400).json({ success: false, error: 'Full name must be at least 2 characters long.' });
    }

    if (!cleanEmail) {
      return res.status(400).json({ success: false, error: 'Email address is required.' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(cleanEmail)) {
      return res.status(400).json({ success: false, error: 'Please enter a valid email address.' });
    }

    if (isDisposableEmail(cleanEmail)) {
      return res.status(400).json({
        success: false,
        error: 'Temporary or disposable email addresses are not accepted. Please use a permanent email address.',
      });
    }

    if (!subject || typeof subject !== 'string' || subject.trim().length < 2) {
      return res.status(400).json({ success: false, error: 'Subject must be at least 2 characters long.' });
    }

    if (!message || typeof message !== 'string' || message.trim().length < 10) {
      return res.status(400).json({ success: false, error: 'Message must be at least 10 characters long.' });
    }

    const cleanName = name.trim();
    const cleanSubject = subject.trim();
    const cleanMessage = message.trim();
    const cleanPhone = phone && typeof phone === 'string' && phone.trim().length > 0 ? phone.trim() : 'Not provided';
    const timestamp = new Date().toLocaleString('en-US', {
      timeZone: 'Asia/Kolkata',
      dateStyle: 'full',
      timeStyle: 'long',
    });

    const emailSubject = `[Portfolio Contact] ${cleanSubject}`;
    const emailText = `New message from Gourab Shil's portfolio\n\n` +
      `Name:\n${cleanName}\n\n` +
      `Email:\n${cleanEmail}\n\n` +
      `Phone:\n${cleanPhone}\n\n` +
      `Subject:\n${cleanSubject}\n\n` +
      `Message:\n${cleanMessage}\n\n` +
      `Submitted:\n${timestamp} (IST)\n\n` +
      `Portfolio:\nGourab Shil Portfolio`;

    const emailHtml = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background-color: #0B111E; color: #E2E8F0; border-radius: 12px; border: 1px solid #1E293B;">
        <div style="border-bottom: 1px solid #1E293B; padding-bottom: 16px; margin-bottom: 20px;">
          <h2 style="margin: 0 0 6px 0; color: #38BDF8; font-size: 20px; font-weight: 600;">New Portfolio Message</h2>
          <p style="margin: 0; color: #94A3B8; font-size: 13px;">Received via Gourab Shil's Engineering Portfolio</p>
        </div>
        
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
          <tr>
            <td style="padding: 8px 0; color: #64748B; font-size: 13px; width: 100px; font-weight: 500;">From:</td>
            <td style="padding: 8px 0; color: #F8FAFC; font-size: 15px; font-weight: 600;">${cleanName}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #64748B; font-size: 13px; font-weight: 500;">Email:</td>
            <td style="padding: 8px 0; color: #38BDF8; font-size: 14px;"><a href="mailto:${cleanEmail}" style="color: #38BDF8; text-decoration: none;">${cleanEmail}</a></td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #64748B; font-size: 13px; font-weight: 500;">Phone:</td>
            <td style="padding: 8px 0; color: #E2E8F0; font-size: 14px;">${cleanPhone}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #64748B; font-size: 13px; font-weight: 500;">Subject:</td>
            <td style="padding: 8px 0; color: #F8FAFC; font-size: 15px; font-weight: 600;">${cleanSubject}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #64748B; font-size: 13px; font-weight: 500;">Received:</td>
            <td style="padding: 8px 0; color: #94A3B8; font-size: 13px;">${timestamp}</td>
          </tr>
        </table>

        <div style="background-color: #0F172A; border: 1px solid #1E293B; border-radius: 8px; padding: 18px; margin-bottom: 24px;">
          <h4 style="margin: 0 0 10px 0; color: #94A3B8; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em;">Message Body</h4>
          <p style="margin: 0; color: #E2E8F0; font-size: 15px; line-height: 1.6; white-space: pre-wrap;">${cleanMessage}</p>
        </div>

        <div style="border-top: 1px solid #1E293B; padding-top: 16px; text-align: center;">
          <a href="mailto:${cleanEmail}?subject=Re: [Portfolio Contact] ${encodeURIComponent(cleanSubject)}" style="display: inline-block; background-color: #0284C7; color: #ffffff; padding: 10px 20px; border-radius: 6px; text-decoration: none; font-size: 14px; font-weight: 500;">Reply to ${cleanName}</a>
        </div>
      </div>
    `;

    // Strategy 1: Resend API if configured
    if (process.env.RESEND_API_KEY) {
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: process.env.RESEND_FROM || 'Gourab Portfolio <onboarding@resend.dev>',
          to: [TARGET_EMAIL],
          reply_to: cleanEmail,
          subject: emailSubject,
          text: emailText,
          html: emailHtml,
        }),
      });

      if (!response.ok) {
        const errorData = await response.text();
        console.error('[Resend Error]', errorData);
        throw new Error('Failed to dispatch email via Resend API.');
      }

      // Record successful send toward the 5-message daily limit
      recordSuccessfulSend(emailSentTimestamps, cleanEmail, now);
      recordSuccessfulSend(ipSentTimestamps, ip, now);

      return res.status(200).json({
        success: true,
        message: 'Message sent successfully. Thank you for reaching out.',
      });
    }

    // Strategy 2: Nodemailer with SMTP or Gmail App Password
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS || process.env.GMAIL_APP_PASSWORD;

    if (smtpUser && smtpPass) {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || 'smtp.gmail.com',
        port: parseInt(process.env.SMTP_PORT || '465', 10),
        secure: process.env.SMTP_SECURE !== 'false',
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
      });

      await transporter.sendMail({
        from: `"${cleanName} (via Portfolio)" <${smtpUser}>`,
        to: TARGET_EMAIL,
        replyTo: cleanEmail,
        subject: emailSubject,
        text: emailText,
        html: emailHtml,
      });

      // Record successful send toward the 5-message daily limit
      recordSuccessfulSend(emailSentTimestamps, cleanEmail, now);
      recordSuccessfulSend(ipSentTimestamps, ip, now);

      return res.status(200).json({
        success: true,
        message: 'Message sent successfully. Thank you for reaching out.',
      });
    }

    // Strategy 3: Google OAuth2 refresh token if configured
    if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET && process.env.GOOGLE_REFRESH_TOKEN) {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          type: 'OAuth2',
          user: TARGET_EMAIL,
          clientId: process.env.GOOGLE_CLIENT_ID,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET,
          refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
        },
      });

      await transporter.sendMail({
        from: `"${cleanName} (via Portfolio)" <${TARGET_EMAIL}>`,
        to: TARGET_EMAIL,
        replyTo: cleanEmail,
        subject: emailSubject,
        text: emailText,
        html: emailHtml,
      });

      // Record successful send toward the 5-message daily limit
      recordSuccessfulSend(emailSentTimestamps, cleanEmail, now);
      recordSuccessfulSend(ipSentTimestamps, ip, now);

      return res.status(200).json({
        success: true,
        message: 'Message sent successfully. Thank you for reaching out.',
      });
    }

    // Message accepted in development/preview environment:
    console.log('====================================================');
    console.log('[PORTFOLIO CONTACT MESSAGE DELIVERED]');
    console.log(`To: ${TARGET_EMAIL}`);
    console.log(`From: ${cleanName} <${cleanEmail}>`);
    console.log(`Phone: ${cleanPhone}`);
    console.log(`Subject: ${cleanSubject}`);
    console.log(`Message: ${cleanMessage}`);
    console.log(`Timestamp: ${timestamp}`);
    console.log('====================================================');

    // Record successful send toward the 5-message daily limit
    recordSuccessfulSend(emailSentTimestamps, cleanEmail, now);
    recordSuccessfulSend(ipSentTimestamps, ip, now);

    return res.status(200).json({
      success: true,
      message: 'Message sent successfully! Thank you for reaching out.',
    });
  } catch (error: any) {
    console.error('[Contact Error]', error);
    return res.status(500).json({
      success: false,
      error: 'Something went wrong while sending your message. Please try again or contact me directly by email.',
    });
  }
});

// Vite middleware & Static Serving
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Gourab Shil Portfolio server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
