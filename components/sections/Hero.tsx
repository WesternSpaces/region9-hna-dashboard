import { REGION_9_AGGREGATE_STATS } from '@/lib/data/region9-constants';
import { StatCard } from '../ui/StatCard';

export function Hero() {
  return (
    <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4">
            Region 9 Housing Needs Assessment
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Comprehensive data analysis for Southwest Colorado's five counties,
            supporting SB24-174 compliance and informed housing policy decisions
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
          <StatCard
            label="Counties"
            value="5"
            subtitle="Southwest Colorado"
            className="bg-white/10 backdrop-blur border-white/20 text-white"
          />
          <StatCard
            label="Total Population"
            value={REGION_9_AGGREGATE_STATS.totalPopulation2023.toLocaleString()}
            subtitle="2023 Estimate"
            className="bg-white/10 backdrop-blur border-white/20 text-white"
          />
          <StatCard
            label="Housing Units"
            value={REGION_9_AGGREGATE_STATS.totalHousingUnits.toLocaleString()}
            subtitle="All types"
            className="bg-white/10 backdrop-blur border-white/20 text-white"
          />
          <StatCard
            label="Vacancy Rate"
            value={`${REGION_9_AGGREGATE_STATS.regionalVacancyRate.toFixed(1)}%`}
            subtitle="Above 12% healthy rate"
            trend="down"
            className="bg-white/10 backdrop-blur border-white/20 text-white"
          />
        </div>
      </div>
    </section>
  );
}
