import { OnDestroy, Component,  OnInit, forwardRef, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { ValidatorFn, AbstractControl, Validators, FormControl, ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS } from '@angular/forms';
import {Observable} from 'rxjs/Observable';  
import {IncomeServiceRevised} from '../special.service';

export interface EffectiveIncome {
	totalIncome: number;
	occupancyPercent: number;
	maxOccupancyPercent: number;
	minOccupancyPercent: number;
  egi: number;
  isCommercial: boolean;
}

@Component({
  selector: 'effective-income',
  template: `
    <div>{{incomes2 | async | json}}</div>
    <label>
      gross {{incomeTypeLabel}}<div>{{effectiveIncome.totalIncome}}</div>
    </label>
    <label>occupancy rate
      <input name="occupancy-rate" type="number" [formControl]="occupancyPercent">
    </label>
    <label>
      {{incomeTypeLabel}} income<div>{{effectiveIncome.egi}}</div>
    </label>
  `
})
export class EffectiveIncomeComponent implements OnInit, OnDestroy {

  @Input() effectiveIncome: EffectiveIncome
	@Input() label: string;
  @Input() incoming: Observable<number>;
	occupancyPercent: FormControl; 
  private subs: any[] = [];
  incomeTypeLabel: string;
	incomes: Observable<any[]>;
  incomes2: Observable<any[]>;

	@Output()
  onChange: EventEmitter<any> = new EventEmitter();

  constructor(private incomeService: IncomeServiceRevised){}

  incomeChange(e: any){
    console.log("income change", e, this.occupancyPercent.value);
    this.effectiveIncome.totalIncome = e;
    this.handleOccupancyPercent();
  }

	ngOnInit(){
		this.incomes = this.incomeService.chincomes$;
     this.incomes2 = this.incomes.filter((item)=>{ console.log(item.parkingStyle); return true; })
		console.log("EffectiveIncome", this.effectiveIncome);
    const validators = [Validators.required];
    this.incomeTypeLabel = this.effectiveIncome.isCommercial ? "commercial" : "residential";

    if (this.effectiveIncome.maxOccupancyPercent){
      validators.push(this.maxVal(this.effectiveIncome.maxOccupancyPercent))
    }

    if (this.effectiveIncome.minOccupancyPercent){
      validators.push(this.minVal(this.effectiveIncome.minOccupancyPercent))
    }

		this.occupancyPercent = new FormControl(this.effectiveIncome.occupancyPercent, validators);
		this.subs.push(this.occupancyPercent.valueChanges.subscribe(this.handleOccupancyPercent.bind(this)));
    this.subs.push(this.incoming.subscribe(this.incomeChange.bind(this)))
	}

	handleOccupancyPercent(){
    console.log("handleOccupancyPercent", this.occupancyPercent.value)  
		this.effectiveIncome.egi = this.occupancyPercent.value/100.0 * this.effectiveIncome.totalIncome;
    this.onChange.emit(this.effectiveIncome.egi);
	}

  maxVal(max: number): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} => {
        if (control.value > max) {
          control.setValue(max)
        } 
        return null;
    };
  }

  minVal(min: number): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} => {
        if (control.value < min) {
          control.setValue(min)
        } 
        return null;
    };
  }

  ngOnDestroy(){
    this.subs.forEach(sub => sub.unsubscribe())
  }

}
