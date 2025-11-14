'use client';

import { REGION_9_COUNTIES_DATA } from '@/lib/data/region9-constants';
import { useState } from 'react';

interface CountySelectorProps {
  onCountyChange: (county: string | null) => void;
  selectedCounty: string | null;
}

export function CountySelector({ onCountyChange, selectedCounty }: CountySelectorProps) {
  const counties = REGION_9_COUNTIES_DATA.map(c => c.county);

  return (
    <div className="flex items-center gap-2">
      <label htmlFor="county-select" className="text-sm font-medium text-slate-700">
        Filter by County:
      </label>
      <select
        id="county-select"
        value={selectedCounty || 'all'}
        onChange={(e) => onCountyChange(e.target.value === 'all' ? null : e.target.value)}
        className="px-3 py-1.5 text-sm border border-slate-300 rounded-md bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      >
        <option value="all">All Counties (Region 9)</option>
        {counties.map(county => (
          <option key={county} value={county}>
            {county}
          </option>
        ))}
      </select>
    </div>
  );
}
