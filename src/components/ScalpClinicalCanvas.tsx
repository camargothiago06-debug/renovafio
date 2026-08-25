import React from 'react';

interface ScalpCanvasProps {
  gender: 'masculino' | 'feminino';
  caseIndex: number; // 0: 3 months, 1: 11 months
  stage: 'before' | 'after' | 'combined';
  className?: string;
  isZoomed?: boolean;
}

export const ScalpClinicalCanvas: React.FC<ScalpCanvasProps> = ({
  gender,
  caseIndex,
  stage,
  className = '',
  isZoomed = false
}) => {
  const isFemale = gender === 'feminino';
  const durationLabel = caseIndex === 0 ? '3 meses' : '11 meses';

  // Sub-component to render a single scalp state (Before or After)
  const renderSingleScalp = (
    subStage: 'before' | 'after',
    cx: number,
    cy: number,
    scale: number,
    label: string,
    tagX: number,
    tagY: number
  ) => {
    const isBefore = subStage === 'before';
    const baldRadiusX = isFemale ? (isBefore ? 16 : 5) : (caseIndex === 1 ? (isBefore ? 62 : 10) : (isBefore ? 48 : 12));
    const baldRadiusY = isFemale ? (isBefore ? 88 : 15) : (caseIndex === 1 ? (isBefore ? 70 : 12) : (isBefore ? 54 : 14));

    return (
      <g transform={`translate(${cx}, ${cy}) scale(${scale})`}>
        {/* Salon Clinic Background with modern tiles and reflections */}
        <rect x="-350" y="-220" width="700" height="440" fill="url(#clinicFloorTiling)" />
        <rect x="-350" y="-220" width="700" height="150" fill="url(#clinicWallLight)" />

        {/* Salon Interior Furniture in background (Stools and countertop) */}
        <g opacity="0.5" transform="translate(-160, -140)">
          <rect x="-35" y="0" width="70" height="10" rx="3" fill="#181818" />
          <line x1="-25" y1="10" x2="-25" y2="120" stroke="#222" strokeWidth="4" />
          <line x1="25" y1="10" x2="25" y2="120" stroke="#222" strokeWidth="4" />
          <line x1="-25" y1="60" x2="25" y2="60" stroke="#222" strokeWidth="3" />
        </g>
        <g opacity="0.5" transform="translate(160, -140)">
          <rect x="-35" y="0" width="70" height="10" rx="3" fill="#181818" />
          <line x1="-25" y1="10" x2="-25" y2="120" stroke="#222" strokeWidth="4" />
          <line x1="25" y1="10" x2="25" y2="120" stroke="#222" strokeWidth="4" />
          <line x1="-25" y1="60" x2="25" y2="60" stroke="#222" strokeWidth="3" />
        </g>

        {/* Overhead Clinical Examination Spotlight */}
        <ellipse cx="0" cy="-30" rx="260" ry="180" fill="url(#overheadSpotlight)" />

        {/* Salon Client Chair (Black Leather with Armrest & Headrest) */}
        <g transform="translate(0, 70)">
          {/* Chair Back Contour */}
          <path
            d="M -190 20 C -190 -70 -110 -95 0 -95 C 110 -95 190 -70 190 20 L 210 130 L -210 130 Z"
            fill="#121418"
          />
          <path
            d="M -160 20 C -160 -50 -90 -75 0 -75 C 90 -75 160 -50 160 20 Z"
            fill="#222630"
            opacity="0.4"
          />
          {/* Chair Armrests */}
          <rect x="-215" y="25" width="28" height="95" rx="8" fill="#0c0d10" />
          <rect x="187" y="25" width="28" height="95" rx="8" fill="#0c0d10" />
        </g>

        {/* Patient Body (Shoulders & Black / Navy Cape) */}
        <g transform="translate(0, 15)">
          <path
            d="M -180 160 C -150 70 -90 40 -40 36 L 0 38 L 40 36 C 90 40 150 70 180 160 Z"
            fill={isBefore ? "#14151a" : "#172338"}
          />
          <path
            d="M -95 50 C -50 40 0 40 95 50 L 110 160 L -110 160 Z"
            fill={isBefore ? "#21242d" : "#243450"}
          />

          {/* Neck */}
          <rect x="-36" y="-5" width="72" height="48" rx="14" fill={isFemale ? "#eccdb9" : "#debba2"} />

          {/* Ears */}
          <ellipse cx="-94" cy="-22" rx="11" ry="26" fill={isFemale ? "#e8c4b0" : "#d9b29a"} />
          <ellipse cx="-94" cy="-22" rx="7" ry="17" fill={isFemale ? "#d9af9b" : "#c79e86"} />
          <ellipse cx="94" cy="-22" rx="11" ry="26" fill={isFemale ? "#e8c4b0" : "#d9b29a"} />
          <ellipse cx="94" cy="-22" rx="7" ry="17" fill={isFemale ? "#d9af9b" : "#c79e86"} />

          {/* Head Shape (Top-Down Clinical View) */}
          <ellipse cx="0" cy="-26" rx="90" ry="110" fill={isFemale ? "#eccdb9" : "#debba2"} />

          {/* Hair Base Layer */}
          <ellipse
            cx="0"
            cy="-26"
            rx="90"
            ry="110"
            fill={isFemale ? (isBefore ? "url(#femHairSparse)" : "url(#femHairDense)") : (isBefore ? "url(#maleHairSparse)" : "url(#maleHairDense)")}
          />

          {/* BEFORE: Exposed Scalp Skin Glow in Crown */}
          {isBefore && (
            <ellipse
              cx={isFemale ? 0 : -5}
              cy={isFemale ? -15 : -24}
              rx={baldRadiusX}
              ry={baldRadiusY}
              fill={isFemale ? "url(#femScalpSkinGleam)" : "url(#maleScalpSkinGleam)"}
            />
          )}

          {/* Detailed Hair Texture / Strands */}
          {isFemale ? (
            /* Female Long Hair Flow */
            <g>
              {Array.from({ length: isBefore ? 60 : 160 }).map((_, i) => {
                const yOffset = -90 + i * 2.2;
                const curve = (i % 2 === 0 ? 18 : -14);
                const strokeW = isBefore ? 1.5 : 2.2;
                return (
                  <g key={`fem-s-${i}`} opacity={isBefore ? 0.5 : 0.85}>
                    <path
                      d={`M -3 ${yOffset} Q ${-35 + curve} ${yOffset + 20} -85 ${yOffset + 45}`}
                      stroke="#1a110a"
                      strokeWidth={strokeW}
                      fill="none"
                    />
                    <path
                      d={`M 3 ${yOffset} Q ${35 - curve} ${yOffset + 20} 85 ${yOffset + 45}`}
                      stroke="#1a110a"
                      strokeWidth={strokeW}
                      fill="none"
                    />
                  </g>
                );
              })}
              {/* Parting line */}
              {isBefore ? (
                <path d="M 0 -85 C -6 -35 -8 15 0 50 C 8 15 6 -35 0 -85 Z" fill="url(#femScalpSkinGleam)" />
              ) : (
                <path d="M 0 -80 L 0 45" stroke="#140c07" strokeWidth="2.2" opacity="0.9" />
              )}
            </g>
          ) : (
            /* Male Vertex Crown Swirl */
            <g>
              {Array.from({ length: isBefore ? 70 : 200 }).map((_, i) => {
                const total = isBefore ? 70 : 200;
                const angle = (i / total) * Math.PI * 2;
                const rad = 20 + ((i * 37) % 68);
                const sx = -5 + Math.cos(angle) * rad;
                const sy = -24 + Math.sin(angle) * rad;

                const vDx = (sx + 5) / baldRadiusX;
                const vDy = (sy + 24) / baldRadiusY;
                if (isBefore && (vDx * vDx + vDy * vDy < 0.82) && (i % 4 !== 0)) {
                  return null;
                }

                const curl = angle + 0.65;
                const len = isBefore ? 14 : 24;
                const ex = sx + Math.cos(curl) * len;
                const ey = sy + Math.sin(curl) * len;
                const strokeCol = i % 4 === 0 ? '#0b0d10' : (i % 2 === 0 ? '#1b1e26' : '#282d38');
                const strokeW = isBefore ? 1.6 : 2.4;

                return (
                  <path
                    key={`m-s-${i}`}
                    d={`M ${sx} ${sy} Q ${(sx + ex) / 2 + 3} ${(sy + ey) / 2 - 2} ${ex} ${ey}`}
                    stroke={strokeCol}
                    strokeWidth={strokeW}
                    strokeLinecap="round"
                    opacity={isBefore ? 0.75 : 0.95}
                    fill="none"
                  />
                );
              })}

              {/* Before: Miniaturized follicles in vertex */}
              {isBefore && Array.from({ length: 30 }).map((_, i) => {
                const a = (i / 30) * Math.PI * 2;
                const r = (i * 13) % Math.round(baldRadiusX * 0.75);
                const fx = -5 + Math.cos(a) * r;
                const fy = -24 + Math.sin(a) * r;
                return (
                  <g key={`mini-${i}`}>
                    <circle cx={fx} cy={fy} r="1.1" fill="#44352b" opacity="0.6" />
                    <path d={`M ${fx} ${fy} L ${fx + 2.5} ${fy + 2}`} stroke="#554236" strokeWidth="0.8" opacity="0.5" />
                  </g>
                );
              })}
            </g>
          )}
        </g>

        {/* Clinical Tag (Dia 01 / 3 meses) */}
        <g transform={`translate(${tagX}, ${tagY})`}>
          <rect
            x="-60"
            y="-16"
            width="120"
            height="32"
            rx="5"
            fill="#F6B867"
            stroke="#df9d45"
            strokeWidth="1.2"
            filter="drop-shadow(0 4px 8px rgba(0,0,0,0.6))"
          />
          <text
            x="0"
            y="5"
            textAnchor="middle"
            fontFamily="'Courier New', Courier, monospace"
            fontSize="14"
            fontWeight="900"
            fill="#111111"
            letterSpacing="1.2"
          >
            {label}
          </text>
        </g>
      </g>
    );
  };

  return (
    <svg
      viewBox="0 0 960 540"
      className={`w-full h-full object-cover transition-transform duration-300 ${isZoomed ? 'scale-125' : 'scale-100'} ${className}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Clinic Floor & Wall Gradients */}
        <linearGradient id="clinicFloorTiling" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ede8df" />
          <stop offset="50%" stopColor="#dfd9cd" />
          <stop offset="100%" stopColor="#d1c9bc" />
        </linearGradient>

        <linearGradient id="clinicWallLight" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#fafafa" />
          <stop offset="100%" stopColor="#eaeaea" />
        </linearGradient>

        <radialGradient id="overheadSpotlight" cx="50%" cy="40%" r="50%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.55" />
          <stop offset="70%" stopColor="#ffffff" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>

        {/* Scalp Skin Tones */}
        <radialGradient id="maleScalpSkinGleam" cx="45%" cy="45%" r="55%">
          <stop offset="0%" stopColor="#fbe2d2" />
          <stop offset="60%" stopColor="#edbfa0" />
          <stop offset="100%" stopColor="#d8a381" />
        </radialGradient>

        <radialGradient id="femScalpSkinGleam" cx="45%" cy="45%" r="55%">
          <stop offset="0%" stopColor="#fdefdf" />
          <stop offset="60%" stopColor="#f2cfb8" />
          <stop offset="100%" stopColor="#dfb295" />
        </radialGradient>

        {/* Hair Undercoats */}
        <radialGradient id="maleHairSparse" cx="50%" cy="45%" r="60%">
          <stop offset="0%" stopColor="#323540" />
          <stop offset="70%" stopColor="#1c1e26" />
          <stop offset="100%" stopColor="#090a0d" />
        </radialGradient>

        <radialGradient id="maleHairDense" cx="50%" cy="45%" r="60%">
          <stop offset="0%" stopColor="#1a1c22" />
          <stop offset="70%" stopColor="#0f1014" />
          <stop offset="100%" stopColor="#050608" />
        </radialGradient>

        <radialGradient id="femHairSparse" cx="50%" cy="45%" r="60%">
          <stop offset="0%" stopColor="#3c2c22" />
          <stop offset="70%" stopColor="#251811" />
          <stop offset="100%" stopColor="#0e0704" />
        </radialGradient>

        <radialGradient id="femHairDense" cx="50%" cy="45%" r="60%">
          <stop offset="0%" stopColor="#2a1c14" />
          <stop offset="70%" stopColor="#180e08" />
          <stop offset="100%" stopColor="#0a0503" />
        </radialGradient>
      </defs>

      {/* RENDER MODES */}
      {stage === 'combined' && (
        <g>
          {/* Left Side: Dia 01 */}
          <g clipPath="url(#leftClipSide)">
            {renderSingleScalp('before', 240, 260, 1.25, 'Dia 01', 0, 160)}
          </g>

          {/* Right Side: Post-Treatment */}
          <g clipPath="url(#rightClipSide)">
            {renderSingleScalp('after', 720, 260, 1.25, durationLabel, 0, 160)}
          </g>

          {/* Center Dividing White Border Line */}
          <line x1="480" y1="0" x2="480" y2="540" stroke="#ffffff" strokeWidth="3" opacity="0.95" />

          {/* Clip Paths */}
          <clipPath id="leftClipSide">
            <rect x="0" y="0" width="480" height="540" />
          </clipPath>
          <clipPath id="rightClipSide">
            <rect x="480" y="0" width="480" height="540" />
          </clipPath>
        </g>
      )}

      {stage === 'before' && (
        <g>
          {renderSingleScalp('before', 480, 260, 1.35, 'Dia 01', 0, 165)}
        </g>
      )}

      {stage === 'after' && (
        <g>
          {renderSingleScalp('after', 480, 260, 1.35, durationLabel, 0, 165)}
        </g>
      )}
    </svg>
  );
};

