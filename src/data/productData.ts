import { ClinicalCase, GenderMode, Ingredient, Plan, Product, QuizQuestion } from '../types';

export const GENDER_CONFIG: Record<GenderMode, {
  label: string;
  themeName: string;
  heroHeadline: string;
  heroSubheadline: string;
  heroBadge: string;
  heroQuote: string;
  formulaSubtitle: string;
  targetProblem: string;
  primaryAccent: string;
  accentBg: string;
  goldGradient: string;
  badgeStyle: string;
  resultsStat1: { value: string; label: string };
  resultsStat2: { value: string; label: string };
  resultsStat3: { value: string; label: string };
}> = {
  masculino: {
    label: 'Masculino',
    themeName: 'Noir Titanium & Ouro Real',
    heroHeadline: 'RENOVE SUA AUTOESTIMA COM PRECISÃO CLÍNICA',
    heroSubheadline: 'A fórmula manipulada em dose única diária que neutraliza o DHT na raiz, reativa folículos miniaturizados e devolve a densidade capilar com tecnologia farmacêutica de ponta.',
    heroBadge: 'Fórmula 450mg Concentrada • Dose Única',
    heroQuote: '“Trata a queda de cabelo, renova os fios e eleva sua confiança diária.”',
    formulaSubtitle: 'Tratamento oral manipulado com 4 potentes ativos para reversão da calvície androgênica masculina.',
    targetProblem: 'Calvície Androgênica • Entradas • Coroa Miniaturizada',
    primaryAccent: '#D4AF37',
    accentBg: 'rgba(212, 175, 55, 0.1)',
    goldGradient: 'from-[#FFF0D0] via-[#D4AF37] to-[#AA771C]',
    badgeStyle: 'border-[#D4AF37]/40 bg-[#17140e] text-[#fae596]',
    resultsStat1: { value: '96.4%', label: 'Redução expressiva da queda em 30 dias' },
    resultsStat2: { value: '88.9%', label: 'Novos fios visíveis na coroa e entradas aos 90 dias' },
    resultsStat3: { value: '+44%', label: 'Aumento na espessura e diâmetro dos fios' },
  },
  feminino: {
    label: 'Feminino',
    themeName: 'Rose Velvet & Ouro Champagne',
    heroHeadline: 'CABELOS VOLUMOSOS, DENSOS E RADIANTES',
    heroSubheadline: 'O protocolo de alta tricologia feminina formulado para frear o eflúvio telógeno, preencher a risca central e multiplicar a densidade capilar com nutrição celular profunda.',
    heroBadge: 'Fórmula Nutri-Capilar 450mg • Hipoalergênica',
    heroQuote: '“Resgate o volume supremo, o brilho espelhado e a força incomparável dos seus fios.”',
    formulaSubtitle: 'Equilíbrio hormonal sutil, silício orgânico e bioestimuladores celulares para fios plenos e volumosos.',
    targetProblem: 'Eflúvio Telógeno • Raleamento Central • Quebra e Perda de Volume',
    primaryAccent: '#E2A999',
    accentBg: 'rgba(226, 169, 153, 0.12)',
    goldGradient: 'from-[#FFF2F0] via-[#E2A999] to-[#DFB775]',
    badgeStyle: 'border-[#E2A999]/40 bg-[#1c1417] text-[#ffdcd3]',
    resultsStat1: { value: '98.1%', label: 'Cessação da queda excessiva ao lavar e pentear' },
    resultsStat2: { value: '91.7%', label: 'Recuperação visível da densidade na risca do cabelo' },
    resultsStat3: { value: '+52%', label: 'Mais brilho, força elástica e resistência à quebra' },
  }
};

