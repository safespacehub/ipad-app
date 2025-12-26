export interface PerformanceData {
  outsideAirTemp?: number;
  ias?: number;
  altitude?: number;
  torque?: number;
  npPercentage?: number;
  itt?: number;
  fuelFlow?: number;
}

export interface FlightLeg {
  id: string;
  origin: string;
  destination: string;
  fuel: number;
  payloadWeight: number; // total payload weight in lbs
  aircraft: string;
  performance?: PerformanceData;
}

export interface WorkDay {
  id: string;
  date: string; // YYYY-MM-DD
  legs: FlightLeg[];
  createdAt: number;
  updatedAt: number;
}

