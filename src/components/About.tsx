import React from 'react';
import { Briefcase, GraduationCap, Compass, Sparkles } from 'lucide-react';
import { ABOUT_CONTENT, EXPERIENCES, EDUCATION_LIST } from '../data/portfolioData';
import gourabPng from '../assets/images/Gourab_Shil.png';

export const About: React.FC = () => {
  return (
    <section
      id="about"
      className="w-full max-w-full pt-6 pb-14 sm:pt-8 sm:pb-16 md:pt-10 md:pb-20 relative overflow-hidden bg-[#FAF9F5] text-slate-900"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative w-full">
        {/* Section Header & Bio + Photo */}
        <div>
          {/* Section Tag */}
          <div className="flex items-center gap-2 mb-4">
            <span className="font-mono text-xs font-bold tracking-widest uppercase text-sky-600">
              01 / ABOUT GOURAB SHIL
            </span>
            <div className="h-px w-12 bg-sky-500/30" />
          </div>

          {/* Main Heading in Editorial Display Serif & Photo on the Right - Top-aligned two-column layout */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-10 xl:gap-12 items-start mb-12 sm:mb-16">
            <div className="md:col-span-7 lg:col-span-7 xl:col-span-8">
              <h2 className="font-serif italic text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal leading-[1.15] mb-6 text-slate-900">
                &ldquo;{ABOUT_CONTENT.heading}&rdquo;
              </h2>
              <div className="space-y-4 text-base sm:text-lg leading-relaxed text-slate-700 font-light">
                {ABOUT_CONTENT.paragraphs.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>
            </div>

            {/* Clean Profile Photo Presentation - Shifted closer to content on desktop with increased height */}
            <div className="md:col-span-5 lg:col-span-5 xl:col-span-4 flex flex-col items-center md:items-start md:pl-2 lg:pl-4 xl:pl-6 justify-start pt-1 md:pt-2">
              <div className="relative w-full max-w-[240px] sm:max-w-[260px] md:max-w-[270px] lg:max-w-[290px] group">
                {/* Clean Image Frame without outer thick border */}
                <div className="relative rounded-2xl overflow-hidden border shadow-sm bg-white border-slate-200 group-hover:border-sky-500/40 transition-colors">
                  <div className="relative aspect-[4/4.7] lg:max-h-[calc(100%-2px)] w-full overflow-hidden">
                    <img
                      src={gourabPng}
                      alt="Gourab Shil - Profile Photo"
                      className="w-full h-full object-cover object-[center_12%] filter brightness-[1.02] contrast-[1.02] transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  </div>
                </div>

                {/* Clean Minimal Single-Line Identity Information */}
                <div className="mt-3 flex items-center justify-between gap-3 px-1">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="w-1.5 h-1.5 rounded-full shrink-0 bg-sky-500" />
                    <span className="text-sm font-bold tracking-tight truncate text-slate-900">
                      Gourab Shil
                    </span>
                  </div>

                  <span className="font-mono text-xs font-bold tracking-wider uppercase shrink-0 text-sky-600">
                    CSE GRADUATE
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sub-Section 1: HOW I WORK */}
        <div className="my-20 pt-16 border-t border-slate-200">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <span className="font-mono text-xs font-bold tracking-wider uppercase block mb-2 text-teal-600">
                WORKING PRINCIPLES
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-normal tracking-tight whitespace-pre-line text-slate-900">
                {ABOUT_CONTENT.howIWork.title}
              </h3>
            </div>
            <p className="text-sm max-w-md text-slate-600 font-light leading-relaxed">
              {ABOUT_CONTENT.howIWork.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {ABOUT_CONTENT.howIWork.cards.map((card) => (
              <div
                key={card.number}
                className="group relative p-6 sm:p-8 rounded-xl transition-all duration-300 hover:-translate-y-1 border bg-white border-slate-200 hover:border-slate-300 shadow-sm"
              >
                <div className="flex items-center justify-between mb-6">
                  <span className="font-mono text-2xl font-bold text-sky-600 group-hover:text-sky-700 transition-colors">
                    {card.number}
                  </span>
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors border bg-slate-50 border-slate-200 text-sky-600 group-hover:bg-slate-100">
                    <Compass className="w-4 h-4" />
                  </div>
                </div>

                <h4 className="font-serif text-lg font-medium mb-3 transition-colors text-slate-900 group-hover:text-sky-600">
                  {card.title}
                </h4>
                <p className="text-sm leading-relaxed text-slate-600 font-light">
                  {card.description}
                </p>

                {/* Subtle bottom edge accent */}
                <div className="absolute inset-x-6 bottom-0 h-0.5 bg-transparent group-hover:bg-sky-500 transition-colors duration-300" />
              </div>
            ))}
          </div>
        </div>

        {/* Sub-Section 2: CAREER PROFILE (Deep Navy Contrast Highlight) */}
        <div className="my-20 p-8 sm:p-10 rounded-2xl relative overflow-hidden shadow-xl border bg-[#0B132B] border-slate-800 text-white shadow-slate-300/40">
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-4 h-4 text-sky-400" />
              <span className="font-mono text-xs font-bold tracking-wider uppercase text-sky-400">
                CAREER PROFILE &amp; OBJECTIVE
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-8 space-y-4 text-slate-200 text-sm sm:text-base leading-relaxed font-light">
                <p>{ABOUT_CONTENT.careerProfile.summary[0]}</p>
                <p>{ABOUT_CONTENT.careerProfile.summary[1]}</p>
              </div>

              <div className="lg:col-span-4 p-5 rounded-xl border flex flex-col justify-between h-full bg-[#060A13]/90 border-slate-800/90">
                <div>
                  <span className="font-mono text-[11px] uppercase tracking-wider block mb-2 font-bold text-teal-400">
                    Target Opportunities
                  </span>
                  <p className="text-xs text-slate-300 leading-relaxed font-light">
                    {ABOUT_CONTENT.careerProfile.summary[2]}
                  </p>
                </div>
                <div className="mt-4 pt-4 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono font-medium text-slate-300">
                  <span>Available Immediately</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sub-Section 3 & 4: EXPERIENCE & EDUCATION */}
        <div className="mt-20 pt-16 border-t border-slate-200 grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Experience Timeline (7 cols) */}
          <div className="lg:col-span-7">
            <div className="flex items-center gap-2 mb-6">
              <Briefcase className="w-4 h-4 text-sky-600" />
              <h3 className="font-serif text-2xl font-normal tracking-tight text-slate-900">
                Work Experience &amp; Internships
              </h3>
            </div>
            <p className="text-xs font-mono mb-8 text-slate-500">
              Hands-on practical experience in technical support, cloud services, and software delivery.
            </p>

            <div className="relative pl-6 border-l border-slate-200 space-y-10">
              {EXPERIENCES.map((exp) => (
                <div key={exp.id} className="relative group">
                  {/* Timeline node */}
                  <div className="absolute -left-[31px] top-1.5 w-3.5 h-3.5 rounded-full border-2 group-hover:scale-110 transition-transform shadow-sm bg-[#FAF9F5] border-sky-500 group-hover:border-sky-600" />

                  <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1 mb-1">
                    <h4 className="font-serif text-lg font-medium transition-colors text-slate-900 group-hover:text-sky-600">
                      {exp.company}
                    </h4>
                    <span className="font-mono text-xs text-slate-500">
                      {exp.period} <span className="text-slate-400">({exp.duration})</span>
                    </span>
                  </div>

                  <div className="text-xs font-mono mb-3 font-semibold text-sky-600">
                    {exp.role} {exp.note && <span className="text-slate-400">· {exp.note}</span>}
                  </div>

                  {exp.bullets && exp.bullets.length > 0 && (
                    <div className="space-y-2">
                      {exp.bullets.map((b, bIdx) => (
                        <p
                          key={bIdx}
                          className="text-xs sm:text-sm leading-relaxed text-slate-600 font-light"
                        >
                          {b}
                        </p>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Education Timeline (5 cols) */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-2 mb-6">
              <GraduationCap className="w-4 h-4 text-teal-600" />
              <h3 className="font-serif text-2xl font-normal tracking-tight text-slate-900">
                Education
              </h3>
            </div>
            <p className="text-xs font-mono mb-8 text-slate-500">
              Academic foundation in Computer Science &amp; Engineering.
            </p>

            <div className="space-y-4">
              {EDUCATION_LIST.map((edu) => (
                <div
                  key={edu.id}
                  className="p-5 rounded-xl transition-colors border bg-white border-slate-200 hover:border-slate-300 shadow-sm"
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-mono text-xs font-bold text-teal-600">
                      {edu.period}
                    </span>
                  </div>
                  <h4 className="text-sm sm:text-base font-bold mb-1 text-slate-900">
                    {edu.degree}
                  </h4>
                  <p className="text-xs mb-2 text-slate-700 font-medium">
                    {edu.institution}
                  </p>
                  <p className="text-xs leading-relaxed text-slate-500 font-normal">
                    {edu.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};


