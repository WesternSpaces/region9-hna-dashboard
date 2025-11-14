import { NextResponse } from 'next/server';
import { REGION_9_COUNTIES_DATA } from '@/lib/data/region9-constants';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ county: string }> }
) {
  const { county: countyName } = await params;

  // Find county (case-insensitive)
  const countyData = REGION_9_COUNTIES_DATA.find(
    c => c.county.toLowerCase() === countyName.toLowerCase()
  );

  if (!countyData) {
    return NextResponse.json(
      { error: 'County not found', availableCounties: REGION_9_COUNTIES_DATA.map(c => c.county) },
      { status: 404 }
    );
  }

  // Calculate additional insights (with null handling)
  const lowIncomeTotal = (countyData.ami.veryLow30 || 0) + (countyData.ami.veryLow50 || 0) + (countyData.ami.low80 || 0);
  const totalAmiHouseholds =
    (countyData.ami.veryLow30 || 0) + (countyData.ami.veryLow50 || 0) + (countyData.ami.low80 || 0) +
    (countyData.ami.moderate120 || 0) + (countyData.ami.middle140 || 0) + (countyData.ami.upper140Plus || 0);

  const insights = {
    affordabilityRatio: countyData.medianHomeValue && countyData.medianIncome
      ? (countyData.medianHomeValue / countyData.medianIncome).toFixed(2)
      : 'N/A',
    lowIncomePercentage: totalAmiHouseholds > 0 ? ((lowIncomeTotal / totalAmiHouseholds) * 100).toFixed(1) : 'N/A',
    populationGrowthRate: countyData.population2033Projection && countyData.population2023
      ? (((countyData.population2033Projection - countyData.population2023) / countyData.population2023) * 100).toFixed(1)
      : 'N/A',
    housingGap: (countyData.households2023 || 0) - (countyData.occupiedUnits || 0),
    seasonalUnitPercentage: countyData.seasonalRecreational && countyData.totalHousingUnits
      ? ((countyData.seasonalRecreational / countyData.totalHousingUnits) * 100).toFixed(1)
      : 'N/A'
  };

  return NextResponse.json({
    ...countyData,
    insights
  });
}
