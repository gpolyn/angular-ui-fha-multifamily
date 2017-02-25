import {NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {ResidentialOtherIncomeComponent, CommercialOtherIncomeComponent} from './other-income.component';
import {OtherIncomeSourceComponent} from './other-income-source.component';
import { INITIAL_OTHER_INCOME_CONFIG, OTHER_INC_CONFIG } from './other-income';

@NgModule({
  imports: [ CommonModule, FormsModule, ReactiveFormsModule],
  declarations: [
    OtherIncomeSourceComponent,
    ResidentialOtherIncomeComponent,
    CommercialOtherIncomeComponent
  ],
  providers: [
    { provide: OTHER_INC_CONFIG, useValue: INITIAL_OTHER_INCOME_CONFIG },
  ],
  exports: [
    ResidentialOtherIncomeComponent,
    CommercialOtherIncomeComponent,
  ]
})

export class OtherIncomeModule { }
