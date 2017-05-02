import {NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { OpexService } from './opex.service';
import {ProjectCharacteristicsModule} from './project-characteristics/project-characteristics.module';

import {AppComponent} from './containers/app.component';

import { InputAndCheckboxModule} from './input-and-checkbox';
import { OtherIncomeWrapperModule} from './income/other-income-wrapper.module';
import { ApartmentIncomeFacadeModule} from './income/apartment-income-facade.module';
import { EffectiveIncomeFacadeModule, OpexFacadeModule} from './component-module-facades';
import { ParkingIncomeWrapperModule} from './income/parking-income-wrapper.module';

import {LocalStorageService} from './localStorage.service';

import { LoanCharacteristicsModule }         from './loan-characteristics/loan-characteristics.module';
import {HeroDetailComponent1} from './input-and-checkbox/input-and-checkbox.component';
import {CounterInputComponent} from './input-and-checkbox/textfield-and-checkbox.component';

import { CommercialIncomeService, ResidentialIncomeService, GrossIncomeService, ResidentialIncomeServiceBridge, CommercialIncomeServiceBridge } from './special.service';
import { LoanCostsService } from './loan-costs.service';
import { ProjectCharacteristicsService } from './project-characteristics.service';
import { MyCommercialParkingIncomeService, MyResidentialParkingIncomeService, MyCommercialOtherIncomeService, MyResidentialOtherIncomeService, MyApartmentIncomeService } from './special.service';

import { DI_CONFIG, APP_CONFIG, CURRENT_AUTHOR_ID, GUID } from './app-config';

@NgModule({
  imports: [
    BrowserModule,
    //FormsModule,
    //ReactiveFormsModule,
    ProjectCharacteristicsModule,
    ParkingIncomeWrapperModule,
    ApartmentIncomeFacadeModule,
    EffectiveIncomeFacadeModule,
    OpexFacadeModule,
    LoanCharacteristicsModule,
    OtherIncomeWrapperModule
  ],
  providers: [
    GrossIncomeService,
    MyApartmentIncomeService,
    CommercialIncomeService, 
    OpexService,
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
    AppComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
