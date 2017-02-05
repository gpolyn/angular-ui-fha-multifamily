import {NgModule} from '@angular/core';
import { FormsModule } from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './containers/app.component';
import {ApartmentIncomeComponent} from './apartment-income.component';
import {ApartmentIncomeSourceComponent} from './apartment-income-source.component';
import {ApartmentIncome} from './apartment-income';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule
  ],
  declarations: [
    AppComponent,
    ApartmentIncomeComponent,
    ApartmentIncomeSourceComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
