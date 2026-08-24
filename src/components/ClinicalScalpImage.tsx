import React from 'react';

interface ClinicalScalpImageProps {
  caseId: string;
  type: 'before' | 'after' | 'combined';
  className?: string;
  isZoomed?: boolean;
}

export const ClinicalScalpImage: React.FC<ClinicalScalpImageProps> = ({
  caseId,
  type,
  className = '',
  isZoomed = false
}) => {
  const isFemale = caseId.includes('fem');
  const is11Months = caseId.includes('11') || caseId.includes('caso-2');

  // RENDER COMBINED (LADO A LADO)
  if (type === 'combined') {
    if (isFemale) {
      return (
        <svg
          viewBox="0 0 1000 560"
          className={`w-full h-full object-cover transition-transform duration-300 ${isZoomed ? 'scale-125' : 'scale-100'} ${className}`}
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="clinicFloorFemComb" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FAF5F5" />
              <stop offset="50%" stopColor="#EFE7E7" />
              <stop offset="100%" stopColor="#E5DADA" />
            </linearGradient>
            <radialGradient id="scalpSkinFemComb" cx="50%" cy="40%" r="40%">
              <stop offset="0%" stopColor="#FDE8DE" />
              <stop offset="50%" stopColor="#ECC6B5" />
              <stop offset="100%" stopColor="#805748" />
            </radialGradient>
            <linearGradient id="tagRoseFemComb" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F9C5B7" />
              <stop offset="100%" stopColor="#E2A090" />
            </linearGradient>
          </defs>

          {/* Left: Dia 01 */}
          <g transform="translate(0, 0)">
            <clipPath id="leftFemCombClip">
              <rect x="0" y="0" width="497" height="560" />
            </clipPath>
            <g clipPath="url(#leftFemCombClip)">
              <rect x="0" y="0" width="500" height="560" fill="url(#clinicFloorFemComb)" />
              <rect x="90" y="20" width="120" height="110" fill="none" stroke="#3A252E" strokeWidth="5" rx="3" opacity="0.75" />
              <path d="M 60 410 C 60 360 80 340 100 370 L 130 480 C 135 500 120 530 90 510 Z" fill="#241B20" />
              <path d="M 440 410 C 440 360 420 340 400 370 L 370 480 C 365 500 380 530 410 510 Z" fill="#241B20" />
              <path d="M 80 430 C 80 380 420 380 420 430 L 440 560 L 60 560 Z" fill="#1C1418" />

              <path d="M 40 440 C 130 395 370 395 460 440 L 490 560 L 10 560 Z" fill="#2A1B22" />
              <ellipse cx="250" cy="395" rx="60" ry="45" fill="#FADACF" />
              <ellipse cx="140" cy="335" rx="14" ry="24" fill="#EFC3B4" transform="rotate(-15, 140, 335)" />
              <ellipse cx="360" cy="335" rx="14" ry="24" fill="#EFC3B4" transform="rotate(15, 360, 335)" />

              <ellipse cx="250" cy="310" rx="120" ry="135" fill="#382218" />
              <ellipse cx="250" cy="270" rx="90" ry="105" fill="#422B1E" />
              <path d="M 250 160 Q 248 250 250 370" stroke="url(#scalpSkinFemComb)" strokeWidth="18" strokeLinecap="round" fill="none" />
              <path d="M 250 200 Q 245 260 250 320" stroke="#FDE8DE" strokeWidth="8" strokeLinecap="round" fill="none" opacity="0.9" />

              <g transform="translate(170, 480)">
                <rect x="0" y="0" width="160" height="52" rx="7" fill="url(#tagRoseFemComb)" filter="drop-shadow(0 4px 10px rgba(0,0,0,0.35))" />
                <text x="80" y="34" fontFamily="'Courier New', Courier, monospace" fontSize="22" fontWeight="900" fill="#111111" textAnchor="middle" letterSpacing="2">Dia  01</text>
              </g>
            </g>
          </g>

          <line x1="500" y1="0" x2="500" y2="560" stroke="#FFFFFF" strokeWidth="5" />

          {/* Right: Evolução */}
          <g transform="translate(500, 0)">
            <clipPath id="rightFemCombClip">
              <rect x="3" y="0" width="497" height="560" />
            </clipPath>
            <g clipPath="url(#rightFemCombClip)">
              <rect x="0" y="0" width="500" height="560" fill="url(#clinicFloorFemComb)" />
              <rect x="90" y="20" width="120" height="110" fill="none" stroke="#3A252E" strokeWidth="5" rx="3" opacity="0.75" />
              <path d="M 60 410 C 60 360 80 340 100 370 L 130 480 C 135 500 120 530 90 510 Z" fill="#241B20" />
              <path d="M 440 410 C 440 360 420 340 400 370 L 370 480 C 365 500 380 530 410 510 Z" fill="#241B20" />
              <path d="M 80 430 C 80 380 420 380 420 430 L 440 560 L 60 560 Z" fill="#1C1418" />

              <path d="M 40 440 C 130 395 370 395 460 440 L 490 560 L 10 560 Z" fill="#2A1B22" />
              <ellipse cx="250" cy="395" rx="60" ry="45" fill="#FADACF" />
              <ellipse cx="140" cy="335" rx="14" ry="24" fill="#EFC3B4" transform="rotate(-15, 140, 335)" />
              <ellipse cx="360" cy="335" rx="14" ry="24" fill="#EFC3B4" transform="rotate(15, 360, 335)" />

              <ellipse cx="250" cy="310" rx="124" ry="140" fill="#2B180F" />
              <ellipse cx="250" cy="270" rx="95" ry="110" fill="#321D12" />
              <path d="M 250 160 Q 249 250 250 370" stroke="#FDE8DE" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.6" />

              <g stroke="#1F110A" strokeLinecap="round">
                <path d="M 210 200 Q 245 215 280 195" strokeWidth="10" fill="none" stroke="#2D1A10" />
                <path d="M 200 240 Q 245 255 290 235" strokeWidth="12" fill="none" stroke="#25150D" />
                <path d="M 205 280 Q 250 295 285 275" strokeWidth="14" fill="none" stroke="#1F110A" />
              </g>

              <g transform="translate(170, 480)">
                <rect x="0" y="0" width="160" height="52" rx="7" fill="url(#tagRoseFemComb)" filter="drop-shadow(0 4px 10px rgba(0,0,0,0.35))" />
                <text x="80" y="34" fontFamily="'Courier New', Courier, monospace" fontSize="22" fontWeight="900" fill="#111111" textAnchor="middle" letterSpacing="1">
                  {is11Months ? '11  meses' : '3  meses'}
                </text>
              </g>
            </g>
          </g>
        </svg>
      );
    }

    // Masculino Combined
    return (
      <svg
        viewBox="0 0 1000 560"
        className={`w-full h-full object-cover transition-transform duration-300 ${isZoomed ? 'scale-125' : 'scale-100'} ${className}`}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="clinicFloorMascComb" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#E8E9E5" />
            <stop offset="40%" stopColor="#DCDDD9" />
            <stop offset="100%" stopColor="#D0D1CC" />
          </linearGradient>
          <radialGradient id="scalpSkinMascComb" cx="50%" cy="45%" r="42%">
            <stop offset="0%" stopColor="#E5C3AE" />
            <stop offset="50%" stopColor="#CCA086" />
            <stop offset="100%" stopColor="#6E4D3C" />
          </radialGradient>
          <radialGradient id="scalpDenseMascComb" cx="48%" cy="44%" r="52%">
            <stop offset="0%" stopColor="#1E1916" />
            <stop offset="60%" stopColor="#120E0C" />
            <stop offset="100%" stopColor="#080605" />
          </radialGradient>
          <linearGradient id="tagAmberMascComb" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F9C37A" />
            <stop offset="100%" stopColor="#EAA655" />
          </linearGradient>
        </defs>

        {/* Left Half: Dia 01 */}
        <g transform="translate(0, 0)">
          <clipPath id="leftHalfMascCombClip">
            <rect x="0" y="0" width="497" height="560" />
          </clipPath>
          <g clipPath="url(#leftHalfMascCombClip)">
            <rect x="0" y="0" width="500" height="560" fill="url(#clinicFloorMascComb)" />
            <rect x="60" y="15" width="140" height="120" fill="none" stroke="#252528" strokeWidth="6" rx="3" opacity="0.85" />
            <rect x="220" y="15" width="130" height="120" fill="none" stroke="#252528" strokeWidth="6" rx="3" opacity="0.85" />
            
            <path d="M 60 410 C 60 360 80 340 100 370 L 130 480 C 135 500 120 530 90 510 Z" fill="#1E1E22" />
            <path d="M 440 410 C 440 360 420 340 400 370 L 370 480 C 365 500 380 530 410 510 Z" fill="#1E1E22" />
            <path d="M 80 430 C 80 380 420 380 420 430 L 440 560 L 60 560 Z" fill="#18181C" />

            <path d="M 30 440 C 120 395 380 395 470 440 L 500 560 L 0 560 Z" fill="#16161A" />
            <ellipse cx="250" cy="395" rx="65" ry="50" fill="#E2BAA2" />
            <ellipse cx="132" cy="335" rx="14" ry="24" fill="#D6A78F" transform="rotate(-15, 132, 335)" />
            <ellipse cx="368" cy="335" rx="14" ry="24" fill="#D6A78F" transform="rotate(15, 368, 335)" />

            <ellipse cx="250" cy="305" rx="118" ry="132" fill="#2A221D" />
            <ellipse cx="250" cy="300" rx="112" ry="125" fill="#382C24" />
            <ellipse cx="250" cy="285" rx={is11Months ? 72 : 62} ry={is11Months ? 85 : 75} fill="url(#scalpSkinMascComb)" />
            
            <g stroke="#241B16" strokeLinecap="round" opacity="0.85">
              <path d="M 140 290 C 150 230 190 190 250 190 C 310 190 350 230 360 290" strokeWidth="24" fill="none" stroke="#221C18" />
              <path d="M 135 305 C 145 375 205 415 250 415 C 295 415 355 375 365 305" strokeWidth="26" fill="none" stroke="#1D1714" />
              <path d="M 215 270 Q 235 245 260 255 Q 270 270 245 285" strokeWidth="3.5" fill="none" />
              <path d="M 205 285 Q 225 240 275 245 Q 290 280 255 320" strokeWidth="4" fill="none" />
            </g>

            <g transform="translate(170, 480)">
              <rect x="0" y="0" width="160" height="52" rx="7" fill="url(#tagAmberMascComb)" filter="drop-shadow(0 4px 10px rgba(0,0,0,0.35))" />
              <text x="80" y="34" fontFamily="'Courier New', Courier, monospace" fontSize="22" fontWeight="900" fill="#111111" textAnchor="middle" letterSpacing="2">Dia  01</text>
            </g>
          </g>
        </g>

        <line x1="500" y1="0" x2="500" y2="560" stroke="#FFFFFF" strokeWidth="5" />

        {/* Right Half: 3m ou 11m */}
        <g transform="translate(500, 0)">
          <clipPath id="rightHalfMascCombClip">
            <rect x="3" y="0" width="497" height="560" />
          </clipPath>
          <g clipPath="url(#rightHalfMascCombClip)">
            <rect x="0" y="0" width="500" height="560" fill="url(#clinicFloorMascComb)" />
            <rect x="60" y="15" width="140" height="120" fill="none" stroke="#252528" strokeWidth="6" rx="3" opacity="0.85" />
            <rect x="220" y="15" width="130" height="120" fill="none" stroke="#252528" strokeWidth="6" rx="3" opacity="0.85" />
            <rect x="380" y="10" width="115" height="140" fill="#28282C" rx="6" opacity="0.9" />

            <path d="M 60 410 C 60 360 80 340 100 370 L 130 480 C 135 500 120 530 90 510 Z" fill="#1E1E22" />
            <path d="M 440 410 C 440 360 420 340 400 370 L 370 480 C 365 500 380 530 410 510 Z" fill="#1E1E22" />
            <path d="M 80 430 C 80 380 420 380 420 430 L 440 560 L 60 560 Z" fill="#18181C" />

            <path d="M 30 440 C 120 395 380 395 470 440 L 500 560 L 0 560 Z" fill="#1B2433" />
            <path d="M 200 415 L 250 460 L 300 415 Z" fill="#131B26" />

            <ellipse cx="250" cy="305" rx="122" ry="136" fill="#151210" />
            <ellipse cx="250" cy="300" rx="118" ry="130" fill="url(#scalpDenseMascComb)" />

            <g stroke="#16120F" strokeLinecap="round">
              <ellipse cx="250" cy="285" rx="100" ry="110" fill="#1E1713" />
              <path d="M 140 280 Q 190 200 250 210 Q 320 220 360 280" strokeWidth="22" fill="none" stroke="#261E17" />
              <path d="M 135 315 Q 170 395 250 405 Q 330 395 365 315" strokeWidth="24" fill="none" stroke="#1D1510" />
              <path d="M 210 270 Q 235 240 270 255 Q 290 285 260 315" strokeWidth="12" fill="none" stroke="#140E0A" />
              <path d="M 190 285 Q 220 235 285 245 Q 310 290 270 335" strokeWidth="14" fill="none" stroke="#221813" />
              <path d="M 175 305 Q 210 245 295 255 Q 325 305 280 355" strokeWidth="15" fill="none" stroke="#19110D" />
            </g>

            <g transform="translate(170, 480)">
              <rect x="0" y="0" width="160" height="52" rx="7" fill="url(#tagAmberMascComb)" filter="drop-shadow(0 4px 10px rgba(0,0,0,0.35))" />
              <text x="80" y="34" fontFamily="'Courier New', Courier, monospace" fontSize="22" fontWeight="900" fill="#111111" textAnchor="middle" letterSpacing="1">
                {is11Months ? '11  meses' : '3  meses'}
              </text>
            </g>
          </g>
        </g>
      </svg>
    );
  }

  // RENDER BEFORE (DIA 01 FULL FRAME)
  if (type === 'before') {
    if (isFemale) {
      return (
        <svg
          viewBox="0 0 1000 560"
          className={`w-full h-full object-cover transition-transform duration-300 ${isZoomed ? 'scale-125' : 'scale-100'} ${className}`}
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="clinicFloorFemBefore" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FAF5F5" />
              <stop offset="50%" stopColor="#EFE7E7" />
              <stop offset="100%" stopColor="#E5DADA" />
            </linearGradient>
            <radialGradient id="scalpSkinFemBefore" cx="50%" cy="40%" r="40%">
              <stop offset="0%" stopColor="#FDE8DE" />
              <stop offset="50%" stopColor="#ECC6B5" />
              <stop offset="100%" stopColor="#805748" />
            </radialGradient>
            <linearGradient id="tagRoseFemBefore" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F9C5B7" />
              <stop offset="100%" stopColor="#E2A090" />
            </linearGradient>
          </defs>

          <rect x="0" y="0" width="1000" height="560" fill="url(#clinicFloorFemBefore)" />
          <rect x="180" y="20" width="200" height="140" fill="none" stroke="#3A252E" strokeWidth="7" rx="4" opacity="0.75" />
          <rect x="620" y="20" width="200" height="140" fill="none" stroke="#3A252E" strokeWidth="7" rx="4" opacity="0.75" />

          <path d="M 220 410 C 220 360 250 340 280 370 L 330 480 C 340 500 320 530 270 510 Z" fill="#241B20" />
          <path d="M 780 410 C 780 360 750 340 720 370 L 670 480 C 660 500 680 530 730 510 Z" fill="#241B20" />
          <path d="M 240 430 C 240 380 760 380 760 430 L 800 560 L 200 560 Z" fill="#1C1418" />

          <path d="M 120 440 C 280 395 720 395 880 440 L 950 560 L 50 560 Z" fill="#2A1B22" />
          <ellipse cx="500" cy="395" rx="90" ry="55" fill="#FADACF" />
          <ellipse cx="330" cy="335" rx="18" ry="32" fill="#EFC3B4" transform="rotate(-15, 330, 335)" />
          <ellipse cx="670" cy="335" rx="18" ry="32" fill="#EFC3B4" transform="rotate(15, 670, 335)" />

          <ellipse cx="500" cy="310" rx="180" ry="200" fill="#382218" />
          <path d="M 320 300 C 310 400 330 480 360 560" stroke="#2B1A12" strokeWidth="45" fill="none" />
          <path d="M 680 300 C 690 400 670 480 640 560" stroke="#2B1A12" strokeWidth="45" fill="none" />

          <ellipse cx="500" cy="270" rx="140" ry="150" fill="#422B1E" />
          <path d="M 500 160 Q 498 250 500 370" stroke="url(#scalpSkinFemBefore)" strokeWidth="26" strokeLinecap="round" fill="none" />
          <path d="M 500 200 Q 495 260 500 320" stroke="#FDE8DE" strokeWidth="12" strokeLinecap="round" fill="none" opacity="0.9" />

          <g stroke="#3A241A" strokeWidth="4" fill="none" opacity="0.8">
            <path d="M 470 210 Q 500 220 530 205" />
            <path d="M 465 250 Q 495 260 535 245" />
            <path d="M 470 290 Q 505 300 530 285" />
          </g>

          <g transform="translate(415, 480)">
            <rect x="0" y="0" width="170" height="52" rx="7" fill="url(#tagRoseFemBefore)" filter="drop-shadow(0 4px 10px rgba(0,0,0,0.35))" />
            <text x="85" y="34" fontFamily="'Courier New', Courier, monospace" fontSize="22" fontWeight="900" fill="#111111" textAnchor="middle" letterSpacing="2">Dia  01</text>
          </g>
        </svg>
      );
    }

    // Masculino Before (Dia 01 Full)
    return (
      <svg
        viewBox="0 0 1000 560"
        className={`w-full h-full object-cover transition-transform duration-300 ${isZoomed ? 'scale-125' : 'scale-100'} ${className}`}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="clinicFloorMascBefore" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#E8E9E5" />
            <stop offset="40%" stopColor="#DCDDD9" />
            <stop offset="100%" stopColor="#D0D1CC" />
          </linearGradient>
          <radialGradient id="scalpSkinMascBefore" cx="50%" cy="45%" r="42%">
            <stop offset="0%" stopColor="#E5C3AE" />
            <stop offset="50%" stopColor="#CCA086" />
            <stop offset="100%" stopColor="#6E4D3C" />
          </radialGradient>
          <linearGradient id="tagAmberMascBefore" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F9C37A" />
            <stop offset="100%" stopColor="#EAA655" />
          </linearGradient>
        </defs>

        <rect x="0" y="0" width="1000" height="560" fill="url(#clinicFloorMascBefore)" />
        <rect x="150" y="20" width="220" height="150" fill="none" stroke="#252528" strokeWidth="7" rx="4" opacity="0.85" />
        <rect x="630" y="20" width="220" height="150" fill="none" stroke="#252528" strokeWidth="7" rx="4" opacity="0.85" />

        <path d="M 220 410 C 220 360 250 340 280 370 L 330 480 C 340 500 320 530 270 510 Z" fill="#1E1E22" />
        <path d="M 780 410 C 780 360 750 340 720 370 L 670 480 C 660 500 680 530 730 510 Z" fill="#1E1E22" />
        <path d="M 240 430 C 240 380 760 380 760 430 L 800 560 L 200 560 Z" fill="#18181C" />

        <path d="M 120 440 C 280 395 720 395 880 440 L 950 560 L 50 560 Z" fill="#16161A" />
        <ellipse cx="500" cy="395" rx="100" ry="60" fill="#E2BAA2" />
        <ellipse cx="320" cy="335" rx="20" ry="36" fill="#D6A78F" transform="rotate(-15, 320, 335)" />
        <ellipse cx="680" cy="335" rx="20" ry="36" fill="#D6A78F" transform="rotate(15, 680, 335)" />

        <ellipse cx="500" cy="305" rx="180" ry="195" fill="#2A221D" />
        <ellipse cx="500" cy="300" rx="170" ry="185" fill="#382C24" />
        <ellipse cx="500" cy="285" rx={is11Months ? 110 : 95} ry={is11Months ? 125 : 110} fill="url(#scalpSkinMascBefore)" />
        
        <g stroke="#241B16" strokeLinecap="round" opacity="0.85">
          <path d="M 335 290 C 350 200 410 140 500 140 C 590 140 650 200 665 290" strokeWidth="36" fill="none" stroke="#221C18" />
          <path d="M 325 310 C 340 410 430 465 500 465 C 570 465 660 410 675 310" strokeWidth="38" fill="none" stroke="#1D1714" />
          <path d="M 450 270 Q 480 235 515 250 Q 530 270 495 290" strokeWidth="5" fill="none" />
          <path d="M 435 290 Q 465 225 540 235 Q 560 285 510 340" strokeWidth="6" fill="none" />
        </g>

        <g transform="translate(415, 480)">
          <rect x="0" y="0" width="170" height="52" rx="7" fill="url(#tagAmberMascBefore)" filter="drop-shadow(0 4px 10px rgba(0,0,0,0.35))" />
          <text x="85" y="34" fontFamily="'Courier New', Courier, monospace" fontSize="22" fontWeight="900" fill="#111111" textAnchor="middle" letterSpacing="2">Dia  01</text>
        </g>
      </svg>
    );
  }

  // RENDER AFTER (3 MESES / 11 MESES FULL FRAME)
  if (isFemale) {
    return (
      <svg
        viewBox="0 0 1000 560"
        className={`w-full h-full object-cover transition-transform duration-300 ${isZoomed ? 'scale-125' : 'scale-100'} ${className}`}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="clinicFloorFemAfter" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FAF5F5" />
            <stop offset="50%" stopColor="#EFE7E7" />
            <stop offset="100%" stopColor="#E5DADA" />
          </linearGradient>
          <linearGradient id="tagRoseFemAfter" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F9C5B7" />
            <stop offset="100%" stopColor="#E2A090" />
          </linearGradient>
        </defs>

        <rect x="0" y="0" width="1000" height="560" fill="url(#clinicFloorFemAfter)" />
        <rect x="180" y="20" width="200" height="140" fill="none" stroke="#3A252E" strokeWidth="7" rx="4" opacity="0.75" />
        <rect x="620" y="20" width="200" height="140" fill="none" stroke="#3A252E" strokeWidth="7" rx="4" opacity="0.75" />

        <path d="M 220 410 C 220 360 250 340 280 370 L 330 480 C 340 500 320 530 270 510 Z" fill="#241B20" />
        <path d="M 780 410 C 780 360 750 340 720 370 L 670 480 C 660 500 680 530 730 510 Z" fill="#241B20" />
        <path d="M 240 430 C 240 380 760 380 760 430 L 800 560 L 200 560 Z" fill="#1C1418" />

        <path d="M 120 440 C 280 395 720 395 880 440 L 950 560 L 50 560 Z" fill="#2A1B22" />
        <ellipse cx="500" cy="395" rx="90" ry="55" fill="#FADACF" />
        <ellipse cx="330" cy="335" rx="18" ry="32" fill="#EFC3B4" transform="rotate(-15, 330, 335)" />
        <ellipse cx="670" cy="335" rx="18" ry="32" fill="#EFC3B4" transform="rotate(15, 670, 335)" />

        <ellipse cx="500" cy="310" rx="185" ry="205" fill="#2B180F" />
        <path d="M 310 290 C 295 400 325 485 350 560" stroke="#1F110A" strokeWidth="55" fill="none" />
        <path d="M 690 290 C 705 400 675 485 650 560" stroke="#1F110A" strokeWidth="55" fill="none" />

        <ellipse cx="500" cy="270" rx="145" ry="155" fill="#321D12" />
        <path d="M 500 160 Q 499 250 500 370" stroke="#FDE8DE" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.6" />

        <g stroke="#1F110A" strokeLinecap="round">
          <path d="M 440 200 Q 490 220 540 195" strokeWidth="14" fill="none" stroke="#2D1A10" />
          <path d="M 430 240 Q 490 260 550 235" strokeWidth="16" fill="none" stroke="#25150D" />
          <path d="M 435 280 Q 495 300 545 275" strokeWidth="18" fill="none" stroke="#1F110A" />
          <path d="M 440 320 Q 500 340 550 315" strokeWidth="20" fill="none" stroke="#2A170F" />
          <path d="M 420 220 Q 470 235 520 215" stroke="#603A24" strokeWidth="4" fill="none" opacity="0.5" />
          <path d="M 425 260 Q 475 275 525 255" stroke="#603A24" strokeWidth="4.5" fill="none" opacity="0.55" />
        </g>

        <g transform="translate(415, 480)">
          <rect x="0" y="0" width="170" height="52" rx="7" fill="url(#tagRoseFemAfter)" filter="drop-shadow(0 4px 10px rgba(0,0,0,0.35))" />
          <text x="85" y="34" fontFamily="'Courier New', Courier, monospace" fontSize="22" fontWeight="900" fill="#111111" textAnchor="middle" letterSpacing="1">
            {is11Months ? '11  meses' : '3  meses'}
          </text>
        </g>
      </svg>
    );
  }

  // Masculino After Full Frame
  return (
    <svg
      viewBox="0 0 1000 560"
      className={`w-full h-full object-cover transition-transform duration-300 ${isZoomed ? 'scale-125' : 'scale-100'} ${className}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="clinicFloorMascAfter" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#E8E9E5" />
          <stop offset="40%" stopColor="#DCDDD9" />
          <stop offset="100%" stopColor="#D0D1CC" />
        </linearGradient>
        <radialGradient id="scalpDenseMascAfter" cx="48%" cy="44%" r="52%">
          <stop offset="0%" stopColor="#1E1916" />
          <stop offset="60%" stopColor="#120E0C" />
          <stop offset="100%" stopColor="#080605" />
        </radialGradient>
        <linearGradient id="tagAmberMascAfter" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F9C37A" />
          <stop offset="100%" stopColor="#EAA655" />
        </linearGradient>
      </defs>

      <rect x="0" y="0" width="1000" height="560" fill="url(#clinicFloorMascAfter)" />
      <rect x="150" y="20" width="220" height="150" fill="none" stroke="#252528" strokeWidth="7" rx="4" opacity="0.85" />
      <rect x="630" y="20" width="220" height="150" fill="none" stroke="#252528" strokeWidth="7" rx="4" opacity="0.85" />

      <path d="M 220 410 C 220 360 250 340 280 370 L 330 480 C 340 500 320 530 270 510 Z" fill="#1E1E22" />
      <path d="M 780 410 C 780 360 750 340 720 370 L 670 480 C 660 500 680 530 730 510 Z" fill="#1E1E22" />
      <path d="M 240 430 C 240 380 760 380 760 430 L 800 560 L 200 560 Z" fill="#18181C" />

      <path d="M 120 440 C 280 395 720 395 880 440 L 950 560 L 50 560 Z" fill="#1B2433" />
      <path d="M 430 415 L 500 470 L 570 415 Z" fill="#131B26" />
      
      <ellipse cx="500" cy="395" rx="100" ry="60" fill="#E2BAA2" />
      <ellipse cx="320" cy="335" rx="20" ry="36" fill="#D6A78F" transform="rotate(-15, 320, 335)" />
      <ellipse cx="680" cy="335" rx="20" ry="36" fill="#D6A78F" transform="rotate(15, 680, 335)" />

      <ellipse cx="500" cy="305" rx="186" ry="200" fill="#151210" />
      <ellipse cx="500" cy="300" rx="180" ry="192" fill="url(#scalpDenseMascAfter)" />

      <g stroke="#16120F" strokeLinecap="round">
        <ellipse cx="500" cy="285" rx="150" ry="165" fill="#1E1713" />
        <path d="M 335 280 Q 410 160 500 170 Q 600 180 665 280" strokeWidth="32" fill="none" stroke="#261E17" />
        <path d="M 330 325 Q 380 435 500 445 Q 620 435 670 325" strokeWidth="36" fill="none" stroke="#1D1510" />
        <path d="M 440 270 Q 480 220 530 240 Q 560 285 515 330" strokeWidth="18" fill="none" stroke="#140E0A" />
        <path d="M 410 290 Q 455 220 550 235 Q 590 295 530 360" strokeWidth="20" fill="none" stroke="#221813" />
        <path d="M 390 315 Q 440 230 565 245 Q 610 315 545 385" strokeWidth="22" fill="none" stroke="#19110D" />
        <path d="M 365 345 Q 420 245 580 255 Q 625 335 550 415" strokeWidth="24" fill="none" stroke="#2A1E17" />
        <path d="M 425 240 Q 470 215 515 230" stroke="#3D2D22" strokeWidth="12" fill="none" opacity="0.4" />
        <path d="M 455 285 Q 500 260 545 280" stroke="#423126" strokeWidth="14" fill="none" opacity="0.45" />
      </g>

      <g transform="translate(415, 480)">
        <rect x="0" y="0" width="170" height="52" rx="7" fill="url(#tagAmberMascAfter)" filter="drop-shadow(0 4px 10px rgba(0,0,0,0.35))" />
        <text x="85" y="34" fontFamily="'Courier New', Courier, monospace" fontSize="22" fontWeight="900" fill="#111111" textAnchor="middle" letterSpacing="1">
          {is11Months ? '11  meses' : '3  meses'}
        </text>
      </g>
    </svg>
  );
};
