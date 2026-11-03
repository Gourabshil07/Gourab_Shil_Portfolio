import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowUpRight, Sparkles, HardDrive, ShieldCheck } from 'lucide-react';
import { PROJECTS } from '../data/portfolioData';
import { TabId } from '../types';

interface ProjectsHookProps {
  onNavigate?: (tab: TabId) => void;
}

export const ProjectsHook: React.FC<ProjectsHookProps> = ({ onNavigate }) => {
  const shouldReduceMotion = useReducedMotion();

  // Featured flagship projects
  const resolveiq = PROJECTS.find((p) => p.id === 'resolveiq');
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

  const resolveiqTags = ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Groq AI', 'Supabase'];
  const leafnovaTags = ['Gemini AI', 'Groq LLM', 'Computer Vision', 'Flask', 'PostgreSQL'];
  const minidriveTags = ['AWS EC2', 'AWS S3', 'Linux Admin', 'DNS Routing', 'Flask'];

  return (
    <motion.section
      id="home-projects-hook"
      aria-label="Featured projects showcase"
      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
      className="w-full max-w-full pt-8 pb-12 sm:pt-10 sm:pb-14 lg:pt-12 lg:pb-16 relative overflow-hidden bg-[#FAF9F5] border-t border-slate-200/80 text-slate-900"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative w-full">
        {/* Top Header Bar / Eyebrow */}
        <div className="flex items-center justify-between gap-4 mb-6 sm:mb-8 pb-3.5 border-b border-slate-200">
          <div className="inline-flex items-center gap-2.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-500 opacity-60" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500" />
            </span>
            <span className="font-mono text-xs sm:text-[13px] font-bold tracking-[0.2em] uppercase text-sky-600">
              FEATURED WORK
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-2 font-mono text-xs text-slate-500">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
            <span>FLAGSHIP DEPLOYMENTS</span>
          </div>
        </div>

        {/* Focal Heading & Narrative */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start mb-8 sm:mb-10">
          <div className="lg:col-span-7">
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-normal leading-[1.12] tracking-tight text-slate-900 mb-2.5">
              Crafted with{' '}
              <span className="italic font-serif text-sky-600">
                intent &amp; precision.
              </span>
            </h2>
          </div>
          <div className="lg:col-span-5 flex flex-col justify-between space-y-3.5 lg:border-l lg:pl-8 border-slate-200">
            <p className="text-sm sm:text-base font-light leading-relaxed text-slate-600">
              Production applications combining IT incident management, AI integrations, cloud architecture on AWS, secure Linux environments, and clean responsive frontends.
            </p>
            <div className="flex items-center gap-3 pt-1">
              <button
                type="button"
                id="cta-view-all-projects"
                onClick={handleNavigate('projects')}
                className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold transition-all duration-200 shadow-sm text-xs sm:text-sm cursor-pointer bg-sky-500 hover:bg-sky-400 text-slate-950 shadow-sky-500/20"
                aria-label={`View all ${PROJECTS.length} projects`}
              >
                <span>Explore all {PROJECTS.length} projects</span>
                <ArrowUpRight className="w-4 h-4 text-current group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
              </button>
              <button
                type="button"
                id="cta-discuss-project"
                onClick={handleNavigate('contact')}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-mono text-xs sm:text-sm font-semibold transition-colors cursor-pointer border bg-white hover:bg-slate-50 border-slate-200 text-slate-700 hover:text-slate-900 shadow-xs"
              >
                <span>Discuss a project</span>
              </button>
            </div>
          </div>
        </div>

        {/* Flagship Cards 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Project 1: ResolveIQ */}
          {resolveiq && (
            <a
              id="home-featured-resolveiq-card"
              href={resolveiq.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open live project: ${resolveiq.name}`}
              className="group relative flex flex-col justify-between rounded-2xl p-6 transition-all duration-300 ease-out hover:-translate-y-2 hover:scale-[1.018] border bg-white border-slate-200/90 hover:border-sky-500/60 shadow-xs hover:shadow-xl hover:shadow-sky-500/15 text-slate-900 cursor-pointer will-change-transform"
            >
              <div>
                {/* Meta Header */}
                <div className="flex items-center justify-between gap-3 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold tracking-wider px-2 py-0.5 rounded-md bg-sky-50 text-sky-700 border border-sky-200/70 transition-transform duration-200 group-hover:scale-105">
                      FLAGSHIP 01
                    </span>
                    <span className="inline-flex items-center gap-1.5 font-mono text-[11px] font-semibold px-2 py-0.5 rounded-full border bg-emerald-50 text-emerald-700 border-emerald-200/70">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      Live Deployment
                    </span>
                  </div>

                  <div className="inline-flex items-center gap-1 text-slate-400 group-hover:text-sky-600 font-mono text-xs font-medium transition-all duration-200">
                    <span>Visit project</span>
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-200 text-sky-500" />
                  </div>
                </div>

                {/* Title */}
                <div className="mb-3">
                  <h3 className="font-serif text-2xl font-medium tracking-tight text-slate-900 group-hover:text-sky-600 transition-colors flex items-center gap-2">
                    <span>{resolveiq.name}</span>
                    <ShieldCheck className="w-4 h-4 text-sky-500 shrink-0 transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110" />
                  </h3>
                  <p className="text-xs font-mono text-sky-600 font-medium mt-1">
                    {resolveiq.category}
                  </p>
                </div>

                {/* Description */}
                <p className="text-sm leading-relaxed text-slate-600 font-light mb-6">
                  {resolveiq.description}
                </p>
              </div>

              {/* Minimal Technology Tags */}
              <div className="flex flex-wrap gap-1.5 pt-4 border-t border-slate-100">
                {resolveiqTags.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-0.5 rounded-md text-xs font-mono font-medium border bg-slate-50 border-slate-200/80 text-slate-600 group-hover:border-slate-300 transition-all duration-150 hover:scale-105 hover:-translate-y-0.5 hover:bg-white hover:border-sky-300 hover:text-sky-700 hover:shadow-xs"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </a>
          )}

          {/* Project 2: Leafnova AI */}
          {leafnova && (
            <a
              id="home-featured-leafnova-card"
              href={leafnova.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open live project: ${leafnova.name}`}
              className="group relative flex flex-col justify-between rounded-2xl p-6 transition-all duration-300 ease-out hover:-translate-y-2 hover:scale-[1.018] border bg-white border-slate-200/90 hover:border-sky-500/60 shadow-xs hover:shadow-xl hover:shadow-sky-500/15 text-slate-900 cursor-pointer will-change-transform"
            >
              <div>
                {/* Meta Header */}
                <div className="flex items-center justify-between gap-3 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold tracking-wider px-2 py-0.5 rounded-md bg-sky-50 text-sky-700 border border-sky-200/70 transition-transform duration-200 group-hover:scale-105">
                      FLAGSHIP 02
                    </span>
                    <span className="inline-flex items-center gap-1.5 font-mono text-[11px] font-semibold px-2 py-0.5 rounded-full border bg-emerald-50 text-emerald-700 border-emerald-200/70">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      Live Deployment
                    </span>
                  </div>

                  <div className="inline-flex items-center gap-1 text-slate-400 group-hover:text-sky-600 font-mono text-xs font-medium transition-all duration-200">
                    <span>Visit project</span>
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-200 text-sky-500" />
                  </div>
                </div>

                {/* Title */}
                <div className="mb-3">
                  <h3 className="font-serif text-2xl font-medium tracking-tight text-slate-900 group-hover:text-sky-600 transition-colors flex items-center gap-2">
                    <span>{leafnova.name}</span>
                    <Sparkles className="w-4 h-4 text-sky-500 shrink-0 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110" />
                  </h3>
                  <p className="text-xs font-mono text-sky-600 font-medium mt-1">
                    {leafnova.category}
                  </p>
                </div>

                {/* Description */}
                <p className="text-sm leading-relaxed text-slate-600 font-light mb-6">
                  {leafnova.description}
                </p>
              </div>

              {/* Minimal Technology Tags */}
              <div className="flex flex-wrap gap-1.5 pt-4 border-t border-slate-100">
                {leafnovaTags.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-0.5 rounded-md text-xs font-mono font-medium border bg-slate-50 border-slate-200/80 text-slate-600 group-hover:border-slate-300 transition-all duration-150 hover:scale-105 hover:-translate-y-0.5 hover:bg-white hover:border-sky-300 hover:text-sky-700 hover:shadow-xs"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </a>
          )}

          {/* Project 3: Minidrive */}
          {minidrive && (
            <a
              id="home-featured-minidrive-card"
              href={minidrive.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open live project: ${minidrive.name}`}
              className="group relative flex flex-col justify-between rounded-2xl p-6 transition-all duration-300 ease-out hover:-translate-y-2 hover:scale-[1.018] border bg-white border-slate-200/90 hover:border-sky-500/60 shadow-xs hover:shadow-xl hover:shadow-sky-500/15 text-slate-900 cursor-pointer will-change-transform"
            >
              <div>
                {/* Meta Header */}
                <div className="flex items-center justify-between gap-3 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold tracking-wider px-2 py-0.5 rounded-md bg-sky-50 text-sky-700 border border-sky-200/70 transition-transform duration-200 group-hover:scale-105">
                      FLAGSHIP 03
                    </span>
                    <span className="inline-flex items-center gap-1.5 font-mono text-[11px] font-semibold px-2 py-0.5 rounded-full border bg-emerald-50 text-emerald-700 border-emerald-200/70">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      Live Deployment
                    </span>
                  </div>

                  <div className="inline-flex items-center gap-1 text-slate-400 group-hover:text-sky-600 font-mono text-xs font-medium transition-all duration-200">
                    <span>Visit project</span>
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-200 text-sky-500" />
                  </div>
                </div>

                {/* Title */}
                <div className="mb-3">
                  <h3 className="font-serif text-2xl font-medium tracking-tight text-slate-900 group-hover:text-sky-600 transition-colors flex items-center gap-2">
                    <span>{minidrive.name}</span>
                    <HardDrive className="w-4 h-4 text-sky-500 shrink-0 transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110" />
                  </h3>
                  <p className="text-xs font-mono text-sky-600 font-medium mt-1">
                    {minidrive.category}
                  </p>
                </div>

                {/* Description */}
                <p className="text-sm leading-relaxed text-slate-600 font-light mb-6">
                  {minidrive.description}
                </p>
              </div>

              {/* Minimal Technology Tags */}
              <div className="flex flex-wrap gap-1.5 pt-4 border-t border-slate-100">
                {minidriveTags.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-0.5 rounded-md text-xs font-mono font-medium border bg-slate-50 border-slate-200/80 text-slate-600 group-hover:border-slate-300 transition-all duration-150 hover:scale-105 hover:-translate-y-0.5 hover:bg-white hover:border-sky-300 hover:text-sky-700 hover:shadow-xs"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </a>
          )}
        </div>
      </div>
    </motion.section>
  );
};
