'use client';

import { Section } from '../ui/Section';
import { Card } from '../ui/Card';
import { StatCard } from '../ui/StatCard';
import { REGION_9_COUNTIES_DATA, REGION_9_AGGREGATE_STATS } from '@/lib/data/region9-constants';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { filterCountyData, getFilterDisplayName } from '@/lib/utils/filterData';

interface EconomicTrendsProps {
  selectedCounty: string | null;
}

export function EconomicTrends({ selectedCounty }: EconomicTrendsProps) {
  const filteredData = filterCountyData(selectedCounty);
  const displayName = getFilterDisplayName(selectedCounty);

  // Calculate aggregate stats from filtered data
  const totalJobs = filteredData.reduce((sum, county) => sum + (county.jobs2023 || 0), 0);
  const totalPopulation = filteredData.reduce((sum, county) => sum + (county.population2023 || 0), 0);
  const totalHouseholds = filteredData.reduce((sum, county) => sum + (county.households2023 || 0), 0);
  const weightedMedianIncome = totalHouseholds > 0
    ? filteredData.reduce((sum, county) => sum + (county.medianIncome || 0) * (county.households2023 || 0), 0) / totalHouseholds
    : 0;
  const avgLaborForce = filteredData.length > 0
    ? filteredData.reduce((sum, county) => sum + (county.laborForceParticipationRate || 0), 0) / filteredData.length
    : 0;

  // Transform data for Jobs by County chart (filter out counties with no data)
  const jobsData = filteredData.filter(county => county.jobs2023 !== null).map(county => ({
    county: county.county.replace(' County', ''),
    jobs: county.jobs2023,
  }));

  // Transform data for Median Income chart
  const incomeData = filteredData.map(county => ({
    county: county.county.replace(' County', ''),
    income: county.medianIncome,
  }));

  // Transform data for Labor Force Participation chart
  const laborForceData = filteredData.map(county => ({
    county: county.county.replace(' County', ''),
    rate: county.laborForceParticipationRate,
  }));

  // Custom tooltip formatter
  const formatTooltip = (value: any) => {
    if (typeof value === 'number') {
      return value.toLocaleString();
    }
    return value;
  };

  const formatCurrency = (value: any) => {
    if (typeof value === 'number') {
      return `$${value.toLocaleString()}`;
    }
    return value;
  };

  const formatPercent = (value: any) => {
    if (typeof value === 'number') {
      return `${value.toFixed(1)}%`;
    }
    return value;
  };

  return (
    <Section
      id="economics"
      title="Section B: Economic Trends"
      subtitle="Employment, income, and labor force characteristics"
    >
      {/* Key Stats */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <StatCard
          label="Total Jobs (2023)"
          value={totalJobs > 0 ? totalJobs.toLocaleString() : 'N/A'}
          subtitle={selectedCounty || "Archuleta, La Plata, Montezuma"}
        />
        <StatCard
          label="Weighted Median Income"
          value={`$${Math.round(weightedMedianIncome).toLocaleString()}`}
          subtitle={selectedCounty ? `${selectedCounty} median` : "Regional median household income"}
        />
        <StatCard
          label="Labor Force Participation"
          value={`${avgLaborForce.toFixed(1)}%`}
          subtitle={selectedCounty ? `${selectedCounty} rate` : "Regional average"}
        />
      </div>

      {/* Key Insights - HNA Requirements */}
      <Card title="Key Insights: Economic Analysis (HNA Framework Section B)" className="mb-8 bg-blue-50 border-2 border-blue-200">
        <div className="space-y-3">
          <div>
            <h4 className="font-semibold text-slate-900 mb-2">Required HNA Output:</h4>
            <ul className="list-disc list-inside space-y-1 text-sm text-slate-700">
              <li><strong>(IV) Jobs Sorted by Annual Salary/Wage:</strong> Current data shows {totalJobs.toLocaleString()} jobs across the region, requiring detailed wage-level analysis for workforce housing planning</li>
              <li><strong>Jobs-to-Households Ratio:</strong> Understanding employment density helps allocate housing needs across jurisdictions</li>
              <li><strong>Wage-Housing Affordability Gap:</strong> Median income of ${Math.round(weightedMedianIncome).toLocaleString()} must be compared against housing costs to identify affordability gaps</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-slate-900 mb-2">Key Economic Indicators for Housing Need:</h4>
            <ul className="list-disc list-inside space-y-1 text-sm text-slate-700">
              <li><strong>Wage Distribution:</strong> Jobs should be categorized by wage level (extremely low through middle-income) to match housing affordability</li>
              <li><strong>Commute Patterns:</strong> Understanding where workers live vs. work informs jurisdiction-level housing allocation</li>
              <li><strong>Economic Dependencies:</strong> Jobs in one jurisdiction may create housing demand in neighboring areas</li>
            </ul>
          </div>
          <div className="mt-2 p-3 bg-amber-50 border border-amber-200 rounded">
            <p className="text-sm text-amber-900">
              <strong>Data Note:</strong> Jobs data unavailable for Dolores and San Juan counties due to small population size. Complete HNA should incorporate all available employment data including commuting patterns.
            </p>
          </div>
        </div>
      </Card>

      {/* Charts Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Jobs by County */}
        <Card title="Jobs by County (2023)">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={jobsData}>
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
              <Bar dataKey="jobs" fill="#16a34a" name="Jobs" />
            </BarChart>
          </ResponsiveContainer>
          <p className="text-xs text-slate-500 mt-2">Source: SDO 2023 Jobs by Sector</p>
          <p className="text-xs text-amber-600 mt-1">
            <strong>Note:</strong> Jobs data not available for Dolores and San Juan counties (small population)
          </p>
        </Card>

        {/* Median Income Comparison */}
        <Card title="Median Household Income by County">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={incomeData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="county"
                angle={-45}
                textAnchor="end"
                height={100}
                fontSize={12}
              />
              <YAxis tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`} />
              <Tooltip formatter={formatCurrency} />
              <Bar dataKey="income" fill="#2563eb" name="Median Income" />
            </BarChart>
          </ResponsiveContainer>
          <p className="text-xs text-slate-500 mt-2">Source: ACS 2019-2023 5-year estimates</p>
        </Card>

        {/* Labor Force Participation */}
        <Card title="Labor Force Participation Rate">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={laborForceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="county"
                angle={-45}
                textAnchor="end"
                height={100}
                fontSize={12}
              />
              <YAxis domain={[0, 50]} tickFormatter={(value) => `${value}%`} />
              <Tooltip formatter={formatPercent} />
              <Bar dataKey="rate" fill="#64748b" name="Participation Rate" />
            </BarChart>
          </ResponsiveContainer>
          <p className="text-xs text-slate-500 mt-2">Source: SDO 2023 Labor Force Data</p>
        </Card>

        {/* Jobs-to-Households Ratio Analysis */}
        <Card title="Jobs-to-Households Ratio (2023)">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={filteredData.filter(c => c.jobs2023 !== null).map(county => ({
                county: county.county.replace(' County', ''),
                ratio: county.jobs2023 && county.households2023
                  ? parseFloat((county.jobs2023 / county.households2023).toFixed(2))
                  : null,
              }))}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="county"
                angle={-45}
                textAnchor="end"
                height={100}
                fontSize={12}
              />
              <YAxis domain={[0, 2]} />
              <Tooltip formatter={(value: any) => typeof value === 'number' ? value.toFixed(2) : value} />
              <Bar dataKey="ratio" fill="#0ea5e9" name="Jobs per Household" />
            </BarChart>
          </ResponsiveContainer>
          <p className="text-xs text-slate-500 mt-2">Calculated from SDO 2023 data</p>
        </Card>
      </div>

      {/* Key Insights */}
      <Card title="Key Insights" className="mt-6" highlight>
        <ul className="space-y-2 text-slate-700">
          {!selectedCounty ? (
            <>
              <li className="flex items-start">
                <span className="text-blue-600 font-bold mr-2">•</span>
                <span><strong>La Plata County</strong> dominates regional employment with {REGION_9_COUNTIES_DATA[2].jobs2023?.toLocaleString()} jobs (64% of reported regional jobs).</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 font-bold mr-2">•</span>
                <span><strong>La Plata County</strong> has the highest median household income at ${REGION_9_COUNTIES_DATA[2].medianIncome?.toLocaleString()}, while <strong>Montezuma County</strong> has the lowest at ${REGION_9_COUNTIES_DATA[3].medianIncome?.toLocaleString()}.</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 font-bold mr-2">•</span>
                <span>Labor force participation rates are relatively low across the region (37.5%-44.4%), likely due to <strong>retirement communities and seasonal employment patterns</strong>.</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 font-bold mr-2">•</span>
                <span>La Plata County has the highest jobs-to-households ratio (1.41), indicating it serves as a <strong>regional employment hub</strong> drawing workers from surrounding counties.</span>
              </li>
              <li className="flex items-start">
                <span className="text-amber-600 font-bold mr-2">•</span>
                <span><strong>Data Limitation:</strong> Jobs data unavailable for Dolores and San Juan counties due to small population size and SDO reporting thresholds.</span>
              </li>
            </>
          ) : (
            <>
              {totalJobs > 0 ? (
                <li className="flex items-start">
                  <span className="text-blue-600 font-bold mr-2">•</span>
                  <span><strong>{selectedCounty}</strong> has <strong>{totalJobs.toLocaleString()} jobs</strong> reported for 2023.</span>
                </li>
              ) : (
                <li className="flex items-start">
                  <span className="text-amber-600 font-bold mr-2">•</span>
                  <span><strong>Data Limitation:</strong> Jobs data unavailable for {selectedCounty} due to small population size and SDO reporting thresholds.</span>
                </li>
              )}
              <li className="flex items-start">
                <span className="text-blue-600 font-bold mr-2">•</span>
                <span>Median household income is <strong>${Math.round(weightedMedianIncome).toLocaleString()}</strong>.</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 font-bold mr-2">•</span>
                <span>Labor force participation rate is <strong>{avgLaborForce.toFixed(1)}%</strong>.</span>
              </li>
              {totalJobs > 0 && totalHouseholds > 0 && (
                <li className="flex items-start">
                  <span className="text-blue-600 font-bold mr-2">•</span>
                  <span>Jobs-to-households ratio is <strong>{(totalJobs / totalHouseholds).toFixed(2)}</strong>, {(totalJobs / totalHouseholds) > 1 ? 'indicating the county draws workers from surrounding areas' : 'indicating residents may commute to jobs in other counties'}.</span>
                </li>
              )}
            </>
          )}
        </ul>
      </Card>
    </Section>
  );
}
