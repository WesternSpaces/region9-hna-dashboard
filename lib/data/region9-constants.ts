/**
 * Region 9 County Data Constants for HNA Dashboard
 *
 * Data Sources:
 * - SDO (Colorado State Demography Office): Population, Households, Jobs, Labor Force
 * - BLS (Bureau of Labor Statistics): Unemployment
 * - ACS (American Community Survey 2019-2023 5-year estimates): Housing, Income, Demographics
 * - CHAS (HUD Consolidated Housing Affordability Strategy 2017-2021): AMI Distribution
 *
 * Generated: November 2025
 * Vintage: 2023
 */

export interface Region9CountyData {
  county: string;

  // Section A: Demographics
  population2023: number | null;
  population2033Projection: number | null;
  households2023: number | null;
  households2033Projection: number | null;
  avgHouseholdSize: number | null;

  // Section B: Economics
  jobs2023: number | null;
  jobs2033Projection: number | null;
  medianIncome: number | null;
  unemploymentRate: number | null;
  laborForceParticipationRate: number | null;

  // Section C: Housing Inventory
  totalHousingUnits: number | null;
  occupiedUnits: number | null;
  vacantUnits: number | null;
  vacancyRate: number | null;
  ownerOccupied: number | null;
  renterOccupied: number | null;
  seasonalRecreational: number | null;

  // Section D: Housing Market
  medianHomeValue: number | null;
  medianGrossRent: number | null;

  // Section E: Housing Problems
  costBurdened30Plus: number | null; // Households paying 30%+ of income for housing
  costBurdened50Plus: number | null; // Households paying 50%+ of income for housing
  ownerCostBurdenRate: number | null; // Percentage of owners cost burdened
  renterCostBurdenRate: number | null; // Percentage of renters cost burdened

  // AMI Distribution (from CHAS data)
  ami: {
    veryLow30: number | null; // ≤30% AMI
    veryLow50: number | null; // 31-50% AMI
    low80: number | null; // 51-80% AMI
    moderate120: number | null; // 81-120% AMI
    middle140: number | null; // 121-140% AMI
    upper140Plus: number | null; // >140% AMI
  };

  // Data quality notes
  dataQualityNotes: string[];
}

