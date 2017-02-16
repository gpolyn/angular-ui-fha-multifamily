import { Component, Input, OnInit, OnChanges, EventEmitter, Output }       from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ParkingIncome } from './parking-income';

@Component({
  selector: 'new-parking-income',
  template: require('./new-parking-income.component.html')
})
export class NewParkingIncomeComponent implements OnChanges {
  @Input() parkingIncome: any;
	@Output() onAdd: EventEmitter<any> = new EventEmitter(false);
  newIncomeForm: FormGroup;
  parkingStyles: string[];

  constructor( private fb: FormBuilder) {
    console.log("parkingIncome", this.parkingIncome)
  }

  OnInit(){
		this.parkingStyles = [ParkingIncome.INDOOR, ParkingIncome.OUTDOOR]
    this.createForm();
  }

  createForm() {
    this.newIncomeForm = this.fb.group({
      spaces: 0,
      squareFeet: 0,
      monthlyFee: 0
    });

    //		this.newIncomeForm.patchValue({style: this.parkingStyles[0]});
  }

  ngOnChanges() {
    /*
    this.heroForm.reset({
      name: this.hero.name
    });
    */
  }

  handleSave() {
		this.onAdd.emit(this.newIncomeForm.value);
    this.ngOnChanges();
  }

  revert() { this.ngOnChanges(); }

}

