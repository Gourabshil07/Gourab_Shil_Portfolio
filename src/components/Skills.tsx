import React, { useState } from 'react';
import { Server, Code, Wrench, ChevronDown, Cpu, Network } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { SKILL_CATEGORIES } from '../data/portfolioData';

const ICONS_BY_CATEGORY: Record<string, React.ReactNode> = {
  'IT & Infrastructure': <Server className="w-5 h-5 text-sky-500" />,
  'Development & Data': <Code className="w-5 h-5 text-teal-500" />,
  'Tools & Workflow': <Wrench className="w-5 h-5 text-indigo-500" />,
  'Core Technical Competencies': <Network className="w-5 h-5 text-orange-500" />,
};

export const Skills: React.FC = () => {
  // All categories open by default; users can toggle individual ones open/closed
  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    SKILL_CATEGORIES.forEach((cat) => {
      initial[cat.title] = true;
    });
    return initial;
  });

  const toggleCategory = (title: string) => {
    setOpenCategories((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  const allOpen = Object.values(openCategories).every(Boolean);

  const toggleAll = () => {
    const targetState = !allOpen;
    const next: Record<string, boolean> = {};
    SKILL_CATEGORIES.forEach((cat) => {
      next[cat.title] = targetState;
    });
    setOpenCategories(next);
  };

  return (
    <section
      id="skills"
      className="w-full max-w-full pt-6 pb-14 sm:pt-8 sm:pb-16 md:pt-10 md:pb-20 relative overflow-hidden bg-[#FAF9F5] text-slate-900"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative w-full">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 md:mb-16 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="font-mono text-xs font-bold tracking-widest uppercase text-sky-600">
                03 / TECHNICAL PROFICIENCIES
              </span>
              <div className="h-px w-12 bg-sky-500/30" />
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-normal leading-[1.14] tracking-tight mb-3 text-slate-900">
              Technical Skillset
            </h2>
            <p className="text-base sm:text-lg max-w-xl text-slate-600 font-light leading-relaxed">
              Demonstrated capabilities in cloud infrastructure, networking protocols, Linux administration, and full-stack software development.
            </p>
          </div>

          <div className="flex items-center gap-3 self-start md:self-end">
            <button
              type="button"
              onClick={toggleAll}
              className="inline-flex items-center gap-2 font-mono text-xs px-3.5 py-2 rounded-lg border transition-colors shadow-sm cursor-pointer font-semibold text-sky-700 bg-white hover:bg-slate-50 border-slate-200"
              aria-label={allOpen ? 'Collapse all skill categories' : 'Expand all skill categories'}
            >
              <span>{allOpen ? 'Collapse All' : 'Expand All'}</span>
            </button>

            <div className="hidden sm:inline-flex font-mono text-xs px-3.5 py-2 rounded-lg border shadow-sm text-slate-500 bg-white border-slate-200">
              <span>Evidence-Based · Verified</span>
            </div>
          </div>
        </div>

        {/* Skill Category Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 items-start">
          {SKILL_CATEGORIES.map((cat) => {
            const isOpen = openCategories[cat.title] ?? true;

            return (
              <div
                key={cat.title}
                className={`group rounded-2xl border transition-all duration-300 flex flex-col justify-between overflow-hidden ${
                  isOpen
                    ? 'bg-white border-slate-200/90 hover:border-sky-500/50 shadow-sm text-slate-900'
                    : 'border-slate-200 bg-[#F1F5F9]/60 text-slate-700'
                }`}
              >
                {/* Clickable Card Header / Accordion Trigger */}
                <button
                  type="button"
                  onClick={() => toggleCategory(cat.title)}
                  aria-expanded={isOpen}
                  aria-controls={`skills-content-${cat.title.replace(/\s+/g, '-').toLowerCase()}`}
                  className="w-full text-left p-6 sm:p-7 flex items-start justify-between gap-4 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-mono text-xs uppercase tracking-wider block font-semibold text-slate-500">
                        {cat.subtitle}
                      </span>
                      <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded-full border text-sky-700 bg-sky-50 border-sky-200">
                        {cat.skills.length} skills
                      </span>
                    </div>
                    <h3 className="font-serif text-xl sm:text-2xl font-normal tracking-tight transition-colors text-slate-900 group-hover:text-sky-600">
                      {cat.title}
                    </h3>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center border shadow-sm bg-slate-50 border-slate-200">
                      {ICONS_BY_CATEGORY[cat.title] || <Cpu className="w-5 h-5 text-sky-600" />}
                    </div>

                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center transition-transform duration-200 border ${
                        isOpen
                          ? 'rotate-180 bg-slate-100 text-sky-600 border-slate-200'
                          : 'bg-slate-50 text-slate-500 border-slate-200'
                      }`}
                      aria-hidden="true"
                    >
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </div>
                </button>

                {/* Collapsible Content Body */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`skills-content-${cat.title.replace(/\s+/g, '-').toLowerCase()}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden px-6 sm:px-7 pb-6 sm:pb-7 pt-0"
                    >
                      {/* Skills Badges */}
                      <div className="flex flex-wrap gap-2 pt-1">
                        {cat.skills.map((skill) => (
                          <div
                            key={skill}
                            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs sm:text-sm font-mono font-semibold transition-colors border bg-[#F1F5F9] border-slate-200 text-slate-800 hover:bg-sky-50 hover:border-sky-300 hover:text-sky-700"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-sky-500" />
                            <span>{skill}</span>
                          </div>
                        ))}
                      </div>

                      {/* Bottom Subtle Bar */}
                      <div className="mt-6 pt-4 border-t flex items-center justify-between text-[11px] font-mono border-slate-200 text-slate-500">
                        <span className="font-semibold">Domain Ready</span>
                        <span className="text-slate-400">
                          {cat.skills.length} core areas
                        </span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};


