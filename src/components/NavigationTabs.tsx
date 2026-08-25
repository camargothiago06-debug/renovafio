import React from 'react';
import { motion } from 'motion/react';
import { TabType, GenderMode } from '../types';
import { Sparkles, Package, FlaskConical, Award, ShieldCheck, HelpCircle, CalendarCheck } from 'lucide-react';

interface NavigationTabsProps {
  activeTab: TabType;
  onSelectTab: (tab: TabType) => void;
  gender: GenderMode;
}

export const NavigationTabs: React.FC<NavigationTabsProps> = ({
  activeTab,
  onSelectTab,
  gender,
}) => {
  const isFemale = gender === 'feminino';
  const goldPrimary = isFemale ? '#E2A999' : '#D4AF37';

  const tabs: { id: TabType; label: string; shortLabel: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'inicio', label: 'Início', shortLabel: 'Início', icon: Sparkles },
    { id: 'galeria', label: 'Galeria de Fórmulas', shortLabel: 'Galeria', icon: Package },
    { id: 'ciencia', label: 'A Ciência 450mg', shortLabel: 'Ciência', icon: FlaskConical },
    { id: 'resultados', label: 'Resultados Clínicos', shortLabel: 'Resultados', icon: Award },
    { id: 'protocolos', label: 'Protocolos & Preços', shortLabel: 'Protocolos', icon: ShieldCheck },
    { id: 'jornada', label: 'Minha Jornada', shortLabel: 'Jornada', icon: CalendarCheck },
    { id: 'faq', label: 'Dúvidas Frequentes', shortLabel: 'Dúvidas', icon: HelpCircle },
  ];

  return (
    <nav
      aria-label="Navegação Principal"
      className={`w-full backdrop-blur-xl transition-all duration-300 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.7)] ${
        isFemale
          ? 'bg-[#130b10]/95 border-b border-[#E2A999]/25 shadow-[0_10px_30px_-15px_rgba(226,169,153,0.15)]'
          : 'bg-[#09090c]/95 border-b border-zinc-800/80'
      }`}
    >
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="flex items-center justify-start md:justify-center overflow-x-auto no-scrollbar py-2.5 gap-1.5 sm:gap-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => {
                  onSelectTab(tab.id);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`relative px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 flex items-center gap-2 whitespace-nowrap select-none shrink-0 ${
                  isActive
                    ? 'text-white font-bold'
                    : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/50'
                }`}
              >
                {/* Active Indicator Glow Background */}
                {isActive && (
                  <motion.div
                    layoutId="activeTabPill"
                    className="absolute inset-0 rounded-xl border"
                    style={{
                      backgroundColor: isFemale ? 'rgba(226, 169, 153, 0.14)' : 'rgba(212, 175, 55, 0.14)',
                      borderColor: isFemale ? 'rgba(226, 169, 153, 0.45)' : 'rgba(212, 175, 55, 0.45)',
                      boxShadow: isFemale
                        ? '0 0 16px -2px rgba(226, 169, 153, 0.3)'
                        : '0 0 16px -2px rgba(212, 175, 55, 0.3)',
                    }}
                    transition={{ type: 'spring', bounce: 0.15, duration: 0.45 }}
                  />
                )}

                <span className="relative z-10 flex items-center gap-2">
                  <Icon
                    className={`w-4 h-4 transition-colors ${
                      isActive
                        ? isFemale ? 'text-[#ffdcd3]' : 'text-[#fae596]'
                        : 'text-zinc-400'
                    }`}
                  />
                  <span className="hidden sm:inline">{tab.label}</span>
                  <span className="sm:hidden">{tab.shortLabel}</span>
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};
