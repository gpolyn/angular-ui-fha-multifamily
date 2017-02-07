import {Component, Input, Output, EventEmitter} from '@angular/core';
import {ResidentialParkingIncome} from './parking-income';

@Component({
  selector: 'parking-residential-income-source',
  template: require('./parking-income-source.component.html')
})

export class ParkingResidentialIncomeSourceComponent {

  @Input() parkingIncome: ResidentialParkingIncome;
  @Output() onDestroy: EventEmitter<any> = new EventEmitter(false);
  @Output() onSave: EventEmitter<any> = new EventEmitter(false);
  newIncome: boolean = true;

  handleAddClick() {
  
    if (!this.parkingIncome.isValid()) {
      this.parkingIncome = new ResidentialParkingIncome();
      return;
    }

    this.onSave.emit(this.parkingIncome);
    this.newIncome = false;
  }

  handleDestroyClick() {
    this.onDestroy.emit(this.parkingIncome.id);
  }

}
