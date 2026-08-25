import React, { useState } from 'react';
import { CustomerJourneyProfile, GenderMode, JourneyMilestone } from '../../types';
import {
  History,
  FileText,
  Calendar,
  Camera,
  CheckCircle2,
  Download,
  Printer,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Shield,
  Eye,
} from 'lucide-react';

interface JourneyHistorySectionProps {
  profile: CustomerJourneyProfile;
  gender: GenderMode;
  onOpenStage: (stageKey: CustomerJourneyProfile['currentStageKey']) => void;
  onOpenComparator: () => void;
}

export const JourneyHistorySection: React.FC<JourneyHistorySectionProps> = ({
  profile,
  gender,
  onOpenStage,
  onOpenComparator,
}) => {
  const isFemale = gender === 'feminino';
  const goldPrimary = isFemale ? '#E2A999' : '#D4AF37';

  const [expandedId, setExpandedId] = useState<string | null>(null);

  // Filter milestones with either photo, completed date or notes
  const recordedMilestones = profile.milestones.filter(
    (m) => m.photoUrl || m.completedDate || (m.notes && m.notes.trim().length > 0)
  );

  const handlePrintReport = () => {
    window.print();
  };

  return (
    <div className="w-full space-y-6">
      {/* Header with Export / Print Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-display text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
            <History className="w-5 h-5" style={{ color: goldPrimary }} />
            Histórico Consolidado de Registros & Evolução
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 font-light mt-0.5">
            Arquivo cronológico completo de fotografias, anotações e avaliações registradas no seu dispositivo.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={onOpenComparator}
            className="px-3.5 py-2 rounded-xl text-xs font-bold bg-zinc-900 hover:bg-zinc-800 text-amber-300 border border-zinc-700 flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5" />
            Comparar Registros
          </button>
          <button
            onClick={handlePrintReport}
            className="px-3.5 py-2 rounded-xl text-xs font-bold bg-zinc-900 hover:bg-zinc-800 text-white border border-zinc-700 flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            Imprimir / Salvar PDF
          </button>
        </div>
      </div>

      {recordedMilestones.length === 0 ? (
        <div className="p-8 rounded-2xl bg-[#0c0c10] border border-zinc-800 text-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-zinc-900 border border-zinc-700 flex items-center justify-center text-zinc-400 mx-auto">
            <Camera className="w-6 h-6" />
          </div>
          <h3 className="font-display font-bold text-lg text-white">Nenhum registro fotográfico ainda</h3>
          <p className="text-xs sm:text-sm text-zinc-400 max-w-md mx-auto">
            Inicie seu histórico tirando sua foto do <strong>Dia 01</strong> para acompanhar a evolução dos seus fios mês a mês.
          </p>
          <button
            onClick={() => onOpenStage('dia01')}
            className="px-5 py-2 rounded-xl bg-[#D4AF37] text-black font-bold text-xs hover:bg-amber-400 transition-colors inline-flex items-center gap-2"
          >
            <Camera className="w-3.5 h-3.5" /> Registrar Foto do Dia 01
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {recordedMilestones.map((milestone, idx) => {
            const isExpanded = expandedId === milestone.id;

            return (
              <div
                key={milestone.id}
                className="rounded-2xl bg-[#0d0d12] border border-zinc-800/90 overflow-hidden transition-all"
              >
                {/* Header item */}
                <div
                  onClick={() => setExpandedId(isExpanded ? null : milestone.id)}
                  className="p-4 sm:p-5 flex items-center justify-between gap-4 cursor-pointer hover:bg-zinc-900/40 transition-colors"
                >
                  <div className="flex items-center gap-3 sm:gap-4">
                    {/* Thumbnail */}
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-zinc-950 border border-zinc-700/80 overflow-hidden flex items-center justify-center shrink-0">
                      {milestone.photoUrl ? (
                        <img
                          src={milestone.photoUrl}
                          alt={milestone.title}
                          className="w-full h-full object-contain"
                        />
                      ) : (
                        <Camera className="w-5 h-5 text-zinc-400" />
                      )}
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-display font-bold text-sm sm:text-base text-white">
                          {milestone.title}
                        </span>
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider ${
                            milestone.status === 'concluido'
                              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                              : 'bg-amber-500/10 text-amber-300 border border-amber-500/30'
                          }`}
                        >
                          {milestone.status === 'concluido' ? 'Concluído' : 'Em andamento'}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-zinc-400 font-mono mt-0.5">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-zinc-400" />
                          {milestone.completedDate || `Previsão: Dia ${milestone.recommendedDays}`}
                        </span>
                        {milestone.notes && (
                          <span className="hidden sm:inline text-zinc-400 truncate max-w-xs">
                            • {milestone.notes}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenStage(milestone.stageKey);
                      }}
                      className="hidden sm:inline-flex px-3 py-1.5 rounded-lg text-xs font-bold bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700 transition-colors"
                    >
                      Editar
                    </button>
                    {isExpanded ? (
                      <ChevronUp className="w-5 h-5 text-zinc-400" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-zinc-400" />
                    )}
                  </div>
                </div>

                {/* Expanded Details */}
                {isExpanded && (
                  <div className="px-4 sm:px-6 pb-6 pt-2 border-t border-zinc-800/60 bg-zinc-950/40 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Photo preview */}
                      <div>
                        <span className="text-xs font-mono text-zinc-400 block mb-2">
                          Foto da Etapa ({milestone.shortLabel}):
                        </span>
                        {milestone.photoUrl ? (
                          <div className="aspect-[4/3] rounded-xl overflow-hidden bg-black border border-zinc-800 flex items-center justify-center">
                            <img
                              src={milestone.photoUrl}
                              alt={milestone.title}
                              className="w-full h-full object-contain"
                            />
                          </div>
                        ) : (
                          <div className="aspect-[4/3] rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-xs text-zinc-400">
                            Sem foto registrada
                          </div>
                        )}
                      </div>

                      {/* Notes & Guidance */}
                      <div className="space-y-4">
                        <div>
                          <span className="text-xs font-mono text-zinc-400 block mb-1">
                            Anotações Pessoais:
                          </span>
                          <div className="p-3 rounded-xl bg-zinc-900/80 border border-zinc-800 text-xs sm:text-sm text-zinc-300">
                            {milestone.notes || 'Nenhuma observação registrada nesta etapa.'}
                          </div>
                        </div>

                        <div>
                          <span className="text-xs font-mono text-zinc-400 block mb-1">
                            Fase Fisiológica:
                          </span>
                          <div className="p-3 rounded-xl bg-zinc-900/40 border border-zinc-800/80 text-xs text-zinc-400 space-y-1">
                            <p className="font-bold text-zinc-200">
                              {milestone.clinicalGuidelines.phaseName}
                            </p>
                            <p>{milestone.clinicalGuidelines.whatToExpect}</p>
                          </div>
                        </div>

                        <div className="flex justify-end">
                          <button
                            onClick={() => onOpenStage(milestone.stageKey)}
                            className="px-4 py-2 rounded-xl text-xs font-bold bg-[#D4AF37] text-black hover:bg-amber-400 transition-colors"
                          >
                            Abrir no Painel de Edição
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
