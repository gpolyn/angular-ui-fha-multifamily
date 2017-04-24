import { NgModule }           from '@angular/core';
import { MyCommercialParkingIncomeService, MyResidentialParkingIncomeService } from '../special.service';
import { ResidentialIncomeService, CommercialIncomeService, ParkingIncomeModule } from './parking';

@NgModule({
exports: [ ParkingIncomeModule],
providers: [
  { provide: ResidentialIncomeService, useClass: MyResidentialParkingIncomeService },
  { provide: CommercialIncomeService, useClass: MyCommercialParkingIncomeService },
]
})

export class ParkingIncomeWrapperModule { };
