import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowUpRight, Sparkles, HardDrive, CheckCircle2 } from 'lucide-react';
import { PROJECTS } from '../data/portfolioData';
import { TabId } from '../types';

interface ProjectsHookProps {
  onNavigate?: (tab: TabId) => void;
}

export const ProjectsHook: React.FC<ProjectsHookProps> = ({ onNavigate }) => {
  const shouldReduceMotion = useReducedMotion();

  // Featured flagship projects
  const leafnova = PROJECTS.find((p) => p.id === 'leafnova-ai');
  const minidrive = PROJECTS.find((p) => p.id === 'minidrive');

  const handleNavigate = (tab: TabId) => (e: React.MouseEvent) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate(tab);
    } else {
      window.location.hash = tab;
    }
  };

  return (
    <motion.section
      id="home-projects-hook"
      aria-label="Featured projects showcase"
      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
      className="w-full max-w-full pt-6 pb-8 sm:pt-8 sm:pb-10 lg:pt-10 lg:pb-12 relative overflow-hidden bg-[#0B132B] border-t border-slate-800/80 text-slate-100"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative w-full">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 mb-6 sm:mb-8">
          <div className="space-y-2.5">
            <div className="inline-flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-60" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-400" />
              </span>
              <span className="font-mono text-xs sm:text-[13px] font-bold tracking-[0.2em] uppercase text-sky-400">
                FEATURED WORK
              </span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[3rem] font-normal leading-[1.14] tracking-tight text-slate-100">
              Crafted with{' '}
              <span className="italic font-serif text-sky-400">
                intent & precision.
              </span>
            </h2>
          </div>

          <div>
            <button
              type="button"
              onClick={handleNavigate('projects')}
              className="group inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-mono font-semibold transition-all duration-200 cursor-pointer shadow-md border bg-slate-900/90 hover:bg-slate-800/90 border-slate-700/80 hover:border-sky-400/60 text-slate-200 hover:text-white"
            >
              <span>View all {PROJECTS.length} projects</span>
              <ArrowUpRight className="w-4 h-4 text-sky-400 group-hover:text-sky-300 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </div>
        </div>

        {/* Flagship Cards 2-Column Grid - Compact & Entire Card Clickable */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* Project 1: Leafnova AI */}
          {leafnova && (
            <a
              href={leafnova.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open live project: ${leafnova.name}`}
              className="group relative flex flex-col justify-between rounded-xl sm:rounded-2xl p-5 sm:p-6 transition-all duration-300 hover:-translate-y-1 border bg-[#0F172A] border-slate-800/90 hover:border-sky-500/60 hover:shadow-xl hover:shadow-sky-500/10 text-white cursor-pointer block"
            >
              {/* Corner Accents */}
              <div className="absolute top-2.5 left-3 font-mono text-[9px] text-slate-500 select-none pointer-events-none">
                +
              </div>
              <div className="absolute top-2.5 right-3 font-mono text-[9px] text-slate-500 select-none pointer-events-none">
                +
              </div>

              <div>
                {/* Meta Header */}
                <div className="flex items-center justify-between gap-3 mb-3 pt-0.5">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[11px] font-bold tracking-wider px-2 py-0.5 rounded-md border bg-sky-950/70 text-sky-400 border-sky-800/60">
                      FLAGSHIP 01
                    </span>
                    <span className="inline-flex items-center gap-1.5 font-mono text-[10px] sm:text-[11px] font-semibold px-2 py-0.5 rounded border bg-emerald-950/50 text-emerald-400 border-emerald-800/50">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      Live Deployment
                    </span>
                  </div>

                  <div className="inline-flex items-center gap-1 text-slate-400 group-hover:text-sky-300 font-mono text-xs transition-colors">
                    <span>Visit live project</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-sky-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
                  </div>
                </div>

                {/* Title */}
                <div className="mb-2.5">
                  <h3 className="font-serif text-xl sm:text-2xl font-normal tracking-tight text-white group-hover:text-sky-300 transition-colors flex items-center gap-2">
                    <span>{leafnova.name}</span>
                    <Sparkles className="w-4 h-4 text-sky-400 shrink-0" />
                  </h3>
                  <p className="text-xs font-mono text-slate-400 mt-0.5">
                    {leafnova.category}
                  </p>
                </div>

                {/* Description */}
                <p className="text-xs sm:text-[13px] leading-relaxed text-slate-300 font-light mb-3">
                  {leafnova.description}
                </p>

                {/* Feature Highlights */}
                <div className="space-y-1.5 p-2.5 sm:p-3 rounded-lg border bg-slate-950/50 border-slate-800/80 text-xs text-slate-300">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                    <span>Multimodal AI with Gemini AI & Groq LLM inference</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                    <span>Computer vision disease detection & care recommendations</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                    <span>Flask backend coupled with PostgreSQL database</span>
                  </div>
                </div>
              </div>
            </a>
          )}

          {/* Project 2: Minidrive */}
          {minidrive && (
            <a
              href={minidrive.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open live project: ${minidrive.name}`}
              className="group relative flex flex-col justify-between rounded-xl sm:rounded-2xl p-5 sm:p-6 transition-all duration-300 hover:-translate-y-1 border bg-[#0F172A] border-slate-800/90 hover:border-sky-500/60 hover:shadow-xl hover:shadow-sky-500/10 text-white cursor-pointer block"
            >
              {/* Corner Accents */}
              <div className="absolute top-2.5 left-3 font-mono text-[9px] text-slate-500 select-none pointer-events-none">
                +
              </div>
              <div className="absolute top-2.5 right-3 font-mono text-[9px] text-slate-500 select-none pointer-events-none">
                +
              </div>

              <div>
                {/* Meta Header */}
                <div className="flex items-center justify-between gap-3 mb-3 pt-0.5">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[11px] font-bold tracking-wider px-2 py-0.5 rounded-md border bg-sky-950/70 text-sky-400 border-sky-800/60">
                      FLAGSHIP 02
                    </span>
                    <span className="inline-flex items-center gap-1.5 font-mono text-[10px] sm:text-[11px] font-semibold px-2 py-0.5 rounded border bg-emerald-950/50 text-emerald-400 border-emerald-800/50">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      Live Deployment
                    </span>
                  </div>

                  <div className="inline-flex items-center gap-1 text-slate-400 group-hover:text-sky-300 font-mono text-xs transition-colors">
                    <span>Visit live project</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-sky-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
                  </div>
                </div>

                {/* Title */}
                <div className="mb-2.5">
                  <h3 className="font-serif text-xl sm:text-2xl font-normal tracking-tight text-white group-hover:text-sky-300 transition-colors flex items-center gap-2">
                    <span>{minidrive.name}</span>
                    <HardDrive className="w-4 h-4 text-sky-400 shrink-0" />
                  </h3>
                  <p className="text-xs font-mono text-slate-400 mt-0.5">
                    {minidrive.category}
                  </p>
                </div>

                {/* Description */}
                <p className="text-xs sm:text-[13px] leading-relaxed text-slate-300 font-light mb-3">
                  {minidrive.description}
                </p>

                {/* Feature Highlights */}
                <div className="space-y-1.5 p-2.5 sm:p-3 rounded-lg border bg-slate-950/50 border-slate-800/80 text-xs text-slate-300">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                    <span>AWS cloud hosting with EC2 computing & S3 buckets</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                    <span>Linux OS system administration, permissions & DNS routing</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                    <span>Secure authenticated file uploads and instant downloads</span>
                  </div>
                </div>
              </div>
            </a>
          )}
        </div>
      </div>
    </motion.section>
  );
};
