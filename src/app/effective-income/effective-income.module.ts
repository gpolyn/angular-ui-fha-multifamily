import {NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { ResidentialEffectiveIncomeComponent, CommercialEffectiveIncomeComponent } from './effective-income.component';

@NgModule({
  imports: [ 
    CommonModule, 
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [
    ResidentialEffectiveIncomeComponent,
    CommercialEffectiveIncomeComponent
  ],
  providers: [ ],
  exports: [
    ResidentialEffectiveIncomeComponent,
    CommercialEffectiveIncomeComponent
  ]
})

export class EffectiveIncomeModule { }
