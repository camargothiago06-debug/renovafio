import { CustomerJourneyProfile, GenderMode, JourneyMilestone } from '../types';

export const INITIAL_MILESTONES_CONFIG: Omit<JourneyMilestone, 'id' | 'status' | 'photoUrl' | 'notes' | 'completedDate' | 'expectedDate'>[] = [
  {
    stageKey: 'dia01',
    title: 'Dia 01 — Registro Inicial de Base',
    shortLabel: 'Dia 01',
    recommendedDays: 0,
    clinicalGuidelines: {
      phaseName: 'Fase de Calibração Folicular',
      description: 'Marco zero do tratamento capilar. O ponto fundamental para comparar densidade, calibre dos fios e áreas de rarefação.',
      whatToExpect: 'Início da absorção sistêmica dos 4 ativos. O bulbo capilar começa a receber nutrição intensificada e bloqueio de DHT.',
      careTips: [
        'Tire a foto com luz natural ou iluminação de teto direta, sem flash reflexivo.',
        'Mantenha o cabelo seco e penteado da mesma forma nos próximos registros.',
        'Tome 1 dose de 450mg sempre no mesmo horário com água.',
      ],
    },
  },
  {
    stageKey: 'mes01',
    title: '1º Mês — Estabilização e Queda Transitória',
    shortLabel: '1º Mês',
    recommendedDays: 30,
    clinicalGuidelines: {
      phaseName: 'Fase de Purificação (Shedding Fisiológico)',
      description: 'Adaptação do ciclo anágeno. Fios telógenos enfraquecidos se desprendem para dar lugar a novos fios terminais.',
      whatToExpect: 'Pode ocorrer uma leve queda temporária (efeito shedding benéfico), sinalizando que os folículos estão reiniciando o ciclo de crescimento.',
      careTips: [
        'Não interrompa o tratamento: o shedding é o maior sinal de resposta folicular.',
        'Mantenha o couro cabeludo limpo e higienizado.',
        'Fotografe o mesmo ângulo do vértice e entradas para comparar a raiz.',
      ],
    },
  },
  {
    stageKey: 'mes03',
    title: '3º Mês — Reativação Folicular e Espessamento',
    shortLabel: '3º Mês',
    recommendedDays: 90,
    clinicalGuidelines: {
      phaseName: 'Fase Anágena Ativa & Fechamento Inicial',
      description: 'Primeira janela clínica de resultados visíveis. Aumento expressivo de folículos anágenos e espessamento da haste.',
      whatToExpect: 'Fim completo da queda diária excessiva. Surgimento de novos fios finos (velus) evoluindo para fios terminais mais escuros e resistentes.',
      careTips: [
        'Compare a foto com o Dia 01 no Comparador Visual.',
        'Observe a diminuição do couro cabeludo visível sob luz direta.',
        'Se seu frasco estiver no fim, solicite a reposição com 10 dias de antecedência.',
      ],
    },
  },
  {
    stageKey: 'mes06',
    title: '6º Mês — Consolidação e Densidade Notória',
    shortLabel: '6º Mês',
    recommendedDays: 180,
    clinicalGuidelines: {
      phaseName: 'Fase de Densificação e Cobertura',
      description: 'Pico de densificação capilar. Os novos fios atingem comprimento e espessura com volume notável no vértice e coroa.',
      whatToExpect: 'Cobertura homogênea das áreas previamente calvas ou rarefeitas. Sensação de cabelo encorpado e volumoso.',
      careTips: [
        'Faça sua avaliação semestral com o suporte farmacêutico.',
        'Realize corte de manutenção para valorizar os novos fios.',
        'Mantenha a consistência da dose diária para preservar a densidade.',
      ],
    },
  },
  {
    stageKey: 'mes11',
    title: '11º Mês — Transformação Plena e Maturação',
    shortLabel: '11º Mês',
    recommendedDays: 330,
    clinicalGuidelines: {
      phaseName: 'Fase de Manutenção e Maturação Terminal',
      description: 'Ciclo completo de renovação folicular atingido com máxima densidade, textura fortificada e volume exuberante.',
      whatToExpect: 'Resultado capilar consolidado e estável. Autoestima renovada e moldura facial restaurada.',
      careTips: [
        'Celebre sua transformação gerando seu relatório comparativo completo.',
        'Consulte a equipe para definir o plano de manutenção contínua.',
      ],
    },
  },
];

