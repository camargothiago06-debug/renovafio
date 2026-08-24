import React, { useState } from 'react';
import { motion } from 'motion/react';
import { GenderMode } from '../types';
import { CLINICAL_CASES } from '../data/productData';
import { Sparkles, ShieldCheck, UserCheck, Calendar, Sliders, ZoomIn } from 'lucide-react';

interface BeforeAfterSectionProps {
  gender: GenderMode;
}

export const BeforeAfterSection: React.FC<BeforeAfterSectionProps> = ({ gender }) => {
  const isFemale = gender === 'feminino';
  const cases = CLINICAL_CASES[gender];
  const [activeCaseIndex, setActiveCaseIndex] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(50); // percentage 0 - 100
  const [isZoomed, setIsZoomed] = useState(false);

  const activeCase = cases[activeCaseIndex];
  const goldPrimary = isFemale ? '#E2A999' : '#D4AF37';

  const handleSliderMove = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  return (
    <section id="resultados" className="py-24 px-4 sm:px-6 lg:px-8 bg-transparent border-t border-[#d4af37]/20 relative overflow-hidden">
      {/* Subtle background glow */}
      <div
        className="absolute top-1/2 -right-40 w-96 h-96 rounded-full blur-[150px] opacity-15 pointer-events-none"
        style={{ backgroundColor: goldPrimary }}
      />
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div
            className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full border text-xs font-medium uppercase tracking-wider backdrop-blur-md"
            style={{
              borderColor: isFemale ? 'rgba(226, 169, 153, 0.3)' : 'rgba(212, 175, 55, 0.3)',
              backgroundColor: isFemale ? 'rgba(226, 169, 153, 0.08)' : 'rgba(212, 175, 55, 0.08)',
              color: isFemale ? '#ffdcd3' : '#fae596',
            }}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Evidência Clínica Documentada</span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white uppercase">
            TRANSFORMAÇÕES REAIS{' '}
            <span
              className="bg-clip-text text-transparent italic font-normal"
              style={{
                backgroundImage: isFemale
                  ? 'linear-gradient(135deg, #FFF2F0 0%, #E2A999 50%, #DFB775 100%)'
                  : 'linear-gradient(135deg, #FFF0D0 0%, #D4AF37 50%, #AA771C 100%)',
                fontFamily: 'var(--font-cormorant)',
              }}
            >
              Documentadas.
            </span>
          </h2>

          <p className="text-zinc-400 text-sm sm:text-base font-light">
            Arraste o divisor interativo abaixo para comparar a evolução clínica dos pacientes desde o Dia 01 até a consolidação total da densidade.
          </p>
        </div>

        {/* Case Selectors Tabs */}
        <div className="flex justify-center mb-10">
          <div className="p-1 rounded-full bg-zinc-900 border border-zinc-800 flex gap-2">
            {cases.map((c, idx) => (
              <button
                key={c.id}
                onClick={() => {
                  setActiveCaseIndex(idx);
                  setSliderPosition(50);
                }}
                className={`px-5 py-2 rounded-full text-xs font-mono transition-all ${
                  activeCaseIndex === idx
                    ? 'bg-zinc-800 text-white font-bold shadow-md border'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
                style={{
                  borderColor: activeCaseIndex === idx ? goldPrimary : 'transparent',
                }}
              >
                Caso {idx + 1}: {c.treatmentDuration} ({c.patientName})
              </button>
            ))}
          </div>
        </div>

        {/* Interactive Comparison Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-5xl mx-auto">
          
          {/* Comparison Canvas / Slider */}
          <div className="lg:col-span-8 flex flex-col items-center">
            <div
              className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border border-zinc-800 cursor-ew-resize select-none bg-zinc-950"
              onMouseMove={(e) => {
                if (e.buttons === 1) handleSliderMove(e);
              }}
              onClick={handleSliderMove}
              onTouchMove={handleSliderMove}
            >
              {/* "AFTER" Image Layer (Underneath or Right Side) */}
              <div className="absolute inset-0 w-full h-full bg-[#18181b] flex items-center justify-center overflow-hidden">
                {/* Visual Representation of Full Hair Crown Restoration */}
                <div
                  className={`w-full h-full flex flex-col items-center justify-center p-6 text-center transition-transform duration-300 ${
                    isZoomed ? 'scale-125' : 'scale-100'
                  }`}
                  style={{
                    background: isFemale
                      ? 'radial-gradient(circle at center, #2e1a22 0%, #150d12 60%, #0a0608 100%)'
                      : 'radial-gradient(circle at center, #241c14 0%, #12100d 60%, #080706 100%)',
                  }}
                >
                  {/* Dense Crown Scalp Simulation */}
                  <div className="relative w-56 sm:w-72 h-56 sm:h-72 rounded-full bg-zinc-900 border-4 border-zinc-800 shadow-2xl overflow-hidden flex items-center justify-center">
                    <div
                      className="absolute inset-0 opacity-90"
                      style={{
                        background: 'radial-gradient(circle at center, #1c1917 0%, #09090b 80%)',
                      }}
                    >
                      {/* Dense Hair Swirl Vortex Pattern */}
                      <svg className="w-full h-full opacity-80" viewBox="0 0 200 200">
                        {Array.from({ length: 140 }).map((_, i) => {
                          const angle = (i * 137.5 * Math.PI) / 180;
                          const r = Math.sqrt(i) * 7.5;
                          const cx = 100 + r * Math.cos(angle);
                          const cy = 100 + r * Math.sin(angle);
                          return (
                            <circle
                              key={i}
                              cx={cx}
                              cy={cy}
                              r={1.2}
                              fill="#000"
                              stroke={isFemale ? '#4a2f2b' : '#3f3f46'}
                              strokeWidth={0.8}
                            />
                          );
                        })}
                      </svg>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  </div>
                </div>

                {/* After Badge (Inspired by Foto 2/3 orange label) */}
                <div className="absolute bottom-4 right-4 z-20 px-3.5 py-1.5 rounded-md bg-[#e5a65c] text-black font-mono font-bold text-xs uppercase tracking-wider shadow-lg">
                  {activeCase.afterLabel}
                </div>
              </div>

              {/* "BEFORE" Image Layer (Clipped by Slider Position) */}
              <div
                className="absolute inset-0 h-full overflow-hidden border-r-2"
                style={{
                  width: `${sliderPosition}%`,
                  borderColor: goldPrimary,
                }}
              >
                <div
                  className={`w-full h-full min-w-[320px] sm:min-w-[500px] flex flex-col items-center justify-center p-6 text-center transition-transform duration-300 ${
                    isZoomed ? 'scale-125' : 'scale-100'
                  }`}
                  style={{
                    background: 'radial-gradient(circle at center, #3f2f25 0%, #1f1712 60%, #0d0a08 100%)',
                  }}
                >
                  {/* Rarefied / Thinning Scalp Vortex Simulation */}
                  <div className="relative w-56 sm:w-72 h-56 sm:h-72 rounded-full bg-amber-950/40 border-4 border-zinc-800 shadow-2xl overflow-hidden flex items-center justify-center">
                    <div className="absolute inset-0 flex items-center justify-center">
                      {/* Exposed Skin Glow at Center */}
                      <div className="w-24 h-24 rounded-full bg-[#c28e75]/40 blur-xl"></div>
                      <svg className="w-full h-full opacity-40" viewBox="0 0 200 200">
                        {Array.from({ length: 45 }).map((_, i) => {
                          const angle = (i * 137.5 * Math.PI) / 180;
                          const r = Math.sqrt(i) * 11 + 25;
                          const cx = 100 + r * Math.cos(angle);
                          const cy = 100 + r * Math.sin(angle);
                          return (
                            <circle
                              key={i}
                              cx={cx}
                              cy={cy}
                              r={0.9}
                              fill="#18181b"
                            />
                          );
                        })}
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Before Badge (Inspired by Foto 2/3 orange label) */}
                <div className="absolute bottom-4 left-4 z-20 px-3.5 py-1.5 rounded-md bg-[#e5a65c] text-black font-mono font-bold text-xs uppercase tracking-wider shadow-lg">
                  {activeCase.beforeLabel}
                </div>
              </div>

              {/* Center Slider Divider Bar & Handle */}
              <div
                className="absolute top-0 bottom-0 z-30 flex items-center justify-center -translate-x-1/2 pointer-events-none"
                style={{ left: `${sliderPosition}%` }}
              >
                <div
                  className="w-8 h-8 rounded-full shadow-2xl flex items-center justify-center border-2 border-white bg-black/90 text-white"
                  style={{
                    boxShadow: `0 0 15px ${goldPrimary}`,
                  }}
                >
                  <Sliders className="w-4 h-4 text-[#fae596]" />
                </div>
              </div>
            </div>

            {/* Slider Hint and Zoom Toggle */}
            <div className="flex items-center justify-between w-full mt-3 px-2 text-xs text-zinc-500 font-mono">
              <span>← Deslize para comparar →</span>
              <button
                onClick={() => setIsZoomed(!isZoomed)}
                className="flex items-center space-x-1 text-zinc-400 hover:text-white transition-colors"
              >
                <ZoomIn className="w-3.5 h-3.5" />
                <span>{isZoomed ? 'Reduzir Zoom' : 'Zoom Folicular'}</span>
              </button>
            </div>
          </div>

          {/* Right Column: Case Details & Medical Audit */}
          <div className="lg:col-span-4 space-y-6">
            <div className="p-6 rounded-2xl bg-[#121216] border border-zinc-800 space-y-4">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                <span className="text-xs font-mono text-zinc-400">Paciente Avaliado</span>
                <span className="text-xs font-mono font-bold text-white">
                  {activeCase.patientName}, {activeCase.age} anos
                </span>
              </div>

              <div>
                <p className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider">Diagnóstico Inicial</p>
                <p className="text-sm font-semibold text-zinc-200 mt-0.5">{activeCase.stage}</p>
                <p className="text-xs text-zinc-400 mt-1 font-light">{activeCase.beforeDesc}</p>
              </div>

              <div>
                <p className="text-[11px] font-mono uppercase tracking-wider" style={{ color: goldPrimary }}>
                  Resultado Atingido
                </p>
                <p className="text-sm font-semibold text-white mt-0.5">{activeCase.afterDesc}</p>
              </div>

              {/* Stat callout */}
              <div
                className="p-3 rounded-xl border text-center"
                style={{
                  borderColor: `${goldPrimary}40`,
                  backgroundColor: `${goldPrimary}10`,
                }}
              >
                <p className="text-base font-mono font-bold text-white">
                  {activeCase.densityIncrease}
                </p>
              </div>

              {/* Verified Physician */}
              <div className="pt-2 border-t border-zinc-800/80 flex items-center space-x-2 text-[11px] text-zinc-400">
                <UserCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{activeCase.verifiedDoctor}</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
