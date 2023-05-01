import _airportData from './airportData.json';

export type AirportConfig = string;
export interface Airport {
  icao: string;
  configs: AirportConfig[];
  altitude: number;
  minors: MinorsEntity[];
}
export interface MinorsEntity {
  icao: string;
  altitude: number;
  configs: AirportConfig[];
}

export const airportData: Airport[] = _airportData;
