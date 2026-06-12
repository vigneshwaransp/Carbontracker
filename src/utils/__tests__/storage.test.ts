import { describe, it, expect, beforeEach, vi } from 'vitest';
import { loadUserData, saveProfile, addCarbonLog, toggleChallenge, resetAllData } from '../storage';
import { UserProfile } from '../../types';

// Simple localStorage mock
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => { store[key] = value.toString(); },
    removeItem: (key: string) => { delete store[key]; },
    clear: () => { store = {}; }
  };
})();

vi.stubGlobal('localStorage', localStorageMock);

describe('storage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  const profile: UserProfile = {
    transport: { carType: 'gasoline', carMilesPerWeek: 100, publicTransitHoursPerWeek: 5, flightsPerYear: 2 },
    home: { electricityKwhPerMonth: 500, naturalGasThermsPerMonth: 20, householdSize: 2 },
    food: { dietType: 'average', localFoodPercent: 30 },
    shopping: { clothingItemsPerMonth: 2, electronicsPerYear: 1 },
  };

  it('loads default data when storage is empty', () => {
    const data = loadUserData();
    expect(data.onboardingComplete).toBe(false);
    expect(data.profile).toBeNull();
    expect(data.completedChallenges).toEqual([]);
    expect(data.carbonLog).toEqual([]);
  });

  it('saves and loads profile', () => {
    saveProfile(profile);
    const data = loadUserData();
    expect(data.onboardingComplete).toBe(true);
    expect(data.profile).toEqual(profile);
    expect(data.lastActive).toBeDefined();
  });

  it('can add carbon log entry', () => {
    const entry = {
      date: '2026-06-12',
      total: 5400,
      breakdown: { transport: 2000, home: 1800, food: 1000, shopping: 600, total: 5400 }
    };
    addCarbonLog(entry);
    
    const data = loadUserData();
    expect(data.carbonLog.length).toBe(1);
    expect(data.carbonLog[0]).toEqual(entry);
  });

  it('can toggle challenges', () => {
    toggleChallenge('c1');
    let data = loadUserData();
    expect(data.completedChallenges).toContain('c1');

    toggleChallenge('c1');
    data = loadUserData();
    expect(data.completedChallenges).not.toContain('c1');
  });

  it('resets all data', () => {
    saveProfile(profile);
    resetAllData();
    const data = loadUserData();
    expect(data.profile).toBeNull();
    expect(data.onboardingComplete).toBe(false);
  });
});
