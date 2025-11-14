# Region 9 Housing Needs Assessment Dashboard

A comprehensive, data-driven dashboard for Southwest Colorado's Region 9 Economic Development District, demonstrating automated Housing Needs Assessment (HNA) capabilities compliant with Colorado SB24-174 requirements.

## Overview

This interactive dashboard showcases how housing needs data from multiple sources (State Demography Office, American Community Survey, HUD CHAS) can be automatically integrated, analyzed, and visualized to support regional housing planning and policy decisions.

## The Region

**Region 9 Economic Development District** encompasses five counties in Southwest Colorado:

- **Archuleta County** (Pagosa Springs)
- **Dolores County**
- **La Plata County** (Durango - regional hub)
- **Montezuma County**
- **San Juan County**

**Total Population:** 100,318 (2023)
**Total Housing Units:** 52,997
**Regional Vacancy Rate:** 21.5% (driven by seasonal/recreational units)

## Dashboard Sections

### HNA Framework Compliance (SB24-174)

The dashboard implements Colorado's Housing Needs Assessment framework:

1. **Section A: Demographic Trends**
   - Population estimates and projections (2023-2033)
   - Household counts and growth
   - Age distribution analysis

2. **Section B: Economic Trends**
   - Jobs by sector and projections
   - Median income analysis
   - Labor force participation rates
   - Jobs-to-households ratios

3. **Section C: Housing Inventory**
   - Total housing units by county
   - Occupancy vs. vacancy analysis
   - Owner vs. renter tenure
   - Seasonal/recreational unit impacts

4. **Section D: Housing Market Trends**
   - Median home values and rents
   - Affordability gap analysis (home value-to-income ratios)
   - Market trends over time

5. **Section E: Housing Problems**
   - Cost burden analysis (30%+ and 50%+ of income)
   - Owner vs. renter disparities
   - Regional distribution patterns

6. **Section H: Housing Needs**
   - AMI (Area Median Income) distribution
   - Low-income housing needs (≤80% AMI)
   - Projected housing gaps (2023-2033)
   - Housing needs by income bracket

## Features

### Data Visualizations

- **24+ interactive Recharts visualizations** across 6 HNA framework sections
- **Responsive design** - optimized for desktop, tablet, and mobile
- **Color-coded affordability indicators** - green/yellow/orange/red thresholds
- **Detailed data tables** - comprehensive county comparisons
- **Real-time calculations** - housing gaps, affordability ratios, AMI distributions

### API Endpoints

Programmatic access to all Region 9 housing data:

**Get all counties:**
```
GET /api/counties
GET /api/counties?filter=highVacancy&sortBy=vacancy
GET /api/counties?filter=lowIncome
```

**Get specific county:**
```
GET /api/counties/archuleta
GET /api/counties/la-plata
```

**Get regional statistics:**
```
GET /api/regional-stats
```

## Key Findings

### Critical Housing Challenges:

1. **Severe Affordability Crisis**
   - All 5 counties exceed 3.0 home value-to-income ratio threshold
   - La Plata County: 6.44x (most severe)
   - Archuleta County: 5.90x

2. **Vacancy Paradox**
   - 21.5% regional vacancy rate (nearly 2x national average)
   - 7,184 seasonal/recreational units (unavailable to local workers)
   - San Juan County: 49.7% vacancy (83% seasonal units)

3. **Cost Burden Disparity**
   - Renters: 26.3% cost burdened
   - Owners: 12.7% cost burdened
   - Renters face 2x higher burden than owners

4. **Low-Income Housing Need**
   - 16,558 households (41.8%) earn ≤80% AMI
   - Significant affordable housing gap across all counties

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/WesternSpaces/region9-hna-dashboard.git
cd region9-hna-dashboard
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Building for Production

```bash
npm run build
npm start
```

## Project Structure

