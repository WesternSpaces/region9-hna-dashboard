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

  // Calculate additional insights
  const lowIncomeTotal = countyData.ami.veryLow30 + countyData.ami.veryLow50 + countyData.ami.low80;
  const totalAmiHouseholds =
    countyData.ami.veryLow30 + countyData.ami.veryLow50 + countyData.ami.low80 +
    countyData.ami.moderate120 + countyData.ami.middle140 + countyData.ami.upper140Plus;

  const insights = {
    affordabilityRatio: (countyData.medianHomeValue / countyData.medianIncome).toFixed(2),
    lowIncomePercentage: ((lowIncomeTotal / totalAmiHouseholds) * 100).toFixed(1),
    populationGrowthRate: (((countyData.population2033Projection - countyData.population2023) / countyData.population2023) * 100).toFixed(1),
    housingGap: countyData.households2023 - countyData.occupiedUnits,
    seasonalUnitPercentage: countyData.seasonalRecreational
      ? ((countyData.seasonalRecreational / countyData.totalHousingUnits) * 100).toFixed(1)
      : 'N/A'
  };

  return NextResponse.json({
    ...countyData,
    insights
  });
}
