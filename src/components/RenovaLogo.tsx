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

  // Responsive class-based sizing preserving aspect ratio perfectly
  const sizeClasses = {
    sm: 'h-8 sm:h-9 md:h-10',
    md: 'h-10 sm:h-12 md:h-13 lg:h-14',
    lg: 'h-12 sm:h-14 md:h-16 lg:h-18',
    xl: 'h-16 sm:h-20 md:h-24 lg:h-28',
  };

  const gradientId = `renovaBrandGrad-${gender}`;

  return (
    <div className={`inline-flex flex-col items-start select-none ${className}`}>
      <div className="relative flex items-center">
        <svg
          viewBox="0 0 910 265"
          preserveAspectRatio="xMinYMid meet"
          className={`${sizeClasses[size]} w-auto max-w-full transition-all duration-300 drop-shadow-[0_2px_12px_rgba(0,0,0,0.45)]`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {isFemale ? (
              <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="85%">
                <stop offset="0%" stopColor="#FFF3F0" />
                <stop offset="20%" stopColor="#F7D2C4" />
                <stop offset="45%" stopColor="#E5A898" />
                <stop offset="70%" stopColor="#DCA876" />
                <stop offset="90%" stopColor="#C98668" />
                <stop offset="100%" stopColor="#9C5446" />
              </linearGradient>
            ) : (
              <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="85%">
                <stop offset="0%" stopColor="#FFF6D6" />
                <stop offset="18%" stopColor="#F3DB8D" />
                <stop offset="45%" stopColor="#D4A745" />
                <stop offset="72%" stopColor="#BA882C" />
                <stop offset="90%" stopColor="#9C6A1E" />
                <stop offset="100%" stopColor="#784D10" />
              </linearGradient>
            )}
          </defs>

          <g fill={`url(#${gradientId})`}>
            {/* Isolated Seed Leaf / Drop on Left */}
            <path d="M38 148 C34 158 33 172 36 186 C41 186 47 175 46 160 C45 150 40 146 38 148 Z" />

            {/* Stylized Signature 'R' Glyph with Ascending Whisker & Flowing Leg */}
            <path d="M2 12 C3 22 14 64 52 98 C94 135 146 172 176 258 C177 259 179 255 178 250 C167 188 126 136 80 96 C38 59 22 23 10 2 C5 2 2 6 2 12 Z" />
            
            {/* Top Horizontal Crossbar & Upper Arch of 'R' */}
            <path d="M26 40 C65 40 108 40 128 48 C166 60 182 87 177 120 C170 163 136 182 94 183 C90 183 85 182 81 181 C104 174 119 160 125 138 C132 111 121 88 95 78 C75 70 48 70 27 70 Z" />
            
            {/* Inner / Middle Right Stem of 'R' Loop */}
            <path d="M185 102 C187 125 175 152 150 169 C133 180 109 184 87 183 C121 177 155 157 162 121 C166 96 154 73 132 62 C156 71 179 83 185 102 Z" />

            {/* Word: 'enova' */}
            {/* 'e' */}
            <g transform="translate(195, 4)">
              <path d="M62 186 C36 186 15 165 15 133 C15 100 37 79 65 79 C92 79 108 101 106 135 L29 135 C30 162 44 176 66 176 C78 176 89 171 97 163 L102 169 C92 180 78 186 62 186 Z M65 88 C47 88 32 104 29 128 L94 128 C94 103 82 88 65 88 Z" />
            </g>

            {/* 'n' */}
            <g transform="translate(315, 4)">
              <path d="M16 83 L28 83 L28 98 C36 86 51 79 68 79 C92 79 104 94 104 121 L104 183 L91 183 L91 123 C91 102 82 90 64 90 C47 90 32 104 29 126 L29 183 L16 183 Z" />
            </g>

            {/* 'o' */}
            <g transform="translate(435, 4)">
              <path d="M62 186 C30 186 8 162 8 133 C8 102 31 79 62 79 C94 79 116 102 116 133 C116 162 94 186 62 186 Z M62 89 C38 89 23 108 23 133 C23 158 38 177 62 177 C86 177 101 158 101 133 C101 108 86 89 62 89 Z" />
            </g>

            {/* 'v' */}
            <g transform="translate(560, 4)">
              <path d="M6 83 L21 83 L55 170 L89 83 L104 83 L62 184 L47 184 Z" />
            </g>

            {/* 'a' */}
            <g transform="translate(668, 4)">
              <path d="M54 186 C31 186 12 170 12 149 C12 127 31 114 59 113 L81 112 L81 104 C81 91 72 85 56 85 C44 85 33 90 26 97 L21 90 C30 82 43 77 59 77 C80 77 95 87 95 106 L95 183 L83 183 L83 169 C76 180 64 186 54 186 Z M58 176 C73 176 83 162 83 143 L83 121 L62 122 C40 123 26 132 26 148 C26 164 40 176 58 176 Z" />
            </g>

            {/* Word: 'fio' */}
            {/* 'f' */}
            <g transform="translate(768, 22)">
              <path d="M31 168 L19 168 L19 113 L9 113 L9 104 L19 104 L19 93 C19 77 27 66 45 66 C51 66 56 68 59 70 L56 79 C53 78 49 76 45 76 C36 76 31 82 31 94 L31 104 L53 104 L53 113 L31 113 Z" />
              <circle cx="51" cy="69" r="2.8" />
            </g>

            {/* 'i' */}
            <g transform="translate(812, 42)">
              <circle cx="15" cy="74" r="5.5" />
              <path d="M9 97 L21 97 L21 145 L9 145 Z" />
            </g>

            {/* 'o' in fio */}
            <g transform="translate(838, 42)">
              <path d="M29 146 C13 146 3 134 3 119 C3 103 13 91 29 91 C45 91 55 103 55 119 C55 134 45 146 29 146 Z M29 98 C19 98 12 107 12 119 C12 130 19 139 29 139 C39 139 46 130 46 119 C46 107 39 98 29 98 Z" />
            </g>
          </g>
        </svg>
      </div>

      {showSubtitle && (
        <span className="text-[10px] sm:text-[11px] tracking-[0.32em] uppercase font-light text-zinc-400 mt-1 ml-1.5 font-mono">
          Alta Tricologia Farmacêutica
        </span>
      )}
    </div>
  );
};

