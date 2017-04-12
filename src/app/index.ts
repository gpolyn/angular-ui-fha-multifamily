import {NgModule} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { OpexService } from './opex.service';
import {OperatingExpensesModule} from './opex/opex.module';

import {AppComponent} from './containers/app.component';

import { OtherIncomeWrapperModule} from './income/other-income-wrapper.module';
import { ParkingIncomeWrapperModule} from './income/parking-income-wrapper.module';

import {ApartmentIncomeModule} from './income/apartment/apartment-income.module';

import {ProjectStatusComponent} from './project-status.component';
import {LocalStorageService} from './localStorage.service';

import {OtherNonParkingResidentialIncomeSourceComponent} from './other-non-parking-residential-income-source.component';
import {OtherResidentialNonParkingIncomeComponent} from './other-residential-non-parking-income.component';

import {CommercialOtherIncomeSourceComponent} from './other-non-parking-commercial-income-source.component';
import {OtherCommercialNonParkingIncomeComponent} from './other-non-parking-commercial-income.component';

import {MSAWaiverComponent} from './msa-waiver.component';

import { DynamicFormComponent }         from './dynamic-form/dynamic-form.component';
import { DynamicFormQuestionComponent } from './dynamic-form/dynamic-form-question.component';
import {HeroDetailComponent1} from './input-and-checkbox/input-and-checkbox.component';
import {CounterInputComponent} from './input-and-checkbox/textfield-and-checkbox.component';
import {ResidentialEffectiveIncomeComponent, CommercialEffectiveIncomeComponent} from './effective-income/effective-income.component';

import {IncomeServiceRevised, CommercialIncomeService, ResidentialIncomeService, IncomeStorageService} from './special.service';
import { LoanCostsService } from './loan-costs.service';
import { MyCommercialParkingIncomeService, MyResidentialParkingIncomeService, MyCommercialOtherIncomeService, MyResidentialOtherIncomeService } from './special.service';

import { BSService } from './bs.service';
import { DI_CONFIG, APP_CONFIG, CURRENT_AUTHOR_ID, GUID } from './app-config';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    OperatingExpensesModule,
    ApartmentIncomeModule, 
    //ParkingIncomeModule,
    ParkingIncomeWrapperModule,
    //OtherIncomeModule,
    OtherIncomeWrapperModule
  ],
  providers: [
    IncomeServiceRevised, 
    CommercialIncomeService, 
    OpexService,
    BSService,
    MyResidentialParkingIncomeService,
    MyCommercialParkingIncomeService,
    MyResidentialOtherIncomeService,
    LocalStorageService,
    LoanCostsService,
    MyCommercialOtherIncomeService,
    { provide: APP_CONFIG, useValue: DI_CONFIG },
    { provide: CURRENT_AUTHOR_ID, useValue: GUID},
    ResidentialIncomeService,
    IncomeStorageService
    ],
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
    CommercialEffectiveIncomeComponent,
    ResidentialEffectiveIncomeComponent,
    DynamicFormComponent, DynamicFormQuestionComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
