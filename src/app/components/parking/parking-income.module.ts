import {NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {ResidentialParkingIncomeComponent, CommercialParkingIncomeComponent} from './components/parking-income.component';
import {ParkingIncomeSourceComponent} from './components/parking-income-source.component';
import { INITIAL_CONFIG, PARKING_INC_CONFIG } from './config/config';

@NgModule({
  imports: [ CommonModule, FormsModule, ReactiveFormsModule],
  declarations: [
    ResidentialParkingIncomeComponent,
    CommercialParkingIncomeComponent,
    ParkingIncomeSourceComponent
  ],
  providers: [
  { provide: PARKING_INC_CONFIG, useValue: INITIAL_CONFIG }
  ],
  exports: [
    ResidentialParkingIncomeComponent,
    CommercialParkingIncomeComponent,
    ParkingIncomeSourceComponent
  ],
})

export class ParkingIncomeModule { }
