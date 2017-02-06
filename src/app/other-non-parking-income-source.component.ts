import { Input, Output, EventEmitter} from '@angular/core';
import {OtherIncome} from './other-income';

export abstract class OtherNonParkingIncomeSourceComponent <T extends OtherIncome> {
  @Input() otherIncome: T;
  @Output() onDestroy: EventEmitter<any> = new EventEmitter(false);
  @Output() onSave: EventEmitter<any> = new EventEmitter(false);
  newIncome: boolean = true;

  handleDestroyClick() {
    this.onDestroy.emit(this.otherIncome.id);
  }

}
