import { NextResponse } from 'next/server';
import { REGION_9_AGGREGATE_STATS, REGION_9_COUNTIES_DATA } from '@/lib/data/region9-constants';

export async function GET() {
  // Calculate additional regional statistics
  const totalLowIncome = REGION_9_COUNTIES_DATA.reduce((sum, county) => {
    return sum + county.ami.veryLow30 + county.ami.veryLow50 + county.ami.low80;
  }, 0);

  const totalAmiHouseholds = REGION_9_COUNTIES_DATA.reduce((sum, county) => {
    return sum +
      county.ami.veryLow30 + county.ami.veryLow50 + county.ami.low80 +
      county.ami.moderate120 + county.ami.middle140 + county.ami.upper140Plus;
  }, 0);

  const totalSeasonalUnits = REGION_9_COUNTIES_DATA.reduce((sum, county) => {
    return sum + (county.seasonalRecreational || 0);
  }, 0);

  const averageAffordabilityRatio = REGION_9_COUNTIES_DATA.reduce((sum, county) => {
    return sum + (county.medianHomeValue / county.medianIncome);
  }, 0) / REGION_9_COUNTIES_DATA.length;

  const regionalStats = {
    ...REGION_9_AGGREGATE_STATS,
    lowIncomeHouseholds: totalLowIncome,
    lowIncomePercentage: ((totalLowIncome / totalAmiHouseholds) * 100).toFixed(1),
    seasonalUnits: totalSeasonalUnits,
    seasonalUnitPercentage: ((totalSeasonalUnits / REGION_9_AGGREGATE_STATS.totalHousingUnits) * 100).toFixed(1),
    averageAffordabilityRatio: averageAffordabilityRatio.toFixed(2),
    projectedPopulationGrowth: REGION_9_AGGREGATE_STATS.totalPopulation2033Projection - REGION_9_AGGREGATE_STATS.totalPopulation2023,
    projectedHouseholdGrowth: REGION_9_AGGREGATE_STATS.totalHouseholds2033Projection - REGION_9_AGGREGATE_STATS.totalHouseholds2023,
    housingGap: REGION_9_AGGREGATE_STATS.totalHouseholds2023 - REGION_9_AGGREGATE_STATS.totalOccupiedUnits
  };

  return NextResponse.json({
    region: 'Region 9 Economic Development District',
    description: 'Southwest Colorado - 5 Counties',
    counties: REGION_9_COUNTIES_DATA.map(c => c.county),
    stats: regionalStats,
    dataVintage: {
      population: 'SDO 2023',
      housing: 'ACS 2019-2023',
      ami: 'CHAS 2017-2021'
    }
  });
}
