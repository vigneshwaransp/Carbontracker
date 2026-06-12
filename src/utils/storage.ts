import { UserData, UserProfile, CarbonLogEntry } from '../types';

const STORAGE_KEY = 'ecotrack_user_data';

/**
 * Returns the default initial UserData structure.
 *
 * @returns A default UserData object.
 */
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

/**
 * Safely parses and validates localStorage objects against the UserData schema
 * to ensure runtime stability and prevent type pollution or security vulnerabilities.
 *
 * @param obj - The raw parsed JSON object.
 * @returns A validated UserData object with correct defaults for missing or invalid properties.
 */
function validateUserData(obj: unknown): UserData {
  const defaultData = getDefaultData();
  if (!obj || typeof obj !== 'object') return defaultData;

  const rawObj = obj as Record<string, unknown>;

  interface RawProfile {
    transport?: { carType?: unknown; carMilesPerWeek?: unknown; publicTransitHoursPerWeek?: unknown; flightsPerYear?: unknown };
    home?: { electricityKwhPerMonth?: unknown; naturalGasThermsPerMonth?: unknown; householdSize?: unknown };
    food?: { dietType?: unknown; localFoodPercent?: unknown };
    shopping?: { clothingItemsPerMonth?: unknown; electronicsPerYear?: unknown };
  }

  const validProfile = (p: unknown): UserProfile | null => {
    if (!p || typeof p !== 'object') return null;
    const rawP = p as RawProfile;
    try {
      return {
        transport: {
          carType: typeof rawP.transport?.carType === 'string' && ['gasoline', 'diesel', 'hybrid', 'electric', 'none'].includes(rawP.transport.carType) ? (rawP.transport.carType as UserProfile['transport']['carType']) : 'none',
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
          dietType: typeof rawP.food?.dietType === 'string' && ['meat_heavy', 'average', 'pescatarian', 'vegetarian', 'vegan'].includes(rawP.food.dietType) ? (rawP.food.dietType as UserProfile['food']['dietType']) : 'average',
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

/**
 * Loads user data from localStorage and validates it.
 *
 * @returns The validated UserData object or default structure if empty/corrupted.
 */
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

/**
 * Saves user data directly to localStorage.
 *
 * @param data - The UserData object to save.
 */
export function saveUserData(data: UserData): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

/**
 * Saves the user profile and updates onboarding status.
 *
 * @param profile - The UserProfile choices to save.
 */
export function saveProfile(profile: UserProfile): void {
  const data = loadUserData();
  data.profile = profile;
  data.onboardingComplete = true;
  data.lastActive = new Date().toISOString();
  saveUserData(data);
}

/**
 * Logs a daily carbon footprint breakdown, retaining a max history of 90 days.
 *
 * @param entry - The CarbonLogEntry to log.
 */
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

/**
 * Toggles a daily challenge completion state.
 *
 * @param challengeId - The ID of the challenge to toggle.
 */
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

/**
 * Deletes all stored user data, resetting the app to default.
 */
export function resetAllData(): void {
  localStorage.removeItem(STORAGE_KEY);
}
