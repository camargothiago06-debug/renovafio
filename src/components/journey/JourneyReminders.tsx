import React, { useState } from 'react';
import { CustomerJourneyProfile, GenderMode } from '../../types';
import {
  Clock,
  Camera,
  Package,
  UserCheck,
  Bell,
  CheckCircle2,
  AlertTriangle,
  Calendar,
  Sparkles,
  Edit2,
  ExternalLink,
} from 'lucide-react';

interface JourneyRemindersProps {
  profile: CustomerJourneyProfile;
  gender: GenderMode;
  onUpdateProfile: (updated: Partial<CustomerJourneyProfile>) => void;
  onNavigateToGallery: () => void;
  onNavigateToSpecialist: () => void;
}

export const JourneyReminders: React.FC<JourneyRemindersProps> = ({
  profile,
  gender,
  onUpdateProfile,
  onNavigateToGallery,
  onNavigateToSpecialist,
}) => {
  const isFemale = gender === 'feminino';
  const goldPrimary = isFemale ? '#E2A999' : '#D4AF37';

  const [isEditingTime, setIsEditingTime] = useState(false);
  const [newTime, setNewTime] = useState(profile.applicationTime);
  const [reminderSetToast, setReminderSetToast] = useState(false);

  const handleSaveTime = () => {
    onUpdateProfile({ applicationTime: newTime });
    setIsEditingTime(false);
    setReminderSetToast(true);
    setTimeout(() => setReminderSetToast(false), 3000);
  };

  // Remaining doses calculation percentage
  const dosesPercent = Math.round((profile.dosesRemaining / profile.totalDoses) * 100);
  const isLowSupply = profile.dosesRemaining <= 7;

  return (
    <div className="w-full space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h2 className="font-display text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
            <Bell className="w-5 h-5" style={{ color: goldPrimary }} />
            Lembretes & Monitoramento Ativo
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 font-light mt-0.5">
            Mantenha a regularidade do seu tratamento capilar com alertas programados e controle de estoque.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Reminder 1: Application Time */}
        <div className="p-5 rounded-2xl bg-[#0e0e13] border border-zinc-800 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
              <span className="flex items-center gap-1.5 text-amber-400 font-bold">
                <Clock className="w-4 h-4" />
                Dose Diária
              </span>
              <span className="px-2 py-0.5 rounded bg-zinc-800 text-[10px]">Rotina</span>
            </div>

            <div className="mt-3">
              {isEditingTime ? (
                <div className="flex items-center gap-2 mt-1">
                  <input
                    type="time"
                    value={newTime}
                    onChange={(e) => setNewTime(e.target.value)}
                    className="px-2 py-1 rounded-lg bg-zinc-900 border border-zinc-700 text-white font-mono text-sm"
                  />
                  <button
                    onClick={handleSaveTime}
                    className="px-2 py-1 rounded-lg bg-emerald-600 text-white text-xs font-bold"
                  >
                    Salvar
                  </button>
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-display text-2xl font-bold text-white">
                      {profile.applicationTime}
                    </div>
                    <p className="text-xs text-zinc-400">Tomar 1 dose de 450mg</p>
                  </div>
                  <button
                    onClick={() => setIsEditingTime(true)}
                    className="p-1.5 rounded-lg hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors"
                    title="Editar horário"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="pt-3 border-t border-zinc-800 text-[11px] text-zinc-400 flex items-center justify-between">
            <span>Água: 200ml</span>
            <span className="text-emerald-400 font-medium">Jejum ou café</span>
          </div>
        </div>

        {/* Reminder 2: Next Photo Date */}
        <div className="p-5 rounded-2xl bg-[#0e0e13] border border-zinc-800 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
              <span className="flex items-center gap-1.5 text-[#D4AF37] font-bold">
                <Camera className="w-4 h-4" />
                Próxima Fotografia
              </span>
              <span className="px-2 py-0.5 rounded bg-zinc-800 text-[10px]">Evolução</span>
            </div>

            <div className="mt-3">
              <div className="font-display text-2xl font-bold text-white">
                {profile.nextPhotoDate}
              </div>
              <p className="text-xs text-zinc-400">Registro fotográfico do mês</p>
            </div>
          </div>

          <div className="pt-3 border-t border-zinc-800 text-[11px] text-zinc-400 flex items-center justify-between">
            <span>Iluminação:</span>
            <span className="text-zinc-200">Luz natural constante</span>
          </div>
        </div>

        {/* Reminder 3: Treatment Supply & Refill */}
        <div className="p-5 rounded-2xl bg-[#0e0e13] border border-zinc-800 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
              <span className="flex items-center gap-1.5 text-sky-400 font-bold">
                <Package className="w-4 h-4" />
                Estoque do Frasco
              </span>
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${isLowSupply ? 'bg-rose-950 text-rose-300 border border-rose-800' : 'bg-zinc-800 text-zinc-300'}`}>
                {isLowSupply ? 'Estoque Baixo' : 'Em dia'}
              </span>
            </div>

            <div className="mt-3 space-y-1.5">
              <div className="flex items-baseline justify-between">
                <span className="font-display text-2xl font-bold text-white">
                  {profile.dosesRemaining} doses
                </span>
                <span className="text-xs font-mono text-zinc-400">de {profile.totalDoses}</span>
              </div>

              {/* Progress bar of supply */}
              <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all ${isLowSupply ? 'bg-rose-500' : 'bg-sky-400'}`}
                  style={{ width: `${dosesPercent}%` }}
                />
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-zinc-800 flex items-center justify-between">
            <span className="text-[11px] text-zinc-400">Previsão: {profile.refillDate}</span>
            <button
              onClick={onNavigateToGallery}
              className="text-[11px] text-amber-400 hover:underline font-bold flex items-center gap-1 cursor-pointer"
            >
              Repor frasco <ExternalLink className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Reminder 4: Clinical Evaluation */}
        <div className="p-5 rounded-2xl bg-[#0e0e13] border border-zinc-800 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
              <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
                <UserCheck className="w-4 h-4" />
                Avaliação Farmacêutica
              </span>
              <span className="px-2 py-0.5 rounded bg-zinc-800 text-[10px]">Gratuito</span>
            </div>

            <div className="mt-3">
              <div className="font-display text-2xl font-bold text-white">
                {profile.nextEvaluationDate}
              </div>
              <p className="text-xs text-zinc-400">Revisão do protocolo com tricologista</p>
            </div>
          </div>

          <div className="pt-3 border-t border-zinc-800 flex items-center justify-between">
            <span className="text-[11px] text-zinc-400">Canal: WhatsApp</span>
            <button
              onClick={onNavigateToSpecialist}
              className="text-[11px] text-emerald-400 hover:underline font-bold flex items-center gap-1 cursor-pointer"
            >
              Agendar <ExternalLink className="w-3 h-3" />
            </button>
          </div>
        </div>

      </div>

      {reminderSetToast && (
        <div className="p-3 rounded-xl bg-emerald-950/80 border border-emerald-800 text-emerald-300 text-xs flex items-center gap-2 font-medium">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          Horário de aplicação atualizado com sucesso!
        </div>
      )}
    </div>
  );
};
