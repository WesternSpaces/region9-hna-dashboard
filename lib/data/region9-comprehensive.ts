/**
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
  sectorId: number | string | null;
  sectorName: string;
  wage2023: number | null;
  wage2022: number | null;
  wage2021: number | null;
  wage2020: number | null;
  wage2019: number | null;
}

export interface JobProjectionBySector {
  sectorId: number | string | null;
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
[
  {
    "county": "Archuleta County",
    "wagesBySector": [
      {
        "sectorId": "1",
        "sectorName": "Federal Government",
        "wage2023": 79023.0,
        "wage2022": 70471.0,
        "wage2021": 66066.0,
        "wage2020": 62232.0,
        "wage2019": 58158.0
      },
      {
        "sectorId": "11",
        "sectorName": "Agriculture, Forestry, Fishing and Hunting",
        "wage2023": 47451.0,
        "wage2022": 43891.0,
        "wage2021": 44152.0,
        "wage2020": 43029.0,
        "wage2019": 38358.0
      },
      {
        "sectorId": "2",
        "sectorName": "State Government",
        "wage2023": 60871.0,
        "wage2022": 60313.0,
        "wage2021": 55413.0,
        "wage2020": 49839.0,
        "wage2019": 54034.0
      },
      {
        "sectorId": "21",
        "sectorName": "Mining, Quarrying, and Oil and Gas Extraction",
        "wage2023": 59162.0,
        "wage2022": 50280.0,
        "wage2021": 49564.0,
        "wage2020": 41046.0,
        "wage2019": 38984.0
      },
      {
        "sectorId": "22",
        "sectorName": "Utilities",
        "wage2023": 93758.0,
        "wage2022": 105815.0,
        "wage2021": 96797.0,
        "wage2020": 102869.0,
        "wage2019": 86248.0
      },
      {
        "sectorId": "23",
        "sectorName": "Construction",
        "wage2023": 52742.0,
        "wage2022": 48403.0,
        "wage2021": 43270.0,
        "wage2020": 40657.0,
        "wage2019": 39448.0
      },
      {
        "sectorId": "3",
        "sectorName": "Local Government",
        "wage2023": 62640.0,
        "wage2022": 58713.0,
        "wage2021": 55963.0,
        "wage2020": 52824.0,
        "wage2019": 49860.0
      },
      {
        "sectorId": "31-33",
        "sectorName": "Manufacturing",
        "wage2023": 42233.0,
        "wage2022": 36029.0,
        "wage2021": 35120.0,
        "wage2020": 34270.0,
        "wage2019": 30909.0
      },
      {
        "sectorId": "42",
        "sectorName": "Wholesale Trade",
        "wage2023": 87755.0,
        "wage2022": 122265.0,
        "wage2021": 100623.0,
        "wage2020": 83803.0,
        "wage2019": 50330.0
      },
      {
        "sectorId": "44-45",
        "sectorName": "Retail Trade",
        "wage2023": 34386.0,
        "wage2022": 33269.0,
        "wage2021": 31069.0,
        "wage2020": 29317.0,
        "wage2019": 27946.0
      },
      {
        "sectorId": "48-49",
        "sectorName": "Transportation and Warehousing",
        "wage2023": 46925.0,
        "wage2022": 45799.0,
        "wage2021": 39935.0,
        "wage2020": 45206.0,
        "wage2019": 35725.0
      },
      {
        "sectorId": "51",
        "sectorName": "Information",
        "wage2023": 45839.0,
        "wage2022": 54309.0,
        "wage2021": 58487.0,
        "wage2020": 54890.0,
        "wage2019": 46111.0
      },
      {
        "sectorId": "52",
        "sectorName": "Finance and Insurance",
        "wage2023": 63317.0,
        "wage2022": 62376.0,
        "wage2021": 59949.0,
        "wage2020": 59349.0,
        "wage2019": 51442.0
      },
      {
        "sectorId": "53",
        "sectorName": "Real Estate and Rental and Leasing",
        "wage2023": 43376.0,
        "wage2022": 44765.0,
        "wage2021": 46531.0,
        "wage2020": 41524.0,
        "wage2019": 42583.0
      },
      {
        "sectorId": "54",
        "sectorName": "Professional, Scientific, and Technical Services",
        "wage2023": 87764.0,
        "wage2022": 64599.0,
        "wage2021": 55207.0,
        "wage2020": 74645.0,
        "wage2019": 74140.0
      },
      {
        "sectorId": "55",
        "sectorName": "Management of Companies and Enterprises",
        "wage2023": 126149.0,
        "wage2022": 102563.0,
        "wage2021": 89456.0,
        "wage2020": 92869.0,
        "wage2019": 88350.0
      },
      {
        "sectorId": "56",
        "sectorName": "Administrative and Support and Waste Management and Remediation Services",
        "wage2023": 35434.0,
        "wage2022": 34813.0,
        "wage2021": 29670.0,
        "wage2020": 27592.0,
        "wage2019": 26563.0
      },
      {
        "sectorId": "61",
        "sectorName": "Educational Services",
        "wage2023": 28064.0,
        "wage2022": 29399.0,
        "wage2021": 20248.0,
        "wage2020": 15911.0,
        "wage2019": 14094.0
      },
      {
        "sectorId": "62",
        "sectorName": "Health Care and Social Assistance",
        "wage2023": 41346.0,
        "wage2022": 38449.0,
        "wage2021": 36691.0,
        "wage2020": 34602.0,
        "wage2019": 32296.0
      },
      {
        "sectorId": "71",
        "sectorName": "Arts, Entertainment, and Recreation",
        "wage2023": 24702.0,
        "wage2022": 27233.0,
        "wage2021": 24227.0,
        "wage2020": 19815.0,
        "wage2019": 20357.0
      },
      {
        "sectorId": "72",
        "sectorName": "Accommodation and Food Services",
        "wage2023": 29845.0,
        "wage2022": 28479.0,
        "wage2021": 26910.0,
        "wage2020": 24311.0,
        "wage2019": 21855.0
      },
      {
        "sectorId": "81",
        "sectorName": "Other Services (except Public Administration)",
        "wage2023": 41994.0,
        "wage2022": 37829.0,
        "wage2021": 35255.0,
        "wage2020": 34009.0,
        "wage2019": 30474.0
      },
      {
        "sectorId": "99",
        "sectorName": "Unclassified",
        "wage2023": 26955.0,
        "wage2022": null,
        "wage2021": null,
        "wage2020": null,
        "wage2019": null
      }
    ],
    "jobProjections": [
      {
        "sectorId": null,
        "sectorName": "",
        "projections": {
          "2024": 7281,
          "2025": 7285,
          "2026": 7221,
          "2027": 7257,
          "2028": 7318,
          "2029": 7411,
          "2030": 7539,
          "2031": 7699,
          "2032": 7837,
          "2033": 7949
        }
      }
    ],
    "ageDistribution": {
      "0-17": {
        "2013": 2288,
        "2014": 2232,
        "2015": 2236,
        "2016": 2321,
        "2017": 2404,
        "2018": 2420,
        "2019": 2417,
        "2020": 2413,
        "2021": 2443,
        "2022": 2453,
        "2023": 2438,
        "2024": 2436,
        "2025": 2390,
        "2026": 2371,
        "2027": 2355,
        "2028": 2363,
        "2029": 2346,
        "2030": 2344,
        "2031": 2350,
        "2032": 2360,
        "2033": 2358
      },
      "18-24": {
        "2013": 698,
        "2014": 695,
        "2015": 691,
        "2016": 697,
        "2017": 697,
        "2018": 704,
        "2019": 676,
        "2020": 674,
        "2021": 673,
        "2022": 668,
        "2023": 694,
        "2024": 720,
        "2025": 704,
        "2026": 669,
        "2027": 634,
        "2028": 591,
        "2029": 588,
        "2030": 568,
        "2031": 575,
        "2032": 570,
        "2033": 581
      },
      "25-44": {
        "2013": 2262,
        "2014": 2232,
        "2015": 2265,
        "2016": 2367,
        "2017": 2489,
        "2018": 2596,
        "2019": 2655,
        "2020": 2759,
        "2021": 2931,
        "2022": 3043,
        "2023": 3120,
        "2024": 3003,
        "2025": 3055,
        "2026": 3123,
        "2027": 3173,
        "2028": 3238,
        "2029": 3326,
        "2030": 3413,
        "2031": 3416,
        "2032": 3458,
        "2033": 3516
      },
      "45-64": {
        "2013": 4161,
        "2014": 4002,
        "2015": 3914,
        "2016": 3952,
        "2017": 3951,
        "2018": 3936,
        "2019": 3871,
        "2020": 3845,
        "2021": 3786,
        "2022": 3656,
        "2023": 3542,
        "2024": 3407,
        "2025": 3356,
        "2026": 3259,
        "2027": 3200,
        "2028": 3183,
        "2029": 3129,
        "2030": 3111,
        "2031": 3213,
        "2032": 3296,
        "2033": 3342
      },
      "65-74": {
        "2013": 1744,
        "2014": 1882,
        "2015": 1987,
        "2016": 2066,
        "2017": 2183,
        "2018": 2289,
        "2019": 2430,
        "2020": 2551,
        "2021": 2712,
        "2022": 2765,
        "2023": 2860,
        "2024": 2878,
        "2025": 2804,
        "2026": 2759,
        "2027": 2757,
        "2028": 2713,
        "2029": 2681,
        "2030": 2690,
        "2031": 2651,
        "2032": 2618,
        "2033": 2592
      },
      "75+": {
        "2013": 847,
        "2014": 884,
        "2015": 919,
        "2016": 957,
        "2017": 1028,
        "2018": 1087,
        "2019": 1138,
        "2020": 1189,
        "2021": 1271,
        "2022": 1405,
        "2023": 1528,
        "2024": 1695,
        "2025": 1786,
        "2026": 1867,
        "2027": 1952,
        "2028": 2042,
        "2029": 2145,
        "2030": 2199,
        "2031": 2263,
        "2032": 2333,
        "2033": 2413
      }
    },
    "commuteCounty": [],
    "yearBuilt": {
      "owner": {
        "": null
      },
      "renter": {
        "": null
      },
      "total": {
        "": null
      }
    },
    "overcrowding": {
      "": {
        "owner": null,
        "renter": null,
        "total": null
      }
    },
    "unitTypes": {
      "": {
        "owner": null,
        "renter": null,
        "total": null
      }
    },
    "incomeCategories": {
      "": {
        "GEOID": 800799990,
        "Total Households": 5217,
        "Unnamed: 5": 287,
        "Less than $10,000": 73,
        "Unnamed: 7": 37,
        "$10,000 to $14,999": 198,
        "Unnamed: 11": 103,
        "$15,000 to $19,999": 81,
        "Unnamed: 15": 53,
        "$20,000 to $24,999": 190,
        "Unnamed: 19": 86,
        "$25,000 to $29,999": 195,
        "Unnamed: 23": 90,
        "$30,000 to $34,999": 78,
        "Unnamed: 27": 51,
        "$35,000 to $39,999": 132,
        "Unnamed: 31": 64,
        "$40,000 to $44,999": 223,
        "Unnamed: 35": 108,
        "$45,000 to $49,999": 312,
        "Unnamed: 39": 182,
        "$50,000 to $59,999": 394,
        "Unnamed: 43": 150,
        "$60,000 to $74,999": 510,
        "Unnamed: 47": 147,
        "$75,000 to $99,999": 811,
        "Unnamed: 51": 180,
        "$100,000 to $124,999": 776,
        "Unnamed: 55": 250,
        "$125,000 to $149,999": 333,
        "Unnamed: 59": 157,
        "$150,000 to $199,999": 293,
        "Unnamed: 63": 109,
        "$200,000 or more": 618,
        "Unnamed: 67": 146
      }
    }
  },
  {
    "county": "Dolores County",
    "wagesBySector": [
      {
        "sectorId": "1",
        "sectorName": "Federal Government",
        "wage2023": 55812.0,
        "wage2022": 52102.0,
        "wage2021": 53066.0,
        "wage2020": 51453.0,
        "wage2019": 43242.0
      },
      {
        "sectorId": "11",
        "sectorName": "Agriculture, Forestry, Fishing and Hunting",
        "wage2023": 34304.0,
        "wage2022": 38202.0,
        "wage2021": 33847.0,
        "wage2020": 37810.0,
        "wage2019": 35295.0
      },
      {
        "sectorId": "2",
        "sectorName": "State Government",
        "wage2023": 61924.0,
        "wage2022": 57912.0,
        "wage2021": 56482.0,
        "wage2020": 55027.0,
        "wage2019": 53416.0
      },
      {
        "sectorId": "21",
        "sectorName": "Mining, Quarrying, and Oil and Gas Extraction",
        "wage2023": 99817.0,
        "wage2022": 95215.0,
        "wage2021": 90777.0,
        "wage2020": 52526.0,
        "wage2019": 62277.0
      },
      {
        "sectorId": "23",
        "sectorName": "Construction",
        "wage2023": 58007.0,
        "wage2022": 55271.0,
        "wage2021": 45471.0,
        "wage2020": 43816.0,
        "wage2019": 42777.0
      },
      {
        "sectorId": "3",
        "sectorName": "Local Government",
        "wage2023": 30978.0,
        "wage2022": 28996.0,
        "wage2021": 27340.0,
        "wage2020": 29456.0,
        "wage2019": 31601.0
      },
      {
        "sectorId": "31-33",
        "sectorName": "Manufacturing",
        "wage2023": 51966.0,
        "wage2022": 48980.0,
        "wage2021": 43860.0,
        "wage2020": 43711.0,
        "wage2019": 56691.0
      },
      {
        "sectorId": "42",
        "sectorName": "Wholesale Trade",
        "wage2023": 76331.0,
        "wage2022": 75230.0,
        "wage2021": 90722.0,
        "wage2020": 60347.0,
        "wage2019": 57226.0
      },
      {
        "sectorId": "44-45",
        "sectorName": "Retail Trade",
        "wage2023": 26379.0,
        "wage2022": 31140.0,
        "wage2021": 26325.0,
        "wage2020": 22906.0,
        "wage2019": 20846.0
      },
      {
        "sectorId": "48-49",
        "sectorName": "Transportation and Warehousing",
        "wage2023": 43587.0,
        "wage2022": 41452.0,
        "wage2021": 38636.0,
        "wage2020": 34790.0,
        "wage2019": 37023.0
      },
      {
        "sectorId": "51",
        "sectorName": "Information",
        "wage2023": 90135.0,
        "wage2022": 95988.0,
        "wage2021": 88692.0,
        "wage2020": 70837.0,
        "wage2019": 53704.0
      },
      {
        "sectorId": "52",
        "sectorName": "Finance and Insurance",
        "wage2023": 108385.0,
        "wage2022": 103663.0,
        "wage2021": 102376.0,
        "wage2020": 96618.0,
        "wage2019": 80346.0
      },
      {
        "sectorId": "53",
        "sectorName": "Real Estate and Rental and Leasing",
        "wage2023": 103472.0,
        "wage2022": 55568.0,
        "wage2021": 62709.0,
        "wage2020": 31612.0,
        "wage2019": 19990.0
      },
      {
        "sectorId": "54",
        "sectorName": "Professional, Scientific, and Technical Services",
        "wage2023": 74500.0,
        "wage2022": 65583.0,
        "wage2021": 66945.0,
        "wage2020": 65039.0,
        "wage2019": 51814.0
      },
      {
        "sectorId": "56",
        "sectorName": "Administrative and Support and Waste Management and Remediation Services",
        "wage2023": 59618.0,
        "wage2022": 74834.0,
        "wage2021": 54504.0,
        "wage2020": 46021.0,
        "wage2019": 45341.0
      },
      {
        "sectorId": "61",
        "sectorName": "Educational Services",
        "wage2023": 68098.0,
        "wage2022": 59134.0,
        "wage2021": 52903.0,
        "wage2020": 42620.0,
        "wage2019": 39590.0
      },
      {
        "sectorId": "62",
        "sectorName": "Health Care and Social Assistance",
        "wage2023": 37029.0,
        "wage2022": 40297.0,
        "wage2021": 36927.0,
        "wage2020": 32688.0,
        "wage2019": 21856.0
      },
      {
        "sectorId": "71",
        "sectorName": "Arts, Entertainment, and Recreation",
        "wage2023": 30955.0,
        "wage2022": 29753.0,
        "wage2021": 27754.0,
        "wage2020": 25823.0,
        "wage2019": 24125.0
      },
      {
        "sectorId": "72",
        "sectorName": "Accommodation and Food Services",
        "wage2023": 38515.0,
        "wage2022": 35089.0,
        "wage2021": 34560.0,
        "wage2020": 35590.0,
        "wage2019": 38741.0
      },
      {
        "sectorId": "81",
        "sectorName": "Other Services (except Public Administration)",
        "wage2023": 24862.0,
        "wage2022": 26829.0,
        "wage2021": 16698.0,
        "wage2020": 14280.0,
        "wage2019": 16115.0
      }
    ],
    "jobProjections": [
      {
        "sectorId": null,
        "sectorName": "",
        "projections": {
          "2024": 2139972,
          "2025": 2152134,
          "2026": 2157283,
          "2027": 2169678,
          "2028": 2188814,
          "2029": 2211992,
          "2030": 2239938,
          "2031": 2267781,
          "2032": 2289658,
          "2033": 2306779
        }
      }
    ],
    "ageDistribution": {
      "0-17": {
        "2013": 451,
        "2014": 437,
        "2015": 423,
        "2016": 416,
        "2017": 411,
        "2018": 400,
        "2019": 385,
        "2020": 378,
        "2021": 400,
        "2022": 439,
        "2023": 467,
        "2024": 442,
        "2025": 427,
        "2026": 420,
        "2027": 414,
        "2028": 415,
        "2029": 415,
        "2030": 411,
        "2031": 407,
        "2032": 407,
        "2033": 400
      },
      "18-24": {
        "2013": 116,
        "2014": 132,
        "2015": 141,
        "2016": 144,
        "2017": 147,
        "2018": 147,
        "2019": 140,
        "2020": 140,
        "2021": 134,
        "2022": 127,
        "2023": 129,
        "2024": 133,
        "2025": 122,
        "2026": 109,
        "2027": 117,
        "2028": 119,
        "2029": 117,
        "2030": 124,
        "2031": 129,
        "2032": 127,
        "2033": 133
      },
      "25-44": {
        "2013": 453,
        "2014": 447,
        "2015": 434,
        "2016": 440,
        "2017": 442,
        "2018": 451,
        "2019": 442,
        "2020": 454,
        "2021": 498,
        "2022": 561,
        "2023": 602,
        "2024": 572,
        "2025": 570,
        "2026": 570,
        "2027": 552,
        "2028": 549,
        "2029": 543,
        "2030": 540,
        "2031": 545,
        "2032": 553,
        "2033": 545
      },
      "45-64": {
        "2013": 620,
        "2014": 621,
        "2015": 608,
        "2016": 588,
        "2017": 581,
        "2018": 589,
        "2019": 600,
        "2020": 582,
        "2021": 567,
        "2022": 561,
        "2023": 557,
        "2024": 547,
        "2025": 529,
        "2026": 529,
        "2027": 542,
        "2028": 553,
        "2029": 565,
        "2030": 571,
        "2031": 580,
        "2032": 572,
        "2033": 580
      },
      "65-74": {
        "2013": 268,
        "2014": 278,
        "2015": 294,
        "2016": 302,
        "2017": 302,
        "2018": 291,
        "2019": 298,
        "2020": 300,
        "2021": 293,
        "2022": 298,
        "2023": 286,
        "2024": 283,
        "2025": 277,
        "2026": 254,
        "2027": 249,
        "2028": 234,
        "2029": 224,
        "2030": 214,
        "2031": 207,
        "2032": 202,
        "2033": 200
      },
      "75+": {
        "2013": 175,
        "2014": 178,
        "2015": 184,
        "2016": 196,
        "2017": 198,
        "2018": 210,
        "2019": 224,
        "2020": 226,
        "2021": 224,
        "2022": 220,
        "2023": 230,
        "2024": 234,
        "2025": 229,
        "2026": 222,
        "2027": 229,
        "2028": 231,
        "2029": 230,
        "2030": 237,
        "2031": 235,
        "2032": 238,
        "2033": 239
      }
    },
    "commuteCounty": [],
    "yearBuilt": {
      "owner": {
        "": null
      },
      "renter": {
        "": null
      },
      "total": {
        "": null
      }
    },
    "overcrowding": {
      "": {
        "owner": null,
        "renter": null,
        "total": null
      }
    },
    "unitTypes": {
      "": {
        "owner": null,
        "renter": null,
        "total": null
      }
    },
    "incomeCategories": {
      "": {
        "GEOID": 803399990,
        "Total Households": 735,
        "Unnamed: 5": 52,
        "Less than $10,000": 39,
        "Unnamed: 7": 45,
        "$10,000 to $14,999": 94,
        "Unnamed: 11": 73,
        "$15,000 to $19,999": 12,
        "Unnamed: 15": 12,
        "$20,000 to $24,999": 0,
        "Unnamed: 19": 6,
        "$25,000 to $29,999": 31,
        "Unnamed: 23": 37,
        "$30,000 to $34,999": 47,
        "Unnamed: 27": 48,
        "$35,000 to $39,999": 17,
        "Unnamed: 31": 24,
        "$40,000 to $44,999": 32,
        "Unnamed: 35": 35,
        "$45,000 to $49,999": 9,
        "Unnamed: 39": 6,
        "$50,000 to $59,999": 45,
        "Unnamed: 43": 54,
        "$60,000 to $74,999": 100,
        "Unnamed: 47": 76,
        "$75,000 to $99,999": 83,
        "Unnamed: 51": 52,
        "$100,000 to $124,999": 159,
        "Unnamed: 55": 89,
        "$125,000 to $149,999": 0,
        "Unnamed: 59": 13,
        "$150,000 to $199,999": 32,
        "Unnamed: 63": 4,
        "$200,000 or more": 35,
        "Unnamed: 67": 55
      }
    }
  },
  {
    "county": "La Plata County",
    "wagesBySector": [
      {
        "sectorId": "1",
        "sectorName": "Federal Government",
        "wage2023": 89798.0,
        "wage2022": 86333.0,
        "wage2021": 76735.0,
        "wage2020": 75061.0,
        "wage2019": 71017.0
      },
      {
        "sectorId": "11",
        "sectorName": "Agriculture, Forestry, Fishing and Hunting",
        "wage2023": 38878.0,
        "wage2022": 36308.0,
        "wage2021": 36244.0,
        "wage2020": 34012.0,
        "wage2019": 34173.0
      },
      {
        "sectorId": "2",
        "sectorName": "State Government",
        "wage2023": 62216.0,
        "wage2022": 58002.0,
        "wage2021": 56702.0,
        "wage2020": 55346.0,
        "wage2019": 53265.0
      },
      {
        "sectorId": "21",
        "sectorName": "Mining, Quarrying, and Oil and Gas Extraction",
        "wage2023": 105307.0,
        "wage2022": 103890.0,
        "wage2021": 99791.0,
        "wage2020": 139513.0,
        "wage2019": 135050.0
      },
      {
        "sectorId": "22",
        "sectorName": "Utilities",
        "wage2023": 101523.0,
        "wage2022": 99449.0,
        "wage2021": 89455.0,
        "wage2020": 91475.0,
        "wage2019": 90841.0
      },
      {
        "sectorId": "23",
        "sectorName": "Construction",
        "wage2023": 62065.0,
        "wage2022": 58802.0,
        "wage2021": 57191.0,
        "wage2020": 55099.0,
        "wage2019": 53940.0
      },
      {
        "sectorId": "3",
        "sectorName": "Local Government",
        "wage2023": 62354.0,
        "wage2022": 60055.0,
        "wage2021": 56675.0,
        "wage2020": 53820.0,
        "wage2019": 51044.0
      },
      {
        "sectorId": "31-33",
        "sectorName": "Manufacturing",
        "wage2023": 57578.0,
        "wage2022": 54776.0,
        "wage2021": 47744.0,
        "wage2020": 47517.0,
        "wage2019": 44105.0
      },
      {
        "sectorId": "42",
        "sectorName": "Wholesale Trade",
        "wage2023": 78957.0,
        "wage2022": 77896.0,
        "wage2021": 66673.0,
        "wage2020": 59702.0,
        "wage2019": 57580.0
      },
      {
        "sectorId": "44-45",
        "sectorName": "Retail Trade",
        "wage2023": 38730.0,
        "wage2022": 37127.0,
        "wage2021": 36509.0,
        "wage2020": 34373.0,
        "wage2019": 31569.0
      },
      {
        "sectorId": "48-49",
        "sectorName": "Transportation and Warehousing",
        "wage2023": 71989.0,
        "wage2022": 69411.0,
        "wage2021": 67310.0,
        "wage2020": 64253.0,
        "wage2019": 62526.0
      },
      {
        "sectorId": "51",
        "sectorName": "Information",
        "wage2023": 98001.0,
        "wage2022": 104176.0,
        "wage2021": 93110.0,
        "wage2020": 91543.0,
        "wage2019": 112678.0
      },
      {
        "sectorId": "52",
        "sectorName": "Finance and Insurance",
        "wage2023": 123129.0,
        "wage2022": 116899.0,
        "wage2021": 117018.0,
        "wage2020": 110849.0,
        "wage2019": 90981.0
      },
      {
        "sectorId": "53",
        "sectorName": "Real Estate and Rental and Leasing",
        "wage2023": 51062.0,
        "wage2022": 56432.0,
        "wage2021": 55408.0,
        "wage2020": 48599.0,
        "wage2019": 45634.0
      },
      {
        "sectorId": "54",
        "sectorName": "Professional, Scientific, and Technical Services",
        "wage2023": 100295.0,
        "wage2022": 89152.0,
        "wage2021": 85700.0,
        "wage2020": 71407.0,
        "wage2019": 69286.0
      },
      {
        "sectorId": "55",
        "sectorName": "Management of Companies and Enterprises",
        "wage2023": 126978.0,
        "wage2022": 100782.0,
        "wage2021": 119512.0,
        "wage2020": 104427.0,
        "wage2019": 100474.0
      },
      {
        "sectorId": "56",
        "sectorName": "Administrative and Support and Waste Management and Remediation Services",
        "wage2023": 51576.0,
        "wage2022": 45336.0,
        "wage2021": 41570.0,
        "wage2020": 36733.0,
        "wage2019": 33944.0
      },
      {
        "sectorId": "61",
        "sectorName": "Educational Services",
        "wage2023": 78872.0,
        "wage2022": 68140.0,
        "wage2021": 63703.0,
        "wage2020": 47381.0,
        "wage2019": 44159.0
      },
      {
        "sectorId": "62",
        "sectorName": "Health Care and Social Assistance",
        "wage2023": 63864.0,
        "wage2022": 60503.0,
        "wage2021": 57958.0,
        "wage2020": 54520.0,
        "wage2019": 51249.0
      },
      {
        "sectorId": "71",
        "sectorName": "Arts, Entertainment, and Recreation",
        "wage2023": 30503.0,
        "wage2022": 28849.0,
        "wage2021": 27051.0,
        "wage2020": 24685.0,
        "wage2019": 22482.0
      },
      {
        "sectorId": "72",
        "sectorName": "Accommodation and Food Services",
        "wage2023": 29190.0,
        "wage2022": 27112.0,
        "wage2021": 26007.0,
        "wage2020": 22906.0,
        "wage2019": 21462.0
      },
      {
        "sectorId": "81",
        "sectorName": "Other Services (except Public Administration)",
        "wage2023": 39596.0,
        "wage2022": 39675.0,
        "wage2021": 36796.0,
        "wage2020": 35330.0,
        "wage2019": 32333.0
      },
      {
        "sectorId": "99",
        "sectorName": "Unclassified",
        "wage2023": 61232.0,
        "wage2022": 77651.0,
        "wage2021": 76207.0,
        "wage2020": 86808.0,
        "wage2019": 66997.0
      }
    ],
    "jobProjections": [
      {
        "sectorId": null,
        "sectorName": "",
        "projections": {
          "2024": 34505,
          "2025": 34645,
          "2026": 34620,
          "2027": 34572,
          "2028": 34744,
          "2029": 34985,
          "2030": 35327,
          "2031": 35647,
          "2032": 35884,
          "2033": 36012
        }
      }
    ],
    "ageDistribution": {
      "0-17": {
        "2013": 10579,
        "2014": 10635,
        "2015": 10735,
        "2016": 10791,
        "2017": 10714,
        "2018": 10693,
        "2019": 10400,
        "2020": 10393,
        "2021": 10449,
        "2022": 10416,
        "2023": 10194,
        "2024": 10099,
        "2025": 10043,
        "2026": 9884,
        "2027": 9780,
        "2028": 9624,
        "2029": 9489,
        "2030": 9303,
        "2031": 9197,
        "2032": 9036,
        "2033": 8863
      },
      "18-24": {
        "2013": 5419,
        "2014": 5308,
        "2015": 5341,
        "2016": 5482,
        "2017": 5548,
        "2018": 5664,
        "2019": 5638,
        "2020": 5548,
        "2021": 5672,
        "2022": 5784,
        "2023": 5611,
        "2024": 5686,
        "2025": 5713,
        "2026": 6083,
        "2027": 6145,
        "2028": 6267,
        "2029": 6339,
        "2030": 6463,
        "2031": 6511,
        "2032": 6615,
        "2033": 6654
      },
      "25-44": {
        "2013": 14292,
        "2014": 14391,
        "2015": 14471,
        "2016": 14412,
        "2017": 14300,
        "2018": 14399,
        "2019": 14220,
        "2020": 14052,
        "2021": 13869,
        "2022": 13734,
        "2023": 13563,
        "2024": 13477,
        "2025": 13245,
        "2026": 12773,
        "2027": 12269,
        "2028": 11892,
        "2029": 11597,
        "2030": 11331,
        "2031": 11074,
        "2032": 10907,
        "2033": 10817
      },
      "45-64": {
        "2013": 15632,
        "2014": 15528,
        "2015": 15603,
        "2016": 15553,
        "2017": 15298,
        "2018": 15254,
        "2019": 14855,
        "2020": 14624,
        "2021": 14616,
        "2022": 14532,
        "2023": 14438,
        "2024": 14473,
        "2025": 14620,
        "2026": 14810,
        "2027": 15121,
        "2028": 15381,
        "2029": 15644,
        "2030": 15937,
        "2031": 16277,
        "2032": 16595,
        "2033": 16893
      },
      "65-74": {
        "2013": 4587,
        "2014": 5011,
        "2015": 5381,
        "2016": 5778,
        "2017": 6163,
        "2018": 6529,
        "2019": 6989,
        "2020": 7388,
        "2021": 7664,
        "2022": 7821,
        "2023": 7949,
        "2024": 8026,
        "2025": 8162,
        "2026": 8227,
        "2027": 8160,
        "2028": 8072,
        "2029": 7874,
        "2030": 7663,
        "2031": 7525,
        "2032": 7340,
        "2033": 7200
      },
      "75+": {
        "2013": 2634,
        "2014": 2684,
        "2015": 2767,
        "2016": 2863,
        "2017": 3005,
        "2018": 3195,
        "2019": 3406,
        "2020": 3665,
        "2021": 3909,
        "2022": 4287,
        "2023": 4666,
        "2024": 5082,
        "2025": 5454,
        "2026": 5848,
        "2027": 6301,
        "2028": 6714,
        "2029": 7198,
        "2030": 7674,
        "2031": 8051,
        "2032": 8427,
        "2033": 8757
      }
    },
    "commuteCounty": [],
    "yearBuilt": {
      "owner": {
        "": null
      },
      "renter": {
        "": null
      },
      "total": {
        "": null
      }
    },
    "overcrowding": {
      "": {
        "owner": null,
        "renter": null,
        "total": null
      }
    },
    "unitTypes": {
      "": {
        "owner": null,
        "renter": null,
        "total": null
      }
    },
    "incomeCategories": {
      "": {
        "GEOID": 806799990,
        "Total Households": 13456,
        "Unnamed: 5": 278,
        "Less than $10,000": 444,
        "Unnamed: 7": 114,
        "$10,000 to $14,999": 328,
        "Unnamed: 11": 179,
        "$15,000 to $19,999": 387,
        "Unnamed: 15": 76,
        "$20,000 to $24,999": 376,
        "Unnamed: 19": 138,
        "$25,000 to $29,999": 529,
        "Unnamed: 23": 193,
        "$30,000 to $34,999": 633,
        "Unnamed: 27": 195,
        "$35,000 to $39,999": 393,
        "Unnamed: 31": 139,
        "$40,000 to $44,999": 323,
        "Unnamed: 35": 82,
        "$45,000 to $49,999": 460,
        "Unnamed: 39": 103,
        "$50,000 to $59,999": 609,
        "Unnamed: 43": 124,
        "$60,000 to $74,999": 1188,
        "Unnamed: 47": 260,
        "$75,000 to $99,999": 1862,
        "Unnamed: 51": 185,
        "$100,000 to $124,999": 1370,
        "Unnamed: 55": 317,
        "$125,000 to $149,999": 1151,
        "Unnamed: 59": 253,
        "$150,000 to $199,999": 1595,
        "Unnamed: 63": 192,
        "$200,000 or more": 1808,
        "Unnamed: 67": 285
      }
    }
  },
  {
    "county": "Montezuma County",
    "wagesBySector": [
      {
        "sectorId": "1",
        "sectorName": "Federal Government",
        "wage2023": 77109.0,
        "wage2022": 72661.0,
        "wage2021": 69004.0,
        "wage2020": 68807.0,
        "wage2019": 62801.0
      },
      {
        "sectorId": "11",
        "sectorName": "Agriculture, Forestry, Fishing and Hunting",
        "wage2023": 35809.0,
        "wage2022": 40768.0,
        "wage2021": 40159.0,
        "wage2020": 38854.0,
        "wage2019": 34917.0
      },
      {
        "sectorId": "2",
        "sectorName": "State Government",
        "wage2023": 60464.0,
        "wage2022": 56861.0,
        "wage2021": 55758.0,
        "wage2020": 54712.0,
        "wage2019": 54559.0
      },
      {
        "sectorId": "21",
        "sectorName": "Mining, Quarrying, and Oil and Gas Extraction",
        "wage2023": 69095.0,
        "wage2022": 59301.0,
        "wage2021": 51090.0,
        "wage2020": 61696.0,
        "wage2019": 72529.0
      },
      {
        "sectorId": "22",
        "sectorName": "Utilities",
        "wage2023": 80473.0,
        "wage2022": 77387.0,
        "wage2021": 76918.0,
        "wage2020": 71650.0,
        "wage2019": 69297.0
      },
      {
        "sectorId": "23",
        "sectorName": "Construction",
        "wage2023": 45367.0,
        "wage2022": 46152.0,
        "wage2021": 42121.0,
        "wage2020": 41743.0,
        "wage2019": 38434.0
      },
      {
        "sectorId": "3",
        "sectorName": "Local Government",
        "wage2023": 41643.0,
        "wage2022": 40185.0,
        "wage2021": 38175.0,
        "wage2020": 35838.0,
        "wage2019": 34916.0
      },
      {
        "sectorId": "31-33",
        "sectorName": "Manufacturing",
        "wage2023": 41736.0,
        "wage2022": 41259.0,
        "wage2021": 38428.0,
        "wage2020": 38658.0,
        "wage2019": 34717.0
      },
      {
        "sectorId": "42",
        "sectorName": "Wholesale Trade",
        "wage2023": 63907.0,
        "wage2022": 60370.0,
        "wage2021": 156163.0,
        "wage2020": 59113.0,
        "wage2019": 57221.0
      },
      {
        "sectorId": "44-45",
        "sectorName": "Retail Trade",
        "wage2023": 38200.0,
        "wage2022": 36378.0,
        "wage2021": 34866.0,
        "wage2020": 33304.0,
        "wage2019": 30659.0
      },
      {
        "sectorId": "48-49",
        "sectorName": "Transportation and Warehousing",
        "wage2023": 84790.0,
        "wage2022": 78359.0,
        "wage2021": 76793.0,
        "wage2020": 78244.0,
        "wage2019": 73970.0
      },
      {
        "sectorId": "51",
        "sectorName": "Information",
        "wage2023": 58715.0,
        "wage2022": 52915.0,
        "wage2021": 71526.0,
        "wage2020": 58209.0,
        "wage2019": 49720.0
      },
      {
        "sectorId": "52",
        "sectorName": "Finance and Insurance",
        "wage2023": 63025.0,
        "wage2022": 64170.0,
        "wage2021": 57560.0,
        "wage2020": 55210.0,
        "wage2019": 47635.0
      },
      {
        "sectorId": "53",
        "sectorName": "Real Estate and Rental and Leasing",
        "wage2023": 61733.0,
        "wage2022": 69047.0,
        "wage2021": 44903.0,
        "wage2020": 39462.0,
        "wage2019": 39759.0
      },
      {
        "sectorId": "54",
        "sectorName": "Professional, Scientific, and Technical Services",
        "wage2023": 67495.0,
        "wage2022": 70205.0,
        "wage2021": 68448.0,
        "wage2020": 59894.0,
        "wage2019": 51466.0
      },
      {
        "sectorId": "55",
        "sectorName": "Management of Companies and Enterprises",
        "wage2023": 122756.0,
        "wage2022": 109411.0,
        "wage2021": 104451.0,
        "wage2020": 97775.0,
        "wage2019": 90009.0
      },
      {
        "sectorId": "56",
        "sectorName": "Administrative and Support and Waste Management and Remediation Services",
        "wage2023": 42494.0,
        "wage2022": 34564.0,
        "wage2021": 28339.0,
        "wage2020": 28483.0,
        "wage2019": 28905.0
      },
      {
        "sectorId": "61",
        "sectorName": "Educational Services",
        "wage2023": 48833.0,
        "wage2022": 41578.0,
        "wage2021": 37511.0,
        "wage2020": 37309.0,
        "wage2019": 33527.0
      },
      {
        "sectorId": "62",
        "sectorName": "Health Care and Social Assistance",
        "wage2023": 45001.0,
        "wage2022": 44830.0,
        "wage2021": 41165.0,
        "wage2020": 39756.0,
        "wage2019": 36920.0
      },
      {
        "sectorId": "71",
        "sectorName": "Arts, Entertainment, and Recreation",
        "wage2023": 42154.0,
        "wage2022": 54772.0,
        "wage2021": 52314.0,
        "wage2020": 103510.0,
        "wage2019": 88481.0
      },
      {
        "sectorId": "72",
        "sectorName": "Accommodation and Food Services",
        "wage2023": 23677.0,
        "wage2022": 23632.0,
        "wage2021": 22125.0,
        "wage2020": 19949.0,
        "wage2019": 18575.0
      },
      {
        "sectorId": "81",
        "sectorName": "Other Services (except Public Administration)",
        "wage2023": 30754.0,
        "wage2022": 30025.0,
        "wage2021": 28385.0,
        "wage2020": 26664.0,
        "wage2019": 24989.0
      }
    ],
    "jobProjections": [
      {
        "sectorId": null,
        "sectorName": "",
        "projections": {
          "2024": 12398,
          "2025": 12441,
          "2026": 12438,
          "2027": 12461,
          "2028": 12491,
          "2029": 12553,
          "2030": 12646,
          "2031": 12738,
          "2032": 12809,
          "2033": 12845
        }
      }
    ],
    "ageDistribution": {
      "0-17": {
        "2013": 5806,
        "2014": 5797,
        "2015": 5790,
        "2016": 5743,
        "2017": 5691,
        "2018": 5641,
        "2019": 5557,
        "2020": 5464,
        "2021": 5455,
        "2022": 5450,
        "2023": 5421,
        "2024": 5412,
        "2025": 5325,
        "2026": 5269,
        "2027": 5191,
        "2028": 5126,
        "2029": 5053,
        "2030": 4981,
        "2031": 4927,
        "2032": 4848,
        "2033": 4754
      },
      "18-24": {
        "2013": 1770,
        "2014": 1757,
        "2015": 1763,
        "2016": 1799,
        "2017": 1787,
        "2018": 1752,
        "2019": 1749,
        "2020": 1756,
        "2021": 1747,
        "2022": 1708,
        "2023": 1664,
        "2024": 1627,
        "2025": 1655,
        "2026": 1600,
        "2027": 1534,
        "2028": 1491,
        "2029": 1485,
        "2030": 1482,
        "2031": 1485,
        "2032": 1474,
        "2033": 1504
      },
      "25-44": {
        "2013": 5565,
        "2014": 5450,
        "2015": 5410,
        "2016": 5409,
        "2017": 5485,
        "2018": 5574,
        "2019": 5670,
        "2020": 5810,
        "2021": 5975,
        "2022": 6135,
        "2023": 6280,
        "2024": 6401,
        "2025": 6452,
        "2026": 6565,
        "2027": 6683,
        "2028": 6727,
        "2029": 6755,
        "2030": 6763,
        "2031": 6732,
        "2032": 6698,
        "2033": 6645
      },
      "45-64": {
        "2013": 7670,
        "2014": 7637,
        "2015": 7524,
        "2016": 7362,
        "2017": 7239,
        "2018": 7083,
        "2019": 6929,
        "2020": 6765,
        "2021": 6712,
        "2022": 6607,
        "2023": 6440,
        "2024": 6347,
        "2025": 6231,
        "2026": 6142,
        "2027": 6034,
        "2028": 5990,
        "2029": 5942,
        "2030": 5945,
        "2031": 5985,
        "2032": 6123,
        "2033": 6229
      },
      "65-74": {
        "2013": 2766,
        "2014": 2903,
        "2015": 3095,
        "2016": 3258,
        "2017": 3345,
        "2018": 3501,
        "2019": 3684,
        "2020": 3899,
        "2021": 4098,
        "2022": 4220,
        "2023": 4291,
        "2024": 4384,
        "2025": 4434,
        "2026": 4457,
        "2027": 4462,
        "2028": 4411,
        "2029": 4357,
        "2030": 4269,
        "2031": 4218,
        "2032": 4114,
        "2033": 4018
      },
      "75+": {
        "2013": 1904,
        "2014": 1921,
        "2015": 1937,
        "2016": 1967,
        "2017": 2004,
        "2018": 2068,
        "2019": 2145,
        "2020": 2198,
        "2021": 2267,
        "2022": 2390,
        "2023": 2545,
        "2024": 2690,
        "2025": 2861,
        "2026": 3022,
        "2027": 3130,
        "2028": 3284,
        "2029": 3429,
        "2030": 3582,
        "2031": 3702,
        "2032": 3822,
        "2033": 3944
      }
    },
    "commuteCounty": [],
    "yearBuilt": {
      "owner": {
        "": null
      },
      "renter": {
        "": null
      },
      "total": {
        "": null
      }
    },
    "overcrowding": {
      "": {
        "owner": null,
        "renter": null,
        "total": null
      }
    },
    "unitTypes": {
      "": {
        "owner": null,
        "renter": null,
        "total": null
      }
    },
    "incomeCategories": {
      "": {
        "GEOID": 808399990,
        "Total Households": 6295,
        "Unnamed: 5": 191,
        "Less than $10,000": 279,
        "Unnamed: 7": 105,
        "$10,000 to $14,999": 227,
        "Unnamed: 11": 110,
        "$15,000 to $19,999": 195,
        "Unnamed: 15": 133,
        "$20,000 to $24,999": 155,
        "Unnamed: 19": 60,
        "$25,000 to $29,999": 321,
        "Unnamed: 23": 152,
        "$30,000 to $34,999": 144,
        "Unnamed: 27": 102,
        "$35,000 to $39,999": 281,
        "Unnamed: 31": 148,
        "$40,000 to $44,999": 260,
        "Unnamed: 35": 172,
        "$45,000 to $49,999": 207,
        "Unnamed: 39": 106,
        "$50,000 to $59,999": 504,
        "Unnamed: 43": 167,
        "$60,000 to $74,999": 712,
        "Unnamed: 47": 235,
        "$75,000 to $99,999": 892,
        "Unnamed: 51": 230,
        "$100,000 to $124,999": 720,
        "Unnamed: 55": 196,
        "$125,000 to $149,999": 355,
        "Unnamed: 59": 149,
        "$150,000 to $199,999": 516,
        "Unnamed: 63": 146,
        "$200,000 or more": 527,
        "Unnamed: 67": 193
      }
    }
  },
  {
    "county": "San Juan County",
    "wagesBySector": [
      {
        "sectorId": "1",
        "sectorName": "Federal Government",
        "wage2023": 71035.0,
        "wage2022": 67956.0,
        "wage2021": 76783.0,
        "wage2020": 38651.0,
        "wage2019": 57136.0
      },
      {
        "sectorId": "2",
        "sectorName": "State Government",
        "wage2023": 52924.0,
        "wage2022": 46366.0,
        "wage2021": 44698.0,
        "wage2020": 55027.0,
        "wage2019": 53416.0
      },
      {
        "sectorId": "23",
        "sectorName": "Construction",
        "wage2023": 44256.0,
        "wage2022": 43921.0,
        "wage2021": 42325.0,
        "wage2020": 52553.0,
        "wage2019": 41240.0
      },
      {
        "sectorId": "3",
        "sectorName": "Local Government",
        "wage2023": 44396.0,
        "wage2022": 45150.0,
        "wage2021": 38308.0,
        "wage2020": 34255.0,
        "wage2019": 32047.0
      },
      {
        "sectorId": "31-33",
        "sectorName": "Manufacturing",
        "wage2023": 24660.0,
        "wage2022": 48980.0,
        "wage2021": 43860.0,
        "wage2020": 43711.0,
        "wage2019": 40455.0
      },
      {
        "sectorId": "42",
        "sectorName": "Wholesale Trade",
        "wage2023": 75579.0,
        "wage2022": 75230.0,
        "wage2021": 90722.0,
        "wage2020": 60347.0,
        "wage2019": 57226.0
      },
      {
        "sectorId": "44-45",
        "sectorName": "Retail Trade",
        "wage2023": 27425.0,
        "wage2022": 26798.0,
        "wage2021": 22662.0,
        "wage2020": 21366.0,
        "wage2019": 20587.0
      },
      {
        "sectorId": "51",
        "sectorName": "Information",
        "wage2023": 90135.0,
        "wage2022": 95988.0,
        "wage2021": 87310.0,
        "wage2020": 84263.0,
        "wage2019": 99812.0
      },
      {
        "sectorId": "52",
        "sectorName": "Finance and Insurance",
        "wage2023": 108385.0,
        "wage2022": 103663.0,
        "wage2021": 102376.0,
        "wage2020": 96618.0,
        "wage2019": 80346.0
      },
      {
        "sectorId": "53",
        "sectorName": "Real Estate and Rental and Leasing",
        "wage2023": 52406.0,
        "wage2022": 60100.0,
        "wage2021": 41460.0,
        "wage2020": 33033.0,
        "wage2019": 24863.0
      },
      {
        "sectorId": "54",
        "sectorName": "Professional, Scientific, and Technical Services",
        "wage2023": 80265.0,
        "wage2022": 86801.0,
        "wage2021": 77273.0,
        "wage2020": 48148.0,
        "wage2019": 27179.0
      },
      {
        "sectorId": "56",
        "sectorName": "Administrative and Support and Waste Management and Remediation Services",
        "wage2023": 48756.0,
        "wage2022": 43076.0,
        "wage2021": 38594.0,
        "wage2020": 34736.0,
        "wage2019": 32640.0
      },
      {
        "sectorId": "61",
        "sectorName": "Educational Services",
        "wage2023": 68098.0,
        "wage2022": 59134.0,
        "wage2021": 52903.0,
        "wage2020": 42620.0,
        "wage2019": 39590.0
      },
      {
        "sectorId": "62",
        "sectorName": "Health Care and Social Assistance",
        "wage2023": 29380.0,
        "wage2022": 25364.0,
        "wage2021": 26515.0,
        "wage2020": 25839.0,
        "wage2019": 45571.0
      },
      {
        "sectorId": "71",
        "sectorName": "Arts, Entertainment, and Recreation",
        "wage2023": 47591.0,
        "wage2022": 35282.0,
        "wage2021": 34689.0,
        "wage2020": 25667.0,
        "wage2019": 30189.0
      },
      {
        "sectorId": "72",
        "sectorName": "Accommodation and Food Services",
        "wage2023": 29937.0,
        "wage2022": 29298.0,
        "wage2021": 28820.0,
        "wage2020": 28111.0,
        "wage2019": 23293.0
      },
      {
        "sectorId": "81",
        "sectorName": "Other Services (except Public Administration)",
        "wage2023": 18189.0,
        "wage2022": 19146.0,
        "wage2021": 15845.0,
        "wage2020": 19218.0,
        "wage2019": 18578.0
      },
      {
        "sectorId": "99",
        "sectorName": "Unclassified",
        "wage2023": 13236.0,
        "wage2022": null,
        "wage2021": null,
        "wage2020": null,
        "wage2019": null
      }
    ],
    "jobProjections": [
      {
        "sectorId": null,
        "sectorName": "",
        "projections": {
          "2024": 680,
          "2025": 708,
          "2026": 729,
          "2027": 740,
          "2028": 743,
          "2029": 750,
          "2030": 749,
          "2031": 760,
          "2032": 756,
          "2033": 754
        }
      }
    ],
    "ageDistribution": {
      "0-17": {
        "2013": 124,
        "2014": 117,
        "2015": 112,
        "2016": 109,
        "2017": 110,
        "2018": 109,
        "2019": 99,
        "2020": 95,
        "2021": 95,
        "2022": 91,
        "2023": 96,
        "2024": 92,
        "2025": 97,
        "2026": 103,
        "2027": 103,
        "2028": 104,
        "2029": 94,
        "2030": 97,
        "2031": 102,
        "2032": 109,
        "2033": 112
      },
      "18-24": {
        "2013": 25,
        "2014": 26,
        "2015": 25,
        "2016": 28,
        "2017": 29,
        "2018": 28,
        "2019": 28,
        "2020": 34,
        "2021": 41,
        "2022": 57,
        "2023": 50,
        "2024": 51,
        "2025": 56,
        "2026": 56,
        "2027": 51,
        "2028": 50,
        "2029": 57,
        "2030": 53,
        "2031": 48,
        "2032": 43,
        "2033": 40
      },
      "25-44": {
        "2013": 206,
        "2014": 197,
        "2015": 200,
        "2016": 201,
        "2017": 195,
        "2018": 204,
        "2019": 198,
        "2020": 199,
        "2021": 228,
        "2022": 261,
        "2023": 267,
        "2024": 282,
        "2025": 300,
        "2026": 317,
        "2027": 314,
        "2028": 318,
        "2029": 315,
        "2030": 312,
        "2031": 314,
        "2032": 311,
        "2033": 305
      },
      "45-64": {
        "2013": 227,
        "2014": 215,
        "2015": 216,
        "2016": 209,
        "2017": 209,
        "2018": 211,
        "2019": 210,
        "2020": 207,
        "2021": 203,
        "2022": 211,
        "2023": 206,
        "2024": 211,
        "2025": 213,
        "2026": 216,
        "2027": 228,
        "2028": 222,
        "2029": 229,
        "2030": 226,
        "2031": 223,
        "2032": 231,
        "2033": 232
      },
      "65-74": {
        "2013": 99,
        "2014": 114,
        "2015": 114,
        "2016": 112,
        "2017": 116,
        "2018": 106,
        "2019": 108,
        "2020": 115,
        "2021": 116,
        "2022": 107,
        "2023": 103,
        "2024": 102,
        "2025": 99,
        "2026": 96,
        "2027": 91,
        "2028": 92,
        "2029": 91,
        "2030": 92,
        "2031": 91,
        "2032": 84,
        "2033": 84
      },
      "75+": {
        "2013": 25,
        "2014": 28,
        "2015": 30,
        "2016": 31,
        "2017": 41,
        "2018": 45,
        "2019": 57,
        "2020": 59,
        "2021": 57,
        "2022": 67,
        "2023": 74,
        "2024": 74,
        "2025": 74,
        "2026": 76,
        "2027": 78,
        "2028": 81,
        "2029": 79,
        "2030": 84,
        "2031": 83,
        "2032": 86,
        "2033": 85
      }
    },
    "commuteCounty": [],
    "yearBuilt": {
      "owner": {
        "": null
      },
      "renter": {
        "": null
      },
      "total": {
        "": null
      }
    },
    "overcrowding": {
      "": {
        "owner": null,
        "renter": null,
        "total": null
      }
    },
    "unitTypes": {
      "": {
        "owner": null,
        "renter": null,
        "total": null
      }
    },
    "incomeCategories": {
      "": {
        "GEOID": 811199990,
        "Total Households": 37,
        "Unnamed: 5": 11,
        "Less than $10,000": 0,
        "Unnamed: 7": 0,
        "$10,000 to $14,999": 8,
        "Unnamed: 11": 17,
        "$15,000 to $19,999": 0,
        "Unnamed: 15": 0,
        "$20,000 to $24,999": 0,
        "Unnamed: 19": 0,
        "$25,000 to $29,999": 0,
        "Unnamed: 23": 0,
        "$30,000 to $34,999": 0,
        "Unnamed: 27": 0,
        "$35,000 to $39,999": 0,
        "Unnamed: 31": 0,
        "$40,000 to $44,999": 0,
        "Unnamed: 35": 0,
        "$45,000 to $49,999": 0,
        "Unnamed: 39": 0,
        "$50,000 to $59,999": 4,
        "Unnamed: 43": 7,
        "$60,000 to $74,999": 6,
        "Unnamed: 47": 7,
        "$75,000 to $99,999": 1,
        "Unnamed: 51": 0,
        "$100,000 to $124,999": 6,
        "Unnamed: 55": 10,
        "$125,000 to $149,999": 0,
        "Unnamed: 59": 0,
        "$150,000 to $199,999": 8,
        "Unnamed: 63": 7,
        "$200,000 or more": 4,
        "Unnamed: 67": 7
      }
    }
  }
];
