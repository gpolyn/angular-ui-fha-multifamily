import {Component, Input, Output, EventEmitter} from '@angular/core';
import {CommercialParkingIncome} from './parking-income';

@Component({
  selector: 'parking-commercial-income-source',
  template: require('./parking-income-source.component.html')
})

export class ParkingCommercialIncomeSourceComponent {

  @Input() parkingIncome: CommercialParkingIncome;
  @Output() onDestroy: EventEmitter<any> = new EventEmitter(false);
  @Output() onSave: EventEmitter<any> = new EventEmitter(false);
  newIncome: boolean = true;

  handleAddClick() {
  
    if (!this.parkingIncome.isValid()) {
      this.parkingIncome = new CommercialParkingIncome();
      return;
    }

    this.onSave.emit(this.parkingIncome);
    this.newIncome = false;
  }

  handleDestroyClick() {
    this.onDestroy.emit(this.parkingIncome.id);
  }

}
