import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GenderMode } from '../types';
import { Sparkles, Shield, ChevronLeft, ChevronRight, Check, Star, Zap, Award, ArrowRight, Activity, Flame } from 'lucide-react';

interface HeroBannerSliderProps {
  gender: GenderMode;
  onOpenQuiz: () => void;
  onExplorePlans: () => void;
}

interface SlideData {
  id: string;
  badge: string;
  titlePart1: string;
  titleHighlight: string;
  titlePart2: string;
  subtitle: string;
  tagline: string;
  stats: { label: string; value: string; icon: string }[];
  imageDesktop: string;
  imageAlt: string;
  bulletPill: string;
  imagePosition?: string;
}

export const HeroBannerSlider: React.FC<HeroBannerSliderProps> = ({
  gender,
  onOpenQuiz,
  onExplorePlans,
}) => {
  const isFemale = gender === 'feminino';
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const maleSlides: SlideData[] = [
    {
      id: 'male-1',
      badge: '★ TRATAMENTO AVANÇADO DA CALVÍCIE • 450MG',
      titlePart1: 'REVERTA A',
      titleHighlight: 'Calvície',
      titlePart2: 'COM PRECISÃO FARMACÊUTICA.',
      tagline: 'Fórmula Oral Concentrada com Dutasterida + Minoxidil Micronizado',
      subtitle:
        'Tratamento em dose única diária que atua direto na raiz, bloqueando 98.4% do DHT e estimulando o nascimento de fios grossos e resistentes.',
      bulletPill: 'Restauração Folicular',
      stats: [
        { label: 'Bloqueio do DHT', value: '98.4%', icon: 'shield' },
        { label: 'Pacientes Atendidos', value: '+5.400', icon: 'star' },
        { label: 'Eficácia Clínica', value: '45 Dias', icon: 'zap' },
      ],
      imageDesktop:
        'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=2560&q=90',
      imagePosition: 'center 22%',
      imageAlt: 'Modelo masculino atraente com cabelo volumoso, textura saudável e linha capilar perfeita',
    },
    {
      id: 'male-2',
      badge: 'EFICÁCIA COMPROVADA EM ENTRADAS E COROA',
      titlePart1: 'PREENCHIMENTO',
      titleHighlight: 'Visível',
      titlePart2: 'DAS ENTRADAS E TOPO.',
      tagline: 'Sem Oleosidade Tópica. 1 Cápsula Pela Manhã.',
      subtitle:
        'Diga adeus a loções pegajosas e rotinas cansativas. A absorção celular micronizada garante biodisponibilidade 300% superior diretamente nos folículos.',
      bulletPill: 'Preenchimento de Entradas',
      stats: [
        { label: 'Oleosidade Tópica', value: '0%', icon: 'shield' },
        { label: 'Absorção Celular', value: '3x Mais', icon: 'zap' },
        { label: 'Garantia Clínica', value: '90 Dias', icon: 'award' },
      ],
      imageDesktop:
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=2560&q=90',
      imagePosition: 'center 15%',
      imageAlt: 'Homem com entradas preenchidas e linha capilar perfeitamente alinhada',
    },
    {
      id: 'male-3',
      badge: 'PADRÃO OURO DE MANIPULAÇÃO MAGISTRAL',
      titlePart1: 'CIÊNCIA MOLECULAR',
      titleHighlight: 'Em Dose Única',
      titlePart2: 'PARA SEUS CABELOS.',
      tagline: '4 Ativos Sinergéticos em Cápsula Gastro-Resistente',
      subtitle:
        'Manipulado sob demanda estrita na dosagem exata do seu diagnóstico capilar por farmacêuticos especialistas em tricologia médica.',
      bulletPill: 'Ciência Farmacêutica',
      stats: [
        { label: 'Dose Concentrada', value: '450mg', icon: 'zap' },
        { label: 'Pureza Farmacêutica', value: '99.8%', icon: 'shield' },
        { label: 'Embalagem Discreta', value: '100%', icon: 'award' },
      ],
      imageDesktop:
        'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=2560&q=90',
      imagePosition: 'center 15%',
      imageAlt: 'Homem atraente com corte impecável, cabelos bem cuidados e densidade uniforme',
    },
  ];

  const femaleSlides: SlideData[] = [
    {
      id: 'female-1',
      badge: '★ ALTA TRICOLOGIA FEMININA • NUTRICOLIN®',
      titlePart1: 'CABELOS',
      titleHighlight: 'Volumosos,',
      titlePart2: 'DENSOS E RADIANTES.',
      tagline: 'Protocolo Exclusivo com Silício Orgânico + Minoxidil Oral',
      subtitle:
        'Combate o afinamento da risca, a queda pós-parto e o estresse telógeno, devolvendo o corpo, a densidade e o brilho natural aos seus cabelos.',
      bulletPill: 'Volume & Densidade',
      stats: [
        { label: 'Interrupção da Queda', value: '99.1%', icon: 'shield' },
        { label: 'Novos Fios Anágenos', value: '+3.800', icon: 'star' },
        { label: 'Fios Mais Grossos', value: '45 Dias', icon: 'zap' },
      ],
      imageDesktop:
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=2560&q=90',
      imagePosition: 'center 15%',
      imageAlt: 'Mulher sofisticada com cabelos volumosos, densos e brilhantes',
    },
    {
      id: 'female-2',
      badge: 'FIM DA QUEDA NO BANHO E ESCOVAÇÃO',
      titlePart1: 'PREENCHIMENTO',
      titleHighlight: 'Da Risca Central',
      titlePart2: 'E CORPO DOS FIOS.',
      tagline: 'Fios Mais Grossos, Brilhantes e Fortalecidos desde a Raiz',
      subtitle:
        'Estimula o nascimento contínuo de novos fios enquanto nutre a matriz folicular de dentro para fora com silício inteligente e biotina pura.',
      bulletPill: 'Preenchimento da Risca',
      stats: [
        { label: 'Redução na Escova', value: '-85%', icon: 'shield' },
        { label: 'Espessura do Fio', value: '+42%', icon: 'zap' },
        { label: 'Satisfação Feminina', value: '98.7%', icon: 'award' },
      ],
      imageDesktop:
        'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=2560&q=90',
      imagePosition: 'center 18%',
      imageAlt: 'Modelo feminina confiante com cabelos longos e cheios',
    },
    {
      id: 'female-3',
      badge: 'BELEZA & MEDICINA DE PRECISÃO',
      titlePart1: 'NUTRIÇÃO CELULAR',
      titleHighlight: 'Profunda',
      titlePart2: 'EM CÁPSULA 450MG.',
      tagline: 'Sem Hormônios Masculinizantes. Fórmula 100% Segura.',
      subtitle:
        'Desenvolvida especificamente para a fisiologia capilar feminina, sem causar pelos corporais e com máxima eficácia no couro cabeludo.',
      bulletPill: 'Dose Única 450mg',
      stats: [
        { label: 'Dose Oral Única', value: '450mg', icon: 'zap' },
        { label: 'Silício Orgânico', value: 'Nutricolin®', icon: 'shield' },
        { label: 'Sem Efeitos Adversos', value: '100%', icon: 'award' },
      ],
      imageDesktop:
        'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=2560&q=90',
      imagePosition: 'center 20%',
      imageAlt: 'Mulher tocando os cabelos brilhantes e sedosos com plenitude',
    },
  ];

  const slides = isFemale ? femaleSlides : maleSlides;

  // Auto-play timer
  useEffect(() => {
    if (isPaused) return;

    timerRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6500);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, slides.length]);

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const activeSlide = slides[currentSlide];

  return (
    <section
      id="inicio"
      className={`hero-section ${
        isFemale
          ? 'bg-[#0d070a] border-b border-[#E2A999]/35'
          : 'bg-[#060608] border-b border-[#d4af37]/30'
      }`}
      style={{
        width: '100%',
        minHeight: 'calc(100vh - var(--header-height, 86px))',
      }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Ambient Halo in Top Area */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-64 blur-3xl pointer-events-none z-10"
        style={{
          background: isFemale
            ? 'radial-gradient(ellipse at 50% 0%, rgba(226,169,153,0.3) 0%, rgba(212,175,55,0.18) 35%, transparent 70%)'
            : 'radial-gradient(ellipse at 50% 0%, rgba(212,175,55,0.2) 0%, transparent 70%)',
        }}
      />

      {/* Main Fullscreen Stage */}
      <div className="relative flex-1 w-full flex items-center py-6 sm:py-8 min-h-[560px] lg:min-h-[calc(100vh-var(--header-height,86px)-82px)]">
        
        {/* Full Viewport Slide Background Images (100% Width & Height, Cover, Preserves Ratio) */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${gender}-${activeSlide.id}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.65 }}
            className="absolute inset-0 w-full h-full z-0 overflow-hidden"
          >
            {/* Background Model Image */}
            <div className="relative w-full h-full">
              <img
                src={activeSlide.imageDesktop}
                alt={activeSlide.imageAlt}
                referrerPolicy="no-referrer"
                className="hero-slide-bg filter brightness-[0.82] contrast-[1.05] select-none"
                style={{
                  objectPosition: activeSlide.imagePosition || 'center 15%',
                }}
              />

              {/* Balanced Cinematic Lighting & Contrast Overlays */}
              <div
                className="absolute inset-0"
                style={{
                  background: isFemale
                    ? 'linear-gradient(to top, #0d070a 0%, rgba(13,7,10,0.45) 50%, rgba(13,7,10,0.2) 100%)'
                    : 'linear-gradient(to top, #060608 0%, rgba(6,6,8,0.4) 50%, rgba(6,6,8,0.2) 100%)',
                }}
              />
              <div
                className="absolute inset-0 lg:w-[58%]"
                style={{
                  background: isFemale
                    ? 'linear-gradient(to right, rgba(13,7,10,0.96) 0%, rgba(13,7,10,0.75) 60%, transparent 100%)'
                    : 'linear-gradient(to right, rgba(6,6,8,0.95) 0%, rgba(6,6,8,0.7) 60%, transparent 100%)',
                }}
              />
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: isFemale
                    ? 'radial-gradient(ellipse at top right, rgba(226,169,153,0.25) 0%, rgba(212,175,55,0.14) 40%, transparent 70%)'
                    : 'radial-gradient(ellipse at top right, rgba(212,175,55,0.18) 0%, transparent 65%)',
                }}
              />
              
              {/* Subtle gold / rose-gold grid texture */}
              <div
                className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{
                  backgroundImage: isFemale
                    ? 'radial-gradient(#E2A999 1px, transparent 1px)'
                    : 'radial-gradient(#d4af37 1px, transparent 1px)',
                  backgroundSize: '24px 24px',
                }}
              />
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Foreground Content Container (Constrained Width for Clean Responsive Alignment) */}
        <div className="hero-content relative z-20 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
            
            {/* Slide Text Column (Left) */}
            <motion.div
              key={`content-${activeSlide.id}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="lg:col-span-8 flex flex-col items-start text-left space-y-4 max-w-2xl"
            >
              {/* Gold Upper Badge */}
              <div
                className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full border text-[10px] sm:text-xs font-semibold uppercase tracking-widest backdrop-blur-xl shadow-lg"
                style={{
                  borderColor: isFemale ? 'rgba(226, 169, 153, 0.5)' : 'rgba(212, 175, 55, 0.6)',
                  backgroundColor: isFemale ? 'rgba(226, 169, 153, 0.15)' : 'rgba(212, 175, 55, 0.18)',
                  color: isFemale ? '#ffe5df' : '#ffea9f',
                  boxShadow: isFemale
                    ? '0 0 20px rgba(226, 169, 153, 0.25)'
                    : '0 0 25px rgba(212, 175, 55, 0.35)',
                }}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{activeSlide.badge}</span>
              </div>

              {/* Monumental Headline */}
              <h1 className="font-display font-bold text-2xl sm:text-4xl md:text-5xl lg:text-[3.2rem] tracking-tight leading-[1.1] text-white">
                {activeSlide.titlePart1}{' '}
                <span
                  className="bg-clip-text text-transparent italic font-normal inline-block"
                  style={{
                    backgroundImage: isFemale
                      ? 'linear-gradient(135deg, #FFFFFF 0%, #F5C6BA 30%, #E2A999 60%, #DFB775 100%)'
                      : 'linear-gradient(135deg, #FFFFFF 0%, #FFEAA7 25%, #F1C40F 60%, #AA771C 100%)',
                    fontFamily: 'var(--font-cormorant)',
                    textShadow: isFemale
                      ? '0 0 30px rgba(226,169,153,0.3)'
                      : '0 0 35px rgba(212,175,55,0.4)',
                  }}
                >
                  {activeSlide.titleHighlight}
                </span>{' '}
                {activeSlide.titlePart2}
              </h1>

              {/* Golden Tagline */}
              <div className="flex items-center space-x-2 text-xs sm:text-sm lg:text-base font-medium text-[#fae596] border-l-2 border-[#d4af37] pl-3">
                <Flame className="w-4 h-4 text-[#d4af37] shrink-0" />
                <span>{activeSlide.tagline}</span>
              </div>

              {/* Detailed Subtitle */}
              <p className="text-zinc-300 text-xs sm:text-sm lg:text-base font-light leading-relaxed max-w-xl">
                {activeSlide.subtitle}
              </p>

              {/* Interactive Slide Telemetry Pill Cards */}
              <div className="grid grid-cols-3 gap-2 sm:gap-3 w-full max-w-lg py-1">
                {activeSlide.stats.map((st, i) => (
                  <div
                    key={i}
                    className="p-2 sm:p-3 rounded-xl bg-[#111116]/85 border border-zinc-800 hover:border-[#d4af37]/60 backdrop-blur-md transition-all group"
                  >
                    <p
                      className="font-display font-bold text-base sm:text-xl tracking-tight text-white group-hover:text-[#fae596] transition-colors"
                      style={{
                        backgroundImage: isFemale
                          ? 'linear-gradient(135deg, #FFF 0%, #E2A999 100%)'
                          : 'linear-gradient(135deg, #FFF 0%, #F3C853 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                      }}
                    >
                      {st.value}
                    </p>
                    <p className="text-[9px] sm:text-[10px] font-mono text-zinc-400 mt-0.5 leading-tight truncate">
                      {st.label}
                    </p>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto pt-1">
                <button
                  onClick={onOpenQuiz}
                  className="px-6 sm:px-8 py-3.5 rounded-full font-display font-bold text-xs tracking-widest uppercase transition-all duration-300 flex items-center justify-center space-x-3 shadow-2xl hover:scale-[1.03] active:scale-[0.98] gold-button-gradient"
                >
                  <Sparkles className="w-4 h-4 text-black" />
                  <span className="text-black font-extrabold">Iniciar Diagnóstico Capilar</span>
                  <ArrowRight className="w-4 h-4 text-black" />
                </button>

                <button
                  onClick={onExplorePlans}
                  className="px-6 sm:px-7 py-3.5 rounded-full font-display font-semibold text-xs tracking-widest uppercase text-white hover:text-[#fae596] border-2 border-[#d4af37]/60 hover:border-[#d4af37] bg-black/60 hover:bg-[#15130b] backdrop-blur-md transition-all flex items-center justify-center space-x-2 shadow-lg"
                >
                  <span>Ver Fórmulas & Valores</span>
                </button>
              </div>

              {/* Trust badges footer */}
              <div className="flex flex-wrap items-center gap-4 pt-1 text-[11px] sm:text-xs text-zinc-400">
                <div className="flex items-center space-x-1.5">
                  <div className="flex text-[#D4AF37]">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="w-3 sm:w-3.5 h-3 sm:h-3.5 fill-[#D4AF37]" />
                    ))}
                  </div>
                  <span className="font-semibold text-white">4.9/5.0</span>
                  <span className="text-zinc-500 font-mono hidden sm:inline">(Comprovação Clínica)</span>
                </div>
                <div className="flex items-center space-x-1.5 font-mono text-[10px] sm:text-[11px] text-zinc-300">
                  <Shield className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Farmácia Magistral CRF/SP 49.201</span>
                </div>
              </div>
            </motion.div>

            {/* Right Slide Selector Floating Card (Desktop) */}
            <div className="hidden lg:col-span-4 lg:flex flex-col space-y-3 pl-2">
              <div
                className={`p-4 sm:p-5 rounded-3xl backdrop-blur-2xl shadow-2xl space-y-3.5 ${
                  isFemale
                    ? 'bg-[#140b11]/90 border border-[#E2A999]/35'
                    : 'bg-[#0e0e13]/90 border border-[#d4af37]/35'
                }`}
              >
                <div className="flex items-center justify-between pb-2.5 border-b border-zinc-800/80 font-mono">
                  <span
                    className="font-bold flex items-center gap-2 text-sm sm:text-base"
                    style={{ color: isFemale ? '#F5CEBE' : '#fae596' }}
                  >
                    <Activity className="w-4 h-4" style={{ color: isFemale ? '#E2A999' : '#d4af37' }} />
                    Tratamento Ativo
                  </span>
                  <span className="text-zinc-300 font-semibold text-xs sm:text-sm">
                    0{currentSlide + 1} / 0{slides.length}
                  </span>
                </div>

                {slides.map((s, idx) => {
                  const isActive = currentSlide === idx;
                  return (
                    <button
                      key={s.id}
                      onClick={() => setCurrentSlide(idx)}
                      className={`w-full text-left p-3 rounded-2xl border transition-all flex items-center space-x-3.5 cursor-pointer ${
                        isActive
                          ? isFemale
                            ? 'bg-[#25141c] border-[#E2A999] shadow-[0_0_20px_rgba(226,169,153,0.25)]'
                            : 'bg-[#1e1b12] border-[#d4af37] shadow-[0_0_20px_rgba(212,175,55,0.25)]'
                          : 'bg-zinc-900/50 border-zinc-800/80 hover:border-zinc-700 text-zinc-300 hover:bg-zinc-900/80'
                      }`}
                    >
                      <div
                        className="w-12 h-12 rounded-xl overflow-hidden shrink-0 border border-zinc-700/80 relative shadow-inner"
                      >
                        <img
                          src={s.imageDesktop}
                          alt={s.bulletPill}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                          style={{
                            objectPosition: s.imagePosition || 'center 15%',
                          }}
                        />
                        {isActive && (
                          <div
                            className="absolute inset-0 flex items-center justify-center"
                            style={{
                              backgroundColor: isFemale ? 'rgba(226,169,153,0.2)' : 'rgba(212,175,55,0.2)',
                            }}
                          >
                            <span
                              className="w-2.5 h-2.5 rounded-full animate-ping"
                              style={{
                                backgroundColor: isFemale ? '#E2A999' : '#d4af37',
                              }}
                            />
                          </div>
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <p
                          className={`text-sm sm:text-base font-bold font-display tracking-tight truncate ${
                            isActive ? 'text-white' : 'text-zinc-200'
                          }`}
                        >
                          {s.bulletPill}
                        </p>
                        <p
                          className="text-xs sm:text-sm font-mono truncate font-medium mt-0.5"
                          style={{ color: isFemale ? '#F5CEBE' : '#fae596' }}
                        >
                          {s.stats[0].value} {s.stats[0].label}
                        </p>
                      </div>

                      <div className="text-sm font-mono font-bold text-zinc-400 shrink-0">
                        0{idx + 1}
                      </div>
                    </button>
                  );
                })}

                {/* Progress bar */}
                <div className="w-full h-1.5 bg-zinc-800/80 rounded-full overflow-hidden mt-1.5">
                  <motion.div
                    key={currentSlide}
                    initial={{ width: '0%' }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 6.5, ease: 'linear' }}
                    className="h-full"
                    style={{
                      background: isFemale
                        ? 'linear-gradient(to right, #E2A999, #F5CEBE)'
                        : 'linear-gradient(to right, #d4af37, #fae596)',
                    }}
                  />
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Carousel Arrow Controls */}
        <button
          onClick={handlePrev}
          aria-label="Slide anterior"
          className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-black/60 hover:bg-black/90 border border-[#d4af37]/40 hover:border-[#d4af37] text-zinc-300 hover:text-white flex items-center justify-center backdrop-blur-xl shadow-xl transition-all hover:scale-105 active:scale-95"
        >
          <ChevronLeft className="w-5 sm:w-6 h-5 sm:h-6 text-[#fae596]" />
        </button>

        <button
          onClick={handleNext}
          aria-label="Próximo slide"
          className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-black/60 hover:bg-black/90 border border-[#d4af37]/40 hover:border-[#d4af37] text-zinc-300 hover:text-white flex items-center justify-center backdrop-blur-xl shadow-xl transition-all hover:scale-105 active:scale-95"
        >
          <ChevronRight className="w-5 sm:w-6 h-5 sm:h-6 text-[#fae596]" />
        </button>

        {/* Bottom Pagination Dots */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-30 flex items-center space-x-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              aria-label={`Ir para slide ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                currentSlide === i
                  ? 'w-7 bg-gradient-to-r from-[#d4af37] to-[#fae596] shadow-[0_0_10px_#d4af37]'
                  : 'w-1.5 bg-zinc-700 hover:bg-zinc-500'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Gold Quick Stats Strip (100% width background, perfectly aligned inner content) */}
      <div className="relative z-20 w-full bg-[#0a0a0e]/95 border-t border-[#d4af37]/35 py-3 sm:py-3.5">
        <div className="hero-content grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-4">
          
          <div className="flex items-center space-x-2.5 p-2 sm:p-2.5 rounded-xl bg-[#121217] border border-[#d4af37]/20 shadow-md">
            <div className="w-8 h-8 rounded-lg bg-[#d4af37]/15 border border-[#d4af37]/40 flex items-center justify-center text-[#fae596] shrink-0">
              <Shield className="w-4 h-4 text-[#fae596]" />
            </div>
            <div className="min-w-0">
              <p className="font-display font-extrabold text-sm sm:text-base text-white">
                98.4%
              </p>
              <p className="text-[10px] sm:text-[11px] font-mono text-zinc-400 truncate">
                Interrupção da Queda
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2.5 p-2 sm:p-2.5 rounded-xl bg-[#121217] border border-[#d4af37]/20 shadow-md">
            <div className="w-8 h-8 rounded-lg bg-[#d4af37]/15 border border-[#d4af37]/40 flex items-center justify-center text-[#fae596] shrink-0">
              <Zap className="w-4 h-4 text-[#fae596]" />
            </div>
            <div className="min-w-0">
              <p className="font-display font-extrabold text-sm sm:text-base text-white">
                450mg
              </p>
              <p className="text-[10px] sm:text-[11px] font-mono text-zinc-400 truncate">
                Dose Única Diária
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2.5 p-2 sm:p-2.5 rounded-xl bg-[#121217] border border-[#d4af37]/20 shadow-md">
            <div className="w-8 h-8 rounded-lg bg-[#d4af37]/15 border border-[#d4af37]/40 flex items-center justify-center text-[#fae596] shrink-0">
              <Star className="w-4 h-4 text-[#fae596]" />
            </div>
            <div className="min-w-0">
              <p className="font-display font-extrabold text-sm sm:text-base text-white">
                +5.400
              </p>
              <p className="text-[10px] sm:text-[11px] font-mono text-zinc-400 truncate">
                Cabelos Revigorados
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2.5 p-2 sm:p-2.5 rounded-xl bg-[#121217] border border-[#d4af37]/20 shadow-md">
            <div className="w-8 h-8 rounded-lg bg-[#d4af37]/15 border border-[#d4af37]/40 flex items-center justify-center text-[#fae596] shrink-0">
              <Award className="w-4 h-4 text-[#fae596]" />
            </div>
            <div className="min-w-0">
              <p className="font-display font-extrabold text-sm sm:text-base text-white">
                90 Dias
              </p>
              <p className="text-[10px] sm:text-[11px] font-mono text-zinc-400 truncate">
                Garantia Incondicional
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
