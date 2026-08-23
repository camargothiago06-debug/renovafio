import React, { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { GenderMode } from '../types';
import { GENDER_CONFIG } from '../data/productData';
import { ProductVisual3D } from './ProductVisual3D';
import { Sparkles, Shield, ArrowDown, Check, Star, Play, Award, Zap } from 'lucide-react';

interface HeroSectionProps {
  gender: GenderMode;
  onOpenQuiz: () => void;
  onExplorePlans: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  gender,
  onOpenQuiz,
  onExplorePlans,
}) => {
  const isFemale = gender === 'feminino';
  const config = GENDER_CONFIG[gender];
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Subtle ambient gold particles on canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const particleCount = 45;
    const particles = Array.from({ length: particleCount }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2 + 0.6,
      speedX: (Math.random() - 0.5) * 0.35,
      speedY: -Math.random() * 0.4 - 0.1,
      opacity: Math.random() * 0.6 + 0.2,
    }));

    const color = isFemale ? '226, 169, 153' : '212, 175, 55';

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;

        if (p.y < 0) {
          p.y = height;
          p.x = Math.random() * width;
        }
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color}, ${p.opacity})`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = `rgba(${color}, 0.5)`;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [gender, isFemale]);

  const goldPrimary = isFemale ? '#E2A999' : '#D4AF37';

  return (
    <section className="relative min-h-screen w-full flex flex-col justify-between pt-28 pb-12 overflow-hidden bg-[#09090b]">
      {/* Background Animated Particle Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none z-0 opacity-70"
      />

      {/* Atmospheric Ambient Light Cones */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[900px] h-[500px] rounded-full blur-[140px] opacity-15 pointer-events-none transition-colors duration-1000"
        style={{
          backgroundColor: isFemale ? '#b86b77' : '#d4af37',
        }}
      />
      <div
        className="absolute bottom-10 right-10 w-96 h-96 rounded-full blur-[160px] opacity-10 pointer-events-none transition-colors duration-1000"
        style={{
          backgroundColor: isFemale ? '#e2a999' : '#aa771c',
        }}
      />

      {/* Main Grid Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Editorial Copy & CTAs */}
          <motion.div
            key={`hero-left-${gender}`}
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="lg:col-span-7 flex flex-col items-start text-left space-y-6"
          >
            {/* Upper Badge */}
            <div
              className={`inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full border text-xs font-medium uppercase tracking-wider backdrop-blur-md ${config.badgeStyle}`}
            >
              <Sparkles className="w-3.5 h-3.5" style={{ color: goldPrimary }} />
              <span>{config.heroBadge}</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-display font-semibold text-3xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.08] text-white">
              {gender === 'masculino' ? (
                <>
                  RENOVE SUA{' '}
                  <span
                    className="bg-clip-text text-transparent italic font-normal"
                    style={{
                      backgroundImage: 'linear-gradient(135deg, #FFF0D0 0%, #D4AF37 50%, #AA771C 100%)',
                      fontFamily: 'var(--font-cormorant)',
                    }}
                  >
                    Autoestima
                  </span>{' '}
                  COM PRECISÃO CLÍNICA.
                </>
              ) : (
                <>
                  CABELOS{' '}
                  <span
                    className="bg-clip-text text-transparent italic font-normal"
                    style={{
                      backgroundImage: 'linear-gradient(135deg, #FFF2F0 0%, #E2A999 50%, #DFB775 100%)',
                      fontFamily: 'var(--font-cormorant)',
                    }}
                  >
                    Volumosos,
                  </span>{' '}
                  DENSOS E RADIANTES.
                </>
              )}
            </h1>

            {/* Subheadline */}
            <p className="text-zinc-300 text-base sm:text-lg font-light leading-relaxed max-w-2xl">
              {config.heroSubheadline}
            </p>

            {/* Key Pillars Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full py-2">
              <div className="flex items-center space-x-2 text-xs text-zinc-300 font-medium bg-zinc-900/50 p-2.5 rounded-lg border border-zinc-800/80">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Trata a queda de cabelo</span>
              </div>
              <div className="flex items-center space-x-2 text-xs text-zinc-300 font-medium bg-zinc-900/50 p-2.5 rounded-lg border border-zinc-800/80">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Renova os fios e raiz</span>
              </div>
              <div className="flex items-center space-x-2 text-xs text-zinc-300 font-medium bg-zinc-900/50 p-2.5 rounded-lg border border-zinc-800/80">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Eleva sua confiança</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto pt-2">
              <button
                onClick={onOpenQuiz}
                className="group relative px-8 py-4 rounded-full font-display font-semibold text-xs tracking-widest uppercase transition-all duration-300 flex items-center justify-center space-x-3 shadow-2xl hover:scale-[1.02] active:scale-[0.98]"
                style={{
                  background: isFemale
                    ? 'linear-gradient(135deg, #FFF2F0 0%, #E2A999 50%, #B86B77 100%)'
                    : 'linear-gradient(135deg, #FFF0D0 0%, #D4AF37 50%, #AA771C 100%)',
                  color: '#09090b',
                  boxShadow: isFemale
                    ? '0 10px 30px -5px rgba(226, 169, 153, 0.4)'
                    : '0 10px 30px -5px rgba(212, 175, 55, 0.35)',
                }}
              >
                <Sparkles className="w-4 h-4" />
                <span>Diagnóstico Capilar Sob Medida</span>
              </button>

              <button
                onClick={onExplorePlans}
                className="px-7 py-4 rounded-full font-display text-xs tracking-widest uppercase text-zinc-200 hover:text-white border border-zinc-700/80 hover:border-zinc-500 bg-zinc-900/40 hover:bg-zinc-900/80 transition-all flex items-center justify-center"
              >
                Ver Protocolos & Planos
              </button>
            </div>

            {/* Clinical Telemetry Bar */}
            <div className="flex flex-wrap items-center gap-6 pt-4 border-t border-zinc-800/60 w-full text-xs text-zinc-400">
              <div className="flex items-center space-x-1.5">
                <div className="flex text-[#D4AF37]">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-[#D4AF37]" />
                  ))}
                </div>
                <span className="font-semibold text-white">4.9/5.0</span>
                <span className="text-zinc-500">(+5.400 pacientes)</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <Shield className="w-3.5 h-3.5 text-emerald-400" />
                <span>Manipulação Homologada Anvisa</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: 3D Luxury Amber Jar Visual & Float Elements */}
          <motion.div
            key={`hero-right-${gender}`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="lg:col-span-5 flex flex-col items-center justify-center relative py-6"
          >
            {/* Interactive 3D Product Visual */}
            <ProductVisual3D gender={gender} variant="floating" />

            {/* Quick Floater Pill: Active Ingredients */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mt-6 px-5 py-2.5 rounded-2xl bg-[#121216]/90 border border-zinc-800/90 backdrop-blur-xl shadow-xl flex items-center space-x-4 max-w-sm text-left"
            >
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border"
                style={{
                  borderColor: `${goldPrimary}50`,
                  backgroundColor: `${goldPrimary}15`,
                  color: goldPrimary,
                }}
              >
                <Zap className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[11px] font-semibold text-white tracking-wide">
                  {isFemale ? 'Nutricolin® + Minoxidil + B12' : 'Dutasterida + Minoxidil + Biotina'}
                </p>
                <p className="text-[10px] text-zinc-400">
                  Dose oral única de 450mg • Absorção celular imediata
                </p>
              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>

      {/* Bottom Subtle Scroll Indicator */}
      <div className="relative z-10 w-full flex flex-col items-center justify-center pt-8">
        <a
          href="#ciencia"
          className="flex flex-col items-center text-zinc-500 hover:text-zinc-300 transition-colors group"
        >
          <span className="text-[10px] uppercase tracking-[0.3em] font-light mb-1">
            Conheça a Ciência
          </span>
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 1.8 }}
          >
            <ArrowDown className="w-4 h-4 text-zinc-400 group-hover:text-[#D4AF37]" />
          </motion.div>
        </a>
      </div>
    </section>
  );
};
