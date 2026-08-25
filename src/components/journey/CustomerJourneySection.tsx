import React, { useState, useEffect } from 'react';
import { CustomerJourneyProfile, GenderMode, JourneyMilestone, TabType } from '../../types';
import {
  createDemoProfile,
  loadCustomerJourney,
  saveCustomerJourney,
} from '../../data/journeyData';
import { JourneyDashboardHeader } from './JourneyDashboardHeader';
import { JourneyTimeline } from './JourneyTimeline';
import { JourneyVisualComparator } from './JourneyVisualComparator';
import { JourneyReminders } from './JourneyReminders';
import { JourneyHistorySection } from './JourneyHistorySection';
import { JourneyActionCards } from './JourneyActionCards';
import { Sparkles, Calendar, Layers, Bell, History, ArrowRight } from 'lucide-react';

interface CustomerJourneySectionProps {
  gender: GenderMode;
  onSelectTab: (tab: TabType) => void;
}

export const CustomerJourneySection: React.FC<CustomerJourneySectionProps> = ({
  gender,
  onSelectTab,
}) => {
  const isFemale = gender === 'feminino';
  const goldPrimary = isFemale ? '#E2A999' : '#D4AF37';

  const [profile, setProfile] = useState<CustomerJourneyProfile>(() =>
    loadCustomerJourney(gender)
  );

  const [selectedStageKey, setSelectedStageKey] = useState<
    CustomerJourneyProfile['currentStageKey']
  >(profile.currentStageKey || 'mes03');

  const [activeSubView, setActiveSubView] = useState<'timeline' | 'comparator' | 'history' | 'reminders'>('timeline');

  // Reload or adapt profile when gender changes
  useEffect(() => {
    const loaded = loadCustomerJourney(gender);
    setProfile(loaded);
    setSelectedStageKey(loaded.currentStageKey || 'mes03');
  }, [gender]);

  // Save to localStorage on profile change
  const handleUpdateProfile = (updated: Partial<CustomerJourneyProfile>) => {
    setProfile((prev) => {
      const next = { ...prev, ...updated };
      saveCustomerJourney(next);
      return next;
    });
  };

  const handleUpdateMilestone = (
    stageKey: CustomerJourneyProfile['currentStageKey'],
    updated: Partial<JourneyMilestone>
  ) => {
    setProfile((prev) => {
      const milestones = prev.milestones.map((m) =>
        m.stageKey === stageKey ? { ...m, ...updated } : m
      );
      const next = { ...prev, milestones };
      saveCustomerJourney(next);
      return next;
    });
  };

  const handleSelectPreset = (
    preset: '3_meses' | 'novo_cliente' | 'atrasado' | 'completo'
  ) => {
    const newProfile = createDemoProfile(gender, preset);
    setProfile(newProfile);
    setSelectedStageKey(newProfile.currentStageKey);
    saveCustomerJourney(newProfile);
  };

  const handleOpenComparatorWithStage = (
    stageKey: CustomerJourneyProfile['currentStageKey']
  ) => {
    setActiveSubView('comparator');
    window.scrollTo({ top: 400, behavior: 'smooth' });
  };

  return (
    <section className="w-full py-8 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
      
      {/* 1. Dashboard Top Header & Profile Overview */}
      <JourneyDashboardHeader
        profile={profile}
        gender={gender}
        onUpdateProfile={handleUpdateProfile}
        onSelectPreset={handleSelectPreset}
        onSelectStage={(stageKey) => {
          setSelectedStageKey(stageKey);
          setActiveSubView('timeline');
        }}
      />

      {/* Sub-Navigation Tabs inside Journey Area */}
      <div className="flex items-center justify-start sm:justify-center overflow-x-auto no-scrollbar gap-2.5 p-2 rounded-2xl bg-[#0b0b0f] border border-zinc-800">
        <button
          onClick={() => setActiveSubView('timeline')}
          className={`px-5 py-3 rounded-xl text-sm sm:text-base font-bold transition-all flex items-center gap-2.5 shrink-0 cursor-pointer ${
            activeSubView === 'timeline'
              ? 'bg-zinc-800 text-white shadow-md border border-zinc-700'
              : 'text-zinc-400 hover:text-zinc-200'
          }`}
        >
          <Calendar className="w-5 h-5" style={activeSubView === 'timeline' ? { color: goldPrimary } : {}} />
          <span>Linha do Tempo</span>
        </button>

        <button
          onClick={() => setActiveSubView('comparator')}
          className={`px-5 py-3 rounded-xl text-sm sm:text-base font-bold transition-all flex items-center gap-2.5 shrink-0 cursor-pointer ${
            activeSubView === 'comparator'
              ? 'bg-zinc-800 text-white shadow-md border border-zinc-700'
              : 'text-zinc-400 hover:text-zinc-200'
          }`}
        >
          <Layers className="w-5 h-5" style={activeSubView === 'comparator' ? { color: goldPrimary } : {}} />
          <span>Comparador de Evolução</span>
        </button>

        <button
          onClick={() => setActiveSubView('reminders')}
          className={`px-5 py-3 rounded-xl text-sm sm:text-base font-bold transition-all flex items-center gap-2.5 shrink-0 cursor-pointer ${
            activeSubView === 'reminders'
              ? 'bg-zinc-800 text-white shadow-md border border-zinc-700'
              : 'text-zinc-400 hover:text-zinc-200'
          }`}
        >
          <Bell className="w-5 h-5" style={activeSubView === 'reminders' ? { color: goldPrimary } : {}} />
          <span>Lembretes & Posologia</span>
        </button>

        <button
          onClick={() => setActiveSubView('history')}
          className={`px-5 py-3 rounded-xl text-sm sm:text-base font-bold transition-all flex items-center gap-2.5 shrink-0 cursor-pointer ${
            activeSubView === 'history'
              ? 'bg-zinc-800 text-white shadow-md border border-zinc-700'
              : 'text-zinc-400 hover:text-zinc-200'
          }`}
        >
          <History className="w-5 h-5" style={activeSubView === 'history' ? { color: goldPrimary } : {}} />
          <span>Histórico & Relatório</span>
        </button>
      </div>

      {/* Dynamic Sub-View Content */}
      <div className="w-full transition-all duration-300">
        {activeSubView === 'timeline' && (
          <div className="space-y-12">
            <JourneyTimeline
              profile={profile}
              gender={gender}
              selectedStageKey={selectedStageKey}
              onSelectStageKey={setSelectedStageKey}
              onUpdateMilestone={handleUpdateMilestone}
              onOpenComparatorWithStage={handleOpenComparatorWithStage}
            />

            {/* Also show Visual Comparator below Timeline for convenience */}
            <div className="pt-8 border-t border-zinc-800/80">
              <JourneyVisualComparator
                profile={profile}
                gender={gender}
                initialBeforeStage="dia01"
                initialAfterStage={selectedStageKey}
                onOpenStageToUpload={(key) => {
                  setSelectedStageKey(key);
                  setActiveSubView('timeline');
                  window.scrollTo({ top: 300, behavior: 'smooth' });
                }}
              />
            </div>
          </div>
        )}

        {activeSubView === 'comparator' && (
          <JourneyVisualComparator
            profile={profile}
            gender={gender}
            initialBeforeStage="dia01"
            initialAfterStage={selectedStageKey}
            onOpenStageToUpload={(key) => {
              setSelectedStageKey(key);
              setActiveSubView('timeline');
            }}
          />
        )}

        {activeSubView === 'reminders' && (
          <JourneyReminders
            profile={profile}
            gender={gender}
            onUpdateProfile={handleUpdateProfile}
            onNavigateToGallery={() => onSelectTab('galeria')}
            onNavigateToSpecialist={() => {
              const msg = encodeURIComponent(
                `Olá! Sou ${profile.customerName}, em tratamento com ${profile.protocolName} (${profile.currentMonth}º mês), e gostaria de agendar minha avaliação farmacêutica periódica.`
              );
              window.open(`https://wa.me/5511999999999?text=${msg}`, '_blank');
            }}
          />
        )}

        {activeSubView === 'history' && (
          <JourneyHistorySection
            profile={profile}
            gender={gender}
            onOpenStage={(key) => {
              setSelectedStageKey(key);
              setActiveSubView('timeline');
            }}
            onOpenComparator={() => setActiveSubView('comparator')}
          />
        )}
      </div>

      {/* Shared Action Cards & Concierge Section at Bottom */}
      <JourneyActionCards
        profile={profile}
        gender={gender}
        onNavigateToGallery={() => onSelectTab('galeria')}
        onNavigateToPricing={() => onSelectTab('protocolos')}
      />

    </section>
  );
};
