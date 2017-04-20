import { NgModule }           from '@angular/core';
import { EffectiveIncomeModule } from './effective-income/effective-income.module';
import { AbstractCommercialIncomeService, AbstractResidentialIncomeService } from './effective-income/effective-income.service';
import { CommercialIncomeService, ResidentialIncomeService } from './special.service';

@NgModule({
exports: [EffectiveIncomeModule],
providers: [
  { provide: AbstractResidentialIncomeService, useClass: ResidentialIncomeService },
  //  { provide: AbstractCommercialIncomeService, useClass: CommercialIncomeService },
]
})

export class EffectiveIncomeFacadeModule { };
