import { CountySelector } from './CountySelector';

interface NavigationProps {
  selectedCounty: string | null;
  onCountyChange: (county: string | null) => void;
}

export function Navigation({ selectedCounty, onCountyChange }: NavigationProps) {
  const navItems = [
    { label: 'Overview', href: '#overview' },
    { label: 'Demographics', href: '#demographics' },
    { label: 'Economics', href: '#economics' },
    { label: 'Housing Inventory', href: '#inventory' },
    { label: 'Market Trends', href: '#market' },
    { label: 'Housing Problems', href: '#problems' },
    { label: 'Commuting', href: '#commuting' },
    { label: 'Housing Quality', href: '#housing-quality' },
    { label: 'Housing Needs', href: '#needs' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          <div className="flex-shrink-0">
            <h1 className="text-xl font-bold text-slate-900">
              Region 9 HNA Dashboard
            </h1>
          </div>
          <div className="flex items-center gap-6">
            <CountySelector
              selectedCounty={selectedCounty}
              onCountyChange={onCountyChange}
            />
            <div className="hidden lg:block">
              <div className="flex items-baseline space-x-8">
                {navItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="text-sm font-medium text-slate-700 hover:text-slate-900 transition-colors"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
