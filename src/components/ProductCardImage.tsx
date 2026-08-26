import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { GenderMode } from '../types';

interface ProductCardImageProps {
  gender: GenderMode;
  imageUrl?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  alt?: string;
}

const MALE_IMAGE_PATHS = [
  '/images/produto-formula-capilar.png.png',
  '/images/produto-formula-capilar.png',
  '/produto-formula-capilar.png.png',
  '/produto-formula-capilar.png',
];

const FEMALE_IMAGE_PATHS = [
  '/images/frasco-feminino-renova-fio.svg',
  '/images/frasco-feminino-renova-fio.png.png',
  '/images/frasco-feminino-renova-fio.png',
  '/frasco-feminino-renova-fio.svg',
  '/frasco-feminino-renova-fio.png.png',
  '/frasco-feminino-renova-fio.png',
];

export const ProductCardImage: React.FC<ProductCardImageProps> = ({
  gender,
  imageUrl,
  className = '',
  size = 'md',
  alt = 'Fórmula Capilar Renova Fio 450mg',
}) => {
  const [pathIndex, setPathIndex] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [hasAllErrors, setHasAllErrors] = useState(false);

  const isFemale = gender === 'feminino';
  const defaultList = isFemale ? FEMALE_IMAGE_PATHS : MALE_IMAGE_PATHS;

  const candidatePaths = imageUrl
    ? [imageUrl, ...defaultList.filter((p) => p !== imageUrl)]
    : defaultList;

  // Reset error & loading states when gender or image url changes
  useEffect(() => {
    setPathIndex(0);
    setImageLoaded(false);
    setHasAllErrors(false);
  }, [gender, imageUrl]);

  const goldPrimary = isFemale ? '#E2A999' : '#D4AF37';
  const goldSecondary = isFemale ? '#D9AB6D' : '#AA771C';
  const goldLight = isFemale ? '#FFF2F0' : '#FFF0D0';

  const currentSrc = candidatePaths[pathIndex];

  const handleImageError = () => {
    if (pathIndex < candidatePaths.length - 1) {
      setPathIndex((prev) => prev + 1);
    } else {
      setHasAllErrors(true);
    }
  };

  const containerHeights = {
    sm: 'h-64 sm:h-72',
    md: 'h-80 sm:h-96',
    lg: 'h-96 sm:h-[440px]',
  };

  const imageScales = {
    sm: 'scale-[1.35] sm:scale-[1.40]',
    md: 'scale-[1.42] sm:scale-[1.48]',
    lg: 'scale-[1.46] sm:scale-[1.52]',
  };

  return (
    <div
      className={`relative w-full ${containerHeights[size]} flex items-center justify-center overflow-hidden rounded-2xl transition-all duration-500 shadow-2xl ${
        isFemale
          ? 'bg-gradient-to-b from-[#1d1317] via-[#120b0f] to-[#070406] border border-rose-900/30 group-hover:border-[#E2A999]/60'
          : 'bg-gradient-to-b from-[#181824] via-[#0e0e14] to-[#07070a] border border-zinc-800/90 group-hover:border-[#D4AF37]/60'
      } ${className}`}
    >
      {/* 1. Deep Ambient Luxury Glow */}
      <div
        className="absolute w-80 sm:w-[420px] h-80 sm:h-[420px] rounded-full blur-3xl opacity-30 group-hover:opacity-50 transition-opacity duration-700 pointer-events-none"
        style={{
          backgroundColor: goldPrimary,
        }}
      />

      {/* 2. Concentric Fine Studio Light Rings for Architectural Depth */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
        <div
          className="w-56 h-56 rounded-full border border-dashed animate-pulse"
          style={{ borderColor: goldPrimary }}
        />
        <div
          className="absolute w-72 h-72 rounded-full border"
          style={{ borderColor: `${goldPrimary}30` }}
        />
      </div>

      {/* 3. Subtle Ambient Radial Highlight */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: isFemale
            ? 'radial-gradient(circle at 50% 45%, rgba(226,169,153,0.18) 0%, rgba(217,171,109,0.06) 45%, transparent 75%)'
            : 'radial-gradient(circle at 50% 45%, rgba(212,175,55,0.18) 0%, rgba(170,119,28,0.06) 45%, transparent 75%)',
        }}
      />

      {/* 4. Luxury Pedestal / Studio Podium Floor Light */}
      <div
        className="absolute bottom-4 sm:bottom-6 w-48 sm:w-60 h-8 rounded-full blur-md opacity-40 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse, ${goldSecondary} 0%, rgba(0,0,0,0.8) 70%, transparent 100%)`,
        }}
      />

      {/* 5. Edge Vignette for Cinematic Focus */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_transparent_55%,_rgba(0,0,0,0.65)_100%)] pointer-events-none" />

      {/* Real Product Image Container with Optimized Balanced Framing */}
      {!hasAllErrors ? (
        <div className="relative z-10 w-full h-full flex flex-col items-center justify-center p-2 sm:p-3 overflow-hidden">
          <img
            src={currentSrc}
            alt={alt}
            referrerPolicy="no-referrer"
            onLoad={() => setImageLoaded(true)}
            onError={handleImageError}
            className={`w-full h-full object-contain ${imageScales[size]} filter drop-shadow-[0_20px_35px_rgba(0,0,0,0.95)] transition-transform duration-500 group-hover:scale-[1.54] select-none ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          />

          {/* Loading Skeleton */}
          {!imageLoaded && (
            <div className="absolute inset-0 flex items-center justify-center p-6">
              <div
                className={`w-48 h-64 rounded-2xl border animate-pulse flex flex-col items-center justify-center ${
                  isFemale
                    ? 'bg-[#1a1216]/70 border-[#E2A999]/30'
                    : 'bg-[#1a1a24]/70 border-[#D4AF37]/30'
                }`}
              >
                <span
                  className="font-display text-base font-bold tracking-wider"
                  style={{ color: goldPrimary }}
                >
                  RENOVA FIO
                </span>
                <span className="text-zinc-400 text-xs mt-1 font-mono">
                  {isFemale ? 'Fórmula Capilar Feminina' : '450mg Manipulado'}
                </span>
              </div>
            </div>
          )}
        </div>
      ) : isFemale ? (
        /* Clean Vector Stand-in: Feminine White Porcelain Bottle */
        <div className="relative z-10 w-full h-full p-4 flex flex-col items-center justify-center group-hover:scale-105 transition-transform duration-500">
          <div className="relative w-40 sm:w-48 h-56 sm:h-64 rounded-2xl bg-gradient-to-b from-[#FAF8F5] via-[#FFFFFF] to-[#EAE6DF] border border-amber-300/40 shadow-2xl flex flex-col items-center justify-between p-3 overflow-hidden">
            {/* Bronze/Rose-Gold Cap */}
            <div className="w-24 h-7 rounded-t-lg bg-gradient-to-b from-[#B8860B] via-[#8C5C2A] to-[#4A2A0C] border-t border-amber-200/50 flex items-center justify-center shadow-md">
              <div className="w-full h-0.5 bg-[#FFF0D0]/50" />
            </div>

            {/* Label on White Jar */}
            <div className="w-full bg-white/90 border-y border-[#D4AF37]/40 py-2.5 px-2 rounded flex flex-col items-center text-center shadow-sm my-auto">
              <div className="flex items-center space-x-1 mb-0.5">
                <span
                  className="font-display font-bold text-xs sm:text-sm tracking-wider uppercase bg-clip-text text-transparent"
                  style={{
                    backgroundImage: `linear-gradient(135deg, ${goldLight} 0%, ${goldPrimary} 100%)`,
                  }}
                >
                  Renova
                </span>
                <span className="font-editorial italic text-xs lowercase text-[#C59B27]">fio</span>
              </div>
              <span className="text-[10px] sm:text-[11px] font-semibold text-zinc-900">Fórmula Capilar</span>
              <span className="text-[8px] sm:text-[9px] text-zinc-600">tratamento para queda capilar</span>
              <div className="w-3/4 h-[1px] bg-[#d4af37]/40 my-1" />
              <div className="flex items-center justify-between w-full px-1 text-[8px] sm:text-[9px]">
                <span className="font-mono font-bold text-[#8C5C2A]">450mg</span>
                <span className="text-zinc-500 text-[7px] sm:text-[8px] uppercase tracking-wider">
                  Manipulado
                </span>
              </div>
            </div>

            {/* Bottom Gold Stripe on White Bottle */}
            <div className="w-full h-2 bg-gradient-to-r from-[#D4AF37] via-[#FFF0D0] to-[#AA771C] rounded-sm" />
          </div>
          <div className="w-36 h-2.5 rounded-full bg-black/40 blur-md mt-1" />
        </div>
      ) : (
        /* Clean Vector Stand-in: Male Dark Amber Bottle */
        <div className="relative z-10 w-full h-full p-4 flex flex-col items-center justify-center group-hover:scale-105 transition-transform duration-500">
          <div className="relative w-40 sm:w-48 h-56 sm:h-64 rounded-2xl bg-gradient-to-b from-[#2a1408] via-[#1c0d05] to-[#0d0502] border border-amber-500/30 shadow-2xl flex flex-col items-center justify-between p-3 overflow-hidden">
            {/* Cap */}
            <div className="w-24 h-7 rounded-t-lg bg-gradient-to-b from-zinc-700 via-zinc-900 to-black border-t border-zinc-500/40 flex items-center justify-center">
              <div className="w-full h-0.5 bg-[#d4af37]/40" />
            </div>

            {/* Label */}
            <div className="w-full bg-[#111114] border-y border-[#d4af37]/50 py-2.5 px-2 rounded flex flex-col items-center text-center shadow-lg my-auto">
              <div className="flex items-center space-x-1 mb-0.5">
                <span
                  className="font-display font-bold text-xs sm:text-sm tracking-wider uppercase bg-clip-text text-transparent"
                  style={{
                    backgroundImage: `linear-gradient(135deg, ${goldLight} 0%, ${goldPrimary} 100%)`,
                  }}
                >
                  Renova
                </span>
                <span className="font-editorial italic text-xs lowercase text-[#fae596]">fio</span>
              </div>
              <span className="text-[10px] sm:text-[11px] font-semibold text-white">Fórmula Capilar</span>
              <span className="text-[8px] sm:text-[9px] text-zinc-400">tratamento para queda capilar</span>
              <div className="w-3/4 h-[1px] bg-[#d4af37]/30 my-1" />
              <div className="flex items-center justify-between w-full px-1 text-[8px] sm:text-[9px]">
                <span className="font-mono font-bold text-[#fae596]">450mg</span>
                <span className="text-zinc-400 text-[7px] sm:text-[8px] uppercase tracking-wider">
                  Manipulado
                </span>
              </div>
            </div>

            {/* Bottom Capsules */}
            <div className="flex items-center space-x-1.5 mt-0.5">
              <div className="w-8 h-3.5 rounded-full bg-gradient-to-r from-zinc-800 to-black border border-white/10 rotate-6" />
              <div className="w-8 h-3.5 rounded-full bg-gradient-to-r from-black to-zinc-800 border border-white/10 -rotate-12" />
            </div>
          </div>
          <div className="w-36 h-2.5 rounded-full bg-black/80 blur-md mt-1" />
        </div>
      )}
    </div>
  );
};
