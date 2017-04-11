import { ViewEncapsulation, Inject, ChangeDetectionStrategy, Component, OnInit, OnChanges } from '@angular/core';
import { IOtherIncome } from './other-income';
import { ResidentialIncomeService, CommercialIncomeService } from './other-income.service';
import { Observable } from 'rxjs/Observable';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OTHER_INC_CONFIG } from './other-income';
import style from './other-income.style';

class OtherIncome implements IOtherIncome {

  usage?: string;
  squareFeet?: number;
  monthlyRent: number;
  totalMonthlyIncome: number;

  constructor(options: {
    squareFeet?: number, 
    usage?: string, 
    monthlyRent: number}){

    this.usage = options.usage;
    this.squareFeet = options.squareFeet;
    this.monthlyRent = options.monthlyRent;
    this.totalMonthlyIncome = options.monthlyRent;
  }

}

abstract class OtherIncomeComponent<T extends IOtherIncome> implements OnInit { 

  newIncomeForm: FormGroup;
  incomes: Observable<Array<IOtherIncome>>;
  private fb: FormBuilder;

  constructor( private incomeService: ResidentialIncomeService | CommercialIncomeService, private config: T){
    this.fb = new FormBuilder();
  }

  private createForm() {
    const validatedRent = {monthlyRent: [this.config.monthlyRent, [Validators.required]]};
    this.newIncomeForm = this.fb.group(Object.assign({}, this.config, validatedRent));
  }

  addClick(){

    if (this.newIncomeForm.valid){
      const formVals = this.newIncomeForm.value;
      this.incomeService.addIncome(new OtherIncome(this.newIncomeForm.value));
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

@Component({
  selector: 'commercial-other-income',
  template: require('./other-commercial-income.component.html'),
  styles: [style],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommercialOtherIncomeComponent<T extends IOtherIncome> extends OtherIncomeComponent<T> { 

  constructor(incomeService: CommercialIncomeService, @Inject(OTHER_INC_CONFIG) config: T){
    super(incomeService, config);
  }

}

@Component({
  selector: 'residential-other-income',
  template: require('./other-residential-income.component.html'),
  styles: [style],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResidentialOtherIncomeComponent<T extends IOtherIncome> extends OtherIncomeComponent<T> { 
  constructor(incomeService: ResidentialIncomeService, @Inject(OTHER_INC_CONFIG) config: T){
    super(incomeService, config);
  }

}
