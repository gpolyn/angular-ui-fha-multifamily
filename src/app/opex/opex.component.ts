import { ChangeDetectorRef, OnDestroy, Input, ChangeDetectionStrategy, Component, OnInit, OnChanges, Output, Injector, EventEmitter} from '@angular/core';
import { CommercialIncomeService, ResidentialIncomeService } from '../special.service';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { FormBuilder, FormGroup, ValidatorFn, AbstractControl } from '@angular/forms';
import { OperatingExpensesService } from './opex.service';

function jsonEqual(a,b) {
  return JSON.stringify(a) === JSON.stringify(b);
}

export interface IOpex {
  opex: number;
  isPercent: boolean;  
  isExternal: boolean;
}

@Component({
  selector: 'operating-expenses',
  template: `
    <div id="gross-income-container">effective gross income: {{ ( totalGrossIncome | async )}}</div>
    <form [formGroup]="opexForm" novalidate>
      <input type='number' formControlName="opex">
      <input type='checkbox' formControlName="isPercent">
    </form>
    <div id="noi-container">net operating income: {{ (noi | async )}}</div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class OperatingExpensesComponent implements OnInit, OnDestroy {

  opexForm: FormGroup;
  private incomeService: OperatingExpensesService;
  totalGrossIncome: Observable<number>;
  noi: Observable<number>;
  opex: BehaviorSubject<IOpex>;
  private sub: any;

  constructor(private fb: FormBuilder, private opexSvc: OperatingExpensesService, private ref: ChangeDetectorRef){
    this.totalGrossIncome = opexSvc.observableEffectiveIncome$;
    this.noi = opexSvc.observableNOI$;
    this.opex = opexSvc.observableOpex$;
  }

  ngOnDestroy(){
    this.sub.unsubscribe();
  }

  handleOpexChanges<T extends IOpex>(data: T){
    console.log("handleOpexChanges", data); 
    if (!this.doNotSave){
      this.opexSvc.save(data);
    }
    this.doNotSave = false;
  }

  doNotSave: boolean = false;

  ngOnInit() {

    this.opexForm = this.fb.group(this.opex.getValue(), {validator: this.maxMinEnforcer});
    //this.opex.subscribe((data)=> { if (data.isExternal) { this.doNotSave = true;}})
		this.sub = this.opexForm.valueChanges.subscribe(this.handleOpexChanges.bind(this));

  }

  maxMinEnforcer(control: AbstractControl): {[key: string]: boolean} {

		const opex = control.get('opex').value;
		const isPercent = control.get('isPercent').value;
		if (opex < 0) {
			control.patchValue({opex: 0});
		} else if (isPercent && opex > 100) {
			control.patchValue({opex: 100});
    }

		return null;
	}

}
