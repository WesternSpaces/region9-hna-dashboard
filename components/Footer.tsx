export function Footer() {
  return (
    <footer className="bg-slate-900 text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-bold mb-4">About This Dashboard</h3>
            <p className="text-slate-300 text-sm">
              Regional Housing Needs Assessment tool for Region 9 Economic Development District,
              compliant with Colorado SB24-174 requirements.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Data Sources</h3>
            <ul className="text-slate-300 text-sm space-y-2">
              <li>• Colorado State Demography Office (SDO)</li>
              <li>• American Community Survey (ACS)</li>
              <li>• HUD CHAS Data</li>
              <li>• Bureau of Labor Statistics (BLS)</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Contact</h3>
            <p className="text-slate-300 text-sm mb-2">
              <strong>Sarah Brown McClain</strong><br/>
              Western Spaces<br/>
              <a href="mailto:sarah@westernspaces.org" className="text-blue-400 hover:text-blue-300 underline">
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
