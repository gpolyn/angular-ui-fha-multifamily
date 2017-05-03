import { OpaqueToken } from '@angular/core';
import { IOtherIncome } from '../interfaces/other-income.interface';

export const INITIAL_OTHER_INCOME_CONFIG: IOtherIncome = {
  usage: "shouldnt see this",
  squareFeet: undefined,
  monthlyRent: undefined,
  totalMonthlyIncome: undefined
};

export let OTHER_INC_CONFIG = new OpaqueToken('app.otherIncome.initialConfig');
