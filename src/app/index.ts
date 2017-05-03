import {NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {AppComponent} from './containers/app.component';
import { OtherIncomeFacadeModule, ApartmentIncomeFacadeModule, EffectiveIncomeFacadeModule, OpexFacadeModule } from './component-module-facades';
import { ParkingIncomeFacadeModule} from './component-module-facades';
import { LoanCharacteristicsModule, ProjectCharacteristicsModule}         from './components';

import { CommercialIncomeService, 
         ResidentialIncomeService, 
         GrossIncomeService, 
         ResidentialIncomeServiceBridge, 
         CommercialIncomeServiceBridge, 
         LocalStorageService, 
         LoanCostsService, 
         ProjectCharacteristicsService, 
         OpexService, 
         MyCommercialParkingIncomeService, 
         MyResidentialParkingIncomeService, 
         MyCommercialOtherIncomeService, 
         MyResidentialOtherIncomeService, 
         MyApartmentIncomeService } from './services';

import { DI_CONFIG, APP_CONFIG, CURRENT_AUTHOR_ID, GUID } from './config';

@NgModule({
  imports: [
    BrowserModule,
    //FormsModule,
    //ReactiveFormsModule,
    ProjectCharacteristicsModule,
    ParkingIncomeFacadeModule,
    ApartmentIncomeFacadeModule,
    EffectiveIncomeFacadeModule,
    OpexFacadeModule,
    LoanCharacteristicsModule,
    OtherIncomeFacadeModule
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
