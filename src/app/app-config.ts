import { OpaqueToken } from '@angular/core';

export interface AppConfig {
  maxCommercialOccupancy: number;
  maxResidentialOccupancy: number;
}

export const DI_CONFIG: AppConfig = {
  maxCommercialOccupancy: 80,
  maxResidentialOccupancy: 95
};

export let APP_CONFIG = new OpaqueToken('app.config');
