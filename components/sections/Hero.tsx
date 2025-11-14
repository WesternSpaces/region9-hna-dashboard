import { REGION_9_AGGREGATE_STATS } from '@/lib/data/region9-constants';
import { StatCard } from '../ui/StatCard';
import { filterCountyData, getFilterDisplayName } from '@/lib/utils/filterData';

interface HeroProps {
  selectedCounty: string | null;
}

export function Hero({ selectedCounty }: HeroProps) {
  const filteredData = filterCountyData(selectedCounty);
  const displayName = getFilterDisplayName(selectedCounty);

  // Calculate stats from filtered data
  const totalPopulation = filteredData.reduce((sum, county) => sum + (county.population2023 || 0), 0);
  const totalHousingUnits = filteredData.reduce((sum, county) => sum + (county.totalHousingUnits || 0), 0);
  const totalOccupied = filteredData.reduce((sum, county) => {
    const occupied = county.totalHousingUnits && county.vacancyRate !== null
      ? Math.round(county.totalHousingUnits * (1 - county.vacancyRate / 100))
      : 0;
    return sum + occupied;
  }, 0);
  const avgVacancyRate = totalHousingUnits > 0
    ? ((totalHousingUnits - totalOccupied) / totalHousingUnits) * 100
    : 0;

  return (
    <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-block mb-4">
            <span className="px-3 py-1 bg-blue-500/20 rounded-full text-sm font-medium">
              SB24-174 Compliance Dashboard
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {displayName}
            <br />
            Housing Needs Assessment
          </h1>
          <p className="text-lg text-slate-300 max-w-3xl mx-auto">
            {selectedCounty
              ? `Comprehensive data analysis for ${selectedCounty} County, supporting SB24-174 compliance and informed housing policy decisions`
              : 'Comprehensive data analysis for Southwest Colorado\'s five counties, supporting SB24-174 compliance and informed housing policy decisions'
            }
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          <StatCard
            label={selectedCounty ? "County" : "Counties"}
            value={selectedCounty ? "1" : "5"}
            subtitle={selectedCounty ? selectedCounty : "Southwest Colorado"}
            className="bg-white/10 border-white/20 text-white"
          />
          <StatCard
            label="Total Population"
            value={totalPopulation.toLocaleString()}
            subtitle="2023 Estimate"
            className="bg-white/10 border-white/20 text-white"
          />
          <StatCard
            label="Housing Units"
            value={totalHousingUnits.toLocaleString()}
            subtitle="All types"
            className="bg-white/10 border-white/20 text-white"
          />
          <StatCard
            label="Vacancy Rate"
            value={`${avgVacancyRate.toFixed(1)}%`}
            subtitle="Above 12% healthy rate"
            trend="down"
            className="bg-white/10 border-white/20 text-white"
          />
        </div>
      </div>
    </section>
  );
}
