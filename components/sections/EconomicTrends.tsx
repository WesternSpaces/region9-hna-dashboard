'use client';

import { Section } from '../ui/Section';
import { Card } from '../ui/Card';
import { StatCard } from '../ui/StatCard';
import { REGION_9_COUNTIES_DATA, REGION_9_AGGREGATE_STATS } from '@/lib/data/region9-constants';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export function EconomicTrends() {
  // Transform data for Jobs by County chart (filter out counties with no data)
  const jobsData = REGION_9_COUNTIES_DATA.filter(county => county.jobs2023 !== null).map(county => ({
    county: county.county.replace(' County', ''),
    jobs: county.jobs2023,
  }));

  // Transform data for Median Income chart
  const incomeData = REGION_9_COUNTIES_DATA.map(county => ({
    county: county.county.replace(' County', ''),
    income: county.medianIncome,
  }));

  // Transform data for Labor Force Participation chart
  const laborForceData = REGION_9_COUNTIES_DATA.map(county => ({
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
          value={REGION_9_AGGREGATE_STATS.totalJobs2023.toLocaleString()}
          subtitle="Archuleta, La Plata, Montezuma counties"
        />
        <StatCard
          label="Weighted Median Income"
          value={`$${REGION_9_AGGREGATE_STATS.weightedMedianIncome.toLocaleString()}`}
          subtitle="Regional median household income"
        />
        <StatCard
          label="Labor Force Participation"
          value={`${REGION_9_AGGREGATE_STATS.avgLaborForceParticipation.toFixed(1)}%`}
          subtitle="Regional average"
        />
      </div>

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
              data={REGION_9_COUNTIES_DATA.filter(c => c.jobs2023 !== null).map(county => ({
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
        </ul>
      </Card>
    </Section>
  );
}
