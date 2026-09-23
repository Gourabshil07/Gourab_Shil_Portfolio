import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import gourabPhoto from '../assets/images/Gourab_Shil.png';

interface LoadingScreenProps {
  onComplete?: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [isDone, setIsDone] = useState(false);
  const [statusText, setStatusText] = useState('Fetching typography & styles...');
  const [progress, setProgress] = useState(25);

  useEffect(() => {
    const startTime = performance.now();

    // Stage 1: Progress step
    const timer1 = setTimeout(() => {
      setStatusText('Optimizing visual assets...');
      setProgress(65);
    }, 280);

    // Font readiness check
    const fontPromise = 'fonts' in document ? document.fonts.ready : Promise.resolve();

    // Key asset preload
    const imagePromise = new Promise<void>((resolve) => {
      const img = new Image();
      img.src = gourabPhoto;
      if (img.complete) {
        resolve();
      } else {
        img.onload = () => resolve();
        img.onerror = () => resolve();
      }
    });

    // Complete loading with minimum delay for smooth visual pacing
    Promise.allSettled([fontPromise, imagePromise]).then(() => {
      const elapsed = performance.now() - startTime;
      const minDisplayTime = 750; // brief, intentional duration (0.75s)
      const remainingTime = Math.max(0, minDisplayTime - elapsed);

      setTimeout(() => {
        setStatusText('Ready');
        setProgress(100);
        setTimeout(() => {
          setIsDone(true);
        }, 150);
      }, remainingTime);
    });

    // Safety fallback: never trap user if network or font API stalls
    const safetyTimeout = setTimeout(() => {
      setProgress(100);
      setIsDone(true);
    }, 1800);

    return () => {
      clearTimeout(timer1);
      clearTimeout(safetyTimeout);
    };
  }, []);

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {!isDone && (
        <motion.div
          key="portfolio-loading-screen"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
          }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0B111E] text-slate-100 select-none overflow-hidden"
          role="status"
          aria-live="polite"
          aria-label="Loading portfolio"
        >
          {/* Subtle Grid Matrix Background */}
          <div
            className="absolute inset-0 pointer-events-none opacity-20"
            style={{
              backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px),
                                linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)`,
              backgroundSize: '36px 36px',
            }}
          />

          {/* Ambient Radial Sky Glow */}
          <div className="absolute w-[500px] h-[500px] rounded-full bg-sky-500/10 blur-[120px] pointer-events-none" />

          {/* Ambient Background Wireframe Skeleton - Subtle hint of portfolio structure */}
          <div className="absolute inset-0 max-w-6xl mx-auto px-6 pt-5 pointer-events-none opacity-15 flex flex-col justify-between hidden md:flex">
            {/* Top Nav Skeleton */}
            <div className="flex items-center justify-between py-3 border-b border-white/5">
              <div className="h-6 w-36 bg-slate-700/50 rounded-md animate-pulse" />
              <div className="flex gap-4">
                <div className="h-5 w-16 bg-slate-700/40 rounded-full animate-pulse" />
                <div className="h-5 w-16 bg-slate-700/40 rounded-full animate-pulse" />
                <div className="h-5 w-16 bg-slate-700/40 rounded-full animate-pulse" />
              </div>
            </div>

            {/* Hero Body Wireframe Skeleton */}
            <div className="my-auto grid grid-cols-12 gap-8 items-center py-12">
              <div className="col-span-8 space-y-4">
                <div className="h-4 w-28 bg-sky-500/30 rounded-full animate-pulse" />
                <div className="h-10 w-3/4 bg-slate-700/50 rounded-lg animate-pulse" />
                <div className="h-10 w-1/2 bg-slate-700/40 rounded-lg animate-pulse" />
                <div className="h-4 w-full bg-slate-700/30 rounded-md animate-pulse mt-4" />
                <div className="h-4 w-5/6 bg-slate-700/30 rounded-md animate-pulse" />
              </div>
              <div className="col-span-4 flex justify-end">
                <div className="w-48 h-56 rounded-2xl bg-slate-800/40 border border-white/5 animate-pulse" />
              </div>
            </div>

            {/* Bottom Footer Wireframe Skeleton */}
            <div className="h-8 border-t border-white/5 flex items-center justify-between mb-4">
              <div className="h-3 w-32 bg-slate-700/30 rounded" />
              <div className="h-3 w-40 bg-slate-700/30 rounded" />
            </div>
          </div>

          {/* Central High-Craft Loading Spinner & Identity Block */}
          <div className="relative z-10 flex flex-col items-center text-center px-6">
            {/* Dual Ring Spinner with Monogram */}
            <div className="relative w-18 h-18 sm:w-20 sm:h-20 mb-6 flex items-center justify-center">
              {/* Outer Glowing Pulsing Track */}
              <div className="absolute inset-0 rounded-full border border-sky-500/20 shadow-[0_0_20px_rgba(56,189,248,0.15)]" />

              {/* High-Precision Rotating Spinner Ring */}
              <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-sky-400 border-r-sky-500/40 animate-spin" />

              {/* Inner Monogram Core */}
              <div className="w-12 h-12 rounded-xl bg-slate-900/90 border border-sky-400/30 flex items-center justify-center shadow-inner">
                <span className="font-mono text-xs sm:text-sm font-bold text-sky-400 tracking-tight">
                  GS
                </span>
              </div>
            </div>

            {/* Identity Typography */}
            <h1 className="font-sans text-sm sm:text-base font-bold tracking-[0.22em] uppercase text-white mb-1">
              Gourab Shil
            </h1>
            <p className="font-mono text-[10px] sm:text-[11px] tracking-widest text-sky-400/90 uppercase font-medium mb-5">
              Portfolio
            </p>

            {/* Precision Micro-Progress Bar */}
            <div className="w-44 sm:w-52 h-[3px] bg-slate-800 rounded-full overflow-hidden mb-3.5 border border-slate-700/40 relative">
              <motion.div
                className="h-full bg-gradient-to-r from-sky-500 via-cyan-300 to-sky-400 rounded-full"
                initial={{ width: '15%' }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.28, ease: 'easeOut' }}
              />
            </div>

            {/* Status Label */}
            <div className="flex items-center gap-2 font-mono text-[11px] text-slate-400 tracking-wide">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-ping shrink-0" />
              <span>{statusText}</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
