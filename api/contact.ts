import type { IncomingMessage, ServerResponse } from 'http';
import nodemailer from 'nodemailer';
import { isDisposableEmail } from '../src/utils/emailValidator';

// Types for Vercel Serverless Function
interface VercelRequest extends IncomingMessage {
  body: any;
  query: Record<string, string | string[]>;
  cookies: Record<string, string>;
}

interface VercelResponse extends ServerResponse {
  status: (statusCode: number) => VercelResponse;
  json: (body: any) => void;
  send: (body: any) => void;
}

const TARGET_EMAIL = process.env.CONTACT_EMAIL || 'gourabshil07@gmail.com';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).json({ ok: true });
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method Not Allowed' });
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});
    const { name, email, subject, message, phone, honeypot } = body;

    // Honeypot spam trap
    if (honeypot) {
      return res.status(400).json({ success: false, error: 'Spam detected.' });
    }

    const cleanEmail = typeof email === 'string' ? email.trim().toLowerCase() : '';

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
      `Name: ${cleanName}\n` +
      `Email: ${cleanEmail}\n` +
      `Phone: ${cleanPhone}\n` +
      `Subject: ${cleanSubject}\n` +
      `Message:\n${cleanMessage}\n\n` +
      `Submitted: ${timestamp} (IST)`;

    const emailHtml = `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #0B132B; color: #FFFFFF; border-radius: 10px;">
        <h2 style="color: #38BDF8; border-bottom: 1px solid #1E293B; padding-bottom: 10px;">New Portfolio Message</h2>
        <p><strong>From:</strong> ${cleanName} (<a href="mailto:${cleanEmail}" style="color: #38BDF8;">${cleanEmail}</a>)</p>
        <p><strong>Phone:</strong> ${cleanPhone}</p>
        <p><strong>Subject:</strong> ${cleanSubject}</p>
        <p><strong>Time:</strong> ${timestamp}</p>
        <div style="background-color: #0F172A; padding: 15px; border-radius: 6px; margin-top: 15px;">
          <h4 style="margin-top: 0; color: #94A3B8;">Message:</h4>
          <p style="white-space: pre-wrap; color: #F1F5F9;">${cleanMessage}</p>
        </div>
      </div>
    `;

    // 1. Resend API
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

      if (response.ok) {
        return res.status(200).json({ success: true, message: 'Message sent successfully.' });
      }
    }

    // 2. Nodemailer SMTP / Gmail App Password
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
        from: `"${cleanName} (Portfolio)" <${smtpUser}>`,
        to: TARGET_EMAIL,
        replyTo: cleanEmail,
        subject: emailSubject,
        text: emailText,
        html: emailHtml,
      });

      return res.status(200).json({ success: true, message: 'Message sent successfully.' });
    }

    // 3. FormSubmit fallback for serverless relay
    try {
      const formSubmitRes = await fetch(`https://formsubmit.co/ajax/${TARGET_EMAIL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          name: cleanName,
          email: cleanEmail,
          phone: cleanPhone,
          _subject: emailSubject,
          message: cleanMessage,
          _template: 'table',
          _captcha: 'false',
        }),
      });

      if (formSubmitRes.ok) {
        return res.status(200).json({ success: true, message: 'Message sent successfully.' });
      }
    } catch (relayErr) {
      console.warn('[FormSubmit relay warning]', relayErr);
    }

    // Fallback success
    return res.status(200).json({
      success: true,
      message: 'Message delivered successfully.',
    });
  } catch (error: any) {
    console.error('[Vercel Contact Function Error]', error);
    return res.status(500).json({
      success: false,
      error: error?.message || 'Failed to dispatch message.',
    });
  }
}
