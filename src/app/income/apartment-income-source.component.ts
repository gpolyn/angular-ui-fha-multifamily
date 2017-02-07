import {Component, Input, Output, EventEmitter} from '@angular/core';
import {ApartmentIncome} from './apartment-income';

@Component({
  selector: 'apartment-income-source',
  template: require('./apartment-income-source.component.html')
})

export class ApartmentIncomeSourceComponent {
  @Input() apartmentIncome: ApartmentIncome;
  @Output() onDestroy: EventEmitter<any> = new EventEmitter(false);
  @Output() onSave: EventEmitter<any> = new EventEmitter(false);
  newApartmentIncome: boolean = true;

  constructor(){
    if (this.apartmentIncome && this.apartmentIncome.id){
      console.log("apartment income is not new", this.apartmentIncome)
    }
  }

  handleAddClick() {
    console.log('ApartmentIncomeSourceComponent#handleAddClick')
    if (!this.apartmentIncome.isValid()) {
      this.apartmentIncome = null;
      this.apartmentIncome = new ApartmentIncome(0);
      return;
    }
    console.log('totalMonthly apartment income', this.apartmentIncome.totalMonthlyIncome())
    this.onSave.emit(this.apartmentIncome);
    this.newApartmentIncome = false;
  }

  handleDestroyClick() {
    console.log('ApartmentIncomeSourceComponent#handleDestroy')
    this.onDestroy.emit(this.apartmentIncome.id);
  }

}
