import React from 'react';
import { PROJECTS } from '../data/portfolioData';

export const Projects: React.FC = () => {
  return (
    <section
      id="projects"
      className="pt-6 pb-14 sm:pt-8 sm:pb-16 md:pt-10 md:pb-20 relative bg-[#0B132B] text-slate-100"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="font-mono text-xs font-bold tracking-widest uppercase text-sky-400">
                02 / FEATURED WORK
              </span>
              <div className="h-px w-12 bg-sky-500/40" />
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-normal leading-[1.14] tracking-tight mb-3 text-white">
              Practical Projects
            </h2>
            <p className="text-base sm:text-lg max-w-xl text-slate-300 font-light leading-relaxed">
              Real deployed applications spanning AI integration, cloud infrastructure, web APIs, and responsive frontends.
            </p>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs px-3.5 py-2 rounded-lg border text-slate-300 bg-slate-900/90 border-slate-800">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>5 Live Deployments Verified</span>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {PROJECTS.map((project, idx) => {
            const isFeatured = idx === 0; // Leafnova AI featured prominence
            return (
              <a
                key={project.id}
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`group relative rounded-2xl p-7 sm:p-8 transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between cursor-pointer border bg-[#0F172A] border-slate-800 hover:border-sky-500/50 hover:shadow-2xl hover:shadow-black/60 text-white ${
                  isFeatured ? 'md:col-span-2 bg-[#131F37] border-slate-700/80' : ''
                }`}
              >
                <div>
                  {/* Top metadata bar with Live status */}
                  <div className="flex items-center justify-between gap-4 mb-4">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold tracking-wider px-2.5 py-1 rounded border bg-sky-950/60 text-sky-400 border-sky-800/60">
                        {project.number}
                      </span>
                      <span className="inline-flex items-center gap-1.5 font-mono text-[11px] font-semibold px-2 py-0.5 rounded border bg-emerald-950/40 text-emerald-400 border-emerald-800/40">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        Live
                      </span>
                    </div>
                    <span className="font-mono text-[11px] transition-colors tracking-wide font-medium text-slate-400 group-hover:text-sky-300">
                      {project.category}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-serif text-2xl sm:text-3xl font-medium tracking-tight mb-3 transition-colors text-white group-hover:text-sky-300">
                    {project.name}
                  </h3>

                  {/* Description */}
                  {project.description && (
                    <p className="text-sm sm:text-base leading-relaxed mb-6 text-slate-300 font-light">
                      {project.description}
                    </p>
                  )}

                  {/* Technology Tags */}
                  {project.technologies && project.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 rounded text-xs font-mono font-semibold transition-colors border bg-slate-800/80 border-slate-700/60 text-slate-200"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
};


