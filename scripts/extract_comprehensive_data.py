#!/usr/bin/env python3
"""
Extract comprehensive data from County Data Tables Excel files
including wages, projections, age distribution, commuting, and housing quality.

This script extracts all missing data identified in the comprehensive audit
to complete the Region 9 HNA Dashboard.
"""

import pandas as pd
import json
from pathlib import Path
from typing import Dict, List, Any

# Base paths
DATA_DIR = Path("/Users/sarah/Documents/Western Spaces/Claude/HNA-technical/data")
OUTPUT_DIR = Path("/Users/sarah/Documents/Western Spaces/Claude/HNA-technical/region9-hna-dashboard/lib/data")

# County files
COUNTIES = [
    "Archuleta County",
    "Dolores County",
    "La Plata County",
    "Montezuma County",
    "San Juan County"
]

def clean_currency(value):
    """Convert currency strings like '$63,934' to numbers"""
    if pd.isna(value):
        return None
    if isinstance(value, str):
        # Remove $, commas, and convert to float
        cleaned = value.replace('$', '').replace(',', '').strip()
        try:
            return float(cleaned)
        except:
            return None
    return float(value) if isinstance(value, (int, float)) else None

def clean_number(value):
    """Convert number strings with commas to numbers"""
    if pd.isna(value):
        return None
    if isinstance(value, str):
        cleaned = value.replace(',', '').strip()
        try:
            return float(cleaned)
        except:
            return None
    return float(value) if isinstance(value, (int, float)) else None

# ============================================================================
# ECONOMIC DATA EXTRACTION
# ============================================================================

def extract_wages_by_sector(county_name: str) -> List[Dict[str, Any]]:
    """Extract wages by sector from SDO Jobs and Wage sheet"""
    file_path = DATA_DIR / f"{county_name} County Data Tables.xlsx"

    try:
        df = pd.read_excel(file_path, sheet_name='SDO Jobs and Wage', header=4)

        # Get all sector rows (excluding totals if present)
        sectors = []

        for idx, row in df.iterrows():
            sector_name = row.get('SECTOR NAME', '')
            if pd.isna(sector_name) or 'Total' in str(sector_name):
                continue

            sector_data = {
                'sectorId': row.get('SECTOR ID'),
                'sectorName': sector_name,
                'wage2023': clean_currency(row.get('2023')),
                'wage2022': clean_currency(row.get('2022')),
                'wage2021': clean_currency(row.get('2021')),
                'wage2020': clean_currency(row.get('2020')),
                'wage2019': clean_currency(row.get('2019')),
            }

            if sector_data['wage2023'] is not None:
                sectors.append(sector_data)

        return sectors
    except Exception as e:
        print(f"Warning: Could not extract wage data for {county_name}: {e}")
        return []

def extract_job_projections(county_name: str) -> List[Dict[str, Any]]:
    """Extract job projections by sector from SDO Job Projections sheet"""
    file_path = DATA_DIR / f"{county_name} County Data Tables.xlsx"

    try:
        df = pd.read_excel(file_path, sheet_name='SDO Job Projections', header=4)

        sectors = []

        for idx, row in df.iterrows():
            sector_name = row.get('SECTOR NAME', '')
            if pd.isna(sector_name) or 'Total' in str(sector_name):
                continue

            # Get projections for 2024-2033
            projections = {}
            for year in range(2024, 2034):
                value = clean_number(row.get(str(year)))
                if value is not None:
                    projections[str(year)] = int(value)
                else:
                    projections[str(year)] = None

            sector_data = {
                'sectorId': row.get('SECTOR ID'),
                'sectorName': sector_name,
                'projections': projections
            }

            sectors.append(sector_data)

        return sectors
    except Exception as e:
        print(f"Warning: Could not extract job projections for {county_name}: {e}")
        return []

# ============================================================================
# DEMOGRAPHIC DATA EXTRACTION
# ============================================================================

