import {NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {ParkingIncomeComponent} from './parking-income.component';
import {ParkingIncomeSourceComponent} from './parking-income-source.component';

@NgModule({
  imports: [ CommonModule, FormsModule],
  declarations: [
    ParkingIncomeSourceComponent,
    ParkingIncomeComponent
  ],
  exports: [
    ParkingIncomeSourceComponent,
    ParkingIncomeComponent
  ],
})

export class ParkingIncomeModule { }
