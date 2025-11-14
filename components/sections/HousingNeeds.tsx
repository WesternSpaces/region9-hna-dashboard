'use client';

import { Section } from '../ui/Section';
import { Card } from '../ui/Card';
import { StatCard } from '../ui/StatCard';
import { REGION_9_COUNTIES_DATA, REGION_9_AGGREGATE_STATS } from '@/lib/data/region9-constants';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export function HousingNeeds() {
  // AMI Distribution Data (Regional)
  const amiDistributionData = [
    { bracket: '≤30% AMI', households: REGION_9_AGGREGATE_STATS.regionalAMI.veryLow30, color: '#dc2626' },
    { bracket: '31-50% AMI', households: REGION_9_AGGREGATE_STATS.regionalAMI.veryLow50, color: '#f97316' },
    { bracket: '51-80% AMI', households: REGION_9_AGGREGATE_STATS.regionalAMI.low80, color: '#eab308' },
    { bracket: '81-120% AMI', households: REGION_9_AGGREGATE_STATS.regionalAMI.moderate120, color: '#3b82f6' },
    { bracket: '121-140% AMI', households: REGION_9_AGGREGATE_STATS.regionalAMI.middle140, color: '#16a34a' },
    { bracket: '>140% AMI', households: REGION_9_AGGREGATE_STATS.regionalAMI.upper140Plus, color: '#059669' },
  ];

  // Low-Income Housing Need by County (≤80% AMI)
  const lowIncomeNeedData = REGION_9_COUNTIES_DATA.map(county => {
    const lowIncome = (county.ami.veryLow30 || 0) + (county.ami.veryLow50 || 0) + (county.ami.low80 || 0);
    const total = (county.ami.veryLow30 || 0) + (county.ami.veryLow50 || 0) + (county.ami.low80 || 0) +
                  (county.ami.moderate120 || 0) + (county.ami.middle140 || 0) + (county.ami.upper140Plus || 0);
    const percentage = total > 0 ? (lowIncome / total) * 100 : 0;

    return {
      county: county.county.replace(' County', ''),
      lowIncome,
      percentage: parseFloat(percentage.toFixed(1)),
    };
  });

  // Projected Housing Gap (2023-2033)
  const housingGapData = REGION_9_COUNTIES_DATA.map(county => {
    const projectedNeed = county.households2033Projection && county.households2023
      ? county.households2033Projection - county.households2023
      : 0;
    const currentGap = county.households2023 && county.occupiedUnits
      ? county.households2023 - county.occupiedUnits
      : 0;

    return {
      county: county.county.replace(' County', ''),
      'Projected Growth Need': projectedNeed,
      'Current Housing Gap': currentGap,
    };
  });

  // AMI County Distribution (Stacked)
  const amiByCountyData = REGION_9_COUNTIES_DATA.map(county => ({
    county: county.county.replace(' County', ''),
    '≤30% AMI': county.ami.veryLow30,
    '31-50% AMI': county.ami.veryLow50,
    '51-80% AMI': county.ami.low80,
    '81-120% AMI': county.ami.moderate120,
    '121-140% AMI': county.ami.middle140,
    '>140% AMI': county.ami.upper140Plus,
  }));

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

  // Calculate totals and percentages
  const totalCHASHouseholds = REGION_9_AGGREGATE_STATS.regionalAMI.totalHouseholds;
  const lowIncomePct = (REGION_9_AGGREGATE_STATS.lowIncomeHouseholds / totalCHASHouseholds * 100).toFixed(1);

  const AMI_COLORS = {
    '≤30% AMI': '#dc2626',
    '31-50% AMI': '#f97316',
    '51-80% AMI': '#eab308',
    '81-120% AMI': '#3b82f6',
    '121-140% AMI': '#16a34a',
    '>140% AMI': '#059669',
  };

  return (
    <Section
      id="housing-needs"
      title="Section H: Housing Needs Assessment"
      subtitle="Area Median Income (AMI) distribution and preliminary housing needs calculations"
    >
      {/* Key Stats */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <StatCard
          label="Low-Income Households"
          value={REGION_9_AGGREGATE_STATS.lowIncomeHouseholds.toLocaleString()}
          subtitle={`${lowIncomePct}% of households ≤80% AMI`}
          trend="down"
        />
        <StatCard
          label="Very Low Income (≤50% AMI)"
          value={(REGION_9_AGGREGATE_STATS.regionalAMI.veryLow30 + REGION_9_AGGREGATE_STATS.regionalAMI.veryLow50).toLocaleString()}
          subtitle={`${(((REGION_9_AGGREGATE_STATS.regionalAMI.veryLow30 + REGION_9_AGGREGATE_STATS.regionalAMI.veryLow50) / totalCHASHouseholds) * 100).toFixed(1)}% of total`}
        />
        <StatCard
          label="Projected Household Growth"
          value={`+${REGION_9_AGGREGATE_STATS.populationGrowth.toLocaleString()}`}
          subtitle="2023-2033 (estimated)"
          trend="up"
        />
        <StatCard
          label="Current Housing Deficit"
          value={(REGION_9_AGGREGATE_STATS.totalHouseholds2023 - REGION_9_AGGREGATE_STATS.totalOccupiedUnits).toLocaleString()}
          subtitle="Households exceeding occupied units"
        />
      </div>

      {/* Charts Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Regional AMI Distribution (Pie Chart) */}
        <Card title="Regional AMI Distribution" highlight>
          <ResponsiveContainer width="100%" height={350}>
            <PieChart>
              <Pie
                data={amiDistributionData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={(entry: any) => `${entry.bracket}: ${(entry.percent * 100).toFixed(1)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="households"
              >
                {amiDistributionData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={formatTooltip} />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded">
            <p className="text-sm text-blue-800">
              <strong>{REGION_9_AGGREGATE_STATS.lowIncomeHouseholds.toLocaleString()} households ({lowIncomePct}%)</strong> earn ≤80% AMI and are eligible for affordable housing programs.
            </p>
          </div>
          <p className="text-xs text-slate-500 mt-2">Source: HUD CHAS 2017-2021</p>
        </Card>

        {/* Low-Income Housing Need by County */}
        <Card title="Low-Income Households by County (≤80% AMI)">
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={lowIncomeNeedData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="county"
                angle={-45}
                textAnchor="end"
                height={100}
                fontSize={12}
              />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" tickFormatter={(value) => `${value}%`} />
              <Tooltip formatter={formatTooltip} />
              <Legend />
              <Bar yAxisId="left" dataKey="lowIncome" fill="#dc2626" name="Low-Income Households" />
              <Bar yAxisId="right" dataKey="percentage" fill="#eab308" name="% of Total" />
            </BarChart>
          </ResponsiveContainer>
          <p className="text-xs text-slate-500 mt-2">Source: HUD CHAS 2017-2021</p>
        </Card>

        {/* AMI Distribution by County (Stacked) */}
        <Card title="AMI Distribution by County" className="md:col-span-2">
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={amiByCountyData}>
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
              <Bar dataKey="≤30% AMI" stackId="a" fill={AMI_COLORS['≤30% AMI']} />
              <Bar dataKey="31-50% AMI" stackId="a" fill={AMI_COLORS['31-50% AMI']} />
              <Bar dataKey="51-80% AMI" stackId="a" fill={AMI_COLORS['51-80% AMI']} />
              <Bar dataKey="81-120% AMI" stackId="a" fill={AMI_COLORS['81-120% AMI']} />
              <Bar dataKey="121-140% AMI" stackId="a" fill={AMI_COLORS['121-140% AMI']} />
              <Bar dataKey=">140% AMI" stackId="a" fill={AMI_COLORS['>140% AMI']} />
            </BarChart>
          </ResponsiveContainer>
          <p className="text-xs text-slate-500 mt-2">Source: HUD CHAS 2017-2021</p>
        </Card>

        {/* Projected Housing Gap Analysis */}
        <Card title="Housing Gap Analysis (2023-2033)" highlight className="md:col-span-2">
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={housingGapData}>
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
              <Bar dataKey="Current Housing Gap" fill="#dc2626" name="Current Gap (Households - Occupied Units)" />
              <Bar dataKey="Projected Growth Need" fill="#2563eb" name="Projected Growth Need (2023-2033)" />
            </BarChart>
          </ResponsiveContainer>
          <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded">
            <p className="text-sm text-amber-800">
              <strong>Note:</strong> Current gap represents households already exceeding available occupied units. Projected growth need shows additional housing units required to accommodate population growth through 2033.
            </p>
          </div>
          <p className="text-xs text-slate-500 mt-2">Calculated from SDO 2023 data and ACS 2019-2023</p>
        </Card>
      </div>

      {/* Detailed AMI Table */}
      <Card title="Detailed AMI Distribution by County" className="mt-6">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase">County</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-slate-500 uppercase">≤30% AMI</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-slate-500 uppercase">31-50% AMI</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-slate-500 uppercase">51-80% AMI</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-slate-500 uppercase">81-120% AMI</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-slate-500 uppercase">121-140% AMI</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-slate-500 uppercase">&gt;140% AMI</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-slate-500 uppercase font-bold">≤80% Total</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-slate-500 uppercase font-bold">% Low Income</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              {REGION_9_COUNTIES_DATA.map((county, idx) => {
                const lowIncome = (county.ami.veryLow30 || 0) + (county.ami.veryLow50 || 0) + (county.ami.low80 || 0);
                const total = (county.ami.veryLow30 || 0) + (county.ami.veryLow50 || 0) + (county.ami.low80 || 0) +
                              (county.ami.moderate120 || 0) + (county.ami.middle140 || 0) + (county.ami.upper140Plus || 0);
                const pct = total > 0 ? ((lowIncome / total) * 100).toFixed(1) : 'N/A';

                return (
                  <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-slate-900">
                      {county.county}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-right text-sm text-slate-700">
                      {county.ami.veryLow30?.toLocaleString() || 'N/A'}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-right text-sm text-slate-700">
                      {county.ami.veryLow50?.toLocaleString() || 'N/A'}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-right text-sm text-slate-700">
                      {county.ami.low80?.toLocaleString() || 'N/A'}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-right text-sm text-slate-700">
                      {county.ami.moderate120?.toLocaleString() || 'N/A'}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-right text-sm text-slate-700">
                      {county.ami.middle140?.toLocaleString() || 'N/A'}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-right text-sm text-slate-700">
                      {county.ami.upper140Plus?.toLocaleString() || 'N/A'}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-right text-sm font-bold text-red-700 bg-red-50">
                      {lowIncome.toLocaleString()}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-right text-sm font-bold text-slate-900 bg-amber-50">
                      {pct}%
                    </td>
                  </tr>
                );
              })}
              <tr className="bg-blue-50 font-bold">
                <td className="px-4 py-3 whitespace-nowrap text-sm text-slate-900">
                  Region 9 Total
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-right text-sm text-slate-900">
                  {REGION_9_AGGREGATE_STATS.regionalAMI.veryLow30.toLocaleString()}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-right text-sm text-slate-900">
                  {REGION_9_AGGREGATE_STATS.regionalAMI.veryLow50.toLocaleString()}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-right text-sm text-slate-900">
                  {REGION_9_AGGREGATE_STATS.regionalAMI.low80.toLocaleString()}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-right text-sm text-slate-900">
                  {REGION_9_AGGREGATE_STATS.regionalAMI.moderate120.toLocaleString()}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-right text-sm text-slate-900">
                  {REGION_9_AGGREGATE_STATS.regionalAMI.middle140.toLocaleString()}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-right text-sm text-slate-900">
                  {REGION_9_AGGREGATE_STATS.regionalAMI.upper140Plus.toLocaleString()}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-right text-sm text-slate-900">
                  {REGION_9_AGGREGATE_STATS.lowIncomeHouseholds.toLocaleString()}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-right text-sm text-slate-900">
                  {lowIncomePct}%
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-xs text-slate-500 mt-3">Source: HUD CHAS 2017-2021, Table 11</p>
      </Card>

      {/* Key Insights */}
      <Card title="Key Insights & Preliminary Housing Needs" className="mt-6" highlight>
        <ul className="space-y-2 text-slate-700">
          <li className="flex items-start">
            <span className="text-red-600 font-bold mr-2">•</span>
            <span><strong>{REGION_9_AGGREGATE_STATS.lowIncomeHouseholds.toLocaleString()} households ({lowIncomePct}%)</strong> earn at or below 80% AMI, representing the primary target population for affordable housing programs.</span>
          </li>
          <li className="flex items-start">
            <span className="text-red-600 font-bold mr-2">•</span>
            <span><strong>{(REGION_9_AGGREGATE_STATS.regionalAMI.veryLow30 + REGION_9_AGGREGATE_STATS.regionalAMI.veryLow50).toLocaleString()} households</strong> earn ≤50% AMI (extremely and very low income), requiring deep subsidies for housing affordability.</span>
          </li>
          <li className="flex items-start">
            <span className="text-amber-600 font-bold mr-2">•</span>
            <span><strong>La Plata County</strong> has the largest low-income population with {((REGION_9_COUNTIES_DATA[2].ami.veryLow30 || 0) + (REGION_9_COUNTIES_DATA[2].ami.veryLow50 || 0) + (REGION_9_COUNTIES_DATA[2].ami.low80 || 0)).toLocaleString()} households ≤80% AMI, but represents only 37.1% of its total households.</span>
          </li>
          <li className="flex items-start">
            <span className="text-amber-600 font-bold mr-2">•</span>
            <span><strong>Montezuma County</strong> has 46.6% of households earning ≤80% AMI, the highest proportion in the region, indicating greater need for affordable housing interventions.</span>
          </li>
          <li className="flex items-start">
            <span className="text-blue-600 font-bold mr-2">•</span>
            <span>The region currently has a <strong>housing gap of {(REGION_9_AGGREGATE_STATS.totalHouseholds2023 - REGION_9_AGGREGATE_STATS.totalOccupiedUnits).toLocaleString()} units</strong> (households exceeding occupied units), suggesting overcrowding or doubled-up households.</span>
          </li>
          <li className="flex items-start">
            <span className="text-blue-600 font-bold mr-2">•</span>
            <span>Projected household growth of <strong>{REGION_9_AGGREGATE_STATS.populationGrowth.toLocaleString()} between 2023-2033</strong> will require new housing production, with at least {Math.round(REGION_9_AGGREGATE_STATS.populationGrowth * 0.418).toLocaleString()} units needed for low-income households (41.8% of growth).</span>
          </li>
          <li className="flex items-start">
            <span className="text-red-600 font-bold mr-2">•</span>
            <span><strong>Critical Finding:</strong> Combined with high cost burdens (Section E) and severe affordability gaps (Section D), the region faces a <strong>multi-dimensional housing crisis</strong> requiring coordinated policy interventions including:</span>
          </li>
          <li className="ml-6 flex items-start">
            <span className="text-slate-600 font-bold mr-2">→</span>
            <span>Development of <strong>{REGION_9_AGGREGATE_STATS.lowIncomeHouseholds.toLocaleString()}+ affordable units</strong> for households ≤80% AMI</span>
          </li>
          <li className="ml-6 flex items-start">
            <span className="text-slate-600 font-bold mr-2">→</span>
            <span>Rental assistance programs targeting <strong>26.3% renter cost burden rate</strong></span>
          </li>
          <li className="ml-6 flex items-start">
            <span className="text-slate-600 font-bold mr-2">→</span>
            <span>Workforce housing initiatives in resort counties to address <strong>seasonal/recreational housing conversion</strong></span>
          </li>
          <li className="ml-6 flex items-start">
            <span className="text-slate-600 font-bold mr-2">→</span>
            <span>Land use and zoning reforms to enable higher-density development near employment centers</span>
          </li>
        </ul>
        <div className="mt-4 p-4 bg-blue-100 border-2 border-blue-400 rounded-lg">
          <p className="text-sm font-bold text-blue-900 mb-2">Data Quality Note:</p>
          <p className="text-sm text-blue-800">
            CHAS AMI data (2017-2021) is 2-4 years older than ACS demographic data (2019-2023). Actual AMI distribution may have shifted due to recent income changes and inflation. Consider updating with most recent CHAS release for final HNA report.
          </p>
        </div>
      </Card>
    </Section>
  );
}
