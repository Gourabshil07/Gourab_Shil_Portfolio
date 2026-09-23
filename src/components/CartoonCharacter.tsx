import React from 'react';
import { motion, useReducedMotion } from 'motion/react';

interface CartoonCharacterProps {
  className?: string;
}

export const CartoonCharacter: React.FC<CartoonCharacterProps> = ({ className = '' }) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className={`relative flex items-center justify-center select-none ${className}`}>
      {/* Speech Bubble "Hi! 👋" floating beside the man */}
      <motion.div
        initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.6, y: 8 }}
        animate={
          shouldReduceMotion
            ? { opacity: 1 }
            : {
                opacity: 1,
                scale: 1,
                y: [0, -4, 0],
              }
        }
        transition={
          shouldReduceMotion
            ? { duration: 0.3 }
            : {
                y: {
                  repeat: Infinity,
                  duration: 2.4,
                  ease: 'easeInOut',
                },
                opacity: { duration: 0.35, delay: 0.15 },
                scale: { duration: 0.45, delay: 0.15, ease: [0.175, 0.885, 0.32, 1.275] },
              }
        }
        className="absolute -top-2 -right-2 sm:right-0 z-20"
      >
        <div className="relative bg-white text-slate-900 px-2.5 py-1 rounded-xl shadow-md border border-sky-400 font-bold text-xs flex items-center gap-1">
          <span className="font-sans font-extrabold text-sky-600">Hi!</span>
          <span className="text-sm">👋</span>
          {/* Speech bubble pointer triangle */}
          <div className="absolute -bottom-1.5 left-3 w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[6px] border-t-sky-400" />
          <div className="absolute -bottom-[5px] left-[13px] w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[5px] border-t-white" />
        </div>
      </motion.div>

      {/* Floating Sparkles */}
      {!shouldReduceMotion && (
        <>
          <motion.div
            animate={{
              scale: [1, 1.25, 1],
              opacity: [0.5, 0.9, 0.5],
              rotate: [0, 45, 0],
            }}
            transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
            className="absolute -top-1 left-1 text-amber-400 text-xs pointer-events-none"
          >
            ✦
          </motion.div>
          <motion.div
            animate={{
              scale: [0.8, 1.2, 0.8],
              opacity: [0.4, 0.8, 0.4],
            }}
            transition={{ repeat: Infinity, duration: 2.6, delay: 0.4, ease: 'easeInOut' }}
            className="absolute bottom-2 right-1 text-sky-400 text-[10px] pointer-events-none"
          >
            ★
          </motion.div>
        </>
      )}

      {/* Main SVG: Handsome, Mature Young Man with Groomed Stubble & Smart Blazer */}
      <motion.div
        animate={
          shouldReduceMotion
            ? {}
            : {
                y: [0, -2.5, 0],
              }
        }
        transition={{
          repeat: Infinity,
          duration: 2.8,
          ease: 'easeInOut',
        }}
        className="w-24 h-24 sm:w-28 sm:h-28 relative"
      >
        <svg
          viewBox="0 0 160 160"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-sm overflow-visible"
        >
          <defs>
            {/* Skin Gradient with natural warm masculine tone */}
            <linearGradient id="manSkin" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F9D7B7" />
              <stop offset="100%" stopColor="#EEBC94" />
            </linearGradient>
            {/* Hair Gradient */}
            <linearGradient id="manHair" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#1E202B" />
              <stop offset="100%" stopColor="#111319" />
            </linearGradient>
            {/* Smart Navy Jacket Gradient */}
            <linearGradient id="manJacket" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1E293B" />
              <stop offset="100%" stopColor="#0F172A" />
            </linearGradient>
            {/* Inner shirt gradient */}
            <linearGradient id="manShirt" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#F8FAFC" />
              <stop offset="100%" stopColor="#E2E8F0" />
            </linearGradient>
          </defs>

          {/* Background Aura / Glow Ring */}
          <circle cx="80" cy="82" r="54" fill="#E0F2FE" opacity="0.6" />
          <circle cx="80" cy="82" r="46" fill="#BAE6FD" opacity="0.35" />

          {/* Torso: Broad Masculine Shoulders, White Collared Shirt & Navy Blazer */}
          <g id="man-torso">
            {/* Broad Shoulders Base */}
            <path
              d="M30 156 C32 120 52 110 80 110 C108 110 128 120 130 156 Z"
              fill="url(#manJacket)"
            />

            {/* Crisp White Shirt V-Neck Open Collar */}
            <path
              d="M65 110 L80 144 L95 110 Z"
              fill="url(#manShirt)"
            />
            {/* Left Shirt Collar Lapel */}
            <path
              d="M63 110 L76 128 L80 110 Z"
              fill="#FFFFFF"
              stroke="#CBD5E1"
              strokeWidth="0.8"
            />
            {/* Right Shirt Collar Lapel */}
            <path
              d="M97 110 L84 128 L80 110 Z"
              fill="#FFFFFF"
              stroke="#CBD5E1"
              strokeWidth="0.8"
            />

            {/* Blazer Lapels */}
            <path
              d="M48 116 L65 152 L55 156 L38 126 Z"
              fill="#0F172A"
            />
            <path
              d="M112 116 L95 152 L105 156 L122 126 Z"
              fill="#0F172A"
            />

            {/* Left Arm at side */}
            <path
              d="M34 126 C28 136 26 146 28 156"
              stroke="#0F172A"
              strokeWidth="11"
              strokeLinecap="round"
            />
          </g>

          {/* Strong Neck */}
          <rect x="72" y="94" width="16" height="20" rx="8" fill="url(#manSkin)" />
          {/* Subtle Neck shadow under defined chin */}
          <path
            d="M72 101 C76 106 84 106 88 101 Z"
            fill="#DFA67D"
            opacity="0.6"
          />

          {/* Head & Masculine Face Structure */}
          <g id="man-head">
            {/* Left Ear */}
            <ellipse cx="48" cy="72" rx="4.5" ry="7" fill="url(#manSkin)" />
            <ellipse cx="48" cy="72" rx="2.5" ry="4" fill="#DFAC85" />

            {/* Right Ear */}
            <ellipse cx="112" cy="72" rx="4.5" ry="7" fill="url(#manSkin)" />
            <ellipse cx="112" cy="72" rx="2.5" ry="4" fill="#DFAC85" />

            {/* Masculine Jawline & Head Contour: broader jaw, square chin */}
            <path
              d="M52 64 C50 82 56 97 70 102 C75 104 85 104 90 102 C104 97 110 82 108 64 C108 46 98 42 80 42 C62 42 52 46 52 64 Z"
              fill="url(#manSkin)"
            />

            {/* Lightly Groomed Five-O'Clock Stubble along jawline & chin */}
            <path
              d="M55 76 C55 93 62 102 73 103 C77 104.5 83 104.5 87 103 C98 102 105 93 105 76 C102 85 96 97 88 98 C83 99 77 99 72 98 C64 97 58 85 55 76 Z"
              fill="#B4815B"
              opacity="0.32"
            />

            {/* Confident Masculine Eyebrows */}
            <path
              d="M57 56 Q66 52 75 55"
              stroke="#1E202B"
              strokeWidth="2.8"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M85 55 Q94 52 103 56"
              stroke="#1E202B"
              strokeWidth="2.8"
              strokeLinecap="round"
              fill="none"
            />

            {/* Confident, Warm Eyes */}
            <g id="man-eyes">
              {/* Left Eye */}
              <ellipse cx="66" cy="67" rx="5.5" ry="4" fill="#FFFFFF" />
              <circle cx="67" cy="67" r="3.2" fill="#1E293B" />
              <circle cx="68" cy="65.5" r="1.1" fill="#FFFFFF" />

              {/* Right Eye */}
              <ellipse cx="94" cy="67" rx="5.5" ry="4" fill="#FFFFFF" />
              <circle cx="93" cy="67" r="3.2" fill="#1E293B" />
              <circle cx="94" cy="65.5" r="1.1" fill="#FFFFFF" />
            </g>

            {/* Chiseled Nose Bridge */}
            <path
              d="M79 63 L80 73 L83 75"
              stroke="#C98B60"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />

            {/* Confident Warm Smile with Masculine Lip Contour */}
            <path
              d="M69 82 Q80 92 91 82"
              stroke="#8B2525"
              strokeWidth="2.4"
              strokeLinecap="round"
              fill="#7A1D1D"
            />
            {/* White clean teeth line */}
            <path
              d="M71 83 Q80 87 89 83"
              fill="#FFFFFF"
            />

            {/* Modern Handsome Hairstyle: Textured side-part pompadour with tapered fade */}
            {/* Base Hair volume */}
            <path
              d="M48 62 C46 44 54 30 78 28 C98 26 112 34 112 56 C110 50 106 46 95 44 C82 42 70 46 60 54 C54 58 50 60 48 62 Z"
              fill="url(#manHair)"
            />
            {/* Top Textured Sweep / Quiff */}
            <path
              d="M52 48 C56 32 72 26 88 28 C104 30 110 40 108 48 C102 38 88 34 76 36 C64 38 56 42 52 48 Z"
              fill="#2D313F"
            />
            {/* Side Fade Trim line */}
            <path
              d="M48 62 C48 56 50 52 54 48 L56 58 Z"
              fill="#181A23"
            />
            <path
              d="M112 62 C112 56 110 52 106 48 L104 58 Z"
              fill="#181A23"
            />
          </g>

          {/* ANIMATED WAVING RIGHT HAND & ARM (Men's Suit Sleeve & Hand) */}
          <g transform="translate(118, 120)">
            <motion.g
              id="waving-arm-group"
              animate={
                shouldReduceMotion
                  ? {}
                  : {
                      rotate: [0, 20, -10, 20, -6, 0],
                    }
              }
              transition={{
                repeat: Infinity,
                duration: 1.6,
                ease: 'easeInOut',
              }}
            >
              {/* Suit Sleeve Angled Up */}
              <path
                d="M 0 0 Q 14 -12 18 -32"
                stroke="#1E293B"
                strokeWidth="12"
                strokeLinecap="round"
                fill="none"
              />

              {/* White Shirt Cuff peeking through */}
              <ellipse cx="18" cy="-32" rx="6.5" ry="3.5" fill="#FFFFFF" />

              {/* Masculine Waving Hand / Palm & Fingers */}
              <g transform="translate(18, -32)">
                {/* Palm */}
                <circle cx="3" cy="-10" r="7.5" fill="url(#manSkin)" />
                {/* Thumb */}
                <path
                  d="M-2 -7 C-6 -8 -7 -12 -4 -14 C-2 -15 0 -13 1 -10 Z"
                  fill="url(#manSkin)"
                />
                {/* Index finger */}
                <rect x="0" y="-22" width="3.6" height="9" rx="1.8" fill="url(#manSkin)" transform="rotate(-6 0 -22)" />
                {/* Middle finger */}
                <rect x="3.6" y="-23" width="3.6" height="10" rx="1.8" fill="url(#manSkin)" transform="rotate(2 3.6 -23)" />
                {/* Ring finger */}
                <rect x="7.2" y="-21" width="3.6" height="9" rx="1.8" fill="url(#manSkin)" transform="rotate(8 7.2 -21)" />
                {/* Little finger */}
                <rect x="10.4" y="-18" width="3.4" height="7" rx="1.7" fill="url(#manSkin)" transform="rotate(16 10.4 -18)" />
              </g>
            </motion.g>
          </g>
        </svg>
      </motion.div>
    </div>
  );
};
