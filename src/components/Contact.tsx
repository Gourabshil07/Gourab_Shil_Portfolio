import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle, ExternalLink, Github, Linkedin, Instagram, Facebook, X } from 'lucide-react';
import { PERSONAL_INFO, SOCIAL_LINKS } from '../data/portfolioData';
import { isDisposableEmail } from '../utils/emailValidator';

interface FormState {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  honeypot: string; // Anti-bot trap
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState<FormState>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    honeypot: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [serverDetails, setServerDetails] = useState<string>('');

  // Auto-dismiss success notification after 5 seconds
  useEffect(() => {
    if (submitStatus === 'success') {
      const timer = setTimeout(() => {
        setSubmitStatus('idle');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [submitStatus]);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim() || formData.name.trim().length < 2) {
      newErrors.name = 'Please enter your full name (at least 2 characters).';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Please enter your email address.';
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address.';
    } else if (isDisposableEmail(formData.email.trim())) {
      newErrors.email = 'Temporary or disposable email addresses are not accepted. Please use a permanent email address.';
    }

    if (!formData.subject.trim() || formData.subject.trim().length < 2) {
      newErrors.subject = 'Please enter a subject.';
    }

    if (!formData.message.trim() || formData.message.trim().length < 10) {
      newErrors.message = 'Please enter a message (at least 10 characters).';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear field-specific error as user types
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');
    setServerDetails('');

    let sent = false;

    // Tier 1: Try local Express / Vercel / Netlify Serverless API endpoint
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      // Check if response is valid JSON (not an HTML 404/SPA fallback page from Netlify/Vercel)
      const contentType = response.headers.get('content-type') || '';
      if (contentType.includes('application/json')) {
        const data = await response.json();
        if (response.ok && data?.success) {
          sent = true;
        } else if (response.status === 400 || response.status === 429) {
          // Client validation or rate limit error from backend
          setSubmitStatus('error');
          setErrorMessage(data?.error || 'Validation error. Please check your inputs.');
          setIsSubmitting(false);
          return;
        }
      }
    } catch (apiErr) {
      console.warn('Local/Serverless /api/contact fetch failed, attempting resilient direct relay...', apiErr);
    }

    // Tier 2: Resilient direct fallback (for Netlify / Vercel static builds, GitHub Pages, or when backend API is not configured)
    if (!sent) {
      try {
        const targetEmail = PERSONAL_INFO.email || 'gourabshil07@gmail.com';
        const fallbackRes = await fetch(`https://formsubmit.co/ajax/${targetEmail}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify({
            name: formData.name.trim(),
            email: formData.email.trim(),
            phone: formData.phone.trim() || 'Not provided',
            _subject: `[Portfolio Contact] ${formData.subject.trim()}`,
            message: formData.message.trim(),
            _template: 'table',
            _captcha: 'false',
          }),
        });

        if (fallbackRes.ok) {
          const fallbackData = await fallbackRes.json().catch(() => null);
          if (fallbackData?.success === 'true' || fallbackData?.success === true || fallbackRes.status === 200) {
            sent = true;
          }
        }
      } catch (fallbackErr) {
        console.warn('Fallback direct relay error:', fallbackErr);
      }
    }

    if (sent) {
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        honeypot: '',
      });
    } else {
      setSubmitStatus('error');
      setErrorMessage(
        'Unable to send automatically. Please use the button below to send your message directly via email.'
      );
    }
    setIsSubmitting(false);
  };

  const getDirectMailtoUrl = () => {
    const sub = encodeURIComponent(formData.subject ? `[Portfolio Contact] ${formData.subject}` : 'Connecting via Portfolio');
    const body = encodeURIComponent(
      `Hi Gourab,\n\n${formData.message || 'I came across your portfolio and would like to connect.'}\n\nName: ${formData.name || ''}\nEmail: ${formData.email || ''}\nPhone: ${formData.phone || ''}`
    );
    return `mailto:${PERSONAL_INFO.email}?subject=${sub}&body=${body}`;
  };

  return (
    <section
      id="contact"
      className="pt-6 pb-14 sm:pt-8 sm:pb-16 md:pt-10 md:pb-20 relative bg-[#0B132B] text-slate-100"
    >
      {/* Floating Pop-up Notification for Successful Submission */}
      {submitStatus === 'success' && (
        <div
          role="status"
          aria-live="polite"
          className="fixed top-20 right-4 sm:right-8 z-50 max-w-[calc(100vw-2rem)] sm:max-w-md p-4 sm:p-5 rounded-xl backdrop-blur-md border shadow-2xl flex items-start gap-3.5 animate-in slide-in-from-top-3 fade-in duration-300 bg-[#0C1425]/95 border-emerald-500/40 shadow-black/80 text-white"
        >
          <div className="w-9 h-9 rounded-lg bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-500 shrink-0 mt-0.5">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div className="flex-1 pr-1">
            <h4 className="text-sm sm:text-base font-bold mb-1 text-slate-100">
              Message sent successfully!
            </h4>
            <p className="text-xs sm:text-sm leading-relaxed text-slate-300 font-light">
              Thank you for reaching out. Your message has been delivered, and I’ll get back to you shortly.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setSubmitStatus('idle')}
            className="p-1 -mr-1 -mt-1 rounded-md transition-colors cursor-pointer text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
            aria-label="Close notification"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="flex items-center gap-2 mb-3">
            <span className="font-mono text-xs font-bold tracking-widest uppercase text-sky-400">
              04 / GET IN TOUCH
            </span>
            <div className="h-px w-12 bg-sky-500/40" />
          </div>
          <h2 className="font-serif italic text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal leading-[1.2] mb-4 text-white">
            &ldquo;Good work starts with a clear conversation.&rdquo;
          </h2>
          <p className="text-base sm:text-lg text-slate-300 font-light leading-relaxed">
            Have an opportunity, a project, or simply want to connect? Send me a message below.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Direct Contact Info & Socials */}
          <div className="lg:col-span-5 space-y-8">
            <div className="p-7 sm:p-8 rounded-2xl border space-y-6 bg-[#0F172A] border-slate-800">
              <div className="flex items-center justify-between">
                <h3 className="font-serif text-xl sm:text-2xl font-normal tracking-tight text-white">
                  Direct Contact Information
                </h3>
              </div>

              <div className="space-y-4">
                {/* Email */}
                <a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  className="group flex items-start gap-4 p-3.5 rounded-xl border transition-colors bg-slate-800/40 hover:bg-slate-800/90 border-slate-800 hover:border-sky-500/40"
                >
                  <div className="w-10 h-10 rounded-lg border flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform bg-sky-500/10 border-sky-500/20 text-sky-400">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-mono text-[11px] block uppercase font-semibold text-slate-400">
                      Email
                    </span>
                    <span className="text-sm sm:text-base font-semibold transition-colors break-all text-white group-hover:text-sky-300">
                      {PERSONAL_INFO.email}
                    </span>
                  </div>
                </a>

                {/* Phone (Non-clickable) */}
                <div className="flex items-start gap-4 p-3.5 rounded-xl border bg-slate-800/40 border-slate-800">
                  <div className="w-10 h-10 rounded-lg border flex items-center justify-center shrink-0 bg-teal-500/10 border-teal-500/20 text-teal-400">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-mono text-[11px] block uppercase font-semibold text-slate-400">
                      Phone
                    </span>
                    <span className="text-sm sm:text-base font-semibold select-all text-white">
                      {PERSONAL_INFO.phone}
                    </span>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-start gap-4 p-3.5 rounded-xl border bg-slate-800/20 border-slate-800/80">
                  <div className="w-10 h-10 rounded-lg border flex items-center justify-center shrink-0 bg-indigo-500/10 border-indigo-500/20 text-indigo-400">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-mono text-[11px] block uppercase font-semibold text-slate-400">
                      Location
                    </span>
                    <span className="text-sm sm:text-base font-semibold text-slate-200">
                      Bankura, West Bengal
                    </span>
                    <span className="block text-xs font-mono text-slate-400">
                      India · 722162
                    </span>
                  </div>
                </div>
              </div>

              {/* Social Channels */}
              <div className="pt-6 border-t border-slate-800">
                <span className="font-mono text-xs block mb-3 uppercase tracking-wider font-bold text-slate-400">
                  Find Me Online
                </span>
                <div className="flex flex-wrap gap-2.5">
                  {SOCIAL_LINKS.filter((s) => s.name !== 'Email' && s.name !== 'Phone').map((item) => (
                    <a
                      key={item.name}
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={item.ariaLabel}
                      className="p-2.5 rounded-lg border transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 bg-slate-800/70 border-slate-700/80 text-slate-300 hover:text-white hover:border-sky-400/60 hover:bg-slate-800"
                    >
                      {item.icon === 'github' && <Github className="w-4 h-4" />}
                      {item.icon === 'linkedin' && <Linkedin className="w-4 h-4" />}
                      {item.icon === 'instagram' && <Instagram className="w-4 h-4" />}
                      {item.icon === 'facebook' && <Facebook className="w-4 h-4" />}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-9 rounded-2xl border relative bg-[#0F172A] border-slate-800">
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                {/* Honeypot field (hidden from genuine users, catches automated spam bots) */}
                <div className="hidden" aria-hidden="true">
                  <label htmlFor="honeypot">Leave this blank</label>
                  <input
                    type="text"
                    id="honeypot"
                    name="honeypot"
                    value={formData.honeypot}
                    onChange={handleChange}
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Full Name */}
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-xs font-mono font-bold mb-1.5 text-slate-300"
                    >
                      Full Name <span className="text-sky-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Jane Doe"
                      disabled={isSubmitting}
                      className={`w-full px-4 py-2.5 rounded-lg border text-sm transition-colors focus:outline-none focus:ring-1 focus:ring-sky-500 bg-[#080D18] border-slate-700/80 text-white placeholder:text-slate-500 focus:border-sky-500 ${errors.name ? 'border-rose-500' : ''}`}
                    />
                    {errors.name && <p className="mt-1 text-xs text-rose-500 font-mono">{errors.name}</p>}
                  </div>

                  {/* Email Address */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-xs font-mono font-bold mb-1.5 text-slate-300"
                    >
                      Email Address <span className="text-sky-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="jane@company.com"
                      disabled={isSubmitting}
                      className={`w-full px-4 py-2.5 rounded-lg border text-sm transition-colors focus:outline-none focus:ring-1 focus:ring-sky-500 bg-[#080D18] border-slate-700/80 text-white placeholder:text-slate-500 focus:border-sky-500 ${errors.email ? 'border-rose-500' : ''}`}
                    />
                    {errors.email && <p className="mt-1 text-xs text-rose-500 font-mono">{errors.email}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Subject */}
                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-xs font-mono font-bold mb-1.5 text-slate-300"
                    >
                      Subject <span className="text-sky-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Opportunity / Project inquiry"
                      disabled={isSubmitting}
                      className={`w-full px-4 py-2.5 rounded-lg border text-sm transition-colors focus:outline-none focus:ring-1 focus:ring-sky-500 bg-[#080D18] border-slate-700/80 text-white placeholder:text-slate-500 focus:border-sky-500 ${errors.subject ? 'border-rose-500' : ''}`}
                    />
                    {errors.subject && <p className="mt-1 text-xs text-rose-500 font-mono">{errors.subject}</p>}
                  </div>

                  {/* Phone (Optional) */}
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-xs font-mono font-bold mb-1.5 text-slate-300"
                    >
                      Phone Number <span className="text-slate-500 font-normal">(Optional)</span>
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91..."
                      disabled={isSubmitting}
                      className="w-full px-4 py-2.5 rounded-lg border text-sm transition-colors focus:outline-none focus:ring-1 focus:ring-sky-500 bg-[#080D18] border-slate-700/80 text-white placeholder:text-slate-500 focus:border-sky-500"
                    />
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-xs font-mono font-bold mb-1.5 text-slate-300"
                  >
                    Message <span className="text-sky-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell me about the role, project, or topic you'd like to discuss..."
                    disabled={isSubmitting}
                    className={`w-full px-4 py-3 rounded-lg border text-sm transition-colors resize-y focus:outline-none focus:ring-1 focus:ring-sky-500 bg-[#080D18] border-slate-700/80 text-white placeholder:text-slate-500 focus:border-sky-500 ${errors.message ? 'border-rose-500' : ''}`}
                  />
                  {errors.message && <p className="mt-1 text-xs text-rose-500 font-mono">{errors.message}</p>}
                </div>

                {/* Status Banners */}
                {submitStatus === 'error' && (
                  <div className="p-4 rounded-xl border text-sm flex flex-col gap-3 animate-in fade-in duration-300 bg-rose-950/50 border-rose-800/80 text-rose-300">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                      <div>
                        <p className="font-bold">{errorMessage}</p>
                        {serverDetails && (
                          <p className="text-xs mt-1 text-rose-400/80">
                            {serverDetails}
                          </p>
                        )}
                      </div>
                    </div>
                    
                    {/* Instant Direct Email Fallback */}
                    <div className="pt-2 border-t flex items-center justify-between border-rose-900/60">
                      <span className="text-xs text-slate-300">
                        Need immediate contact?
                      </span>
                      <a
                        href={getDirectMailtoUrl()}
                        className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-sky-400 hover:text-sky-300 underline underline-offset-2"
                      >
                        <span>Open in Email App</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                )}

                {/* Submit Button & Direct Option */}
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3 rounded-lg font-bold text-sm transition-all duration-200 shadow-md cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed bg-sky-500 hover:bg-sky-400 text-[#080D18] shadow-sky-950/30"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                        <span>Sending Message...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>

                  <a
                    href={`mailto:${PERSONAL_INFO.email}`}
                    className="text-xs font-mono transition-colors flex items-center gap-1 text-slate-400 hover:text-sky-400"
                  >
                    <span>Or email directly: {PERSONAL_INFO.email}</span>
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};


