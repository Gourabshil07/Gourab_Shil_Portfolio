import React from 'react';
import { ArrowUpRight, Cloud, Code2, Terminal, Cpu, Sparkles } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { TabId } from '../types';
import { SKILL_CATEGORIES } from '../data/portfolioData';

interface SkillsHookProps {
  onNavigate?: (tab: TabId) => void;
}

export const SkillsHook: React.FC<SkillsHookProps> = ({ onNavigate }) => {
  const shouldReduceMotion = useReducedMotion();

  const handleNavigate = (tab: TabId) => (e: React.MouseEvent) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate(tab);
    } else {
      window.location.hash = tab;
    }
  };

  // Icon mapping for each skill domain
  const getCategoryIcon = (index: number) => {
    switch (index) {
      case 0:
        return Cloud;
      case 1:
        return Code2;
      case 2:
        return Terminal;
      default:
        return Cpu;
    }
  };

  // Curated limit to highlight top skills and show attractive "+X more" counts
  const getVisibleSkillsLimit = (index: number) => {
    switch (index) {
      case 0:
        return 3; // 6 - 3 = +3 more
      case 1:
        return 4; // 7 - 4 = +3 more
      case 2:
        return 3; // 5 - 3 = +2 more
      case 3:
        return 2; // 3 - 2 = +1 more
      default:
        return 3;
    }
  };

  return (
    <motion.section
      id="home-skills-hook"
      aria-label="Technical skills overview"
      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
      className="w-full max-w-full pt-8 pb-14 sm:pt-10 sm:pb-16 lg:pt-12 lg:pb-20 relative overflow-hidden bg-[#FAF9F5] border-t border-slate-200/80 text-slate-900"
    >
      {/* Full-width container aligned with max-w-7xl across the portfolio */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative w-full">
        {/* Top Header Bar / Eyebrow */}
        <div className="flex items-center justify-between gap-4 mb-6 sm:mb-8 pb-3.5 border-b border-slate-200">
          <div className="inline-flex items-center gap-2.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-500 opacity-60" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500" />
            </span>
            <span className="font-mono text-xs sm:text-[13px] font-bold tracking-[0.2em] uppercase text-sky-600">
              TECHNICAL PROFICIENCIES
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-2 font-mono text-xs text-slate-500">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
            <span>HANDS-ON TOOLKIT</span>
          </div>
        </div>

        {/* Focal Heading & Narrative */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start mb-8 sm:mb-10">
          <div className="lg:col-span-7">
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-normal leading-[1.12] tracking-tight text-slate-900 mb-2.5">
              Skills that keep systems{' '}
              <span className="italic font-serif text-sky-600">
                moving forward.
              </span>
            </h2>
          </div>
          <div className="lg:col-span-5 flex flex-col justify-between space-y-3.5 lg:border-l lg:pl-8 border-slate-200">
            <p className="text-sm sm:text-base font-light leading-relaxed text-slate-600">
              A balanced foundation combining cloud computing, Linux administration, full-stack software development, and systematic technical troubleshooting.
            </p>
            <div className="flex items-center gap-3 pt-1">
              <button
                type="button"
                id="cta-more-skills"
                onClick={handleNavigate('skills')}
                className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold transition-all duration-200 shadow-sm text-xs sm:text-sm cursor-pointer bg-sky-500 hover:bg-sky-400 text-slate-950 shadow-sky-500/20"
                aria-label="View complete skills and technical proficiencies"
              >
                <span>Explore all skills</span>
                <ArrowUpRight className="w-4 h-4 text-current group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
              </button>
              <button
                type="button"
                onClick={handleNavigate('contact')}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-mono text-xs sm:text-sm font-semibold transition-colors cursor-pointer border bg-white hover:bg-slate-50 border-slate-200 text-slate-700 hover:text-slate-900 shadow-xs"
              >
                <span>Get in touch</span>
              </button>
            </div>
          </div>
        </div>

        {/* 4 Skill Category Cards Grid - Compact with Refined Hover Effects */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-6">
          {SKILL_CATEGORIES.map((cat, idx) => {
            const Icon = getCategoryIcon(idx);
            const limit = getVisibleSkillsLimit(idx);
            const visibleSkills = cat.skills.slice(0, limit);
            const remainingCount = cat.skills.length - limit;

            return (
              <div
                key={cat.title}
                className="group relative flex flex-col justify-between rounded-xl p-4 sm:p-5 border bg-white border-slate-200/90 shadow-xs hover:border-sky-500/50 hover:shadow-md hover:shadow-sky-500/10 hover:-translate-y-0.5 transition-all duration-200 select-none"
              >
                <div>
                  {/* Category Icon and Header */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center border transition-colors bg-sky-50 text-sky-600 border-sky-200/60 group-hover:bg-sky-500 group-hover:text-white group-hover:border-sky-500">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="font-mono text-[10px] font-semibold tracking-wider uppercase text-slate-400 group-hover:text-sky-600 transition-colors">
                      0{idx + 1}
                    </span>
                  </div>

                  <h3 className="font-serif text-base sm:text-lg font-medium tracking-tight text-slate-900 mb-0.5 group-hover:text-sky-700 transition-colors">
                    {cat.title}
                  </h3>
                  <p className="text-[11px] font-mono text-slate-500 mb-3 truncate">
                    {cat.subtitle}
                  </p>

                  {/* Skill Chips with prominent +X more badge */}
                  <div className="flex flex-wrap gap-1.5">
                    {visibleSkills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-0.5 rounded text-[11px] font-mono font-medium border bg-slate-50 border-slate-200/80 text-slate-700 group-hover:border-slate-300 transition-colors"
                      >
                        {skill}
                      </span>
                    ))}
                    {remainingCount > 0 && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-mono font-semibold text-sky-700 bg-sky-100/80 border border-sky-200 group-hover:bg-sky-500 group-hover:text-white group-hover:border-sky-500 transition-colors shadow-xs">
                        +{remainingCount} more
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Strengths Marquee / Highlights Strip - Core Stack Focus with Interactive Hover Effect */}
        <div className="p-4 sm:p-4.5 rounded-xl border bg-white border-slate-200/90 shadow-xs hover:border-sky-500/50 hover:shadow-md hover:shadow-sky-500/10 hover:-translate-y-0.5 transition-all duration-200 flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-4 text-xs">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2.5 sm:gap-3.5">
            <div className="flex items-center gap-2 text-slate-900 font-semibold shrink-0">
              <Sparkles className="w-4 h-4 text-sky-500 shrink-0" />
              <span className="font-mono text-xs tracking-wider uppercase">Core Stack Focus:</span>
            </div>
            <div className="flex flex-wrap items-center gap-2 font-mono text-[11px]">
              <span className="px-2.5 py-1 rounded-md bg-slate-50 border border-slate-200 text-slate-700 font-medium shadow-xs">
                AWS (EC2, S3)
              </span>
              <span className="px-2.5 py-1 rounded-md bg-slate-50 border border-slate-200 text-slate-700 font-medium shadow-xs">
                Linux SysAdmin
              </span>
              <span className="px-2.5 py-1 rounded-md bg-slate-50 border border-slate-200 text-slate-700 font-medium shadow-xs">
                Python / Flask
              </span>
              <span className="px-2.5 py-1 rounded-md bg-slate-50 border border-slate-200 text-slate-700 font-medium shadow-xs">
                TCP/IP Networking
              </span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-1.5 font-mono text-[11px] text-slate-500 shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>Production Ready</span>
          </div>
        </div>
      </div>
    </motion.section>
  );
};
