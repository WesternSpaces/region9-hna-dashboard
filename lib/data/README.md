# Region 9 County Data - HNA Dashboard

## Overview

This directory contains comprehensive housing needs assessment (HNA) data for all 5 counties in Region 9:

- Archuleta County
- Dolores County
- La Plata County
- Montezuma County
- San Juan County

## Files

### `region9-constants.ts`

TypeScript constants file containing complete county-level and regional data for the HNA dashboard. This is the primary data source for the application.

**Key exports:**

- `Region9CountyData` - TypeScript interface defining county data structure
- `REGION_9_COUNTIES_DATA` - Array of data for all 5 counties
- `REGION_9_AGGREGATE_STATS` - Regional totals and averages
- `DATA_METADATA` - Data sources, vintages, and quality notes
- Helper functions for data analysis

### `region9-extracted.json`

Raw JSON data extracted from Excel files. This is used as a backup and for reference.

## Data Sources

All data extracted from official county data tables (Nov 2025):

| Source | Period       | Data Type                                              |
| ------ | ------------ | ------------------------------------------------------ |
| SDO    | 2023         | Population, Households, Jobs, Labor Force              |
| ACS    | 2019-2023    | Housing inventory, tenure, costs, income, demographics |
| CHAS   | 2017-2021    | AMI (Area Median Income) distribution                  |
| BLS    | Latest       | Unemployment rates (partial)                           |

## Usage Examples

### Import the data

```typescript
import {
  REGION_9_COUNTIES_DATA,
  REGION_9_AGGREGATE_STATS,
  getCountyData,
  getLowIncomeHouseholds,
  getAffordabilityGapPercent,
} from "@/lib/data/region9-constants";
```

### Get data for a specific county

```typescript
const archuleta = getCountyData("Archuleta County");

console.log(`Population: ${archuleta.population2023.toLocaleString()}`);
console.log(`Median Income: $${archuleta.medianIncome.toLocaleString()}`);
console.log(`Vacancy Rate: ${archuleta.vacancyRate}%`);
```

### Display regional statistics

```typescript
const stats = REGION_9_AGGREGATE_STATS;

console.log(`Total Population: ${stats.totalPopulation2023.toLocaleString()}`);
console.log(`Regional Vacancy Rate: ${stats.regionalVacancyRate}%`);
console.log(
  `Low-Income Households: ${stats.lowIncomeHouseholds.toLocaleString()}`
);
```

### Calculate affordability metrics

```typescript
const lowIncome = getLowIncomeHouseholds("La Plata County");
const gapPercent = getAffordabilityGapPercent("La Plata County");

console.log(`Low-income households (≤80% AMI): ${lowIncome.toLocaleString()}`);
console.log(`Affordability gap: ${gapPercent}%`);
```

### Compare counties

```typescript
REGION_9_COUNTIES_DATA.forEach((county) => {
  console.log(`${county.county}:`);
  console.log(`  Median Home Value: $${county.medianHomeValue.toLocaleString()}`);
  console.log(`  Median Rent: $${county.medianGrossRent.toLocaleString()}`);
  console.log(
    `  Cost Burden Rate (Renters): ${county.renterCostBurdenRate}%`
  );
});
```

### Filter and analyze AMI distribution

```typescript
const laPlata = getCountyData("La Plata County");

const totalAMI =
  laPlata.ami.veryLow30 +
  laPlata.ami.veryLow50 +
  laPlata.ami.low80 +
  laPlata.ami.moderate120 +
  laPlata.ami.middle140 +
  laPlata.ami.upper140Plus;

console.log("AMI Distribution for La Plata County:");
console.log(`  ≤30% AMI: ${laPlata.ami.veryLow30} households`);
console.log(`  31-50% AMI: ${laPlata.ami.veryLow50} households`);
console.log(`  51-80% AMI: ${laPlata.ami.low80} households`);
console.log(
  `  Low-income (≤80%): ${((laPlata.ami.veryLow30 + laPlata.ami.veryLow50 + laPlata.ami.low80) / totalAMI * 100).toFixed(1)}%`
);
```

