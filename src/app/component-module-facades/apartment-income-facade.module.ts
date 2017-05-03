import { NgModule }           from '@angular/core';
import { MyApartmentIncomeService } from '../services';
import { ApartmentIncomeModule, ApartmentIncomeService } from '../income/apartment';


@NgModule({
exports: [ ApartmentIncomeModule],
providers: [
  { provide: ApartmentIncomeService, useClass: MyApartmentIncomeService },
]
})

export class ApartmentIncomeFacadeModule { };
