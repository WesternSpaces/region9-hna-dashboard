#!/usr/bin/env python3
"""
Extract historical time-series data from County Data Tables Excel files
and generate TypeScript constants for the Region 9 HNA Dashboard.

This script reads SDO historical data (2013-2033) for population, households,
and jobs from all 5 Region 9 counties and outputs a TypeScript file with
complete time-series data.
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

def extract_population_data(county_name: str) -> Dict[str, Any]:
    """Extract population historical data from SDO Population sheet"""
    file_path = DATA_DIR / f"{county_name} County Data Tables.xlsx"

    # Read population data (header at row 4, data starts at row 5)
    df = pd.read_excel(file_path, sheet_name='SDO Population', header=4)

    # Get the county total row (first data row)
    county_row = df.iloc[0]

    # Extract years 2013-2033
    years = [str(year) for year in range(2013, 2034)]
    population_data = {}

    for year in years:
        try:
            value = county_row[year]
            # Clean comma-separated values
            if isinstance(value, str):
                value = value.replace(',', '')
            population_data[year] = int(float(value)) if pd.notna(value) else None
        except:
            population_data[year] = None

    return population_data

def extract_household_data(county_name: str) -> Dict[str, Any]:
    """Extract household historical data from SDO Household Estimate"""
    file_path = DATA_DIR / f"{county_name} County Data Tables.xlsx"

    try:
        # Read household estimate data (header at row 4)
        df = pd.read_excel(file_path, sheet_name='SDO Household Estimate', header=4)

        # Get the county total row
        county_row = df.iloc[0]

        # Extract years 2013-2023 (estimates)
        years = [str(year) for year in range(2013, 2024)]
        household_data = {}

        for year in years:
            try:
                value = county_row[year]
                # Clean comma-separated values
                if isinstance(value, str):
                    value = value.replace(',', '')
                household_data[year] = int(float(value)) if pd.notna(value) else None
            except:
                household_data[year] = None

        return household_data
    except Exception as e:
        print(f"Warning: Could not extract household data for {county_name}: {e}")
        return {}

def extract_household_projections(county_name: str) -> Dict[str, Any]:
    """Extract household projection data from SDO Household Projections"""
    file_path = DATA_DIR / f"{county_name} County Data Tables.xlsx"

    try:
        df = pd.read_excel(file_path, sheet_name='SDO Household Projections', header=4)
        county_row = df.iloc[0]

        # Extract years 2024-2033 (projections)
        years = [str(year) for year in range(2024, 2034)]
        projection_data = {}

        for year in years:
            try:
                value = county_row[year]
                # Clean comma-separated values
                if isinstance(value, str):
                    value = value.replace(',', '')
                projection_data[year] = int(float(value)) if pd.notna(value) else None
            except:
                projection_data[year] = None

        return projection_data
    except Exception as e:
        print(f"Warning: Could not extract household projections for {county_name}: {e}")
        return {}

def extract_jobs_data(county_name: str) -> Dict[str, Any]:
    """Extract jobs historical data from SDO Jobs by Sector Estimates"""
    file_path = DATA_DIR / f"{county_name} County Data Tables.xlsx"

    try:
        df = pd.read_excel(file_path, sheet_name='SDO Jobs by Sector Estimates', header=4)

        # Find the total jobs row
        total_row = df[df['NAME'].str.contains('Total', na=False)].iloc[0]

        # Extract years 2013-2023
        years = [str(year) for year in range(2013, 2024)]
        jobs_data = {}

        for year in years:
            try:
                value = total_row[year]
                # Clean comma-separated values
                if isinstance(value, str):
                    value = value.replace(',', '')
                jobs_data[year] = int(float(value)) if pd.notna(value) else None
            except:
                jobs_data[year] = None

        return jobs_data
    except Exception as e:
        print(f"Warning: Could not extract jobs data for {county_name}: {e}")
        return {}

def extract_all_county_data(county_name: str) -> Dict[str, Any]:
    """Extract all historical time-series data for a county"""
    print(f"Extracting data for {county_name}...")

    population = extract_population_data(county_name)
    households_estimate = extract_household_data(county_name)
    households_projection = extract_household_projections(county_name)
    jobs = extract_jobs_data(county_name)

    # Merge household estimates and projections
    households = {**households_estimate, **households_projection}

    return {
        "county": county_name,
        "population": population,
        "households": households,
        "jobs": jobs
    }

def generate_typescript_file(all_data: List[Dict[str, Any]]):
    """Generate TypeScript file with historical time-series data"""

    output_file = OUTPUT_DIR / "region9-historical.ts"

    with open(output_file, 'w') as f:
        f.write("""/**
 * Region 9 Historical Time-Series Data
 *
 * Contains historical data (2013-2033) for population, households, and jobs
 * from Colorado State Demography Office (SDO).
 *
 * Generated automatically from County Data Tables Excel files
 * Generation Date: November 2024
 * Vintage: SDO 2023
 */

export interface TimeSeriesData {
  [year: string]: number | null;
}

export interface CountyHistoricalData {
  county: string;
  population: TimeSeriesData; // 2013-2033
  households: TimeSeriesData; // 2013-2033
  jobs: TimeSeriesData; // 2013-2023
}

export const REGION_9_HISTORICAL_DATA: CountyHistoricalData[] = [
""")

        for i, county_data in enumerate(all_data):
            f.write(f"""  {{
    county: "{county_data['county']}",
    population: {json.dumps(county_data['population'], indent=6)},
    households: {json.dumps(county_data['households'], indent=6)},
    jobs: {json.dumps(county_data['jobs'], indent=6)}
  }}{"," if i < len(all_data) - 1 else ""}
""")

        f.write("];\n")

    print(f"\nGenerated TypeScript file: {output_file}")

def main():
    """Main extraction process"""
    print("=" * 60)
    print("Region 9 Historical Data Extraction")
    print("=" * 60)

    all_county_data = []

    for county in COUNTIES:
        data = extract_all_county_data(county)
        all_county_data.append(data)
        print(f"✓ {county} data extracted")

    print("\nGenerating TypeScript output file...")
    generate_typescript_file(all_county_data)

    print("\n" + "=" * 60)
    print("Extraction complete!")
    print("=" * 60)
    print(f"\nExtracted historical data for {len(COUNTIES)} counties:")
    for county in COUNTIES:
        print(f"  - {county}")
    print(f"\nOutput: lib/data/region9-historical.ts")

if __name__ == "__main__":
    main()