## Data Structure

Each county object contains:

### Section A: Demographics

- `population2023` - Current population
- `population2033Projection` - Projected population
- `households2023` - Current households
- `households2033Projection` - Projected households
- `avgHouseholdSize` - Average household size

### Section B: Economics

- `jobs2023` - Current jobs
- `medianIncome` - Median household income
- `unemploymentRate` - Unemployment percentage
- `laborForceParticipationRate` - Labor force participation

### Section C: Housing Inventory

- `totalHousingUnits` - Total housing units
- `occupiedUnits` - Occupied units
- `vacantUnits` - Vacant units
- `vacancyRate` - Vacancy percentage
- `ownerOccupied` - Owner-occupied units
- `renterOccupied` - Renter-occupied units
- `seasonalRecreational` - Seasonal/recreational units

### Section D: Housing Market

- `medianHomeValue` - Median home value
- `medianGrossRent` - Median gross rent

### Section E: Housing Problems

- `costBurdened30Plus` - Households paying 30%+ for housing
- `costBurdened50Plus` - Households paying 50%+ for housing
- `ownerCostBurdenRate` - Owner cost burden percentage
- `renterCostBurdenRate` - Renter cost burden percentage

### AMI Distribution

- `ami.veryLow30` - Households ≤30% AMI
- `ami.veryLow50` - Households 31-50% AMI
- `ami.low80` - Households 51-80% AMI
- `ami.moderate120` - Households 81-120% AMI
- `ami.middle140` - Households 121-140% AMI
- `ami.upper140Plus` - Households >140% AMI

## Data Quality Notes

### Complete Data

- Population, households, housing inventory, market data for all counties
- AMI distribution for all counties
- Cost burden data for all counties

### Partial Data

- Jobs data missing for Dolores and San Juan counties (small population)
- Household projections (2033) not available
- Jobs projections (2033) not available
- Unemployment rates not extracted

### Data Considerations

- **High vacancy rates** in Archuleta (39.2%) and San Juan (49.7%) are driven by seasonal/recreational units
- **CHAS AMI data** (2017-2021) is 2 years older than ACS data (2019-2023)
- **Weighted averages** used for regional statistics where appropriate

## Key Regional Insights

### Demographics

- **Total Population**: 100,318 (2023)
- **Population Growth**: 3.7% projected by 2033
- **Total Households**: 42,741

### Housing Inventory

- **Total Units**: 52,997
- **Regional Vacancy Rate**: 21.5%
- **Ownership Rate**: 73.2%
- **Seasonal Units**: 7,184 (13.6% of total)

### Affordability

- **Low-Income Households** (≤80% AMI): 16,558 (41.8%)
- **Regional Cost Burden Rate** (Renters): 26.3%
- **Regional Cost Burden Rate** (Owners): 12.7%

### Market

- **Median Home Value Range**: $231,900 - $549,100
- **Weighted Regional Home Value**: $456,920
- **Weighted Regional Rent**: $1,311/month

## Dashboard Integration

This data supports HNA Framework sections:

- **Section A**: Demographic Profile
- **Section B**: Economic Profile
- **Section C**: Housing Inventory
- **Section D**: Housing Market
- **Section E**: Housing Problems & Needs
- **Section H**: Housing Needs Projections (with calculations)

## Maintenance

To update this data:

1. Place new county Excel files in `/data/` directory
2. Run the extraction script (Python)
3. Verify data quality in `region9-extracted.json`
4. Update TypeScript constants if structure changes
5. Update this README with new vintage information

## Contact

For questions about data sources or methodology, refer to:

- SDO: https://demography.dola.colorado.gov/
- ACS: https://data.census.gov/
- CHAS: https://www.huduser.gov/portal/datasets/cp.html
