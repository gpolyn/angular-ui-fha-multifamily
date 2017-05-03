import { NgModule }           from '@angular/core';
import { EffectiveIncomeModule } from '../components';
import { AbstractCommercialIncomeService, AbstractResidentialIncomeService } from '../components';
import { ResidentialIncomeServiceBridge, CommercialIncomeServiceBridge } from '../services';

@NgModule({
exports: [EffectiveIncomeModule],
providers: [
  { provide: AbstractResidentialIncomeService, useClass: ResidentialIncomeServiceBridge },
  { provide: AbstractCommercialIncomeService, useClass: CommercialIncomeServiceBridge },
]
})

export class EffectiveIncomeFacadeModule { };
