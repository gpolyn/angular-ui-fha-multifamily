import { NgModule }           from '@angular/core';
import { MyCommercialOtherIncomeService, MyResidentialOtherIncomeService } from '../special.service';

const INITIAL_OTHER_INCOME_CONFIG_2 = {
  usage: undefined,
  squareFeet: undefined,
  monthlyRent: undefined,
  totalMonthlyIncome: undefined
};

import { OTHER_INC_CONFIG, OtherIncomeModule, ResidentialIncomeService, CommercialIncomeService } from './other';

@NgModule({
exports: [ OtherIncomeModule],
providers: [
  { provide: ResidentialIncomeService, useClass: MyResidentialOtherIncomeService },
  { provide: CommercialIncomeService, useClass: MyCommercialOtherIncomeService },
  { provide: OTHER_INC_CONFIG, useValue: INITIAL_OTHER_INCOME_CONFIG_2 }
]
})

export class OtherIncomeWrapperModule { };
