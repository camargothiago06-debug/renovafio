import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { GenderMode, TabType } from '../types';
import { RenovaLogo } from './RenovaLogo';
import { ShoppingBag, Sparkles, Menu, MessageSquare, Shield, Check } from 'lucide-react';

interface HeaderProps {
  gender: GenderMode;
  onSelectGender: (gender: GenderMode) => void;
  onOpenMenu: () => void;
  onOpenQuiz: () => void;
  onOpenCart: () => void;
  cartCount: number;
  onGoHome?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  gender,
  onSelectGender,
  onOpenMenu,
  onOpenQuiz,
  onOpenCart,
  cartCount,
  onGoHome,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const isFemale = gender === 'feminino';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const goldPrimary = isFemale ? '#E2A999' : '#D4AF37';

  return (
    <header className="fixed top-0 left-0 right-0 w-full z-40 transition-all duration-300">
      {/* Top micro announcement bar (100% width) */}
      <div
        className={`w-full py-1.5 px-4 text-center text-[10px] sm:text-xs font-light tracking-wider transition-colors duration-500 flex items-center justify-center space-x-2 sm:space-x-3 ${
          isFemale
            ? 'bg-[#1b1216] text-[#ffdcd3] border-b border-[#E2A999]/20'
            : 'bg-[#12100a] text-[#fae596] border-b border-[#D4AF37]/20'
        }`}
      >
        <span className="inline-flex items-center gap-1 font-medium">
          <Shield className="w-3 h-3 text-emerald-400" />
          Fórmula Manipulada 450mg de Alta Precisão
        </span>
        <span className="hidden sm:inline opacity-40">•</span>
        <span className="hidden sm:inline">Frete VIP Grátis a partir de 3 Meses</span>
        <span className="hidden md:inline opacity-40">•</span>
        <span className="hidden md:inline">Garantia Clínica de 90 Dias</span>
      </div>

      {/* Main Navigation Bar (100% width with centered responsive inner content) */}
      <div
        className={`w-full transition-all duration-500 border-b backdrop-blur-xl ${
          scrolled
            ? isFemale
              ? 'bg-[#120c10]/95 border-[#E2A999]/40 shadow-[0_4px_30px_rgba(226,169,153,0.15)] py-2.5'
              : 'bg-[#0b0b0e]/95 border-[#D4AF37]/40 shadow-[0_4px_35px_rgba(212,175,55,0.2)] py-2.5'
            : isFemale
            ? 'bg-[#111114]/70 border-[#E2A999]/25 py-3 sm:py-3.5'
            : 'bg-[#111114]/70 border-[#D4AF37]/30 py-3 sm:py-3.5'
        }`}
      >
        <div className="hero-content flex items-center justify-between">
          {/* Brand Logo */}
          <button
            onClick={() => {
              if (onGoHome) onGoHome();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center shrink-0 cursor-pointer bg-transparent border-0 p-0"
            aria-label="Página inicial"
          >
            <RenovaLogo gender={gender} size="sm" showSubtitle={false} />
          </button>

          {/* Central Floating Gender Switcher Pill */}
          <div
            className="flex items-center p-1 rounded-full border relative backdrop-blur-md"
            style={{
              backgroundColor: isFemale ? 'rgba(28, 18, 24, 0.9)' : 'rgba(20, 18, 14, 0.9)',
              borderColor: isFemale ? 'rgba(226, 169, 153, 0.6)' : 'rgba(212, 175, 55, 0.7)',
              boxShadow: isFemale
                ? '0 0 20px -2px rgba(226, 169, 153, 0.3)'
                : '0 0 25px -2px rgba(212, 175, 55, 0.4)',
            }}
          >
            {/* Masculino Tab */}
            <button
              onClick={() => onSelectGender('masculino')}
              className={`relative z-10 px-3 sm:px-4 py-1.5 rounded-full text-[11px] sm:text-xs font-semibold uppercase tracking-wider transition-all duration-300 flex items-center gap-1.5 ${
                !isFemale
                  ? 'text-black font-bold'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              {!isFemale && (
                <motion.div
                  layoutId="genderBubble"
                  className="absolute inset-0 rounded-full shadow-lg"
                  style={{
                    background: 'linear-gradient(135deg, #FFF0D0 0%, #D4AF37 50%, #AA771C 100%)',
                  }}
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-1">
                <span className="text-xs">♂</span>
                <span>Masculino</span>
              </span>
            </button>

            {/* Feminino Tab */}
            <button
              onClick={() => onSelectGender('feminino')}
              className={`relative z-10 px-3 sm:px-4 py-1.5 rounded-full text-[11px] sm:text-xs font-semibold uppercase tracking-wider transition-all duration-300 flex items-center gap-1.5 ${
                isFemale
                  ? 'text-black font-bold'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              {isFemale && (
                <motion.div
                  layoutId="genderBubble"
                  className="absolute inset-0 rounded-full shadow-lg"
                  style={{
                    background: 'linear-gradient(135deg, #FFF2F0 0%, #E2A999 50%, #DFB775 100%)',
                  }}
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-1">
                <span className="text-xs">♀</span>
                <span>Feminino</span>
              </span>
            </button>
          </div>

          {/* Right Navigation Controls */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Direct Diagnostic CTA (Desktop) */}
            <button
              onClick={onOpenQuiz}
              className="hidden md:inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium uppercase tracking-wider transition-all border shadow-sm"
              style={{
                borderColor: isFemale ? 'rgba(226, 169, 153, 0.5)' : 'rgba(212, 175, 55, 0.5)',
                backgroundColor: isFemale ? 'rgba(226, 169, 153, 0.15)' : 'rgba(212, 175, 55, 0.15)',
                color: isFemale ? '#ffdcd3' : '#fae596',
              }}
            >
              <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
              <span>Diagnóstico</span>
            </button>

            {/* Cart Icon */}
            <button
              onClick={onOpenCart}
              className="relative p-2 rounded-full text-zinc-300 hover:text-white hover:bg-zinc-800/60 transition-colors"
              aria-label="Abrir carrinho"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span
                  className="absolute -top-1 -right-1 w-4 h-4 rounded-full text-[10px] font-bold text-black flex items-center justify-center shadow-md"
                  style={{ backgroundColor: goldPrimary }}
                >
                  {cartCount}
                </span>
              )}
            </button>

            {/* Minimalist Hamburger Menu */}
            <button
              onClick={onOpenMenu}
              className="p-2 rounded-full text-zinc-300 hover:text-white hover:bg-zinc-800/60 transition-colors flex items-center justify-center"
              aria-label="Abrir navegação"
            >
              <div className="w-5 flex flex-col items-end justify-center gap-1.5">
                <span className="w-5 h-[1.5px] bg-zinc-200"></span>
                <span
                  className="w-3.5 h-[1.5px] transition-all"
                  style={{ backgroundColor: goldPrimary }}
                ></span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
