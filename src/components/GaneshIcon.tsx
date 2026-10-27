import React from 'react';

interface GaneshIconProps {
  className?: string;
  size?: number;
}

export const GaneshIcon: React.FC<GaneshIconProps> = ({ className = 'w-16 h-16', size = 64 }) => {
  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      <svg
        viewBox="0 0 100 100"
        width={size}
        height={size}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="filter drop-shadow-[0_2px_8px_rgba(214,181,109,0.5)]"
      >
        <defs>
          <linearGradient id="goldGaneshGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF7D6" />
            <stop offset="30%" stopColor="#F7E6B0" />
            <stop offset="70%" stopColor="#D6B56D" />
            <stop offset="100%" stopColor="#9E782F" />
          </linearGradient>
          <filter id="ganeshGlow">
            <feDropShadow dx="0" dy="1" stdDeviation="1" floodColor="#D6B56D" floodOpacity="0.6"/>
          </filter>
        </defs>

        {/* Halo / Aura */}
        <circle cx="50" cy="48" r="42" stroke="url(#goldGaneshGrad)" strokeWidth="1.2" strokeDasharray="3 2" opacity="0.6" />
        <circle cx="50" cy="48" r="38" stroke="url(#goldGaneshGrad)" strokeWidth="0.8" opacity="0.4" />

        {/* Crown (Mukut) */}
        <path
          d="M38 28 L50 14 L62 28 L56 31 L50 25 L44 31 Z"
          fill="url(#goldGaneshGrad)"
          stroke="#510712"
          strokeWidth="0.5"
        />
        <circle cx="50" cy="18" r="1.5" fill="#FFF7E7" />
        <path d="M42 27 L58 27" stroke="url(#goldGaneshGrad)" strokeWidth="1.5" />

        {/* Ears */}
        {/* Left Ear */}
        <path
          d="M35 34 C24 34 22 45 27 52 C31 58 37 56 37 56"
          stroke="url(#goldGaneshGrad)"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        {/* Right Ear */}
        <path
          d="M65 34 C76 34 78 45 73 52 C69 58 63 56 63 56"
          stroke="url(#goldGaneshGrad)"
          strokeWidth="2.5"
          strokeLinecap="round"
        />

        {/* Head and Face */}
        <path
          d="M40 33 C45 31 55 31 60 33 C64 39 64 48 59 52 C54 55 46 55 41 52 C36 48 36 39 40 33 Z"
          fill="url(#goldGaneshGrad)"
          opacity="0.25"
        />

        {/* Sacred Tilak / Trishul */}
        <path d="M47 33 Q50 37 50 42 Q50 37 53 33" stroke="url(#goldGaneshGrad)" strokeWidth="1.8" strokeLinecap="round" />
        <circle cx="50" cy="35" r="1.2" fill="#E11D48" />

        {/* Eyes */}
        <ellipse cx="43" cy="39" rx="1.8" ry="1" fill="#35030C" />
        <ellipse cx="57" cy="39" rx="1.8" ry="1" fill="#35030C" />

        {/* Trunk (Sond) */}
        <path
          d="M50 42 C49 48 46 56 46 63 C46 69 51 72 55 72 C58 72 61 70 61 67 C61 64 57 63 55 65"
          stroke="url(#goldGaneshGrad)"
          strokeWidth="3.2"
          strokeLinecap="round"
        />

        {/* Modak (Sweet) in Hand */}
        <circle cx="68" cy="58" r="3" fill="url(#goldGaneshGrad)" />
        <path d="M68 55 L70 58 L66 58 Z" fill="#FFF7E7" />

        {/* Blessing Hand (Abhaya Mudra) */}
        <path
          d="M32 50 C29 48 27 52 28 55 C29 57 32 57 34 54 Z"
          fill="url(#goldGaneshGrad)"
        />

        {/* Tusk */}
        <path d="M45 49 L42 52" stroke="#FFF7E7" strokeWidth="1.5" strokeLinecap="round" />

        {/* Om sign embellishment below */}
        <path
          d="M45 83 C45 80 48 78 51 80 C54 82 54 86 51 88 C48 90 44 88 44 85"
          stroke="url(#goldGaneshGrad)"
          strokeWidth="1.2"
          strokeLinecap="round"
          opacity="0.8"
        />
        <path d="M51 84 C54 84 57 82 58 79" stroke="url(#goldGaneshGrad)" strokeWidth="1.2" strokeLinecap="round" opacity="0.8" />
        <path d="M52 77 Q55 76 57 77" stroke="url(#goldGaneshGrad)" strokeWidth="1" opacity="0.8" />
        <circle cx="56" cy="74" r="0.8" fill="url(#goldGaneshGrad)" />
      </svg>
    </div>
  );
};

export const DiyaIcon: React.FC<{ className?: string }> = ({ className = 'w-8 h-8' }) => {
  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      <svg viewBox="0 0 40 40" className="w-full h-full" fill="none">
        <defs>
          <linearGradient id="goldDiyaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF7D6" />
            <stop offset="50%" stopColor="#D6B56D" />
            <stop offset="100%" stopColor="#8F6723" />
          </linearGradient>
        </defs>
        {/* Flame */}
        <path
          d="M20 5 C20 5 15 13 15 17 C15 20 17.5 22 20 22 C22.5 22 25 20 25 17 C25 13 20 5 20 5 Z"
          fill="#F59E0B"
          className="diya-flame"
        />
        <path
          d="M20 9 C20 9 17 14 17 17 C17 19 18.5 20.5 20 20.5 C21.5 20.5 23 19 23 17 C23 14 20 9 20 9 Z"
          fill="#FEF08A"
          className="diya-flame"
        />
        {/* Base of Diya */}
        <path
          d="M8 21 C12 28 28 28 32 21 C33 24 31 29 20 29 C9 29 7 24 8 21 Z"
          fill="url(#goldDiyaGrad)"
        />
        <ellipse cx="20" cy="21" rx="12" ry="2.5" fill="#78350F" />
        {/* Stand */}
        <path d="M17 29 L15 34 L25 34 L23 29 Z" fill="url(#goldDiyaGrad)" />
      </svg>
    </div>
  );
};

export const IndianDivider: React.FC<{ className?: string; text?: string }> = ({
  className = '',
  text,
}) => {
  return (
    <div className={`flex items-center justify-center gap-3 my-4 ${className}`}>
      <div className="h-[1px] w-12 sm:w-20 bg-gradient-to-r from-transparent via-[#D6B56D] to-[#F7E6B0]"></div>
      <span className="text-[#D6B56D] text-xs">❖</span>
      {text ? (
        <span className="text-sm font-semibold tracking-wider text-[#F7E6B0] uppercase px-1">
          {text}
        </span>
      ) : (
        <span className="text-[#F7E6B0] text-sm">✦ ॐ ✦</span>
      )}
      <span className="text-[#D6B56D] text-xs">❖</span>
      <div className="h-[1px] w-12 sm:w-20 bg-gradient-to-l from-transparent via-[#D6B56D] to-[#F7E6B0]"></div>
    </div>
  );
};