export const REGION_9_COUNTIES_DATA: Region9CountyData[] = [
  {
    county: "Archuleta County",
    population2023: 14182,
    population2033Projection: 14803,
    households2023: 6117,
    households2033Projection: null,
    avgHouseholdSize: 2.3,
    jobs2023: 6932,
    jobs2033Projection: null,
    medianIncome: 76524,
    unemploymentRate: null,
    laborForceParticipationRate: 41.8,
    totalHousingUnits: 9710,
    occupiedUnits: 5904,
    vacantUnits: 3806,
    vacancyRate: 39.2,
    ownerOccupied: 4573,
    renterOccupied: 1331,
    seasonalRecreational: 3059,
    medianHomeValue: 451400,
    medianGrossRent: 1409,
    costBurdened30Plus: 1331,
    costBurdened50Plus: 666,
    ownerCostBurdenRate: 19.9,
    renterCostBurdenRate: 31.6,
    ami: {
      veryLow30: 543,
      veryLow50: 630,
      low80: 1179,
      moderate120: 1180,
      middle140: 479,
      upper140Plus: 1750,
    },
    dataQualityNotes: [],
  },
  {
    county: "Dolores County",
    population2023: 2271,
    population2033Projection: 2097,
    households2023: 963,
    households2033Projection: null,
    avgHouseholdSize: 1.93,
    jobs2023: null,
    jobs2033Projection: null,
    medianIncome: 70490,
    unemploymentRate: null,
    laborForceParticipationRate: 37.5,
    totalHousingUnits: 1640,
    occupiedUnits: 1238,
    vacantUnits: 402,
    vacancyRate: 24.5,
    ownerOccupied: 1041,
    renterOccupied: 197,
    seasonalRecreational: 282,
    medianHomeValue: 231900,
    medianGrossRent: 1688,
    costBurdened30Plus: 101,
    costBurdened50Plus: 63,
    ownerCostBurdenRate: 6.1,
    renterCostBurdenRate: 19.3,
    ami: {
      veryLow30: 144,
      veryLow50: 87,
      low80: 219,
      moderate120: 189,
      middle140: 90,
      upper140Plus: 400,
    },
    dataQualityNotes: ["Jobs data not available (small population)"],
  },
  {
    county: "La Plata County",
    population2023: 56421,
    population2033Projection: 59181,
    households2023: 24383,
    households2033Projection: null,
    avgHouseholdSize: 2.34,
    jobs2023: 34399,
    jobs2033Projection: null,
    medianIncome: 85296,
    unemploymentRate: null,
    laborForceParticipationRate: 42.0,
    totalHousingUnits: 28613,
    occupiedUnits: 23200,
    vacantUnits: 5413,
    vacancyRate: 18.9,
    ownerOccupied: 16462,
    renterOccupied: 6738,
    seasonalRecreational: 3044,
    medianHomeValue: 549100,
    medianGrossRent: 1409,
    costBurdened30Plus: 3924,
    costBurdened50Plus: 3002,
    ownerCostBurdenRate: 14.3,
    renterCostBurdenRate: 23.3,
    ami: {
      veryLow30: 2295,
      veryLow50: 2800,
      low80: 3835,
      moderate120: 3945,
      middle140: 2325,
      upper140Plus: 6835,
    },
    dataQualityNotes: [],
  },
  {
    county: "Montezuma County",
    population2023: 26641,
    population2033Projection: 27089,
    households2023: 10892,
    households2033Projection: null,
    avgHouseholdSize: 2.37,
    jobs2023: 12098,
    jobs2033Projection: null,
    medianIncome: 63005,
    unemploymentRate: null,
    laborForceParticipationRate: 39.1,
    totalHousingUnits: 12314,
    occupiedUnits: 10915,
    vacantUnits: 1399,
    vacancyRate: 11.4,
    ownerOccupied: 8168,
    renterOccupied: 2747,
    seasonalRecreational: 502,
    medianHomeValue: 308100,
    medianGrossRent: 974,
    costBurdened30Plus: 1757,
    costBurdened50Plus: 1250,
    ownerCostBurdenRate: 10.4,
    renterCostBurdenRate: 33.0,
    ami: {
      veryLow30: 1195,
      veryLow50: 1435,
      low80: 2075,
      moderate120: 1910,
      middle140: 1110,
      upper140Plus: 2670,
    },
    dataQualityNotes: [],
  },
  {
    county: "San Juan County",
    population2023: 803,
    population2033Projection: 856,
    households2023: 386,
    households2033Projection: null,
    avgHouseholdSize: 1.91,
    jobs2023: null,
    jobs2033Projection: null,
    medianIncome: 73889,
    unemploymentRate: null,
    laborForceParticipationRate: 44.4,
    totalHousingUnits: 720,
    occupiedUnits: 362,
    vacantUnits: 358,
    vacancyRate: 49.7,
    ownerOccupied: 201,
    renterOccupied: 161,
    seasonalRecreational: 297,
    medianHomeValue: 406900,
    medianGrossRent: 1076,
    costBurdened30Plus: 49,
    costBurdened50Plus: 47,
    ownerCostBurdenRate: 11.4,
    renterCostBurdenRate: 16.1,
    ami: {
      veryLow30: 49,
      veryLow50: 36,
      low80: 36,
      moderate120: 66,
      middle140: 33,
      upper140Plus: 99,
    },
    dataQualityNotes: ["Jobs data not available (small population)"],
  },
];

/**
 * Regional aggregate statistics for Region 9 (all 5 counties combined)
 */
export const REGION_9_AGGREGATE_STATS = {
  // Demographics
  totalPopulation2023: 100318,
  totalPopulation2033Projection: 104026,
  populationGrowth: 3708,
  populationGrowthRate: 3.7, // percent

  totalHouseholds2023: 42741,
  avgHouseholdSize: 2.3, // Weighted average

  // Economics
  totalJobs2023: 53429, // Archuleta + La Plata + Montezuma (Dolores and San Juan excluded due to missing data)
  weightedMedianIncome: 77923, // Weighted by households
  avgLaborForceParticipation: 40.8, // Weighted by population

  // Housing Inventory
  totalHousingUnits: 52997,
  totalOccupiedUnits: 41619,
  totalVacantUnits: 11378,
  regionalVacancyRate: 21.5,
  totalOwnerOccupied: 30445,
  totalRenterOccupied: 11174,
  totalSeasonalRecreational: 7184,
  ownershipRate: 73.2, // Percent of occupied units that are owner-occupied
  rentalRate: 26.8, // Percent of occupied units that are renter-occupied

  // Housing Market
  medianHomeValueRange: {
    min: 231900, // Dolores County
    max: 549100, // La Plata County
    weighted: 456920, // Weighted by owner-occupied units
  },
  medianGrossRentRange: {
    min: 974, // Montezuma County
    max: 1688, // Dolores County
    weighted: 1311, // Weighted by renter-occupied units
  },

  // Housing Problems
  totalCostBurdened30Plus: 7162, // Sum across all counties
  totalCostBurdened50Plus: 5028, // Sum across all counties
  regionalOwnerCostBurdenRate: 12.7, // Weighted average
  regionalRenterCostBurdenRate: 26.3, // Weighted average

  // AMI Distribution (Regional totals)
  regionalAMI: {
    veryLow30: 4226, // ≤30% AMI
    veryLow50: 4988, // 31-50% AMI
    low80: 7344, // 51-80% AMI
    moderate120: 7290, // 81-120% AMI
    middle140: 4037, // 121-140% AMI
    upper140Plus: 11754, // >140% AMI
    totalHouseholds: 39639, // CHAS total (may differ slightly from SDO estimates)
  },

  // Housing Needs
  lowIncomeHouseholds: 16558, // Sum of veryLow30 + veryLow50 + low80
  affordabilityGapPercent: 41.8, // Low-income households as % of total
};

