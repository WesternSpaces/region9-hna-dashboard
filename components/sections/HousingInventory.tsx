'use client';

import { Section } from '../ui/Section';
import { Card } from '../ui/Card';
import { StatCard } from '../ui/StatCard';
import { REGION_9_COUNTIES_DATA, REGION_9_AGGREGATE_STATS } from '@/lib/data/region9-constants';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export function HousingInventory() {
  // Transform data for Total Housing Units chart
  const housingUnitsData = REGION_9_COUNTIES_DATA.map(county => ({
    county: county.county.replace(' County', ''),
    units: county.totalHousingUnits,
  }));

  // Transform data for Occupancy Status chart (stacked)
  const occupancyData = REGION_9_COUNTIES_DATA.map(county => ({
    county: county.county.replace(' County', ''),
    occupied: county.occupiedUnits,
    vacant: county.vacantUnits,
  }));

  // Transform data for Tenure chart (owner vs renter)
  const tenureData = REGION_9_COUNTIES_DATA.map(county => ({
    county: county.county.replace(' County', ''),
    owner: county.ownerOccupied,
    renter: county.renterOccupied,
  }));

  // Transform data for Vacancy Rates chart
  const vacancyRatesData = REGION_9_COUNTIES_DATA.map(county => ({
    county: county.county.replace(' County', ''),
    rate: county.vacancyRate,
    seasonal: county.seasonalRecreational,
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

  return (
    <Section
      id="housing-inventory"
      title="Section C: Housing Inventory"
      subtitle="Housing stock, occupancy status, and tenure characteristics"
    >
      {/* Key Stats */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <StatCard
          label="Total Housing Units"
          value={REGION_9_AGGREGATE_STATS.totalHousingUnits.toLocaleString()}
          subtitle="Region 9 total"
        />
        <StatCard
          label="Occupied Units"
          value={REGION_9_AGGREGATE_STATS.totalOccupiedUnits.toLocaleString()}
          subtitle={`${(100 - REGION_9_AGGREGATE_STATS.regionalVacancyRate).toFixed(1)}% occupancy`}
        />
        <StatCard
          label="Vacancy Rate"
          value={`${REGION_9_AGGREGATE_STATS.regionalVacancyRate.toFixed(1)}%`}
          subtitle={`${REGION_9_AGGREGATE_STATS.totalVacantUnits.toLocaleString()} vacant units`}
          trend="down"
        />
        <StatCard
          label="Seasonal/Recreational"
          value={REGION_9_AGGREGATE_STATS.totalSeasonalRecreational.toLocaleString()}
          subtitle={`${((REGION_9_AGGREGATE_STATS.totalSeasonalRecreational / REGION_9_AGGREGATE_STATS.totalVacantUnits) * 100).toFixed(1)}% of vacant`}
        />
      </div>

      {/* Charts Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Total Housing Units */}
        <Card title="Total Housing Units by County">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={housingUnitsData}>
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
              <Bar dataKey="units" fill="#2563eb" name="Housing Units" />
            </BarChart>
          </ResponsiveContainer>
          <p className="text-xs text-slate-500 mt-2">Source: ACS 2019-2023 5-year estimates</p>
        </Card>

        {/* Occupancy Status (Stacked) */}
        <Card title="Occupancy Status by County">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={occupancyData}>
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
              <Bar dataKey="occupied" stackId="a" fill="#16a34a" name="Occupied" />
              <Bar dataKey="vacant" stackId="a" fill="#dc2626" name="Vacant" />
            </BarChart>
          </ResponsiveContainer>
          <p className="text-xs text-slate-500 mt-2">Source: ACS 2019-2023 5-year estimates</p>
        </Card>

        {/* Tenure (Owner vs Renter) */}
        <Card title="Housing Tenure: Owner vs Renter">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={tenureData}>
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
              <Bar dataKey="owner" fill="#2563eb" name="Owner-Occupied" />
              <Bar dataKey="renter" fill="#64748b" name="Renter-Occupied" />
            </BarChart>
          </ResponsiveContainer>
          <p className="text-xs text-slate-500 mt-2">Source: ACS 2019-2023 5-year estimates</p>
        </Card>

        {/* Vacancy Rates */}
        <Card title="Vacancy Rates by County" highlight>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={vacancyRatesData}>
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
              <Bar dataKey="rate" fill="#dc2626" name="Vacancy Rate (%)" />
            </BarChart>
          </ResponsiveContainer>
          <p className="text-xs text-slate-500 mt-2">Source: ACS 2019-2023 5-year estimates</p>
          <div className="mt-3 p-3 bg-amber-50 border border-amber-200 rounded">
            <p className="text-sm text-amber-800">
              <strong>High vacancy rates in Archuleta (39.2%) and San Juan (49.7%)</strong> are driven by seasonal/recreational units in resort areas.
            </p>
          </div>
        </Card>
      </div>

      {/* Seasonal/Recreational Units Breakdown */}
      <Card title="Seasonal and Recreational Housing Units" className="mt-6">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">County</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">Seasonal Units</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">Vacant Units</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">% of Vacant</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">% of Total Units</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              {REGION_9_COUNTIES_DATA.map((county, idx) => {
                const pctOfVacant = county.seasonalRecreational && county.vacantUnits
                  ? ((county.seasonalRecreational / county.vacantUnits) * 100).toFixed(1)
                  : 'N/A';
                const pctOfTotal = county.seasonalRecreational && county.totalHousingUnits
                  ? ((county.seasonalRecreational / county.totalHousingUnits) * 100).toFixed(1)
                  : 'N/A';

                return (
                  <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">
                      {county.county}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-slate-700">
                      {county.seasonalRecreational?.toLocaleString() || 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-slate-700">
                      {county.vacantUnits?.toLocaleString() || 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-slate-700">
                      {pctOfVacant}%
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-slate-700">
                      {pctOfTotal}%
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-slate-500 mt-3">Source: ACS 2019-2023 5-year estimates, Table B25004</p>
      </Card>

      {/* Key Insights */}
      <Card title="Key Insights" className="mt-6" highlight>
        <ul className="space-y-2 text-slate-700">
          <li className="flex items-start">
            <span className="text-blue-600 font-bold mr-2">•</span>
            <span>The region has <strong>{REGION_9_AGGREGATE_STATS.totalHousingUnits.toLocaleString()} total housing units</strong>, with a <strong>{REGION_9_AGGREGATE_STATS.regionalVacancyRate.toFixed(1)}% vacancy rate</strong> significantly above the national average of ~10%.</span>
          </li>
          <li className="flex items-start">
            <span className="text-blue-600 font-bold mr-2">•</span>
            <span><strong>San Juan County</strong> has the highest vacancy rate at 49.7%, with 297 of its 358 vacant units (83%) being seasonal/recreational properties.</span>
          </li>
          <li className="flex items-start">
            <span className="text-blue-600 font-bold mr-2">•</span>
            <span><strong>Archuleta County</strong> has 3,059 seasonal/recreational units, representing 31.5% of all housing stock - the highest proportion in the region.</span>
          </li>
          <li className="flex items-start">
            <span className="text-blue-600 font-bold mr-2">•</span>
            <span>Regional homeownership rate is <strong>{REGION_9_AGGREGATE_STATS.ownershipRate.toFixed(1)}%</strong>, higher than the national average of ~65%, indicating a preference for ownership in rural mountain communities.</span>
          </li>
          <li className="flex items-start">
            <span className="text-amber-600 font-bold mr-2">•</span>
            <span><strong>Critical Finding:</strong> {REGION_9_AGGREGATE_STATS.totalSeasonalRecreational.toLocaleString()} seasonal/recreational units represent housing stock that is unavailable for year-round residents, exacerbating housing shortages.</span>
          </li>
        </ul>
      </Card>
    </Section>
  );
}
