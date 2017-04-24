import { OpaqueToken } from '@angular/core';
import { IParkingIncome } from '../interfaces/parking-income.interface';

export const INITIAL_CONFIG: IParkingIncome = {
  spaces: undefined,
  squareFeet: undefined,
  monthlyFee: undefined,
  parkingStyle: undefined,
  totalMonthlyIncome: undefined
};

export let PARKING_INC_CONFIG = new OpaqueToken('app.parkingIncome.initialConfig');
