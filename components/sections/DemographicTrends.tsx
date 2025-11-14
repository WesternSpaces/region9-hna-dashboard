'use client';

import { Section } from '../ui/Section';
import { Card } from '../ui/Card';
import { StatCard } from '../ui/StatCard';
import { REGION_9_COUNTIES_DATA, REGION_9_AGGREGATE_STATS } from '@/lib/data/region9-constants';
import { REGION_9_HISTORICAL_DATA } from '@/lib/data/region9-historical';
import { REGION_9_COMPREHENSIVE_DATA } from '@/lib/data/region9-comprehensive';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { filterCountyData, getFilterDisplayName } from '@/lib/utils/filterData';

interface DemographicTrendsProps {
  selectedCounty: string | null;
}

export function DemographicTrends({ selectedCounty }: DemographicTrendsProps) {
  const filteredData = filterCountyData(selectedCounty);
  const displayName = getFilterDisplayName(selectedCounty);

  // Calculate aggregate stats from filtered data
  const totalPopulation2023 = filteredData.reduce((sum, county) => sum + (county.population2023 || 0), 0);
  const totalPopulation2033 = filteredData.reduce((sum, county) => sum + (county.population2033Projection || 0), 0);
  const populationGrowth = totalPopulation2033 - totalPopulation2023;
  const populationGrowthRate = totalPopulation2023 > 0
    ? ((populationGrowth / totalPopulation2023) * 100).toFixed(1)
    : '0.0';
  const totalHouseholds = filteredData.reduce((sum, county) => sum + (county.households2023 || 0), 0);
  const avgHouseholdSize = totalHouseholds > 0
    ? (totalPopulation2023 / totalHouseholds).toFixed(2)
    : '0.00';

  // Transform data for Population by County chart
  const populationData = filteredData.map(county => ({
    county: county.county.replace(' County', ''),
    population: county.population2023,
  }));

  // Transform data for Population Growth Projections chart
  const growthProjectionData = filteredData.map(county => ({
    county: county.county.replace(' County', ''),
    '2023 Population': county.population2023,
    '2033 Projection': county.population2033Projection,
  }));

  // Transform data for Households by County chart
  const householdsData = filteredData.map(county => ({
    county: county.county.replace(' County', ''),
    households: county.households2023,
  }));

  // Transform data for Average Household Size chart
  const avgHouseholdSizeData = filteredData.map(county => ({
    county: county.county.replace(' County', ''),
    size: county.avgHouseholdSize,
  }));

  // Prepare historical trend data for single county or regional aggregate
  const prepareHistoricalTrendData = () => {
    if (selectedCounty) {
      // Single county - show that county's historical trend
      const countyHistorical = REGION_9_HISTORICAL_DATA.find(c => c.county === selectedCounty);
      if (!countyHistorical) return [];

      const years = Object.keys(countyHistorical.population).filter(year =>
        parseInt(year) >= 2013 && parseInt(year) <= 2033
      ).sort();

      return years.map(year => ({
        year: parseInt(year),
        Population: countyHistorical.population[year],
        Households: countyHistorical.households[year],
      })).filter(d => d.Population !== null || d.Households !== null);
    } else {
      // Regional aggregate - sum all counties
      const years = Array.from({length: 21}, (_, i) => 2013 + i);
      return years.map(year => {
        const yearStr = year.toString();
        const totalPop = REGION_9_HISTORICAL_DATA.reduce((sum, county) =>
          sum + (county.population[yearStr] || 0), 0
        );
        const totalHH = REGION_9_HISTORICAL_DATA.reduce((sum, county) =>
          sum + (county.households[yearStr] || 0), 0
        );
        return {
          year,
          Population: totalPop || null,
          Households: totalHH || null,
        };
      }).filter(d => d.Population !== null || d.Households !== null);
    }
  };

  const historicalTrendData = prepareHistoricalTrendData();

  // Prepare age distribution time-series data
  const prepareAgeDistributionData = () => {
    const ageCohorts = ['0-17', '18-24', '25-44', '45-64', '65-74', '75+'];

    if (selectedCounty) {
      // Single county
      const countyData = REGION_9_COMPREHENSIVE_DATA.find(c => c.county === selectedCounty);
      if (!countyData || !countyData.ageDistribution) return [];

      const years = Object.keys(countyData.ageDistribution['0-17'] || {})
        .filter(year => parseInt(year) >= 2013 && parseInt(year) <= 2033)
        .sort();

      return years.map(year => {
        const dataPoint: any = { year: parseInt(year) };
        ageCohorts.forEach(cohort => {
          dataPoint[cohort] = countyData.ageDistribution[cohort as keyof typeof countyData.ageDistribution]?.[year] || null;
        });
        return dataPoint;
      });
    } else {
      // Regional aggregate
      const years = Array.from({length: 21}, (_, i) => 2013 + i);

      return years.map(year => {
        const yearStr = year.toString();
        const dataPoint: any = { year };

        ageCohorts.forEach(cohort => {
          const total = REGION_9_COMPREHENSIVE_DATA.reduce((sum, county) => {
            const value = county.ageDistribution[cohort as '0-17' | '18-24' | '25-44' | '45-64' | '65-74' | '75+']?.[yearStr];
            return sum + (value || 0);
          }, 0);
          dataPoint[cohort] = total || null;
        });

        return dataPoint;
      });
    }
  };

  const ageDistributionData = prepareAgeDistributionData();

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
          value={totalPopulation2023.toLocaleString()}
          subtitle={selectedCounty ? selectedCounty : "All 5 counties"}
        />
        <StatCard
          label="Projected Growth (2023-2033)"
          value={`${populationGrowth >= 0 ? '+' : ''}${populationGrowth.toLocaleString()}`}
          subtitle={`${populationGrowthRate}% ${parseFloat(populationGrowthRate) >= 0 ? 'increase' : 'decrease'}`}
          trend={parseFloat(populationGrowthRate) >= 0 ? "up" : "down"}
        />
        <StatCard
          label="Total Households (2023)"
          value={totalHouseholds.toLocaleString()}
          subtitle={`Avg size: ${avgHouseholdSize} persons`}
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
            <BarChart data={growthProjectionData}>
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
              <Bar
                dataKey="2023 Population"
                fill="#2563eb"
                name="2023 Population"
              />
              <Bar
                dataKey="2033 Projection"
                fill="#16a34a"
                name="2033 Projection"
              />
            </BarChart>
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

      {/* Historical Trends - Full Width */}
      <Card title={`Historical Trends (2013-2033)${selectedCounty ? ` - ${selectedCounty}` : ' - Region 9'}`} className="mt-6" highlight>
        {historicalTrendData.length > 0 ? (
          <>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={historicalTrendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="year"
                  label={{ value: 'Year', position: 'insideBottom', offset: -5 }}
                />
                <YAxis
                  yAxisId="left"
                  label={{ value: 'Population', angle: -90, position: 'insideLeft' }}
                />
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  label={{ value: 'Households', angle: 90, position: 'insideRight' }}
                />
                <Tooltip formatter={formatTooltip} />
                <Legend />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="Population"
                  stroke="#2563eb"
                  strokeWidth={3}
                  dot={{ r: 3 }}
                  name="Population"
                  connectNulls
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="Households"
                  stroke="#64748b"
                  strokeWidth={3}
                  dot={{ r: 3 }}
                  name="Households"
                  connectNulls
                />
              </LineChart>
            </ResponsiveContainer>
            <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded">
              <p className="text-sm text-blue-900">
                <strong>Historical Data (2013-2023):</strong> SDO actual estimates and observations.
                <strong className="ml-3">Projections (2024-2033):</strong> SDO forecast based on demographic trends.
                {selectedCounty && ` Showing ${selectedCounty} specific trends over time.`}
              </p>
            </div>
            <p className="text-xs text-slate-500 mt-2">Source: SDO 2023 Vintage Population & Household Estimates and Projections</p>
          </>
        ) : (
          <p className="text-slate-600">No historical data available for this selection.</p>
        )}
      </Card>

      {/* Age Distribution Over Time */}
      <Card title={`Age Distribution Over Time (2013-2033)${selectedCounty ? ` - ${selectedCounty}` : ' - Region 9'}`} className="mt-6" highlight>
        {ageDistributionData.length > 0 ? (
          <>
            <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded">
              <p className="text-sm text-blue-900">
                <strong>Demographic Shifts:</strong> Shows aging population trends, youth retention/loss, and retirement migration.
                Critical for planning accessible housing, senior housing, and family-sized units.
              </p>
            </div>
            <ResponsiveContainer width="100%" height={400}>
              <AreaChart data={ageDistributionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="year"
                  label={{ value: 'Year', position: 'insideBottom', offset: -5 }}
                />
                <YAxis
                  label={{ value: 'Population', angle: -90, position: 'insideLeft' }}
                />
                <Tooltip formatter={formatTooltip} />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="75+"
                  stackId="1"
                  stroke="#7c3aed"
                  fill="#7c3aed"
                  fillOpacity={0.7}
                  name="75+ years"
                />
                <Area
                  type="monotone"
                  dataKey="65-74"
                  stackId="1"
                  stroke="#a855f7"
                  fill="#a855f7"
                  fillOpacity={0.7}
                  name="65-74 years"
                />
                <Area
                  type="monotone"
                  dataKey="45-64"
                  stackId="1"
                  stroke="#3b82f6"
                  fill="#3b82f6"
                  fillOpacity={0.7}
                  name="45-64 years"
                />
                <Area
                  type="monotone"
                  dataKey="25-44"
                  stackId="1"
                  stroke="#10b981"
                  fill="#10b981"
                  fillOpacity={0.7}
                  name="25-44 years"
                />
                <Area
                  type="monotone"
                  dataKey="18-24"
                  stackId="1"
                  stroke="#f59e0b"
                  fill="#f59e0b"
                  fillOpacity={0.7}
                  name="18-24 years"
                />
                <Area
                  type="monotone"
                  dataKey="0-17"
                  stackId="1"
                  stroke="#ef4444"
                  fill="#ef4444"
                  fillOpacity={0.7}
                  name="0-17 years"
                />
              </AreaChart>
            </ResponsiveContainer>
            <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-3">
              <div className="p-2 bg-purple-50 border border-purple-200 rounded">
                <p className="text-xs font-semibold text-purple-900">SENIORS (65+)</p>
                <p className="text-xs text-purple-700 mt-1">Growing share - accessible housing need</p>
              </div>
              <div className="p-2 bg-blue-50 border border-blue-200 rounded">
                <p className="text-xs font-semibold text-blue-900">WORKING AGE (25-64)</p>
                <p className="text-xs text-blue-700 mt-1">Core workforce - family housing demand</p>
              </div>
              <div className="p-2 bg-red-50 border border-red-200 rounded">
                <p className="text-xs font-semibold text-red-900">YOUTH (0-24)</p>
                <p className="text-xs text-red-700 mt-1">Declining share may indicate out-migration</p>
              </div>
            </div>
            <p className="text-xs text-slate-500 mt-4">Source: SDO 2023 Vintage Age Distribution Estimates and Projections</p>
          </>
        ) : (
          <p className="text-slate-600">No age distribution data available for this selection.</p>
        )}
      </Card>

      {/* Key Insights */}
      <Card title="Key Insights" className="mt-6" highlight>
        <ul className="space-y-2 text-slate-700">
          {!selectedCounty ? (
            <>
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
            </>
          ) : (
            <>
              <li className="flex items-start">
                <span className="text-blue-600 font-bold mr-2">•</span>
                <span><strong>{selectedCounty}</strong> has a population of <strong>{totalPopulation2023.toLocaleString()}</strong> residents as of 2023.</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 font-bold mr-2">•</span>
                <span>Population is projected to {populationGrowth >= 0 ? 'grow' : 'decline'} by <strong>{Math.abs(populationGrowth).toLocaleString()} people ({populationGrowthRate}%)</strong> by 2033.</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 font-bold mr-2">•</span>
                <span>The county has <strong>{totalHouseholds.toLocaleString()} households</strong> with an average household size of <strong>{avgHouseholdSize} persons</strong>.</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 font-bold mr-2">•</span>
                <span>By 2033, the projected population will be <strong>{totalPopulation2033.toLocaleString()}</strong> residents.</span>
              </li>
            </>
          )}
        </ul>
      </Card>
    </Section>
  );
}
