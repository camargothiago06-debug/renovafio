import React, { useState } from 'react';
import { CustomerJourneyProfile, GenderMode } from '../../types';
import {
  Calendar,
  Sparkles,
  Award,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Flame,
  User,
  Edit2,
  RefreshCw,
  ShieldCheck,
  ChevronRight,
  TrendingUp,
} from 'lucide-react';

interface JourneyDashboardHeaderProps {
  profile: CustomerJourneyProfile;
  gender: GenderMode;
  onUpdateProfile: (updated: Partial<CustomerJourneyProfile>) => void;
  onSelectPreset: (preset: '3_meses' | 'novo_cliente' | 'atrasado' | 'completo') => void;
  onSelectStage: (stageKey: CustomerJourneyProfile['currentStageKey']) => void;
}

export const JourneyDashboardHeader: React.FC<JourneyDashboardHeaderProps> = ({
  profile,
  gender,
  onUpdateProfile,
  onSelectPreset,
  onSelectStage,
}) => {
  const isFemale = gender === 'feminino';
  const goldPrimary = isFemale ? '#E2A999' : '#D4AF37';

  const [isEditingName, setIsEditingName] = useState(false);
  const [nameInput, setNameInput] = useState(profile.customerName);

  // Calculate progress percentage based on completed milestones
  const completedCount = profile.milestones.filter((m) => m.status === 'concluido').length;
  const inProgressCount = profile.milestones.filter((m) => m.status === 'em_andamento').length;
  const progressPercent = Math.round(((completedCount + inProgressCount * 0.5) / profile.milestones.length) * 100);

  // Determine current active or next recommended step
  const currentMilestone =
    profile.milestones.find((m) => m.status === 'em_andamento') ||
    profile.milestones.find((m) => m.status === 'atrasado') ||
    profile.milestones.find((m) => m.status === 'proximo') ||
    profile.milestones[profile.milestones.length - 1];

  const handleSaveName = () => {
    if (nameInput.trim()) {
      onUpdateProfile({ customerName: nameInput.trim() });
    }
    setIsEditingName(false);
  };

  return (
    <div className="w-full space-y-6">
      {/* Top Welcome & Interactive Simulator Switcher */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-2 border-b border-zinc-800/60">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span
              className="px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-mono font-bold tracking-wider uppercase border inline-flex items-center gap-1.5"
              style={{
                backgroundColor: isFemale ? 'rgba(226, 169, 153, 0.15)' : 'rgba(212, 175, 55, 0.15)',
                borderColor: isFemale ? 'rgba(226, 169, 153, 0.4)' : 'rgba(212, 175, 55, 0.4)',
                color: isFemale ? '#ffdcd3' : '#fae596',
              }}
            >
              <Sparkles className="w-3 h-3" />
              Área Exclusiva de Acompanhamento
            </span>
            <span className="text-zinc-400 text-xs font-mono hidden sm:inline">•</span>
            <span className="text-zinc-400 text-xs font-mono hidden sm:inline flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              Privacidade Local Criptografada
            </span>
          </div>

          <div className="flex items-center gap-3">
            {isEditingName ? (
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  className="px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-700 text-white font-display text-lg focus:outline-none focus:border-[#D4AF37]"
                  autoFocus
                />
                <button
                  onClick={handleSaveName}
                  className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-colors"
                >
                  Salvar
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <h1 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white">
                  Jornada de {profile.customerName}
                </h1>
                <button
                  onClick={() => setIsEditingName(true)}
                  className="p-1.5 rounded-lg hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 transition-colors"
                  title="Editar nome"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
          <p className="text-sm text-zinc-400 mt-1 max-w-2xl font-light">
            Monitore a evolução dos seus folículos, compare fotografias padronizadas e receba orientações fisiológicas a cada etapa do tratamento.
          </p>
        </div>

        {/* State Presets Simulator (Quick switch for testing all states) */}
        <div className="bg-[#111116] p-2 sm:p-2.5 rounded-2xl border border-zinc-800 flex flex-col sm:flex-row items-start sm:items-center gap-2 shrink-0">
          <span className="text-[11px] font-mono text-zinc-400 px-2 uppercase tracking-wider flex items-center gap-1.5">
            <RefreshCw className="w-3 h-3 text-zinc-400" />
            Modo de Demonstração:
          </span>
          <div className="flex flex-wrap items-center gap-1">
            <button
              onClick={() => onSelectPreset('3_meses')}
              className="px-2.5 py-1 rounded-lg text-xs font-medium bg-zinc-800 hover:bg-zinc-700 text-zinc-200 hover:text-white border border-zinc-700 transition-colors cursor-pointer"
            >
              3º Mês (Ativo)
            </button>
            <button
              onClick={() => onSelectPreset('novo_cliente')}
              className="px-2.5 py-1 rounded-lg text-xs font-medium bg-zinc-800 hover:bg-zinc-700 text-zinc-200 hover:text-white border border-zinc-700 transition-colors cursor-pointer"
            >
              Novo Início
            </button>
            <button
              onClick={() => onSelectPreset('atrasado')}
              className="px-2.5 py-1 rounded-lg text-xs font-medium bg-zinc-800 hover:bg-zinc-700 text-amber-300 hover:text-amber-200 border border-amber-500/30 transition-colors cursor-pointer"
            >
              Atrasado
            </button>
            <button
              onClick={() => onSelectPreset('completo')}
              className="px-2.5 py-1 rounded-lg text-xs font-medium bg-zinc-800 hover:bg-zinc-700 text-emerald-300 hover:text-emerald-200 border border-emerald-500/30 transition-colors cursor-pointer"
            >
              11 Meses Pleno
            </button>
          </div>
        </div>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Card 1: Protocol & Month */}
        <div className="p-5 rounded-2xl bg-[#0f0f13]/90 border border-zinc-800/80 backdrop-blur-md relative overflow-hidden flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" style={{ color: goldPrimary }} />
                Protocolo Ativo
              </span>
              <span className="px-2 py-0.5 rounded-md bg-zinc-800/80 text-zinc-300 text-[11px] font-bold">
                {profile.currentMonth}º Mês
              </span>
            </div>
            <h3 className="font-display font-bold text-base text-white leading-snug line-clamp-2">
              {profile.protocolName}
            </h3>
          </div>

          <div className="pt-4 mt-2 border-t border-zinc-800/50 flex items-center justify-between text-xs text-zinc-400 font-mono">
            <span>Início:</span>
            <span className="text-zinc-200 font-medium">{profile.startDate}</span>
          </div>
        </div>

        {/* Card 2: Visual Progress */}
        <div className="p-5 rounded-2xl bg-[#0f0f13]/90 border border-zinc-800/80 backdrop-blur-md flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
              <span className="flex items-center gap-1.5">
                <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                Progresso Clínico
              </span>
              <span className="text-xs font-bold font-mono" style={{ color: goldPrimary }}>
                {progressPercent}%
              </span>
            </div>

            <div className="w-full bg-zinc-800/80 h-3 rounded-full overflow-hidden p-0.5 border border-zinc-700/50">
              <div
                className="h-full rounded-full transition-all duration-700 ease-out"
                style={{
                  width: `${progressPercent}%`,
                  background: isFemale
                    ? 'linear-gradient(90deg, #B86B77 0%, #E2A999 100%)'
                    : 'linear-gradient(90deg, #AA771C 0%, #D4AF37 100%)',
                }}
              />
            </div>
          </div>

          <div className="pt-4 mt-2 border-t border-zinc-800/50 flex items-center justify-between text-xs text-zinc-400">
            <span>Etapas concluídas:</span>
            <span className="text-zinc-200 font-mono font-bold">
              {completedCount} de {profile.milestones.length} marcos
            </span>
          </div>
        </div>

        {/* Card 3: Next Recommended Milestone */}
        <div
          onClick={() => currentMilestone && onSelectStage(currentMilestone.stageKey)}
          className="p-5 rounded-2xl bg-[#0f0f13]/90 border border-zinc-800/80 backdrop-blur-md flex flex-col justify-between hover:border-zinc-700 transition-all cursor-pointer group"
        >
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                Próxima Etapa
              </span>
              <span
                className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                  currentMilestone.status === 'concluido'
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    : currentMilestone.status === 'atrasado'
                    ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                    : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                }`}
              >
                {currentMilestone.status === 'concluido' ? 'Concluído' : currentMilestone.status === 'atrasado' ? 'Atrasado' : 'Em Foco'}
              </span>
            </div>

            <h3 className="font-display font-bold text-base text-white group-hover:text-[#fae596] transition-colors line-clamp-1">
              {currentMilestone.shortLabel} — {currentMilestone.clinicalGuidelines.phaseName}
            </h3>
            <p className="text-xs text-zinc-400 line-clamp-2">
              {currentMilestone.clinicalGuidelines.whatToExpect}
            </p>
          </div>

          <div className="pt-3 mt-2 border-t border-zinc-800/50 flex items-center justify-between text-xs text-zinc-400">
            <span className="flex items-center gap-1 text-[11px] text-zinc-300 group-hover:text-white font-medium">
              Abrir detalhes <ChevronRight className="w-3 h-3" />
            </span>
            <span className="font-mono text-[11px] text-zinc-400">{profile.nextPhotoDate}</span>
          </div>
        </div>

        {/* Card 4: Daily Application Habit */}
        <div className="p-5 rounded-2xl bg-[#0f0f13]/90 border border-zinc-800/80 backdrop-blur-md flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
              <span className="flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5 text-amber-500" />
                Aplicação Diária
              </span>
              <span className="text-xs font-bold font-mono text-zinc-300">
                1 dose/dia
              </span>
            </div>

            <div className="flex items-baseline gap-2">
              <span className="font-display text-2xl font-bold text-white">
                {profile.applicationTime}
              </span>
              <span className="text-xs text-zinc-400">todas as manhãs</span>
            </div>
            <p className="text-xs text-zinc-400">
              Tomar com 200ml de água para absorção otimizada.
            </p>
          </div>

          <div className="pt-3 mt-2 border-t border-zinc-800/50 flex items-center justify-between text-xs text-zinc-400 font-mono">
            <span>Doses no frasco:</span>
            <span className={`font-bold ${profile.dosesRemaining <= 5 ? 'text-rose-400' : 'text-emerald-400'}`}>
              {profile.dosesRemaining} de {profile.totalDoses}
            </span>
          </div>
        </div>

      </div>
    </div>
  );
};
