import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GenderMode } from '../types';
import { MessageCircle, X, Sparkles, Send, ShieldCheck } from 'lucide-react';

interface WhatsAppConciergeProps {
  gender: GenderMode;
}

export const WhatsAppConcierge: React.FC<WhatsAppConciergeProps> = ({ gender }) => {
  const [isOpen, setIsOpen] = useState(false);
  const isFemale = gender === 'feminino';
  const goldPrimary = isFemale ? '#E2A999' : '#D4AF37';

  const defaultMessage = isFemale
    ? 'Olá! Gostaria de tirar dúvidas sobre o protocolo Renova Fio Feminino 450mg e entender qual é o melhor tratamento para o meu cabelo.'
    : 'Olá! Gostaria de tirar dúvidas sobre a Fórmula Capilar Renova Fio Masculina 450mg com Dutasterida e Minoxidil oral.';

  const handleStartChat = () => {
    const encoded = encodeURIComponent(defaultMessage);
    window.open(`https://wa.me/5511999999999?text=${encoded}`, '_blank');
  };

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="mb-4 w-80 sm:w-96 rounded-3xl bg-[#121216] border border-zinc-800 p-5 shadow-2xl overflow-hidden text-left"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
              <div className="flex items-center space-x-2.5">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{
                    backgroundColor: `${goldPrimary}25`,
                    color: goldPrimary,
                  }}
                >
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-xs text-white">
                    Concierge Tricológico VIP
                  </h4>
                  <p className="text-[10px] text-emerald-400 font-mono flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    Farmacêutica Online
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="text-zinc-500 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Body */}
            <div className="py-3 text-xs text-zinc-300 space-y-2">
              <div className="p-3 rounded-xl bg-zinc-900/80 border border-zinc-800/80">
                <p>
                  Olá! Tem dúvidas sobre a dosagem de 450mg, envio ou qual protocolo escolher?
                </p>
              </div>
            </div>

            {/* CTA */}
            <button
              onClick={handleStartChat}
              className="w-full py-3 px-4 rounded-xl font-display font-semibold text-xs tracking-wider uppercase flex items-center justify-center space-x-2 shadow-lg transition-all"
              style={{
                background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
                color: '#fff',
              }}
            >
              <Send className="w-3.5 h-3.5" />
              <span>Falar no WhatsApp Agora</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Trigger floating button */}
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full shadow-2xl flex items-center justify-center border-2 border-white/20 relative group"
        style={{
          background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
          boxShadow: '0 8px 25px rgba(37, 211, 102, 0.4)',
        }}
        aria-label="Atendimento no WhatsApp"
      >
        <MessageCircle className="w-7 h-7 text-white" />
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-[#09090b]"></span>
      </motion.button>
    </div>
  );
};
