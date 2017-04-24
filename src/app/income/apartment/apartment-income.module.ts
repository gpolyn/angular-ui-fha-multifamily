import {NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { INITIAL_CONFIG, APARTMENT_INC_CONFIG } from './config/config';
import {ApartmentIncomeComponent} from './components/apartment-income.component';
import {ApartmentIncomeSourceComponent} from './components/apartment-income-source.component';

@NgModule({
  imports: [ CommonModule, FormsModule, ReactiveFormsModule],
  declarations: [
    ApartmentIncomeSourceComponent,
    ApartmentIncomeComponent,
  ],
  providers: [
  { provide: APARTMENT_INC_CONFIG, useValue: INITIAL_CONFIG }
  ],
  exports: [
    ApartmentIncomeSourceComponent,
    ApartmentIncomeComponent,
  ],
})

export class ApartmentIncomeModule { };