export const MALE_INGREDIENTS: Ingredient[] = [
  {
    id: 'dutasterida',
    code: '01',
    name: 'Dutasterida',
    dosage: '0.5 mg',
    description: 'Inibe as isoenzimas tipo 1 e tipo 2 da 5-alfa-redutase, bloqueando a conversão de testosterona em DHT — o hormônio responsável pela miniaturização e morte dos folículos capilares.',
    mechanism: 'Bloqueio seletivo do DHT folicular com eficácia até 3x superior à finasterida clássica.',
    benefit: 'Interrompe a queda genética na raiz e estabiliza a linha frontal e coroa.',
    clinicalStat: '93% de inibição de DHT no couro cabeludo'
  },
  {
    id: 'minoxidil',
    code: '02',
    name: 'Minoxidil Oral Micronizado',
    dosage: '2.5 mg',
    description: 'Amplifica o calibre dos microvasos sanguíneos peribulbares, multiplicando a oxigenação celular e prolongando a fase anágena (crescimento ativo dos fios).',
    mechanism: 'Abertura dos canais de potássio dependentes de ATP nos folículos capilares.',
    benefit: 'Reativa folículos dormentes e transforma penugens fracas em fios grossos e terminais.',
    clinicalStat: '89% de ativação de novos folículos funcionais'
  },
  {
    id: 'biotina',
    code: '03',
    name: 'Biotina Ultra-Pura',
    dosage: '5.0 mg',
    description: 'Coenzima essencial para a síntese estrutural de queratina alfa, fortalecendo as ligações de dissulfeto no córtex capilar.',
    mechanism: 'Carboxilação enzimática para regeneração da matriz queratinosa do fio.',
    benefit: 'Fios muito mais resistentes à tração, reduzindo quebra e bifurcações.',
    clinicalStat: '+47% de resistência tênsil da fibra capilar'
  },
  {
    id: 'cianocobalamina',
    code: '04',
    name: 'Cianocobalamina (Vitamina B12)',
    dosage: '1000 mcg',
    description: 'Nutriente vital que potencializa a produção de eritrócitos e o metabolismo energético celular na papila dérmica folicular.',
    mechanism: 'Aceleração mitocondrial na papila dérmica e transporte otimizado de oxigênio.',
    benefit: 'Energiza a raiz capilar, prolongando a vida útil de cada fio no couro cabeludo.',
    clinicalStat: '2.4x mais oxigênio disponível para a matriz folicular'
  }
];

export const FEMALE_INGREDIENTS: Ingredient[] = [
  {
    id: 'espironolactona',
    code: '01',
    name: 'Espironolactona / Saw Palmetto Ultra',
    dosage: '25 mg / 160 mg',
    description: 'Bloqueio suave e específico de andrógenos periféricos nos folículos femininos, impedindo o afinamento difuso e preservando a densidade natural sem desregulação menstrual.',
    mechanism: 'Competição seletiva por receptores androgênicos no folículo piloso feminino.',
    benefit: 'Combate o afinamento da risca central e preserva a massa capilar global.',
    clinicalStat: '95% de retenção da densidade na risca média'
  },
  {
    id: 'minoxidil-fem',
    code: '02',
    name: 'Minoxidil Oral Micronizado Feminino',
    dosage: '1.0 mg',
    description: 'Dose balanceada com precisão para a biofísica capilar feminina, garantindo ativação folicular máxima sem hipertricose ou retenção hídrica.',
    mechanism: 'Hiperpolarização da membrana vascular periférica do bulbo capilar.',
    benefit: 'Acelera o surgimento de novos fios aveludados e encorpados desde o 1º mês.',
    clinicalStat: '87% de novos fios visíveis nos primeiros 60 dias'
  },
  {
    id: 'nutricolin-silicio',
    code: '03',
    name: 'Silício Orgânico (Nutricolin®)',
    dosage: '200 mg',
    description: 'Forma biodisponível de ácido ortosilícico estabilizado em colina, essencial para a síntese de colágeno, elastina e queratina no couro cabeludo.',
    mechanism: 'Estimulação dos fibroblastos da papila e espessamento do córtex do fio.',
    benefit: 'Aumenta a espessura da haste em até 50%, devolvendo brilho natural e corpo.',
    clinicalStat: '+50% de aumento do diâmetro médio da fibra'
  },
  {
    id: 'complex-b-fem',
    code: '04',
    name: 'Ácido Hialurônico & Complexo B12/B6',
    dosage: '100 mg / 1000 mcg',
    description: 'Hidratação profunda celular da matriz dérmica aliada ao suprimento de energia para acelerar a renovação folicular e combater o estresse oxidativo.',
    mechanism: 'Retenção hídrica dérmica e aporte de nutrientes micro-encapsulados.',
    benefit: 'Couro cabeludo equilibrado, livre de descamação e fios ultra sedosos.',
    clinicalStat: '3.1x mais hidratação intrínseca no bulbo capilar'
  }
];

