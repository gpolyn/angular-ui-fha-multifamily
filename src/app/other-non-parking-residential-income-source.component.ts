import {Component, Input, Output, EventEmitter} from '@angular/core';
import {OtherResidentialIncome} from './other-income';
//import {OtherNonParkingIncomeSourceComponent} from './other-non-parking-income-source-component';

@Component({
  selector: 'other-non-parking-residential-income-source',
  template: require('./other-income-source.component.html')
})

export class OtherNonParkingResidentialIncomeSourceComponent {

  @Input() otherIncome: OtherResidentialIncome;
  @Output() onDestroy: EventEmitter<any> = new EventEmitter(false);
  @Output() onSave: EventEmitter<any> = new EventEmitter(false);
  newIncome: boolean = true;

  constructor(){}

  handleDestroyClick() {
    this.onDestroy.emit(this.otherIncome.id);
  }

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
