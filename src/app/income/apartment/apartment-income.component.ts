import { Inject, ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { IApartmentIncome } from './apartment-income';
import { ApartmentIncomeService } from './income.service';
import { Observable } from 'rxjs/Observable';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { APARTMENT_INC_CONFIG } from './config';
import style from './style';

class ApartmentIncome implements IApartmentIncome {

  bedrooms: number | string;
  units: number;
  squareFeet?: number;
  monthlyRent: number;
  totalMonthlyIncome: number;

  constructor(options: {
    squareFeet?: string, 
    units: string,
    bedrooms: string,
    monthlyRent: string}){
    console.log('new apartment', options);

    if (options.squareFeet){
      this.squareFeet = Number(options.squareFeet);
    }
    this.monthlyRent = options.monthlyRent && Number(options.monthlyRent);
    this.bedrooms = options.bedrooms && Number(options.bedrooms);
    this.units = options.units && Number(options.units);
    this.totalMonthlyIncome = this.units * this.monthlyRent;
  }

}

@Component({
  selector: 'apartment-income',
  template: require('./apartment-income.component.html'),
  //styles: [require('./apartment-income.css').toString()],
  styles: [style],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers:[FormBuilder]
})

export class ApartmentIncomeComponent<T extends IApartmentIncome> implements OnInit { 

  newIncomeForm: FormGroup;
  incomes: Observable<Array<IApartmentIncome>>;
  private readonly bedroomCounts: Array<number> = [0,1,2,3,4];
  private config: IApartmentIncome;

  constructor( private incomeService: ApartmentIncomeService, @Inject(APARTMENT_INC_CONFIG) cfg: T, private fb: FormBuilder){
    this.config = cfg;
  }

  private createForm() {
    const validatedRent = {monthlyRent: [this.config.monthlyRent, [Validators.required]]};
    const validatedUnits = {units: [this.config.units, [Validators.required]]};
    this.newIncomeForm = this.fb.group({...this.config, validatedRent, validatedUnits});
  }

  addClick(){

    if (this.newIncomeForm.valid){
      const formVals = this.newIncomeForm.value;
      this.incomeService.addIncome(new ApartmentIncome(this.newIncomeForm.value));
    }

    this.newIncomeForm.reset(this.config);
  }

  ngOnInit() {
    this.incomes = this.incomeService.chincomes$;
    this.createForm();
  }

  handleDestroy(e: T) {
		this.incomeService.removeIncome(e);
  }

}

