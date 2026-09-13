import React from 'react';
import { motion } from 'motion/react';
import { ArrowDown, ArrowUpRight, MapPin } from 'lucide-react';
import myselfPhoto from '../assets/images/myself_.jpeg';
import { TabId } from '../types';

interface HeroProps {
  onNavigate?: (tab: TabId) => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  const handleNavigate = (tab: TabId) => {
    if (onNavigate) {
      onNavigate(tab);
    } else {
      const el = document.querySelector(`#${tab}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-[calc(100svh-4.5rem)] lg:min-h-[calc(100vh-4.5rem)] pt-6 pb-6 sm:pt-3 sm:pb-8 md:pt-4 md:pb-8 lg:pt-2 lg:pb-8 flex items-center justify-center overflow-hidden bg-radial from-[#131F37] via-[#0B111E] to-[#080D18] text-slate-100"
    >
      {/* Subtle architectural grid pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(#38BDF8 1px, transparent 1px), linear-gradient(to right, #38BDF8 1px, transparent 1px)`,
          backgroundSize: '48px 48px',
        }}
      />

      {/* Ambient deep lighting glows */}
      <div className="absolute -top-32 -left-32 w-80 h-80 rounded-full blur-3xl pointer-events-none bg-sky-950/25" />
      <div className="absolute top-1/2 -right-32 w-80 h-80 rounded-full blur-3xl pointer-events-none bg-teal-950/20" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-[6px] sm:mt-0 md:mt-0 lg:-mt-3.5">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-12 lg:gap-12 items-center">
          
          {/* ================================================== */}
          {/* LEFT SIDE: Hero Narrative & Buttons */}
          {/* Left-to-right alignment across all screens with comfortable margins */}
          {/* ================================================== */}
          <div className="lg:col-span-6 flex flex-col items-start text-left order-1 w-full max-w-2xl lg:max-w-none pl-2 sm:pl-6 md:pl-8 lg:pl-8 xl:pl-14">
            
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center justify-start gap-2 mt-2 sm:mt-1.5 lg:mt-1 mb-2 sm:mb-2.5"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
              <span className="font-mono text-xs sm:text-sm font-semibold tracking-wider uppercase text-sky-400">
                COMPUTER SCIENCE GRADUATE · IT-FOCUSED
              </span>
            </motion.div>

            {/* Main Headline with Responsive Clamp & Fluid Single-Unit Motion */}
            <motion.h1
              initial={{ opacity: 0, y: 28, filter: 'blur(4px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif italic text-[clamp(2.85rem,6.5vw,4.4rem)] lg:text-[clamp(2.85rem,4.4vw,4.25rem)] font-normal leading-[1.08] tracking-tight mb-5 sm:mb-6 text-slate-100 will-change-transform"
            >
              I keep<br />
              <span className="not-italic font-serif font-bold tracking-tight text-white">
                systems
              </span><br />
              moving forward.
            </motion.h1>

            {/* Supporting Paragraph */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
              className="text-[1.05rem] sm:text-lg lg:text-base leading-relaxed max-w-lg sm:max-w-xl lg:max-w-lg mb-5 sm:mb-6 text-slate-300 font-light"
            >
              Hi, I’m Gourab. I’m building my career in IT across cloud computing, DevOps, networking, Linux administration, and tech support — adapting fast, staying focused, and making technology work better.
            </motion.p>

            {/* Hero Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap items-center justify-start gap-3.5 w-full sm:w-auto -mt-1 sm:-mt-1.5"
            >
              <button
                type="button"
                onClick={() => handleNavigate('projects')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-md font-semibold text-sm transition-all duration-200 hover:-translate-y-0.5 cursor-pointer font-sans shadow-md bg-sky-500 hover:bg-sky-400 text-[#080D18] shadow-sky-950/40 hover:shadow-sky-500/20"
              >
                <span>Explore my work</span>
                <ArrowDown className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => handleNavigate('contact')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-md text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 cursor-pointer font-sans border border-slate-700 hover:border-slate-500 bg-slate-900/70 hover:bg-slate-800 text-slate-200"
              >
                <span>Contact</span>
                <ArrowUpRight className="w-4 h-4 text-sky-400" />
              </button>
            </motion.div>
          </div>

          {/* ================================================== */}
          {/* RIGHT SIDE: Circular Profile Photo with Planetary Orbit */}
          {/* ================================================== */}
          <div className="lg:col-span-6 flex justify-center items-center order-2 w-full">
            {/* Dedicated Responsive Orbital System Container */}
            <div className="hero-orbit-stage relative flex items-center justify-center w-full max-w-[calc((var(--orbit-radius)*2)+80px)] aspect-square mx-auto">
              
              {/* Subtle Concentric Orbital Path Lines */}
              <div
                className="absolute rounded-full pointer-events-none z-0 border border-slate-700/35"
                style={{
                  width: 'calc(var(--orbit-radius) * 2)',
                  height: 'calc(var(--orbit-radius) * 2)',
                }}
              />
              <div
                className="absolute rounded-full pointer-events-none z-0 border border-sky-500/10"
                style={{
                  width: 'calc(var(--orbit-radius) * 2 + 18px)',
                  height: 'calc(var(--orbit-radius) * 2 + 18px)',
                }}
              />

              {/* Stationary LOCATION BADGE */}
              <div className="absolute top-5 right-3 sm:top-8 sm:right-7 lg:top-9 lg:right-8 xl:top-10 xl:right-10 z-25 px-3 py-1.5 rounded-full backdrop-blur-md shadow-lg flex items-center gap-1.5 border bg-slate-900/95 border-slate-700/80 text-slate-200 shadow-black/60">
                <MapPin className="w-3 h-3 shrink-0 text-sky-400" />
                <span className="text-[10px] sm:text-[11px] font-mono whitespace-nowrap font-medium text-slate-200">
                  Based in West Bengal, India
                </span>
              </div>

              {/* Stationary CURRENTLY CARD */}
              <div className="absolute bottom-5 left-3 sm:bottom-8 sm:left-7 lg:bottom-9 lg:left-8 xl:bottom-10 xl:left-10 z-25 px-3 py-2 rounded-xl backdrop-blur-md shadow-lg border bg-slate-900/95 border-slate-700/80 shadow-black/60">
                <span className="font-mono text-[9px] uppercase tracking-wider font-bold block text-teal-400">
                  CURRENTLY
                </span>
                <span className="text-[11px] sm:text-xs font-semibold block mt-0.5 whitespace-nowrap text-slate-100">
                  Building an IT career
                </span>
              </div>

              {/* Orbiting Element 1: CLOUD */}
              <div className="absolute top-1/2 left-1/2 orbit-cloud pointer-events-auto z-20">
                <div className="px-2.5 py-1 sm:px-3 sm:py-1 rounded-full backdrop-blur-md flex items-center gap-1.5 text-[10px] sm:text-xs font-mono font-bold tracking-wider whitespace-nowrap select-none border shadow-md bg-slate-900/95 border-sky-500/50 text-sky-300 shadow-black/80">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-500 shadow-sm shadow-sky-500/50 shrink-0" />
                  <span>CLOUD</span>
                </div>
              </div>

              {/* Orbiting Element 2: DEVOPS */}
              <div className="absolute top-1/2 left-1/2 orbit-devops pointer-events-auto z-20">
                <div className="px-2.5 py-1 sm:px-3 sm:py-1 rounded-full backdrop-blur-md flex items-center gap-1.5 text-[10px] sm:text-xs font-mono font-bold tracking-wider whitespace-nowrap select-none border shadow-md bg-slate-900/95 border-teal-500/50 text-teal-300 shadow-black/80">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-500 shadow-sm shadow-teal-500/50 shrink-0" />
                  <span>DEVOPS</span>
                </div>
              </div>

              {/* Orbiting Element 3: SUPPORT */}
              <div className="absolute top-1/2 left-1/2 orbit-support pointer-events-auto z-20">
                <div className="px-2.5 py-1 sm:px-3 sm:py-1 rounded-full backdrop-blur-md flex items-center gap-1.5 text-[10px] sm:text-xs font-mono font-bold tracking-wider whitespace-nowrap select-none border shadow-md bg-slate-900/95 border-amber-500/50 text-amber-300 shadow-black/80">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shadow-sm shadow-amber-500/50 shrink-0" />
                  <span>SUPPORT</span>
                </div>
              </div>

              {/* CENTER: Circular Profile Photo */}
              <div
                className="relative rounded-full p-2 shadow-2xl border z-10 bg-gradient-to-tr from-sky-500/30 via-slate-800 to-teal-500/30 border-slate-700/60 shadow-sky-950/60"
                style={{
                  width: 'var(--photo-size)',
                  height: 'var(--photo-size)',
                }}
              >
                <div className="w-full h-full p-1 rounded-full border bg-slate-950 border-slate-800">
                  <div className="w-full h-full rounded-full overflow-hidden relative shadow-inner bg-slate-900">
                    <img
                      src={myselfPhoto}
                      alt="Gourab Shil"
                      className="w-full h-full object-cover object-center"
                      style={{
                        borderRadius: '50%',
                        objectFit: 'cover',
                      }}
                    />
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

