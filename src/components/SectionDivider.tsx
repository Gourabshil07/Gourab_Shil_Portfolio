import React from 'react';

interface SectionDividerProps {
  variant?: 'dark' | 'light' | 'neon';
  label?: string;
  className?: string;
}

export const SectionDivider: React.FC<SectionDividerProps> = ({
  variant = 'dark',
  label,
  className = '',
}) => {
  if (variant === 'neon') {
    return (
      <div
        className={`w-full flex items-center justify-center select-none pointer-events-none bg-[#E5F4EC] py-1.5 ${className}`}
        aria-hidden="true"
      >
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-emerald-500/40 to-emerald-400/20" />
          <div className="mx-4 flex items-center gap-2">
            <span className="font-mono text-[9px] text-emerald-600 select-none">+</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
            <span className="font-mono text-[9px] text-emerald-600 select-none">+</span>
          </div>
          <div className="h-px flex-1 bg-gradient-to-r from-emerald-400/20 via-emerald-500/40 to-transparent" />
        </div>
      </div>
    );
  }

  if (variant === 'light') {
    return (
      <div
        className={`w-full max-w-full flex items-center justify-center select-none pointer-events-none bg-[#FAF9F5] py-1.5 border-t border-slate-200/80 ${className}`}
        aria-hidden="true"
      >
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-300 to-transparent" />
          {label ? (
            <div className="mx-3 flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white border border-slate-200 shadow-sm">
              <span className="w-1 h-1 rounded-full bg-sky-500" />
              <span className="font-mono text-[10px] font-bold text-slate-600 uppercase tracking-widest">
                {label}
              </span>
              <span className="w-1 h-1 rounded-full bg-teal-500" />
            </div>
          ) : (
            <div className="mx-3 flex items-center gap-1.5 px-2 py-0.5">
              <span className="w-1 h-1 rounded-full bg-slate-400" />
              <span className="font-mono text-[9px] text-slate-400 select-none">◇</span>
              <span className="w-1 h-1 rounded-full bg-slate-400" />
            </div>
          )}
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-300 to-transparent" />
        </div>
      </div>
    );
  }

  // Dark variant (Deep Navy)
  return (
    <div
      className={`w-full flex items-center justify-center select-none pointer-events-none bg-[#0B132B] py-1.5 border-t border-slate-800/80 ${className}`}
      aria-hidden="true"
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-700/80 to-transparent" />
        {label ? (
          <div className="mx-3 flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-slate-900 border border-slate-800 shadow-inner">
            <span className="w-1 h-1 rounded-full bg-sky-400" />
            <span className="font-mono text-[10px] font-bold text-slate-300 uppercase tracking-widest">
              {label}
            </span>
            <span className="w-1 h-1 rounded-full bg-teal-400" />
          </div>
        ) : (
          <div className="mx-3 flex items-center gap-1.5 px-2 py-0.5">
            <span className="w-1 h-1 rounded-full bg-slate-700" />
            <span className="font-mono text-[9px] text-slate-500 select-none">◇</span>
            <span className="w-1 h-1 rounded-full bg-slate-700" />
          </div>
        )}
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-700/80 to-transparent" />
      </div>
    </div>
  );
};
