import { NgModule }           from '@angular/core';
//import { ApartmentIncomeModule } from './apartment/apartment-income.module';
import { MyApartmentIncomeService } from '../services';
//import { ApartmentIncomeService } from './apartment/income.service';
import { ApartmentIncomeModule, ApartmentIncomeService } from './apartment';
//import { ApartmentIncomeService } from './apartment/income.service';


@NgModule({
exports: [ ApartmentIncomeModule],
providers: [
  { provide: ApartmentIncomeService, useClass: MyApartmentIncomeService },
]
})

export class ApartmentIncomeFacadeModule { };
