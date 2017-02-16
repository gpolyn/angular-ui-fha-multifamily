import {NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {ParkingIncomeComponent} from './parking-income.component';
import {ParkingIncomeSourceComponent} from './parking-income-source.component';
import {NewParkingIncomeComponent} from './new-parking-income.component';

@NgModule({
  imports: [ CommonModule, FormsModule, ReactiveFormsModule],
  declarations: [
    ParkingIncomeSourceComponent,
    NewParkingIncomeComponent,
    ParkingIncomeComponent
  ],
  exports: [
    ParkingIncomeSourceComponent,
    NewParkingIncomeComponent,
    ParkingIncomeComponent
  ],
})

export class ParkingIncomeModule { }
