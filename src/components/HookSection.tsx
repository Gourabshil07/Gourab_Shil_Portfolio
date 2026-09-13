import React from 'react';
import { ArrowUpRight, Cloud, Cpu, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { TabId } from '../types';

interface HookSectionProps {
  onNavigate?: (tab: TabId) => void;
}

export const HookSection: React.FC<HookSectionProps> = ({ onNavigate }) => {
  const shouldReduceMotion = useReducedMotion();

  const handleNavigate = (tab: TabId) => (e: React.MouseEvent) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate(tab);
    } else {
      window.location.hash = tab;
    }
  };

  const corePillars = [
    {
      id: 'cloud-infra',
      title: 'Cloud & Infrastructure',
      subtitle: 'AWS · Linux · DevOps',
      description:
        'Architecting dependable hosting on AWS (EC2, S3), configuring secure Linux environments, and deploying reproducible container setups.',
      icon: Cloud,
      tags: ['AWS EC2/S3', 'Linux Administration', 'Docker', 'Networking'],
    },
    {
      id: 'intelligent-apps',
      title: 'Full-Stack & AI Systems',
      subtitle: 'Python · Flask · APIs',
      description:
        'Building responsive web applications integrated with modern GenAI (Gemini, Groq), relational databases (PostgreSQL/MySQL), and RESTful APIs.',
      icon: Cpu,
      tags: ['Python', 'Flask', 'Gemini & Groq AI', 'PostgreSQL'],
    },
    {
      id: 'reliability-support',
      title: 'Reliability & Support',
      subtitle: 'Diagnostics & Systems',
      description:
        'Methodical troubleshooting, tracing network issues, providing user support, and documenting solutions to build trustworthy software.',
      icon: ShieldCheck,
      tags: ['Root-Cause Analysis', 'Tech Support', 'TCP/IP', 'Documentation'],
    },
  ];

  return (
    <motion.section
      id="hook"
      aria-label="Overview and engineering philosophy"
      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
      className="w-full max-w-full pt-8 pb-12 sm:pt-10 sm:pb-14 lg:pt-12 lg:pb-16 relative overflow-hidden bg-[#FAF9F5] border-t border-slate-200/80 text-slate-900"
    >
      {/* Full-width container aligned with max-w-7xl across the portfolio */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative w-full">
        {/* Top Header Bar / Eyebrow with connecting line */}
        <div className="flex items-center justify-between gap-4 mb-6 sm:mb-8 pb-3.5 border-b border-slate-200">
          <div className="inline-flex items-center gap-2.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-500 opacity-60" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500" />
            </span>
            <span className="font-mono text-xs sm:text-[13px] font-bold tracking-[0.2em] uppercase text-sky-600">
              OVERVIEW & PHILOSOPHY
            </span>
          </div>

          {/* Decorative technical coordinate tag */}
          <div className="hidden sm:flex items-center gap-2 font-mono text-xs text-slate-500">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
            <span>CORE PRINCIPLES</span>
          </div>
        </div>

        {/* Focal Heading & Narrative Lead */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start mb-8 sm:mb-10">
          <div className="lg:col-span-7">
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-normal leading-[1.12] tracking-tight text-slate-900 mb-3">
              From technical problems to{' '}
              <span className="italic font-serif text-sky-600">
                dependable solutions.
              </span>
            </h2>
          </div>
          <div className="lg:col-span-5 flex flex-col justify-between space-y-4 lg:border-l lg:pl-8 border-slate-200">
            <p className="text-sm sm:text-base font-light leading-relaxed text-slate-600">
              I approach systems engineering with patience, curiosity, and disciplined follow-through. Whether designing cloud architecture on AWS, managing Linux environments, or integrating AI into web tools, I focus on software that earns trust.
            </p>
            <div className="flex items-center gap-3 pt-1">
              <button
                type="button"
                id="cta-more-about-me"
                onClick={handleNavigate('about')}
                className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold transition-all duration-200 shadow-sm text-xs sm:text-sm cursor-pointer bg-sky-500 hover:bg-sky-400 text-slate-950 shadow-sky-500/20"
                aria-label="Read full biography and background"
              >
                <span>More about me</span>
                <ArrowUpRight className="w-4 h-4 text-current group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
              </button>
              <button
                type="button"
                onClick={handleNavigate('projects')}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-mono text-xs sm:text-sm font-semibold transition-colors cursor-pointer border bg-white hover:bg-slate-50 border-slate-200 text-slate-700 hover:text-slate-900 shadow-xs"
              >
                <span>View Projects</span>
              </button>
            </div>
          </div>
        </div>

        {/* 3 Core Pillar Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 mb-8">
          {corePillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.id}
                className="group relative rounded-xl p-5 sm:p-6 transition-all duration-300 border bg-white border-slate-200/90 shadow-xs hover:border-sky-500/50 hover:shadow-md hover:shadow-sky-500/10 hover:-translate-y-0.5"
              >
                <div className="flex items-center justify-between gap-3 mb-3">
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center border transition-colors bg-sky-50 text-sky-600 border-sky-200/60 group-hover:bg-sky-500 group-hover:text-white group-hover:border-sky-500">
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-slate-400 group-hover:text-sky-600 transition-colors">
                    {pillar.subtitle}
                  </span>
                </div>

                <h3 className="font-serif text-lg sm:text-xl font-medium tracking-tight text-slate-900 mb-2 group-hover:text-sky-700 transition-colors">
                  {pillar.title}
                </h3>

                <p className="text-xs sm:text-sm leading-relaxed text-slate-600 mb-4 font-light">
                  {pillar.description}
                </p>

                <div className="flex flex-wrap gap-1.5 pt-3 border-t border-slate-100">
                  {pillar.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded text-[10.5px] font-mono font-medium border bg-slate-50 border-slate-200/80 text-slate-600 group-hover:border-slate-300 transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Highlight Credentials Strip */}
        <div className="p-4 sm:p-4.5 rounded-xl border bg-white border-slate-200/90 shadow-xs flex flex-wrap items-center justify-between gap-3 sm:gap-4 text-xs font-mono text-slate-600">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>B.Tech CSE Graduate (2022–2026)</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-sky-500 shrink-0" />
            <span>AWS Cloud & Linux System Practice</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-indigo-500 shrink-0" />
            <span>Full-Stack & Applied AI Engineering</span>
          </div>
        </div>
      </div>
    </motion.section>
  );
};
