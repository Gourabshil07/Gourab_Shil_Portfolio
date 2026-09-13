import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Terminal, ArrowUpRight } from 'lucide-react';
import { TabId } from '../types';

interface NavbarProps {
  activeTab: TabId;
  onSelectTab: (tab: TabId) => void;
}

const NAV_ITEMS: { label: string; tab: TabId }[] = [
  { label: 'Home', tab: 'home' },
  { label: 'About', tab: 'about' },
  { label: 'Projects', tab: 'projects' },
  { label: 'Skills', tab: 'skills' },
  { label: 'Contact', tab: 'contact' },
];

export const Navbar: React.FC<NavbarProps> = ({ activeTab, onSelectTab }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLightTheme, setIsLightTheme] = useState(false);
  const menuRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const evaluateTheme = () => {
      if (activeTab === 'about' || activeTab === 'skills') {
        setIsLightTheme(true);
        return;
      }
      if (activeTab === 'projects' || activeTab === 'contact') {
        setIsLightTheme(false);
        return;
      }

      // If activeTab === 'home', evaluate based on scroll position of sections
      if (typeof window !== 'undefined') {
        const probeY = 85; // directly beneath the fixed navbar
        const skillsEl = document.getElementById('home-skills-hook') || document.getElementById('skills-hook');
        if (skillsEl) {
          const rect = skillsEl.getBoundingClientRect();
          if (rect.top <= probeY && rect.bottom > probeY) {
            setIsLightTheme(true);
            return;
          }
        }

        const projectsEl = document.getElementById('home-projects-hook');
        if (projectsEl) {
          const rect = projectsEl.getBoundingClientRect();
          if (rect.top <= probeY && rect.bottom > probeY) {
            setIsLightTheme(false);
            return;
          }
        }

        const hookEl = document.getElementById('hook');
        if (hookEl) {
          const rect = hookEl.getBoundingClientRect();
          if (rect.top <= probeY && rect.bottom > probeY) {
            setIsLightTheme(true);
            return;
          }
        }
      }
      setIsLightTheme(false);
    };

    evaluateTheme();

    const handleScroll = () => {
      const scrolled = window.scrollY > 20;
      setIsScrolled(scrolled);
      evaluateTheme();
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', evaluateTheme, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', evaluateTheme);
    };
  }, [activeTab]);

  // Close menu on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };
    if (mobileMenuOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  // Close menu when clicking outside (clean behavior without full-page overlay)
  useEffect(() => {
    if (!mobileMenuOpen) return;
    const handleClickOutside = (e: MouseEvent | TouchEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [mobileMenuOpen]);

  const handleNavClick = (tab: TabId) => {
    onSelectTab(tab);
    setMobileMenuOpen(false);
  };

  return (
    <header
      id="site-header"
      ref={menuRef}
      className={`fixed z-50 transition-colors duration-200 ease-out ${
        mobileMenuOpen
          ? isLightTheme
            ? 'top-2.5 inset-x-2.5 sm:top-3 sm:inset-x-4 max-w-lg mx-auto rounded-2xl bg-[#F8FAFC]/94 backdrop-blur-md border border-slate-200/90 shadow-[0_4px_24px_-4px_rgba(15,23,42,0.08),0_2px_8px_-2px_rgba(15,23,42,0.04)] overflow-hidden pt-3 sm:pt-3.5 pb-2 sm:pb-2.5 md:top-0 md:inset-x-0 md:max-w-none md:rounded-none md:border-0 md:border-b md:border-slate-800/90 md:bg-[#0B111E]/90 md:shadow-lg md:shadow-black/30 md:py-3.5 md:sm:py-4'
            : 'top-0 left-0 right-0 bg-[#0B132B]/96 border-b border-slate-800/70 shadow-sm pt-3.5 sm:pt-4 pb-0 md:pb-3.5 md:sm:pb-4 md:bg-[#0B111E]/90 md:border-slate-800/90 md:shadow-lg md:shadow-black/30 backdrop-blur-md'
          : isScrolled
            ? 'top-0 left-0 right-0 py-3.5 sm:py-4 bg-[#0B111E]/90 border-b border-slate-800/90 shadow-lg shadow-black/30 backdrop-blur-md'
            : 'top-0 left-0 right-0 py-3.5 sm:py-4 bg-[#0B111E]/80 border-b border-slate-800/40 shadow-none backdrop-blur-md'
      }`}
    >
      <div
        className={`max-w-7xl mx-auto flex items-center justify-between ${
          mobileMenuOpen && isLightTheme
            ? 'px-3.5 pb-2 sm:px-4 sm:pb-2.5 md:px-4 md:py-0 md:sm:px-6 md:lg:px-8'
            : 'px-4 sm:px-6 lg:px-8'
        }`}
      >
        {/* Logo / Gourab Shil */}
        <button
          type="button"
          onClick={() => handleNavClick('home')}
          className="group flex items-center gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 rounded-lg p-1 text-left cursor-pointer"
          aria-label="Gourab Shil - Home"
        >
          <div
            className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors shadow-inner ${
              mobileMenuOpen && isLightTheme
                ? 'bg-sky-50 border border-sky-200/70 text-sky-600'
                : 'bg-slate-900 border border-slate-800 text-sky-400 group-hover:border-sky-500/50 group-hover:bg-slate-800'
            }`}
          >
            <Terminal className="w-4 h-4" />
          </div>
          <div className="flex flex-col">
            <span
              className={`font-semibold text-base tracking-tight transition-colors ${
                mobileMenuOpen && isLightTheme
                  ? 'text-slate-900'
                  : 'text-white group-hover:text-sky-300'
              }`}
            >
              Gourab Shil
            </span>
            <span
              className={`font-mono text-[10px] tracking-wider flex items-center gap-1.5 ${
                mobileMenuOpen && isLightTheme ? 'text-slate-500' : 'text-slate-400'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              OPEN TO WORK
            </span>
          </div>
        </button>

        {/* Desktop Navigation Tabs with Smooth Sliding Indicator */}
        <nav
          aria-label="Main sections"
          className="hidden md:flex items-center gap-1 p-1.5 rounded-full bg-slate-900/70 border border-slate-800/90 backdrop-blur-md shadow-inner relative"
        >
          {NAV_ITEMS.map((item) => {
            const isActive = activeTab === item.tab;
            return (
              <button
                key={item.label}
                type="button"
                onClick={() => handleNavClick(item.tab)}
                className={`relative px-4 py-1.5 rounded-full text-xs font-medium tracking-wide transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 cursor-pointer ${
                  isActive
                    ? 'text-white font-semibold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
                aria-current={isActive ? 'page' : undefined}
              >
                {isActive && (
                  <motion.div
                    layoutId="desktopNavActivePill"
                    className="absolute inset-0 bg-slate-800 rounded-full shadow-sm border border-slate-700/70"
                    transition={{
                      type: 'spring',
                      stiffness: 400,
                      damping: 32,
                    }}
                  />
                )}
                <span className="relative z-10">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right Section: Quick Contact CTA */}
        <div className="hidden md:flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => handleNavClick('contact')}
            className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-sky-400 hover:text-sky-300 border border-sky-500/30 hover:border-sky-400/60 bg-sky-500/5 hover:bg-sky-500/10 px-3.5 py-1.5 rounded-md transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 cursor-pointer"
          >
            <span>Let&apos;s Connect</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Mobile Action Area: Clean Integrated Hamburger / Close Button */}
        <div className="md:hidden flex items-center">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`p-2 rounded-lg transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 cursor-pointer ${
              mobileMenuOpen
                ? isLightTheme
                  ? 'bg-white/80 hover:bg-white text-slate-900 border border-slate-200/90 hover:border-slate-300 shadow-xs'
                  : 'bg-white/[0.05] text-slate-100 border border-white/10 hover:bg-white/[0.09]'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          >
            {mobileMenuOpen ? (
              <X className={`w-5 h-5 ${isLightTheme ? 'text-slate-900' : 'text-slate-100'}`} />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-navigation"
            role="navigation"
            aria-label="Mobile navigation"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className={`md:hidden overflow-hidden ${
              isLightTheme
                ? 'px-2.5 pt-1.5 pb-1 border-t border-slate-200/50'
                : 'px-4 sm:px-6 pt-2 pb-3.5'
            }`}
          >
            <div className="flex flex-col space-y-1">
              {NAV_ITEMS.map((item) => {
                const isActive = activeTab === item.tab;
                return (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => handleNavClick(item.tab)}
                    className={`relative w-full px-3 py-2 rounded-lg text-sm tracking-wide flex items-center justify-between transition-colors duration-150 cursor-pointer text-left ${
                      isLightTheme
                        ? isActive
                          ? 'text-slate-900 font-semibold'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-900/[0.03] font-medium'
                        : isActive
                          ? 'text-sky-300 font-semibold'
                          : 'text-slate-300 hover:text-white hover:bg-white/[0.04] font-medium'
                    }`}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="mobileNavActivePill"
                        className={`absolute inset-0 rounded-lg ${
                          isLightTheme
                            ? 'bg-white border border-slate-200/90 shadow-xs border-l-2 border-l-sky-500'
                            : 'bg-white/[0.06] border border-white/[0.08] shadow-[0_1px_2px_rgba(0,0,0,0.2)] border-l-2 border-l-sky-400'
                        }`}
                        transition={{
                          type: 'spring',
                          stiffness: 400,
                          damping: 32,
                        }}
                      />
                    )}
                    <span className="relative z-10">{item.label}</span>
                    {isActive && (
                      <span
                        className={`relative z-10 text-[10px] font-mono tracking-wider uppercase px-2 py-0.5 rounded ${
                          isLightTheme
                            ? 'bg-sky-50 text-sky-600 border border-sky-200/70 font-semibold'
                            : 'bg-sky-500/15 text-sky-400 border border-sky-500/30 font-semibold'
                        }`}
                      >
                        active
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
