import { NgModule }           from '@angular/core';

import { OtherIncomeModule} from './other/other-income.module';
import { MyCommercialOtherIncomeService, MyResidentialOtherIncomeService } from '../special.service';

import {  OTHER_INC_CONFIG } from './other/other-income';

const INITIAL_OTHER_INCOME_CONFIG_2 = {
  usage: undefined,
  squareFeet: undefined,
  monthlyRent: undefined,
  totalMonthlyIncome: undefined
};

import { ResidentialIncomeService, CommercialIncomeService } from './other/other-income.service';

@NgModule({
exports: [ OtherIncomeModule],
providers: [
  { provide: ResidentialIncomeService, useClass: MyResidentialOtherIncomeService },
  { provide: CommercialIncomeService, useClass: MyCommercialOtherIncomeService },
  { provide: OTHER_INC_CONFIG, useValue: INITIAL_OTHER_INCOME_CONFIG_2 }
]
})

export class OtherIncomeWrapperModule { };
