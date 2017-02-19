import {NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {ApartmentIncomeComponent} from './apartment-income.component';
import {ApartmentIncomeSourceComponent} from './apartment-income-source.component';

@NgModule({
  imports: [ CommonModule, FormsModule],
  declarations: [
    ApartmentIncomeSourceComponent,
    ApartmentIncomeComponent,
  ],
  exports: [
    ApartmentIncomeSourceComponent,
    ApartmentIncomeComponent,
  ],
})

export class ApartmentIncomeModule { };
