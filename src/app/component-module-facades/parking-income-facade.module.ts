import { NgModule }           from '@angular/core';
import { MyCommercialParkingIncomeService, MyResidentialParkingIncomeService } from '../services';
import { AbstractResidentialParkingIncomeService, AbstractCommercialParkingIncomeService, ParkingIncomeModule } from '../components';

@NgModule({
exports: [ ParkingIncomeModule],
providers: [
  { provide: AbstractResidentialParkingIncomeService, useClass: MyResidentialParkingIncomeService },
  { provide: AbstractCommercialParkingIncomeService, useClass: MyCommercialParkingIncomeService },
]
})

export class ParkingIncomeFacadeModule { };
