import React from 'react';
import { motion } from 'motion/react';
import { GenderMode, Plan } from '../types';
import { TREATMENT_PLANS } from '../data/productData';
import { Sparkles, Check, ShieldCheck, Truck, Clock, Gift, Star, ArrowRight } from 'lucide-react';

interface PricingSectionProps {
  gender: GenderMode;
  onSelectPlan: (plan: Plan) => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ gender, onSelectPlan }) => {
  const isFemale = gender === 'feminino';
  const plans = TREATMENT_PLANS[gender];

  const goldPrimary = isFemale ? '#E2A999' : '#D4AF37';
  const goldSecondary = isFemale ? '#DFB775' : '#AA771C';

  return (
    <section id="protocolos" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-transparent border-t border-zinc-800/70 relative">
      <div className="w-full max-w-[1536px] mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3.5 mb-12">
          <div
            className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full border text-xs sm:text-sm font-medium uppercase tracking-wider backdrop-blur-md"
            style={{
              borderColor: isFemale ? 'rgba(226, 169, 153, 0.3)' : 'rgba(212, 175, 55, 0.3)',
              backgroundColor: isFemale ? 'rgba(226, 169, 153, 0.08)' : 'rgba(212, 175, 55, 0.08)',
              color: isFemale ? '#ffdcd3' : '#fae596',
            }}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Protocolos Sob Demanda Magistral</span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white uppercase">
            ESCOLHA SEU{' '}
            <span
              className="bg-clip-text text-transparent italic font-normal"
              style={{
                backgroundImage: isFemale
                  ? 'linear-gradient(135deg, #FFF2F0 0%, #E2A999 50%, #DFB775 100%)'
                  : 'linear-gradient(135deg, #FFF0D0 0%, #D4AF37 50%, #AA771C 100%)',
                fontFamily: 'var(--font-cormorant)',
              }}
            >
              Protocolo de Tratamento.
            </span>
          </h2>

          <p className="text-zinc-300 text-base sm:text-lg font-light">
            Tratamento de precisão contínua com garantia clínica, entrega sigilosa e suporte dedicado de tricologia.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch max-w-6xl 2xl:max-w-7xl mx-auto">
          {plans.map((plan) => {
            const isHighlighted = plan.isPopular || plan.isBestValue;
            return (
              <motion.div
                key={plan.id}
                whileHover={{ y: -8 }}
                className={`rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 relative ${
                  plan.isPopular
                    ? isFemale
                      ? 'bg-[#181216] border-2 border-[#E2A999] shadow-2xl shadow-[#E2A999]/10'
                      : 'bg-[#15120a] border-2 border-[#D4AF37] shadow-2xl shadow-[#D4AF37]/10'
                    : plan.isBestValue
                    ? 'bg-[#121216] border-2 border-zinc-700 hover:border-zinc-500 shadow-xl'
                    : 'bg-[#0f0f12] border border-zinc-800 shadow-lg'
                }`}
              >
                {/* Popular or Best Value Badge */}
                {plan.isPopular && (
                  <div
                    className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full text-xs font-mono font-bold uppercase tracking-widest text-black shadow-lg whitespace-nowrap"
                    style={{
                      background: isFemale
                        ? 'linear-gradient(135deg, #FFF2F0 0%, #E2A999 100%)'
                        : 'linear-gradient(135deg, #FFF0D0 0%, #D4AF37 100%)',
                    }}
                  >
                    ★ MAIS ESCOLHIDO (RECOMENDADO)
                  </div>
                )}
                {plan.isBestValue && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full text-xs font-mono font-bold uppercase tracking-widest bg-zinc-800 text-zinc-200 border border-zinc-700 shadow-lg whitespace-nowrap">
                    MELHOR CUSTO-BENEFÍCIO
                  </div>
                )}

                <div>
                  {/* Phase Subtitle */}
                  <span className="text-xs font-mono uppercase tracking-widest text-zinc-400 font-medium">
                    {plan.phase}
                  </span>

                  {/* Plan Title */}
                  <h3 className="font-display font-bold text-2xl sm:text-3xl text-white mt-1 mb-2">
                    {plan.title}
                  </h3>

                  {/* Price Block */}
                  <div className="my-6 p-4 rounded-2xl bg-black/40 border border-zinc-800/80 space-y-1">
                    <div className="flex items-baseline space-x-2">
                      <span className="text-sm text-zinc-400 line-through font-mono">
                        R$ {plan.originalTotalPrice.toFixed(2)}
                      </span>
                      <span className="text-sm font-mono font-bold text-emerald-400">
                        {plan.discountPercentage}% OFF
                      </span>
                    </div>

                    <div className="flex items-baseline space-x-1.5">
                      <span className="text-3xl sm:text-4xl font-bold font-mono text-white">
                        R$ {plan.totalPrice.toFixed(2)}
                      </span>
                      <span className="text-xs sm:text-sm font-mono text-zinc-400">à vista</span>
                    </div>

                    <p className="text-sm font-mono text-[#fae596] pt-1 font-semibold">
                      ou até {plan.installments}
                    </p>
                  </div>

                  {/* Features List */}
                  <div className="space-y-3 pt-2">
                    <p className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-semibold">
                      O que está incluído:
                    </p>
                    {plan.features.map((feat, i) => (
                      <div key={i} className="flex items-start space-x-2.5 text-sm text-zinc-200">
                        <Check
                          className="w-4 h-4 shrink-0 mt-0.5"
                          style={{ color: goldPrimary }}
                        />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>

                  {/* Freebies Bonus */}
                  {plan.freebies.length > 0 && (
                    <div className="mt-4 p-3.5 rounded-xl bg-zinc-900/60 border border-zinc-800 space-y-1.5">
                      <p className="text-xs font-mono uppercase tracking-wider text-emerald-400 flex items-center gap-1 font-semibold">
                        <Gift className="w-4 h-4" />
                        Bônus Exclusivos Inclusos:
                      </p>
                      {plan.freebies.map((freebie, idx) => (
                        <p key={idx} className="text-sm text-zinc-200 font-medium">
                          + {freebie}
                        </p>
                      ))}
                    </div>
                  )}
                </div>

                {/* Bottom CTA Button */}
                <div className="mt-8 pt-4 border-t border-zinc-800/80 space-y-2">
                  <button
                    onClick={() => onSelectPlan(plan)}
                    className="w-full py-4 px-4 rounded-xl font-display font-bold text-sm uppercase tracking-widest flex items-center justify-center space-x-2 transition-all shadow-xl hover:scale-[1.02] active:scale-[0.98]"
                    style={{
                      background: plan.isPopular || plan.isBestValue
                        ? isFemale
                          ? 'linear-gradient(135deg, #FFF2F0 0%, #E2A999 50%, #B86B77 100%)'
                          : 'linear-gradient(135deg, #FFF0D0 0%, #D4AF37 50%, #AA771C 100%)'
                        : '#27272a',
                      color: plan.isPopular || plan.isBestValue ? '#000' : '#fff',
                    }}
                  >
                    <span>Garantir Protocolo</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <div className="flex items-center justify-center space-x-2 text-xs font-mono text-zinc-300">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Garantia Clínica de {plan.guaranteeDays} Dias</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* 90 Days Guarantee Box */}
        <div className="mt-16 max-w-4xl mx-auto p-8 rounded-3xl bg-[#121216] border border-zinc-800 flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 border"
            style={{
              borderColor: `${goldPrimary}50`,
              backgroundColor: `${goldPrimary}15`,
              color: goldPrimary,
            }}
          >
            <ShieldCheck className="w-8 h-8" />
          </div>

          <div className="space-y-1.5">
            <h4 className="font-display font-bold text-xl text-white">
              Garantia Blindada de Satisfação de até 90 Dias
            </h4>
            <p className="text-sm text-zinc-300 font-light leading-relaxed">
              Temos total convicção na eficácia biológica da fórmula Renova Fio. Se você seguir o protocolo de acordo com a posologia recomendada e não notar melhora clínica na diminuição da queda e fortalecimento capilar, nossa farmácia reembolsa 100% do seu valor pago.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
