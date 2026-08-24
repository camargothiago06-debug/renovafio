import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GenderMode, TabType } from '../types';
import { RenovaLogo } from './RenovaLogo';
import { X, ArrowUpRight, ShieldCheck, Sparkles, Phone, FileText, CheckCircle2 } from 'lucide-react';

interface MenuDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  gender: GenderMode;
  onSelectGender: (gender: GenderMode) => void;
  onOpenQuiz: () => void;
  onOpenCart: () => void;
  onSelectTab?: (tab: TabType) => void;
}

export const MenuDrawer: React.FC<MenuDrawerProps> = ({
  isOpen,
  onClose,
  gender,
  onSelectGender,
  onOpenQuiz,
  onOpenCart,
  onSelectTab,
}) => {
  const isFemale = gender === 'feminino';
  const goldPrimary = isFemale ? '#E2A999' : '#D4AF37';

  const menuItems: { label: string; tab: TabType; desc: string }[] = [
    { label: 'Início', tab: 'inicio', desc: 'Visão geral e apresentações clínicas' },
    { label: 'Galeria Exclusiva', tab: 'galeria', desc: 'Linha completa de cápsulas, séruns e kits' },
    { label: 'A Ciência & Fórmula', tab: 'ciencia', desc: 'Os 4 ativos farmacêuticos em dose única 450mg' },
    { label: 'Resultados Clínicos', tab: 'resultados', desc: 'Casos reais antes/depois aos 3 e 11 meses' },
    { label: 'Protocolos & Preços', tab: 'protocolos', desc: 'Planos de 1, 3 e 6 meses com garantia de 90 dias' },
    { label: 'Dúvidas Frequentes', tab: 'faq', desc: 'Como tomar, prescrição e envio discreto' },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-2xl flex justify-end"
        >
          {/* Backdrop click to close */}
          <div className="absolute inset-0" onClick={onClose} />

          {/* Drawer content */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 240 }}
            className="relative z-10 w-full max-w-lg h-full bg-[#0d0d10] border-l border-zinc-800/80 p-6 sm:p-10 flex flex-col justify-between overflow-y-auto"
            style={{
              boxShadow: '-20px 0 50px rgba(0,0,0,0.8)',
            }}
          >
            {/* Top Bar inside Drawer */}
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-zinc-800/60">
                <RenovaLogo gender={gender} size="sm" showSubtitle={false} />
                <button
                  onClick={onClose}
                  className="w-10 h-10 rounded-full border border-zinc-700/60 flex items-center justify-center text-zinc-400 hover:text-white hover:border-zinc-500 transition-colors"
                  aria-label="Fechar menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Gender selector inside drawer */}
              <div className="my-6 p-1.5 rounded-full bg-zinc-900 border border-zinc-800 flex items-center">
                <button
                  onClick={() => onSelectGender('masculino')}
                  className={`flex-1 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                    !isFemale
                      ? 'bg-[#18181b] text-[#fae596] shadow-md border border-[#D4AF37]/40'
                      : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  ♂ Masculino
                </button>
                <button
                  onClick={() => onSelectGender('feminino')}
                  className={`flex-1 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                    isFemale
                      ? 'bg-[#201518] text-[#ffdcd3] shadow-md border border-[#E2A999]/40'
                      : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  ♀ Feminino
                </button>
              </div>

              {/* Navigation Links with staggered animation */}
              <nav className="space-y-3 my-6">
                {menuItems.map((item, idx) => (
                  <motion.button
                    key={item.tab}
                    onClick={() => {
                      if (onSelectTab) onSelectTab(item.tab);
                      onClose();
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.08 + idx * 0.04 }}
                    className="w-full text-left group block p-3.5 rounded-xl hover:bg-zinc-900/60 border border-transparent hover:border-zinc-800/80 transition-all cursor-pointer"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-display text-base sm:text-lg text-zinc-100 group-hover:text-[#fae596] transition-colors">
                        {item.label}
                      </span>
                      <ArrowUpRight className="w-4 h-4 text-zinc-600 group-hover:text-[#fae596] transition-colors" />
                    </div>
                    <p className="text-xs text-zinc-400 font-light mt-0.5">
                      {item.desc}
                    </p>
                  </motion.button>
                ))}
              </nav>
            </div>

            {/* Bottom Actions */}
            <div className="pt-6 border-t border-zinc-800/60 space-y-3">
              <button
                onClick={() => {
                  onClose();
                  onOpenQuiz();
                }}
                className="w-full py-3.5 px-5 rounded-full font-display font-medium text-xs tracking-widest uppercase flex items-center justify-center space-x-2 transition-all shadow-lg"
                style={{
                  background: isFemale
                    ? 'linear-gradient(135deg, #E2A999 0%, #B86B77 100%)'
                    : 'linear-gradient(135deg, #D4AF37 0%, #AA771C 100%)',
                  color: '#000',
                }}
              >
                <Sparkles className="w-4 h-4" />
                <span>Fazer Diagnóstico Capilar</span>
              </button>

              <div className="flex items-center justify-between text-[11px] text-zinc-400 pt-2">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  Farmácia Magistral Homologada
                </span>
                <span>CRF/SP 49.201</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
