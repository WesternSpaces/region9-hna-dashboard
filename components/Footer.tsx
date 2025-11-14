export function Footer() {
  return (
    <footer className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-16 px-4 sm:px-6 lg:px-8 mt-20">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          <div>
            <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
              About This Dashboard
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              Regional Housing Needs Assessment tool for Region 9 Economic Development District,
              compliant with Colorado SB24-174 requirements.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
              Data Sources
            </h3>
            <ul className="text-slate-300 text-sm space-y-2">
              <li className="flex items-center gap-2">
                <span className="text-blue-400">●</span> Colorado State Demography Office (SDO)
              </li>
              <li className="flex items-center gap-2">
                <span className="text-blue-400">●</span> American Community Survey (ACS)
              </li>
              <li className="flex items-center gap-2">
                <span className="text-blue-400">●</span> HUD CHAS Data
              </li>
              <li className="flex items-center gap-2">
                <span className="text-blue-400">●</span> Bureau of Labor Statistics (BLS)
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
              Contact
            </h3>
            <p className="text-slate-300 text-sm mb-2 leading-relaxed">
              <strong className="text-white">Sarah Brown McClain</strong><br/>
              Western Spaces<br/>
              <a href="mailto:sarah@westernspaces.org" className="text-blue-400 hover:text-blue-300 underline transition-colors">
                sarah@westernspaces.org
              </a>
            </p>
          </div>
        </div>

        <div className="border-t border-slate-700 pt-8">
          <div className="text-center text-sm text-slate-400">
            <p className="mb-2">
              Data current as of November 2024 (SDO 2024 vintage, ACS 2019-2023)
            </p>
            <p className="text-xs">
              This dashboard is a prototype demonstrating automated HNA data processing capabilities.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
