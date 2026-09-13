import React from 'react';
import { Mail, Github, Linkedin, Instagram, Facebook } from 'lucide-react';
import { PERSONAL_INFO, SOCIAL_LINKS } from '../data/portfolioData';
import { TabId } from '../types';

interface FooterProps {
  onSelectTab?: (tab: TabId) => void;
  isLight?: boolean;
}

export const Footer: React.FC<FooterProps> = ({ onSelectTab }) => {
  const handleTabClick = (tab: TabId) => {
    if (onSelectTab) {
      onSelectTab(tab);
    }
  };

  const col1Links = SOCIAL_LINKS.filter((s) => ['GitHub', 'LinkedIn', 'Instagram'].includes(s.name));
  const col2Links = SOCIAL_LINKS.filter((s) => ['Facebook', 'Email'].includes(s.name));

  const renderSocialLink = (s: typeof SOCIAL_LINKS[0]) => (
    <li key={s.name}>
      <a
        href={s.url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={s.ariaLabel}
        className="inline-flex items-center gap-2.5 transition-all duration-150 group py-1 w-full text-slate-600 hover:text-slate-950"
      >
        <span className="w-6 h-6 rounded-md border flex items-center justify-center transition-all duration-200 shrink-0 bg-white border-slate-200 text-slate-700 group-hover:bg-slate-900 group-hover:text-white group-hover:border-slate-900 shadow-sm">
          {s.icon === 'github' && <Github className="w-3.5 h-3.5" />}
          {s.icon === 'linkedin' && <Linkedin className="w-3.5 h-3.5" />}
          {s.icon === 'instagram' && <Instagram className="w-3.5 h-3.5" />}
          {s.icon === 'facebook' && <Facebook className="w-3.5 h-3.5" />}
          {s.icon === 'mail' && <Mail className="w-3.5 h-3.5" />}
        </span>
        <span className="font-mono text-xs truncate tracking-wide font-medium">{s.name}</span>
      </a>
    </li>
  );

  return (
    <footer className="border-t pt-5 sm:pt-6 pb-4 sm:pb-5 transition-colors duration-200 bg-[#F8FAFC] text-slate-700 border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Desktop 3-column / Mobile clean 2-card layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-8 pb-4 sm:pb-5 border-b border-slate-200">
          {/* Column 1: LET'S CONNECT */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h4 className="font-mono text-[10px] sm:text-[11px] font-bold tracking-[0.2em] uppercase mb-1.5 sm:mb-2 text-sky-600">
              LET&apos;S CONNECT
            </h4>
            <p className="text-base sm:text-lg font-bold font-sans tracking-tight leading-snug mb-1.5 sm:mb-2 text-slate-900">
              Have something in mind? Let&apos;s build.
            </p>
            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              className="inline-flex items-center gap-1.5 font-mono text-xs sm:text-[13px] font-semibold transition-colors group text-sky-600 hover:text-sky-800"
            >
              <Mail className="w-3.5 h-3.5 transition-colors" />
              <span className="group-hover:underline underline-offset-2">{PERSONAL_INFO.email}</span>
            </a>
          </div>

          {/* Column 2: CONTACT DETAILS */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h4 className="font-mono text-[10px] sm:text-[11px] font-bold tracking-[0.2em] uppercase mb-1.5 sm:mb-2 text-slate-900">
              CONTACT DETAILS
            </h4>
            <div className="space-y-1 text-xs sm:text-sm font-mono">
              <p>
                <a
                  href={`tel:${PERSONAL_INFO.phone.replace(/\s+/g, '')}`}
                  className="transition-colors inline-block tracking-tight font-medium text-slate-700 hover:text-sky-600"
                >
                  {PERSONAL_INFO.phone}
                </a>
              </p>
              <p>
                <a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  className="transition-colors inline-block tracking-tight font-medium text-slate-700 hover:text-sky-600"
                >
                  {PERSONAL_INFO.email}
                </a>
              </p>
              <div className="text-[11px] sm:text-xs leading-tight font-sans font-normal pt-0.5 text-slate-500">
                <p>Bankura, West Bengal, India · 722162</p>
              </div>
            </div>
          </div>

          {/* Column 3: FIND ME ONLINE - Hidden on mobile phones, shown on md+ screens */}
          <div className="hidden md:flex flex-col items-start text-left">
            <h4 className="font-mono text-[11px] font-bold tracking-[0.2em] uppercase mb-2 text-slate-900">
              FIND ME ONLINE
            </h4>
            <div className="grid grid-cols-2 gap-6 text-sm w-full">
              <ul className="space-y-1">
                {col1Links.map(renderSocialLink)}
              </ul>
              <ul className="space-y-1">
                {col2Links.map(renderSocialLink)}
              </ul>
            </div>
          </div>
        </div>

        {/* Footer Navigation Bar - Hidden on mobile phones, shown on md+ screens */}
        <div className="hidden md:block py-2.5 sm:py-3 border-b border-slate-200">
          <nav aria-label="Footer quick navigation" className="flex items-center justify-start gap-1.5 w-full py-0.5 font-mono">
            <span className="text-[11px] shrink-0 uppercase tracking-wider mr-1 font-semibold text-slate-500">
              Jump to tab:
            </span>
            <div className="flex items-center justify-start gap-1.5 shrink-0">
              {[
                { label: 'Home', tab: 'home' as TabId },
                { label: 'About', tab: 'about' as TabId },
                { label: 'Projects', tab: 'projects' as TabId },
                { label: 'Skills', tab: 'skills' as TabId },
                { label: 'Contact', tab: 'contact' as TabId },
              ].map((item) => (
                <button
                  key={item.tab}
                  type="button"
                  onClick={() => handleTabClick(item.tab)}
                  className="px-2.5 py-1 rounded text-xs font-mono font-medium border transition-all duration-150 cursor-pointer whitespace-nowrap text-slate-600 hover:text-slate-900 hover:bg-white border-transparent hover:border-slate-300 shadow-sm"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </nav>
        </div>

        {/* Footer Bottom - Compact on phone */}
        <div className="pt-2.5 sm:pt-3 flex flex-col sm:flex-row items-center justify-between gap-1.5 sm:gap-2 text-[10px] sm:text-[11px] font-mono text-slate-500">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.8)]" />
            <p className="tracking-wide font-medium">© 2026 GOURAB SHIL</p>
          </div>

          <div className="text-center sm:text-right">
            <p className="tracking-[0.18em] uppercase text-[9px] sm:text-[10px] font-bold text-slate-700">
              ADAPTABLE BY NATURE · FOCUSED ON OUTCOMES
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

