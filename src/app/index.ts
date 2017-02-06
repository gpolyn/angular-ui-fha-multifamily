import {NgModule} from '@angular/core';
import { FormsModule } from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './containers/app.component';

import {ApartmentIncomeComponent} from './apartment-income.component';
import {ApartmentIncomeSourceComponent} from './apartment-income-source.component';

import {OtherNonParkingResidentialIncomeSourceComponent} from './other-non-parking-residential-income-source.component';
import {OtherResidentialNonParkingIncomeComponent} from './other-residential-non-parking-income.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule
  ],
  declarations: [
    AppComponent,
    ApartmentIncomeComponent,
    ApartmentIncomeSourceComponent,
    OtherNonParkingResidentialIncomeSourceComponent,
    OtherResidentialNonParkingIncomeComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
