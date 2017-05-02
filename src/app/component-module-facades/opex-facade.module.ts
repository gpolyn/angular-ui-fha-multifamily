import { NgModule }           from '@angular/core';
import { OperatingExpensesModule } from '../opex/opex.module';
import { AbstractGrossIncomeService, AbstractOperatingExpenseService } from '../opex/opex.service';
import {GrossIncomeService} from '../services';
import { OpexService } from '../services';

@NgModule({
exports: [OperatingExpensesModule],
providers: [
  { provide: AbstractGrossIncomeService, useClass: GrossIncomeService },
  { provide: AbstractOperatingExpenseService, useClass: OpexService },
]
})

export class OpexFacadeModule { };
