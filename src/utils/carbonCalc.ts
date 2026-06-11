import { UserProfile, CarbonBreakdown } from '../types';
import { TRANSPORT, HOME, FOOD, SHOPPING } from '../data/emissionFactors';

export function calculateCarbon(profile: UserProfile): CarbonBreakdown {
  // Transport (annual kg CO2)
  const carAnnual = profile.transport.carMilesPerWeek * 52 *
    TRANSPORT.CAR_KG_PER_MILE[profile.transport.carType];
  const transitAnnual = profile.transport.publicTransitHoursPerWeek * 52 *
    TRANSPORT.PUBLIC_TRANSIT_KG_PER_HOUR;
  const flightAnnual = profile.transport.flightsPerYear * TRANSPORT.FLIGHT_KG_PER_ROUND_TRIP;
  const transport = Math.round(carAnnual + transitAnnual + flightAnnual);

  // Home (annual kg CO2)
  const elecAnnual = profile.home.electricityKwhPerMonth * 12 * HOME.ELECTRICITY_KG_PER_KWH;
  const gasAnnual = profile.home.naturalGasThermsPerMonth * 12 * HOME.NATURAL_GAS_KG_PER_THERM;
  const homeTotal = Math.round((elecAnnual + gasAnnual) / Math.max(profile.home.householdSize, 1));

  // Food (annual kg CO2)
  const baseDiet = FOOD.DIET_KG_PER_YEAR[profile.food.dietType];
  const localReduction = 1 - (profile.food.localFoodPercent / 10) * FOOD.LOCAL_FOOD_REDUCTION_FACTOR;
  const food = Math.round(baseDiet * localReduction);

  // Shopping (annual kg CO2)
  const clothingAnnual = profile.shopping.clothingItemsPerMonth * 12 * SHOPPING.CLOTHING_KG_PER_ITEM;
  const electronicsAnnual = profile.shopping.electronicsPerYear * SHOPPING.ELECTRONICS_KG_PER_ITEM;
  const shopping = Math.round(clothingAnnual + electronicsAnnual);

  const total = transport + homeTotal + food + shopping;

  return { transport, home: homeTotal, food, shopping, total };
}

export function getGrade(totalKg: number): { grade: string; color: string; label: string } {
  if (totalKg < 3000) return { grade: 'A+', color: '#10b981', label: 'Excellent! Well below average.' };
  if (totalKg < 5000) return { grade: 'A', color: '#34d399', label: 'Great! Below world average.' };
  if (totalKg < 7000) return { grade: 'B', color: '#fbbf24', label: 'Good. Around EU average.' };
  if (totalKg < 10000) return { grade: 'C', color: '#f97316', label: 'Average. Room for improvement.' };
  if (totalKg < 14000) return { grade: 'D', color: '#ef4444', label: 'Above average. Take action!' };
  return { grade: 'F', color: '#dc2626', label: 'Very high. Urgent action needed!' };
}

export function formatTonnes(kg: number): string {
  return (kg / 1000).toFixed(1);
}
