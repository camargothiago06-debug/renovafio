export type GenderMode = 'masculino' | 'feminino';

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
