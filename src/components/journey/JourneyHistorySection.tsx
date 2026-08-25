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
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-white flex items-center gap-2.5">
            <History className="w-6 h-6" style={{ color: goldPrimary }} />
            Histórico Consolidado de Registros & Evolução
          </h2>
          <p className="text-sm sm:text-base text-zinc-300 font-light mt-1">
            Arquivo cronológico completo de fotografias, anotações e avaliações registradas no seu dispositivo.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={onOpenComparator}
            className="px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-zinc-900 hover:bg-zinc-800 text-amber-300 border border-zinc-700 flex items-center gap-2 transition-colors cursor-pointer"
          >
            <Eye className="w-4 h-4" />
            Comparar Registros
          </button>
          <button
            onClick={handlePrintReport}
            className="px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-zinc-900 hover:bg-zinc-800 text-white border border-zinc-700 flex items-center gap-2 transition-colors cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            Imprimir / Salvar PDF
          </button>
        </div>
      </div>

      {recordedMilestones.length === 0 ? (
        <div className="p-8 sm:p-10 rounded-2xl bg-[#0c0c10] border border-zinc-800 text-center space-y-4">
          <div className="w-14 h-14 rounded-full bg-zinc-900 border border-zinc-700 flex items-center justify-center text-zinc-400 mx-auto">
            <Camera className="w-7 h-7" />
          </div>
          <h3 className="font-display font-bold text-xl text-white">Nenhum registro fotográfico ainda</h3>
          <p className="text-sm sm:text-base text-zinc-300 max-w-md mx-auto leading-relaxed">
            Inicie seu histórico tirando sua foto do <strong>Dia 01</strong> para acompanhar a evolução dos seus fios mês a mês.
          </p>
          <button
            onClick={() => onOpenStage('dia01')}
            className="px-6 py-3 rounded-xl bg-[#D4AF37] text-black font-bold text-sm hover:bg-amber-400 transition-colors inline-flex items-center gap-2 cursor-pointer shadow-lg"
          >
            <Camera className="w-4 h-4" /> Registrar Foto do Dia 01
          </button>
        </div>
      ) : (
        <div className="space-y-4">
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
                  <div className="flex items-center gap-3.5 sm:gap-4">
                    {/* Thumbnail */}
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-zinc-950 border border-zinc-700/80 overflow-hidden flex items-center justify-center shrink-0">
                      {milestone.photoUrl ? (
                        <img
                          src={milestone.photoUrl}
                          alt={milestone.title}
                          className="w-full h-full object-contain"
                        />
                      ) : (
                        <Camera className="w-6 h-6 text-zinc-400" />
                      )}
                    </div>

                    <div>
                      <div className="flex items-center gap-2.5">
                        <span className="font-display font-bold text-base sm:text-lg text-white">
                          {milestone.title}
                        </span>
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider ${
                            milestone.status === 'concluido'
                              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                              : 'bg-amber-500/10 text-amber-300 border border-amber-500/30'
                          }`}
                        >
                          {milestone.status === 'concluido' ? 'Concluído' : 'Em andamento'}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-xs sm:text-sm text-zinc-400 font-mono mt-1">
                        <span className="flex items-center gap-1.5 text-zinc-300">
                          <Calendar className="w-3.5 h-3.5 text-zinc-400" />
                          {milestone.completedDate || `Previsão: Dia ${milestone.recommendedDays}`}
                        </span>
                        {milestone.notes && (
                          <span className="hidden sm:inline text-zinc-300 truncate max-w-sm">
                            • {milestone.notes}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenStage(milestone.stageKey);
                      }}
                      className="hidden sm:inline-flex px-3.5 py-2 rounded-lg text-xs sm:text-sm font-bold bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700 transition-colors cursor-pointer"
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
                  <div className="px-4 sm:px-6 pb-6 pt-3 border-t border-zinc-800/60 bg-zinc-950/40 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      {/* Photo preview */}
                      <div>
                        <span className="text-xs sm:text-sm font-mono text-zinc-300 block mb-2 font-medium">
                          Foto da Etapa ({milestone.shortLabel}):
                        </span>
                        {milestone.photoUrl ? (
                          <div className="aspect-[4/3] rounded-xl overflow-hidden bg-black border border-zinc-800 flex items-center justify-center p-2">
                            <img
                              src={milestone.photoUrl}
                              alt={milestone.title}
                              className="w-full h-full object-contain rounded-lg"
                            />
                          </div>
                        ) : (
                          <div className="aspect-[4/3] rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-sm text-zinc-400">
                            Sem foto registrada
                          </div>
                        )}
                      </div>

                      {/* Notes & Guidance */}
                      <div className="space-y-4">
                        <div>
                          <span className="text-xs sm:text-sm font-mono text-zinc-300 block mb-1.5 font-medium">
                            Anotações Pessoais:
                          </span>
                          <div className="p-3.5 rounded-xl bg-zinc-900/80 border border-zinc-800 text-sm sm:text-base text-zinc-200 leading-relaxed">
                            {milestone.notes || 'Nenhuma observação registrada nesta etapa.'}
                          </div>
                        </div>

                        <div>
                          <span className="text-xs sm:text-sm font-mono text-zinc-300 block mb-1.5 font-medium">
                            Fase Fisiológica:
                          </span>
                          <div className="p-3.5 rounded-xl bg-zinc-900/40 border border-zinc-800/80 text-xs sm:text-sm text-zinc-300 space-y-1.5 leading-relaxed">
                            <p className="font-bold text-white text-sm sm:text-base">
                              {milestone.clinicalGuidelines.phaseName}
                            </p>
                            <p>{milestone.clinicalGuidelines.whatToExpect}</p>
                          </div>
                        </div>

                        <div className="flex justify-end pt-2">
                          <button
                            onClick={() => onOpenStage(milestone.stageKey)}
                            className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-[#D4AF37] text-black hover:bg-amber-400 transition-colors cursor-pointer shadow-md"
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
