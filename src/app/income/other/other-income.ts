import { OpaqueToken } from '@angular/core';
import { IIncome2 } from '../../income-service.interface';

export interface IOtherIncome extends IIncome2 {

  usage?: string;
  squareFeet?: number;
  monthlyRent: number;
  totalMonthlyIncome: number;

}

export const INITIAL_OTHER_INCOME_CONFIG: IOtherIncome = {
  usage: "shouldnt see this",
  squareFeet: undefined,
  monthlyRent: undefined,
  totalMonthlyIncome: undefined
};

export let OTHER_INC_CONFIG = new OpaqueToken('app.otherIncome.initialConfig');