export const PRODUCTS_LIST: Record<GenderMode, Product[]> = {
  masculino: [
    {
      id: 'formula-capilar-masc',
      name: 'Fórmula Capilar Renova Fio 450mg',
      subtitle: 'Tratamento Oral Diário Anti-Calvície',
      category: 'Oral Premium',
      format: '60 Cápsulas de Alta Biodisponibilidade',
      dosage: '1 cápsula ao dia pela manhã',
      price: 197.00,
      originalPrice: 289.00,
      installments: '12x de R$ 19,78',
      rating: 4.9,
      reviewsCount: 1420,
      description: 'A fórmula mestra em dose única com 4 ativos farmacêuticos sinérgicos (Dutasterida + Minoxidil Oral + Biotina + Vitamina B12). Neutraliza a causa genética e devolve a densidade capilar.',
      benefits: [
        'Bloqueia o DHT na raiz folicular',
        'Reativa folículos miniaturizados em 30 a 90 dias',
        'Dose oral prática: sem sujeira, sem oleosidade',
        'Cápsulas gastro-resistentes de máxima absorção'
      ],
      keyActives: ['Dutasterida 0.5mg', 'Minoxidil 2.5mg', 'Biotina 5mg', 'Cianocobalamina 1000mcg'],
      howToUse: 'Ingerir 1 cápsula pela manhã com água, preferencialmente após o café.',
      isBestSeller: true,
      image: 'amber-jar-standing',
      tag: 'Produto Estrela'
    },
    {
      id: 'tonico-ativador-masc',
      name: 'Sérum Nanossomado Fator IGF-1',
      subtitle: 'Tópico Noturno Estimulador de Raiz',
      category: 'Tópico Avançado',
      format: 'Frasco Conta-Gotas 50ml',
      dosage: '1ml à noite no couro cabeludo',
      price: 147.00,
      originalPrice: 219.00,
      installments: '12x de R$ 14,76',
      rating: 4.8,
      reviewsCount: 680,
      description: 'Sérum de toque seco com Nanofatores de Crescimento IGF-1, Cobre Peptídeo e Cafeína Vetorizada. Aplicação pontual para áreas de maior afinamento.',
      benefits: [
        'Ação direta no bulbo capilar sem deixar resíduo oleoso',
        'Melhora imediata na microcirculação local',
        'Potencializa a ação das cápsulas orais'
      ],
      keyActives: ['Nanofator IGF-1', 'Copper Tripeptide-1', 'Cafeína 2%', 'Pantenol'],
      howToUse: 'Aplicar 1ml (um conta-gotas) nas áreas com falhas antes de dormir, massageando suavemente.',
      image: 'serum-dropper',
      tag: 'Potencializador'
    },
    {
      id: 'kit-integral-6m-masc',
      name: 'Protocolo Integral de Restauração 6 Meses',
      subtitle: 'Tratamento Completo com Acompanhamento',
      category: 'Kit Completo',
      format: '6 Frascos Fórmula 450mg + 2 Séruns Nanossomados',
      dosage: 'Protocolo Completo de 180 Dias',
      price: 697.00,
      originalPrice: 1182.00,
      installments: '12x de R$ 69,98',
      rating: 5.0,
      reviewsCount: 3120,
      description: 'O protocolo definitivo recomendado pelos especialistas em tricologia. Garante as 3 fases biológicas: interrupção da queda, nascimento de novos fios e engrossamento definitivo.',
      benefits: [
        'Economia de mais de 40% em relação aos frascos avulsos',
        'Acompanhamento VIP por WhatsApp com especialista',
        'Frete Expresso Grátis com rastreamento discreto',
        'Garantia Incondicional de 90 Dias'
      ],
      keyActives: ['Dutasterida', 'Minoxidil Oral', 'Biotina', 'B12', 'Sérum IGF-1'],
      howToUse: 'Rotina completa diária de 1 cápsula matinal + aplicação tópica noturna.',
      isBestSeller: true,
      image: 'amber-jar-floating',
      tag: 'Melhor Custo-Benefício'
    }
  ],
  feminino: [
    {
      id: 'formula-capilar-fem',
      name: 'Fórmula Nutri-Capilar Renova Fio 450mg',
      subtitle: 'Tratamento Oral de Densidade e Brilho Supremo',
      category: 'Oral Premium',
      format: '60 Cápsulas de Alta Absorção',
      dosage: '1 cápsula ao dia com o almoço',
      price: 197.00,
      originalPrice: 289.00,
      installments: '12x de R$ 19,78',
      rating: 4.9,
      reviewsCount: 1890,
      description: 'Fórmula desenvolvida especificamente para a biologia capilar feminina. Combina Minoxidil micronizado, Nutricolin® (Silício Orgânico), Ácido Hialurônico e Vitaminas do Complexo B.',
      benefits: [
        'Cessa o eflúvio telógeno pós-estresse / pós-parto / químico',
        'Preenche a risca central e aumenta o volume do rabo de cavalo',
        'Nutre unhas quebradiças e ilumina a textura dos cabelos',
        'Sem hormônios masculinizantes, 100% seguro'
      ],
      keyActives: ['Minoxidil 1.0mg', 'Nutricolin® 200mg', 'Biotina 5mg', 'Ácido Hialurônico', 'Vitamina B12'],
      howToUse: 'Ingerir 1 cápsula ao dia com água, junto a uma refeição principal.',
      isBestSeller: true,
      image: 'amber-jar-standing',
      tag: 'Mais Vendido'
    },
    {
      id: 'elixir-couro-fem',
      name: 'Elixir Capilar Fortificante com Peptídeos',
      subtitle: 'Loção Bioativa Sem Enxágue',
      category: 'Tópico Luxo',
      format: 'Frasco Airless 60ml com aplicador de precisão',
      dosage: 'Aplicação diária na raiz seca ou úmida',
      price: 157.00,
      originalPrice: 229.00,
      installments: '12x de R$ 15,76',
      rating: 4.9,
      reviewsCount: 840,
      description: 'Fórmula com Peptídeos Biomiméticos, Aminoácidos de Seda e Ácido Hialurônico de baixo peso molecular. Deixa a raiz solta, com volume instantâneo e zero oleosidade.',
      benefits: [
        'Volume imediato na raiz sem pesar os fios',
        'Proteção térmica e antipoluição folicular',
        'Fragrância sutil e sofisticada de notas florais nobres'
      ],
      keyActives: ['Bio-Peptídeos', 'Ácido Hialurônico', 'Extrato de Flor de Lótus', 'Niacinamida'],
      howToUse: 'Borrifar 4 a 6 jatos diretamente no couro cabeludo e espalhar com a ponta dos dedos.',
      image: 'serum-dropper',
      tag: 'Toque de Seda'
    },
    {
      id: 'kit-integral-6m-fem',
      name: 'Protocolo Transformação Capilar Feminina 6 Meses',
      subtitle: 'Renovação Completa de Massa e Comprimento',
      category: 'Kit Completo',
      format: '6 Frascos Fórmula 450mg + 2 Elixires Fortificantes',
      dosage: 'Tratamento Contínuo de 180 Dias',
      price: 697.00,
      originalPrice: 1182.00,
      installments: '12x de R$ 69,98',
      rating: 5.0,
      reviewsCount: 4210,
      description: 'A jornada definitiva de auto-cuidado capilar. Recupera fios enfraquecidos por químicas, descolorações ou desequilíbrios hormonais com acompanhamento exclusivo.',
      benefits: [
        'Economia de mais de 40% no ciclo completo de restauração',
        'Suporte dedicado com tricologistas parceiras',
        'Brinde: Escova Massageadora de Couro Cabeludo em Silicone Soft',
        'Garantia Estendida de 90 Dias de Satisfação'
      ],
      keyActives: ['Nutricolin', 'Minoxidil Fem', 'Biotina', 'Ácido Hialurônico', 'Peptídeos'],
      howToUse: '1 cápsula ao dia + aplicação do elixir fortificante 1x ao dia.',
      isBestSeller: true,
      image: 'amber-jar-floating',
      tag: 'Escolha das Especialistas'
    }
  ]
};

