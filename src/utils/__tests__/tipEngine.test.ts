import { describe, it, expect } from 'vitest';
import { getPersonalizedTips, getAllTips } from '../tipEngine';
import { UserProfile, CarbonBreakdown } from '../../types';

describe('tipEngine', () => {
  const profile: UserProfile = {
    transport: {
      carType: 'electric',
      carMilesPerWeek: 0,
      publicTransitHoursPerWeek: 0,
      flightsPerYear: 0,
    },
    home: {
      electricityKwhPerMonth: 1000,
      naturalGasThermsPerMonth: 50,
      householdSize: 1,
    },
    food: {
      dietType: 'vegan',
      localFoodPercent: 20,
    },
    shopping: {
      clothingItemsPerMonth: 5,
      electronicsPerYear: 3,
    },
  };

  const breakdown: CarbonBreakdown = {
    transport: 0,
    home: 4000,
    food: 500,
    shopping: 1500,
    total: 6000,
  };

  it('filters out redundant tips', () => {
    const tips = getPersonalizedTips(profile, breakdown);
    
    // Electric car driver should not see EV recommendation
    expect(tips.some(t => t.id === 't5')).toBe(false);

    // Vegans should not get vegetarian tips
    expect(tips.some(t => t.id === 'f4')).toBe(false);

    // No flights means no skip flight tips
    expect(tips.some(t => t.id === 't4')).toBe(false);
  });

  it('sorts tips by highest-impact categories', () => {
    const tips = getPersonalizedTips(profile, breakdown);
    
    // Highest impact is 'home' (4000)
    expect(tips[0].category).toBe('home');
    
    // Second highest is 'shopping' (1500)
    // Find index of first shopping tip and make sure it is after home tips
    const firstHomeIdx = tips.findIndex(t => t.category === 'home');
    const firstShoppingIdx = tips.findIndex(t => t.category === 'shopping');
    expect(firstHomeIdx).toBeLessThan(firstShoppingIdx);
  });

  it('returns all tips correctly', () => {
    const all = getAllTips();
    expect(all.length).toBeGreaterThan(15);
  });
});
