import { ChangeDetectorRef, OnDestroy, Input, ChangeDetectionStrategy, Component, OnInit, OnChanges, Output, Injector, EventEmitter} from '@angular/core';
import { CommercialIncomeService, ResidentialIncomeService} from '../special.service';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { FormBuilder, FormGroup, ValidatorFn, AbstractControl } from '@angular/forms';
import { OperatingExpensesService } from './opex.service';

interface IOpex {
  operating_expenses: number;
  operating_expenses_is_percent_of_effective_gross_income: boolean;  
}

@Component({
  selector: 'operating-expenses',
  template: `
    <div id='operating-expense' [formGroup]="opexForm" novalidate>
      <div class='left'>
        <label for='total'>total operating expenses<span class='required'>*</span></label>
      </div>
      <div class='right'>
        <input id='total' type='number' formControlName="operating_expenses">
        <input name='totalOperatingExpenseIsPercent' id='totalOperatingExpenseIsPercent' value='true' type='checkbox' formControlName="operating_expenses_is_percent_of_effective_gross_income">
        <label for='totalOperatingExpenseIsPercent'>%</label>
      </div>
    </div>
    <div id="operating">
      <div class='left'>net operating income</div>
      <div class='right'>
        <span id='net-operating-income'>{{ noi | async | currency:'USD':true}}</span>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class OperatingExpensesComponent implements OnInit, OnDestroy {

  opexForm: FormGroup;
  noi: Observable<number>;
  private sub: any;

  constructor(private fb: FormBuilder, private opexSvc: OperatingExpensesService){ }

  ngOnInit() {
    this.opexForm = this.fb.group(this.opexSvc.observableOpex$.getValue(), {validator: this.maxMinEnforcer});
		this.sub = this.opexForm.valueChanges.subscribe(this.opexSvc.save);
    this.noi = this.opexSvc.observableNOI$;
  }

  ngOnDestroy(){
    this.sub.unsubscribe();
  }

  maxMinEnforcer(control: AbstractControl): {[key: string]: boolean} {
		const opex = control.get('operating_expenses').value;
		const isPercent = control.get('operating_expenses_is_percent_of_effective_gross_income').value;
		if (opex < 0) {
			control.patchValue({operating_expenses: 0});
		} else if (isPercent && opex > 100) {
			control.patchValue({operating_expenses: 100});
    }

		return null;
	}

}
