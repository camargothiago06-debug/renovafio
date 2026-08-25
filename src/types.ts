export type GenderMode = 'masculino' | 'feminino';

export type TabType = 'inicio' | 'galeria' | 'ciencia' | 'resultados' | 'protocolos' | 'jornada' | 'faq';

export interface JourneyMilestone {
  id: string;
  stageKey: 'dia01' | 'mes01' | 'mes03' | 'mes06' | 'mes11';
  title: string;
  shortLabel: string;
  recommendedDays: number;
  expectedDate?: string;
  completedDate?: string;
  status: 'concluido' | 'em_andamento' | 'proximo' | 'atrasado';
  photoUrl?: string;
  notes?: string;
  clinicalGuidelines: {
    phaseName: string;
    description: string;
    whatToExpect: string;
    careTips: string[];
  };
}

export interface CustomerJourneyProfile {
  id: string;
  customerName: string;
  gender: GenderMode;
  protocolName: string;
  startDate: string;
  currentMonth: number;
  currentStageKey: 'dia01' | 'mes01' | 'mes03' | 'mes06' | 'mes11';
  applicationTime: string;
  nextPhotoDate: string;
  refillDate: string;
  nextEvaluationDate: string;
  dosesRemaining: number;
  totalDoses: number;
  consentAccepted: boolean;
  milestones: JourneyMilestone[];
}


export interface Ingredient {
  id: string;
  code: string;
  name: string;
  dosage: string;
  description: string;
  mechanism: string;
  benefit: string;
  clinicalStat: string;
}

export interface Product {
  id: string;
  name: string;
  subtitle: string;
  category: string;
  format: string;
  dosage: string;
  price: number;
  originalPrice?: number;
  installments: string;
  rating: number;
  reviewsCount: number;
  description: string;
  benefits: string[];
  keyActives: string[];
  howToUse: string;
  isBestSeller?: boolean;
  image: string;
  imageUrl?: string;
  tag: string;
}

export interface Plan {
  id: string;
  durationMonths: number;
  title: string;
  phase: string;
  priceMonthly: number;
  totalPrice: number;
  originalTotalPrice: number;
  discountPercentage: number;
  installments: string;
  isPopular?: boolean;
  isBestValue?: boolean;
  features: string[];
  freebies: string[];
  guaranteeDays: number;
}

export interface ClinicalCase {
  id: string;
  patientName: string;
  age: number;
  stage: string;
  treatmentDuration: string;
  beforeLabel: string;
  afterLabel: string;
  beforeDesc: string;
  afterDesc: string;
  densityIncrease: string;
  verifiedDoctor: string;
  combinedImageUrl?: string;
  beforeImageUrl?: string;
  afterImageUrl?: string;
}

export interface QuizQuestion {
  id: string;
  title: string;
  subtitle: string;
  options: {
    id: string;
    label: string;
    description?: string;
    severityScore: number;
    recommendedProduct?: string;
  }[];
}

export interface CartItem {
  product: Product | Plan;
  quantity: number;
  gender: GenderMode;
}
