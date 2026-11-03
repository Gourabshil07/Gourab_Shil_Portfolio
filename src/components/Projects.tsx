// import React, { useState } from 'react';
// import { ArrowUpRight, Filter } from 'lucide-react';
// import { PROJECTS } from '../data/portfolioData';

// const FILTER_CATEGORIES = ['All', 'Cloud', 'DevOps', 'SysAdmin', 'AI & ML', 'Web Apps'] as const;

// export const Projects: React.FC = () => {
//   const [selectedCategory, setSelectedCategory] = useState<string>('All');

//   const filteredProjects = selectedCategory === 'All'
//     ? PROJECTS
//     : PROJECTS.filter((p) => p.filterTags?.includes(selectedCategory));

//   return (
//     <section
//       id="projects"
//       className="pt-6 pb-14 sm:pt-8 sm:pb-16 md:pt-10 md:pb-20 relative bg-[#0B132B] text-slate-100"
//     >
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
//         {/* Section Header */}
//         <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
//           <div>
//             <div className="flex items-center gap-2 mb-3">
//               <span className="font-mono text-xs font-bold tracking-widest uppercase text-sky-400">
//                 02 / FEATURED WORK
//               </span>
//               <div className="h-px w-12 bg-sky-500/40" />
//             </div>
//             <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-normal leading-[1.14] tracking-tight mb-3 text-white">
//               Practical Projects
//             </h2>
//             <p className="text-base sm:text-lg max-w-xl text-slate-300 font-light leading-relaxed">
//               Real deployed applications spanning AI integration, cloud infrastructure, web APIs, and responsive frontends.
//             </p>
//           </div>

//           <div className="flex items-center gap-2 font-mono text-xs px-3.5 py-2 rounded-lg border text-slate-300 bg-slate-900/90 border-slate-800">
//             <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
//             <span>5 Live Deployments Verified</span>
//           </div>
//         </div>

//         {/* Category Filter Bar */}
//         <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10 pb-5 border-b border-slate-800/80">
//           <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-2 sm:pb-0 flex-nowrap sm:flex-wrap">
//             <span className="text-xs font-mono text-slate-400 uppercase tracking-wider mr-1 hidden sm:inline-flex items-center gap-1.5 shrink-0">
//               <Filter className="w-3.5 h-3.5 text-sky-400" />
//               <span>Filter:</span>
//             </span>
//             {FILTER_CATEGORIES.map((cat) => {
//               const isSelected = selectedCategory === cat;
//               const count = cat === 'All'
//                 ? PROJECTS.length
//                 : PROJECTS.filter((p) => p.filterTags?.includes(cat)).length;

//               return (
//                 <button
//                   key={cat}
//                   type="button"
//                   onClick={() => setSelectedCategory(cat)}
//                   className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium transition-all duration-200 cursor-pointer whitespace-nowrap ${
//                     isSelected
//                       ? 'bg-sky-500 text-slate-950 font-bold shadow-md shadow-sky-500/20'
//                       : 'bg-slate-900/90 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800 hover:border-slate-700'
//                   }`}
//                   aria-pressed={isSelected}
//                 >
//                   <span>{cat}</span>
//                   <span
//                     className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
//                       isSelected
//                         ? 'bg-slate-950/25 text-slate-950'
//                         : 'bg-slate-800 text-slate-400'
//                     }`}
//                   >
//                     {count}
//                   </span>
//                 </button>
//               );
//             })}
//           </div>

//           <div className="text-xs font-mono text-slate-400 shrink-0 self-start sm:self-center">
//             Showing <span className="font-bold text-sky-400">{filteredProjects.length}</span> of {PROJECTS.length} projects
//           </div>
//         </div>

//         {/* Projects Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//           {filteredProjects.map((project, idx) => {
//             const isFeatured = (selectedCategory === 'All' && idx === 0) || filteredProjects.length === 1;

