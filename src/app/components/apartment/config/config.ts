import { OpaqueToken } from '@angular/core';
import { IApartmentIncome } from '../interfaces/apartment-income.interface';

export const INITIAL_CONFIG: IApartmentIncome = {
  bedrooms: 0,
  squareFeet: undefined,
  monthlyRent: undefined,
  units: undefined,
};

export let APARTMENT_INC_CONFIG = new OpaqueToken('app.parkingIncome.initialConfig');
