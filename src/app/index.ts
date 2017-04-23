import {NgModule} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { OpexService } from './opex.service';
import { ApartmentIncomeService } from './apartment-income.service';
import {ProjectCharacteristicsModule} from './project-characteristics/project-characteristics.module';

import {AppComponent} from './containers/app.component';

import { OtherIncomeWrapperModule} from './income/other-income-wrapper.module';
import { ApartmentIncomeFacadeModule} from './income/apartment-income-facade.module';
import { EffectiveIncomeFacadeModule} from './effective-income-facade.module';
import { ParkingIncomeWrapperModule} from './income/parking-income-wrapper.module';
import { OpexFacadeModule } from './opex-facade.module';

import {ApartmentIncomeModule} from './income/apartment/apartment-income.module';

//import {ProjectStatusComponent} from './project-characteristics/project-status.component';
import {LocalStorageService} from './localStorage.service';

import {OtherNonParkingResidentialIncomeSourceComponent} from './other-non-parking-residential-income-source.component';
import {OtherResidentialNonParkingIncomeComponent} from './other-residential-non-parking-income.component';

import {CommercialOtherIncomeSourceComponent} from './other-non-parking-commercial-income-source.component';
import {OtherCommercialNonParkingIncomeComponent} from './other-non-parking-commercial-income.component';

//import {MSAWaiverComponent} from './msa-waiver.component';

import { DynamicFormComponent }         from './dynamic-form/dynamic-form.component';
import { DynamicFormQuestionComponent } from './dynamic-form/dynamic-form-question.component';
import {HeroDetailComponent1} from './input-and-checkbox/input-and-checkbox.component';
import {CounterInputComponent} from './input-and-checkbox/textfield-and-checkbox.component';

import { CommercialIncomeService, ResidentialIncomeService, GrossIncomeService, ResidentialIncomeServiceBridge, CommercialIncomeServiceBridge } from './special.service';
import { LoanCostsService } from './loan-costs.service';
import { ProjectCharacteristicsService } from './project-characteristics.service';
import { MyCommercialParkingIncomeService, MyResidentialParkingIncomeService, MyCommercialOtherIncomeService, MyResidentialOtherIncomeService, MyApartmentIncomeService } from './special.service';

import { BSService } from './bs.service';
import { DI_CONFIG, APP_CONFIG, CURRENT_AUTHOR_ID, GUID } from './app-config';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    ApartmentIncomeModule, 
    ProjectCharacteristicsModule,
    ParkingIncomeWrapperModule,
    ApartmentIncomeFacadeModule,
    EffectiveIncomeFacadeModule,
    OpexFacadeModule,
    OtherIncomeWrapperModule
  ],
  providers: [
    GrossIncomeService,
    ApartmentIncomeService,
    MyApartmentIncomeService,
    CommercialIncomeService, 
    OpexService,
    BSService,
    MyResidentialParkingIncomeService,
    MyCommercialParkingIncomeService,
    MyResidentialOtherIncomeService,
    LocalStorageService,
    LoanCostsService,
    ProjectCharacteristicsService,
    MyCommercialOtherIncomeService,
    { provide: APP_CONFIG, useValue: DI_CONFIG },
    { provide: CURRENT_AUTHOR_ID, useValue: GUID},
    ResidentialIncomeService,
    ResidentialIncomeServiceBridge,
    CommercialIncomeServiceBridge,
    ],
  declarations: [
    AppComponent,
    OtherNonParkingResidentialIncomeSourceComponent,
    OtherResidentialNonParkingIncomeComponent,
    CommercialOtherIncomeSourceComponent,
    OtherCommercialNonParkingIncomeComponent,
    //MSAWaiverComponent,
    //ProjectStatusComponent,
    HeroDetailComponent1,
    CounterInputComponent,
    DynamicFormComponent, DynamicFormQuestionComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
