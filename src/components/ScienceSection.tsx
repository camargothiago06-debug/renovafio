import React, { useState } from 'react';
import { motion } from 'motion/react';
import { GenderMode, Ingredient } from '../types';
import { MALE_INGREDIENTS, FEMALE_INGREDIENTS } from '../data/productData';
import { Sparkles, Activity, Dna, ShieldCheck, Microscope, ArrowRight, Check } from 'lucide-react';

interface ScienceSectionProps {
  gender: GenderMode;
}

export const ScienceSection: React.FC<ScienceSectionProps> = ({ gender }) => {
  const isFemale = gender === 'feminino';
  const ingredients = isFemale ? FEMALE_INGREDIENTS : MALE_INGREDIENTS;
  const [selectedIngredient, setSelectedIngredient] = useState<Ingredient>(ingredients[0]);
  const [activeCycle, setActiveCycle] = useState<'anagena' | 'catagena' | 'telogena'>('anagena');

  const goldPrimary = isFemale ? '#E2A999' : '#D4AF37';
  const goldSecondary = isFemale ? '#DFB775' : '#AA771C';

  return (
    <section id="ciencia" className="py-24 px-4 sm:px-6 lg:px-8 bg-transparent border-t border-zinc-800/70 relative">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header (Replicating Foto 4 Layout) */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-6">
          <div className="space-y-4">
            {/* Pill Tag */}
            <div className="inline-flex items-center space-x-2 px-4 py-1 rounded-full border border-[#d4af37]/40 bg-[#16130b] text-xs font-mono tracking-widest uppercase text-[#fae596] shadow-[0_0_15px_rgba(212,175,55,0.2)]">
              <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
              <span>Composição Farmacêutica 450mg</span>
            </div>

            {/* Display Headline */}
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white uppercase">
              A CIÊNCIA <br />
              POR TRÁS DOS{' '}
              <span
                className="bg-clip-text text-transparent font-extrabold"
                style={{
                  backgroundImage: isFemale
                    ? 'linear-gradient(135deg, #FFFFFF 0%, #F5C6BA 30%, #E2A999 60%, #DFB775 100%)'
                    : 'linear-gradient(135deg, #FFFFFF 0%, #FFEAA7 30%, #F1C40F 60%, #B7870A 100%)',
                  textShadow: '0 0 30px rgba(212,175,55,0.3)',
                }}
              >
                RESULTADOS.
              </span>
            </h2>
          </div>

          <p className="text-zinc-300 font-mono text-sm sm:text-base max-w-md leading-relaxed border-l-2 border-[#d4af37]/60 pl-4">
            Quatro ativos selecionados e dosados com precisão clínica. Um único comprimido diário. Sem complicações.
          </p>
        </div>

        {/* 4 Precision Active Ingredient Cards (Directly matching Foto 4 architecture) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {ingredients.map((ing) => {
            const isSelected = selectedIngredient.id === ing.id;
            return (
              <motion.div
                key={ing.id}
                whileHover={{ y: -6 }}
                onClick={() => setSelectedIngredient(ing)}
                className={`cursor-pointer rounded-2xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 relative overflow-hidden border ${
                  isSelected
                    ? isFemale
                      ? 'bg-[#1e151b] border-[#E2A999] shadow-2xl shadow-[#E2A999]/20'
                      : 'bg-[#1a1710] border-[#d4af37] shadow-2xl shadow-[#d4af37]/25'
                    : 'bg-[#121216] border-zinc-800/90 hover:border-[#d4af37]/50 hover:bg-[#16161b]'
                }`}
                style={{ minHeight: '290px' }}
              >
                {/* Code index [01], [02], etc. */}
                <div className="flex items-center justify-between font-mono text-xs mb-6">
                  <span className="text-[#fae596] font-bold text-sm">[{ing.code}]</span>
                  <span
                    className="text-[11px] font-bold px-2.5 py-1 rounded-full border"
                    style={{
                      borderColor: isSelected ? goldPrimary : 'rgba(212,175,55,0.3)',
                      backgroundColor: isSelected ? 'rgba(212,175,55,0.15)' : 'transparent',
                      color: isSelected ? goldPrimary : '#fae596',
                    }}
                  >
                    {ing.dosage}
                  </span>
                </div>

                {/* Title and Short Description */}
                <div className="space-y-3">
                  <h3 className="font-mono text-lg sm:text-xl font-bold text-white tracking-tight">
                    {ing.name}
                  </h3>
                  <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed font-light">
                    {ing.description}
                  </p>
                </div>

                {/* Bottom Clinical Stat Pill */}
                <div className="mt-6 pt-4 border-t border-zinc-800 flex items-center justify-between text-[11px] font-mono">
                  <span className="text-zinc-400">Ação Principal:</span>
                  <span
                    className="font-bold text-right"
                    style={{ color: goldPrimary }}
                  >
                    {ing.clinicalStat}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Deep Dive Mechanism & Follicle Cycle Visualizer */}
        <div className="rounded-2xl bg-[#131317] border border-zinc-800 p-6 sm:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left: Selected Active Detailed Mechanism */}
            <div className="lg:col-span-6 space-y-4">
              <div className="flex items-center space-x-2 text-xs font-mono text-zinc-400">
                <Microscope className="w-4 h-4" style={{ color: goldPrimary }} />
                <span>Mecanismo Biológico • {selectedIngredient.name} ({selectedIngredient.dosage})</span>
              </div>

              <h4 className="font-display text-xl sm:text-2xl font-bold text-white">
                {selectedIngredient.benefit}
              </h4>

              <p className="text-zinc-300 text-sm leading-relaxed">
                {selectedIngredient.mechanism}
              </p>

              <div className="p-4 rounded-xl bg-black/40 border border-zinc-800 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Dna className="w-5 h-5" style={{ color: goldPrimary }} />
                  <span className="text-xs text-zinc-300 font-medium">Biodisponibilidade Celular</span>
                </div>
                <span className="text-xs font-mono font-bold text-emerald-400">99.2% Absorção Gastro-resistente</span>
              </div>
            </div>

            {/* Right: Follicular Cycle Control */}
            <div className="lg:col-span-6 bg-black/30 rounded-xl p-6 border border-zinc-800/80 space-y-4">
              <div className="flex items-center justify-between">
                <h5 className="font-display text-sm font-semibold text-white tracking-wide">
                  O Ciclo Folicular Reativado
                </h5>
                <span className="text-[10px] font-mono text-zinc-400 uppercase">3 Fases Biológicas</span>
              </div>

              {/* Cycle Tabs */}
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => setActiveCycle('anagena')}
                  className={`py-2 px-3 rounded-lg text-xs font-mono transition-all text-center ${
                    activeCycle === 'anagena'
                      ? 'bg-zinc-800 text-white font-bold border border-emerald-500/50'
                      : 'bg-zinc-900/50 text-zinc-400 hover:text-white'
                  }`}
                >
                  1. Anágena (Crescimento)
                </button>
                <button
                  onClick={() => setActiveCycle('catagena')}
                  className={`py-2 px-3 rounded-lg text-xs font-mono transition-all text-center ${
                    activeCycle === 'catagena'
                      ? 'bg-zinc-800 text-white font-bold border border-amber-500/50'
                      : 'bg-zinc-900/50 text-zinc-400 hover:text-white'
                  }`}
                >
                  2. Catágena (Transição)
                </button>
                <button
                  onClick={() => setActiveCycle('telogena')}
                  className={`py-2 px-3 rounded-lg text-xs font-mono transition-all text-center ${
                    activeCycle === 'telogena'
                      ? 'bg-zinc-800 text-white font-bold border border-red-500/50'
                      : 'bg-zinc-900/50 text-zinc-400 hover:text-white'
                  }`}
                >
                  3. Telógena (Queda)
                </button>
              </div>

              {/* Dynamic Cycle Explanation */}
              <div className="p-4 rounded-lg bg-zinc-900/70 border border-zinc-800 text-xs leading-relaxed text-zinc-300">
                {activeCycle === 'anagena' && (
                  <p>
                    <strong className="text-emerald-400">Fase Anágena Prolongada:</strong> A fórmula Renova Fio força folículos dormentes a entrarem novamente em divisão celular acelerada, estendendo esta fase de 2 para até 6 anos contínuos de crescimento espesso.
                  </p>
                )}
                {activeCycle === 'catagena' && (
                  <p>
                    <strong className="text-amber-400">Fase Catágena Prevenida:</strong> A miniaturização precoce é bloqueada pela inibição enzimática, impedindo que a haste enfraqueça prematuramente antes de atingir comprimento.
                  </p>
                )}
                {activeCycle === 'telogena' && (
                  <p>
                    <strong className="text-rose-400">Fase Telógena Interrompida:</strong> O desprendimento em massa (eflúvio) cessa em até 21 dias devido ao aporte vascular contínuo no bulbo dérmico.
                  </p>
                )}
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
