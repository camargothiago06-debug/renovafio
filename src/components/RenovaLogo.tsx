import React from 'react';
import { GenderMode } from '../types';

interface RenovaLogoProps {
  gender?: GenderMode;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showSubtitle?: boolean;
}

export const RenovaLogo: React.FC<RenovaLogoProps> = ({
  gender = 'masculino',
  className = '',
  size = 'md',
  showSubtitle = false,
}) => {
  const isFemale = gender === 'feminino';

  const sizeClasses = {
    sm: 'h-6 text-lg',
    md: 'h-8 text-2xl',
    lg: 'h-11 text-3xl',
    xl: 'h-16 text-4xl sm:text-5xl',
  };

  const goldPrimary = isFemale ? '#E2A999' : '#D4AF37';
  const goldSecondary = isFemale ? '#DFB775' : '#AA771C';
  const goldLight = isFemale ? '#FFF2F0' : '#FFF0D0';

  return (
    <div className={`inline-flex flex-col items-start select-none ${className}`}>
      <div className={`flex items-baseline font-display tracking-wider font-semibold ${sizeClasses[size]}`}>
        {/* Custom stylized "R" with swoosh inspired by brand logo */}
        <div className="relative inline-flex items-center mr-1">
          <svg
            viewBox="0 0 100 100"
            className={`${size === 'sm' ? 'w-5 h-5' : size === 'md' ? 'w-7 h-7' : size === 'lg' ? 'w-9 h-9' : 'w-12 h-12'} inline-block -mb-1`}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id={`goldGrad-${gender}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={goldLight} />
                <stop offset="50%" stopColor={goldPrimary} />
                <stop offset="100%" stopColor={goldSecondary} />
              </linearGradient>
            </defs>
            {/* Upper swoosh horn */}
            <path
              d="M18 24C24 16 38 12 56 16C72 20 78 32 74 46C70 60 56 64 42 63L36 63L58 88C61 91 66 93 72 93"
              stroke={`url(#goldGrad-${gender})`}
              strokeWidth="6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Elegant curved stem with leaf terminal */}
            <path
              d="M20 90C18 70 24 45 38 22"
              stroke={`url(#goldGrad-${gender})`}
              strokeWidth="5.5"
              strokeLinecap="round"
            />
            {/* Delicate drop dot */}
            <circle
              cx="21"
              cy="74"
              r="3.5"
              fill={`url(#goldGrad-${gender})`}
            />
          </svg>
        </div>

        {/* enova */}
        <span
          className="font-normal tracking-[0.08em] bg-clip-text text-transparent"
          style={{
            backgroundImage: `linear-gradient(135deg, ${goldLight} 0%, ${goldPrimary} 45%, ${goldSecondary} 85%, ${goldLight} 100%)`,
          }}
        >
          enova
        </span>

        {/* fio */}
        <span
          className="ml-1.5 font-light tracking-[0.04em] lowercase italic text-[0.82em] bg-clip-text text-transparent opacity-90"
          style={{
            backgroundImage: `linear-gradient(135deg, ${goldLight} 0%, ${goldPrimary} 60%, ${goldSecondary} 100%)`,
            fontFamily: 'var(--font-cormorant)',
          }}
        >
          fio
        </span>
      </div>

      {showSubtitle && (
        <span className="text-[9px] sm:text-[10px] tracking-[0.35em] uppercase font-light text-zinc-400 mt-0.5 ml-1">
          Alta Tricologia Farmacêutica
        </span>
      )}
    </div>
  );
};
