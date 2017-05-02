import {NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OperatingExpensesService } from './opex.service';
import { OperatingExpensesComponent } from './opex.component';

@NgModule({
  imports: [ 
    CommonModule, 
    FormsModule, 
    ReactiveFormsModule
  ],
  declarations: [
    OperatingExpensesComponent
  ],
  providers: [
    OperatingExpensesService
  ],
  exports: [
    OperatingExpensesComponent
  ]
})

export class OperatingExpensesModule { }
