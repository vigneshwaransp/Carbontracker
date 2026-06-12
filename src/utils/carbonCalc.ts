import { UserProfile, CarbonBreakdown } from '../types';
import { TRANSPORT, HOME, FOOD, SHOPPING } from '../data/emissionFactors';

/**
 * Calculates the annual carbon footprint breakdown (in kg CO2) across Transport, Home, Food, and Shopping.
 * Values are calculated based on EPA and academic research emission factors.
 *
 * @param profile - The user profile containing lifestyle choices and usage data.
 * @returns A breakdown of carbon emissions per category and the total annual emissions.
 */
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

/**
 * Returns a letter grade, accent color, and descriptive rating based on total annual carbon emissions (in kg).
 *
 * @param totalKg - The total annual carbon footprint in kg CO2.
 * @returns An object containing the letter grade, CSS hex color, and a description.
 */
export function getGrade(totalKg: number): { grade: string; color: string; label: string } {
  if (totalKg < 3000) return { grade: 'A+', color: '#10b981', label: 'Excellent! Well below average.' };
  if (totalKg < 5000) return { grade: 'A', color: '#34d399', label: 'Great! Below world average.' };
  if (totalKg < 7000) return { grade: 'B', color: '#fbbf24', label: 'Good. Around EU average.' };
  if (totalKg < 10000) return { grade: 'C', color: '#f97316', label: 'Average. Room for improvement.' };
  if (totalKg < 14000) return { grade: 'D', color: '#ef4444', label: 'Above average. Take action!' };
  return { grade: 'F', color: '#dc2626', label: 'Very high. Urgent action needed!' };
}

/**
 * Formats a raw carbon footprint value in kilograms to tonnes, rounded to 1 decimal place.
 *
 * @param kg - The footprint weight in kilograms.
 * @returns The formatted string in tonnes (e.g. "4.2").
 */
export function formatTonnes(kg: number): string {
  return (kg / 1000).toFixed(1);
}