def extract_age_distribution(county_name: str) -> Dict[str, Any]:
    """Extract age distribution time-series from SDO Age Distribution sheet"""
    file_path = DATA_DIR / f"{county_name} County Data Tables.xlsx"

    try:
        df = pd.read_excel(file_path, sheet_name='SDO Age Distribution', header=4)

        # Age cohorts: 0-17, 18-24, 25-44, 45-64, 65-74, 75+
        age_cohorts = {
            '0-17': {},
            '18-24': {},
            '25-44': {},
            '45-64': {},
            '65-74': {},
            '75+': {}
        }

        # Find rows for each cohort
        for idx, row in df.iterrows():
            age_label = str(row.get('AGE', '')).strip()

            # Map age labels to cohort keys
            cohort_key = None
            if '0 to 17' in age_label or '0-17' in age_label:
                cohort_key = '0-17'
            elif '18 to 24' in age_label or '18-24' in age_label:
                cohort_key = '18-24'
            elif '25 to 44' in age_label or '25-44' in age_label:
                cohort_key = '25-44'
            elif '45 to 64' in age_label or '45-64' in age_label:
                cohort_key = '45-64'
            elif '65 to 74' in age_label or '65-74' in age_label:
                cohort_key = '65-74'
            elif '75 plus' in age_label.lower() or '75+' in age_label:
                cohort_key = '75+'

            if cohort_key:
                # Extract data for years 2013-2033
                for year in range(2013, 2034):
                    value = clean_number(row.get(str(year)))
                    age_cohorts[cohort_key][str(year)] = int(value) if value is not None else None

        return age_cohorts
    except Exception as e:
        print(f"Warning: Could not extract age distribution for {county_name}: {e}")
        return {}

# ============================================================================
# COMMUTING DATA EXTRACTION
# ============================================================================

def extract_commute_county(county_name: str) -> List[Dict[str, Any]]:
    """Extract where residents work (county level) from ACS Commute County"""
    file_path = DATA_DIR / f"{county_name} County Data Tables.xlsx"

    try:
        df = pd.read_excel(file_path, sheet_name='ACS Commute County', header=4)

        commute_data = []

        for idx, row in df.iterrows():
            work_location = row.get('NAME', '')
            if pd.isna(work_location):
                continue

            workers = clean_number(row.get('Workers'))
            if workers and workers > 0:
                commute_data.append({
                    'workLocation': work_location,
                    'workers': int(workers),
                    'percentage': clean_number(row.get('Percent'))
                })

        # Sort by workers descending
        commute_data.sort(key=lambda x: x['workers'], reverse=True)

        return commute_data
    except Exception as e:
        print(f"Warning: Could not extract commute county data for {county_name}: {e}")
        return []

# ============================================================================
# HOUSING QUALITY DATA EXTRACTION
# ============================================================================

def extract_year_built(county_name: str) -> Dict[str, Any]:
    """Extract housing by year built from ACS Tenure by Year Built"""
    file_path = DATA_DIR / f"{county_name} County Data Tables.xlsx"

    try:
        df = pd.read_excel(file_path, sheet_name='ACS Tenure by Year Built', header=4)

        year_built_data = {
            'owner': {},
            'renter': {},
            'total': {}
        }

        for idx, row in df.iterrows():
            period = row.get('YEAR BUILT', '')
            if pd.isna(period):
                continue

            year_built_data['owner'][period] = clean_number(row.get('Owner Occupied'))
            year_built_data['renter'][period] = clean_number(row.get('Renter Occupied'))
            year_built_data['total'][period] = clean_number(row.get('Total'))

        return year_built_data
    except Exception as e:
        print(f"Warning: Could not extract year built data for {county_name}: {e}")
        return {}

def extract_overcrowding(county_name: str) -> Dict[str, Any]:
    """Extract overcrowding rates from ACS Tenure by Overcrowding"""
    file_path = DATA_DIR / f"{county_name} County Data Tables.xlsx"

    try:
        df = pd.read_excel(file_path, sheet_name='ACS Tenure by Overcrowding', header=4)

        overcrowding_data = {}

        for idx, row in df.iterrows():
            category = row.get('OCCUPANTS PER ROOM', '')
            if pd.isna(category):
                continue

            overcrowding_data[category] = {
                'owner': clean_number(row.get('Owner Occupied')),
                'renter': clean_number(row.get('Renter Occupied')),
                'total': clean_number(row.get('Total'))
            }

        return overcrowding_data
    except Exception as e:
        print(f"Warning: Could not extract overcrowding data for {county_name}: {e}")
        return {}

def extract_unit_types(county_name: str) -> Dict[str, Any]:
    """Extract unit types from ACS Tenure by Units"""
    file_path = DATA_DIR / f"{county_name} County Data Tables.xlsx"

    try:
        df = pd.read_excel(file_path, sheet_name='ACS Tenure by Units', header=4)

        unit_types = {}

        for idx, row in df.iterrows():
            unit_type = row.get('UNITS IN STRUCTURE', '')
            if pd.isna(unit_type):
                continue

            unit_types[unit_type] = {
                'owner': clean_number(row.get('Owner Occupied')),
                'renter': clean_number(row.get('Renter Occupied')),
                'total': clean_number(row.get('Total'))
            }

        return unit_types
    except Exception as e:
        print(f"Warning: Could not extract unit types for {county_name}: {e}")
        return {}

