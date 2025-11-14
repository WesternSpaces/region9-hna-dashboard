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
    <section className="relative bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800 text-white py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE0YzMuMzE0IDAgNiAyLjY4NiA2IDZzLTIuNjg2IDYtNiA2LTYtMi42ODYtNi02IDIuNjg2LTYgNi02ek0xNCAzNmMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-20"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block mb-6">
            <span className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold tracking-wide">
              SB24-174 Compliance Dashboard
            </span>
          </div>
          <h1 className="text-6xl md:text-7xl font-extrabold mb-6 leading-tight">
            {displayName}
            <br />
            <span className="bg-gradient-to-r from-yellow-200 to-amber-200 bg-clip-text text-transparent">
              Housing Needs Assessment
            </span>
          </h1>
          <p className="text-xl text-blue-100 max-w-4xl mx-auto leading-relaxed">
            {selectedCounty
              ? `Comprehensive data analysis for ${selectedCounty} County, supporting SB24-174 compliance and informed housing policy decisions`
              : 'Comprehensive data analysis for Southwest Colorado\'s five counties, supporting SB24-174 compliance and informed housing policy decisions'
            }
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
          <StatCard
            label={selectedCounty ? "County" : "Counties"}
            value={selectedCounty ? "1" : "5"}
            subtitle={selectedCounty ? selectedCounty : "Southwest Colorado"}
            className="bg-white/10 backdrop-blur border-white/20 text-white"
          />
          <StatCard
            label="Total Population"
            value={totalPopulation.toLocaleString()}
            subtitle="2023 Estimate"
            className="bg-white/10 backdrop-blur border-white/20 text-white"
          />
          <StatCard
            label="Housing Units"
            value={totalHousingUnits.toLocaleString()}
            subtitle="All types"
            className="bg-white/10 backdrop-blur border-white/20 text-white"
          />
          <StatCard
            label="Vacancy Rate"
            value={`${avgVacancyRate.toFixed(1)}%`}
            subtitle="Above 12% healthy rate"
            trend="down"
            className="bg-white/10 backdrop-blur border-white/20 text-white"
          />
        </div>
      </div>
    </section>
  );
}
