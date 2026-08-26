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
    sm: 'h-64 sm:h-72',
    md: 'h-80 sm:h-96',
    lg: 'h-96 sm:h-[420px]',
  };

  return (
    <div
      className={`relative w-full ${containerHeights[size]} flex items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-b from-[#181824] via-[#0e0e14] to-[#07070a] border border-zinc-800/90 group-hover:border-[#d4af37]/70 transition-all duration-500 shadow-2xl ${className}`}
    >
      {/* Soft Luxury Golden Halo in Background */}
      <div
        className="absolute w-60 sm:w-80 h-60 sm:h-80 rounded-full blur-3xl opacity-30 group-hover:opacity-50 transition-opacity duration-700 pointer-events-none"
        style={{
          backgroundColor: goldPrimary,
        }}
      />

      {/* Subtle Ambient Radial Highlight */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(212,175,55,0.15)_0%,_transparent_75%)] pointer-events-none" />

      {/* Real Product Image Container with Full Framing & Elegant Padding */}
      {!hasAllErrors ? (
        <div className="relative z-10 w-full h-full flex flex-col items-center justify-center p-4 sm:p-6 overflow-hidden">
          <img
            src={currentSrc}
            alt={alt}
            referrerPolicy="no-referrer"
            onLoad={() => setImageLoaded(true)}
            onError={handleImageError}
            className={`w-auto h-auto max-w-full max-h-full object-contain filter drop-shadow-[0_20px_35px_rgba(0,0,0,0.95)] transition-transform duration-500 group-hover:scale-105 select-none ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          />

          {/* Loading Skeleton */}
          {!imageLoaded && (
            <div className="absolute inset-0 flex items-center justify-center p-6">
              <div className="w-48 h-64 rounded-2xl bg-[#1a1a24]/60 border border-[#d4af37]/20 animate-pulse flex flex-col items-center justify-center">
                <span className="text-[#fae596] font-display text-base font-bold tracking-wider">
                  RENOVA FIO
                </span>
                <span className="text-zinc-500 text-xs mt-1 font-mono">450mg Manipulado</span>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Clean Vector Stand-in (Fallback if image URL cannot be fetched) */
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
