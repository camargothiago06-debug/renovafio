import React, { useState, useRef, useEffect, useCallback } from 'react';
import { CustomerJourneyProfile, GenderMode } from '../../types';
import {
  Columns,
  SlidersHorizontal,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Sparkles,
  ArrowLeftRight,
  Info,
  Camera,
  Layers,
} from 'lucide-react';

interface JourneyVisualComparatorProps {
  profile: CustomerJourneyProfile;
  gender: GenderMode;
  initialBeforeStage?: CustomerJourneyProfile['currentStageKey'];
  initialAfterStage?: CustomerJourneyProfile['currentStageKey'];
  onOpenStageToUpload?: (stageKey: CustomerJourneyProfile['currentStageKey']) => void;
}

export const JourneyVisualComparator: React.FC<JourneyVisualComparatorProps> = ({
  profile,
  gender,
  initialBeforeStage = 'dia01',
  initialAfterStage = 'mes03',
  onOpenStageToUpload,
}) => {
  const isFemale = gender === 'feminino';
  const goldPrimary = isFemale ? '#E2A999' : '#D4AF37';

  const [beforeStageKey, setBeforeStageKey] = useState<CustomerJourneyProfile['currentStageKey']>(initialBeforeStage);
  const [afterStageKey, setAfterStageKey] = useState<CustomerJourneyProfile['currentStageKey']>(initialAfterStage);
  const [viewMode, setViewMode] = useState<'slider' | 'sideBySide'>('slider');
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isZoomed, setIsZoomed] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  // Sync if initial props change
  useEffect(() => {
    if (initialBeforeStage) setBeforeStageKey(initialBeforeStage);
  }, [initialBeforeStage]);

  useEffect(() => {
    if (initialAfterStage) setAfterStageKey(initialAfterStage);
  }, [initialAfterStage]);

  const beforeMilestone = profile.milestones.find((m) => m.stageKey === beforeStageKey) || profile.milestones[0];
  const afterMilestone = profile.milestones.find((m) => m.stageKey === afterStageKey) || profile.milestones[2];

  // Default fallback image if no photo uploaded yet
  const defaultFallbackImage = '/images/foto-resultado-3-meses.png';
  const beforePhoto = beforeMilestone.photoUrl || defaultFallbackImage;
  const afterPhoto = afterMilestone.photoUrl || (afterStageKey === 'mes11' ? '/images/foto-resultado-11-meses.png' : defaultFallbackImage);

  // Slider drag handler
  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(5, Math.min(95, (x / rect.width) * 100));
    setSliderPosition(percentage);
  }, []);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!isDragging) return;
    handleMove(e.touches[0].clientX);
  }, [isDragging, handleMove]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  }, [isDragging, handleMove]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('touchend', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp, handleTouchMove]);

  return (
    <div className="w-full space-y-6">
      {/* Comparator Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="font-display text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
            <Layers className="w-5 h-5" style={{ color: goldPrimary }} />
            Comparador Visual de Evolução Pessoal
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 font-light mt-0.5">
            Selecione dois momentos da sua jornada para confrontar a densidade capilar e cobertura do couro cabeludo.
          </p>
        </div>

        {/* View Mode & Zoom Toggle Buttons */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Mode Switcher */}
          <div className="p-1 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center gap-1">
            <button
              onClick={() => setViewMode('slider')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                viewMode === 'slider'
                  ? 'bg-zinc-800 text-white shadow-sm border border-zinc-700'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              Divisor Interativo
            </button>
            <button
              onClick={() => setViewMode('sideBySide')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                viewMode === 'sideBySide'
                  ? 'bg-zinc-800 text-white shadow-sm border border-zinc-700'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <Columns className="w-3.5 h-3.5" />
              Lado a Lado
            </button>
          </div>

          {/* Zoom Toggle */}
          <button
            onClick={() => setIsZoomed(!isZoomed)}
            className={`p-2 rounded-xl border text-xs font-bold transition-all flex items-center gap-1 cursor-pointer ${
              isZoomed
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/50'
                : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white'
            }`}
            title="Alternar Zoom Folicular"
          >
            {isZoomed ? <ZoomOut className="w-4 h-4" /> : <ZoomIn className="w-4 h-4" />}
            <span className="hidden sm:inline">{isZoomed ? 'Zoom 1.25x' : 'Zoom 1x'}</span>
          </button>
        </div>
      </div>

      {/* Stage Selectors Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-[#0c0c10] border border-zinc-800">
        
        {/* Left Stage Selector (Before) */}
        <div className="space-y-1.5">
          <label className="text-xs font-mono text-zinc-400 uppercase tracking-wider flex items-center justify-between">
            <span>Imagem Base (Antes / Inicial):</span>
            <span className="text-[10px] text-zinc-400">
              {beforeMilestone.completedDate || 'Sem data'}
            </span>
          </label>
          <select
            value={beforeStageKey}
            onChange={(e) => setBeforeStageKey(e.target.value as CustomerJourneyProfile['currentStageKey'])}
            className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-700 text-sm text-white focus:outline-none focus:border-[#D4AF37] cursor-pointer"
          >
            {profile.milestones.map((m) => (
              <option key={m.stageKey} value={m.stageKey}>
                {m.shortLabel} — {m.title} {m.photoUrl ? '📷' : '(padrão)'}
              </option>
            ))}
          </select>
        </div>

        {/* Right Stage Selector (After) */}
        <div className="space-y-1.5">
          <label className="text-xs font-mono text-zinc-400 uppercase tracking-wider flex items-center justify-between">
            <span>Imagem de Evolução (Depois / Atual):</span>
            <span className="text-[10px] text-zinc-400">
              {afterMilestone.completedDate || 'Sem data'}
            </span>
          </label>
          <select
            value={afterStageKey}
            onChange={(e) => setAfterStageKey(e.target.value as CustomerJourneyProfile['currentStageKey'])}
            className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-700 text-sm text-white focus:outline-none focus:border-[#D4AF37] cursor-pointer"
          >
            {profile.milestones.map((m) => (
              <option key={m.stageKey} value={m.stageKey}>
                {m.shortLabel} — {m.title} {m.photoUrl ? '📷' : '(padrão)'}
              </option>
            ))}
          </select>
        </div>

      </div>

      {/* Main Visual Display Stage */}
      <div className="relative rounded-3xl overflow-hidden border border-zinc-800 bg-[#070709] shadow-2xl">
        
        {viewMode === 'sideBySide' ? (
          /* Mode 1: Side by Side (2 columns) */
          <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-zinc-800">
            
            {/* Left Photo */}
            <div className="relative aspect-[4/3] sm:aspect-[16/10] bg-zinc-950 flex items-center justify-center p-3 overflow-hidden">
              <img
                src={beforePhoto}
                alt={`Evolução ${beforeMilestone.shortLabel}`}
                className={`w-full h-full object-contain transition-transform duration-300 ${
                  isZoomed ? 'scale-125' : 'scale-100'
                }`}
              />
              <div className="absolute bottom-3 left-3 px-3 py-1.5 rounded-lg bg-black/80 border border-zinc-700 backdrop-blur-md text-xs font-mono text-white font-bold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                {beforeMilestone.shortLabel} {beforeMilestone.completedDate ? `(${beforeMilestone.completedDate})` : ''}
              </div>
            </div>

            {/* Right Photo */}
            <div className="relative aspect-[4/3] sm:aspect-[16/10] bg-zinc-950 flex items-center justify-center p-3 overflow-hidden">
              <img
                src={afterPhoto}
                alt={`Evolução ${afterMilestone.shortLabel}`}
                className={`w-full h-full object-contain transition-transform duration-300 ${
                  isZoomed ? 'scale-125' : 'scale-100'
                }`}
              />
              <div className="absolute bottom-3 right-3 px-3 py-1.5 rounded-lg bg-[#D4AF37] text-black font-bold text-xs font-mono shadow-lg flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                {afterMilestone.shortLabel} {afterMilestone.completedDate ? `(${afterMilestone.completedDate})` : ''}
              </div>
            </div>

          </div>
        ) : (
          /* Mode 2: Interactive Drag Slider */
          <div
            ref={containerRef}
            onMouseDown={() => setIsDragging(true)}
            onTouchStart={() => setIsDragging(true)}
            className="relative w-full aspect-[4/3] sm:aspect-[16/9] max-h-[550px] overflow-hidden bg-zinc-950 cursor-ew-resize select-none flex items-center justify-center"
          >
            {/* AFTER Layer (Background Base) */}
            <div className="absolute inset-0 w-full h-full flex items-center justify-center bg-zinc-950 p-2">
              <img
                src={afterPhoto}
                alt={`Evolução ${afterMilestone.shortLabel}`}
                className={`w-full h-full object-contain pointer-events-none transition-transform duration-300 ${
                  isZoomed ? 'scale-125' : 'scale-100'
                }`}
              />
              {/* After Badge Right */}
              <div className="absolute bottom-4 right-4 z-10 px-3.5 py-1.5 rounded-lg bg-[#D4AF37] text-black font-mono font-bold text-xs uppercase tracking-wider shadow-xl border border-amber-300 pointer-events-none">
                {afterMilestone.shortLabel}
              </div>
            </div>

            {/* BEFORE Layer (Clipped Overlay) */}
            <div
              className="absolute inset-0 w-full h-full flex items-center justify-center bg-zinc-950 p-2 pointer-events-none overflow-hidden"
              style={{
                clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`,
              }}
            >
              <img
                src={beforePhoto}
                alt={`Evolução ${beforeMilestone.shortLabel}`}
                className={`w-full h-full object-contain pointer-events-none transition-transform duration-300 ${
                  isZoomed ? 'scale-125' : 'scale-100'
                }`}
              />
              {/* Before Badge Left */}
              <div className="absolute bottom-4 left-4 z-10 px-3.5 py-1.5 rounded-lg bg-zinc-900/90 text-zinc-200 font-mono font-bold text-xs uppercase tracking-wider shadow-xl border border-zinc-700 pointer-events-none">
                {beforeMilestone.shortLabel}
              </div>
            </div>

            {/* Glowing Golden Divider Handle */}
            <div
              className="absolute top-0 bottom-0 w-1 bg-gradient-to-b from-[#FFF0D0] via-[#D4AF37] to-[#AA771C] shadow-[0_0_15px_rgba(212,175,55,0.8)] z-20 pointer-events-none"
              style={{ left: `${sliderPosition}%` }}
            >
              {/* Center Drag Button */}
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-zinc-950 border-2 border-[#D4AF37] shadow-[0_0_20px_rgba(212,175,55,0.7)] flex items-center justify-center text-[#D4AF37]">
                <ArrowLeftRight className="w-4 h-4 sm:w-5 sm:h-5 animate-pulse" />
              </div>
            </div>

            {/* Drag helper hint overlay */}
            <div className="absolute top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-black/60 border border-zinc-700 backdrop-blur-md text-[10px] font-mono text-zinc-300 pointer-events-none">
              Arraste para comparar os folículos
            </div>
          </div>
        )}

        {/* Footer info inside comparator */}
        <div className="p-4 bg-[#0d0d12] border-t border-zinc-800 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-400 gap-2">
          <div className="flex items-center gap-1.5">
            <Info className="w-4 h-4 text-amber-400 shrink-0" />
            <span>
              Comparando <strong>{beforeMilestone.shortLabel}</strong> com <strong>{afterMilestone.shortLabel}</strong>.
            </span>
          </div>

          {(!beforeMilestone.photoUrl || !afterMilestone.photoUrl) && onOpenStageToUpload && (
            <button
              onClick={() => onOpenStageToUpload(!beforeMilestone.photoUrl ? beforeStageKey : afterStageKey)}
              className="text-xs text-[#D4AF37] hover:underline flex items-center gap-1 font-bold cursor-pointer"
            >
              <Camera className="w-3.5 h-3.5" /> Adicionar fotos reais da sua evolução
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
