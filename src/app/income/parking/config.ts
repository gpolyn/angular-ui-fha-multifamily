import { OpaqueToken } from '@angular/core';
import { IParkingIncome } from './parking-income';

export const INITIAL_CONFIG: IParkingIncome = {
  spaces: undefined,
  squareFeet: undefined,
  monthlyFee: undefined,
  parkingStyle: undefined,
  totalMonthlyIncome: undefined
};

export let PARKING_INC_CONFIG = new OpaqueToken('app.parkingIncome.initialConfig');
