import { NextResponse } from 'next/server';
import { REGION_9_COUNTIES_DATA, REGION_9_AGGREGATE_STATS } from '@/lib/data/region9-constants';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const filter = searchParams.get('filter');
  const sortBy = searchParams.get('sortBy');

  let counties = [...REGION_9_COUNTIES_DATA];

  // Apply filters (with null handling)
  if (filter === 'highVacancy') {
    const minVacancy = parseFloat(searchParams.get('minVacancy') || '20');
    counties = counties.filter(c => (c.vacancyRate || 0) >= minVacancy);
  }

  if (filter === 'lowIncome') {
    counties = counties.filter(c => {
      const lowIncomeTotal = (c.ami.veryLow30 || 0) + (c.ami.veryLow50 || 0) + (c.ami.low80 || 0);
      const totalHouseholds = (c.ami.veryLow30 || 0) + (c.ami.veryLow50 || 0) + (c.ami.low80 || 0) +
                              (c.ami.moderate120 || 0) + (c.ami.middle140 || 0) + (c.ami.upper140Plus || 0);
      return totalHouseholds > 0 && (lowIncomeTotal / totalHouseholds) > 0.40; // >40% low-income
    });
  }

  // Apply sorting (with null handling)
  if (sortBy === 'population') {
    counties.sort((a, b) => (b.population2023 || 0) - (a.population2023 || 0));
  } else if (sortBy === 'vacancy') {
    counties.sort((a, b) => (b.vacancyRate || 0) - (a.vacancyRate || 0));
  } else if (sortBy === 'affordability') {
    counties.sort((a, b) => {
      const ratioA = (a.medianHomeValue && a.medianIncome) ? a.medianHomeValue / a.medianIncome : 0;
      const ratioB = (b.medianHomeValue && b.medianIncome) ? b.medianHomeValue / b.medianIncome : 0;
      return ratioB - ratioA;
    });
  }

  return NextResponse.json({
    counties,
    count: counties.length,
    aggregateStats: REGION_9_AGGREGATE_STATS,
    filters: {
      applied: filter || 'none',
      sortBy: sortBy || 'default'
    }
  });
}
