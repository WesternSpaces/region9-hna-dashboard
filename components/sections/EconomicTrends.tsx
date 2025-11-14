'use client';

import { Section } from '../ui/Section';
import { Card } from '../ui/Card';
import { StatCard } from '../ui/StatCard';
import { REGION_9_COUNTIES_DATA, REGION_9_AGGREGATE_STATS } from '@/lib/data/region9-constants';
import { REGION_9_HISTORICAL_DATA } from '@/lib/data/region9-historical';
import { REGION_9_COMPREHENSIVE_DATA } from '@/lib/data/region9-comprehensive';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ComposedChart } from 'recharts';
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

  // Prepare historical jobs trend data for single county or all counties
  const prepareJobsHistoricalData = () => {
    if (selectedCounty) {
      // Single county - show that county's historical trend
      const countyHistorical = REGION_9_HISTORICAL_DATA.find(c => c.county === selectedCounty);
      if (!countyHistorical) return [];

      const years = Object.keys(countyHistorical.jobs).filter(year =>
        parseInt(year) >= 2013 && parseInt(year) <= 2023
      ).sort();

      return years.map(year => ({
        year: parseInt(year),
        [selectedCounty.replace(' County', '')]: countyHistorical.jobs[year],
      })).filter(d => d[selectedCounty.replace(' County', '')] !== null);
    } else {
      // Show all counties as separate lines
      const years = Array.from({length: 11}, (_, i) => 2013 + i); // 2013-2023
      return years.map(year => {
        const yearStr = year.toString();
        const dataPoint: any = { year };

        // Add each county's jobs data as a separate field
        REGION_9_HISTORICAL_DATA.forEach(county => {
          const countyName = county.county.replace(' County', '');
          const jobs = county.jobs[yearStr];
          if (jobs !== null && jobs !== undefined) {
            dataPoint[countyName] = jobs;
          }
        });

        return dataPoint;
      }).filter(d => {
        // Keep year if at least one county has data
        const countyKeys = Object.keys(d).filter(k => k !== 'year');
        return countyKeys.some(k => d[k] !== null && d[k] !== undefined);
      });
    }
  };

  const jobsHistoricalData = prepareJobsHistoricalData();

  // Get list of counties with jobs data for rendering multiple lines
  const countiesWithJobsData = selectedCounty
    ? [selectedCounty.replace(' County', '')]
    : REGION_9_HISTORICAL_DATA
        .filter(c => Object.values(c.jobs).some(v => v !== null && v !== undefined))
        .map(c => c.county.replace(' County', ''));

  // Color mapping for counties
  const countyColors: { [key: string]: string } = {
    'Archuleta': '#3b82f6',  // blue
    'Dolores': '#8b5cf6',     // purple
    'La Plata': '#10b981',    // green
    'Montezuma': '#f59e0b',   // amber
    'San Juan': '#ef4444',    // red
  };

  // Prepare wages by sector data for current selection
  const prepareWagesBySectorData = () => {
    if (selectedCounty) {
      // Single county - show that county's wage data
      const countyData = REGION_9_COMPREHENSIVE_DATA.find(c => c.county === selectedCounty);
      if (!countyData || !countyData.wagesBySector) return [];

      return countyData.wagesBySector
        .filter(s => s.wage2023 !== null)
        .sort((a, b) => (b.wage2023 || 0) - (a.wage2023 || 0))
        .slice(0, 15) // Top 15 sectors
        .map(sector => ({
          sector: sector.sectorName.length > 30
            ? sector.sectorName.substring(0, 27) + '...'
            : sector.sectorName,
          fullSectorName: sector.sectorName,
          wage: sector.wage2023,
        }));
    } else {
      // Regional aggregate - average wages across counties with data
      const allSectors: { [key: string]: { sum: number; count: number; fullName: string } } = {};

      REGION_9_COMPREHENSIVE_DATA.forEach(county => {
        county.wagesBySector.forEach(sector => {
          if (sector.wage2023 !== null) {
            const key = sector.sectorName;
            if (!allSectors[key]) {
              allSectors[key] = { sum: 0, count: 0, fullName: sector.sectorName };
            }
            allSectors[key].sum += sector.wage2023;
            allSectors[key].count += 1;
          }
        });
      });

      return Object.entries(allSectors)
        .map(([key, data]) => ({
          sector: data.fullName.length > 30
            ? data.fullName.substring(0, 27) + '...'
            : data.fullName,
          fullSectorName: data.fullName,
          wage: Math.round(data.sum / data.count),
        }))
        .sort((a, b) => (b.wage || 0) - (a.wage || 0))
        .slice(0, 15); // Top 15 sectors
    }
  };

  const wagesBySectorData = prepareWagesBySectorData();

  // Prepare total job projections by county (all sectors aggregated)
  const prepareJobProjectionsData = () => {
    const years = Array.from({length: 10}, (_, i) => 2024 + i);

    if (selectedCounty) {
      // Single county - show only that county's total job projections
      const countyData = REGION_9_COMPREHENSIVE_DATA.find(c => c.county === selectedCounty);
      if (!countyData || !countyData.jobProjections) return [];

      const countyName = selectedCounty.replace(' County', '');

      return years.map(year => {
        const yearStr = year.toString();
        const dataPoint: any = { year };

        // Aggregate all sectors for this county
        let totalJobs = 0;
        let hasData = false;
        countyData.jobProjections.forEach(sector => {
          const jobs = sector.projections[yearStr];
          if (jobs !== null && jobs !== undefined) {
            totalJobs += jobs;
            hasData = true;
          }
        });

        dataPoint[countyName] = hasData ? totalJobs : null;
        return dataPoint;
      });
    } else {
      // Show all counties as separate lines
      return years.map(year => {
        const yearStr = year.toString();
        const dataPoint: any = { year };

        REGION_9_COMPREHENSIVE_DATA.forEach(county => {
          const countyName = county.county.replace(' County', '');

          // Aggregate all sectors for this county and year
          let totalJobs = 0;
          let hasData = false;
          county.jobProjections.forEach(sector => {
            const jobs = sector.projections[yearStr];
            if (jobs !== null && jobs !== undefined) {
              totalJobs += jobs;
              hasData = true;
            }
          });

          if (hasData) {
            dataPoint[countyName] = totalJobs;
          }
        });

        return dataPoint;
      });
    }
  };

  const jobProjectionsData = prepareJobProjectionsData();

  // Get list of counties with job projection data
  const countiesWithProjectionsData = selectedCounty
    ? [selectedCounty.replace(' County', '')]
    : REGION_9_COMPREHENSIVE_DATA
        .filter(c => c.jobProjections && c.jobProjections.length > 0)
        .map(c => c.county.replace(' County', ''));

  // Prepare income distribution trends data
  const prepareIncomeDistributionData = () => {
    const countyDataList = selectedCounty
      ? REGION_9_COMPREHENSIVE_DATA.filter(c => c.county === selectedCounty)
      : REGION_9_COMPREHENSIVE_DATA;

    if (countyDataList.length === 0) return [];

    // Income categories have a nested structure with empty string as key
    // Each county has incomeCategories[""] with income brackets as keys
    // The data has actual bracket names (e.g. "$10,000 to $14,999") mixed with
    // "Unnamed" columns and metadata like "GEOID" and "Total Households"

    const aggregatedByBracket: { [bracket: string]: number } = {};

    countyDataList.forEach(county => {
      const incomeData = county.incomeCategories?.[""] || {};

      Object.entries(incomeData).forEach(([key, value]: [string, any]) => {
        // Filter out non-bracket data
        if (key.startsWith('Unnamed') ||
            key === 'GEOID' ||
            key === 'Total Households' ||
            key === '' ||
            typeof value !== 'number') {
          return;
        }

        // Accumulate across counties
        aggregatedByBracket[key] = (aggregatedByBracket[key] || 0) + value;
      });
    });

    // Sort income brackets by their lower bound
    const sortBrackets = (brackets: [string, number][]) => {
      return brackets.sort((a, b) => {
        const getMin = (bracket: string) => {
          const match = bracket.match(/\$?([\d,]+)/);
          return match ? parseInt(match[1].replace(/,/g, '')) : 0;
        };
        return getMin(a[0]) - getMin(b[0]);
      });
    };

    const sortedBrackets = sortBrackets(Object.entries(aggregatedByBracket));

    // Transform to chart format
    return sortedBrackets
      .map(([bracket, households]) => ({
        bracket: bracket
          .replace('Less than ', '<')
          .replace(' or more', '+')
          .replace('$', '')
          .replace(',000', 'k'),
        households
      }))
      .filter(d => d.households > 0);
  };

  const incomeDistributionData = prepareIncomeDistributionData();

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

      {/* Historical Jobs Trends - Full Width */}
      <Card title={`Historical Jobs Trends (2013-2023)${selectedCounty ? ` - ${selectedCounty}` : ' - Region 9'}`} className="mt-6" highlight>
        {jobsHistoricalData.length > 0 ? (
          <>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={jobsHistoricalData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="year"
                  label={{ value: 'Year', position: 'insideBottom', offset: -5 }}
                />
                <YAxis
                  label={{ value: 'Jobs (hundreds)', angle: -90, position: 'insideLeft' }}
                />
                <Tooltip formatter={formatTooltip} />
                <Legend />
                {countiesWithJobsData.map(county => (
                  <Line
                    key={county}
                    type="monotone"
                    dataKey={county}
                    stroke={countyColors[county] || '#6b7280'}
                    strokeWidth={selectedCounty ? 3 : 2}
                    dot={{ r: selectedCounty ? 4 : 3 }}
                    name={`${county} (hundreds)`}
                    connectNulls
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>
            <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded">
              <p className="text-sm text-blue-900">
                <strong>Historical Jobs Data (2013-2023):</strong> SDO actual estimates from Jobs by Sector data.
                {selectedCounty && ` Showing ${selectedCounty} specific employment trends over time.`}
                {!selectedCounty && ` Showing all ${countiesWithJobsData.length} counties with available jobs data as separate lines for comparison.`}
                {selectedCounty && jobsHistoricalData.length === 0 && (
                  <span className="ml-2 text-amber-700"><strong>Note:</strong> Jobs data not available for this county due to small population size.</span>
                )}
              </p>
            </div>
            <p className="text-xs text-slate-500 mt-2">Source: SDO 2023 Vintage Jobs by Sector Estimates</p>
          </>
        ) : (
          <div className="p-6 bg-amber-50 border border-amber-200 rounded">
            <p className="text-amber-900">
              <strong>No jobs data available</strong> {selectedCounty ? `for ${selectedCounty}` : 'for this selection'} due to small population size and SDO reporting thresholds.
              {selectedCounty && (
                <span className="ml-2">Counties with jobs data: Archuleta, La Plata, and Montezuma.</span>
              )}
            </p>
          </div>
        )}
      </Card>

      {/* Wages by Sector - HNA Section IV Requirement */}
      <Card title={`Median Wages by Sector (2023)${selectedCounty ? ` - ${selectedCounty}` : ' - Region 9'}`} className="mt-6" highlight>
        {wagesBySectorData.length > 0 ? (
          <>
            <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded">
              <p className="text-sm text-blue-900">
                <strong>HNA Section IV Requirement:</strong> Jobs sorted by annual salary/wage.
                This data is essential for calculating workforce housing needs by income bracket.
                {!selectedCounty && <span className="ml-1">Showing regional average wages across all counties.</span>}
              </p>
            </div>
            <ResponsiveContainer width="100%" height={500}>
              <BarChart
                data={wagesBySectorData}
                layout="vertical"
                margin={{ left: 200, right: 30, top: 10, bottom: 10 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  type="number"
                  tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                  domain={[0, 'dataMax']}
                />
                <YAxis
                  type="category"
                  dataKey="sector"
                  width={190}
                  fontSize={11}
                />
                <Tooltip
                  formatter={(value: any) => [`$${typeof value === 'number' ? value.toLocaleString() : value}`, 'Median Wage']}
                  labelFormatter={(label) => {
                    const item = wagesBySectorData.find(d => d.sector === label);
                    return item?.fullSectorName || label;
                  }}
                />
                <Bar dataKey="wage" fill="#059669" name="Median Wage" />
              </BarChart>
            </ResponsiveContainer>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-3 bg-green-50 border border-green-200 rounded">
                <p className="text-xs font-semibold text-green-900 mb-1">HIGH WAGE (&gt;$80k)</p>
                <p className="text-xs text-green-800">
                  Sectors: {wagesBySectorData.filter(s => s.wage && s.wage > 80000).length} sectors
                </p>
                <p className="text-xs text-green-700 mt-1">
                  Can typically afford market-rate housing
                </p>
              </div>
              <div className="p-3 bg-amber-50 border border-amber-200 rounded">
                <p className="text-xs font-semibold text-amber-900 mb-1">MIDDLE WAGE ($50k-$80k)</p>
                <p className="text-xs text-amber-800">
                  Sectors: {wagesBySectorData.filter(s => s.wage && s.wage >= 50000 && s.wage <= 80000).length} sectors
                </p>
                <p className="text-xs text-amber-700 mt-1">
                  Need workforce housing assistance
                </p>
              </div>
              <div className="p-3 bg-red-50 border border-red-200 rounded">
                <p className="text-xs font-semibold text-red-900 mb-1">LOW WAGE (&lt;$50k)</p>
                <p className="text-xs text-red-800">
                  Sectors: {wagesBySectorData.filter(s => s.wage && s.wage < 50000).length} sectors
                </p>
                <p className="text-xs text-red-700 mt-1">
                  Need affordable/subsidized housing
                </p>
              </div>
            </div>
            <p className="text-xs text-slate-500 mt-4">Source: SDO 2023 Vintage Jobs and Wage Data</p>
          </>
        ) : (
          <div className="p-6 bg-amber-50 border border-amber-200 rounded">
            <p className="text-amber-900">
              <strong>No wage data available</strong> {selectedCounty ? `for ${selectedCounty}` : 'for this selection'} due to small population size and SDO reporting thresholds.
            </p>
          </div>
        )}
      </Card>

      {/* Total Job Projections by County (2024-2033) */}
      <Card title={`Total Job Projections (2024-2033)${selectedCounty ? ` - ${selectedCounty}` : ' - Region 9'}`} className="mt-6" highlight>
        {jobProjectionsData.length > 0 && countiesWithProjectionsData.length > 0 ? (
          <>
            <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded">
              <p className="text-sm text-blue-900">
                <strong>Future Employment Growth:</strong> Total job projections across all sectors, showing expected employment growth through 2033.
                {!selectedCounty && <span className="ml-1">Showing all {countiesWithProjectionsData.length} counties with available projections data as separate lines for comparison.</span>}
              </p>
            </div>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={jobProjectionsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="year"
                  label={{ value: 'Year', position: 'insideBottom', offset: -5 }}
                />
                <YAxis
                  label={{ value: 'Total Jobs (hundreds)', angle: -90, position: 'insideLeft' }}
                />
                <Tooltip formatter={formatTooltip} />
                <Legend wrapperStyle={{ fontSize: '12px' }} />
                {countiesWithProjectionsData.map(county => (
                  <Line
                    key={county}
                    type="monotone"
                    dataKey={county}
                    stroke={countyColors[county] || '#6b7280'}
                    strokeWidth={selectedCounty ? 3 : 2}
                    dot={{ r: selectedCounty ? 4 : 3 }}
                    name={`${county} (hundreds)`}
                    connectNulls
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>
            <p className="text-xs text-slate-500 mt-4">Source: SDO 2023 Vintage Job Projections (all sectors aggregated)</p>
            <p className="text-xs text-slate-600 mt-2">
              <strong>Note:</strong> Projections aggregate all employment sectors to show total expected job growth.
              Future housing demand will be driven by overall employment growth trends.
            </p>
          </>
        ) : (
          <div className="p-6 bg-amber-50 border border-amber-200 rounded">
            <p className="text-amber-900">
              <strong>No job projection data available</strong> {selectedCounty ? `for ${selectedCounty}` : 'for this selection'}.
            </p>
          </div>
        )}
      </Card>

      {/* Income Distribution */}
      <Card title={`Household Income Distribution${selectedCounty ? ` - ${selectedCounty}` : ' - Region 9'}`} className="mt-6" highlight>
        {incomeDistributionData.length > 0 ? (
          <>
            <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded">
              <p className="text-sm text-blue-900">
                <strong>Income Distribution Analysis:</strong> Household income brackets showing the distribution of households across income levels.
                This data helps identify housing affordability gaps and workforce housing needs across different income cohorts.
              </p>
            </div>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={incomeDistributionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="bracket"
                  angle={-45}
                  textAnchor="end"
                  height={120}
                  fontSize={10}
                  interval={0}
                />
                <YAxis
                  label={{ value: 'Households', angle: -90, position: 'insideLeft' }}
                />
                <Tooltip formatter={formatTooltip} />
                <Bar dataKey="households" fill="#2563eb" name="Households" />
              </BarChart>
            </ResponsiveContainer>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-3 bg-red-50 border border-red-200 rounded">
                <p className="text-xs font-semibold text-red-900 mb-1">LOW INCOME (&lt;$35k)</p>
                <p className="text-xs text-red-700">
                  Lowest income brackets - need affordable/subsidized housing
                </p>
              </div>
              <div className="p-3 bg-blue-50 border border-blue-200 rounded">
                <p className="text-xs font-semibold text-blue-900 mb-1">MIDDLE INCOME ($35k-$100k)</p>
                <p className="text-xs text-blue-700">
                  Core workforce - need workforce housing programs
                </p>
              </div>
              <div className="p-3 bg-green-50 border border-green-200 rounded">
                <p className="text-xs font-semibold text-green-900 mb-1">HIGH INCOME (&gt;$100k)</p>
                <p className="text-xs text-green-700">
                  Can typically afford market-rate housing
                </p>
              </div>
            </div>
            <p className="text-xs text-slate-500 mt-4">Source: ACS 2019-2023 Income Categories</p>
            <p className="text-xs text-slate-600 mt-2">
              <strong>Analysis:</strong> Income distribution reveals housing affordability challenges.
              Higher concentrations in lower brackets indicate greater need for affordable and workforce housing programs.
            </p>
          </>
        ) : (
          <p className="text-slate-600">No income distribution data available for this selection.</p>
        )}
      </Card>

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
