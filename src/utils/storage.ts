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

export function loadUserData(): UserData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return getDefaultData();
    return JSON.parse(raw) as UserData;
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
