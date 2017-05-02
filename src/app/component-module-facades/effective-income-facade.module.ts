import { NgModule }           from '@angular/core';
import { EffectiveIncomeModule } from '../effective-income/effective-income.module';
import { AbstractCommercialIncomeService, AbstractResidentialIncomeService } from '../effective-income/effective-income.service';
import { ResidentialIncomeServiceBridge, CommercialIncomeServiceBridge } from '../special.service';

@NgModule({
exports: [EffectiveIncomeModule],
providers: [
  { provide: AbstractResidentialIncomeService, useClass: ResidentialIncomeServiceBridge },
  { provide: AbstractCommercialIncomeService, useClass: CommercialIncomeServiceBridge },
]
})

export class EffectiveIncomeFacadeModule { };
