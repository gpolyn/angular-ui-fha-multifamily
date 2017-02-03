import {NgModule} from '@angular/core';
import { FormsModule } from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';

import {HelloComponent} from './hello';
import {ApartmentIncomeComponent} from './apartment-income.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule
  ],
  declarations: [
    HelloComponent,
    ApartmentIncomeComponent,
  ],
  bootstrap: [ApartmentIncomeComponent]
})
export class AppModule {}
