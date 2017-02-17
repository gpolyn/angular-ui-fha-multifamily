import { OnDestroy, Component,  OnInit, forwardRef, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { ValidatorFn, AbstractControl, Validators, FormControl, ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS } from '@angular/forms';
import {Observable} from 'rxjs/Observable';  
import {BehaviorSubject} from 'rxjs/BehaviorSubject';  
import {IncomeServiceRevised} from '../special.service';
import { ParkingIncome } from '../shared/parking-income';
import 'rxjs/add/operator/filter'; 

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
    <label>
      gross {{incomeTypeLabel}}<div>{{( gross | async ) }}</div>
    </label>
    <label>occupancy rate
      <input name="occupancy-rate" type="number" [formControl]="occupancyPercent">
    </label>
    <label>
      {{incomeTypeLabel}} income<div>{{( effectiveGrossIncome | async )}}</div>
    </label>
  `
})
export class EffectiveIncomeComponent implements OnInit, OnDestroy {

	@Input() label: string;
  @Input() isCommercial: boolean = false;
  @Input() maxOccupancyPercent: number;
  @Input() minOccupancyPercent: number = 0;
	occupancyPercent: FormControl; 
  private subs: any[] = [];
  incomeTypeLabel: string;

	incomes: Observable<ParkingIncome[]>;
  incomes2: Observable<ParkingIncome[]>;

  occupancy: BehaviorSubject<number>;
  gross: Observable<number>;
  effectiveGrossIncome: Observable<number>;

  constructor(private incomeService: IncomeServiceRevised){}

	ngOnInit(){

		this.incomes = this.incomeService.chincomes$;

    this.incomes2 = this.incomes.map((es: any) => es.filter((e) => {return e.isCommercial} ))
		
    const validators = [Validators.required];
    this.incomeTypeLabel = this.isCommercial ? "commercial" : "residential";

    if (this.maxOccupancyPercent){
      validators.push(this.maxVal(this.maxOccupancyPercent))
    }

    if (this.minOccupancyPercent){
      validators.push(this.minVal(this.minOccupancyPercent))
    }

    if (this.isCommercial){
      this.effectiveGrossIncome = this.incomeService.commercialEGI$;
      this.occupancy = this.incomeService.observableCommercialOccupancy$
      this.gross = this.incomeService.totalGrossCommercialIncome$;
    } else {
      this.effectiveGrossIncome = this.incomeService.residentialEGI$;
      this.occupancy = this.incomeService.observableResidentialOccupancy$
      this.gross = this.incomeService.totalGrossResidentialIncome$;
    }

		this.occupancyPercent = new FormControl(this.occupancy.getValue(), validators);

		this.subs.push(this.occupancyPercent.valueChanges.subscribe(this.handleOccupancyPercent.bind(this)));

	}

	handleOccupancyPercent(){
    this.incomeService.saveOccupancy(this.isCommercial, this.occupancyPercent.value);
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
