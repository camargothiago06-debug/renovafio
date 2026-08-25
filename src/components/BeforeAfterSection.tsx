import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GenderMode } from '../types';
import { CLINICAL_CASES } from '../data/productData';
import { ScalpClinicalCanvas } from './ScalpClinicalCanvas';
import {
  Sparkles,
  ShieldCheck,
  UserCheck,
  Sliders,
  ZoomIn,
  Columns,
  CheckCircle2,
  Calendar,
  Layers,
  Award
} from 'lucide-react';

interface BeforeAfterSectionProps {
  gender: GenderMode;
}

export const BeforeAfterSection: React.FC<BeforeAfterSectionProps> = ({ gender }) => {
  const isFemale = gender === 'feminino';
  const cases = CLINICAL_CASES[gender];
  const [activeCaseIndex, setActiveCaseIndex] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(50); // percentage 0 - 100
  const [viewMode, setViewMode] = useState<'sideBySide' | 'interactiveSlider'>('sideBySide');
  const [isZoomed, setIsZoomed] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const sliderRef = React.useRef<HTMLDivElement>(null);

  const activeCase = cases[activeCaseIndex] || cases[0];
  const goldPrimary = isFemale ? '#E2A999' : '#D4AF37';
  const goldGlow = isFemale ? 'rgba(226, 169, 153, 0.25)' : 'rgba(212, 175, 55, 0.25)';

  const updateSliderPos = (clientX: number) => {
    if (!sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
    updateSliderPos(e.clientX);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isDragging || e.buttons === 1) {
      updateSliderPos(e.clientX);
    }
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsDragging(false);
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {}
  };

  return (
    <section id="resultados" className="py-24 px-4 sm:px-6 lg:px-8 bg-transparent border-t border-zinc-800/70 relative">
      {/* Background Subtle Ambient Glow */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full blur-[140px] pointer-events-none opacity-20"
        style={{
          backgroundColor: isFemale ? '#E2A999' : '#D4AF37',
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <div
            className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full border text-xs sm:text-sm font-medium uppercase tracking-wider backdrop-blur-md"
            style={{
              borderColor: isFemale ? 'rgba(226, 169, 153, 0.3)' : 'rgba(212, 175, 55, 0.3)',
              backgroundColor: isFemale ? 'rgba(226, 169, 153, 0.08)' : 'rgba(212, 175, 55, 0.08)',
              color: isFemale ? '#ffdcd3' : '#fae596',
            }}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Evidência Clínica Documentada em Consultório</span>
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

          <p className="text-zinc-300 text-base sm:text-lg font-light max-w-2xl mx-auto">
            Registros fotográficos padronizados em consultório dermatológico, comprovando o fechamento do vértice, aumento de densidade e espessamento da haste.
          </p>
        </div>

        {/* Master Control Bar: Case Selector Tabs + View Mode Toggle */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10 max-w-5xl mx-auto">
          {/* Case Selector Tabs */}
          <div className="p-1.5 rounded-2xl bg-zinc-950/90 border border-zinc-800/90 backdrop-blur-xl flex flex-wrap gap-2 shadow-xl">
            {cases.map((c, idx) => (
              <button
                key={c.id}
                onClick={() => {
                  setActiveCaseIndex(idx);
                  setSliderPosition(50);
                }}
                className={`px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-mono font-medium transition-all flex items-center gap-2 cursor-pointer ${
                  activeCaseIndex === idx
                    ? 'text-white font-bold shadow-lg'
                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/60'
                }`}
                style={{
                  backgroundColor: activeCaseIndex === idx ? (isFemale ? '#2a1622' : '#1e1b12') : 'transparent',
                  border: activeCaseIndex === idx ? `1px solid ${goldPrimary}` : '1px solid transparent',
                  boxShadow: activeCaseIndex === idx ? `0 0 15px ${goldGlow}` : 'none',
                }}
              >
                <Award className="w-3.5 h-3.5" style={{ color: activeCaseIndex === idx ? goldPrimary : '#71717a' }} />
                <span>Caso 0{idx + 1}: {c.treatmentDuration}</span>
                <span className="text-[11px] opacity-70 hidden sm:inline">({c.patientName})</span>
              </button>
            ))}
          </div>

          {/* View Mode Switcher (Side by Side vs Slider) */}
          <div className="p-1.5 rounded-2xl bg-zinc-950/90 border border-zinc-800/90 backdrop-blur-xl flex gap-1 shadow-xl">
            <button
              onClick={() => setViewMode('sideBySide')}
              className={`px-3.5 py-2 rounded-xl text-xs font-mono font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                viewMode === 'sideBySide'
                  ? 'bg-zinc-800 text-white border border-zinc-700 shadow-md'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Columns className="w-3.5 h-3.5" />
              <span>Lado a Lado</span>
            </button>
            <button
              onClick={() => setViewMode('interactiveSlider')}
              className={`px-3.5 py-2 rounded-xl text-xs font-mono font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                viewMode === 'interactiveSlider'
                  ? 'bg-zinc-800 text-white border border-zinc-700 shadow-md'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>Divisor Interativo</span>
            </button>
          </div>
        </div>

        {/* Interactive Showcase Container with Synchronized Luxury Contour & Margins */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch max-w-5xl mx-auto">
          
          {/* Main Photo Frame (Desktop 7/12 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <div
              className="relative p-2.5 sm:p-4 rounded-3xl backdrop-blur-2xl transition-all duration-500 shadow-2xl"
              style={{
                background: isFemale
                  ? 'linear-gradient(145deg, rgba(35, 18, 28, 0.96), rgba(18, 9, 14, 0.98))'
                  : 'linear-gradient(145deg, rgba(26, 21, 15, 0.96), rgba(13, 11, 8, 0.98))',
                border: `1.5px solid ${goldPrimary}60`,
                boxShadow: `0 25px 60px -15px rgba(0,0,0,0.9), 0 0 35px ${goldGlow}`,
              }}
            >
              {/* Luxury Corner Crosshairs / Accents */}
              <div className="absolute top-2 left-2 w-3.5 h-3.5 border-t-2 border-l-2 pointer-events-none rounded-tl-sm" style={{ borderColor: goldPrimary }} />
              <div className="absolute top-2 right-2 w-3.5 h-3.5 border-t-2 border-r-2 pointer-events-none rounded-tr-sm" style={{ borderColor: goldPrimary }} />
              <div className="absolute bottom-2 left-2 w-3.5 h-3.5 border-b-2 border-l-2 pointer-events-none rounded-bl-sm" style={{ borderColor: goldPrimary }} />
              <div className="absolute bottom-2 right-2 w-3.5 h-3.5 border-b-2 border-r-2 pointer-events-none rounded-br-sm" style={{ borderColor: goldPrimary }} />

              {/* Inner Luxury Frame */}
              <div className="relative rounded-2xl overflow-hidden bg-zinc-950 border border-zinc-800/90 shadow-inner">
                
                {/* Mode 1: Side by Side Real Clinical Photo */}
                {viewMode === 'sideBySide' ? (
                  <div className="relative w-full aspect-[16/9] overflow-hidden bg-zinc-950 flex items-center justify-center">
                    <img
                      src={activeCase.combinedImageUrl}
                      alt={`Fotografia Clínica ${activeCase.patientName} - ${activeCase.treatmentDuration}`}
                      className={`w-full h-full object-cover sm:object-contain transition-transform duration-300 ${
                        isZoomed ? 'scale-125' : 'scale-100'
                      }`}
                      referrerPolicy="no-referrer"
                    />
                  </div>
                ) : (
                  /* Mode 2: Interactive Drag Slider */
                  <div
                    ref={sliderRef}
                    className="relative w-full aspect-[16/9] overflow-hidden cursor-ew-resize select-none bg-zinc-950 touch-none"
                    onPointerDown={handlePointerDown}
                    onPointerMove={handlePointerMove}
                    onPointerUp={handlePointerUp}
                    onPointerCancel={handlePointerUp}
                  >
                    {/* AFTER Layer (Right / Base background) */}
                    <div className="absolute inset-0 w-full h-full flex items-center justify-center bg-zinc-950">
                      <img
                        src={activeCase.afterImageUrl}
                        alt={`${activeCase.afterLabel} - ${activeCase.patientName}`}
                        className={`w-full h-full object-cover sm:object-contain transition-transform duration-300 pointer-events-none ${
                          isZoomed ? 'scale-125' : 'scale-100'
                        }`}
                        referrerPolicy="no-referrer"
                      />
                    </div>

                    {/* BEFORE Layer (Left / Clipped smoothly via inset) */}
                    <div
                      className="absolute inset-0 w-full h-full flex items-center justify-center bg-zinc-950 pointer-events-none"
                      style={{
                        clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`
                      }}
                    >
                      <img
                        src={activeCase.beforeImageUrl}
                        alt={`${activeCase.beforeLabel} - ${activeCase.patientName}`}
                        className={`w-full h-full object-cover sm:object-contain transition-transform duration-300 pointer-events-none ${
                          isZoomed ? 'scale-125' : 'scale-100'
                        }`}
                        referrerPolicy="no-referrer"
                      />
                    </div>

                    {/* Golden Glowing Divider Line & Center Drag Handle */}
                    <div
                      className="absolute top-0 bottom-0 z-30 pointer-events-none -translate-x-1/2 flex flex-col items-center justify-center"
                      style={{ left: `${sliderPosition}%` }}
                    >
                      <div
                        className="w-0.5 sm:w-1 h-full shadow-[0_0_15px_rgba(212,175,55,0.9)]"
                        style={{ backgroundColor: goldPrimary }}
                      />
                      <div
                        className="absolute w-9 h-9 sm:w-11 sm:h-11 rounded-full flex items-center justify-center bg-zinc-950/95 border-2 shadow-2xl transition-transform active:scale-95"
                        style={{
                          borderColor: goldPrimary,
                          boxShadow: `0 0 20px ${goldPrimary}90, 0 4px 12px rgba(0,0,0,0.8)`,
                          color: goldPrimary
                        }}
                      >
                        <Sliders className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                      </div>
                    </div>
                  </div>
                )}

                {/* Sub-bar inside frame with controls & caption */}
                <div className="px-4 py-2.5 bg-zinc-950/95 border-t border-zinc-800/80 flex items-center justify-between text-xs text-zinc-400 font-mono">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Registro Fotográfico Padronizado</span>
                  </div>
                  <button
                    onClick={() => setIsZoomed(!isZoomed)}
                    className="flex items-center space-x-1.5 text-zinc-300 hover:text-white transition-colors cursor-pointer py-0.5 px-2 rounded-md hover:bg-zinc-800/60"
                  >
                    <ZoomIn className="w-3.5 h-3.5" />
                    <span>{isZoomed ? 'Reduzir' : 'Zoom Folicular'}</span>
                  </button>
                </div>

              </div>
            </div>

            {/* Hint below photo */}
            <p className="text-center text-xs text-zinc-400 font-mono mt-3">
              {viewMode === 'interactiveSlider'
                ? '← Arraste o botão central para inspecionar a transição dos folículos →'
                : 'Fotografia em alta definição registrada sob a mesma iluminação e ângulo de vértice.'}
            </p>
          </div>

          {/* Right Clinical Audit Panel (Desktop 5/12 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
            
            {/* Clinical Card Box */}
            <div
              className="p-6 sm:p-7 rounded-3xl backdrop-blur-2xl transition-all duration-300 flex-1 flex flex-col justify-between space-y-5"
              style={{
                background: isFemale
                  ? 'linear-gradient(145deg, rgba(28, 15, 23, 0.95), rgba(14, 8, 12, 0.98))'
                  : 'linear-gradient(145deg, rgba(22, 18, 14, 0.95), rgba(11, 9, 7, 0.98))',
                border: `1px solid ${goldPrimary}35`,
                boxShadow: `0 15px 40px -10px rgba(0,0,0,0.6)`,
              }}
            >
              {/* Header Info */}
              <div className="flex items-center justify-between border-b border-zinc-800/80 pb-3.5">
                <div>
                  <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider block">Paciente Auditado</span>
                  <span className="text-base font-bold text-white font-mono">{activeCase.patientName}, {activeCase.age} anos</span>
                </div>
                <div
                  className="px-3 py-1 rounded-full text-xs font-mono font-bold border"
                  style={{
                    borderColor: `${goldPrimary}50`,
                    backgroundColor: `${goldPrimary}15`,
                    color: isFemale ? '#ffdcd3' : '#fae596',
                  }}
                >
                  {activeCase.treatmentDuration}
                </div>
              </div>

              {/* Diagnosis and Progress */}
              <div className="space-y-3.5">
                <div>
                  <p className="text-xs font-mono text-zinc-400 uppercase tracking-wider font-semibold">
                    Quadro Clínico Inicial ({activeCase.beforeLabel})
                  </p>
                  <p className="text-sm font-semibold text-zinc-200 mt-0.5">{activeCase.stage}</p>
                  <p className="text-xs sm:text-sm text-zinc-300 font-light mt-1 leading-relaxed">
                    {activeCase.beforeDesc}
                  </p>
                </div>

                <div className="pt-2 border-t border-zinc-800/60">
                  <p className="text-xs font-mono uppercase tracking-wider font-semibold" style={{ color: goldPrimary }}>
                    Evolução Terapêutica ({activeCase.afterLabel})
                  </p>
                  <p className="text-xs sm:text-sm text-zinc-200 font-light mt-1 leading-relaxed">
                    {activeCase.afterDesc}
                  </p>
                </div>
              </div>

              {/* Density Callout Stat Pill */}
              <div
                className="p-4 rounded-2xl border text-center relative overflow-hidden"
                style={{
                  borderColor: `${goldPrimary}50`,
                  backgroundColor: `${goldPrimary}12`,
                  boxShadow: `inset 0 0 20px ${goldGlow}`,
                }}
              >
                <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-300 block mb-0.5">
                  Ganho Folicular Documentado
                </span>
                <p className="text-xl sm:text-2xl font-mono font-bold text-white tracking-tight">
                  {activeCase.densityIncrease}
                </p>
              </div>

              {/* Physician CRM Verification */}
              <div className="pt-3 border-t border-zinc-800/80 flex items-center space-x-2.5 text-xs text-zinc-300">
                <UserCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="font-mono text-[11px] sm:text-xs">{activeCase.verifiedDoctor}</span>
              </div>
            </div>

            {/* Quick Summary Pill below */}
            <div className="p-4 rounded-2xl bg-zinc-950/80 border border-zinc-800/80 flex items-center justify-between text-xs font-mono text-zinc-400">
              <span className="flex items-center gap-1.5 text-zinc-300">
                <CheckCircle2 className="w-4 h-4 text-[#fae596]" />
                Sem oleosidade tópica
              </span>
              <span className="flex items-center gap-1.5 text-zinc-300">
                <CheckCircle2 className="w-4 h-4 text-[#fae596]" />
                1 dose oral diária
              </span>
            </div>

          </div>

        </div>

        {/* Gallery Thumbnails of All Available Clinical Cases */}
        <div className="mt-14 pt-12 border-t border-zinc-800/80 max-w-5xl mx-auto">
          <p className="text-center text-xs font-mono text-zinc-400 uppercase tracking-widest mb-6">
            Explore Todos os Registros Clínicos da Linha
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {cases.map((c, idx) => {
              const isSelected = activeCaseIndex === idx;
              return (
                <div
                  key={c.id}
                  onClick={() => {
                    setActiveCaseIndex(idx);
                    setSliderPosition(50);
                    window.scrollTo({
                      top: document.getElementById('resultados')?.offsetTop || 0,
                      behavior: 'smooth',
                    });
                  }}
                  className={`p-4 rounded-2xl border transition-all duration-300 cursor-pointer flex gap-4 items-center ${
                    isSelected
                      ? 'bg-zinc-900/90 shadow-xl'
                      : 'bg-zinc-950/60 hover:bg-zinc-900/50 border-zinc-800/80 hover:border-zinc-700'
                  }`}
                  style={{
                    borderColor: isSelected ? goldPrimary : 'rgba(39, 39, 42, 0.8)',
                    boxShadow: isSelected ? `0 0 20px ${goldGlow}` : 'none',
                  }}
                >
                  <div className="w-28 sm:w-36 aspect-[16/9] rounded-xl overflow-hidden bg-black shrink-0 border border-zinc-700/60">
                    <img
                      src={c.combinedImageUrl || '/images/foto-resultado-11-meses.png.png'}
                      alt={c.patientName}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        const target = e.currentTarget;
                        if (target.src.endsWith('.png.png')) {
                          target.src = target.src.replace('.png.png', '.png');
                        }
                      }}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold" style={{ color: goldPrimary }}>
                        Caso 0{idx + 1}
                      </span>
                      <span className="text-[11px] font-mono text-zinc-400">{c.treatmentDuration}</span>
                    </div>
                    <p className="text-sm font-bold text-white truncate mt-0.5">{c.patientName}, {c.age} anos</p>
                    <p className="text-xs font-mono text-emerald-400 font-semibold mt-1 truncate">
                      {c.densityIncrease}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};