export const TREATMENT_PLANS: Record<GenderMode, Plan[]> = {
  masculino: [
    {
      id: 'plano-1m-masc',
      durationMonths: 1,
      title: 'Fase de Adaptação',
      phase: 'Mês 1 • Bloqueio da Queda',
      priceMonthly: 197.00,
      totalPrice: 197.00,
      originalTotalPrice: 289.00,
      discountPercentage: 31,
      installments: '12x de R$ 19,78',
      features: [
        '1 Frasco (60 Cápsulas 450mg)',
        'Início do bloqueio de DHT',
        'Manual de Uso & Guia Clínico Digital',
        'Envio em embalagem 100% discreta'
      ],
      freebies: ['Guia de Alimentação Pró-Folículo'],
      guaranteeDays: 30
    },
    {
      id: 'plano-3m-masc',
      durationMonths: 3,
      title: 'Reativação Folicular',
      phase: 'Meses 1 a 3 • Novos Fios Visíveis',
      priceMonthly: 149.00,
      totalPrice: 447.00,
      originalTotalPrice: 687.00,
      discountPercentage: 35,
      installments: '12x de R$ 44,88',
      isPopular: true,
      features: [
        '3 Frascos (180 Cápsulas 450mg)',
        'Reversão visível da miniaturização',
        'Preenchimento de falhas na coroa e entradas',
        'Frete Expresso Grátis para todo o Brasil',
        'Suporte prioritário por WhatsApp'
      ],
      freebies: ['Guia Prático de Tricologia', 'Frete Expresso Grátis'],
      guaranteeDays: 60
    },
    {
      id: 'plano-6m-masc',
      durationMonths: 6,
      title: 'Transformação Definitiva',
      phase: 'Meses 1 a 6 • Densidade & Cobertura Total',
      priceMonthly: 116.16,
      totalPrice: 697.00,
      originalTotalPrice: 1182.00,
      discountPercentage: 41,
      installments: '12x de R$ 69,98',
      isBestValue: true,
      features: [
        '6 Frascos (360 Cápsulas 450mg)',
        '+ 1 Sérum Nanossomado IGF-1 de Brinde (R$ 147)',
        'Engrossamento máximo dos fios terminais',
        'Garantia Incondicional de 90 Dias',
        'Acompanhamento mensal com especialista',
        'Frete Expresso VIP Grátis'
      ],
      freebies: [
        '1x Sérum Nanossomado IGF-1 (Brinde)',
        'Frete VIP Grátis',
        'Acompanhamento Mensal'
      ],
      guaranteeDays: 90
    }
  ],
  feminino: [
    {
      id: 'plano-1m-fem',
      durationMonths: 1,
      title: 'Fase de Resgate',
      phase: 'Mês 1 • Estabilização do Eflúvio',
      priceMonthly: 197.00,
      totalPrice: 197.00,
      originalTotalPrice: 289.00,
      discountPercentage: 31,
      installments: '12x de R$ 19,78',
      features: [
        '1 Frasco (60 Cápsulas Nutri-Capilares)',
        'Freio na queda ao lavar e escovar',
        'Guia de Cuidados com o Couro Cabeludo',
        'Embalagem lacrada e sigilosa'
      ],
      freebies: ['E-book: Rotina de Alta Densidade'],
      guaranteeDays: 30
    },
    {
      id: 'plano-3m-fem',
      durationMonths: 3,
      title: 'Multiplicação & Volume',
      phase: 'Meses 1 a 3 • Preenchimento da Risca',
      priceMonthly: 149.00,
      totalPrice: 447.00,
      originalTotalPrice: 687.00,
      discountPercentage: 35,
      installments: '12x de R$ 44,88',
      isPopular: true,
      features: [
        '3 Frascos (180 Cápsulas Nutri-Capilares)',
        'Redução de 90% na queda diária',
        'Nascimento de baby hairs volumosos',
        'Frete Expresso Grátis em todo o território nacional',
        'Canal VIP de acompanhamento no WhatsApp'
      ],
      freebies: ['Escova Massageadora Scalp Care', 'Frete Expresso Grátis'],
      guaranteeDays: 60
    },
    {
      id: 'plano-6m-fem',
      durationMonths: 6,
      title: 'Metamorfose Capilar Plena',
      phase: 'Meses 1 a 6 • Fios Longos, Densos & Espelhados',
      priceMonthly: 116.16,
      totalPrice: 697.00,
      originalTotalPrice: 1182.00,
      discountPercentage: 41,
      installments: '12x de R$ 69,98',
      isBestValue: true,
      features: [
        '6 Frascos (360 Cápsulas Nutri-Capilares)',
        '+ 1 Elixir Capilar com Peptídeos de Brinde (R$ 157)',
        'Máxima espessura da haste e brilho supremo',
        'Garantia Incondicional de 90 Dias',
        'Acesso à consulta de triagem com tricologista',
        'Frete VIP Grátis com seguro total'
      ],
      freebies: [
        '1x Elixir Capilar Bioativo (Brinde)',
        'Escova Massageadora Scalp Care',
        'Frete VIP Grátis'
      ],
      guaranteeDays: 90
    }
  ]
};

