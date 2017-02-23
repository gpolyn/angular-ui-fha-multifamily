import { NgModule }           from '@angular/core';

import { ParkingIncomeModule} from './parking/parking-income.module';
import { MyCommercialParkingIncomeService, MyResidentialParkingIncomeService } from '../special.service';
import { ResidentialIncomeService, CommercialIncomeService } from './parking/parking-income.service';

@NgModule({
exports: [ ParkingIncomeModule],
providers: [
  { provide: ResidentialIncomeService, useClass: MyResidentialParkingIncomeService },
  { provide: CommercialIncomeService, useClass: MyCommercialParkingIncomeService },
]
})

export class ParkingIncomeWrapperModule { };
