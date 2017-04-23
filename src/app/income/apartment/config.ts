import { OpaqueToken } from '@angular/core';
import { IApartmentIncome } from './apartment-income';

export const INITIAL_CONFIG: IApartmentIncome = {
  bedrooms: undefined,
  squareFeet: undefined,
  monthlyRent: undefined,
  units: undefined,
};

export let APARTMENT_INC_CONFIG = new OpaqueToken('app.parkingIncome.initialConfig');