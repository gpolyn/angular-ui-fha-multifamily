import { NgModule }           from '@angular/core';
import { OperatingExpensesModule } from '../components';
import { AbstractGrossIncomeService, AbstractOperatingExpenseService } from '../components';
import {GrossIncomeService, OpexService} from '../services';

@NgModule({
exports: [OperatingExpensesModule],
providers: [
  { provide: AbstractGrossIncomeService, useClass: GrossIncomeService },
  { provide: AbstractOperatingExpenseService, useClass: OpexService },
]
})

export class OpexFacadeModule { };