//             return (
//               <a
//                 key={project.id}
//                 href={project.liveUrl}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className={`group relative rounded-2xl p-7 sm:p-8 transition-all duration-300 ease-out hover:-translate-y-2 hover:scale-[1.015] flex flex-col justify-between cursor-pointer border bg-[#0F172A] border-slate-800 hover:border-sky-500/60 hover:shadow-[0_20px_35px_-12px_rgba(14,165,233,0.2),0_10px_20px_-10px_rgba(0,0,0,0.6)] text-white will-change-transform ${
//                   isFeatured ? 'md:col-span-2 bg-[#131F37] border-slate-700/80 hover:border-sky-400/70 hover:shadow-[0_24px_45px_-12px_rgba(14,165,233,0.25),0_10px_20px_-10px_rgba(0,0,0,0.7)]' : ''
//                 }`}
//               >
//                 <div>
//                   {/* Top metadata bar with Live status */}
//                   <div className="flex items-center justify-between gap-4 mb-4">
//                     <div className="flex items-center gap-2">
//                       <span className="font-mono text-xs font-bold tracking-wider px-2.5 py-1 rounded border bg-sky-950/60 text-sky-400 border-sky-800/60 transition-transform duration-200 group-hover:scale-105">
//                         {project.number}
//                       </span>
//                       <span className="inline-flex items-center gap-1.5 font-mono text-[11px] font-semibold px-2 py-0.5 rounded border bg-emerald-950/40 text-emerald-400 border-emerald-800/40">
//                         <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
//                         Live
//                       </span>
//                     </div>

//                     <div className="flex items-center gap-1.5 font-mono text-[11px] transition-all duration-200 tracking-wide font-medium text-slate-400 group-hover:text-sky-300">
//                       <span>{project.category}</span>
//                       <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform text-sky-400" />
//                     </div>
//                   </div>

//                   {/* Title */}
//                   <h3 className="font-serif text-2xl sm:text-3xl font-medium tracking-tight mb-3 transition-colors text-white group-hover:text-sky-300">
//                     {project.name}
//                   </h3>

//                   {/* Description */}
//                   {project.description && (
//                     <p className="text-sm sm:text-base leading-relaxed mb-5 text-slate-300 font-light">
//                       {project.description}
//                     </p>
//                   )}

//                   {/* Project Specifications / Attributes Badges */}
//                   <div className="flex flex-wrap items-center gap-2 mb-4 pt-1">
//                     {project.language && (
//                       <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-mono border bg-sky-950/50 border-sky-800/60 text-sky-300 shadow-xs">
//                         <span className="text-slate-400 font-normal">Language:</span>
//                         <span className="font-semibold text-sky-200">{project.language}</span>
//                       </span>
//                     )}
//                     {project.categoryType && (
//                       <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-mono border bg-slate-800/80 border-slate-700/70 text-slate-300 shadow-xs">
//                         <span className="text-slate-400 font-normal">Category:</span>
//                         <span className="font-semibold text-slate-200">{project.categoryType}</span>
//                       </span>
//                     )}
//                     {project.platform && (
//                       <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-mono border bg-slate-800/80 border-slate-700/70 text-slate-300 shadow-xs">
//                         <span className="text-slate-400 font-normal">Platform:</span>
//                         <span className="font-semibold text-slate-200">{project.platform}</span>
//                       </span>
//                     )}
//                   </div>

//                   {/* Technology Tags */}
//                   {project.technologies && project.technologies.length > 0 && (
//                     <div className="flex flex-wrap gap-1.5">
//                       {project.technologies.map((tech) => (
//                         <span
//                           key={tech}
//                           className="px-2.5 py-1 rounded text-xs font-mono font-semibold transition-all duration-200 border bg-slate-800/80 border-slate-700/60 text-slate-200 hover:scale-105 hover:-translate-y-0.5 hover:bg-slate-700/90 hover:text-sky-200 hover:border-sky-500/40 hover:shadow-xs"
//                         >
//                           {tech}
//                         </span>
//                       ))}
//                     </div>
//                   )}
//                 </div>
//               </a>
//             );
//           })}
//         </div>
//       </div>
//     </section>
//   );
// };

// =====================================================update=========================================================


import React, { useState } from 'react';
import { ArrowUpRight, Filter } from 'lucide-react';
import { PROJECTS } from '../data/portfolioData';

const FILTER_CATEGORIES = ['All', 'Cloud', 'DevOps', 'SysAdmin', 'AI & ML', 'Web Apps'] as const;

