import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GenderMode } from '../types';
import { FAQ_ITEMS } from '../data/productData';
import { HelpCircle, ChevronDown, MessageSquare } from 'lucide-react';

interface FaqSectionProps {
  gender: GenderMode;
}

export const FaqSection: React.FC<FaqSectionProps> = ({ gender }) => {
  const isFemale = gender === 'feminino';
  const faqs = FAQ_ITEMS[gender];
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const goldPrimary = isFemale ? '#E2A999' : '#D4AF37';

  const toggleIndex = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-14 sm:py-16 px-4 sm:px-6 lg:px-8 bg-transparent border-t border-zinc-800/70 relative">
      <div className="w-full max-w-4xl 2xl:max-w-5xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="text-center space-y-3.5 mb-12">
          <div
            className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full border text-xs sm:text-sm font-medium uppercase tracking-wider backdrop-blur-md"
            style={{
              borderColor: isFemale ? 'rgba(226, 169, 153, 0.3)' : 'rgba(212, 175, 55, 0.3)',
              backgroundColor: isFemale ? 'rgba(226, 169, 153, 0.08)' : 'rgba(212, 175, 55, 0.08)',
              color: isFemale ? '#ffdcd3' : '#fae596',
            }}
          >
            <HelpCircle className="w-4 h-4" />
            <span>Tire Suas Dúvidas</span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white uppercase">
            PERGUNTAS{' '}
            <span
              className="bg-clip-text text-transparent italic font-normal"
              style={{
                backgroundImage: isFemale
                  ? 'linear-gradient(135deg, #FFF2F0 0%, #E2A999 50%, #DFB775 100%)'
                  : 'linear-gradient(135deg, #FFF0D0 0%, #D4AF37 50%, #AA771C 100%)',
                fontFamily: 'var(--font-cormorant)',
              }}
            >
              Frequentes.
            </span>
          </h2>
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-[#121216] border border-zinc-800 overflow-hidden transition-colors"
              >
                <button
                  onClick={() => toggleIndex(idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 group cursor-pointer"
                >
                  <span className="font-display font-semibold text-base sm:text-lg text-zinc-100 group-hover:text-[#fae596] transition-colors">
                    {faq.q}
                  </span>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="shrink-0 text-zinc-400 group-hover:text-white"
                  >
                    <ChevronDown className="w-5 h-5" />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="px-5 sm:px-6 pb-6 text-sm sm:text-base text-zinc-300 leading-relaxed border-t border-zinc-800/60 pt-4 font-light"
                    >
                      {faq.a}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
