import {NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {ApartmentIncomeComponent} from './apartment-income.component';
import {ApartmentIncomeSourceComponent} from './apartment-income-source.component';
//import {ProjectStatusComponent} from './project-status.component';

@NgModule({
  imports: [ CommonModule, FormsModule],
  declarations: [
    ApartmentIncomeSourceComponent,
    ApartmentIncomeComponent,
    //   ProjectStatusComponent
  ],
  exports: [
    ApartmentIncomeSourceComponent,
    ApartmentIncomeComponent,
    //ProjectStatusComponent
  ],
})

export class ApartmentIncomeModule { }
