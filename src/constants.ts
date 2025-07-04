import CensusTractBoundingBoxes from './Data/census_tracts_bounding_boxes.json';
import HexLookups from './Data/hexLookup.json';
import * as Types from './index';

export const hexLookups = HexLookups as unknown as Types.H3HexLookup[];


export const census_tract_bbs = CensusTractBoundingBoxes as { gisjoin: string; bbox: [[number, number], [number, number]] }[];

type Mode = 'light' | 'dark';

const mode = 'light';

export const COLOR_BACKGROUND = (mode as Mode) === 'light' ? '#faf6f1' : '#1a2b2d';
export const COLOR_SECONDARY_BACKGROUND = (mode as Mode) === 'light' ? '#e0e0e0' : '#22302f';
export const COLOR_TEXT = (mode as Mode) === 'light' ? '#333333' : '#dce3e8';
export const COLOR_TEXT_GREY = (mode as Mode) === 'light' ? '#666666' : '#999999';
export const COLOR_TEXT_ACCENT = (mode as Mode) === 'light' ? '#00796b' : '#85c4b3';
export const COLOR_INTERACTIVE = (mode as Mode) === 'light' ? '#00796b' : '#85c4b3';
export const COLOR_INTERACTIVE_LIGHT = (mode as Mode) === 'light' ? '#4dd0e1' : '#98f6ff';
export const COLOR_INTERACTIVE_DARK = (mode as Mode) === 'light' ? '#004d40' : '#18b9cf';
export const COLOR_ACCENT_RED = (mode as Mode) === 'light' ? 'rgb(230, 81, 0)' : 'rgb(251, 140, 35)';
export const COLOR_ACCENT_LIGHT_ORANGE = (mode as Mode) === 'light' ? 'rgb(255,204,188)' : 'rgb(254,224,195)';
export const COLOR_BACKGROUND_HIGHLIGHT = (mode as Mode) === 'light' ? '#cfd8dc' : '#3a4e4b';
export const COLOR_WHITE = (mode as Mode) === 'light' ? '#000000' : '#ffffff';  // Same for both
export const COLOR_BLACK = (mode as Mode) === 'light' ? '#ffffff' : '#000000';  // Same for both
export const COLOR_BLUE = 'rgb(75, 0, 130)';


export const BUCKET_URL = 'https://s3.amazonaws.com/holc';


export const lightenDarkenColor = (col: string, amt: number) => (((parseInt(col, 16) & 0x0000FF) + amt) | ((((parseInt(col, 16) >> 8) & 0x00FF) + amt) << 8) | (((parseInt(col, 16) >> 16) + amt) << 16)).toString(16);
  

  


export const TEXT_SERIF = '"Merriweather", serif';
export const TEXT_SANSSERIF = '"Lato", sans-serif';
export const TEXT_SANSSERIF_ALT = '"News Cycle", sans-serif';
export const TEXT_TYPEWRITER = '"Special Elite", serif';
export const TEXT_MASTHEAD = '"EB Garamond", sans-serif';

export const componentDimensions = {
  masthead: {
    height: {
      mobile: 35,
      tablet: 100,
      desktop: 100,
    },
  },
  menuToggle: {
    width: {
      mobile: 50,
      tablet: 50,
    },
    height: 50
  },
  sidebar: {
    width: {
      mobile: '100%',
      tablet: '100%',
      desktop: 450,
    }
  }
} as const;
  
export const sizes = {
  mobile: 480,
  tablet: 600,
  desktop: 1200,
  desktop2: 1440,
}

export const devices = {
  mobile: `(min-width: ${sizes.mobile}px)`,
  tablet: `(min-width: ${sizes.tablet}px)`,
  desktop: `(min-width: ${sizes.desktop}px)`,
  desktop2: `(min-width: ${sizes.desktop2}px)`,
}

export const states = {
  AL: "Alabama",
  AK: "Alaska",
  AZ: "Arizona",
  AR: "Arkansas",
  CA: "California",
  CO: "Colorado",
  CT: "Connecticut",
  DE: "Delaware",
  FL: "Florida",
  GA: "Georgia",
  HI: "Hawaii",
  ID: "Idaho",
  IL: "Illinois",
  IN: "Indiana",
  IA: "Iowa",
  KS: "Kansas",
  KY: "Kentucky",
  LA: "Louisiana",
  ME: "Maine",
  MD: "Maryland",
  MA: "Massachusetts",
  MI: "Michigan",
  MN: "Minnesota",
  MS: "Mississippi",
  MO: "Missouri",
  MT: "Montana",
  NE: "Nebraska",
  NV: "Nevada",
  NH: "New Hampshire",
  NJ: "New Jersey",
  NM: "New Mexico",
  NY: "New York",
  NC: "North Carolina",
  ND: "North Dakota",
  OH: "Ohio",
  OK: "Oklahoma",
  OR: "Oregon",
  PA: "Pennsylvania",
  RI: "Rhode Island",
  SC: "South Carolina",
  SD: "South Dakota",
  TN: "Tennessee",
  TX: "Texas",
  UT: "Utah",
  VT: "Vermont",
  VA: "Virginia",
  WA: "Washington",
  WV: "West Virginia",
  WI: "Wisconsin",
  WY: "Wyoming",
  DC: "District of Columbia"
};