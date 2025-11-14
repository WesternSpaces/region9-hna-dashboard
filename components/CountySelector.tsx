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
    <div className="flex items-center gap-3">
      <label htmlFor="county-select" className="text-sm font-semibold text-slate-700 hidden sm:block">
        Filter by County:
      </label>
      <select
        id="county-select"
        value={selectedCounty || 'all'}
        onChange={(e) => onCountyChange(e.target.value === 'all' ? null : e.target.value)}
        className="px-4 py-2.5 text-sm font-medium border-2 border-slate-200 rounded-lg bg-white text-slate-800 hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 cursor-pointer shadow-sm"
      >
        <option value="all">📍 All Counties (Region 9)</option>
        {counties.map(county => (
          <option key={county} value={county}>
            📌 {county}
          </option>
        ))}
      </select>
    </div>
  );
}
