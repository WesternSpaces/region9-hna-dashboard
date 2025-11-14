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
    { label: 'Housing Needs', href: '#needs' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-lg border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Region 9 HNA Dashboard
            </h1>
          </div>
          <div className="flex items-center gap-6">
            <CountySelector
              selectedCounty={selectedCounty}
              onCountyChange={onCountyChange}
            />
            <div className="hidden lg:block">
              <div className="flex items-baseline space-x-2">
                {navItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="text-slate-700 hover:text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200"
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
