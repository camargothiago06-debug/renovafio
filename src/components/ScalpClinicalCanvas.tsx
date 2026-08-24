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
  const tagBg = isFemale ? 'url(#tagGradFem)' : 'url(#tagGradMasc)';

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
    const baldRadiusX = isFemale ? (isBefore ? 18 : 6) : (caseIndex === 1 ? (isBefore ? 64 : 12) : (isBefore ? 52 : 14));
    const baldRadiusY = isFemale ? (isBefore ? 95 : 18) : (caseIndex === 1 ? (isBefore ? 72 : 14) : (isBefore ? 58 : 16));

    // Density and hair whorl rendering
    return (
      <g transform={`translate(${cx}, ${cy}) scale(${scale})`}>
        {/* Clinic Background */}
        <rect x="-300" y="-200" width="600" height="400" fill="url(#clinicWallGrad)" />

        {/* Clinic Chair Top */}
        <path
          d="M -180 120 C -180 60 -100 40 0 40 C 100 40 180 60 180 120 L 220 200 L -220 200 Z"
          fill="url(#chairGrad)"
        />

        {/* Patient Shoulders & Black Medical Cape */}
        <path
          d="M -230 180 C -190 100 -120 70 -60 65 L 0 68 L 60 65 C 120 70 190 100 230 180 Z"
          fill="#121316"
        />
        <path
          d="M -120 85 C -70 70 0 70 120 85 L 140 190 L -140 190 Z"
          fill="#1c1e24"
        />

        {/* Neck */}
        <rect x="-38" y="15" width="76" height="50" rx="15" fill={isFemale ? "#edd0be" : "#e0bca4"} />

        {/* Ears */}
        <ellipse cx="-86" cy="0" rx="11" ry="24" fill={isFemale ? "#e8c4b0" : "#d9b29a"} />
        <ellipse cx="-86" cy="0" rx="7" ry="16" fill={isFemale ? "#d9af9b" : "#c79e86"} />
        <ellipse cx="86" cy="0" rx="11" ry="24" fill={isFemale ? "#e8c4b0" : "#d9b29a"} />
        <ellipse cx="86" cy="0" rx="7" ry="16" fill={isFemale ? "#d9af9b" : "#c79e86"} />

        {/* Head Contour (Back/Crown View) */}
        <ellipse cx="0" cy="0" rx="82" ry="98" fill={isFemale ? "#edd0be" : "#e2bea6"} />

        {/* Overhead Examination Spotlight reflection */}
        <ellipse cx={isFemale ? 0 : -5} cy={isFemale ? -10 : -18} rx="70" ry="75" fill="url(#clinicSpotlight)" />

        {/* Scalp Skin in Vertex */}
        <ellipse
          cx={isFemale ? 0 : -6}
          cy={isFemale ? -10 : -18}
          rx={baldRadiusX + 15}
          ry={baldRadiusY + 12}
          fill="url(#scalpSkinGleam)"
        />

        {/* HAIR BASE LAYER */}
        {isFemale ? (
          /* Female Hair Style */
          <g>
            {/* Base Hair Mass */}
            <path
              d="M 0 -98 C -60 -98 -85 -50 -84 20 C -83 70 -70 110 -60 140 C -45 155 -15 160 0 160 C 15 160 45 155 60 140 C 70 110 83 70 84 20 C 85 -50 60 -98 0 -98 Z"
              fill={isBefore ? "url(#femHairBaseSparse)" : "url(#femHairBaseDense)"}
            />

            {/* Hair Flow Textures Left and Right */}
            {Array.from({ length: 45 }).map((_, i) => {
              const yOffset = -70 + i * 4.5;
              const curve = (i % 2 === 0 ? 15 : -10);
              return (
                <g key={`fem-strand-${i}`} opacity={isBefore ? 0.45 : 0.85}>
                  {/* Left Side Flows */}
                  <path
                    d={`M -2 ${yOffset} Q ${-35 + curve} ${yOffset + 15} ${-78} ${yOffset + 35}`}
                    stroke={i % 3 === 0 ? "#181310" : "#2a1e17"}
                    strokeWidth={isBefore ? 1.5 : 2.5}
                    fill="none"
                  />
                  {/* Right Side Flows */}
                  <path
                    d={`M 2 ${yOffset} Q ${35 - curve} ${yOffset + 15} ${78} ${yOffset + 35}`}
                    stroke={i % 3 === 0 ? "#181310" : "#2a1e17"}
                    strokeWidth={isBefore ? 1.5 : 2.5}
                    fill="none"
                  />
                </g>
              );
            })}

            {/* Central Parting Line (Wide in Before, Closed in After) */}
            {isBefore ? (
              <g>
                <path
                  d="M 0 -85 C -8 -40 -12 10 0 50 C 12 10 8 -40 0 -85 Z"
                  fill="url(#scalpSkinGleam)"
                />
                {/* Sparse Mini Follies */}
                {Array.from({ length: 25 }).map((_, i) => (
                  <circle
                    key={`sparse-fem-${i}`}
                    cx={(i % 5 - 2) * 3 + ((i * 7) % 5 - 2)}
                    cy={-70 + i * 4.5}
                    r="1.2"
                    fill="#3a251b"
                    opacity="0.7"
                  />
                ))}
              </g>
            ) : (
              /* Dense Parting Line with Fresh Regrowth */
              <g>
                <path
                  d="M 0 -85 L 0 50"
                  stroke="#c49a85"
                  strokeWidth="1.5"
                  opacity="0.8"
                />
                {Array.from({ length: 60 }).map((_, i) => (
                  <path
                    key={`dense-fem-${i}`}
                    d={`M 0 ${-80 + i * 2} Q ${(i % 2 === 0 ? 8 : -8)} ${-75 + i * 2} ${(i % 2 === 0 ? 18 : -18)} ${-70 + i * 2}`}
                    stroke="#1a120c"
                    strokeWidth="1.8"
                    fill="none"
                  />
                ))}
              </g>
            )}
          </g>
        ) : (
          /* Male Hair Style with Vertex Swirl */
          <g>
            {/* Outer Head Hair Ring */}
            <path
              d="M 0 -98 C -55 -98 -84 -55 -83 15 C -82 65 -65 95 0 98 C 65 95 82 65 83 15 C 84 -55 55 -98 0 -98 Z"
              fill={isBefore ? "url(#maleHairBaseSparse)" : "url(#maleHairBaseDense)"}
            />

            {/* Hair Whorl Texture & Strands */}
            {Array.from({ length: isBefore ? 60 : 180 }).map((_, i) => {
              const angle = (i / (isBefore ? 60 : 180)) * Math.PI * 2;
              const radius = 25 + ((i * 37) % 55);
              const sx = -6 + Math.cos(angle) * radius;
              const sy = -18 + Math.sin(angle) * radius;
              const curlAngle = angle + 0.65;
              const ex = sx + Math.cos(curlAngle) * (isBefore ? 12 : 22);
              const ey = sy + Math.sin(curlAngle) * (isBefore ? 12 : 22);

              // Don't render inside bald patch for 'before'
              const vDx = (sx + 6) / baldRadiusX;
              const vDy = (sy + 18) / baldRadiusY;
              if (isBefore && vDx * vDx + vDy * vDy < 0.85 && i % 4 !== 0) {
                return null;
              }

              return (
                <path
                  key={`male-strand-${i}`}
                  d={`M ${sx} ${sy} Q ${(sx + ex) / 2 + 3} ${(sy + ey) / 2 - 2} ${ex} ${ey}`}
                  stroke={i % 4 === 0 ? "#0d0e11" : "#1e2129"}
                  strokeWidth={isBefore ? 1.6 : 2.4}
                  strokeLinecap="round"
                  opacity={isBefore ? 0.75 : 0.95}
                />
              );
            })}

            {/* Before: Exposed Scalp with Follicular Miniaturization */}
            {isBefore && (
              <g>
                {Array.from({ length: 35 }).map((_, i) => {
                  const angle = (i / 35) * Math.PI * 2;
                  const rx = ((i * 19) % Math.round(baldRadiusX * 0.8));
                  const ry = ((i * 23) % Math.round(baldRadiusY * 0.8));
                  const fx = -6 + Math.cos(angle) * rx;
                  const fy = -18 + Math.sin(angle) * ry;
                  return (
                    <g key={`mini-hair-${i}`}>
                      <circle cx={fx} cy={fy} r="1" fill="#4a3e35" opacity="0.6" />
                      <path
                        d={`M ${fx} ${fy} L ${fx + 3} ${fy + 2}`}
                        stroke="#5c4a3e"
                        strokeWidth="0.8"
                        opacity="0.5"
                      />
                    </g>
                  );
                })}
              </g>
            )}
          </g>
        )}

        {/* Trichology Clinical Tag Badge (e.g., "Dia 01" / "3 meses") */}
        <g transform={`translate(${tagX}, ${tagY})`}>
          <rect
            x="-55"
            y="-16"
            width="110"
            height="32"
            rx="6"
            fill={tagBg}
            stroke={isFemale ? "#e2a090" : "#eaa655"}
            strokeWidth="1.5"
            filter="drop-shadow(0 4px 8px rgba(0,0,0,0.55))"
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
            {label.toUpperCase()}
          </text>
        </g>
      </g>
    );
  };

  return (
    <svg
      viewBox="0 0 960 540"
      className={`w-full h-full object-cover sm:object-contain transition-transform duration-300 ${isZoomed ? 'scale-125' : 'scale-100'} ${className}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Gradients */}
        <linearGradient id="clinicWallGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#e3e6eb" />
          <stop offset="60%" stopColor="#d3d7de" />
          <stop offset="100%" stopColor="#c5cbd4" />
        </linearGradient>

        <linearGradient id="chairGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#2c3038" />
          <stop offset="100%" stopColor="#14161b" />
        </linearGradient>

        <radialGradient id="clinicSpotlight" cx="50%" cy="40%" r="50%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.4" />
          <stop offset="70%" stopColor="#ffffff" stopOpacity="0.05" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>

        <radialGradient id="scalpSkinGleam" cx="45%" cy="45%" r="55%">
          <stop offset="0%" stopColor={isFemale ? "#fceddf" : "#f7dfcf"} />
          <stop offset="65%" stopColor={isFemale ? "#ebcca9" : "#e2ba99"} />
          <stop offset="100%" stopColor={isFemale ? "#d9af90" : "#d0a480"} />
        </radialGradient>

        <radialGradient id="maleHairBaseSparse" cx="50%" cy="45%" r="60%">
          <stop offset="0%" stopColor="#30343e" />
          <stop offset="70%" stopColor="#181a20" />
          <stop offset="100%" stopColor="#0c0d10" />
        </radialGradient>

        <radialGradient id="maleHairBaseDense" cx="50%" cy="45%" r="60%">
          <stop offset="0%" stopColor="#1c1f26" />
          <stop offset="70%" stopColor="#111317" />
          <stop offset="100%" stopColor="#08090a" />
        </radialGradient>

        <radialGradient id="femHairBaseSparse" cx="50%" cy="45%" r="60%">
          <stop offset="0%" stopColor="#3b2b22" />
          <stop offset="70%" stopColor="#231711" />
          <stop offset="100%" stopColor="#130b07" />
        </radialGradient>

        <radialGradient id="femHairBaseDense" cx="50%" cy="45%" r="60%">
          <stop offset="0%" stopColor="#2c1d15" />
          <stop offset="70%" stopColor="#190e09" />
          <stop offset="100%" stopColor="#0c0604" />
        </radialGradient>

        <linearGradient id="tagGradMasc" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F9C37A" />
          <stop offset="100%" stopColor="#EAA655" />
        </linearGradient>

        <linearGradient id="tagGradFem" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F9C5B7" />
          <stop offset="100%" stopColor="#E2A090" />
        </linearGradient>
      </defs>

      {/* Render Mode Logic */}
      {stage === 'combined' && (
        <g>
          {/* Left Side: DIA 01 */}
          <g clipPath="url(#leftClip)">
            {renderSingleScalp('before', 240, 260, 1.25, 'DIA 01', 0, 160)}
          </g>

          {/* Right Side: POST-TREATMENT */}
          <g clipPath="url(#rightClip)">
            {renderSingleScalp('after', 720, 260, 1.25, durationLabel, 0, 160)}
          </g>

          {/* Divider Line in Center */}
          <line x1="480" y1="0" x2="480" y2="540" stroke="#ffffff" strokeWidth="2.5" opacity="0.9" />

          {/* Clip Paths */}
          <clipPath id="leftClip">
            <rect x="0" y="0" width="480" height="540" />
          </clipPath>
          <clipPath id="rightClip">
            <rect x="480" y="0" width="480" height="540" />
          </clipPath>
        </g>
      )}

      {stage === 'before' && (
        <g>
          {renderSingleScalp('before', 480, 260, 1.35, 'DIA 01', 0, 165)}
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
