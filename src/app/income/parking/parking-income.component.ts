import {Input, Inject, ChangeDetectionStrategy, Component, OnInit, OnChanges, Output, Injector, EventEmitter} from '@angular/core';
import { ParkingIncome, IParkingIncome } from './parking-income';
//import { CommercialIncomeService, ResidentialIncomeService } from '../../special.service';
import { CommercialIncomeService, ResidentialIncomeService } from './parking-income.service';
import { Observable } from 'rxjs/Observable';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PARKING_INC_CONFIG } from './config';

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

  constructor(private fb: FormBuilder, private injector: Injector, @Inject(PARKING_INC_CONFIG) private config: IParkingIncome){
  }

  createForm() {

		this.parkingStyles = [ParkingIncome.INDOOR, ParkingIncome.OUTDOOR]
    this.newIncomeForm = this.fb.group(this.config);

  }

  addNewIncome(){
    console.log("addNewIncome", this.newIncomeForm.value);
    this.incomeService.addIncome(new ParkingIncome(this.newIncomeForm.value));
    this.newIncomeForm.reset(this.config);
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
