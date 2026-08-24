import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { GenderMode } from '../types';
import { Sparkles, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface ProductVisual3DProps {
  gender: GenderMode;
  variant?: 'standing' | 'floating' | 'serum' | 'minimal';
  imageUrl?: string;
  className?: string;
  interactive?: boolean;
}

const CANDIDATE_IMAGE_URLS = [
  '/images/produto-formula-capilar.png.png',
  '/images/produto-formula-capilar.png',
  '/produto-formula-capilar.png.png',
  '/produto-formula-capilar.png',
];

export const ProductVisual3D: React.FC<ProductVisual3DProps> = ({
  gender,
  variant = 'floating',
  imageUrl,
  className = '',
  interactive = true,
}) => {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [imageLoaded, setImageLoaded] = useState(false);
  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  const [hasImageError, setHasImageError] = useState(false);
  const isFemale = gender === 'feminino';

  const goldPrimary = isFemale ? '#E2A999' : '#D4AF37';
  const goldSecondary = isFemale ? '#DFB775' : '#AA771C';
  const goldLight = isFemale ? '#FFF2F0' : '#FFF0D0';

  const imageSources = imageUrl
    ? [imageUrl, ...CANDIDATE_IMAGE_URLS.filter((url) => url !== imageUrl)]
    : CANDIDATE_IMAGE_URLS;

  const currentSrc = imageSources[currentImgIndex];

  const handleImageError = () => {
    if (currentImgIndex < imageSources.length - 1) {
      setCurrentImgIndex((prev) => prev + 1);
    } else {
      setHasImageError(true);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!interactive) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setRotate({ x: -y * 14, y: x * 18 });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
  };

  return (
    <div
      className={`relative flex items-center justify-center select-none perspective-1000 ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Ambient background glow */}
      <div
        className="absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full blur-3xl opacity-25 pointer-events-none transition-colors duration-700"
        style={{
          backgroundColor: goldPrimary,
        }}
      />

      <motion.div
        animate={{
          rotateX: rotate.x,
          rotateY: rotate.y,
          y: variant === 'floating' ? [0, -10, 0] : 0,
        }}
        transition={{
          y: {
            repeat: Infinity,
            duration: 5.5,
            ease: 'easeInOut',
          },
          rotateX: { type: 'spring', stiffness: 200, damping: 20 },
          rotateY: { type: 'spring', stiffness: 200, damping: 20 },
        }}
        className="relative w-full max-w-[340px] sm:max-w-[400px] flex flex-col items-center justify-center"
      >
        {/* Floating Capsules in Air (Variant Floating) */}
        {variant === 'floating' && (
          <>
            {/* Capsule Top Left */}
            <motion.div
              animate={{
                y: [0, -18, 0],
                rotate: [-25, -35, -25],
                x: [0, -4, 0],
              }}
              transition={{ repeat: Infinity, duration: 4.2, ease: 'easeInOut' }}
              className="absolute -top-6 left-4 sm:left-6 z-20"
            >
              <div
                className="w-16 h-7 rounded-full shadow-2xl overflow-hidden flex border border-white/10"
                style={{
                  background: 'linear-gradient(135deg, #1c1c20 0%, #0a0a0c 100%)',
                  boxShadow: `0 10px 25px -5px rgba(0,0,0,0.8), 0 0 15px ${isFemale ? 'rgba(226,169,153,0.3)' : 'rgba(212,175,55,0.25)'}`,
                }}
              >
                <div className="w-1/2 h-full bg-gradient-to-r from-zinc-800 to-zinc-950 flex items-center justify-center">
                  <div className="w-full h-1 bg-white/20 blur-[1px]"></div>
                </div>
                <div
                  className="w-1/2 h-full"
                  style={{
                    background: `linear-gradient(135deg, ${goldPrimary} 0%, ${goldSecondary} 100%)`,
                  }}
                >
                  <div className="w-full h-1 bg-white/40 blur-[0.5px]"></div>
                </div>
              </div>
            </motion.div>

            {/* Capsule Middle Left */}
            <motion.div
              animate={{
                y: [0, 14, 0],
                rotate: [40, 50, 40],
                x: [0, 6, 0],
              }}
              transition={{ repeat: Infinity, duration: 4.8, ease: 'easeInOut', delay: 0.5 }}
              className="absolute top-16 -left-4 z-20"
            >
              <div
                className="w-14 h-6 rounded-full shadow-2xl overflow-hidden flex border border-white/10"
                style={{
                  background: 'linear-gradient(135deg, #18181b 0%, #000000 100%)',
                  boxShadow: '0 10px 20px -5px rgba(0,0,0,0.7)',
                }}
              >
                <div className="w-1/2 h-full bg-zinc-900 border-r border-black/40"></div>
                <div
                  className="w-1/2 h-full"
                  style={{
                    background: `linear-gradient(135deg, ${goldSecondary} 0%, #201912 100%)`,
                  }}
                ></div>
              </div>
            </motion.div>

            {/* Capsule Lower Left */}
            <motion.div
              animate={{
                y: [0, -10, 0],
                rotate: [-8, 2, -8],
              }}
              transition={{ repeat: Infinity, duration: 3.8, ease: 'easeInOut', delay: 1 }}
              className="absolute top-36 -left-6 sm:-left-8 z-20"
            >
              <div className="w-16 h-7 rounded-full shadow-2xl overflow-hidden flex border border-white/10 bg-zinc-950">
                <div className="w-1/2 h-full bg-gradient-to-r from-zinc-700 to-zinc-950"></div>
                <div
                  className="w-1/2 h-full"
                  style={{
                    background: `linear-gradient(135deg, ${goldPrimary} 0%, ${goldSecondary} 100%)`,
                  }}
                ></div>
              </div>
            </motion.div>
          </>
        )}

        {/* Real Product Image (from user upload / public/images) */}
        {!hasImageError ? (
          <div className="relative w-64 sm:w-72 h-80 sm:h-84 flex items-center justify-center">
            <img
              src={currentSrc}
              alt="Fórmula Capilar Renova Fio 450mg"
              referrerPolicy="no-referrer"
              onLoad={() => setImageLoaded(true)}
              onError={handleImageError}
              className={`max-w-full max-h-full object-contain filter drop-shadow-[0_20px_35px_rgba(0,0,0,0.85)] transition-opacity duration-500 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
            />

            {/* Subtle gloss & golden reflection on image */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-[#d4af37]/5 to-transparent pointer-events-none rounded-2xl" />

            {/* If still loading image, show the vector render underneath */}
            {!imageLoaded && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-52 h-72 rounded-3xl bg-[#201008]/80 border border-[#d4af37]/30 animate-pulse flex flex-col items-center justify-center p-4">
                  <span className="text-[#fae596] font-display text-sm font-bold">RENOVA fio</span>
                  <span className="text-zinc-400 text-[10px] mt-1">Carregando visual...</span>
                </div>
              </div>
            )}
          </div>
        ) : (
          /* Fallback High-Fidelity Photorealistic Render matching New 2.png */
          <div className="relative w-56 sm:w-64 flex flex-col items-center">
            {/* Bottle Black Brushed Cap */}
            <motion.div
              animate={{
                y: variant === 'floating' ? [-14, -20, -14] : 0,
                rotate: variant === 'floating' ? [-6, -10, -6] : 0,
                x: variant === 'floating' ? [10, 14, 10] : 0,
              }}
              transition={{ repeat: Infinity, duration: 5.5, ease: 'easeInOut' }}
              className={`w-36 h-12 rounded-t-xl rounded-b-md shadow-2xl relative z-30 border border-zinc-700/60 overflow-hidden flex flex-col justify-between ${
                variant === 'floating' ? 'cursor-pointer' : ''
              }`}
              style={{
                background: 'linear-gradient(180deg, #3f3f46 0%, #18181b 40%, #09090b 100%)',
                boxShadow: '0 12px 25px rgba(0,0,0,0.8), inset 0 1px 1px rgba(255,255,255,0.2)',
              }}
            >
              {/* Top brushed metallic rim */}
              <div className="w-full h-1.5 bg-gradient-to-r from-zinc-700 via-zinc-400 to-zinc-800 opacity-60"></div>
              {/* Vertical grip ridges */}
              <div className="flex justify-around px-2 opacity-30">
                {Array.from({ length: 14 }).map((_, i) => (
                  <div key={i} className="w-[1px] h-6 bg-white"></div>
                ))}
              </div>
              {/* Gold micro accent on cap edge */}
              <div
                className="w-full h-[2px]"
                style={{
                  background: `linear-gradient(90deg, transparent, ${goldPrimary}, transparent)`,
                }}
              ></div>
            </motion.div>

            {/* Bottle Neck Ring */}
            <div className="w-28 h-3 bg-gradient-to-r from-amber-950 via-amber-800 to-amber-950 rounded-xs border-y border-amber-700/40 relative z-20"></div>

            {/* Bottle Body - Amber Glass */}
            <div
              className="w-56 sm:w-64 h-80 rounded-3xl relative overflow-hidden shadow-2xl border border-amber-500/20 z-10 flex flex-col items-center"
              style={{
                background: isFemale
                  ? 'radial-gradient(ellipse at 30% 20%, #4a2830 0%, #201016 50%, #0a0507 100%)'
                  : 'radial-gradient(ellipse at 30% 20%, #451a03 0%, #1e0d04 50%, #0a0401 100%)',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.95), inset 0 0 40px rgba(0,0,0,0.8)',
              }}
            >
              {/* Glass Curved Specular Highlights */}
              <div className="absolute top-0 left-3 w-6 h-full bg-gradient-to-r from-white/20 via-white/5 to-transparent blur-[2px] pointer-events-none"></div>
              <div className="absolute top-0 right-4 w-3 h-full bg-gradient-to-l from-white/15 to-transparent blur-[1px] pointer-events-none"></div>

              {/* Translucent Capsule Glimpses inside Amber Glass */}
              <div className="absolute bottom-4 left-6 right-6 h-28 opacity-25 flex flex-wrap gap-2 justify-center items-end pointer-events-none">
                <div className="w-10 h-4 rounded-full bg-black rotate-12"></div>
                <div className="w-10 h-4 rounded-full bg-amber-900 -rotate-45"></div>
                <div className="w-10 h-4 rounded-full bg-black rotate-45"></div>
                <div className="w-10 h-4 rounded-full bg-amber-800 rotate-180"></div>
              </div>

              {/* The Signature Matte Black & Gold Label */}
              <div className="w-full my-auto px-2 py-1">
                <div
                  className="w-full bg-[#121214]/95 backdrop-blur-md py-4 px-3 rounded-md border-y relative shadow-lg overflow-hidden flex flex-col items-center text-center"
                  style={{
                    borderColor: isFemale ? 'rgba(226, 169, 153, 0.5)' : 'rgba(212, 175, 55, 0.5)',
                  }}
                >
                  {/* Wave Line Art Pattern Background */}
                  <svg
                    className="absolute inset-0 w-full h-full opacity-35 pointer-events-none"
                    viewBox="0 0 300 200"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M-20 60 C80 20, 200 120, 320 40 M-20 80 C90 35, 210 135, 320 60 M-20 100 C100 50, 220 150, 320 80 M-20 120 C110 65, 230 165, 320 100"
                      stroke={goldPrimary}
                      strokeWidth="0.75"
                    />
                    <path
                      d="M-20 40 C70 90, 180 10, 320 90 M-20 55 C80 105, 190 25, 320 105"
                      stroke={goldSecondary}
                      strokeWidth="0.5"
                      strokeDasharray="2 2"
                    />
                  </svg>

                  {/* Top Gold Border Accent */}
                  <div
                    className="w-full h-[1px] mb-3"
                    style={{
                      background: `linear-gradient(90deg, transparent, ${goldPrimary}, transparent)`,
                    }}
                  ></div>

                  {/* Brand Name on Label */}
                  <div className="relative z-10 flex items-center justify-center space-x-1 mb-1">
                    <span
                      className="font-display font-bold text-lg sm:text-xl tracking-wider uppercase bg-clip-text text-transparent"
                      style={{
                        backgroundImage: `linear-gradient(135deg, ${goldLight} 0%, ${goldPrimary} 50%, ${goldSecondary} 100%)`,
                      }}
                    >
                      Renova
                    </span>
                    <span
                      className="font-editorial italic font-normal text-base lowercase bg-clip-text text-transparent opacity-95"
                      style={{
                        backgroundImage: `linear-gradient(135deg, ${goldLight} 0%, ${goldPrimary} 60%, ${goldSecondary} 100%)`,
                      }}
                    >
                      fio
                    </span>
                  </div>

                  {/* Formula Capilar Title */}
                  <div className="relative z-10 text-white font-medium text-xs sm:text-sm tracking-wide mt-1">
                    {isFemale ? 'Fórmula Nutri-Capilar' : 'Fórmula Capilar'}
                  </div>
                  <div className="relative z-10 text-[10px] text-zinc-400 font-light tracking-tight mt-0.5">
                    {isFemale ? 'densidade e restauração de volume' : 'tratamento para queda capilar'}
                  </div>

                  {/* Lower Gold Divider */}
                  <div
                    className="w-3/4 h-[1px] my-2.5"
                    style={{
                      background: `linear-gradient(90deg, transparent, ${goldSecondary}, transparent)`,
                    }}
                  ></div>

                  {/* Dosage & Pharma Note */}
                  <div className="relative z-10 flex items-center justify-between w-full px-2 text-[10px]">
                    <span
                      className="font-mono font-bold tracking-wider"
                      style={{ color: goldPrimary }}
                    >
                      450mg
                    </span>
                    <span className="text-zinc-400 font-light text-[9px] uppercase tracking-widest">
                      Medicamento Manipulado
                    </span>
                  </div>
                </div>
              </div>

              {/* Bottom Glass Glow */}
              <div className="w-full h-4 bg-gradient-to-t from-black to-transparent opacity-70"></div>
            </div>
          </div>
        )}

        {/* Standing Capsules on Surface (Foreground Capsules matching New 2.png) */}
        {variant === 'standing' && (
          <div className="flex items-center justify-center gap-2.5 -mt-4 z-30">
            <motion.div
              whileHover={{ y: -3, scale: 1.05 }}
              className="w-14 h-6 rounded-full shadow-2xl overflow-hidden flex border border-white/10 bg-zinc-950 rotate-3 cursor-pointer"
            >
              <div className="w-1/2 h-full bg-gradient-to-r from-zinc-800 to-zinc-950"></div>
              <div
                className="w-1/2 h-full"
                style={{
                  background: `linear-gradient(135deg, ${goldPrimary} 0%, ${goldSecondary} 100%)`,
                }}
              ></div>
            </motion.div>
            <motion.div
              whileHover={{ y: -3, scale: 1.05 }}
              className="w-13 h-5.5 rounded-full shadow-2xl overflow-hidden flex border border-white/10 bg-zinc-950 -rotate-8 cursor-pointer"
            >
              <div className="w-1/2 h-full bg-zinc-900"></div>
              <div
                className="w-1/2 h-full"
                style={{
                  background: `linear-gradient(135deg, ${goldSecondary} 0%, #1f1610 100%)`,
                }}
              ></div>
            </motion.div>
          </div>
        )}

        {/* Floor Shadow */}
        <div
          className="w-48 sm:w-56 h-6 rounded-full blur-md opacity-75 -mt-2 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse, rgba(0,0,0,0.95) 0%, transparent 75%)',
          }}
        ></div>
      </motion.div>
    </div>
  );
};

