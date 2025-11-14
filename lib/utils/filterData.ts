import { REGION_9_COUNTIES_DATA, type Region9CountyData } from '../data/region9-constants';

/**
 * Filter county data based on selected county
 * @param selectedCounty - County name to filter by, or null for all counties
 * @returns Filtered array of county data
 */
export function filterCountyData(selectedCounty: string | null): Region9CountyData[] {
  if (!selectedCounty) {
    return REGION_9_COUNTIES_DATA;
  }

  return REGION_9_COUNTIES_DATA.filter(county => county.county === selectedCounty);
}

/**
 * Get display name for current filter
 * @param selectedCounty - County name or null
 * @returns Display string
 */
export function getFilterDisplayName(selectedCounty: string | null): string {
  return selectedCounty || 'All Region 9 Counties';
}
