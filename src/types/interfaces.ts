export interface CountriesInterface {
  name: {
      common: string;
      official: string;
      nativeName: {
          [key: string]: {
              official: string;
              common: string;
          };
      };
  };
  population: number;
  region: string;
  capital: string[];
  flags: {
      svg: string;
      png: string;
      alt: string;
  };
  latlng: number[];
  currencies: {
      [code: string]: {
          name: string;
          symbol: string;
      };
  };
  languages: {
      [iso639_1: string]: string;
  };
  topLevelDomain: string[];
}

export interface SingleCountryInterface {
  name: string;
  nativeName: string;
  population: string;
  region: string;
  subregion: string;
  capital: string;
  flags: {
    svg: string;
    png: string;
    alt: string;
  };
  topLevelDomain: string[];
  currencies?: {
    [code: string]: {
      name: string;
      symbol: string;
    };
  }[];
  languages?: {
    [iso639_1: string]: string;
  }[];
  borders: string[];
}



export interface RegionsInterface {
  label: string;
  name: string;
}

export interface SearchProps { 
  searchCountries: (value: string) => void; 
  setCountries: any; 
  searchInput: string; 
  resetInput: () => void; 
}
