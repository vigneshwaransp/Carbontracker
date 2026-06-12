import { UserData, UserProfile, CarbonLogEntry } from '../types';

const STORAGE_KEY = 'ecotrack_user_data';

function getDefaultData(): UserData {
  return {
    profile: null,
    completedChallenges: [],
    carbonLog: [],
    streak: 0,
    lastActive: '',
    onboardingComplete: false,
  };
}

function validateUserData(obj: unknown): UserData {
  const defaultData = getDefaultData();
  if (!obj || typeof obj !== 'object') return defaultData;

  const rawObj = obj as Record<string, unknown>;

  const validProfile = (p: unknown): UserProfile | null => {
    if (!p || typeof p !== 'object') return null;
    const rawP = p as Record<string, any>;
    try {
      return {
        transport: {
          carType: typeof rawP.transport?.carType === 'string' ? rawP.transport.carType : 'none',
          carMilesPerWeek: typeof rawP.transport?.carMilesPerWeek === 'number' ? rawP.transport.carMilesPerWeek : 0,
          publicTransitHoursPerWeek: typeof rawP.transport?.publicTransitHoursPerWeek === 'number' ? rawP.transport.publicTransitHoursPerWeek : 0,
          flightsPerYear: typeof rawP.transport?.flightsPerYear === 'number' ? rawP.transport.flightsPerYear : 0,
        },
        home: {
          electricityKwhPerMonth: typeof rawP.home?.electricityKwhPerMonth === 'number' ? rawP.home.electricityKwhPerMonth : 500,
          naturalGasThermsPerMonth: typeof rawP.home?.naturalGasThermsPerMonth === 'number' ? rawP.home.naturalGasThermsPerMonth : 0,
          householdSize: typeof rawP.home?.householdSize === 'number' ? rawP.home.householdSize : 1,
        },
        food: {
          dietType: typeof rawP.food?.dietType === 'string' ? rawP.food.dietType : 'average',
          localFoodPercent: typeof rawP.food?.localFoodPercent === 'number' ? rawP.food.localFoodPercent : 0,
        },
        shopping: {
          clothingItemsPerMonth: typeof rawP.shopping?.clothingItemsPerMonth === 'number' ? rawP.shopping.clothingItemsPerMonth : 0,
          electronicsPerYear: typeof rawP.shopping?.electronicsPerYear === 'number' ? rawP.shopping.electronicsPerYear : 0,
        }
      };
    } catch {
      return null;
    }
  };

  const validLog = (arr: unknown): CarbonLogEntry[] => {
    if (!Array.isArray(arr)) return [];
    return arr.filter((e): e is CarbonLogEntry => 
      e && typeof e === 'object' && typeof e.date === 'string' && typeof e.total === 'number'
    );
  };

  const validChallenges = (arr: unknown): string[] => {
    if (!Array.isArray(arr)) return [];
    return arr.filter((e): e is string => typeof e === 'string');
  };

  return {
    profile: validProfile(rawObj.profile),
    completedChallenges: validChallenges(rawObj.completedChallenges),
    carbonLog: validLog(rawObj.carbonLog),
    streak: typeof rawObj.streak === 'number' ? rawObj.streak : 0,
    lastActive: typeof rawObj.lastActive === 'string' ? rawObj.lastActive : '',
    onboardingComplete: typeof rawObj.onboardingComplete === 'boolean' ? rawObj.onboardingComplete : false,
  };
}

export function loadUserData(): UserData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return getDefaultData();
    const parsed = JSON.parse(raw);
    return validateUserData(parsed);
  } catch {
    return getDefaultData();
  }
}

export function saveUserData(data: UserData): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function saveProfile(profile: UserProfile): void {
  const data = loadUserData();
  data.profile = profile;
  data.onboardingComplete = true;
  data.lastActive = new Date().toISOString();
  saveUserData(data);
}

export function addCarbonLog(entry: CarbonLogEntry): void {
  const data = loadUserData();
  // Only keep one entry per date
  data.carbonLog = data.carbonLog.filter(e => e.date !== entry.date);
  data.carbonLog.push(entry);
  // Keep last 90 days
  data.carbonLog = data.carbonLog.slice(-90);
  data.lastActive = new Date().toISOString();
  saveUserData(data);
}

export function toggleChallenge(challengeId: string): void {
  const data = loadUserData();
  const idx = data.completedChallenges.indexOf(challengeId);
  if (idx >= 0) {
    data.completedChallenges.splice(idx, 1);
  } else {
    data.completedChallenges.push(challengeId);
  }
  saveUserData(data);
}

export function resetAllData(): void {
  localStorage.removeItem(STORAGE_KEY);
}
