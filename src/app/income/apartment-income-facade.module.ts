import { NgModule }           from '@angular/core';
import { ApartmentIncomeModule } from './apartment/apartment-income.module';
import { MyApartmentIncomeService } from '../special.service';
import { ApartmentIncomeService } from './apartment/income.service';


@NgModule({
exports: [ ApartmentIncomeModule],
providers: [
  { provide: ApartmentIncomeService, useClass: MyApartmentIncomeService },
]
})

export class ApartmentIncomeFacadeModule { };
