export interface TransportData {
  carMilesPerWeek: number;
  carType: 'gasoline' | 'diesel' | 'hybrid' | 'electric' | 'none';
  publicTransitHoursPerWeek: number;
  flightsPerYear: number;
}

export interface HomeData {
  electricityKwhPerMonth: number;
  naturalGasThermsPerMonth: number;
  householdSize: number;
}

export interface FoodData {
  dietType: 'meat_heavy' | 'average' | 'pescatarian' | 'vegetarian' | 'vegan';
  localFoodPercent: number;
}

export interface ShoppingData {
  clothingItemsPerMonth: number;
  electronicsPerYear: number;
}

export interface UserProfile {
  transport: TransportData;
  home: HomeData;
  food: FoodData;
  shopping: ShoppingData;
}

export interface CarbonBreakdown {
  transport: number;
  home: number;
  food: number;
  shopping: number;
  total: number;
}

export interface Tip {
  id: string;
  title: string;
  description: string;
  category: 'transport' | 'home' | 'food' | 'shopping';
  savingsKgPerYear: number;
  difficulty: 'easy' | 'medium' | 'hard';
  icon: string;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  points: number;
  completed: boolean;
  category: string;
  icon: string;
}

export interface CarbonLogEntry {
  date: string;
  total: number;
  breakdown: CarbonBreakdown;
}

export interface UserData {
  profile: UserProfile | null;
  completedChallenges: string[];
  carbonLog: CarbonLogEntry[];
  streak: number;
  lastActive: string;
  onboardingComplete: boolean;
}

export const DEFAULT_PROFILE: UserProfile = {
  transport: { carMilesPerWeek: 100, carType: 'gasoline', publicTransitHoursPerWeek: 2, flightsPerYear: 2 },
  home: { electricityKwhPerMonth: 900, naturalGasThermsPerMonth: 50, householdSize: 2 },
  food: { dietType: 'average', localFoodPercent: 20 },
  shopping: { clothingItemsPerMonth: 3, electronicsPerYear: 2 },
};