```
region9-hna-dashboard/
├── app/
│   ├── api/                    # REST API endpoints
│   │   ├── counties/           # County data API
│   │   └── regional-stats/     # Regional statistics API
│   ├── layout.tsx              # Root layout with metadata
│   ├── page.tsx                # Main page assembling all sections
│   └── globals.css             # Global styles
├── components/
│   ├── Navigation.tsx          # Sticky navigation header
│   ├── Footer.tsx              # Footer with sources and contact
│   ├── sections/               # HNA Framework sections
│   │   ├── Hero.tsx            # Hero with key regional stats
│   │   ├── DemographicTrends.tsx      # Section A
│   │   ├── EconomicTrends.tsx         # Section B
│   │   ├── HousingInventory.tsx       # Section C
│   │   ├── HousingMarketTrends.tsx    # Section D
│   │   ├── HousingProblems.tsx        # Section E
│   │   └── HousingNeeds.tsx           # Section H
│   └── ui/                     # Reusable UI components
│       ├── Section.tsx         # Section wrapper
│       ├── Card.tsx            # Card component
│       └── StatCard.tsx        # Statistics display card
├── lib/
│   └── data/
│       ├── region9-constants.ts     # All county data (TypeScript)
│       └── README.md                # Data documentation
└── docs/
    ├── hna-guidelines.md            # Full SB24-174 guidelines (Markdown)
    └── hna-framework-quick-ref.md   # Framework quick reference
```

## Data Sources

All data in this project comes from verified public sources:

- **Colorado State Demography Office (SDO)** - Population, household, and jobs estimates/projections (2023)
- **American Community Survey (ACS)** - 5-year estimates (2019-2023) for housing inventory, market data, cost burden
- **HUD CHAS Data** - Area Median Income (AMI) distribution (2017-2021)
- **Bureau of Labor Statistics (BLS)** - Unemployment rates

### Data Vintage

- Population/Households: SDO 2023
- Housing Inventory: ACS 2019-2023
- AMI Distribution: CHAS 2017-2021

## Technical Stack

- **Next.js 16** with App Router and Turbopack
- **TypeScript** for type safety
- **Tailwind CSS** for responsive design
- **Recharts** for interactive data visualizations
- **React 19** for modern component architecture

## Use Cases

This dashboard prototype demonstrates capabilities for:

1. **SB24-174 Compliance** - Automated generation of required HNA outputs
2. **Proposition 123 Petitions** - Supporting data for rural resort exemption requests
3. **Regional Planning** - Multi-jurisdiction housing needs coordination
4. **Policy Development** - Evidence-based decision making
5. **Public Education** - Transparent data visualization for community stakeholders
6. **Annual Updates** - Sustainable process for ongoing HNA maintenance

## Future Enhancements

Potential additions for production system:

- [ ] Export functionality (PDF reports, Excel tables)
- [ ] Interactive county comparison tools
- [ ] Scenario planning calculators (what-if analysis)
- [ ] User authentication for local data input
- [ ] Integration with live APIs (SDO, Census) for automatic updates
- [ ] Print-friendly CSS for report generation
- [ ] Admin interface for data overrides and local inputs
- [ ] Mobile app version
- [ ] Multi-language support

## Deployment

### Vercel (Recommended)

This project is optimized for deployment on Vercel:

1. Push your code to GitHub
2. Import the repository in Vercel
3. Vercel will automatically detect Next.js and configure build settings
4. Deploy!

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

### Other Platforms

This Next.js application can be deployed to any platform supporting Node.js:

- **Netlify**: Use the Next.js build plugin
- **AWS Amplify**: Configure as a Next.js SSR app
- **DigitalOcean App Platform**: Select Node.js environment

## Proposal Context

This dashboard serves as a **working prototype** demonstrating the technical approach proposed by Western Spaces for Region 9 EDD's HNA automation project. It showcases:

- **Automated data integration** from SDO Excel data bundles
- **Real-time calculation** of SB24-174 required outputs
- **Professional visualization** suitable for public agencies
- **Scalable architecture** ready to extend to all 15 Region 9 jurisdictions
- **API-first design** enabling future enhancements

**Estimated Value:** This prototype represents approximately $8-10K of development work, demonstrating commitment and technical capability for the full $50K enhanced scope proposal.

## Contact

**Sarah Brown McClain**
Western Spaces
[sarah@westernspaces.org](mailto:sarah@westernspaces.org)

For questions about the dashboard, data sources, or HNA automation capabilities.

---

**Note**: This is a prototype dashboard demonstrating automated HNA data processing capabilities. Data is current as of November 2024 (SDO 2024 vintage, ACS 2019-2023). While all data is sourced from verified public records, this resource is intended as a demonstration tool for the Region 9 proposal.
