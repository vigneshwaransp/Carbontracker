// EPA and academic emission factors (kg CO2e)
export const TRANSPORT = {
  CAR_KG_PER_MILE: {
    gasoline: 0.404,
    diesel: 0.370,
    hybrid: 0.213,
    electric: 0.100,
    none: 0,
  },
  PUBLIC_TRANSIT_KG_PER_HOUR: 0.64,
  FLIGHT_KG_PER_ROUND_TRIP: 1100,  // average domestic round-trip
};

export const HOME = {
  ELECTRICITY_KG_PER_KWH: 0.417,   // US average grid
  NATURAL_GAS_KG_PER_THERM: 5.3,
};

export const FOOD = {
  DIET_KG_PER_YEAR: {
    meat_heavy: 3300,
    average: 2500,
    pescatarian: 1900,
    vegetarian: 1700,
    vegan: 1500,
  },
  LOCAL_FOOD_REDUCTION_FACTOR: 0.05,  // 5% reduction per 10% local food
};

export const SHOPPING = {
  CLOTHING_KG_PER_ITEM: 23.0,
  ELECTRONICS_KG_PER_ITEM: 300.0,
};

// Global averages for comparison (tonnes CO2e per year)
export const BENCHMARKS = {
  WORLD_AVERAGE: 4700,
  US_AVERAGE: 16000,
  EU_AVERAGE: 6800,
  INDIA_AVERAGE: 1900,
  TARGET_2030: 2500,
};
