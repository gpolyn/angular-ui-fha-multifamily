import {NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DynamicFormComponent } from './dynamic-form.component';
import { DynamicFormQuestionComponent } from './dynamic-form-question.component';
import { INITIAL_CONFIG, LOAN_COSTS_CONFIG} from './config';

@NgModule({
  imports: [ 
    CommonModule, 
    FormsModule, 
    ReactiveFormsModule
  ],
  providers: [
    { provide: LOAN_COSTS_CONFIG, useValue: INITIAL_CONFIG }
  ],
  declarations: [
    DynamicFormComponent,
    DynamicFormQuestionComponent
  ],
  exports: [
    DynamicFormComponent,
    DynamicFormQuestionComponent
  ]
})

export class LoanCharacteristicsModule { }
