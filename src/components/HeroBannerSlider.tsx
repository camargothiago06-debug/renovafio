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
      bulletPill: 'Restauração Follicular',
      stats: [
        { label: 'Bloqueio do DHT', value: '98.4%', icon: 'shield' },
        { label: 'Pacientes Atendidos', value: '+5.400', icon: 'star' },
        { label: 'Eficácia Clínica', value: '45 Dias', icon: 'zap' },
      ],
      imageDesktop:
        'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?auto=format&fit=crop&w=2000&q=85',
      imageAlt: 'Modelo masculino com cabelos densos e tratamento de calvície bem-sucedido',
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
        'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=2000&q=85',
      imageAlt: 'Homem com linha capilar restaurada e alta densidade de fios',
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
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=2000&q=85',
      imageAlt: 'Homem confiante sorrindo com cabelo espesso e recuperado',
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
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=2000&q=85',
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
        'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=2000&q=85',
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
        'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=2000&q=85',
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
    <div
      className="relative w-full overflow-hidden bg-[#060608] border-b border-[#d4af37]/30"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Top Golden Light Rays & Glow Layer */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-[#d4af37]/15 via-[#aa771c]/5 to-transparent blur-3xl pointer-events-none z-10" />

      {/* Main Slide Presentation Stage */}
      <div className="relative min-h-[640px] sm:min-h-[720px] lg:min-h-[820px] w-full flex items-center pt-28 pb-16">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${gender}-${activeSlide.id}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 z-0"
          >
            {/* Background Model Image with Cinematic Vignette & Gold Tint */}
            <div className="relative w-full h-full">
              <img
                src={activeSlide.imageDesktop}
                alt={activeSlide.imageAlt}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center lg:object-[center_20%] scale-105 transform animate-luxury-float filter brightness-85 contrast-110"
              />

              {/* Multi-layered Obsidian and Gold Gradient Masks */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#060608] via-[#060608]/75 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#060608] via-[#060608]/90 to-transparent lg:w-3/4" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(212,175,55,0.22),_transparent_60%)] pointer-events-none" />
              
              {/* Subtle gold grid/scanline texture */}
              <div
                className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{
                  backgroundImage: 'radial-gradient(#d4af37 1px, transparent 1px)',
                  backgroundSize: '24px 24px',
                }}
              />
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Foreground Content Container */}
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Slide Text Column (Left) */}
            <motion.div
              key={`content-${activeSlide.id}`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.15 }}
              className="lg:col-span-8 flex flex-col items-start text-left space-y-6 max-w-3xl"
            >
              {/* Gold Upper Badge */}
              <div
                className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full border text-xs font-semibold uppercase tracking-widest backdrop-blur-xl shadow-lg"
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
              <h1 className="font-display font-bold text-3xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.08] text-white">
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
              <div className="flex items-center space-x-2 text-sm sm:text-base font-medium text-[#fae596] border-l-2 border-[#d4af37] pl-3">
                <Flame className="w-4 h-4 text-[#d4af37] shrink-0" />
                <span>{activeSlide.tagline}</span>
              </div>

              {/* Detailed Subtitle */}
              <p className="text-zinc-300 text-sm sm:text-base lg:text-lg font-light leading-relaxed max-w-2xl">
                {activeSlide.subtitle}
              </p>

              {/* Interactive Slide Telemetry Pill Cards */}
              <div className="grid grid-cols-3 gap-3 w-full max-w-xl py-2">
                {activeSlide.stats.map((st, i) => (
                  <div
                    key={i}
                    className="p-3 sm:p-3.5 rounded-2xl bg-[#111116]/90 border border-zinc-800 hover:border-[#d4af37]/60 backdrop-blur-md transition-all group"
                  >
                    <p
                      className="font-display font-bold text-lg sm:text-2xl tracking-tight text-white group-hover:text-[#fae596] transition-colors"
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
                    <p className="text-[10px] sm:text-[11px] font-mono text-zinc-400 mt-0.5 leading-tight">
                      {st.label}
                    </p>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto pt-3">
                <button
                  onClick={onOpenQuiz}
                  className="px-8 py-4 sm:py-4.5 rounded-full font-display font-bold text-xs tracking-widest uppercase transition-all duration-300 flex items-center justify-center space-x-3 shadow-2xl hover:scale-[1.03] active:scale-[0.98] gold-button-gradient"
                >
                  <Sparkles className="w-4 h-4 text-black" />
                  <span className="text-black font-extrabold">Iniciar Diagnóstico Capilar</span>
                  <ArrowRight className="w-4 h-4 text-black" />
                </button>

                <button
                  onClick={onExplorePlans}
                  className="px-7 py-4 rounded-full font-display font-semibold text-xs tracking-widest uppercase text-white hover:text-[#fae596] border-2 border-[#d4af37]/60 hover:border-[#d4af37] bg-black/60 hover:bg-[#15130b] backdrop-blur-md transition-all flex items-center justify-center space-x-2 shadow-lg"
                >
                  <span>Ver Fórmulas & Valores</span>
                </button>
              </div>

              {/* Trust badges footer */}
              <div className="flex flex-wrap items-center gap-6 pt-3 text-xs text-zinc-400">
                <div className="flex items-center space-x-1.5">
                  <div className="flex text-[#D4AF37]">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-[#D4AF37]" />
                    ))}
                  </div>
                  <span className="font-semibold text-white">4.9/5.0</span>
                  <span className="text-zinc-500 font-mono">(Comprovação Clínica)</span>
                </div>
                <div className="flex items-center space-x-1.5 font-mono text-[11px] text-zinc-300">
                  <Shield className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Farmácia Magistral CRF/SP 49.201</span>
                </div>
              </div>
            </motion.div>

            {/* Right Slide Selector Floating Card (Desktop) */}
            <div className="hidden lg:col-span-4 lg:flex flex-col space-y-3 pl-6">
              <div className="p-4 rounded-3xl bg-[#0e0e13]/85 border border-[#d4af37]/30 backdrop-blur-2xl shadow-2xl space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-zinc-800 text-xs font-mono">
                  <span className="text-[#fae596] font-bold flex items-center gap-1.5">
                    <Activity className="w-3.5 h-3.5 text-[#d4af37]" />
                    Tratamento Ativo
                  </span>
                  <span className="text-zinc-400">0{currentSlide + 1} / 0{slides.length}</span>
                </div>

                {slides.map((s, idx) => {
                  const isActive = currentSlide === idx;
                  return (
                    <button
                      key={s.id}
                      onClick={() => setCurrentSlide(idx)}
                      className={`w-full text-left p-3 rounded-2xl border transition-all flex items-center space-x-3.5 ${
                        isActive
                          ? 'bg-[#1e1b12] border-[#d4af37] shadow-[0_0_15px_rgba(212,175,55,0.2)]'
                          : 'bg-zinc-900/40 border-zinc-800/80 hover:border-zinc-700 text-zinc-400'
                      }`}
                    >
                      <div
                        className="w-11 h-11 rounded-xl overflow-hidden shrink-0 border border-zinc-700 relative"
                      >
                        <img
                          src={s.imageDesktop}
                          alt={s.bulletPill}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                        {isActive && (
                          <div className="absolute inset-0 bg-[#d4af37]/20 flex items-center justify-center">
                            <span className="w-2 h-2 rounded-full bg-[#d4af37] animate-ping" />
                          </div>
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <p className={`text-xs font-bold font-display truncate ${isActive ? 'text-white' : 'text-zinc-300'}`}>
                          {s.bulletPill}
                        </p>
                        <p className="text-[10px] font-mono text-[#fae596] truncate">
                          {s.stats[0].value} {s.stats[0].label}
                        </p>
                      </div>

                      <div className="text-xs text-zinc-500 font-mono font-bold">
                        0{idx + 1}
                      </div>
                    </button>
                  );
                })}

                {/* Progress bar */}
                <div className="w-full h-1 bg-zinc-800 rounded-full overflow-hidden mt-2">
                  <motion.div
                    key={currentSlide}
                    initial={{ width: '0%' }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 6.5, ease: 'linear' }}
                    className="h-full bg-gradient-to-r from-[#d4af37] to-[#fae596]"
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
          className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-black/60 hover:bg-black/90 border border-[#d4af37]/40 hover:border-[#d4af37] text-zinc-300 hover:text-white flex items-center justify-center backdrop-blur-xl shadow-xl transition-all hover:scale-105 active:scale-95"
        >
          <ChevronLeft className="w-6 h-6 text-[#fae596]" />
        </button>

        <button
          onClick={handleNext}
          aria-label="Próximo slide"
          className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-black/60 hover:bg-black/90 border border-[#d4af37]/40 hover:border-[#d4af37] text-zinc-300 hover:text-white flex items-center justify-center backdrop-blur-xl shadow-xl transition-all hover:scale-105 active:scale-95"
        >
          <ChevronRight className="w-6 h-6 text-[#fae596]" />
        </button>

        {/* Bottom Pagination Dots */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-30 flex items-center space-x-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              aria-label={`Ir para slide ${i + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                currentSlide === i
                  ? 'w-8 bg-gradient-to-r from-[#d4af37] to-[#fae596] shadow-[0_0_10px_#d4af37]'
                  : 'w-2 bg-zinc-700 hover:bg-zinc-500'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Gold Quick Stats Strip Directly Below Slider */}
      <div className="relative z-20 w-full bg-[#0a0a0e] border-t border-[#d4af37]/40 py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          
          <div className="flex items-center space-x-3.5 p-3.5 rounded-2xl bg-[#121217] border border-[#d4af37]/20 shadow-md">
            <div className="w-10 h-10 rounded-xl bg-[#d4af37]/15 border border-[#d4af37]/40 flex items-center justify-center text-[#fae596] shrink-0">
              <Shield className="w-5 h-5 text-[#fae596]" />
            </div>
            <div>
              <p className="font-display font-extrabold text-base sm:text-lg text-white">
                98.4%
              </p>
              <p className="text-[11px] font-mono text-zinc-400">
                Interrupção da Queda
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3.5 p-3.5 rounded-2xl bg-[#121217] border border-[#d4af37]/20 shadow-md">
            <div className="w-10 h-10 rounded-xl bg-[#d4af37]/15 border border-[#d4af37]/40 flex items-center justify-center text-[#fae596] shrink-0">
              <Zap className="w-5 h-5 text-[#fae596]" />
            </div>
            <div>
              <p className="font-display font-extrabold text-base sm:text-lg text-white">
                450mg
              </p>
              <p className="text-[11px] font-mono text-zinc-400">
                Dose Única Diária
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3.5 p-3.5 rounded-2xl bg-[#121217] border border-[#d4af37]/20 shadow-md">
            <div className="w-10 h-10 rounded-xl bg-[#d4af37]/15 border border-[#d4af37]/40 flex items-center justify-center text-[#fae596] shrink-0">
              <Star className="w-5 h-5 text-[#fae596]" />
            </div>
            <div>
              <p className="font-display font-extrabold text-base sm:text-lg text-white">
                +5.400
              </p>
              <p className="text-[11px] font-mono text-zinc-400">
                Cabelos Revigorados
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3.5 p-3.5 rounded-2xl bg-[#121217] border border-[#d4af37]/20 shadow-md">
            <div className="w-10 h-10 rounded-xl bg-[#d4af37]/15 border border-[#d4af37]/40 flex items-center justify-center text-[#fae596] shrink-0">
              <Award className="w-5 h-5 text-[#fae596]" />
            </div>
            <div>
              <p className="font-display font-extrabold text-base sm:text-lg text-white">
                90 Dias
              </p>
              <p className="text-[11px] font-mono text-zinc-400">
                Garantia Incondicional
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
