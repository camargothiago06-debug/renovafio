import React from 'react';
import { GenderMode, TabType } from '../types';
import { RenovaLogo } from './RenovaLogo';
import { ShieldCheck, Lock, Award, Heart, Sparkles } from 'lucide-react';

interface LuxuryFooterProps {
  gender: GenderMode;
  onSelectGender: (gender: GenderMode) => void;
  onOpenQuiz: () => void;
  onSelectTab?: (tab: TabType) => void;
}

export const LuxuryFooter: React.FC<LuxuryFooterProps> = ({
  gender,
  onSelectGender,
  onOpenQuiz,
  onSelectTab,
}) => {
  const isFemale = gender === 'feminino';
  const goldPrimary = isFemale ? '#E2A999' : '#D4AF37';

  const handleTabClick = (tab: TabType) => {
    if (onSelectTab) {
      onSelectTab(tab);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-[#070709] border-t border-zinc-800/80 pt-16 pb-12 px-4 sm:px-6 lg:px-8 text-zinc-400 relative">
      <div className="w-full max-w-7xl mx-auto space-y-12">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Col 1 & 2: Brand Info & Quality Seal */}
          <div className="lg:col-span-2 space-y-4">
            <RenovaLogo gender={gender} size="lg" showSubtitle={true} />
            <p className="text-sm text-zinc-300 font-light leading-relaxed max-w-sm">
              Alta tricologia farmacêutica e medicina capilar de precisão. Fórmulas magistrais sob medida desenvolvidas para reverter a calvície e devolver a plenitude dos seus cabelos.
            </p>

            <div className="pt-2 flex flex-wrap gap-2 text-xs font-mono text-zinc-400">
              <span className="px-3 py-1 rounded border border-zinc-800 bg-zinc-900/50">
                CRF/SP 49.201
              </span>
              <span className="px-3 py-1 rounded border border-zinc-800 bg-zinc-900/50">
                Anvisa RDC 67/2007
              </span>
              <span className="px-3 py-1 rounded border border-zinc-800 bg-zinc-900/50">
                100% Cruelty-Free
              </span>
            </div>
          </div>

          {/* Col 3: Navegação */}
          <div className="space-y-3">
            <h4 className="font-display font-bold text-sm uppercase tracking-widest text-white">
              Navegação
            </h4>
            <ul className="space-y-2.5 text-sm text-zinc-300">
              <li>
                <button onClick={() => handleTabClick('inicio')} className="hover:text-white transition-colors text-left cursor-pointer">
                  Início (Visão Geral)
                </button>
              </li>
              <li>
                <button onClick={() => handleTabClick('galeria')} className="hover:text-white transition-colors text-left cursor-pointer">
                  Galeria de Fórmulas
                </button>
              </li>
              <li>
                <button onClick={() => handleTabClick('ciencia')} className="hover:text-white transition-colors text-left cursor-pointer">
                  A Ciência 450mg
                </button>
              </li>
              <li>
                <button onClick={() => handleTabClick('resultados')} className="hover:text-white transition-colors text-left cursor-pointer">
                  Casos Clínicos
                </button>
              </li>
              <li>
                <button onClick={() => handleTabClick('protocolos')} className="hover:text-white transition-colors text-left cursor-pointer">
                  Protocolos & Valores
                </button>
              </li>
              <li>
                <button onClick={() => handleTabClick('jornada')} className="hover:text-white transition-colors text-left cursor-pointer text-[#fae596] font-medium">
                  Minha Jornada (Acompanhamento)
                </button>
              </li>
              <li>
                <button onClick={() => handleTabClick('faq')} className="hover:text-white transition-colors text-left cursor-pointer">
                  Dúvidas Frequentes
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Linhas de Tratamento */}
          <div className="space-y-3">
            <h4 className="font-display font-bold text-sm uppercase tracking-widest text-white">
              Linhas
            </h4>
            <ul className="space-y-2.5 text-sm text-zinc-300">
              <li>
                <button
                  onClick={() => onSelectGender('masculino')}
                  className={`transition-colors ${!isFemale ? 'text-[#D4AF37] font-bold' : 'hover:text-white'}`}
                >
                  Protocolo Masculino (Dutasterida)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectGender('feminino')}
                  className={`transition-colors ${isFemale ? 'text-[#E2A999] font-bold' : 'hover:text-white'}`}
                >
                  Protocolo Feminino (Nutricolin)
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenQuiz}
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#fae596]" />
                  <span>Diagnóstico Capilar Online</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 5: Segurança & Sigilo */}
          <div className="space-y-3">
            <h4 className="font-display font-bold text-sm uppercase tracking-widest text-white">
              Segurança
            </h4>
            <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800 space-y-2 text-xs sm:text-sm">
              <div className="flex items-center space-x-1.5 text-emerald-400">
                <Lock className="w-4 h-4" />
                <span className="font-mono text-xs font-bold">Checkout 100% Seguro</span>
              </div>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                Embalagens discretas sem identificação do conteúdo para sua total privacidade.
              </p>
            </div>
          </div>

        </div>

        {/* Legal Disclaimer */}
        <div className="pt-8 border-t border-zinc-800/80 text-xs text-zinc-400 space-y-2 leading-relaxed font-light">
          <p>
            *Os resultados podem variar de acordo com o metabolismo e adesão diária ao protocolo de cada indivíduo. As fórmulas magistrais Renova Fio são manipuladas sob demanda farmacêutica estrita em conformidade com as Boas Práticas de Manipulação Farmacêutica (RDC 67/2007 - ANVISA). Farmacêutico Responsável: Dra. Beatriz S. Duarte - CRF/SP 49.201.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-between pt-4 text-zinc-400 text-xs gap-2">
            <span>© {new Date().getFullYear()} Renova Fio • Alta Tricologia Capilar. Todos os direitos reservados.</span>
            <span>CNPJ 48.912.842/0001-90</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