export const Projects: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const filteredProjects = selectedCategory === 'All'
    ? PROJECTS
    : PROJECTS.filter((p) => p.filterTags?.includes(selectedCategory));

  return (
    <section
      id="projects"
      className="pt-6 pb-14 sm:pt-8 sm:pb-16 md:pt-10 md:pb-20 relative bg-[#0B132B] text-slate-100"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
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
              Real deployed applications spanning AI integration, IT incident management, cloud infrastructure, web APIs, and responsive frontends.
            </p>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs px-3.5 py-2 rounded-lg border text-slate-300 bg-slate-900/90 border-slate-800">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>{PROJECTS.length} Live Deployments Verified</span>
          </div>
        </div>

        {/* Category Filter Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10 pb-5 border-b border-slate-800/80">
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-2 sm:pb-0 flex-nowrap sm:flex-wrap">
            <span className="text-xs font-mono text-slate-400 uppercase tracking-wider mr-1 hidden sm:inline-flex items-center gap-1.5 shrink-0">
              <Filter className="w-3.5 h-3.5 text-sky-400" />
              <span>Filter:</span>
            </span>
            {FILTER_CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat;
              const count = cat === 'All'
                ? PROJECTS.length
                : PROJECTS.filter((p) => p.filterTags?.includes(cat)).length;

              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium transition-all duration-200 cursor-pointer whitespace-nowrap ${
                    isSelected
                      ? 'bg-sky-500 text-slate-950 font-bold shadow-md shadow-sky-500/20'
                      : 'bg-slate-900/90 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800 hover:border-slate-700'
                  }`}
                  aria-pressed={isSelected}
                >
                  <span>{cat}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                      isSelected
                        ? 'bg-slate-950/25 text-slate-950'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="text-xs font-mono text-slate-400 shrink-0 self-start sm:self-center">
            Showing <span className="font-bold text-sky-400">{filteredProjects.length}</span> of {PROJECTS.length} projects
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project, idx) => {
            const isFeatured = (selectedCategory === 'All' && idx === 0) || filteredProjects.length === 1;

            return (
              <a
                key={project.id}
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`group relative rounded-2xl p-7 sm:p-8 transition-all duration-300 ease-out hover:-translate-y-2 hover:scale-[1.015] flex flex-col justify-between cursor-pointer border bg-[#0F172A] border-slate-800 hover:border-sky-500/60 hover:shadow-[0_20px_35px_-12px_rgba(14,165,233,0.2),0_10px_20px_-10px_rgba(0,0,0,0.6)] text-white will-change-transform ${
                  isFeatured ? 'md:col-span-2 bg-[#131F37] border-slate-700/80 hover:border-sky-400/70 hover:shadow-[0_24px_45px_-12px_rgba(14,165,233,0.25),0_10px_20px_-10px_rgba(0,0,0,0.7)]' : ''
                }`}
              >
                <div>
                  {/* Top metadata bar with Live status */}
                  <div className="flex items-center justify-between gap-4 mb-4">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold tracking-wider px-2.5 py-1 rounded border bg-sky-950/60 text-sky-400 border-sky-800/60 transition-transform duration-200 group-hover:scale-105">
                        {project.number}
                      </span>
                      <span className="inline-flex items-center gap-1.5 font-mono text-[11px] font-semibold px-2 py-0.5 rounded border bg-emerald-950/40 text-emerald-400 border-emerald-800/40">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        Live
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 font-mono text-[11px] transition-all duration-200 tracking-wide font-medium text-slate-400 group-hover:text-sky-300">
                      <span>{project.category}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform text-sky-400" />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="font-serif text-2xl sm:text-3xl font-medium tracking-tight mb-3 transition-colors text-white group-hover:text-sky-300">
                    {project.name}
                  </h3>

                  {/* Description */}
                  {project.description && (
                    <p className="text-sm sm:text-base leading-relaxed mb-5 text-slate-300 font-light">
                      {project.description}
                    </p>
                  )}

                  {/* Project Specifications / Attributes Badges */}
                  <div className="flex flex-wrap items-center gap-2 mb-4 pt-1">
                    {project.language && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-mono border bg-sky-950/50 border-sky-800/60 text-sky-300 shadow-xs">
                        <span className="text-slate-400 font-normal">Language:</span>
                        <span className="font-semibold text-sky-200">{project.language}</span>
                      </span>
                    )}
                    {project.categoryType && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-mono border bg-slate-800/80 border-slate-700/70 text-slate-300 shadow-xs">
                        <span className="text-slate-400 font-normal">Category:</span>
                        <span className="font-semibold text-slate-200">{project.categoryType}</span>
                      </span>
                    )}
                    {project.platform && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-mono border bg-slate-800/80 border-slate-700/70 text-slate-300 shadow-xs">
                        <span className="text-slate-400 font-normal">Platform:</span>
                        <span className="font-semibold text-slate-200">{project.platform}</span>
                      </span>
                    )}
                  </div>

                  {/* Technology Tags */}
                  {project.technologies && project.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 rounded text-xs font-mono font-semibold transition-all duration-200 border bg-slate-800/80 border-slate-700/60 text-slate-200 hover:scale-105 hover:-translate-y-0.5 hover:bg-slate-700/90 hover:text-sky-200 hover:border-sky-500/40 hover:shadow-xs"
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