export const CLINICAL_CASES: Record<GenderMode, ClinicalCase[]> = {
  masculino: [
    {
      id: 'caso-1-masc',
      patientName: 'Marcelo V.',
      age: 36,
      stage: 'Calvície Grau III (Vértice / Coroa)',
      treatmentDuration: '3 Meses de Tratamento',
      beforeLabel: 'Dia 01',
      afterLabel: '3 Meses',
      beforeDesc: 'Afinamento severo na região do redemoinho (coroa), com couro cabeludo amplamente exposto sob luz direta.',
      afterDesc: 'Reativação folicular expressiva, preenchimento denso do vértice e fios escurecidos e engrossados.',
      densityIncrease: '+68% de densidade no vértice',
      verifiedDoctor: 'Dr. Leonardo Mattos • CRM/SP 148.920'
    },
    {
      id: 'caso-2-masc',
      patientName: 'Rodrigo S.',
      age: 41,
      stage: 'Calvície Grau IV (Entradas e Coroa Avançadas)',
      treatmentDuration: '11 Meses de Tratamento',
      beforeLabel: 'Dia 01',
      afterLabel: '11 Meses',
      beforeDesc: 'Recuo profundo da linha frontal e rarefação quase total no topo da cabeça há mais de 4 anos.',
      afterDesc: 'Cobertura capilar completa e contínua, transformação radical da moldura do rosto e autoestima renovada.',
      densityIncrease: '+114% de folículos ativos terminais',
      verifiedDoctor: 'Dra. Camila Duarte • CRM/RJ 98.412'
    }
  ],
  feminino: [
    {
      id: 'caso-1-fem',
      patientName: 'Juliana M.',
      age: 33,
      stage: 'Eflúvio Telógeno Crônico & Raleamento Difuso',
      treatmentDuration: '3 Meses de Tratamento',
      beforeLabel: 'Dia 01',
      afterLabel: '3 Meses',
      beforeDesc: 'Queda acentuada pós-estresse com alargamento visível da risca central e perda de volume nas têmporas.',
      afterDesc: 'Risca central fechada, proliferação intensa de novos fios em crescimento e fim total da queda ao pentear.',
      densityIncrease: '+74% de cobertura na risca média',
      verifiedDoctor: 'Dra. Beatriz Albuquerque • CRM/MG 83.104'
    },
    {
      id: 'caso-2-fem',
      patientName: 'Heloísa T.',
      age: 45,
      stage: 'Alopecia Padrão Feminino (Escala Ludwig II)',
      treatmentDuration: '9 Meses de Tratamento',
      beforeLabel: 'Dia 01',
      afterLabel: '9 Meses',
      beforeDesc: 'Fios extremamente finos, quebradiços e couro cabeludo transparente na região frontal e topo.',
      afterDesc: 'Cabelos encorpados com textura encorpada, volume duplicado no rabo de cavalo e brilho radiante.',
      densityIncrease: '+92% de espessura da haste capilar',
      verifiedDoctor: 'Dr. Roberto Ferraz • CRM/SP 172.330'
    }
  ]
};

