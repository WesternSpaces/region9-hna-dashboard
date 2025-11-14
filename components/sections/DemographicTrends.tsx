'use client';

import { Section } from '../ui/Section';
import { Card } from '../ui/Card';
import { StatCard } from '../ui/StatCard';
import { REGION_9_COUNTIES_DATA, REGION_9_AGGREGATE_STATS } from '@/lib/data/region9-constants';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export function DemographicTrends() {
  // Transform data for Population by County chart
  const populationData = REGION_9_COUNTIES_DATA.map(county => ({
    county: county.county.replace(' County', ''),
    population: county.population2023,
  }));

  // Transform data for Population Growth Projections chart
  const growthProjectionData = REGION_9_COUNTIES_DATA.map(county => ({
    county: county.county.replace(' County', ''),
    '2023 Population': county.population2023,
    '2033 Projection': county.population2033Projection,
  }));

  // Transform data for Households by County chart
  const householdsData = REGION_9_COUNTIES_DATA.map(county => ({
    county: county.county.replace(' County', ''),
    households: county.households2023,
  }));

  // Transform data for Average Household Size chart
  const avgHouseholdSizeData = REGION_9_COUNTIES_DATA.map(county => ({
    county: county.county.replace(' County', ''),
    size: county.avgHouseholdSize,
  }));

  // Custom tooltip formatter
  const formatTooltip = (value: any) => {
    if (typeof value === 'number') {
      return value.toLocaleString();
    }
    return value;
  };

  return (
    <Section
      id="demographics"
      title="Section A: Demographic Trends"
      subtitle="Population and household characteristics across Region 9 counties"
    >
      {/* Key Stats */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <StatCard
          label="Total Population (2023)"
          value={REGION_9_AGGREGATE_STATS.totalPopulation2023.toLocaleString()}
          subtitle="All 5 counties"
        />
        <StatCard
          label="Projected Growth (2023-2033)"
          value={`+${REGION_9_AGGREGATE_STATS.populationGrowth.toLocaleString()}`}
          subtitle={`${REGION_9_AGGREGATE_STATS.populationGrowthRate}% increase`}
          trend="up"
        />
        <StatCard
          label="Total Households (2023)"
          value={REGION_9_AGGREGATE_STATS.totalHouseholds2023.toLocaleString()}
          subtitle={`Avg size: ${REGION_9_AGGREGATE_STATS.avgHouseholdSize} persons`}
        />
      </div>

      {/* Charts Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Population by County */}
        <Card title="Population by County (2023)">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={populationData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="county"
                angle={-45}
                textAnchor="end"
                height={100}
                fontSize={12}
              />
              <YAxis />
              <Tooltip formatter={formatTooltip} />
              <Bar dataKey="population" fill="#2563eb" name="Population" />
            </BarChart>
          </ResponsiveContainer>
          <p className="text-xs text-slate-500 mt-2">Source: SDO 2023 Population Estimates</p>
        </Card>

        {/* Population Growth Projections */}
        <Card title="Population Growth Projections (2023-2033)">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={growthProjectionData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="county"
                angle={-45}
                textAnchor="end"
                height={100}
                fontSize={12}
              />
              <YAxis />
              <Tooltip formatter={formatTooltip} />
              <Legend />
              <Line
                type="monotone"
                dataKey="2023 Population"
                stroke="#2563eb"
                strokeWidth={2}
                dot={{ r: 4 }}
              />
              <Line
                type="monotone"
                dataKey="2033 Projection"
                stroke="#16a34a"
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
          <p className="text-xs text-slate-500 mt-2">Source: SDO 2023 Population Projections</p>
        </Card>

        {/* Households by County */}
        <Card title="Households by County (2023)">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={householdsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="county"
                angle={-45}
                textAnchor="end"
                height={100}
                fontSize={12}
              />
              <YAxis />
              <Tooltip formatter={formatTooltip} />
              <Bar dataKey="households" fill="#64748b" name="Households" />
            </BarChart>
          </ResponsiveContainer>
          <p className="text-xs text-slate-500 mt-2">Source: SDO 2023 Household Estimates</p>
        </Card>

        {/* Average Household Size */}
        <Card title="Average Household Size">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={avgHouseholdSizeData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="county"
                angle={-45}
                textAnchor="end"
                height={100}
                fontSize={12}
              />
              <YAxis domain={[0, 3]} />
              <Tooltip formatter={(value: any) => typeof value === 'number' ? value.toFixed(2) : value} />
              <Bar dataKey="size" fill="#0ea5e9" name="Avg Household Size" />
            </BarChart>
          </ResponsiveContainer>
          <p className="text-xs text-slate-500 mt-2">Source: ACS 2019-2023 5-year estimates</p>
        </Card>
      </div>

      {/* Key Insights */}
      <Card title="Key Insights" className="mt-6" highlight>
        <ul className="space-y-2 text-slate-700">
          <li className="flex items-start">
            <span className="text-blue-600 font-bold mr-2">•</span>
            <span><strong>La Plata County</strong> is the most populous county with {REGION_9_COUNTIES_DATA[2].population2023?.toLocaleString()} residents, representing 56% of Region 9's total population.</span>
          </li>
          <li className="flex items-start">
            <span className="text-blue-600 font-bold mr-2">•</span>
            <span>The region is projected to grow by <strong>{REGION_9_AGGREGATE_STATS.populationGrowth.toLocaleString()} people ({REGION_9_AGGREGATE_STATS.populationGrowthRate}%)</strong> over the next decade.</span>
          </li>
          <li className="flex items-start">
            <span className="text-blue-600 font-bold mr-2">•</span>
            <span>Dolores County is projected to <strong>decline by {(REGION_9_COUNTIES_DATA[1].population2023! - REGION_9_COUNTIES_DATA[1].population2033Projection!).toLocaleString()} residents</strong>, the only county with negative growth.</span>
          </li>
          <li className="flex items-start">
            <span className="text-blue-600 font-bold mr-2">•</span>
            <span>Average household sizes range from <strong>1.91-2.37 persons</strong>, with smaller households in mountain/resort counties (San Juan, Dolores).</span>
          </li>
        </ul>
      </Card>
    </Section>
  );
}
