import { UserProfile, CarbonBreakdown, Tip } from '../types';

const ALL_TIPS: Tip[] = [
  { id: 't1', title: 'Switch to public transit', description: 'Replace 2 car trips per week with bus or train. Saves fuel and reduces congestion.', category: 'transport', savingsKgPerYear: 1200, difficulty: 'medium', icon: '🚌' },
  { id: 't2', title: 'Carpool to work', description: 'Share rides with colleagues. Split emissions and costs in half.', category: 'transport', savingsKgPerYear: 800, difficulty: 'easy', icon: '🚗' },
  { id: 't3', title: 'Try cycling or walking', description: 'For trips under 3 miles, bike or walk. Zero emissions and great exercise!', category: 'transport', savingsKgPerYear: 600, difficulty: 'medium', icon: '🚴' },
  { id: 't4', title: 'Reduce flights by one', description: 'Skip one round-trip flight per year. Video calls work great for most meetings.', category: 'transport', savingsKgPerYear: 1100, difficulty: 'hard', icon: '✈️' },
  { id: 't5', title: 'Consider an EV', description: 'Electric vehicles produce 50-70% less CO2 over their lifetime.', category: 'transport', savingsKgPerYear: 2500, difficulty: 'hard', icon: '⚡' },
  { id: 'h1', title: 'Switch to LED bulbs', description: 'LED bulbs use 75% less energy. Replace all bulbs in your home.', category: 'home', savingsKgPerYear: 200, difficulty: 'easy', icon: '💡' },
  { id: 'h2', title: 'Adjust thermostat 2°F', description: 'Lower heating by 2°F in winter, raise AC by 2°F in summer.', category: 'home', savingsKgPerYear: 450, difficulty: 'easy', icon: '🌡️' },
  { id: 'h3', title: 'Use a smart power strip', description: 'Eliminate phantom loads from electronics on standby.', category: 'home', savingsKgPerYear: 150, difficulty: 'easy', icon: '🔌' },
  { id: 'h4', title: 'Insulate your home', description: 'Proper insulation can cut heating/cooling costs by 20-30%.', category: 'home', savingsKgPerYear: 800, difficulty: 'hard', icon: '🏠' },
  { id: 'h5', title: 'Switch to green energy', description: 'Choose a renewable energy provider or install solar panels.', category: 'home', savingsKgPerYear: 2000, difficulty: 'hard', icon: '☀️' },
  { id: 'f1', title: 'Try Meatless Mondays', description: 'Skip meat one day a week. Reduces food emissions by ~15%.', category: 'food', savingsKgPerYear: 350, difficulty: 'easy', icon: '🥗' },
  { id: 'f2', title: 'Buy local produce', description: 'Shop at farmers markets. Less transportation means fewer emissions.', category: 'food', savingsKgPerYear: 250, difficulty: 'easy', icon: '🌽' },
  { id: 'f3', title: 'Reduce food waste', description: 'Plan meals and use leftovers. 30% of food is wasted globally.', category: 'food', savingsKgPerYear: 400, difficulty: 'medium', icon: '♻️' },
  { id: 'f4', title: 'Go vegetarian', description: 'A plant-based diet can cut your food emissions by 50%.', category: 'food', savingsKgPerYear: 800, difficulty: 'hard', icon: '🌱' },
  { id: 'f5', title: 'Grow your own herbs', description: 'Start a small herb garden. Zero transport emissions and fresher food.', category: 'food', savingsKgPerYear: 50, difficulty: 'easy', icon: '🌿' },
  { id: 's1', title: 'Buy second-hand clothes', description: 'Thrift stores and online resale reduce fashion\'s carbon impact.', category: 'shopping', savingsKgPerYear: 300, difficulty: 'easy', icon: '👕' },
  { id: 's2', title: 'Repair before replacing', description: 'Fix electronics and appliances instead of buying new ones.', category: 'shopping', savingsKgPerYear: 200, difficulty: 'medium', icon: '🔧' },
  { id: 's3', title: 'Choose quality over quantity', description: 'Invest in durable items that last longer. Less waste overall.', category: 'shopping', savingsKgPerYear: 400, difficulty: 'medium', icon: '✨' },
  { id: 's4', title: 'Borrow or rent items', description: 'For rarely used items, borrow from friends or use rental services.', category: 'shopping', savingsKgPerYear: 150, difficulty: 'easy', icon: '🤝' },
];

/**
 * Returns a sorted list of personalized carbon-reducing tips.
 * Tips from the user's highest-impact category are prioritized. Redundant recommendations
 * are filtered out (e.g. no EV tips if they already drive an EV).
 *
 * @param profile - The user profile containing lifestyle choices.
 * @param breakdown - The calculated carbon footprint breakdown.
 * @returns A filtered and prioritized array of Tip objects.
 */
export function getPersonalizedTips(profile: UserProfile, breakdown: CarbonBreakdown): Tip[] {
  // Sort categories by impact (highest first)
  const categories = [
    { key: 'transport' as const, value: breakdown.transport },
    { key: 'home' as const, value: breakdown.home },
    { key: 'food' as const, value: breakdown.food },
    { key: 'shopping' as const, value: breakdown.shopping },
  ].sort((a, b) => b.value - a.value);

  // Prioritize tips from highest-impact categories
  const sorted = [...ALL_TIPS].sort((a, b) => {
    const aIdx = categories.findIndex(c => c.key === a.category);
    const bIdx = categories.findIndex(c => c.key === b.category);
    if (aIdx !== bIdx) return aIdx - bIdx;
    return b.savingsKgPerYear - a.savingsKgPerYear;
  });

  // Filter out irrelevant tips
  return sorted.filter(tip => {
    if (tip.id === 't5' && profile.transport.carType === 'electric') return false;
    if (tip.id === 't4' && profile.transport.flightsPerYear === 0) return false;
    if (tip.id === 'f4' && (profile.food.dietType === 'vegetarian' || profile.food.dietType === 'vegan')) return false;
    return true;
  });
}

/**
 * Returns the full, unfiltered list of all tips available in the system.
 *
 * @returns An array of all Tip objects.
 */
export function getAllTips(): Tip[] {
  return ALL_TIPS;
}