# ============================================================================
# INCOME & AFFORDABILITY DATA EXTRACTION
# ============================================================================

def extract_income_categories(county_name: str) -> Dict[str, Any]:
    """Extract income distribution from ACS Income Categories"""
    file_path = DATA_DIR / f"{county_name} County Data Tables.xlsx"

    try:
        df = pd.read_excel(file_path, sheet_name='ACS Income Categories', header=4)

        # Multiple time periods available
        income_data = {}

        for idx, row in df.iterrows():
            income_bracket = row.get('HOUSEHOLD INCOME', '')
            if pd.isna(income_bracket):
                continue

            # Extract for available periods (columns vary by file)
            income_data[income_bracket] = {}
            for col in df.columns:
                if col not in ['HOUSEHOLD INCOME', 'Unnamed: 0']:
                    value = clean_number(row.get(col))
                    if value is not None:
                        income_data[income_bracket][col] = int(value)

        return income_data
    except Exception as e:
        print(f"Warning: Could not extract income categories for {county_name}: {e}")
        return {}

# ============================================================================
# MAIN EXTRACTION FUNCTION
# ============================================================================

def extract_all_county_data(county_name: str) -> Dict[str, Any]:
    """Extract all comprehensive data for a county"""
    print(f"\nExtracting comprehensive data for {county_name}...")

    return {
        "county": county_name,
        "wagesBySector": extract_wages_by_sector(county_name),
        "jobProjections": extract_job_projections(county_name),
        "ageDistribution": extract_age_distribution(county_name),
        "commuteCounty": extract_commute_county(county_name),
        "yearBuilt": extract_year_built(county_name),
        "overcrowding": extract_overcrowding(county_name),
        "unitTypes": extract_unit_types(county_name),
        "incomeCategories": extract_income_categories(county_name)
    }

def generate_typescript_file(all_data: List[Dict[str, Any]]):
    """Generate TypeScript file with comprehensive data"""

    output_file = OUTPUT_DIR / "region9-comprehensive.ts"

    with open(output_file, 'w') as f:
        f.write("""/**
 * Region 9 Comprehensive Data
 *
 * Contains comprehensive data including:
 * - Wages by sector
 * - Job projections by sector
 * - Age distribution time-series
 * - Commuting patterns
 * - Housing quality indicators (year built, overcrowding, unit types)
 * - Income distribution trends
 *
 * Generated automatically from County Data Tables Excel files
 * Generation Date: November 2024
 * Vintage: SDO 2023, ACS 2019-2023
 */

export interface WageBySector {
  sectorId: number | string;
  sectorName: string;
  wage2023: number | null;
  wage2022: number | null;
  wage2021: number | null;
  wage2020: number | null;
  wage2019: number | null;
}

export interface JobProjectionBySector {
  sectorId: number | string;
  sectorName: string;
  projections: { [year: string]: number | null };
}

export interface AgeDistribution {
  '0-17': { [year: string]: number | null };
  '18-24': { [year: string]: number | null };
  '25-44': { [year: string]: number | null };
  '45-64': { [year: string]: number | null };
  '65-74': { [year: string]: number | null };
  '75+': { [year: string]: number | null };
}

export interface CommuteData {
  workLocation: string;
  workers: number;
  percentage: number | null;
}

export interface CountyComprehensiveData {
  county: string;
  wagesBySector: WageBySector[];
  jobProjections: JobProjectionBySector[];
  ageDistribution: AgeDistribution;
  commuteCounty: CommuteData[];
  yearBuilt: any;
  overcrowding: any;
  unitTypes: any;
  incomeCategories: any;
}

export const REGION_9_COMPREHENSIVE_DATA: CountyComprehensiveData[] =
""")

        # Write the data as JSON
        f.write(json.dumps(all_data, indent=2))
        f.write(";\n")

    print(f"\n✓ Generated TypeScript file: {output_file}")

def main():
    """Main extraction process"""
    print("=" * 70)
    print("Region 9 Comprehensive Data Extraction")
    print("=" * 70)

    all_county_data = []

    for county in COUNTIES:
        data = extract_all_county_data(county)
        all_county_data.append(data)
        print(f"  ✓ {county} data extracted")

    print("\nGenerating TypeScript output file...")
    generate_typescript_file(all_county_data)

    print("\n" + "=" * 70)
    print("Extraction complete!")
    print("=" * 70)
    print(f"\nExtracted comprehensive data for {len(COUNTIES)} counties")
    print(f"Output: lib/data/region9-comprehensive.ts")

if __name__ == "__main__":
    main()
