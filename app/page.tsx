'use client';

import { useState } from 'react';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Hero } from '@/components/sections/Hero';
import { DemographicTrends } from '@/components/sections/DemographicTrends';
import { EconomicTrends } from '@/components/sections/EconomicTrends';
import { HousingInventory } from '@/components/sections/HousingInventory';
import { HousingMarketTrends } from '@/components/sections/HousingMarketTrends';
import { HousingProblems } from '@/components/sections/HousingProblems';
import { CommutingAnalysis } from '@/components/sections/CommutingAnalysis';
import { HousingQuality } from '@/components/sections/HousingQuality';
import { HousingNeeds } from '@/components/sections/HousingNeeds';

export default function Home() {
  const [selectedCounty, setSelectedCounty] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      <Navigation
        selectedCounty={selectedCounty}
        onCountyChange={setSelectedCounty}
      />
      <Hero selectedCounty={selectedCounty} />
      <DemographicTrends selectedCounty={selectedCounty} />
      <EconomicTrends selectedCounty={selectedCounty} />
      <HousingInventory selectedCounty={selectedCounty} />
      <HousingMarketTrends selectedCounty={selectedCounty} />
      <HousingProblems selectedCounty={selectedCounty} />
      <CommutingAnalysis selectedCounty={selectedCounty} />
      <HousingQuality selectedCounty={selectedCounty} />
      <HousingNeeds selectedCounty={selectedCounty} />
      <Footer />
    </div>
  );
}
