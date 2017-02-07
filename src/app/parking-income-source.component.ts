import {Component, Input, Output, EventEmitter} from '@angular/core';
import {ParkingIncomeService} from './parking-income.service';
import { ParkingIncome, CommercialParkingIncome, ResidentialParkingIncome } from './parking-income';

@Component({
  selector: 'parking-income-source',
	providers: [ParkingIncomeService],
  template: require('./parking-income-source.component.html')
})

export class ParkingIncomeSourceComponent {

  @Input() parkingIncome: ParkingIncome;
  @Input() isCommercial: boolean;
  @Output() onDestroy: EventEmitter<any> = new EventEmitter(false);
  @Output() onSave: EventEmitter<any> = new EventEmitter(false);
  newIncome: boolean = true;

  constructor(private parkingIncomeService: ParkingIncomeService){}

  handleAddClick() {
  
    if (!this.parkingIncome.isValid()) {
      this.parkingIncome = this.parkingIncomeService.getNewIncome(this.isCommercial);
      return;
    }

    this.onSave.emit(this.parkingIncome);
    this.newIncome = false;
  }

  handleDestroyClick() {
    this.onDestroy.emit(this.parkingIncome.id);
  }

}
