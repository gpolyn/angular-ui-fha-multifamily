import {Component, Input, Output, EventEmitter} from '@angular/core';
import {OtherResidentialIncome} from './other-income';

@Component({
  selector: 'other-residential-income-source',
  template: require('./other-income-source.component.html')
})

export class OtherResidentialIncomeSourceComponent {
  @Input() otherIncome: OtherResidentialIncome;
  @Output() onDestroy: EventEmitter<any> = new EventEmitter(false);
  @Output() onSave: EventEmitter<any> = new EventEmitter(false);
  newIncome: boolean = true;

  constructor(){ }

  handleAddClick() {
    console.log('otherIncomeSourceComponent#handleAddClick')
    if (!this.otherIncome.isValid()) {
      this.otherIncome = null;
      this.otherIncome = new OtherResidentialIncome();
      return;
    }
    console.log('totalMonthly other income', this.otherIncome.totalMonthlyIncome())
    this.onSave.emit(this.otherIncome);
    this.newIncome = false;
  }

  handleDestroyClick() {
    console.log('otherIncomeSourceComponent#handleDestroy')
    this.onDestroy.emit(this.otherIncome.id);
  }

}