/**
 * Data vintage and source information
 */
export const DATA_METADATA = {
  vintage: 2023,
  generatedDate: "2025-11-13",
  sources: {
    sdo: {
      name: "Colorado State Demography Office",
      vintage: 2023,
      tables: [
        "SDO Population",
        "SDO Household Estimates & Projections",
        "SDO Jobs by Sector Estimates",
        "SDO Job Projections",
        "SDO Labor Force Participation",
      ],
    },
    acs: {
      name: "U.S. Census Bureau, American Community Survey",
      period: "2019-2023",
      type: "5-year estimates",
      tables: [
        "B25001 (Housing Units)",
        "B25002 (Occupancy and Vacancy)",
        "B25003 (Household Tenure)",
        "B25004 (Vacancy Status)",
        "B25010 (Average Household Size by Tenure)",
        "B25077 (Median Home Value)",
        "B25064 (Median Gross Rent)",
        "B25070 (Cost Burdened, Owner)",
        "B25071 (Cost Burdened, Rental)",
        "B19013 (Median Household Income)",
      ],
    },
    chas: {
      name: "HUD Consolidated Planning/CHAS Data",
      period: "2017-2021",
      type: "5-year estimates",
      tables: ["CHAS Table 11 (AMI Level by Tenure)"],
    },
    bls: {
      name: "Bureau of Labor Statistics",
      tables: ["BLS Unemployment"],
      notes: "Data format variation prevented extraction for all counties",
    },
  },
  dataQualityNotes: [
    "Household projections (2033): Not available from SDO for all counties",
    "Jobs projections (2033): Not available from SDO for all counties",
    "Jobs 2023: Not available for Dolores and San Juan counties (small population)",
    "Unemployment rates: BLS data format variation prevented automated extraction",
    "High vacancy rates in Archuleta (39.2%) and San Juan (49.7%) driven by seasonal/recreational units",
    "CHAS AMI data (2017-2021) is 2 years older than ACS data (2019-2023)",
  ],
};

/**
 * Helper function to get county data by name
 */
export function getCountyData(countyName: string): Region9CountyData | undefined {
  return REGION_9_COUNTIES_DATA.find(
    (c) => c.county.toLowerCase() === countyName.toLowerCase()
  );
}

/**
 * Helper function to get all counties
 */
export function getAllCounties(): string[] {
  return REGION_9_COUNTIES_DATA.map((c) => c.county);
}

/**
 * Helper function to calculate total low-income households (≤80% AMI) for a county
 */
export function getLowIncomeHouseholds(countyName: string): number | null {
  const county = getCountyData(countyName);
  if (!county) return null;

  const { ami } = county;
  if (!ami.veryLow30 || !ami.veryLow50 || !ami.low80) {
    return null;
  }

  return ami.veryLow30 + ami.veryLow50 + ami.low80;
}

/**
 * Helper function to calculate affordability gap percentage
 * Returns the percentage of households at or below 80% AMI
 */
export function getAffordabilityGapPercent(countyName: string): number | null {
  const county = getCountyData(countyName);
  if (!county) return null;

  const lowIncome = getLowIncomeHouseholds(countyName);
  if (!lowIncome) return null;

  // Sum all AMI categories to get total from CHAS
  const { ami } = county;
  const total =
    (ami.veryLow30 || 0) +
    (ami.veryLow50 || 0) +
    (ami.low80 || 0) +
    (ami.moderate120 || 0) +
    (ami.middle140 || 0) +
    (ami.upper140Plus || 0);

  if (total === 0) return null;

  return Math.round((lowIncome / total) * 100 * 10) / 10; // Round to 1 decimal
}

/**
 * Helper function to get vacancy rate category
 */
export function getVacancyRateCategory(
  vacancyRate: number | null
): "Low" | "Moderate" | "High" | "Very High" | null {
  if (vacancyRate === null) return null;
  if (vacancyRate < 10) return "Low";
  if (vacancyRate < 20) return "Moderate";
  if (vacancyRate < 30) return "High";
  return "Very High";
}

/**
 * Helper function to compare county to regional average
 */
export function compareToRegional(
  countyValue: number | null,
  regionalValue: number
): {
  difference: number;
  percentage: number;
  isAbove: boolean;
} | null {
  if (countyValue === null) return null;

  const difference = countyValue - regionalValue;
  const percentage = Math.round((difference / regionalValue) * 100 * 10) / 10;

  return {
    difference,
    percentage,
    isAbove: countyValue > regionalValue,
  };
}
