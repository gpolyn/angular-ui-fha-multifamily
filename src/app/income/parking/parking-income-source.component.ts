import {Component, Input, Output, EventEmitter} from '@angular/core';
import { ParkingIncome } from './parking-income';

@Component({
  selector: 'parking-income-source',
  template: require('./parking-income-source.component.html')
})

export class ParkingIncomeSourceComponent {

  @Input() parkingIncome: ParkingIncome;
  @Input() isCommercial: boolean;
  @Output() onDestroy: EventEmitter<any> = new EventEmitter(false);
  @Output() onSave: EventEmitter<any> = new EventEmitter(false);
  newIncome: boolean = true;

  constructor(){}

  handleAddClick() {
  
    if (!this.parkingIncome.isValid()) {
      this.parkingIncome = new ParkingIncome(this.isCommercial);
      return;
    }

    this.onSave.emit(this.parkingIncome);
    this.newIncome = false;
  }

  handleDestroyClick() {
    this.onDestroy.emit(this.parkingIncome.id);
  }

}
