'use client';

import { Section } from '../ui/Section';
import { Card } from '../ui/Card';
import { StatCard } from '../ui/StatCard';
import { REGION_9_COUNTIES_DATA, REGION_9_AGGREGATE_STATS } from '@/lib/data/region9-constants';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export function HousingProblems() {
  // Transform data for Cost Burden Rates (Owner vs Renter comparison)
  const costBurdenRatesData = REGION_9_COUNTIES_DATA.map(county => ({
    county: county.county.replace(' County', ''),
    owner: county.ownerCostBurdenRate,
    renter: county.renterCostBurdenRate,
  }));

  // Transform data for Cost Burdened Households (30%+ and 50%+)
  const costBurdenedHouseholdsData = REGION_9_COUNTIES_DATA.map(county => ({
    county: county.county.replace(' County', ''),
    '30%+ Cost Burden': county.costBurdened30Plus,
    '50%+ Severe Cost Burden': county.costBurdened50Plus,
  }));

  // Regional Cost Burden Summary (Pie chart data)
  const regionalCostBurdenData = [
    {
      name: '30-50% Cost Burdened',
      value: REGION_9_AGGREGATE_STATS.totalCostBurdened30Plus - REGION_9_AGGREGATE_STATS.totalCostBurdened50Plus,
      color: '#f97316',
    },
    {
      name: '50%+ Severely Burdened',
      value: REGION_9_AGGREGATE_STATS.totalCostBurdened50Plus,
      color: '#dc2626',
    },
    {
      name: 'Not Cost Burdened',
      value: REGION_9_AGGREGATE_STATS.totalHouseholds2023 - REGION_9_AGGREGATE_STATS.totalCostBurdened30Plus,
      color: '#16a34a',
    },
  ];

  // Custom tooltip formatter
  const formatTooltip = (value: any) => {
    if (typeof value === 'number') {
      return value.toLocaleString();
    }
    return value;
  };

  const formatPercent = (value: any) => {
    if (typeof value === 'number') {
      return `${value.toFixed(1)}%`;
    }
    return value;
  };

  // Calculate percentages for the pie chart
  const totalHouseholds = REGION_9_AGGREGATE_STATS.totalHouseholds2023;
  const costBurdenedPct = ((REGION_9_AGGREGATE_STATS.totalCostBurdened30Plus / totalHouseholds) * 100).toFixed(1);
  const severeBurdenPct = ((REGION_9_AGGREGATE_STATS.totalCostBurdened50Plus / totalHouseholds) * 100).toFixed(1);

  return (
    <Section
      id="housing-problems"
      title="Section E: Housing Problems"
      subtitle="Cost burden analysis: households paying 30%+ of income for housing"
    >
      {/* Key Stats */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <StatCard
          label="Cost Burdened Households"
          value={REGION_9_AGGREGATE_STATS.totalCostBurdened30Plus.toLocaleString()}
          subtitle={`${costBurdenedPct}% paying 30%+ of income`}
          trend="down"
        />
        <StatCard
          label="Severely Burdened"
          value={REGION_9_AGGREGATE_STATS.totalCostBurdened50Plus.toLocaleString()}
          subtitle={`${severeBurdenPct}% paying 50%+ of income`}
          trend="down"
        />
        <StatCard
          label="Owner Cost Burden Rate"
          value={`${REGION_9_AGGREGATE_STATS.regionalOwnerCostBurdenRate.toFixed(1)}%`}
          subtitle="Regional average"
        />
        <StatCard
          label="Renter Cost Burden Rate"
          value={`${REGION_9_AGGREGATE_STATS.regionalRenterCostBurdenRate.toFixed(1)}%`}
          subtitle="2x higher than owners"
          trend="down"
        />
      </div>

      {/* Charts Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Cost Burden Rates: Owner vs Renter */}
        <Card title="Cost Burden Rates: Owner vs Renter" highlight>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={costBurdenRatesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="county"
                angle={-45}
                textAnchor="end"
                height={100}
                fontSize={12}
              />
              <YAxis tickFormatter={(value) => `${value}%`} />
              <Tooltip formatter={formatPercent} />
              <Legend />
              <Bar dataKey="owner" fill="#2563eb" name="Owner Cost Burden %" />
              <Bar dataKey="renter" fill="#dc2626" name="Renter Cost Burden %" />
            </BarChart>
          </ResponsiveContainer>
          <div className="mt-3 p-3 bg-amber-50 border border-amber-200 rounded">
            <p className="text-sm text-amber-800">
              <strong>Renters face significantly higher cost burdens</strong> across all counties, with rates 1.6x to 3.2x higher than homeowners.
            </p>
          </div>
          <p className="text-xs text-slate-500 mt-2">Source: ACS 2019-2023 5-year estimates, Tables B25070-B25071</p>
        </Card>

        {/* Cost Burdened Households Count */}
        <Card title="Cost Burdened Households by County">
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={costBurdenedHouseholdsData}>
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
              <Bar dataKey="30%+ Cost Burden" stackId="a" fill="#f97316" />
              <Bar dataKey="50%+ Severe Cost Burden" stackId="a" fill="#dc2626" />
            </BarChart>
          </ResponsiveContainer>
          <p className="text-xs text-slate-500 mt-2">Source: ACS 2019-2023 5-year estimates</p>
        </Card>

        {/* Regional Cost Burden Summary (Pie Chart) */}
        <Card title="Regional Cost Burden Distribution">
          <ResponsiveContainer width="100%" height={350}>
            <PieChart>
              <Pie
                data={regionalCostBurdenData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={(entry: any) => `${entry.name}: ${((entry.percent || 0) * 100).toFixed(1)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {regionalCostBurdenData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={formatTooltip} />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 space-y-2">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center">
                <div className="w-4 h-4 bg-green-600 mr-2 rounded"></div>
                <span>Not Cost Burdened (&lt;30%)</span>
              </div>
              <span className="font-semibold">
                {(regionalCostBurdenData[2].value).toLocaleString()} ({((regionalCostBurdenData[2].value / totalHouseholds) * 100).toFixed(1)}%)
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center">
                <div className="w-4 h-4 bg-orange-500 mr-2 rounded"></div>
                <span>Cost Burdened (30-50%)</span>
              </div>
              <span className="font-semibold">
                {(regionalCostBurdenData[0].value).toLocaleString()} ({((regionalCostBurdenData[0].value / totalHouseholds) * 100).toFixed(1)}%)
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center">
                <div className="w-4 h-4 bg-red-600 mr-2 rounded"></div>
                <span>Severely Burdened (50%+)</span>
              </div>
              <span className="font-semibold">
                {REGION_9_AGGREGATE_STATS.totalCostBurdened50Plus.toLocaleString()} ({severeBurdenPct}%)
              </span>
            </div>
          </div>
          <p className="text-xs text-slate-500 mt-3">Based on {totalHouseholds.toLocaleString()} total households</p>
        </Card>

        {/* County Comparison Table */}
        <Card title="Cost Burden Severity by County">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200 text-sm">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase">County</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-slate-500 uppercase">30%+ Rate</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-slate-500 uppercase">Renter Gap</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-200">
                {REGION_9_COUNTIES_DATA.map((county, idx) => {
                  const gap = county.renterCostBurdenRate && county.ownerCostBurdenRate
                    ? (county.renterCostBurdenRate - county.ownerCostBurdenRate).toFixed(1)
                    : 'N/A';
                  const gapMultiplier = county.renterCostBurdenRate && county.ownerCostBurdenRate
                    ? (county.renterCostBurdenRate / county.ownerCostBurdenRate).toFixed(1)
                    : 'N/A';

                  return (
                    <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                      <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-slate-900">
                        {county.county.replace(' County', '')}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-right text-sm">
                        <div className="text-slate-700">
                          Owner: {county.ownerCostBurdenRate?.toFixed(1)}%
                        </div>
                        <div className="text-red-600 font-semibold">
                          Renter: {county.renterCostBurdenRate?.toFixed(1)}%
                        </div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-right text-sm">
                        <div className="text-slate-700">
                          +{gap}%
                        </div>
                        <div className="text-xs text-slate-500">
                          ({gapMultiplier}x)
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-slate-500 mt-3">Source: ACS 2019-2023 5-year estimates</p>
        </Card>
      </div>

      {/* Key Insights */}
      <Card title="Key Insights" className="mt-6" highlight>
        <ul className="space-y-2 text-slate-700">
          <li className="flex items-start">
            <span className="text-red-600 font-bold mr-2">•</span>
            <span><strong>{REGION_9_AGGREGATE_STATS.totalCostBurdened30Plus.toLocaleString()} households ({costBurdenedPct}%)</strong> in Region 9 are cost burdened, paying 30% or more of their income for housing.</span>
          </li>
          <li className="flex items-start">
            <span className="text-red-600 font-bold mr-2">•</span>
            <span><strong>{REGION_9_AGGREGATE_STATS.totalCostBurdened50Plus.toLocaleString()} households ({severeBurdenPct}%)</strong> are severely cost burdened, paying 50% or more of their income for housing costs.</span>
          </li>
          <li className="flex items-start">
            <span className="text-red-600 font-bold mr-2">•</span>
            <span><strong>Renter cost burden (26.3%)</strong> is more than <strong>double the owner cost burden (12.7%)</strong> across the region, highlighting the vulnerability of renter households.</span>
          </li>
          <li className="flex items-start">
            <span className="text-amber-600 font-bold mr-2">•</span>
            <span><strong>Montezuma County</strong> has the highest renter cost burden rate at 33.0%, despite having the region's lowest home values and median income.</span>
          </li>
          <li className="flex items-start">
            <span className="text-amber-600 font-bold mr-2">•</span>
            <span><strong>Archuleta County</strong> shows a 31.6% renter cost burden rate, driven by high housing costs in the Pagosa Springs resort area.</span>
          </li>
          <li className="flex items-start">
            <span className="text-blue-600 font-bold mr-2">•</span>
            <span><strong>Dolores County</strong> has the lowest overall cost burden rates (6.1% owners, 19.3% renters), benefiting from lower housing costs relative to incomes.</span>
          </li>
          <li className="flex items-start">
            <span className="text-red-600 font-bold mr-2">•</span>
            <span><strong>Critical Finding:</strong> The wide disparity between owner and renter cost burden rates indicates a need for targeted rental assistance and affordable rental housing development, particularly in resort and urban counties.</span>
          </li>
        </ul>
      </Card>
    </Section>
  );
}
