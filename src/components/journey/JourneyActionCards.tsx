import React from 'react';
import { CustomerJourneyProfile, GenderMode } from '../../types';
import {
  MessageSquare,
  Package,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Phone,
  Lock,
  HeartHandshake,
  AlertCircle,
} from 'lucide-react';

interface JourneyActionCardsProps {
  profile: CustomerJourneyProfile;
  gender: GenderMode;
  onNavigateToGallery: () => void;
  onNavigateToPricing: () => void;
}

export const JourneyActionCards: React.FC<JourneyActionCardsProps> = ({
  profile,
  gender,
  onNavigateToGallery,
  onNavigateToPricing,
}) => {
  const isFemale = gender === 'feminino';
  const goldPrimary = isFemale ? '#E2A999' : '#D4AF37';

  // Build WhatsApp URL with customized text
  const message = encodeURIComponent(
    `Olá, equipe Renova Fio! Sou o(a) ${profile.customerName} e estou realizando o ${profile.protocolName} (atualmente no ${profile.currentMonth}º mês de tratamento). Gostaria de tirar uma dúvida clínica sobre minha evolução capilar.`
  );
  const whatsappUrl = `https://wa.me/5511999999999?text=${message}`;

  return (
    <div className="w-full space-y-6">
      
      {/* 2 Big Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Card 1: Fale com um Especialista (WhatsApp) */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#0e1612] via-[#0d1012] to-[#0a0a0e] border border-emerald-500/30 shadow-2xl relative overflow-hidden flex flex-col justify-between space-y-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
                <MessageSquare className="w-4 h-4" />
              </span>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400">
                Suporte Farmacêutico Direto
              </span>
            </div>

            <h3 className="font-display text-2xl font-bold text-white">
              Fale com um Especialista Tricológico
            </h3>
            <p className="text-xs sm:text-sm text-zinc-300 font-light leading-relaxed">
              Tire dúvidas sobre dosagem, fase de adaptação folicular, reações ou solicite uma análise individual das fotos da sua jornada com nossa equipe magistral.
            </p>
          </div>

          <div className="space-y-3">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-950/60 cursor-pointer"
            >
              <Phone className="w-4 h-4" />
              <span>Chamar Especialista no WhatsApp</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <div className="flex items-center justify-center gap-2 text-[11px] font-mono text-zinc-400">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Atendimento farmacêutico de segunda a sábado</span>
            </div>
          </div>
        </div>

        {/* Card 2: Repor Tratamento (Galeria de Fórmulas) */}
        <div
          className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#16120b] via-[#12100e] to-[#0a0a0e] border shadow-2xl relative overflow-hidden flex flex-col justify-between space-y-6"
          style={{
            borderColor: isFemale ? 'rgba(226, 169, 153, 0.4)' : 'rgba(212, 175, 55, 0.4)',
          }}
        >
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span
                className="w-8 h-8 rounded-full flex items-center justify-center border"
                style={{
                  backgroundColor: isFemale ? 'rgba(226, 169, 153, 0.2)' : 'rgba(212, 175, 55, 0.2)',
                  borderColor: isFemale ? 'rgba(226, 169, 153, 0.4)' : 'rgba(212, 175, 55, 0.4)',
                  color: goldPrimary,
                }}
              >
                <Package className="w-4 h-4" />
              </span>
              <span
                className="text-xs font-mono font-bold uppercase tracking-wider"
                style={{ color: goldPrimary }}
              >
                Continuidade Terapêutica
              </span>
            </div>

            <h3 className="font-display text-2xl font-bold text-white">
              Repor Protocolo ou Adicionar Sérum
            </h3>
            <p className="text-xs sm:text-sm text-zinc-300 font-light leading-relaxed">
              Não interrompa seu ciclo anágeno. Garanta seus próximos frascos de doses 450mg ou complemente seu protocolo com a linha tópica e tônicos fortificantes.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3">
            <button
              onClick={onNavigateToGallery}
              className="w-full sm:flex-1 py-3.5 px-5 rounded-xl font-bold text-sm text-black flex items-center justify-center gap-2 transition-all shadow-lg cursor-pointer"
              style={{
                background: isFemale
                  ? 'linear-gradient(135deg, #E2A999 0%, #B86B77 100%)'
                  : 'linear-gradient(135deg, #FFF0D0 0%, #D4AF37 50%, #AA771C 100%)',
              }}
            >
              <Package className="w-4 h-4" />
              <span>Galeria de Fórmulas</span>
            </button>

            <button
              onClick={onNavigateToPricing}
              className="w-full sm:w-auto py-3.5 px-5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-xs border border-zinc-700 transition-colors cursor-pointer whitespace-nowrap"
            >
              Ver Planos de 3 a 6 Meses
            </button>
          </div>
        </div>

      </div>

      {/* Privacy, Storage & Medical Disclaimers Banner */}
      <div className="p-5 sm:p-6 rounded-2xl bg-[#09090c] border border-zinc-800/80 space-y-3">
        <div className="flex items-center gap-2 text-xs font-mono text-zinc-300 font-bold uppercase">
          <Lock className="w-4 h-4 text-emerald-400" />
          Segurança, Privacidade e Termo de Acompanhamento
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-zinc-400 font-light leading-relaxed">
          <p>
            🔒 <strong>Armazenamento Local & Sigilo:</strong> Todas as fotografias e anotações inseridas nesta área são processadas e armazenadas exclusivamente na memória local do seu navegador (<code className="text-zinc-300">localStorage</code>). Nenhuma imagem é transferida para servidores de terceiros ou exposta publicamente.
          </p>
          <p>
            ⚕️ <strong>Aviso Médico & Fisiológico:</strong> As respostas clínicas variam entre indivíduos dependendo de fatores genéticos, metabólicos e adesão ininterrupta à posologia. Este painel é uma ferramenta de apoio ao paciente e não substitui diagnósticos médicos formais.
          </p>
        </div>
      </div>

    </div>
  );
};
