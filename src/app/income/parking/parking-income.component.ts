import {Input, ChangeDetectionStrategy, Component, OnInit, OnChanges, Output, Injector, EventEmitter} from '@angular/core';
import { ParkingIncome } from './parking-income';
import { CommercialIncomeService, ResidentialIncomeService } from '../../special.service';
import { Observable } from 'rxjs/Observable';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'parking-income',
  template: require('./parking-income.component.html'),
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class ParkingIncomeComponent implements OnInit {

  @Input() isCommercial: boolean;
	incomes: Observable<ParkingIncome[]>;
  newIncomeForm: FormGroup;
  parkingStyles: string[];
  private incomeService: any;

  constructor(private fb: FormBuilder, private injector: Injector){
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
    console.log("addNewIncome", this.newIncomeForm.value);
    this.incomeService.addIncome(new ParkingIncome(Object.assign(this.newIncomeForm.value, {isCommercial: this.isCommercial})));
    this.newIncomeForm.reset({parkingStyle: this.parkingStyles[0]});
  }

  ngOnChanges(){
    if (this.isCommercial){
      this.incomeService = this.injector.get(CommercialIncomeService); 
    } else {
      this.incomeService = this.injector.get(ResidentialIncomeService);
    }
  }

  ngOnInit() {
		this.incomes = this.incomeService.chincomes$;
    this.createForm();
  }

  handleDestroy(e: any) {
		this.incomeService.removeIncome(e);
  }

}
