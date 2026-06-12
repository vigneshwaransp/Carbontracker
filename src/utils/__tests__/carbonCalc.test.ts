import { describe, it, expect } from 'vitest';
import { calculateCarbon, getGrade, formatTonnes } from '../carbonCalc';
import { UserProfile } from '../../types';

describe('carbonCalc', () => {
  const sampleProfile: UserProfile = {
    transport: {
      carType: 'gasoline',
      carMilesPerWeek: 100,
      publicTransitHoursPerWeek: 5,
      flightsPerYear: 2,
    },
    home: {
      electricityKwhPerMonth: 500,
      naturalGasThermsPerMonth: 20,
      householdSize: 2,
    },
    food: {
      dietType: 'average',
      localFoodPercent: 30,
    },
    shopping: {
      clothingItemsPerMonth: 2,
      electronicsPerYear: 1,
    },
  };

  it('correctly calculates total and category carbon footprint', () => {
    const breakdown = calculateCarbon(sampleProfile);
    expect(breakdown).toHaveProperty('transport');
    expect(breakdown).toHaveProperty('home');
    expect(breakdown).toHaveProperty('food');
    expect(breakdown).toHaveProperty('shopping');
    expect(breakdown).toHaveProperty('total');
    expect(breakdown.total).toBe(breakdown.transport + breakdown.home + breakdown.food + breakdown.shopping);
  });

  it('correctly handles zero values', () => {
    const zeroProfile: UserProfile = {
      transport: {
        carType: 'none',
        carMilesPerWeek: 0,
        publicTransitHoursPerWeek: 0,
        flightsPerYear: 0,
      },
      home: {
        electricityKwhPerMonth: 0,
        naturalGasThermsPerMonth: 0,
        householdSize: 1,
      },
      food: {
        dietType: 'vegan',
        localFoodPercent: 0,
      },
      shopping: {
        clothingItemsPerMonth: 0,
        electronicsPerYear: 0,
      },
    };

    const breakdown = calculateCarbon(zeroProfile);
    expect(breakdown.transport).toBe(0);
    expect(breakdown.shopping).toBe(0);
  });

  it('correctly assigns grades based on total emissions', () => {
    expect(getGrade(2500).grade).toBe('A+');
    expect(getGrade(4500).grade).toBe('A');
    expect(getGrade(6500).grade).toBe('B');
    expect(getGrade(8500).grade).toBe('C');
    expect(getGrade(12000).grade).toBe('D');
    expect(getGrade(15000).grade).toBe('F');
  });

  it('correctly formats kg to tonnes text', () => {
    expect(formatTonnes(0)).toBe('0.0');
    expect(formatTonnes(1234)).toBe('1.2');
    expect(formatTonnes(9999)).toBe('10.0');
  });
});
