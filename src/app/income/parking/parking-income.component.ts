import {Input, ChangeDetectionStrategy, Component, OnInit, OnChanges, Output, EventEmitter} from '@angular/core';
import { ParkingIncome } from './parking-income';
import { IncomeServiceRevised } from '../../special.service';
import { Observable } from 'rxjs/Observable';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'parking-income',
  template: require('./parking-income.component.html'),
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class ParkingIncomeComponent implements OnInit {

  @Input() isCommercial: boolean;
  @Output() incomeChange = new EventEmitter<any>();
	incomes: Observable<ParkingIncome[]>;
  newIncomeForm: FormGroup;
  parkingStyles: string[];

  constructor(private fb: FormBuilder, private incomeService: IncomeServiceRevised){
  }

  createForm() {

		const newParkingIncome = new ParkingIncome(true);
		this.parkingStyles = [ParkingIncome.INDOOR, ParkingIncome.OUTDOOR]

    this.newIncomeForm = this.fb.group({
      spaces: newParkingIncome.spaces,
      squareFeet: newParkingIncome.squareFeet,
      parkingStyle: this.parkingStyles[0],
      monthlyFee: newParkingIncome.monthlyFee
    });

  }

  addNewIncome(){
    this.incomeService.addIncome(<ParkingIncome>this.newIncomeForm.value);
    this.newIncomeForm.reset({parkingStyle: this.parkingStyles[0]});
  }


  ngOnInit() {
		this.incomes = this.incomeService.chincomes$;
    this.createForm();
  }

  handleDestroy(e: any) {
		this.incomeService.removeIncome(e);
  }

}
