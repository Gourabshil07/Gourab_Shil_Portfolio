import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Linkedin, Instagram, Facebook } from 'lucide-react';
import { SOCIAL_LINKS } from '../data/portfolioData';

interface ConnectModalProps {
  onClose?: () => void;
}

export const ConnectModal: React.FC<ConnectModalProps> = ({ onClose }) => {
  // Open immediately on first render/reload without delay
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    // Keep page pinned to hero on load
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });

    const handleOpenEvent = () => setIsOpen(true);
    window.addEventListener('open-connect-modal', handleOpenEvent);

    return () => {
      window.removeEventListener('open-connect-modal', handleOpenEvent);
    };
  }, []);

  // Lock screen entirely while popup is open: prevent body/html scrolling, wheel, touchmove, and scroll keys
  useEffect(() => {
    if (!isOpen) return;

    const originalBodyOverflow = document.body.style.overflow;
    const originalBodyPosition = document.body.style.position;
    const originalBodyTop = document.body.style.top;
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
      document.body.style.width = originalBodyWidth;
      document.body.style.height = originalBodyHeight;
      document.body.style.touchAction = originalTouchAction;
      window.removeEventListener('wheel', preventScrollAction);
      window.removeEventListener('touchmove', preventScrollAction);
      window.removeEventListener('keydown', preventScrollKeys);
    };
  }, [isOpen]);

  const handleDismiss = () => {
    setIsOpen(false);
    if (onClose) onClose();
  };

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        handleDismiss();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Social links data
  const linkedinUrl =
    SOCIAL_LINKS.find((s) => s.name.toLowerCase() === 'linkedin')?.url ||
    'https://www.linkedin.com/in/gourab-shil-137004255/';
  const instagramUrl =
    SOCIAL_LINKS.find((s) => s.name.toLowerCase() === 'instagram')?.url ||
    'https://www.instagram.com/gourabshil07/?hl=en';
  const facebookUrl =
    SOCIAL_LINKS.find((s) => s.name.toLowerCase() === 'facebook')?.url ||
    'https://www.facebook.com/gourab.shil.728076';

  const socialPlatforms = [
    {
      name: 'LinkedIn',
      url: linkedinUrl,
      icon: Linkedin,
      btnClass:
        'bg-sky-500/10 border-sky-500/20 text-sky-400 hover:bg-sky-500 hover:text-slate-950 hover:border-sky-400 hover:shadow-lg hover:shadow-sky-500/25',
    },
    {
      name: 'Instagram',
      url: instagramUrl,
      icon: Instagram,
      btnClass:
        'bg-pink-500/10 border-pink-500/20 text-pink-400 hover:bg-pink-500 hover:text-white hover:border-pink-400 hover:shadow-lg hover:shadow-pink-500/25',
    },
    {
      name: 'Facebook',
      url: facebookUrl,
      icon: Facebook,
      btnClass:
        'bg-blue-500/10 border-blue-500/20 text-blue-400 hover:bg-blue-500 hover:text-white hover:border-blue-400 hover:shadow-lg hover:shadow-blue-500/25',
    },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          id="connect-modal-portal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="connect-modal-title"
          className="fixed inset-0 z-[100] flex items-start justify-center pt-20 sm:pt-24 md:pt-28 p-4 overflow-hidden touch-none overscroll-none"
        >
          {/* Subtle blurred backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={handleDismiss}
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-md touch-none overscroll-none"
            aria-hidden="true"
          />

          {/* Floating Minimal Modal Panel - Positioned upwards on hero section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: -6 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-sm rounded-2xl border bg-[#0F172A] border-slate-800/90 shadow-2xl shadow-sky-500/10 text-slate-100 p-6 sm:p-7 overflow-hidden z-10 text-center mx-auto select-none mt-2 sm:mt-4"
          >
            {/* Signature Technical Corner Accents */}
            <div className="absolute top-2.5 left-3 font-mono text-[9px] text-slate-600 select-none pointer-events-none">
              +
            </div>
            <div className="absolute top-2.5 right-3 font-mono text-[9px] text-slate-600 select-none pointer-events-none">
              +
            </div>
            <div className="absolute bottom-2.5 left-3 font-mono text-[9px] text-slate-600 select-none pointer-events-none">
              +
            </div>
            <div className="absolute bottom-2.5 right-3 font-mono text-[9px] text-slate-600 select-none pointer-events-none">
              +
            </div>

            {/* Close Button */}
            <button
              type="button"
              onClick={handleDismiss}
              className="absolute top-3.5 right-3.5 p-1.5 rounded-lg text-slate-400 hover:text-white bg-slate-900/80 hover:bg-slate-800 border border-slate-800/80 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 cursor-pointer"
              aria-label="Close popup"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Title: Let's connect */}
            <h2
              id="connect-modal-title"
              className="text-2xl sm:text-3xl font-bold tracking-tight text-white mt-1 mb-6"
            >
              Let&apos;s connect
            </h2>

            {/* 3 Icons in Horizontal Row */}
            <div className="flex items-center justify-center gap-4 sm:gap-5">
              {socialPlatforms.map((platform) => {
                const Icon = platform.icon;
                return (
                  <a
                    key={platform.name}
                    href={platform.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => {
                      // Allow link to open in new tab, then dismiss popup to unlock screen
                      handleDismiss();
                    }}
                    aria-label={platform.name}
                    title={platform.name}
                    className="group flex flex-col items-center gap-2 cursor-pointer focus:outline-none"
                  >
                    <div
                      className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center border transition-all duration-200 ${platform.btnClass}`}
                    >
                      <Icon className="w-6 h-6 sm:w-7 sm:h-7 transition-transform duration-200 group-hover:scale-110" />
                    </div>
                    <span className="text-xs font-mono text-slate-400 group-hover:text-white transition-colors">
                      {platform.name}
                    </span>
                  </a>
                );
              })}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
