import React from 'react';
import { motion } from 'motion/react';
import { GenderMode, TabType, Plan } from '../types';
import { HeroBannerSlider } from './HeroBannerSlider';
import { Sparkles, Package, FlaskConical, Award, ShieldCheck, ArrowRight, CheckCircle2, Shield, Microscope, ChevronRight, CalendarCheck } from 'lucide-react';

interface HomeOverviewProps {
  gender: GenderMode;
  onSelectTab: (tab: TabType) => void;
  onOpenQuiz: () => void;
  onSelectPlan: (plan: Plan) => void;
}

export const HomeOverview: React.FC<HomeOverviewProps> = ({
  gender,
  onSelectTab,
  onOpenQuiz,
}) => {
  const isFemale = gender === 'feminino';
  const goldPrimary = isFemale ? '#E2A999' : '#D4AF37';

  const sectionsOverview = [
    {
      tab: 'galeria' as TabType,
      title: 'Galeria de Fórmulas',
      tag: 'COLEÇÃO FARMACÊUTICA',
      description: 'Explore os frascos manipulados em dose única, tônicos e o Protocolo Completo com imagens em alta resolução.',
      icon: Package,
      badge: 'Visualização Real',
    },
    {
      tab: 'ciencia' as TabType,
      title: 'A Ciência 450mg',
      tag: 'ALTA BIODISPONIBILIDADE',
      description: 'Entenda como os 4 ativos farmacêuticos atuam bloqueando o DHT e reativando folículos dormentes.',
      icon: FlaskConical,
      badge: 'Bloqueio de 98.4% DHT',
    },
    {
      tab: 'resultados' as TabType,
      title: 'Resultados Clínicos',
      tag: 'CASOS REAIS COMPROVADOS',
      description: 'Compare fotos interativas de antes e depois aos 3 e 11 meses de tratamento contínuo.',
      icon: Award,
      badge: '94.8% Satisfação',
    },
    {
      tab: 'protocolos' as TabType,
      title: 'Protocolos & Preços',
      tag: 'PLANOS DE 1, 3 E 6 MESES',
      description: 'Confira os valores exclusivos, bônus de frete VIP e a garantia incondicional de 90 dias.',
      icon: ShieldCheck,
      badge: 'Garantia de 90 Dias',
    },
    {
      tab: 'jornada' as TabType,
      title: 'Minha Jornada',
      tag: 'ACOMPANHAMENTO VIP',
      description: 'Painel interativo para registrar fotos da evolução, comparar folículos e receber lembretes de aplicação.',
      icon: CalendarCheck,
      badge: 'Área do Cliente',
    },
  ];

  return (
    <div className="w-full space-y-16 pb-20">
      {/* Primary Hero Slider */}
      <HeroBannerSlider
        gender={gender}
        onOpenQuiz={onOpenQuiz}
        onExplorePlans={() => {
          onSelectTab('protocolos');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Luxury Curated Tab Navigation Matrix */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-12">
          <div
            className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full text-xs font-mono tracking-widest uppercase border"
            style={{
              borderColor: isFemale ? 'rgba(226, 169, 153, 0.4)' : 'rgba(212, 175, 55, 0.4)',
              backgroundColor: isFemale ? 'rgba(226, 169, 153, 0.08)' : 'rgba(212, 175, 55, 0.08)',
              color: isFemale ? '#ffdcd3' : '#fae596',
            }}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>NAVEGAÇÃO EXCLUSIVA RENOVA FIO</span>
          </div>
          <h2 className="font-display text-2xl sm:text-4xl text-white font-normal tracking-tight">
            Explore as <span className="italic font-light text-zinc-300">Dimensões do Tratamento</span>
          </h2>
          <p className="text-base sm:text-lg text-zinc-300 font-light max-w-2xl mx-auto">
            Selecione uma das áreas temáticas abaixo para acessar todos os detalhes científicos, produtos e casos clínicos.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {sectionsOverview.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.tab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
                onClick={() => {
                  onSelectTab(item.tab);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="group relative p-6 sm:p-7 rounded-2xl bg-[#0e0e13]/80 border border-zinc-800/80 hover:border-zinc-700 transition-all duration-300 flex flex-col justify-between cursor-pointer hover:shadow-2xl hover:-translate-y-1"
                style={{
                  boxShadow: '0 10px 30px -10px rgba(0,0,0,0.5)',
                }}
              >
                {/* Glow on hover */}
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity pointer-events-none"
                  style={{ backgroundColor: goldPrimary }}
                />

                <div className="space-y-4">
                  {/* Top Bar */}
                  <div className="flex items-center justify-between">
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center border"
                      style={{
                        borderColor: isFemale ? 'rgba(226, 169, 153, 0.3)' : 'rgba(212, 175, 55, 0.3)',
                        backgroundColor: isFemale ? 'rgba(226, 169, 153, 0.1)' : 'rgba(212, 175, 55, 0.1)',
                        color: isFemale ? '#ffdcd3' : '#fae596',
                      }}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider px-2.5 py-1 rounded-full bg-zinc-900 border border-zinc-800">
                      {item.badge}
                    </span>
                  </div>

                  <div>
                    <span className="text-xs font-mono tracking-widest text-zinc-400 block mb-1 uppercase font-medium">
                      {item.tag}
                    </span>
                    <h3 className="font-display text-xl sm:text-2xl text-white font-medium group-hover:text-zinc-100 transition-colors">
                      {item.title}
                    </h3>
                  </div>

                  <p className="text-sm sm:text-base text-zinc-300 font-light leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-6 mt-4 border-t border-zinc-800/60 flex items-center justify-between text-sm font-medium">
                  <span
                    style={{ color: isFemale ? '#ffdcd3' : '#fae596' }}
                    className="flex items-center gap-1 group-hover:underline font-semibold"
                  >
                    Acessar aba
                  </span>
                  <ChevronRight
                    className="w-4 h-4 transition-transform group-hover:translate-x-1"
                    style={{ color: goldPrimary }}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Trust & Quality Certifications Strip */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 rounded-3xl bg-gradient-to-r from-[#111116] via-[#15151d] to-[#111116] border border-zinc-800 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="flex items-center gap-4">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 border"
              style={{
                borderColor: isFemale ? 'rgba(226, 169, 153, 0.4)' : 'rgba(212, 175, 55, 0.4)',
                backgroundColor: isFemale ? 'rgba(226, 169, 153, 0.15)' : 'rgba(212, 175, 55, 0.15)',
                color: isFemale ? '#ffdcd3' : '#fae596',
              }}
            >
              <Microscope className="w-7 h-7" />
            </div>
            <div>
              <h4 className="font-display text-lg sm:text-xl text-white font-medium">
                Padrão Farmacêutico Magistral Certificado
              </h4>
              <p className="text-sm sm:text-base text-zinc-300 font-light mt-0.5">
                Manipulação sob controle estrito de dose, estabilidade físico-química e matérias-primas bioidênticas.
              </p>
            </div>
          </div>

          <button
            onClick={onOpenQuiz}
            className="w-full md:w-auto px-7 py-4 rounded-full text-sm font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-lg shrink-0 cursor-pointer"
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
        </div>
      </div>
    </div>
  );
};
