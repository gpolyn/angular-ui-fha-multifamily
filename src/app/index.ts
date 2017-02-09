import {NgModule} from '@angular/core';
import { FormsModule } from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './containers/app.component';

import {ApartmentIncomeModule} from './income/apartment/apartment-income.module'

import {ParkingIncomeModule} from './income/parking/parking-income.module'

import {ProjectCharacteristicsModule} from './project-characteristics/project-characteristics.module'

import {ProjectStatusComponent} from './project-status.component'

import {OtherNonParkingResidentialIncomeSourceComponent} from './other-non-parking-residential-income-source.component';
import {OtherResidentialNonParkingIncomeComponent} from './other-residential-non-parking-income.component';

import {CommercialOtherIncomeSourceComponent} from './other-non-parking-commercial-income-source.component';
import {OtherCommercialNonParkingIncomeComponent} from './other-non-parking-commercial-income.component';

import {MSAWaiverComponent} from './msa-waiver.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ApartmentIncomeModule, ParkingIncomeModule,
    //    ProjectCharacteristicsModule
  ],
  declarations: [
    AppComponent,
    OtherNonParkingResidentialIncomeSourceComponent,
    OtherResidentialNonParkingIncomeComponent,
    CommercialOtherIncomeSourceComponent,
    OtherCommercialNonParkingIncomeComponent,
    MSAWaiverComponent,
    ProjectStatusComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
