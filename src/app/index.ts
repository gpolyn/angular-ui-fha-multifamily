import {NgModule} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

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

import { DynamicFormComponent }         from './dynamic-form/dynamic-form.component';
import { DynamicFormQuestionComponent } from './dynamic-form/dynamic-form-question.component';
import {HeroDetailComponent1} from './input-and-checkbox/input-and-checkbox.component';
import {CounterInputComponent} from './input-and-checkbox/textfield-and-checkbox.component';
import {EffectiveIncomeComponent} from './effective-income/effective-income.component';

import {NOIComponent} from './noi/noi.component';
import {IncomeServiceRevised} from './special.service';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    ApartmentIncomeModule, ParkingIncomeModule,
    //    ProjectCharacteristicsModule
  ],
  providers: [IncomeServiceRevised],
  declarations: [
    AppComponent,
    OtherNonParkingResidentialIncomeSourceComponent,
    OtherResidentialNonParkingIncomeComponent,
    CommercialOtherIncomeSourceComponent,
    OtherCommercialNonParkingIncomeComponent,
    MSAWaiverComponent,
    ProjectStatusComponent,
    HeroDetailComponent1,
    CounterInputComponent,
    EffectiveIncomeComponent,
    NOIComponent,
    DynamicFormComponent, DynamicFormQuestionComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
