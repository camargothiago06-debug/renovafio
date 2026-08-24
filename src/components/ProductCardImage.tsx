import React, { useState } from 'react';
import { motion } from 'motion/react';
import { GenderMode } from '../types';

interface ProductCardImageProps {
  gender: GenderMode;
  imageUrl?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  alt?: string;
}

const FALLBACK_IMAGE_PATHS = [
  '/images/produto-formula-capilar.png.png',
  '/images/produto-formula-capilar.png',
  '/produto-formula-capilar.png.png',
  '/produto-formula-capilar.png',
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
  const goldPrimary = isFemale ? '#E2A999' : '#D4AF37';
  const goldLight = isFemale ? '#FFF2F0' : '#FFF0D0';

  const candidatePaths = imageUrl
    ? [imageUrl, ...FALLBACK_IMAGE_PATHS.filter((p) => p !== imageUrl)]
    : FALLBACK_IMAGE_PATHS;

  const currentSrc = candidatePaths[pathIndex];

  const handleImageError = () => {
    if (pathIndex < candidatePaths.length - 1) {
      setPathIndex((prev) => prev + 1);
    } else {
      setHasAllErrors(true);
    }
  };

  const containerHeights = {
    sm: 'h-72 sm:h-80',
    md: 'h-[440px] sm:h-[500px] md:h-[540px]',
    lg: 'h-[480px] sm:h-[540px] md:h-[580px]',
  };

  const imageMaxHeights = {
    sm: 'h-[92%]',
    md: 'h-[96%]',
    lg: 'h-[98%]',
  };

  return (
    <div
      className={`relative w-full ${containerHeights[size]} flex items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-b from-[#181824] via-[#0e0e14] to-[#07070a] border border-zinc-800/90 group-hover:border-[#d4af37]/70 transition-all duration-500 shadow-2xl ${className}`}
    >
      {/* Soft Luxury Golden Halo in Background */}
      <div
        className="absolute w-72 sm:w-96 h-72 sm:h-96 rounded-full blur-3xl opacity-30 group-hover:opacity-50 transition-opacity duration-700 pointer-events-none"
        style={{
          backgroundColor: goldPrimary,
        }}
      />

      {/* Subtle Ambient Radial Highlight */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(212,175,55,0.15)_0%,_transparent_75%)] pointer-events-none" />

      {/* Real Product Image Container */}
      {!hasAllErrors ? (
        <div className="relative z-10 w-full h-full p-2 flex flex-col items-center justify-center">
          <img
            src={currentSrc}
            alt={alt}
            referrerPolicy="no-referrer"
            onLoad={() => setImageLoaded(true)}
            onError={handleImageError}
            className={`w-full ${imageMaxHeights[size]} object-contain filter drop-shadow-[0_25px_45px_rgba(0,0,0,0.98)] transition-all duration-500 group-hover:scale-105 select-none ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          />

          {/* Loading Skeleton */}
          {!imageLoaded && (
            <div className="absolute inset-0 flex items-center justify-center p-6">
              <div className="w-60 h-80 rounded-2xl bg-[#1a1a24]/60 border border-[#d4af37]/20 animate-pulse flex flex-col items-center justify-center">
                <span className="text-[#fae596] font-display text-base font-bold tracking-wider">
                  RENOVA FIO
                </span>
                <span className="text-zinc-500 text-xs mt-1 font-mono">450mg Manipulado</span>
              </div>
            </div>
          )}

          {/* Base Floor Reflection Shadow */}
          <div className="w-52 sm:w-72 h-5 rounded-full bg-black/95 blur-md -mt-3 pointer-events-none" />
        </div>
      ) : (
        /* Clean Vector Stand-in (Fallback if image URL cannot be fetched) */
        <div className="relative z-10 w-full h-full p-4 flex flex-col items-center justify-center group-hover:scale-105 transition-transform duration-500">
          <div className="relative w-48 sm:w-52 h-64 sm:h-72 rounded-2xl bg-gradient-to-b from-[#2a1408] via-[#1c0d05] to-[#0d0502] border border-amber-500/30 shadow-2xl flex flex-col items-center justify-between p-3.5 overflow-hidden">
            {/* Cap */}
            <div className="w-28 h-8 rounded-t-lg bg-gradient-to-b from-zinc-700 via-zinc-900 to-black border-t border-zinc-500/40 flex items-center justify-center">
              <div className="w-full h-0.5 bg-[#d4af37]/40" />
            </div>

            {/* Label */}
            <div className="w-full bg-[#111114] border-y border-[#d4af37]/50 py-3 px-2 rounded flex flex-col items-center text-center shadow-lg my-auto">
              <div className="flex items-center space-x-1 mb-1">
                <span
                  className="font-display font-bold text-sm tracking-wider uppercase bg-clip-text text-transparent"
                  style={{
                    backgroundImage: `linear-gradient(135deg, ${goldLight} 0%, ${goldPrimary} 100%)`,
                  }}
                >
                  Renova
                </span>
                <span className="font-editorial italic text-xs lowercase text-[#fae596]">fio</span>
              </div>
              <span className="text-[11px] font-semibold text-white">Fórmula Capilar</span>
              <span className="text-[9px] text-zinc-400">tratamento para queda capilar</span>
              <div className="w-3/4 h-[1px] bg-[#d4af37]/30 my-1.5" />
              <div className="flex items-center justify-between w-full px-1 text-[9px]">
                <span className="font-mono font-bold text-[#fae596]">450mg</span>
                <span className="text-zinc-400 text-[8px] uppercase tracking-wider">
                  Manipulado
                </span>
              </div>
            </div>

            {/* Bottom Capsules */}
            <div className="flex items-center space-x-1.5 mt-1">
              <div className="w-9 h-4 rounded-full bg-gradient-to-r from-zinc-800 to-black border border-white/10 rotate-6" />
              <div className="w-9 h-4 rounded-full bg-gradient-to-r from-black to-zinc-800 border border-white/10 -rotate-12" />
            </div>
          </div>
          <div className="w-40 h-3 rounded-full bg-black/80 blur-md mt-1" />
        </div>
      )}
    </div>
  );
};
