import {Component, Input, Output, EventEmitter} from '@angular/core';
import {OtherResidentialIncome} from './other-income';
import {OtherNonParkingIncomeSourceComponent} from './other-non-parking-income-source.component';

@Component({
  selector: 'other-non-parking-residential-income-source',
  template: require('./other-income-source.component.html')
})

export class OtherNonParkingResidentialIncomeSourceComponent extends OtherNonParkingIncomeSourceComponent<OtherResidentialIncome> {

  constructor(){super();}

  handleAddClick() {
  
    if (!this.otherIncome.isValid()) {
      this.otherIncome = null;
      this.otherIncome = new OtherResidentialIncome();
      return;
    }

    this.onSave.emit(this.otherIncome);
    this.newIncome = false;
  }

}