export const QUIZ_QUESTIONS: Record<GenderMode, QuizQuestion[]> = {
  masculino: [
    {
      id: 'q1-age',
      title: 'Qual é a sua faixa etária?',
      subtitle: 'A idade influencia na velocidade metabólica e na sensibilidade dos receptores androgênicos.',
      options: [
        { id: '18-25', label: '18 a 25 anos', description: 'Início precoce de afinamento', severityScore: 1 },
        { id: '26-35', label: '26 a 35 anos', description: 'Progressão ativa de entradas / coroa', severityScore: 2 },
        { id: '36-48', label: '36 a 48 anos', description: 'Miniaturização instalada', severityScore: 3 },
        { id: '49+', label: '49 anos ou mais', description: 'Perda de densidade a longo prazo', severityScore: 3 }
      ]
    },
    {
      id: 'q2-pattern',
      title: 'Onde você nota a maior perda capilar?',
      subtitle: 'Mapeamos o padrão folicular para calibrar a resposta aos bioativos.',
      options: [
        { id: 'entradas', label: 'Entradas na linha frontal', description: 'Recuo da moldura do rosto', severityScore: 2 },
        { id: 'coroa', label: 'Redemoinho / Coroa no topo', description: 'Couro cabeludo visível de cima', severityScore: 2 },
        { id: 'ambos', label: 'Tanto entradas quanto a coroa', description: 'Afinamento generalizado no topo', severityScore: 3 },
        { id: 'geral', label: 'Afinamento difuso em toda a cabeça', description: 'Perda uniforme de espessura', severityScore: 2 }
      ]
    },
    {
      id: 'q3-family',
      title: 'Existe histórico de calvície na sua família?',
      subtitle: 'Pai, avós maternos/paternos ou irmãos com calvície.',
      options: [
        { id: 'forte', label: 'Sim, histórico forte (pai e/ou avô)', description: 'Forte predisposição ao DHT', severityScore: 3 },
        { id: 'moderado', label: 'Sim, histórico leve ou tios', description: 'Predisposição intermediária', severityScore: 2 },
        { id: 'nao', label: 'Não que eu me recorde', description: 'Possível gatilho por estresse ou carência', severityScore: 1 }
      ]
    },
    {
      id: 'q4-goal',
      title: 'Qual é a sua principal meta de tratamento?',
      subtitle: 'Nosso protocolo será formulado de acordo com seu objetivo.',
      options: [
        { id: 'parar-queda', label: 'Parar a queda imediatamente', description: 'Estabilizar e prevenir novas perdas', severityScore: 1 },
        { id: 'preencher', label: 'Preencher falhas e crescer novos fios', description: 'Recuperar áreas já raleadas', severityScore: 3 },
        { id: 'engrossar', label: 'Engrossar fios finos e ralos', description: 'Devolver volume e densidade robusta', severityScore: 2 }
      ]
    }
  ],
  feminino: [
    {
      id: 'q1-age-fem',
      title: 'Qual é a sua faixa etária?',
      subtitle: 'Fatores hormonais variam entre diferentes fases da vida da mulher.',
      options: [
        { id: '18-28', label: '18 a 28 anos', description: 'Fios enfraquecidos por química ou estresse', severityScore: 1 },
        { id: '29-40', label: '29 a 40 anos', description: 'Pós-gestação, rotina intensa ou eflúvio', severityScore: 2 },
        { id: '41-52', label: '41 a 52 anos', description: 'Transição hormonal e afinamento', severityScore: 3 },
        { id: '53+', label: '53 anos ou mais', description: 'Menopausa e perda de densidade', severityScore: 3 }
      ]
    },
    {
      id: 'q2-pattern-fem',
      title: 'Como você descreve a perda dos seus fios?',
      subtitle: 'Identificação da causa raiz do raleamento.',
      options: [
        { id: 'risca', label: 'Risca do cabelo alargando no topo', description: 'Transparência ao repartir', severityScore: 3 },
        { id: 'tufos', label: 'Queda em grande quantidade no banho', description: 'Eflúvio telógeno agudo', severityScore: 2 },
        { id: 'fios-finos', label: 'Fios cada vez mais finos e sem volume', description: 'Perda da massa capilar', severityScore: 2 },
        { id: 'laterais', label: 'Falhas nas têmporas e laterais', description: 'Tração ou sensibilidade local', severityScore: 2 }
      ]
    },
    {
      id: 'q3-habits-fem',
      title: 'Você costuma realizar procedimentos capilares?',
      subtitle: 'Químicas, fontes de calor e descolorações alteram a cutícula e o bulbo.',
      options: [
        { id: 'quimica-frequente', label: 'Sim, coloração, luzes ou progressiva frequente', description: 'Alta demanda de regeneração proteica', severityScore: 3 },
        { id: 'secador-chapinha', label: 'Apenas secador e prancha regularmente', description: 'Demanda de proteção térmica e hidratação', severityScore: 2 },
        { id: 'natural', label: 'Cabelos naturais com pouca química', description: 'Foco em nutrição folicular pura', severityScore: 1 }
      ]
    },
    {
      id: 'q4-goal-fem',
      title: 'Qual é o seu maior desejo para o seu cabelo?',
      subtitle: 'Direcionamos a concentração de ativos para o seu sonho capilar.',
      options: [
        { id: 'volume-topo', label: 'Fechar a risca e dar volume no topo', description: 'Densidade máxima na raiz', severityScore: 3 },
        { id: 'comprimento-forca', label: 'Crescimento acelerado sem pontas ralas', description: 'Força para atingir comprimento', severityScore: 2 },
        { id: 'fim-queda', label: 'Parar de ver fios caindo na casa toda', description: 'Cessação imediata do eflúvio', severityScore: 1 }
      ]
    }
  ]
};

