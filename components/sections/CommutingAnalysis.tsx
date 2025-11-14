'use client';

import { Section } from '../ui/Section';
import { Card } from '../ui/Card';
import { StatCard } from '../ui/StatCard';
import { REGION_9_COMPREHENSIVE_DATA } from '@/lib/data/region9-comprehensive';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface CommutingAnalysisProps {
  selectedCounty: string | null;
}

export function CommutingAnalysis({ selectedCounty }: CommutingAnalysisProps) {
  // Prepare commuting data for selected county
  const prepareCommuteData = () => {
    if (!selectedCounty) {
      // Regional overview - aggregate top destinations across all counties
      const destinationTotals: { [dest: string]: number } = {};

      REGION_9_COMPREHENSIVE_DATA.forEach(county => {
        if (!county.commuteCounty) return;

        county.commuteCounty.forEach(dest => {
          const cleanDest = dest.workLocation.replace(' County, Colorado', '').replace(' County', '');
          destinationTotals[cleanDest] = (destinationTotals[cleanDest] || 0) + dest.workers;
        });
      });

      // Return top 15 destinations
      return Object.entries(destinationTotals)
        .map(([destination, workers]) => ({ destination, workers }))
        .sort((a, b) => b.workers - a.workers)
        .slice(0, 15);
    }

    const countyData = REGION_9_COMPREHENSIVE_DATA.find(c => c.county === selectedCounty);
    if (!countyData || !countyData.commuteCounty) return [];

    // Get top 10 commute destinations
    return countyData.commuteCounty
      .slice(0, 10)
      .map(dest => ({
        destination: dest.workLocation.replace(' County, Colorado', '').replace(' County', ''),
        workers: dest.workers,
        percentage: dest.percentage || 0,
      }));
  };

  const commuteData = prepareCommuteData();

  // Calculate stats
  const totalCommuters = commuteData.reduce((sum, d) => sum + d.workers, 0);
  const workInCounty = selectedCounty
    ? commuteData.find(d => d.destination === selectedCounty.replace(' County', ''))
    : null;
  const workInCountyPct: number = (workInCounty && 'percentage' in workInCounty && typeof workInCounty.percentage === 'number')
    ? workInCounty.percentage
    : 0;
  const commuteOut = totalCommuters - (workInCounty?.workers || 0);
  const commuteOutPct = totalCommuters > 0 ? ((commuteOut / totalCommuters) * 100).toFixed(1) : '0.0';

  // Custom tooltip formatter
  const formatTooltip = (value: any) => {
    if (typeof value === 'number') {
      return value.toLocaleString();
    }
    return value;
  };

  if (!selectedCounty) {
    // Regional overview when no county is selected
    return (
      <Section
        id="commuting"
        title="Section F: Commuting Patterns"
        subtitle="Where Region 9 residents work - regional workforce dynamics"
      >
        {/* HNA Context */}
        <Card title="Regional Commuting Overview" className="mb-8 bg-blue-50 border-2 border-blue-200">
          <div className="space-y-3">
            <p className="text-sm text-slate-700">
              <strong>Understanding Workforce Flows:</strong> Commuting patterns reveal where Region 9 residents work,
              helping identify jobs-housing imbalances and regional economic connections.
            </p>
            <p className="text-sm text-slate-700">
              <strong>HNA Application:</strong> Understanding regional commute patterns helps allocate housing needs across jurisdictions
              and coordinate workforce housing development to reduce transportation burdens.
            </p>
          </div>
        </Card>

        {/* Regional Commute Destinations Chart */}
        {commuteData.length > 0 ? (
          <Card title="Top 15 Work Destinations for Region 9 Residents" highlight>
            <div className="mb-4 p-3 bg-slate-50 border border-slate-200 rounded">
              <p className="text-sm text-slate-700">
                <strong>Regional Workforce Destinations:</strong> This chart shows where Region 9 residents work,
                aggregated across all counties. Select a specific county to see detailed commuting patterns for that county.
              </p>
            </div>
            <ResponsiveContainer width="100%" height={500}>
              <BarChart
                data={commuteData}
                layout="vertical"
                margin={{ left: 150, right: 30, top: 10, bottom: 10 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" tickFormatter={(value) => value.toLocaleString()} />
                <YAxis
                  type="category"
                  dataKey="destination"
                  width={140}
                  fontSize={12}
                />
                <Tooltip formatter={formatTooltip} />
                <Bar dataKey="workers" fill="#3b82f6" name="Workers" />
              </BarChart>
            </ResponsiveContainer>
            <p className="text-xs text-slate-500 mt-4">
              Source: ACS 2019-2023 Commute County Data (aggregated across all Region 9 counties)
            </p>
            <p className="text-xs text-slate-600 mt-2">
              <strong>Total Regional Commuters:</strong> {totalCommuters.toLocaleString()} workers tracked across all origin counties.
              Select a county to see detailed commuting breakdowns and in-county vs. out-county percentages.
            </p>
          </Card>
        ) : (
          <Card title="No Regional Commuting Data Available">
            <p className="text-slate-600">
              Commuting pattern data is not available for the region.
            </p>
          </Card>
        )}

        {/* Key Insights */}
        <Card title="Key Regional Insights" className="mt-6" highlight>
          <ul className="space-y-2 text-slate-700">
            <li className="flex items-start">
              <span className="text-blue-600 font-bold mr-2">•</span>
              <span>
                <strong>Regional Workforce Integration:</strong> The chart reveals economic connections between Region 9 and neighboring areas,
                showing which employment centers attract Region 9 residents.
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-amber-600 font-bold mr-2">•</span>
              <span>
                <strong>Jobs-Housing Balance:</strong> Significant commuting to other counties suggests potential jobs-housing imbalances
                that could be addressed through coordinated workforce housing development.
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-green-600 font-bold mr-2">•</span>
              <span>
                <strong>Next Step:</strong> Select a specific county to see detailed commuting patterns, including the percentage
                of residents who work locally vs. commute out, and top destination counties.
              </span>
            </li>
          </ul>
        </Card>
      </Section>
    );
  }

  return (
    <Section
      id="commuting"
      title="Section F: Commuting Patterns"
      subtitle={`Where ${selectedCounty} residents work`}
    >
      {/* Key Stats */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <StatCard
          label="Total Commuters Tracked"
          value={totalCommuters.toLocaleString()}
          subtitle={`${selectedCounty} residents`}
        />
        <StatCard
          label="Work in County"
          value={`${workInCountyPct.toFixed(1)}%`}
          subtitle={workInCounty ? `${workInCounty.workers.toLocaleString()} workers` : 'Live and work locally'}
        />
        <StatCard
          label="Commute Out"
          value={`${commuteOutPct}%`}
          subtitle={`${commuteOut.toLocaleString()} workers leave county`}
        />
      </div>

      {/* HNA Context */}
      <Card title="Why Commuting Patterns Matter for Housing" className="mb-8 bg-blue-50 border-2 border-blue-200">
        <div className="space-y-3">
          <p className="text-sm text-slate-700">
            <strong>Jobs-Housing Imbalance:</strong> When workers commute out of their county of residence, it indicates:
          </p>
          <ul className="list-disc list-inside space-y-1 text-sm text-slate-700 ml-4">
            <li>Housing may be more affordable in the residence county but jobs are elsewhere</li>
            <li>Or, housing near jobs is unaffordable, forcing workers to live farther away</li>
            <li>Transportation costs and time burden workers who can't afford housing near employment</li>
          </ul>
          <p className="text-sm text-slate-700 mt-3">
            <strong>HNA Application:</strong> Understanding commute patterns helps allocate housing needs across jurisdictions.
            If many {selectedCounty} residents work in La Plata County, workforce housing in La Plata reduces commuting burden.
          </p>
        </div>
      </Card>

      {/* Commute Destinations Chart */}
      {commuteData.length > 0 ? (
        <Card title={`Top 10 Work Destinations for ${selectedCounty} Residents`} highlight>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart
              data={commuteData}
              layout="vertical"
              margin={{ left: 150, right: 30, top: 10, bottom: 10 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" tickFormatter={(value) => value.toLocaleString()} />
              <YAxis
                type="category"
                dataKey="destination"
                width={140}
                fontSize={12}
              />
              <Tooltip formatter={formatTooltip} />
              <Bar dataKey="workers" fill="#3b82f6" name="Workers" />
            </BarChart>
          </ResponsiveContainer>
          <p className="text-xs text-slate-500 mt-4">Source: ACS 2019-2023 Commute County Data</p>

          {/* Key Findings */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-3 bg-green-50 border border-green-200 rounded">
              <p className="text-xs font-semibold text-green-900 mb-1">LIVE & WORK LOCALLY</p>
              <p className="text-lg font-bold text-green-700">{workInCountyPct.toFixed(1)}%</p>
              <p className="text-xs text-green-700 mt-1">
                {workInCounty?.workers.toLocaleString() || 0} residents work within {selectedCounty}
              </p>
            </div>
            <div className="p-3 bg-amber-50 border border-amber-200 rounded">
              <p className="text-xs font-semibold text-amber-900 mb-1">OUT-COMMUTERS</p>
              <p className="text-lg font-bold text-amber-700">{commuteOutPct}%</p>
              <p className="text-xs text-amber-700 mt-1">
                {commuteOut.toLocaleString()} residents commute to other counties for work
              </p>
            </div>
          </div>
        </Card>
      ) : (
        <Card title="No Commuting Data Available">
          <p className="text-slate-600">
            Commuting pattern data is not available for {selectedCounty}.
          </p>
        </Card>
      )}

      {/* Key Insights */}
      <Card title="Key Insights" className="mt-6" highlight>
        <ul className="space-y-2 text-slate-700">
          {workInCountyPct > 70 ? (
            <li className="flex items-start">
              <span className="text-green-600 font-bold mr-2">•</span>
              <span>
                <strong>Strong Local Employment:</strong> Over {workInCountyPct.toFixed(0)}% of residents work within {selectedCounty},
                indicating a <strong>self-contained local economy</strong>. Housing demand is primarily driven by local jobs.
              </span>
            </li>
          ) : (
            <li className="flex items-start">
              <span className="text-amber-600 font-bold mr-2">•</span>
              <span>
                <strong>Significant Out-Commuting:</strong> {commuteOutPct}% of residents work outside {selectedCounty},
                suggesting <strong>housing affordability or job availability issues</strong>. Many residents may work in higher-wage counties
                but live here due to lower housing costs.
              </span>
            </li>
          )}
          <li className="flex items-start">
            <span className="text-blue-600 font-bold mr-2">•</span>
            <span>
              The commuting pattern suggests that workforce housing development should consider <strong>regional coordination</strong> to reduce
              transportation burden on workers.
            </span>
          </li>
        </ul>
      </Card>
    </Section>
  );
}
