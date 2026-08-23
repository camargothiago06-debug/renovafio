import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GenderMode, Plan } from '../types';
import { QUIZ_QUESTIONS, TREATMENT_PLANS } from '../data/productData';
import confetti from 'canvas-confetti';
import { X, Sparkles, CheckCircle2, ArrowRight, ShieldCheck, Zap, RefreshCw, Award, ChevronLeft } from 'lucide-react';

interface DiagnosticQuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  gender: GenderMode;
  onSelectPlan: (plan: Plan) => void;
}

export const DiagnosticQuizModal: React.FC<DiagnosticQuizModalProps> = ({
  isOpen,
  onClose,
  gender,
  onSelectPlan,
}) => {
  const isFemale = gender === 'feminino';
  const questions = QUIZ_QUESTIONS[gender];
  const plans = TREATMENT_PLANS[gender];

  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isCalculating, setIsCalculating] = useState(false);
  const [calculationStepText, setCalculationStepText] = useState('Analisando perfil biológico...');
  const [isFinished, setIsFinished] = useState(false);

  const goldPrimary = isFemale ? '#E2A999' : '#D4AF37';

  const handleSelectOption = (questionId: string, optionId: string) => {
    const nextAnswers = { ...answers, [questionId]: optionId };
    setAnswers(nextAnswers);

    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Completed all questions -> calculate
      setIsCalculating(true);
      setTimeout(() => setCalculationStepText('Mapeando receptores foliculares...'), 700);
      setTimeout(() => setCalculationStepText('Calibrando proporção dos 4 ativos de 450mg...'), 1400);
      setTimeout(() => setCalculationStepText('Finalizando laudo tricilógico personalizado...'), 2100);
      setTimeout(() => {
        setIsCalculating(false);
        setIsFinished(true);
        try {
          confetti({
            particleCount: 70,
            spread: 60,
            origin: { y: 0.6 },
            colors: isFemale ? ['#e2a999', '#dfb775', '#ffffff'] : ['#d4af37', '#fae596', '#ffffff'],
          });
        } catch (e) {
          // ignore
        }
      }, 2800);
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setAnswers({});
    setIsCalculating(false);
    setIsFinished(false);
  };

  if (!isOpen) return null;

  const currentQ = questions[currentStep];
  const progressPercent = ((currentStep + 1) / questions.length) * 100;
  const recommendedPlan = plans[1] || plans[0]; // 3 Meses Reativação

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xl p-4 sm:p-6 flex items-center justify-center overflow-y-auto">
      <div className="absolute inset-0" onClick={onClose} />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative z-10 w-full max-w-2xl bg-[#111115] border border-zinc-800 rounded-3xl p-6 sm:p-10 shadow-2xl overflow-hidden"
      >
        {/* Top bar */}
        <div className="flex items-center justify-between pb-4 border-b border-zinc-800/80">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-4 h-4" style={{ color: goldPrimary }} />
            <span className="text-xs font-mono uppercase tracking-widest text-zinc-300">
              Diagnóstico Capilar Sob Medida ({isFemale ? 'Feminino' : 'Masculino'})
            </span>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full border border-zinc-700 flex items-center justify-center text-zinc-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* State 1: Active Questions */}
        {!isCalculating && !isFinished && (
          <div className="py-6 space-y-6">
            {/* Progress Bar */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-[11px] font-mono text-zinc-400">
                <span>Pergunta {currentStep + 1} de {questions.length}</span>
                <span>{Math.round(progressPercent)}% Concluído</span>
              </div>
              <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full transition-all duration-300"
                  style={{
                    width: `${progressPercent}%`,
                    backgroundColor: goldPrimary,
                  }}
                />
              </div>
            </div>

            {/* Question Title & Subtitle */}
            <div className="space-y-1">
              <h3 className="font-display font-bold text-xl sm:text-2xl text-white">
                {currentQ.title}
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400 font-light">
                {currentQ.subtitle}
              </p>
            </div>

            {/* Options */}
            <div className="space-y-3 pt-2">
              {currentQ.options.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => handleSelectOption(currentQ.id, opt.id)}
                  className="w-full p-4 rounded-2xl bg-zinc-900/60 hover:bg-zinc-900 border border-zinc-800 hover:border-zinc-600 text-left transition-all group flex items-center justify-between"
                >
                  <div>
                    <p className="text-sm font-semibold text-white group-hover:text-[#fae596] transition-colors">
                      {opt.label}
                    </p>
                    {opt.description && (
                      <p className="text-xs text-zinc-400 mt-0.5">{opt.description}</p>
                    )}
                  </div>
                  <ArrowRight className="w-4 h-4 text-zinc-600 group-hover:text-white transition-colors shrink-0 ml-3" />
                </button>
              ))}
            </div>

            {/* Back Button if not first step */}
            {currentStep > 0 && (
              <button
                onClick={() => setCurrentStep(currentStep - 1)}
                className="inline-flex items-center space-x-1 text-xs text-zinc-400 hover:text-zinc-200 transition-colors pt-2"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Voltar à pergunta anterior</span>
              </button>
            )}
          </div>
        )}

        {/* State 2: Calculating Telemetry */}
        {isCalculating && (
          <div className="py-16 flex flex-col items-center justify-center text-center space-y-6">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
              className="w-16 h-16 rounded-full border-2 border-t-transparent flex items-center justify-center"
              style={{
                borderColor: `${goldPrimary}30`,
                borderTopColor: goldPrimary,
              }}
            >
              <Zap className="w-6 h-6" style={{ color: goldPrimary }} />
            </motion.div>

            <div className="space-y-2">
              <h4 className="font-display font-bold text-lg text-white">
                Processando Algoritmo Tricológico
              </h4>
              <p className="text-xs font-mono text-zinc-400 animate-pulse">
                {calculationStepText}
              </p>
            </div>
          </div>
        )}

        {/* State 3: Diagnosis & Prescribed Protocol Result */}
        {isFinished && (
          <div className="py-6 space-y-6">
            {/* Header Badge */}
            <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-2">
              <div className="flex items-center space-x-2 text-xs font-mono text-emerald-400">
                <CheckCircle2 className="w-4 h-4" />
                <span>Laudo Clínico Gerado com Sucesso</span>
              </div>
              <h3 className="font-display font-bold text-xl sm:text-2xl text-white">
                Seu Protocolo Recomendado: {recommendedPlan.title} (3 Meses)
              </h3>
              <p className="text-xs text-zinc-300">
                Com base no seu perfil, sua calvície/afinamento encontra-se em estágio reversível. A dose diária concentrada de 450mg neutralizará o processo de miniaturização e reativará os bulbos capilares dormentes.
              </p>
            </div>

            {/* Timeline Forecast Curve */}
            <div className="p-4 rounded-2xl bg-[#16161b] border border-zinc-800 space-y-3">
              <p className="text-xs font-mono uppercase tracking-wider text-zinc-400">
                Linha do Tempo de Recuperação Estimada:
              </p>
              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                <div className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800">
                  <p className="font-bold text-white">Mês 1</p>
                  <p className="text-[11px] text-zinc-400 mt-1">Interrupção total da queda</p>
                </div>
                <div className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800">
                  <p className="font-bold text-white">Mês 3</p>
                  <p className="text-[11px] text-[#fae596] mt-1">Novos fios na coroa e entradas</p>
                </div>
                <div className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800">
                  <p className="font-bold text-white">Mês 6</p>
                  <p className="text-[11px] text-emerald-400 mt-1">Densidade máxima consolidada</p>
                </div>
              </div>
            </div>

            {/* Prescribed Plan Summary Card */}
            <div
              className="p-5 rounded-2xl border flex flex-col sm:flex-row items-center justify-between gap-4"
              style={{
                borderColor: `${goldPrimary}50`,
                backgroundColor: `${goldPrimary}10`,
              }}
            >
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400">
                  Protocolo 3 Meses • 180 Cápsulas 450mg
                </span>
                <p className="text-2xl font-bold font-mono text-white mt-0.5">
                  R$ {recommendedPlan.totalPrice.toFixed(2)}
                </p>
                <p className="text-xs font-mono text-zinc-300">
                  ou {recommendedPlan.installments} (Frete Grátis Incluso)
                </p>
              </div>

              <button
                onClick={() => {
                  onSelectPlan(recommendedPlan);
                  onClose();
                }}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl font-display font-semibold text-xs tracking-wider uppercase flex items-center justify-center space-x-2 shadow-xl hover:scale-105 transition-all"
                style={{
                  background: isFemale
                    ? 'linear-gradient(135deg, #E2A999 0%, #B86B77 100%)'
                    : 'linear-gradient(135deg, #D4AF37 0%, #AA771C 100%)',
                  color: '#000',
                }}
              >
                <Sparkles className="w-4 h-4" />
                <span>Iniciar Tratamento Agora</span>
              </button>
            </div>

            {/* Restart button */}
            <div className="flex justify-center">
              <button
                onClick={handleReset}
                className="text-xs font-mono text-zinc-500 hover:text-zinc-300 transition-colors flex items-center space-x-1"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Refazer diagnóstico com outras respostas</span>
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};