export const FAQ_ITEMS: Record<GenderMode, { q: string; a: string }[]> = {
  masculino: [
    {
      q: 'Como funciona a Fórmula Capilar Renova Fio 450mg?',
      a: 'Nossa fórmula combina 4 pilares farmacêuticos comprovados: a Dutasterida bloqueia a conversão de DHT na raiz dos folículos, enquanto o Minoxidil oral micronizado restaura o fluxo sanguíneo e oxigênio. A Biotina pura e a Vitamina B12 fornecem o substrato nutricional para que os novos fios nasçam grossos e resistentes.'
    },
    {
      q: 'Quanto tempo leva para notar os primeiros resultados?',
      a: 'Nos primeiros 20 a 30 dias de uso diário, a maioria dos homens relata uma desaceleração drástica na queda. Entre 60 e 90 dias, folículos dormentes reativam, surgindo novos fios nas áreas raleadas (entradas e coroa). O resultado de cobertura e densidade máxima consolida-se entre 6 e 11 meses de protocolo contínuo.'
    },
    {
      q: 'Por que o Minoxidil oral é superior ao tónico tradicional?',
      a: 'O Minoxidil tópico tradicional pode causar ressecamento do couro cabeludo, oleosidade e baixa adesão. A versão oral micronizada em dosagem terapêutica precisa (2.5mg) atua de dentro para fora, garantindo 100% de absorção sistêmica direcionada aos folículos sem sujeira ou irritação cutânea.'
    },
    {
      q: 'Preciso de receita médica para adquirir?',
      a: 'O Renova Fio é manipulado sob demanda farmacêutica em farmácias magistrais homologadas pela Anvisa, sob supervisão do nosso corpo técnico de farmacêuticos e tricologistas. Ao preencher o diagnóstico online, nossa equipe avalia as respostas para emitir a ordem de manipulação com total segurança e conformidade legal.'
    },
    {
      q: 'A embalagem é discreta?',
      a: 'Absolutamente. Todas as entregas são enviadas em caixas neutras de alta qualidade, sem qualquer menção a tratamento de calvície ou perda de cabelo na parte externa, garantindo 100% de sigilo e privacidade.'
    }
  ],
  feminino: [
    {
      q: 'A fórmula feminina é segura e não causa efeitos masculinizantes?',
      a: 'Sim, 100% segura! A fórmula feminina foi calibrada minuciosamente para a endocrinologia e biologia capilar da mulher. Ela utiliza ativos seguros (Minoxidil 1.0mg ajustado, Silício Orgânico Nutricolin, Ácido Hialurônico e Complexo B), sem interferir nos seus ciclos hormonais naturais ou causar efeitos colaterais indesejados.'
    },
    {
      q: 'Serve para queda pós-parto ou após cirurgia / estresse (eflúvio)?',
      a: 'Perfeitamente! O eflúvio telógeno ocorre quando uma grande quantidade de folículos entra prematuramente na fase de repouso e queda. O Renova Fio Feminino atua diretamente nos receptores foliculares, acelerando o retorno para a fase Anágena (crescimento ativo) e restaurando o volume em tempo recorde.'
    },
    {
      q: 'Ajuda a fechar a risca do cabelo alargada no topo?',
      a: 'Sim! Esse é um dos efeitos mais celebrados pelas nossas clientes. A sinergia de Minoxidil oral com Silício Orgânico estimula o nascimento de múltiplos fios por unidade folicular, preenchendo a risca central e devolvendo a densidade natural.'
    },
    {
      q: 'O produto melhora também a textura e o brilho dos fios?',
      a: 'Sim. Graças à inclusão do Nutricolin® (Silício Orgânico) e Ácido Hialurônico bioativo, a queratinização dos fios ocorre com matriz intracelular rica, conferindo espessura uniforme, redução do frizz e brilho espelhado que resiste até mesmo a descolorações.'
    },
    {
      q: 'Como é o envio e a garantia?',
      a: 'O envio é expresso e segurado para todo o Brasil. Você conta ainda com nossa Garantia de Satisfação de até 90 dias nos planos semestrais: se seguir o protocolo e não notar melhora clínica na densidade dos seus fios, devolvemos seu investimento.'
    }
  ]
};
