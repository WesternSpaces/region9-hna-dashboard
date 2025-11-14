'use client';

import React, { Fragment } from 'react';
import { Section } from '../ui/Section';
import { Card } from '../ui/Card';

interface HNAOutputTablesProps {
  selectedCounty: string | null;
}

const AMI_CATEGORIES = [
  { label: 'Extremely Low Income', description: '≤ 30% AMI' },
  { label: 'Very Low Income', description: '31-50% AMI' },
  { label: 'Low Income', description: '51-80% AMI' },
  { label: 'Moderate Income', description: '81-120% AMI' },
  { label: 'Middle Income', description: '121-200% AMI' },
  { label: 'Upper Income', description: '> 200% AMI' },
];

export function HNAOutputTables({ selectedCounty }: HNAOutputTablesProps) {
  return (
    <Section
      id="hna-output-tables"
      title="HNA Required Output Tables"
      subtitle="Standardized housing needs assessment tables per SB 24-174"
    >
      {/* AMI Definitions Card */}
      <Card title="Area Median Income (AMI) Categories" className="mb-8 bg-blue-50 border-2 border-blue-200">
        <div className="space-y-3">
          <p className="text-sm text-slate-700">
            <strong>AMI Categories Defined:</strong> Income levels are designated by the U.S. Department of Housing
            and Urban Development (HUD) as percentages of the Area Median Income.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-4">
            {AMI_CATEGORIES.map((cat) => (
              <div key={cat.label} className="p-3 bg-white border border-blue-200 rounded">
                <p className="text-xs font-semibold text-blue-900">{cat.label}</p>
                <p className="text-sm text-blue-700 mt-1">{cat.description}</p>
              </div>
            ))}
          </div>
          <p className="text-xs text-slate-600 mt-4">
            <strong>Note:</strong> These standardized categories ensure consistency across all Colorado Housing Needs Assessments.
          </p>
        </div>
      </Card>

      {/* Methodology Note */}
      <Card className="mb-8 bg-amber-50 border-2 border-amber-200">
        <div className="space-y-2">
          <p className="text-sm font-semibold text-amber-900">
            📊 Methodology Note: Catch-Up and Keep-Up Calculations
          </p>
          <p className="text-sm text-slate-700">
            The following output tables require complex calculations to determine existing housing shortages
            (Catch-Up) and projected 10-year housing needs (Keep-Up) by AMI category. These calculations are
            currently in development and will be populated in a future update.
          </p>
          <p className="text-sm text-slate-700">
            <strong>Data requirements include:</strong> Cost burden analysis, overcrowding adjustments, vacancy rates,
            household projections, wage-to-housing affordability ratios, and jobs-housing balance metrics.
          </p>
        </div>
      </Card>

      {/* Output Table 1: Existing Housing Needs (Catch-Up) */}
      <Card title="Output Table 1: Existing Housing Needs (Catch-Up)" highlight className="mb-8">
        <p className="text-sm text-slate-600 mb-4">
          Quantifies the current housing shortage by AMI category, addressing existing unmet housing demand.
        </p>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200 border border-slate-300">
            <thead className="bg-slate-100">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700 border-r">
                  AMI Category
                </th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-slate-700 border-r">
                  Total Units Needed
                </th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-slate-700 border-r">
                  Owner Units Needed
                </th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-slate-700">
                  Renter Units Needed
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              {AMI_CATEGORIES.map((cat, idx) => (
                <tr key={cat.label} className={idx % 2 === 0 ? 'bg-slate-50' : 'bg-white'}>
                  <td className="px-4 py-2 text-sm text-slate-700 border-r">
                    <span className="font-medium">{cat.label}</span>
                    <span className="text-xs text-slate-500 ml-2">({cat.description})</span>
                  </td>
                  <td className="px-4 py-2 text-sm text-slate-500 text-right border-r italic">TBD</td>
                  <td className="px-4 py-2 text-sm text-slate-500 text-right border-r italic">TBD</td>
                  <td className="px-4 py-2 text-sm text-slate-500 text-right italic">TBD</td>
                </tr>
              ))}
              <tr className="bg-blue-100 font-semibold">
                <td className="px-4 py-3 text-sm text-slate-900 border-r">Total Catch-Up Units Needed</td>
                <td className="px-4 py-3 text-sm text-slate-700 text-right border-r italic">TBD</td>
                <td className="px-4 py-3 text-sm text-slate-700 text-right border-r italic">TBD</td>
                <td className="px-4 py-3 text-sm text-slate-700 text-right italic">TBD</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-xs text-slate-500 mt-3">
          <strong>Calculation basis:</strong> Cost-burdened households + overcrowded units + inadequate housing conditions
        </p>
      </Card>

      {/* Output Table 2: 10-Year Projected Housing Needs (Keep-Up) */}
      <Card title="Output Table 2: 10-Year Projected Housing Needs (Keep-Up)" highlight className="mb-8">
        <p className="text-sm text-slate-600 mb-4">
          Projects housing needs over the next 10 years based on job growth, household formation, and demographic trends.
        </p>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200 border border-slate-300">
            <thead className="bg-slate-100">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700 border-r">
                  AMI Category
                </th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-slate-700 border-r">
                  Total Units Needed
                </th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-slate-700 border-r">
                  Owner Units Needed
                </th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-slate-700">
                  Renter Units Needed
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              {AMI_CATEGORIES.map((cat, idx) => (
                <tr key={cat.label} className={idx % 2 === 0 ? 'bg-slate-50' : 'bg-white'}>
                  <td className="px-4 py-2 text-sm text-slate-700 border-r">
                    <span className="font-medium">{cat.label}</span>
                    <span className="text-xs text-slate-500 ml-2">({cat.description})</span>
                  </td>
                  <td className="px-4 py-2 text-sm text-slate-500 text-right border-r italic">TBD</td>
                  <td className="px-4 py-2 text-sm text-slate-500 text-right border-r italic">TBD</td>
                  <td className="px-4 py-2 text-sm text-slate-500 text-right italic">TBD</td>
                </tr>
              ))}
              <tr className="bg-green-100 font-semibold">
                <td className="px-4 py-3 text-sm text-slate-900 border-r">Total Keep-Up Units Needed (10 years)</td>
                <td className="px-4 py-3 text-sm text-slate-700 text-right border-r italic">TBD</td>
                <td className="px-4 py-3 text-sm text-slate-700 text-right border-r italic">TBD</td>
                <td className="px-4 py-3 text-sm text-slate-700 text-right italic">TBD</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-xs text-slate-500 mt-3">
          <strong>Calculation basis:</strong> Projected job growth + household formation rates + wage-to-housing affordability
        </p>
      </Card>

      {/* Output Table 3: Allocation by Jurisdiction */}
      <Card title="Output Table 3: Allocation of Existing and 10-Year Projected Housing Needs" highlight className="mb-8">
        <p className="text-sm text-slate-600 mb-4">
          Distributes total housing needs across all Region 9 jurisdictions (5 counties) by tenure and AMI category.
        </p>
        <p className="text-sm text-amber-700 bg-amber-50 p-3 rounded border border-amber-200 mb-4">
          <strong>Note:</strong> This table will show each county's allocated share of the regional housing needs,
          calculated based on employment shares, existing cost burden, and overcrowding patterns.
        </p>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200 border border-slate-300 text-xs">
            <thead className="bg-slate-100">
              <tr>
                <th rowSpan={2} className="px-3 py-3 text-left font-semibold text-slate-700 border-r border-b">
                  AMI Category
                </th>
                <th colSpan={3} className="px-3 py-2 text-center font-semibold text-slate-700 border-r border-b">
                  Region 9 Total
                </th>
                <th colSpan={3} className="px-3 py-2 text-center font-semibold text-slate-700 border-r border-b">
                  Archuleta County
                </th>
                <th colSpan={3} className="px-3 py-2 text-center font-semibold text-slate-700 border-r border-b">
                  Dolores County
                </th>
                <th colSpan={3} className="px-3 py-2 text-center font-semibold text-slate-700 border-r border-b">
                  La Plata County
                </th>
                <th colSpan={3} className="px-3 py-2 text-center font-semibold text-slate-700 border-r border-b">
                  Montezuma County
                </th>
                <th colSpan={3} className="px-3 py-2 text-center font-semibold text-slate-700 border-b">
                  San Juan County
                </th>
              </tr>
              <tr className="bg-slate-50">
                {[...Array(6)].map((_, idx) => (
                  <Fragment key={idx}>
                    <th className="px-2 py-2 text-right font-medium text-slate-600 border-r">Existing</th>
                    <th className="px-2 py-2 text-right font-medium text-slate-600 border-r">Projected</th>
                    <th className="px-2 py-2 text-right font-medium text-slate-600 border-r">Total</th>
                  </Fragment>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              <tr className="bg-blue-50">
                <td colSpan={19} className="px-3 py-2 font-semibold text-slate-800">RENTAL UNITS</td>
              </tr>
              {AMI_CATEGORIES.map((cat, idx) => (
                <tr key={`rental-${cat.label}`} className={idx % 2 === 0 ? 'bg-slate-50' : 'bg-white'}>
                  <td className="px-3 py-2 text-slate-700 border-r">
                    <span className="font-medium">{cat.label}</span>
                  </td>
                  {[...Array(18)].map((_, colIdx) => (
                    <td key={colIdx} className="px-2 py-2 text-slate-400 text-right border-r italic text-xs">
                      TBD
                    </td>
                  ))}
                </tr>
              ))}
              <tr className="bg-blue-100 font-semibold">
                <td className="px-3 py-2 text-slate-900 border-r">Total Rental Units</td>
                {[...Array(18)].map((_, colIdx) => (
                  <td key={colIdx} className="px-2 py-2 text-slate-600 text-right border-r italic text-xs">
                    TBD
                  </td>
                ))}
              </tr>
              <tr className="bg-green-50">
                <td colSpan={19} className="px-3 py-2 font-semibold text-slate-800">OWNERSHIP UNITS</td>
              </tr>
              {AMI_CATEGORIES.map((cat, idx) => (
                <tr key={`owner-${cat.label}`} className={idx % 2 === 0 ? 'bg-slate-50' : 'bg-white'}>
                  <td className="px-3 py-2 text-slate-700 border-r">
                    <span className="font-medium">{cat.label}</span>
                  </td>
                  {[...Array(18)].map((_, colIdx) => (
                    <td key={colIdx} className="px-2 py-2 text-slate-400 text-right border-r italic text-xs">
                      TBD
                    </td>
                  ))}
                </tr>
              ))}
              <tr className="bg-green-100 font-semibold">
                <td className="px-3 py-2 text-slate-900 border-r">Total Ownership Units</td>
                {[...Array(18)].map((_, colIdx) => (
                  <td key={colIdx} className="px-2 py-2 text-slate-600 text-right border-r italic text-xs">
                    TBD
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-xs text-slate-500 mt-3">
          <strong>Allocation method:</strong> Based on each jurisdiction's share of regional employment,
          existing housing problems, and projected job growth.
        </p>
      </Card>

      {/* Output Table 4: Supportive, Accessible and Visitable Housing */}
      <Card title="Output Table 4: Supportive, Accessible and Visitable Housing Needs" highlight className="mb-8">
        <p className="text-sm text-slate-600 mb-4">
          Estimates specialized housing needs for populations requiring supportive services or accessible design features.
        </p>

        <div className="space-y-6">
          {/* Table 4A: Supportive Housing */}
          <div>
            <h4 className="text-sm font-semibold text-slate-800 mb-3">Table 4A: Estimated Current Supportive Housing Needs</h4>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-200 border border-slate-300">
                <thead className="bg-slate-100">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700 border-r w-2/3">
                      Category
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-semibold text-slate-700">
                      Total Estimated Units Needed
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  <tr className="bg-slate-50">
                    <td className="px-4 py-2 text-sm text-slate-700 border-r">
                      Supportive Housing Units (in addition to Catch-Up/Keep-Up needs)
                    </td>
                    <td className="px-4 py-2 text-sm text-slate-500 text-right italic">TBD</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-xs text-slate-500 mt-2">
              <strong>Note:</strong> Supportive housing serves populations experiencing homelessness, substance use disorders,
              mental health conditions, or other special needs requiring wrap-around services.
            </p>
          </div>

          {/* Table 4B: Accessible and Visitable Housing */}
          <div>
            <h4 className="text-sm font-semibold text-slate-800 mb-3">Table 4B: Estimated Accessible and Visitable Housing Needs</h4>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-200 border border-slate-300">
                <thead className="bg-slate-100">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700 border-r w-2/3">
                      Category
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-semibold text-slate-700">
                      Total Estimated Units Needed
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  <tr className="bg-slate-50">
                    <td className="px-4 py-2 text-sm text-slate-700 border-r">
                      Accessible/Visitable Units (subset of Catch-Up/Keep-Up needs)
                    </td>
                    <td className="px-4 py-2 text-sm text-slate-500 text-right italic">TBD</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-xs text-slate-500 mt-2">
              <strong>Note:</strong> Accessible housing meets ADA standards; visitable housing has zero-step entries,
              wide doorways, and accessible bathrooms for people with mobility limitations.
            </p>
          </div>
        </div>
      </Card>

      {/* Next Steps */}
      <Card title="Implementation & Next Steps" className="bg-slate-50">
        <ul className="space-y-2 text-slate-700">
          <li className="flex items-start">
            <span className="text-blue-600 font-bold mr-2">1.</span>
            <span>
              <strong>Complete Catch-Up Calculations:</strong> Analyze cost burden, overcrowding, and housing quality
              data to quantify existing housing shortages by AMI category.
            </span>
          </li>
          <li className="flex items-start">
            <span className="text-green-600 font-bold mr-2">2.</span>
            <span>
              <strong>Complete Keep-Up Projections:</strong> Use job projections, wage data, and household formation
              rates to estimate 10-year housing needs.
            </span>
          </li>
          <li className="flex items-start">
            <span className="text-amber-600 font-bold mr-2">3.</span>
            <span>
              <strong>Allocate Needs Across Jurisdictions:</strong> Distribute regional needs to each county based
              on employment shares and local housing market conditions.
            </span>
          </li>
          <li className="flex items-start">
            <span className="text-purple-600 font-bold mr-2">4.</span>
            <span>
              <strong>Estimate Special Needs Housing:</strong> Calculate supportive and accessible housing requirements
              based on population demographics and disability prevalence data.
            </span>
          </li>
        </ul>
      </Card>
    </Section>
  );
}
