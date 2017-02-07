import {NgModule} from '@angular/core';
import { FormsModule } from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './containers/app.component';

import {ApartmentIncomeComponent} from './apartment-income.component';
import {ApartmentIncomeSourceComponent} from './apartment-income-source.component';

import {OtherNonParkingResidentialIncomeSourceComponent} from './other-non-parking-residential-income-source.component';
import {OtherResidentialNonParkingIncomeComponent} from './other-residential-non-parking-income.component';

import {CommercialOtherIncomeSourceComponent} from './other-non-parking-commercial-income-source.component';
import {OtherCommercialNonParkingIncomeComponent} from './other-non-parking-commercial-income.component';

import {ParkingIncomeComponent} from './parking-income.component';
import {ParkingIncomeSourceComponent} from './parking-income-source.component';

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
    CommercialOtherIncomeSourceComponent,
    OtherCommercialNonParkingIncomeComponent,
    ParkingIncomeSourceComponent,
    ParkingIncomeComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
