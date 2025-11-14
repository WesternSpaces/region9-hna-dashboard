'use client';

import { Section } from '../ui/Section';
import { Card } from '../ui/Card';
import { StatCard } from '../ui/StatCard';
import { REGION_9_COUNTIES_DATA, REGION_9_AGGREGATE_STATS } from '@/lib/data/region9-constants';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { filterCountyData, getFilterDisplayName } from '@/lib/utils/filterData';

interface HousingMarketTrendsProps {
  selectedCounty: string | null;
}

export function HousingMarketTrends({ selectedCounty }: HousingMarketTrendsProps) {
  const filteredData = filterCountyData(selectedCounty);
  const displayName = getFilterDisplayName(selectedCounty);

  // Calculate aggregate stats from filtered data
  const homeValues = filteredData.map(c => c.medianHomeValue).filter(v => v !== null) as number[];
  const rents = filteredData.map(c => c.medianGrossRent).filter(v => v !== null) as number[];
  const totalHouseholds = filteredData.reduce((sum, c) => sum + (c.households2023 || 0), 0);

  const weightedHomeValue = totalHouseholds > 0
    ? filteredData.reduce((sum, c) => sum + (c.medianHomeValue || 0) * (c.households2023 || 0), 0) / totalHouseholds
    : 0;
  const weightedRent = totalHouseholds > 0
    ? filteredData.reduce((sum, c) => sum + (c.medianGrossRent || 0) * (c.households2023 || 0), 0) / totalHouseholds
    : 0;
  const minHomeValue = homeValues.length > 0 ? Math.min(...homeValues) : 0;
  const maxHomeValue = homeValues.length > 0 ? Math.max(...homeValues) : 0;
  const minRent = rents.length > 0 ? Math.min(...rents) : 0;
  const maxRent = rents.length > 0 ? Math.max(...rents) : 0;

  // Transform data for Median Home Values chart
  const homeValuesData = filteredData.map(county => ({
    county: county.county.replace(' County', ''),
    value: county.medianHomeValue,
  }));

  // Transform data for Median Gross Rent chart
  const rentData = filteredData.map(county => ({
    county: county.county.replace(' County', ''),
    rent: county.medianGrossRent,
  }));

  // Transform data for Affordability Gap (Home Value to Income Ratio)
  const affordabilityData = filteredData.map(county => ({
    county: county.county.replace(' County', ''),
    ratio: county.medianHomeValue && county.medianIncome
      ? parseFloat((county.medianHomeValue / county.medianIncome).toFixed(2))
      : null,
    homeValue: county.medianHomeValue,
    income: county.medianIncome,
  }));

  // Custom tooltip formatter
  const formatCurrency = (value: any) => {
    if (typeof value === 'number') {
      return `$${value.toLocaleString()}`;
    }
    return value;
  };

  const formatRatio = (value: any) => {
    if (typeof value === 'number') {
      return `${value.toFixed(2)}x`;
    }
    return value;
  };

  // Color code affordability ratios
  const getAffordabilityColor = (ratio: number | null) => {
    if (!ratio) return '#94a3b8';
    if (ratio < 3) return '#16a34a'; // Good - green
    if (ratio < 4) return '#eab308'; // Moderate - yellow
    if (ratio < 5) return '#f97316'; // Challenging - orange
    return '#dc2626'; // Severe - red
  };

  return (
    <Section
      id="housing-market"
      title="Section D: Housing Market Trends"
      subtitle="Home values, rental costs, and affordability challenges"
    >
      {/* Key Stats */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <StatCard
          label={selectedCounty ? `Median Home Value` : "Median Home Value (Regional)"}
          value={`$${Math.round(weightedHomeValue).toLocaleString()}`}
          subtitle={selectedCounty || `Range: $${(minHomeValue / 1000).toFixed(0)}k - $${(maxHomeValue / 1000).toFixed(0)}k`}
        />
        <StatCard
          label={selectedCounty ? `Median Gross Rent` : "Median Gross Rent (Regional)"}
          value={`$${Math.round(weightedRent).toLocaleString()}`}
          subtitle={selectedCounty || `Range: $${minRent} - $${maxRent}`}
        />
        <StatCard
          label="Affordability Challenge"
          value="High"
          subtitle="Home prices 4-6x median incomes"
          trend="down"
        />
      </div>

      {/* Charts Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Median Home Values */}
        <Card title="Median Home Values by County">
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={homeValuesData}>
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
              <Bar dataKey="value" fill="#2563eb" name="Median Home Value" />
            </BarChart>
          </ResponsiveContainer>
          <p className="text-xs text-slate-500 mt-2">Source: ACS 2019-2023 5-year estimates, Table B25077</p>
        </Card>

        {/* Median Gross Rent */}
        <Card title="Median Gross Rent by County">
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={rentData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="county"
                angle={-45}
                textAnchor="end"
                height={100}
                fontSize={12}
              />
              <YAxis tickFormatter={(value) => `$${value}`} />
              <Tooltip formatter={formatCurrency} />
              <Bar dataKey="rent" fill="#16a34a" name="Median Rent" />
            </BarChart>
          </ResponsiveContainer>
          <p className="text-xs text-slate-500 mt-2">Source: ACS 2019-2023 5-year estimates, Table B25064</p>
        </Card>

        {/* Affordability Gap (Home Value to Income Ratio) */}
        <Card title="Home Value to Income Ratio" highlight className="md:col-span-2">
          <div className="mb-4">
            <p className="text-sm text-slate-600">
              A ratio of 3.0 or less is generally considered affordable. Ratios above 4.0 indicate severe affordability challenges.
            </p>
          </div>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={affordabilityData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="county"
                angle={-45}
                textAnchor="end"
                height={100}
                fontSize={12}
              />
              <YAxis
                domain={[0, 8]}
                tickFormatter={formatRatio}
              />
              <Tooltip
                formatter={(value: any, name: string) => {
                  if (name === 'ratio') return formatRatio(value);
                  return formatCurrency(value);
                }}
              />
              <Bar dataKey="ratio" name="Home Value / Income Ratio">
                {affordabilityData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={getAffordabilityColor(entry.ratio)} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <div className="mt-4 flex flex-wrap gap-4 text-xs">
            <div className="flex items-center">
              <div className="w-4 h-4 bg-green-600 mr-2 rounded"></div>
              <span>&lt; 3.0 (Affordable)</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-yellow-500 mr-2 rounded"></div>
              <span>3.0-4.0 (Moderate)</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-orange-500 mr-2 rounded"></div>
              <span>4.0-5.0 (Challenging)</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-red-600 mr-2 rounded"></div>
              <span>&gt; 5.0 (Severe)</span>
            </div>
          </div>
          <p className="text-xs text-slate-500 mt-3">Calculated from ACS 2019-2023 data</p>
        </Card>
      </div>

      {/* Detailed Affordability Table */}
      <Card title="Housing Affordability Analysis" className="mt-6">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">County</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">Median Income</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">Median Home Value</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">Median Rent</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">Value/Income Ratio</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-slate-500 uppercase tracking-wider">Affordability</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              {filteredData.map((county, idx) => {
                const ratio = county.medianHomeValue && county.medianIncome
                  ? (county.medianHomeValue / county.medianIncome).toFixed(2)
                  : 'N/A';
                const affordabilityStatus =
                  typeof ratio === 'string' ? 'N/A' :
                  parseFloat(ratio) < 3 ? 'Affordable' :
                  parseFloat(ratio) < 4 ? 'Moderate' :
                  parseFloat(ratio) < 5 ? 'Challenging' : 'Severe';

                return (
                  <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">
                      {county.county}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-slate-700">
                      ${county.medianIncome?.toLocaleString() || 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-slate-700">
                      ${county.medianHomeValue?.toLocaleString() || 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-slate-700">
                      ${county.medianGrossRent?.toLocaleString() || 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-slate-700 font-semibold">
                      {typeof ratio === 'string' ? ratio : `${ratio}x`}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        affordabilityStatus === 'Affordable' ? 'bg-green-100 text-green-800' :
                        affordabilityStatus === 'Moderate' ? 'bg-yellow-100 text-yellow-800' :
                        affordabilityStatus === 'Challenging' ? 'bg-orange-100 text-orange-800' :
                        affordabilityStatus === 'Severe' ? 'bg-red-100 text-red-800' :
                        'bg-slate-100 text-slate-800'
                      }`}>
                        {affordabilityStatus}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-slate-500 mt-3">Source: ACS 2019-2023 5-year estimates</p>
      </Card>

      {/* Key Insights */}
      <Card title="Key Insights" className="mt-6" highlight>
        <ul className="space-y-2 text-slate-700">
          <li className="flex items-start">
            <span className="text-red-600 font-bold mr-2">•</span>
            <span><strong>La Plata County</strong> has the highest median home value at $549,100, with a home value-to-income ratio of <strong>6.44x</strong> - indicating severe affordability challenges.</span>
          </li>
          <li className="flex items-start">
            <span className="text-red-600 font-bold mr-2">•</span>
            <span><strong>Archuleta County</strong> (Pagosa Springs resort area) has a ratio of <strong>5.90x</strong>, making homeownership extremely difficult for local workers.</span>
          </li>
          <li className="flex items-start">
            <span className="text-amber-600 font-bold mr-2">•</span>
            <span><strong>San Juan County</strong> (Silverton) has a ratio of <strong>5.51x</strong>, with median home values of $406,900 against median incomes of $73,889.</span>
          </li>
          <li className="flex items-start">
            <span className="text-blue-600 font-bold mr-2">•</span>
            <span><strong>Montezuma County</strong> is the most affordable with a ratio of <strong>4.89x</strong> and median home values of $308,100.</span>
          </li>
          <li className="flex items-start">
            <span className="text-amber-600 font-bold mr-2">•</span>
            <span>Median rents range from $974 (Montezuma) to <strong>$1,688 (Dolores)</strong>, with regional weighted average of $1,311/month.</span>
          </li>
          <li className="flex items-start">
            <span className="text-red-600 font-bold mr-2">•</span>
            <span><strong>Critical Finding:</strong> All five counties exceed the 3.0 affordability threshold, with <strong>four counties classified as "Challenging" or "Severe."</strong> This indicates a regional housing affordability crisis, particularly in resort communities.</span>
          </li>
        </ul>
      </Card>
    </Section>
  );
}
