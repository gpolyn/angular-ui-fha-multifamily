import { Inject, ChangeDetectionStrategy, Component, OnInit, OnChanges } from '@angular/core';
import { IOtherIncome, OtherIncome } from './other-income';
import { ResidentialIncomeService, CommercialIncomeService } from './other-income.service';
import { Observable } from 'rxjs/Observable';
import { FormBuilder, FormGroup } from '@angular/forms';
import { OTHER_INC_CONFIG } from './other-income';


abstract class OtherIncomeComponent<T extends IOtherIncome> implements OnInit { 

  newIncomeForm: FormGroup;
  incomes: Observable<Array<T>>;
  private fb: FormBuilder;

  constructor( private incomeService: ResidentialIncomeService | CommercialIncomeService, private config: T, private otherIncome: OtherIncome){
    this.fb = new FormBuilder();
  }

  private createForm() {
    this.newIncomeForm = this.fb.group(this.config);
  }

  addClick(){

    const formVals = this.newIncomeForm.value;

    this.otherIncome.usage = formVals.usage;
    this.otherIncome.squareFeet = formVals.usage;
    this.otherIncome.monthlyRent = formVals.monthlyRent;
    this.otherIncome.totalMonthlyIncome = formVals.monthlyRent;

    this.incomeService.addIncome(this.otherIncome);

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
  template: require('./other-income.component.html'),
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommercialOtherIncomeComponent<T extends IOtherIncome> extends OtherIncomeComponent<T> { 

  constructor(incomeService: CommercialIncomeService, @Inject(OTHER_INC_CONFIG) config: T, otherIncome: OtherIncome){
    super(incomeService, config, otherIncome);
  }

}

@Component({
  selector: 'residential-other-income',
  template: require('./other-income.component.html'),
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResidentialOtherIncomeComponent<T extends IOtherIncome> extends OtherIncomeComponent<T> { 
  constructor(incomeService: ResidentialIncomeService, @Inject(OTHER_INC_CONFIG) config: T, otherIncome: OtherIncome){
    super(incomeService, config, otherIncome);
  }

}