export function createDemoProfile(
  gender: GenderMode,
  preset: '3_meses' | 'novo_cliente' | 'atrasado' | 'completo' = '3_meses'
): CustomerJourneyProfile {
  const isFemale = gender === 'feminino';

  const baseProtocol = isFemale
    ? 'Protocolo Regenerador Feminino 450mg (Nutricolin + Biotina)'
    : 'Protocolo Tripla Ação Masculino 450mg (Dutasterida + Minoxidil)';

  const customerName = isFemale ? 'Mariana Silva' : 'Marcelo V.';

  // Milestone building helper
  const buildMilestones = (
    statuses: ('concluido' | 'em_andamento' | 'proximo' | 'atrasado')[],
    dates: (string | undefined)[],
    photos: (string | undefined)[],
    notes: (string | undefined)[]
  ): JourneyMilestone[] => {
    return INITIAL_MILESTONES_CONFIG.map((conf, index) => ({
      ...conf,
      id: `milestone-${conf.stageKey}-${gender}`,
      status: statuses[index] || 'proximo',
      completedDate: dates[index],
      photoUrl: photos[index],
      notes: notes[index],
    }));
  };

  if (preset === 'novo_cliente') {
    return {
      id: `profile-${gender}-new`,
      customerName: isFemale ? 'Nova Cliente' : 'Novo Cliente',
      gender,
      protocolName: baseProtocol,
      startDate: new Date().toISOString().split('T')[0],
      currentMonth: 1,
      currentStageKey: 'dia01',
      applicationTime: '08:00',
      nextPhotoDate: new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0],
      refillDate: new Date(Date.now() + 25 * 86400000).toISOString().split('T')[0],
      nextEvaluationDate: new Date(Date.now() + 15 * 86400000).toISOString().split('T')[0],
      dosesRemaining: 30,
      totalDoses: 30,
      consentAccepted: true,
      milestones: buildMilestones(
        ['em_andamento', 'proximo', 'proximo', 'proximo', 'proximo'],
        [undefined, undefined, undefined, undefined, undefined],
        [undefined, undefined, undefined, undefined, undefined],
        ['Iniciando hoje o protocolo com muita expectativa. Couro cabeludo bem limpo.', undefined, undefined, undefined, undefined]
      ),
    };
  }

  if (preset === 'atrasado') {
    return {
      id: `profile-${gender}-delayed`,
      customerName,
      gender,
      protocolName: baseProtocol,
      startDate: '2026-03-10',
      currentMonth: 4,
      currentStageKey: 'mes03',
      applicationTime: '08:30',
      nextPhotoDate: '2026-06-10',
      refillDate: '2026-06-05',
      nextEvaluationDate: '2026-06-15',
      dosesRemaining: 0,
      totalDoses: 30,
      consentAccepted: true,
      milestones: buildMilestones(
        ['concluido', 'concluido', 'atrasado', 'proximo', 'proximo'],
        ['10/03/2026', '10/04/2026', undefined, undefined, undefined],
        ['/images/foto-resultado-3-meses.png', undefined, undefined, undefined, undefined],
        [
          'Foto inicial tirada no consultório. Rarefação no redemoinho.',
          'Queda normalizou. Fios mais firmes na escovação.',
          'Pendente envio de foto e reposição do frasco do 4º mês.',
          undefined,
          undefined,
        ]
      ),
    };
  }

  if (preset === 'completo') {
    return {
      id: `profile-${gender}-full`,
      customerName,
      gender,
      protocolName: baseProtocol,
      startDate: '2025-09-01',
      currentMonth: 11,
      currentStageKey: 'mes11',
      applicationTime: '08:00',
      nextPhotoDate: 'Concluído',
      refillDate: 'Plano de Manutenção',
      nextEvaluationDate: '2026-09-01',
      dosesRemaining: 28,
      totalDoses: 30,
      consentAccepted: true,
      milestones: buildMilestones(
        ['concluido', 'concluido', 'concluido', 'concluido', 'concluido'],
        ['01/09/2025', '01/10/2025', '01/12/2025', '01/03/2026', '01/08/2026'],
        [
          '/images/foto-resultado-3-meses.png',
          '/images/foto-resultado-3-meses.png',
          '/images/foto-resultado-3-meses.png',
          '/images/foto-resultado-11-meses.png',
          '/images/foto-resultado-11-meses.png',
        ],
        [
          'Registro do primeiro dia.',
          'Fim da fase de shedding. Primeiros fios novos perceptíveis.',
          'Fechamento nítido do vértice, fios muito mais escuros e volumosos.',
          'Densidade superior a 80%. Couro cabeludo coberto.',
          'Transformação completa! Resultado consolidado e maravilhoso.',
        ]
      ),
    };
  }

  // Default preset: 3_meses (Active in Month 3 with evolution documented)
  return {
    id: `profile-${gender}-active3m`,
    customerName,
    gender,
    protocolName: baseProtocol,
    startDate: '2026-05-15',
    currentMonth: 3,
    currentStageKey: 'mes03',
    applicationTime: '08:00',
    nextPhotoDate: '15/08/2026',
    refillDate: '10/09/2026',
    nextEvaluationDate: '20/09/2026',
    dosesRemaining: 18,
    totalDoses: 30,
    consentAccepted: true,
    milestones: buildMilestones(
      ['concluido', 'concluido', 'em_andamento', 'proximo', 'proximo'],
      ['15/05/2026', '15/06/2026', undefined, undefined, undefined],
      [
        '/images/foto-resultado-3-meses.png',
        '/images/foto-resultado-3-meses.png',
        '/images/foto-resultado-3-meses.png',
        undefined,
        undefined,
      ],
      [
        'Dia 01: Foto registrada na clínica. Rarefação no vértice e entradas visíveis.',
        '1º Mês: Queda estabilizada. Pequenos fios velus nascendo na área da coroa.',
        '3º Mês: Preenchimento acelerado! Densidade visivelmente maior sob a luz.',
        undefined,
        undefined,
      ]
    ),
  };
}

export const STORAGE_KEY_JOURNEY = 'renova_customer_journey_v1';

export function loadCustomerJourney(gender: GenderMode): CustomerJourneyProfile {
  try {
    const saved = localStorage.getItem(`${STORAGE_KEY_JOURNEY}_${gender}`);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed && parsed.milestones && parsed.milestones.length === 5) {
        return parsed;
      }
    }
  } catch (e) {
    console.error('Error loading customer journey from localStorage', e);
  }
  return createDemoProfile(gender, '3_meses');
}

export function saveCustomerJourney(profile: CustomerJourneyProfile): void {
  try {
    localStorage.setItem(`${STORAGE_KEY_JOURNEY}_${profile.gender}`, JSON.stringify(profile));
  } catch (e) {
    console.error('Error saving customer journey to localStorage', e);
  }
}
