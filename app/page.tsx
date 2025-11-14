import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Hero } from '@/components/sections/Hero';
import { DemographicTrends } from '@/components/sections/DemographicTrends';
import { EconomicTrends } from '@/components/sections/EconomicTrends';
import { HousingInventory } from '@/components/sections/HousingInventory';
import { HousingMarketTrends } from '@/components/sections/HousingMarketTrends';
import { HousingProblems } from '@/components/sections/HousingProblems';
import { HousingNeeds } from '@/components/sections/HousingNeeds';

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation />
      <Hero />
      <DemographicTrends />
      <EconomicTrends />
      <HousingInventory />
      <HousingMarketTrends />
      <HousingProblems />
      <HousingNeeds />
      <Footer />
    </div>
  );
}
