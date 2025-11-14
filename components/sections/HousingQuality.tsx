'use client';

import { Section } from '../ui/Section';
import { Card } from '../ui/Card';
import { StatCard } from '../ui/StatCard';
import { REGION_9_COMPREHENSIVE_DATA } from '@/lib/data/region9-comprehensive';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface HousingQualityProps {
  selectedCounty: string | null;
}

export function HousingQuality({ selectedCounty }: HousingQualityProps) {
  const getCountyData = () => {
    if (!selectedCounty) {
      // Aggregate all counties
      return REGION_9_COMPREHENSIVE_DATA;
    }
    const county = REGION_9_COMPREHENSIVE_DATA.find(c => c.county === selectedCounty);
    return county ? [county] : [];
  };

  const countyDataList = getCountyData();

  // Prepare Year Built data
  const prepareYearBuiltData = () => {
    if (countyDataList.length === 0) return [];

    const aggregated: { [period: string]: number } = {};

    countyDataList.forEach(county => {
      Object.entries(county.yearBuilt || {}).forEach(([period, data]: [string, any]) => {
        const totalValue = data?.total;
        if (totalValue && period !== 'Total') {
          aggregated[period] = (aggregated[period] || 0) + totalValue;
        }
      });
    });

    return Object.entries(aggregated)
      .map(([period, total]) => ({
        period,
        units: total,
      }))
      .sort((a, b) => a.period.localeCompare(b.period));
  };

  // Prepare Unit Types data
  const prepareUnitTypesData = () => {
    if (countyDataList.length === 0) return [];

    const aggregated: { [type: string]: number } = {};

    countyDataList.forEach(county => {
      Object.entries(county.unitTypes || {}).forEach(([type, data]: [string, any]) => {
        if (data?.total && type !== 'Total') {
          aggregated[type] = (aggregated[type] || 0) + data.total;
        }
      });
    });

    return Object.entries(aggregated)
      .map(([type, total]) => ({
        type: type.replace('1, detached', 'Single-Family Detached')
          .replace('1, attached', 'Single-Family Attached')
          .replace('2', 'Duplex')
          .replace('3 or 4', '3-4 Units')
          .replace('5 to 9', '5-9 Units')
          .replace('10 to 19', '10-19 Units')
          .replace('20 or more', '20+ Units')
          .replace('Mobile home', 'Mobile Home')
          .replace('Boat, RV, van, etc.', 'Other'),
        units: total,
      }))
      .filter(d => d.units > 0)
      .sort((a, b) => b.units - a.units);
  };

  // Prepare Overcrowding data
  const prepareOvercrowdingData = () => {
    if (countyDataList.length === 0) return { overcrowded: 0, notOvercrowded: 0 };

    let overcrowded = 0;
    let notOvercrowded = 0;

    countyDataList.forEach(county => {
      Object.entries(county.overcrowding || {}).forEach(([category, data]: [string, any]) => {
        const totalValue = data?.total || 0;
        // "Less than 1 person per room" = not overcrowded
        // "1 to 2 people per room" and "More than 2 people per room" = overcrowded
        if (category.includes('Less than 1 person')) {
          notOvercrowded += totalValue;
        } else if (category.includes('1 to 2') || category.includes('More than 2')) {
          overcrowded += totalValue;
        }
      });
    });

    return { overcrowded, notOvercrowded };
  };

  const yearBuiltData = prepareYearBuiltData();
  const unitTypesData = prepareUnitTypesData();
  const overcrowdingData = prepareOvercrowdingData();

  const totalUnits = overcrowdingData.overcrowded + overcrowdingData.notOvercrowded;
  const overcrowdingRate = totalUnits > 0
    ? ((overcrowdingData.overcrowded / totalUnits) * 100).toFixed(1)
    : '0.0';

  // Count old housing (pre-1980)
  const oldHousingUnits = yearBuiltData
    .filter(d => d.period.includes('1979') || d.period.includes('1969') || d.period.includes('1959') ||
                 d.period.includes('1949') || d.period.includes('1939'))
    .reduce((sum, d) => sum + d.units, 0);
  const totalHousingUnits = yearBuiltData.reduce((sum, d) => sum + d.units, 0);
  const oldHousingPct = totalHousingUnits > 0
    ? ((oldHousingUnits / totalHousingUnits) * 100).toFixed(1)
    : '0.0';

  // Colors for pie chart
  const COLORS = ['#ef4444', '#10b981'];

  const formatTooltip = (value: any) => {
    if (typeof value === 'number') {
      return value.toLocaleString();
    }
    return value;
  };

  const displayName = selectedCounty || 'Region 9';

  return (
    <Section
      id="housing-quality"
      title="Section G: Housing Stock Quality"
      subtitle="Housing age, unit types, and overcrowding conditions"
    >
      {/* Key Stats */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <StatCard
          label="Housing Built Pre-1980"
          value={`${oldHousingPct}%`}
          subtitle={`${oldHousingUnits.toLocaleString()} units may need rehabilitation`}
        />
        <StatCard
          label="Overcrowding Rate"
          value={`${overcrowdingRate}%`}
          subtitle={`${overcrowdingData.overcrowded.toLocaleString()} overcrowded units`}
        />
        <StatCard
          label="Single-Family Share"
          value={`${unitTypesData.length > 0 ? ((unitTypesData.find(d => d.type.includes('Single-Family Detached'))?.units || 0) / totalHousingUnits * 100).toFixed(1) : '0.0'}%`}
          subtitle="Dominant housing type"
        />
      </div>

      {/* HNA Context */}
      <Card title="Why Housing Quality Matters" className="mb-8 bg-blue-50 border-2 border-blue-200">
        <div className="space-y-2 text-sm text-slate-700">
          <p>
            <strong>Housing Age:</strong> Older housing stock (pre-1980) often needs rehabilitation, energy efficiency upgrades,
            and accessibility modifications. Identifying aging housing informs rehab programs and redevelopment priorities.
          </p>
          <p>
            <strong>Overcrowding:</strong> Units with &gt;1.0 persons per room indicate <strong>hidden housing need</strong>.
            Overcrowding suggests insufficient supply of affordable, family-sized units.
          </p>
          <p>
            <strong>Unit Types:</strong> Reveals "missing middle" housing gaps. Heavy single-family dominance means limited options
            for seniors, singles, and cost-burdened households needing smaller, more affordable units.
          </p>
        </div>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Housing Age Distribution */}
        <Card title={`Housing by Year Built - ${displayName}`}>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={yearBuiltData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="period"
                angle={-45}
                textAnchor="end"
                height={100}
                fontSize={10}
              />
              <YAxis />
              <Tooltip formatter={formatTooltip} />
              <Bar dataKey="units" fill="#64748b" name="Housing Units" />
            </BarChart>
          </ResponsiveContainer>
          <p className="text-xs text-slate-500 mt-2">Source: ACS 2019-2023 Tenure by Year Built</p>
        </Card>

        {/* Unit Types Distribution */}
        <Card title={`Housing Unit Types - ${displayName}`}>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={unitTypesData.slice(0, 8)}
              layout="vertical"
              margin={{ left: 120 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis
                type="category"
                dataKey="type"
                width={110}
                fontSize={10}
              />
              <Tooltip formatter={formatTooltip} />
              <Bar dataKey="units" fill="#2563eb" name="Units" />
            </BarChart>
          </ResponsiveContainer>
          <p className="text-xs text-slate-500 mt-2">Source: ACS 2019-2023 Tenure by Units in Structure</p>
        </Card>

        {/* Overcrowding Status */}
        <Card title={`Overcrowding Status - ${displayName}`}>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={[
                  { name: 'Not Overcrowded (≤1.0 per room)', value: overcrowdingData.notOvercrowded },
                  { name: 'Overcrowded (>1.0 per room)', value: overcrowdingData.overcrowded },
                ]}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name?.split('(')[0] || 'Unknown'}: ${((percent || 0) * 100).toFixed(1)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {COLORS.map((color, index) => (
                  <Cell key={`cell-${index}`} fill={color} />
                ))}
              </Pie>
              <Tooltip formatter={formatTooltip} />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 text-center">
            <p className="text-sm font-semibold text-slate-900">
              {overcrowdingData.overcrowded.toLocaleString()} households living in overcrowded conditions
            </p>
            <p className="text-xs text-slate-600 mt-1">
              Overcrowding rate: {overcrowdingRate}% of occupied units
            </p>
          </div>
          <p className="text-xs text-slate-500 mt-4">Source: ACS 2019-2023 Tenure by Overcrowding</p>
        </Card>

        {/* Housing Stock Analysis */}
        <Card title="Housing Stock Analysis" className="bg-slate-50">
          <div className="space-y-4">
            <div>
              <p className="text-sm font-semibold text-slate-900 mb-2">Age Distribution Findings:</p>
              <ul className="text-xs text-slate-700 space-y-1">
                <li>• <strong>{oldHousingPct}%</strong> of housing built before 1980</li>
                <li>• Older housing may need energy efficiency upgrades</li>
                <li>• Rehabilitation programs should target pre-1980 stock</li>
              </ul>
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-900 mb-2">Unit Type Findings:</p>
              <ul className="text-xs text-slate-700 space-y-1">
                <li>• Single-family detached units dominate housing stock</li>
                <li>• Limited "missing middle" housing (duplexes, small multifamily)</li>
                <li>• Need for diverse housing types to serve all household sizes</li>
              </ul>
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-900 mb-2">Overcrowding Findings:</p>
              <ul className="text-xs text-slate-700 space-y-1">
                <li>• <strong>{overcrowdingData.overcrowded.toLocaleString()}</strong> households overcrowded</li>
                <li>• Indicates insufficient family-sized affordable units</li>
                <li>• Hidden housing need beyond vacancy rates</li>
              </ul>
            </div>
          </div>
        </Card>
      </div>

      {/* Key Insights */}
      <Card title="Key Insights" className="mt-6" highlight>
        <ul className="space-y-2 text-slate-700">
          <li className="flex items-start">
            <span className="text-blue-600 font-bold mr-2">•</span>
            <span>
              <strong>Aging Housing Stock:</strong> {oldHousingPct}% of housing was built before 1980,
              suggesting significant need for <strong>rehabilitation and weatherization programs</strong>.
            </span>
          </li>
          <li className="flex items-start">
            <span className="text-blue-600 font-bold mr-2">•</span>
            <span>
              <strong>Missing Middle Housing:</strong> Single-family homes dominate the housing stock,
              indicating a gap in <strong>duplexes, townhomes, and small multifamily</strong> options.
            </span>
          </li>
          <li className="flex items-start">
            <span className="text-amber-600 font-bold mr-2">•</span>
            <span>
              <strong>Overcrowding Concern:</strong> {overcrowdingData.overcrowded.toLocaleString()} households ({overcrowdingRate}%)
              are living in overcrowded conditions, revealing <strong>hidden housing need</strong> beyond vacancy statistics.
            </span>
          </li>
        </ul>
      </Card>
    </Section>
  );
}
