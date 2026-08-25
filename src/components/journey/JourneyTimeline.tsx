import React, { useState, useRef } from 'react';
import { CustomerJourneyProfile, GenderMode, JourneyMilestone } from '../../types';
import {
  Calendar,
  CheckCircle2,
  Clock,
  AlertCircle,
  Camera,
  Upload,
  Trash2,
  Save,
  Sparkles,
  Info,
  ChevronRight,
  ShieldCheck,
  Eye,
  Check,
  RotateCcw,
} from 'lucide-react';

interface JourneyTimelineProps {
  profile: CustomerJourneyProfile;
  gender: GenderMode;
  selectedStageKey: CustomerJourneyProfile['currentStageKey'];
  onSelectStageKey: (stageKey: CustomerJourneyProfile['currentStageKey']) => void;
  onUpdateMilestone: (stageKey: CustomerJourneyProfile['currentStageKey'], updated: Partial<JourneyMilestone>) => void;
  onOpenComparatorWithStage: (stageKey: CustomerJourneyProfile['currentStageKey']) => void;
}

export const JourneyTimeline: React.FC<JourneyTimelineProps> = ({
  profile,
  gender,
  selectedStageKey,
  onSelectStageKey,
  onUpdateMilestone,
  onOpenComparatorWithStage,
}) => {
  const isFemale = gender === 'feminino';
  const goldPrimary = isFemale ? '#E2A999' : '#D4AF37';

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [activeUploadStage, setActiveUploadStage] = useState<CustomerJourneyProfile['currentStageKey'] | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [localNotes, setLocalNotes] = useState<{ [key: string]: string }>({});
  const [saveSuccessMap, setSaveSuccessMap] = useState<{ [key: string]: boolean }>({});

  const activeMilestone =
    profile.milestones.find((m) => m.stageKey === selectedStageKey) || profile.milestones[0];

  // Helper to handle file selection and validation (JPG, PNG, WEBP, <= 5MB)
  const processUploadedFile = (file: File, stageKey: CustomerJourneyProfile['currentStageKey']) => {
    setUploadError(null);

    const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
    if (!validTypes.includes(file.type)) {
      setUploadError('Formato inválido. Por favor, envie uma imagem nos formatos JPG, PNG ou WEBP.');
      return;
    }

    const maxBytes = 5 * 1024 * 1024; // 5 MB
    if (file.size > maxBytes) {
      setUploadError('Tamanho de arquivo excedido. O limite máximo permitido é de 5 MB por foto.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const base64Url = e.target?.result as string;
      if (base64Url) {
        const todayStr = new Date().toLocaleDateString('pt-BR');
        onUpdateMilestone(stageKey, {
          photoUrl: base64Url,
          completedDate: todayStr,
          status: 'concluido',
        });
      }
    };
    reader.onerror = () => {
      setUploadError('Erro ao carregar a imagem. Tente novamente.');
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && activeUploadStage) {
      processUploadedFile(file, activeUploadStage);
    }
    // reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, stageKey: CustomerJourneyProfile['currentStageKey']) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processUploadedFile(file, stageKey);
    }
  };

  const handleSaveNotes = (stageKey: CustomerJourneyProfile['currentStageKey']) => {
    const text = localNotes[stageKey] !== undefined ? localNotes[stageKey] : activeMilestone.notes || '';
    onUpdateMilestone(stageKey, { notes: text });
    setSaveSuccessMap((prev) => ({ ...prev, [stageKey]: true }));
    setTimeout(() => {
      setSaveSuccessMap((prev) => ({ ...prev, [stageKey]: false }));
    }, 2500);
  };

  const handleRemovePhoto = (stageKey: CustomerJourneyProfile['currentStageKey']) => {
    onUpdateMilestone(stageKey, { photoUrl: undefined });
  };

  const handleToggleStatus = (stageKey: CustomerJourneyProfile['currentStageKey']) => {
    const target = profile.milestones.find((m) => m.stageKey === stageKey);
    if (!target) return;

    if (target.status === 'concluido') {
      onUpdateMilestone(stageKey, { status: 'em_andamento' });
    } else {
      const todayStr = new Date().toLocaleDateString('pt-BR');
      onUpdateMilestone(stageKey, {
        status: 'concluido',
        completedDate: target.completedDate || todayStr,
      });
    }
  };

  return (
    <div className="w-full space-y-8">
      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        className="hidden"
        onChange={handleFileChange}
      />

      {/* Section Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h2 className="font-display text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
            <Calendar className="w-5 h-5" style={{ color: goldPrimary }} />
            Linha do Tempo de Evolução Folicular
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 font-light mt-0.5">
            Selecione uma etapa para registrar fotos, acompanhar mudanças esperadas e registrar notas do seu protocolo.
          </p>
        </div>
      </div>

      {/* Interactive Horizontal / Responsive Stepper Bar */}
      <div className="w-full bg-[#0d0d12]/90 border border-zinc-800/80 rounded-2xl p-3 sm:p-4 backdrop-blur-md overflow-x-auto no-scrollbar">
        <div className="min-w-[650px] flex items-center justify-between relative px-4">
          
          {/* Connector Line behind steps */}
          <div className="absolute left-8 right-8 top-1/2 -translate-y-1/2 h-1 bg-zinc-800 z-0" />

          {profile.milestones.map((milestone, idx) => {
            const isSelected = selectedStageKey === milestone.stageKey;
            const isCompleted = milestone.status === 'concluido';
            const isInProgress = milestone.status === 'em_andamento';
            const isDelayed = milestone.status === 'atrasado';
            const hasPhoto = !!milestone.photoUrl;

            return (
              <button
                key={milestone.stageKey}
                onClick={() => onSelectStageKey(milestone.stageKey)}
                className={`relative z-10 flex flex-col items-center group cursor-pointer transition-all p-2 rounded-xl ${
                  isSelected ? 'scale-105' : 'hover:scale-102 opacity-85 hover:opacity-100'
                }`}
              >
                {/* Node Circle */}
                <div
                  className={`w-11 h-11 rounded-full flex items-center justify-center font-mono font-bold text-xs transition-all duration-300 shadow-xl border-2 ${
                    isCompleted
                      ? 'bg-emerald-950/90 text-emerald-300 border-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.3)]'
                      : isInProgress
                      ? 'text-black border-amber-400 shadow-[0_0_20px_rgba(212,175,55,0.5)] animate-pulse'
                      : isDelayed
                      ? 'bg-rose-950/90 text-rose-300 border-rose-500'
                      : 'bg-zinc-900 text-zinc-400 border-zinc-700'
                  }`}
                  style={
                    isInProgress
                      ? {
                          backgroundColor: goldPrimary,
                        }
                      : {}
                  }
                >
                  {isCompleted ? (
                    <CheckCircle2 className="w-5 h-5" />
                  ) : isDelayed ? (
                    <AlertCircle className="w-5 h-5" />
                  ) : (
                    <span>0{idx + 1}</span>
                  )}
                </div>

                {/* Node Labels */}
                <div className="mt-2 text-center">
                  <div
                    className={`font-display text-xs font-bold transition-colors ${
                      isSelected ? 'text-white' : 'text-zinc-400 group-hover:text-zinc-200'
                    }`}
                  >
                    {milestone.shortLabel}
                  </div>
                  <div className="text-[10px] font-mono text-zinc-400 flex items-center justify-center gap-1 mt-0.5">
                    {hasPhoto && <Camera className="w-2.5 h-2.5 text-amber-400" />}
                    <span>
                      {isCompleted
                        ? milestone.completedDate || 'Concluído'
                        : isDelayed
                        ? 'Pendente'
                        : isInProgress
                        ? 'Em andamento'
                        : `Dia ${milestone.recommendedDays}`}
                    </span>
                  </div>
                </div>

                {/* Active Indicator Ring */}
                {isSelected && (
                  <div
                    className="absolute -bottom-2 w-8 h-1 rounded-full"
                    style={{ backgroundColor: goldPrimary }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Stage Detailed Management Card */}
      <div className="w-full bg-[#0c0c10] border border-zinc-800 rounded-3xl p-5 sm:p-8 backdrop-blur-xl space-y-8 relative overflow-hidden">
        
        {/* Header of Active Stage */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-zinc-800/80">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span
                className={`px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider border flex items-center gap-1.5 ${
                  activeMilestone.status === 'concluido'
                    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                    : activeMilestone.status === 'atrasado'
                    ? 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                    : 'bg-amber-500/10 text-amber-300 border-amber-500/30'
                }`}
              >
                {activeMilestone.status === 'concluido' && <CheckCircle2 className="w-3.5 h-3.5" />}
                {activeMilestone.status === 'atrasado' && <AlertCircle className="w-3.5 h-3.5" />}
                {activeMilestone.status === 'em_andamento' && <Clock className="w-3.5 h-3.5" />}
                Status: {activeMilestone.status === 'concluido' ? 'Concluído' : activeMilestone.status === 'atrasado' ? 'Atrasado' : activeMilestone.status === 'em_andamento' ? 'Em Andamento' : 'Próxima Etapa'}
              </span>

              {activeMilestone.completedDate && (
                <span className="text-xs font-mono text-zinc-400">
                  Registrado em: {activeMilestone.completedDate}
                </span>
              )}
            </div>

            <h3 className="font-display text-xl sm:text-2xl font-bold text-white">
              {activeMilestone.title}
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 mt-1">
              {activeMilestone.clinicalGuidelines.phaseName} • {activeMilestone.clinicalGuidelines.description}
            </p>
          </div>

          {/* Quick Action Button: Toggle Milestone Concluded */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => handleToggleStatus(activeMilestone.stageKey)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 border cursor-pointer ${
                activeMilestone.status === 'concluido'
                  ? 'bg-zinc-900 border-zinc-700 text-zinc-300 hover:text-white'
                  : 'bg-emerald-600 hover:bg-emerald-500 text-white border-emerald-500 shadow-lg shadow-emerald-950/50'
              }`}
            >
              {activeMilestone.status === 'concluido' ? (
                <>
                  <RotateCcw className="w-3.5 h-3.5" />
                  Reabrir Etapa
                </>
              ) : (
                <>
                  <Check className="w-3.5 h-3.5" />
                  Marcar como Concluída
                </>
              )}
            </button>
          </div>
        </div>

        {/* 2-Column Content Grid: Left Photo Upload / Right Clinical Guidelines & Notes */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Column 1 (Left 5 cols): Photo Upload & Preview */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-display font-bold text-white flex items-center gap-2">
                <Camera className="w-4 h-4" style={{ color: goldPrimary }} />
                Fotografia da Etapa ({activeMilestone.shortLabel})
              </label>
              {activeMilestone.photoUrl && (
                <button
                  onClick={() => onOpenComparatorWithStage(activeMilestone.stageKey)}
                  className="text-xs text-amber-400 hover:text-amber-300 flex items-center gap-1 font-medium cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5" /> Comparar
                </button>
              )}
            </div>

            {/* Photo Container */}
            {activeMilestone.photoUrl ? (
              <div className="relative rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-950 group">
                <div className="aspect-[4/3] w-full flex items-center justify-center p-2">
                  <img
                    src={activeMilestone.photoUrl}
                    alt={`Foto de evolução ${activeMilestone.shortLabel}`}
                    className="w-full h-full object-contain rounded-xl"
                  />
                </div>

                {/* Hover Overlay Controls */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3 backdrop-blur-xs">
                  <button
                    onClick={() => {
                      setActiveUploadStage(activeMilestone.stageKey);
                      fileInputRef.current?.click();
                    }}
                    className="px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-bold flex items-center gap-1.5 border border-zinc-600 transition-colors cursor-pointer"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    Substituir
                  </button>
                  <button
                    onClick={() => handleRemovePhoto(activeMilestone.stageKey)}
                    className="px-3 py-1.5 rounded-lg bg-rose-900/80 hover:bg-rose-800 text-white text-xs font-bold flex items-center gap-1.5 border border-rose-700 transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    Remover
                  </button>
                </div>

                {/* Badge Bottom Corner */}
                <div className="absolute bottom-2 left-2 px-2.5 py-1 rounded-md bg-black/80 border border-zinc-700 text-[11px] font-mono text-zinc-300">
                  {activeMilestone.shortLabel} • {activeMilestone.completedDate || 'Registrado'}
                </div>
              </div>
            ) : (
              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragOver(true);
                }}
                onDragLeave={() => setIsDragOver(false)}
                onDrop={(e) => handleDrop(e, activeMilestone.stageKey)}
                onClick={() => {
                  setActiveUploadStage(activeMilestone.stageKey);
                  fileInputRef.current?.click();
                }}
                className={`aspect-[4/3] w-full rounded-2xl border-2 border-dashed flex flex-col items-center justify-center p-6 text-center transition-all cursor-pointer ${
                  isDragOver
                    ? 'border-[#D4AF37] bg-[#D4AF37]/10'
                    : 'border-zinc-800 hover:border-zinc-600 bg-zinc-950/60 hover:bg-zinc-900/40'
                }`}
              >
                <div className="w-12 h-12 rounded-full bg-zinc-900 border border-zinc-700 flex items-center justify-center text-zinc-400 mb-3 group-hover:text-white">
                  <Upload className="w-6 h-6" />
                </div>
                <p className="text-sm font-medium text-white">
                  Arraste ou clique para enviar a foto do {activeMilestone.shortLabel}
                </p>
                <p className="text-xs text-zinc-400 mt-1">
                  Formatos aceitos: JPG, PNG, WEBP (Máximo 5 MB)
                </p>
                <div className="mt-4 px-3 py-1 rounded-full bg-zinc-900/80 border border-zinc-800 text-[10px] font-mono text-zinc-400 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-emerald-400" />
                  Armazenada localmente e 100% privada
                </div>
              </div>
            )}

            {/* Error Message */}
            {uploadError && (
              <div className="p-3 rounded-xl bg-rose-950/50 border border-rose-800 text-rose-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{uploadError}</span>
              </div>
            )}
          </div>

          {/* Column 2 (Right 7 cols): Clinical Guidance & Evolution Notes */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Clinical Guidance Box */}
            <div className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800/90 space-y-4">
              <div className="flex items-center justify-between text-xs font-mono text-zinc-400 border-b border-zinc-800 pb-2">
                <span className="flex items-center gap-1.5 text-zinc-200 font-bold uppercase">
                  <Info className="w-4 h-4 text-[#D4AF37]" />
                  Guia Fisiológico desta Etapa
                </span>
                <span>Dia {activeMilestone.recommendedDays}</span>
              </div>

              <div>
                <h4 className="text-sm font-bold text-white">O que esperar nesta fase:</h4>
                <p className="text-xs sm:text-sm text-zinc-300 font-light mt-1 leading-relaxed">
                  {activeMilestone.clinicalGuidelines.whatToExpect}
                </p>
              </div>

              <div>
                <h4 className="text-sm font-bold text-white mb-2">Recomendações Práticas:</h4>
                <ul className="space-y-1.5 text-xs sm:text-sm text-zinc-400">
                  {activeMilestone.clinicalGuidelines.careTips.map((tip, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] mt-1.5 shrink-0" />
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Client Notes Textarea */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-display font-bold text-white flex items-center gap-2">
                  Anotações Pessoais & Sintomas ({activeMilestone.shortLabel})
                </label>
                {saveSuccessMap[activeMilestone.stageKey] && (
                  <span className="text-xs text-emerald-400 flex items-center gap-1 font-mono">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Salvo com sucesso!
                  </span>
                )}
              </div>

              <textarea
                value={
                  localNotes[activeMilestone.stageKey] !== undefined
                    ? localNotes[activeMilestone.stageKey]
                    : activeMilestone.notes || ''
                }
                onChange={(e) => {
                  const val = e.target.value;
                  setLocalNotes((prev) => ({ ...prev, [activeMilestone.stageKey]: val }));
                }}
                placeholder="Ex: Notei que os fios estão menos oleosos, menos queda no banho e fios novos nascendo na risca..."
                rows={3}
                className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-800 text-sm text-white placeholder-zinc-400 focus:outline-none focus:border-[#D4AF37] transition-colors resize-none"
              />

              <div className="flex justify-end">
                <button
                  onClick={() => handleSaveNotes(activeMilestone.stageKey)}
                  className="px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer border border-zinc-700"
                >
                  <Save className="w-3.5 h-3.5" />
                  Salvar Anotações
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
