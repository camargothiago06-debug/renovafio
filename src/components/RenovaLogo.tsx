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

  // Responsive dimension constraints for SVG display
  const dimensions = {
    sm: { width: 140, height: 46 },
    md: { width: 185, height: 60 },
    lg: { width: 240, height: 78 },
    xl: { width: 320, height: 104 },
  };

  const currentDim = dimensions[size];
  const gradientId = `renovaBrandGrad-${gender}-${size}`;

  return (
    <div className={`inline-flex flex-col items-start select-none ${className}`}>
      <div className="relative flex items-center">
        <svg
          viewBox="0 0 760 250"
          style={{
            width: `${currentDim.width}px`,
            height: `${currentDim.height}px`,
            maxHeight: '100%',
          }}
          className="transition-all duration-300 drop-shadow-[0_2px_10px_rgba(0,0,0,0.4)]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {isFemale ? (
              <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="85%">
                <stop offset="0%" stopColor="#FFF2EE" />
                <stop offset="20%" stopColor="#F5CEBE" />
                <stop offset="45%" stopColor="#E2A999" />
                <stop offset="70%" stopColor="#DFB775" />
                <stop offset="90%" stopColor="#D4AF37" />
                <stop offset="100%" stopColor="#AA771C" />
              </linearGradient>
            ) : (
              <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="85%">
                <stop offset="0%" stopColor="#FFF3C4" />
                <stop offset="15%" stopColor="#F2D580" />
                <stop offset="40%" stopColor="#D8AC51" />
                <stop offset="70%" stopColor="#C29035" />
                <stop offset="90%" stopColor="#9B6E22" />
                <stop offset="100%" stopColor="#7C5214" />
              </linearGradient>
            )}
          </defs>

          <g fill={`url(#${gradientId})`}>
            {/* Isolated Seed Leaf / Drop on Left */}
            <path d="M35 145 C32 155 31 168 33 182 C37 182 43 172 42 158 C41 148 37 144 35 145 Z" />

            {/* Stylized Signature 'R' Glyph with Ascending Whisker & Flowing Leg */}
            <path d="M1 4 C1 12 11 52 46 84 C85 119 135 155 163 245 C164 246 166 242 165 237 C155 178 116 128 72 90 C32 55 18 20 8 0 C4 0 1 1 1 4 Z" />
            
            {/* Top Horizontal Crossbar & Upper Arch of 'R' */}
            <path d="M24 38 C60 38 100 38 120 45 C156 57 172 82 167 114 C160 156 128 174 88 175 C85 175 80 174 76 173 C98 166 112 153 118 132 C125 106 114 84 89 74 C70 66 45 66 25 66 Z" />
            
            {/* Inner / Middle Right Stem of 'R' Loop */}
            <path d="M174 95 C176 118 165 145 141 162 C125 173 103 177 82 176 C115 170 148 152 154 116 C158 92 147 70 126 59 C149 67 170 78 174 95 Z" />

            {/* Word: 'enova' */}
            {/* 'e' */}
            <g transform="translate(170, 0)">
              <path d="M60 178 C35 178 15 158 15 128 C15 96 36 76 62 76 C88 76 103 97 101 130 L28 130 C29 156 42 169 63 169 C74 169 85 164 92 156 L97 162 C88 172 75 178 60 178 Z M62 84 C45 84 31 99 28 123 L90 123 C90 98 78 84 62 84 Z" />
            </g>

            {/* 'n' */}
            <g transform="translate(280, 0)">
              <path d="M16 80 L27 80 L27 94 C34 83 48 76 64 76 C87 76 98 90 98 116 L98 175 L86 175 L86 118 C86 98 78 86 61 86 C45 86 31 99 28 120 L28 175 L16 175 Z" />
            </g>

            {/* 'o' */}
            <g transform="translate(390, 0)">
              <path d="M60 178 C29 178 8 155 8 127 C8 98 30 76 60 76 C91 76 112 98 112 127 C112 155 91 178 60 178 Z M60 85 C37 85 22 103 22 127 C22 151 37 169 60 169 C83 169 98 151 98 127 C98 103 83 85 60 85 Z" />
            </g>

            {/* 'v' */}
            <g transform="translate(505, 0)">
              <path d="M6 80 L20 80 L52 163 L84 80 L98 80 L59 176 L45 176 Z" />
            </g>

            {/* 'a' */}
            <g transform="translate(605, 0)">
              <path d="M52 178 C30 178 12 163 12 143 C12 122 30 110 57 109 L78 108 L78 100 C78 88 69 82 54 82 C42 82 32 87 25 94 L20 87 C29 79 41 74 57 74 C77 74 91 84 91 102 L91 175 L80 175 L80 162 C73 172 61 178 52 178 Z M56 169 C70 169 80 156 80 138 L80 116 L60 117 C39 118 25 127 25 142 C25 158 38 169 56 169 Z" />
            </g>

            {/* Word: 'fio' */}
            {/* 'f' */}
            <g transform="translate(680, 20)">
              <path d="M30 155 L19 155 L19 104 L10 104 L10 96 L19 96 L19 86 C19 72 26 62 42 62 C47 62 52 64 55 66 L52 74 C49 73 46 71 42 71 C34 71 30 76 30 87 L30 96 L50 96 L50 104 L30 104 Z" />
              <circle cx="48" cy="65" r="2.5" />
            </g>

            {/* 'i' */}
            <g transform="translate(712, 40)">
              <circle cx="16" cy="74" r="5" />
              <path d="M11 94 L21 94 L21 135 L11 135 Z" />
            </g>

            {/* 'o' in fio */}
            <g transform="translate(732, 40)">
              <path d="M28 136 C13 136 3 125 3 111 C3 97 13 86 28 86 C43 86 53 97 53 111 C53 125 43 136 28 136 Z M28 92 C18 92 11 100 11 111 C11 122 18 130 28 130 C38 130 45 122 45 111 C45 100 38 92 28 92 Z" />
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
