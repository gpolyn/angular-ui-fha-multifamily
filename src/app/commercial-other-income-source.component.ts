import {Component, Input, Output, EventEmitter} from '@angular/core';
import {OtherCommercialIncome} from './other-income';

@Component({
  selector: 'commercial-other-income-source',
  template: require('./commercial-other-income-source.component.html')
})

export class CommercialOtherIncomeSourceComponent {
  @Input() otherIncome: OtherCommercialIncome;
  @Output() onDestroy: EventEmitter<any> = new EventEmitter(false);
  @Output() onSave: EventEmitter<any> = new EventEmitter(false);
  newIncome: boolean = true;

  constructor(){ }

  handleAddClick() {
    if (!this.otherIncome.isValid()) {
      this.otherIncome = new OtherCommercialIncome();
      return;
    }
    this.onSave.emit(this.otherIncome);
    this.newIncome = false;
  }

  handleDestroyClick() {
    this.onDestroy.emit(this.otherIncome.id);
  }

}
