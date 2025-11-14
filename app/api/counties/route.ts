import { NextResponse } from 'next/server';
import { REGION_9_COUNTIES_DATA, REGION_9_AGGREGATE_STATS } from '@/lib/data/region9-constants';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const filter = searchParams.get('filter');
  const sortBy = searchParams.get('sortBy');

  let counties = [...REGION_9_COUNTIES_DATA];

  // Apply filters
  if (filter === 'highVacancy') {
    const minVacancy = parseFloat(searchParams.get('minVacancy') || '20');
    counties = counties.filter(c => c.vacancyRate >= minVacancy);
  }

  if (filter === 'lowIncome') {
    counties = counties.filter(c => {
      const lowIncomeTotal = c.ami.veryLow30 + c.ami.veryLow50 + c.ami.low80;
      const totalHouseholds = c.ami.veryLow30 + c.ami.veryLow50 + c.ami.low80 +
                              c.ami.moderate120 + c.ami.middle140 + c.ami.upper140Plus;
      return (lowIncomeTotal / totalHouseholds) > 0.40; // >40% low-income
    });
  }

  // Apply sorting
  if (sortBy === 'population') {
    counties.sort((a, b) => b.population2023 - a.population2023);
  } else if (sortBy === 'vacancy') {
    counties.sort((a, b) => b.vacancyRate - a.vacancyRate);
  } else if (sortBy === 'affordability') {
    counties.sort((a, b) => {
      const ratioA = a.medianHomeValue / a.medianIncome;
      const ratioB = b.medianHomeValue / b.medianIncome;
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
