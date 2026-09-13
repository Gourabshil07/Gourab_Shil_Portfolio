import React from 'react';

const TICKER_TEXT = "CLOUD → SYSTEMS → SERVICE    +";
const REPEATS = Array.from({ length: 10 });

interface TickerProps {
  isLight?: boolean;
}

export const Ticker: React.FC<TickerProps> = () => {
  return (
    <div
      className="w-full max-w-full overflow-hidden border-t py-2 sm:py-2.5 select-none pointer-events-none transition-colors duration-200 bg-[#F8FAFC] border-slate-200 text-slate-600"
      aria-hidden="true"
    >
      <div className="animate-ticker flex items-center">
        {/* First track */}
        <div className="flex shrink-0 items-center">
          {REPEATS.map((_, i) => (
            <span
              key={`t-a-${i}`}
              className="font-mono text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider whitespace-pre pr-8 sm:pr-10 text-slate-600"
            >
              {TICKER_TEXT}
            </span>
          ))}
        </div>

        {/* Second identical track for seamless infinite loop */}
        <div className="flex shrink-0 items-center">
          {REPEATS.map((_, i) => (
            <span
              key={`t-b-${i}`}
              className="font-mono text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider whitespace-pre pr-8 sm:pr-10 text-slate-600"
            >
              {TICKER_TEXT}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

