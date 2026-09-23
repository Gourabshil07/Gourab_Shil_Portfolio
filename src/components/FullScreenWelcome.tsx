import React, { useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { X, ArrowRight, MapPin, Sparkles } from 'lucide-react';
import gourabPhoto from '../assets/images/Gourab_Shil.png';
import { TabId } from '../types';

interface FullScreenWelcomeProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTab?: (tab: TabId) => void;
}

export const FullScreenWelcome: React.FC<FullScreenWelcomeProps> = ({
  isOpen,
  onClose,
  onSelectTab,
}) => {
  const shouldReduceMotion = useReducedMotion();

  // Close on Escape key press
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Lock screen completely while popup is open - matching ConnectModal's exact scroll-lock behavior
  useEffect(() => {
    if (!isOpen) return;

    const originalBodyOverflow = document.body.style.overflow;
    const originalBodyPosition = document.body.style.position;
    const originalBodyTop = document.body.style.top;
    const originalBodyLeft = document.body.style.left;
    const originalBodyRight = document.body.style.right;
    const originalBodyWidth = document.body.style.width;
    const originalBodyHeight = document.body.style.height;
    const originalHtmlOverflow = document.documentElement.style.overflow;
    const originalHtmlHeight = document.documentElement.style.height;
    const originalTouchAction = document.body.style.touchAction;

    // Hard freeze both documentElement and body
    document.documentElement.style.overflow = 'hidden';
    document.documentElement.style.height = '100%';
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.top = '0px';
    document.body.style.left = '0px';
    document.body.style.right = '0px';
    document.body.style.width = '100%';
    document.body.style.height = '100%';
    document.body.style.touchAction = 'none';

    // Intercept touch dragging, mouse wheel, and scroll keys
    const preventScrollAction = (e: Event) => {
      e.preventDefault();
    };

    const preventScrollKeys = (e: KeyboardEvent) => {
      const scrollKeys = ['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', ' '];
      if (scrollKeys.includes(e.key)) {
        e.preventDefault();
      }
    };

    window.addEventListener('wheel', preventScrollAction, { passive: false });
    window.addEventListener('touchmove', preventScrollAction, { passive: false });
    window.addEventListener('keydown', preventScrollKeys, { passive: false });

    return () => {
      document.documentElement.style.overflow = originalHtmlOverflow;
      document.documentElement.style.height = originalHtmlHeight;
      document.body.style.overflow = originalBodyOverflow;
      document.body.style.position = originalBodyPosition;
      document.body.style.top = originalBodyTop;
      document.body.style.left = originalBodyLeft;
      document.body.style.right = originalBodyRight;
      document.body.style.width = originalBodyWidth;
      document.body.style.height = originalBodyHeight;
      document.body.style.touchAction = originalTouchAction;
      window.removeEventListener('wheel', preventScrollAction);
      window.removeEventListener('touchmove', preventScrollAction);
      window.removeEventListener('keydown', preventScrollKeys);
    };
  }, [isOpen]);

  const handleEnter = (tab: TabId = 'home') => {
    if (onSelectTab) {
      onSelectTab(tab);
    }
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          id="welcome-card-overlay"
          role="dialog"
          aria-modal="true"
          aria-labelledby="welcome-card-title"
          className="fixed inset-0 z-[100] flex items-start justify-center pt-12 sm:pt-14 md:pt-16 p-4 overflow-hidden touch-none overscroll-none"
        >
          {/* Subtle blurred backdrop - matching ConnectModal */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-md touch-none overscroll-none"
            aria-hidden="true"
          />

          {/* Floating Greeting Modal Panel - Positioned upwards on hero section matching ConnectModal */}
          <motion.div
            id="welcome-card-modal"
            initial={
              shouldReduceMotion
                ? { opacity: 0 }
                : { opacity: 0, scale: 0.92, y: -8 }
            }
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={
              shouldReduceMotion
                ? { opacity: 0 }
                : { opacity: 0, scale: 0.94, y: -6 }
            }
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full max-w-sm sm:max-w-[420px] rounded-2xl sm:rounded-3xl bg-[#0B1329]/95 border border-sky-400/30 p-5 sm:p-7 shadow-[0_0_0_1px_rgba(56,189,248,0.25)] text-left select-none overflow-hidden backdrop-blur-2xl mx-auto mt-1 sm:mt-2"
          >
            {/* Ambient Sky Glow */}
            <div
              className="absolute -top-14 -right-14 w-40 h-40 rounded-full bg-sky-500/15 blur-3xl pointer-events-none"
              aria-hidden="true"
            />

            {/* Top Bar: Welcome Pill & Close Button */}
            <div className="flex items-center justify-between mb-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-400/25 text-[11px] font-mono font-medium text-sky-300 uppercase tracking-wider">
                <Sparkles className="w-3 h-3 text-sky-400 animate-pulse" />
                <span>Welcome</span>
              </div>

              {/* Close Button */}
              <button
                type="button"
                id="btn-close-welcome-card"
                onClick={onClose}
                className="p-1.5 rounded-full text-slate-400 hover:text-white bg-white/10 hover:bg-white/20 border border-white/10 transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
                aria-label="Close welcome card"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Profile Section: Photo, Name, and Location */}
            <div className="flex items-center gap-3.5 mb-4">
              <div className="relative shrink-0">
                <img
                  src={gourabPhoto}
                  alt="Gourab Shil"
                  className="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover border-2 border-sky-400/50 ring-4 ring-sky-400/15 shadow-sm"
                  referrerPolicy="no-referrer"
                />
                <span
                  className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-emerald-500 ring-2 ring-[#0B1329]"
                  title="Available"
                />
              </div>

              <div className="min-w-0">
                <h2
                  id="welcome-card-title"
                  className="text-lg sm:text-xl font-bold text-white tracking-tight truncate"
                >
                  Gourab Shil
                </h2>

                <div className="flex items-center gap-1 text-xs text-sky-200/90 mt-0.5 font-medium">
                  <MapPin className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                  <span className="truncate">Bankura, West Bengal, India</span>
                </div>
              </div>
            </div>

            {/* Welcoming Text Section */}
            <div className="border-t border-sky-500/20 pt-4 pb-2 mb-5">
              <h3 className="text-sm sm:text-base font-semibold text-sky-300 mb-1.5">
                Welcome to my digital world!
              </h3>
              <p className="text-xs sm:text-[13px] text-slate-200 leading-relaxed font-light">
                Delighted to have you here! Step into my digital workspace. Explore my journey, discover my projects, and see what I’ve been building.
              </p>
            </div>

            {/* Single Primary Action Button */}
            <div>
              <button
                type="button"
                id="btn-explore-portfolio"
                onClick={() => handleEnter('home')}
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-sky-500 via-sky-400 to-sky-500 hover:from-sky-400 hover:to-sky-300 text-slate-950 font-bold text-xs sm:text-sm transition-all duration-200 shadow-md shadow-sky-500/25 hover:shadow-sky-500/35 cursor-pointer hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
              >
                <span>Enter Portfolio</span>
                <ArrowRight className="w-4 h-4 text-slate-950" />
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
