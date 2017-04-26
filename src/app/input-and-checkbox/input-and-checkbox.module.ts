import {NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeroDetailComponent1 } from './input-and-checkbox.component';
import { CounterInputComponent } from './textfield-and-checkbox.component';

@NgModule({
  imports: [ 
    CommonModule, 
    FormsModule, 
    ReactiveFormsModule
  ],
  declarations: [
    HeroDetailComponent1,
    CounterInputComponent
  ],
  exports: [
    HeroDetailComponent1,
    CounterInputComponent
  ]
})

export class InputAndCheckboxModule { }
