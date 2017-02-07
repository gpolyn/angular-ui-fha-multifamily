import {Component, Input, Output, EventEmitter} from '@angular/core';
import {OtherCommercialIncome} from './other-income';
import {OtherNonParkingIncomeSourceComponent} from './other-non-parking-income-source.component';

@Component({
  selector: 'other-non-parking-commercial-income-source',
  template: require('./other-income-source.component.html')
})

export class CommercialOtherIncomeSourceComponent extends OtherNonParkingIncomeSourceComponent<OtherCommercialIncome> {

  constructor(){ super(); }

  handleAddClick() {
    if (!this.otherIncome.isValid()) {
      this.otherIncome = new OtherCommercialIncome();
      return;
    }
    this.onSave.emit(this.otherIncome);
    this.newIncome = false;
  }

}
