import { Inject, Injector, OnDestroy, Component,  OnInit, forwardRef, Input, OnChanges } from '@angular/core';
import { ValidatorFn, AbstractControl, Validators, FormControl } from '@angular/forms';
import {Observable} from 'rxjs/Observable';  
import {BehaviorSubject} from 'rxjs/BehaviorSubject';  
import { ParkingIncome } from '../shared/parking-income';
import 'rxjs/add/operator/filter'; 
import { CommercialIncomeService, ResidentialIncomeService } from '../special.service';
import { IAppConfig, APP_CONFIG } from '../app-config';

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
      <input name='occupancy-rate' type='number' [formControl]='occupancyPercent'>
    </label>
    <label>
      {{incomeTypeLabel}} income<div>{{( effectiveGrossIncome | async )}}</div>
    </label>
  `
})
export class EffectiveIncomeComponent implements OnInit, OnDestroy {

	@Input() label: string;
  @Input() isCommercial: boolean = false;
  @Input() maxOccupancyPercent: number = 100;
  @Input() minOccupancyPercent: number = 0;
	occupancyPercent: FormControl; 
  private subs: any[] = [];
  incomeTypeLabel: string;

	incomes: Observable<ParkingIncome[]>;
  incomes2: Observable<ParkingIncome[]>;

  occupancy: BehaviorSubject<number>;
  gross: Observable<number>;
  effectiveGrossIncome: Observable<number>;
  private incomeService: any;
  private config: IAppConfig;

  constructor(@Inject(APP_CONFIG) config: IAppConfig, private injector: Injector){
    this.config = config;
  }

  ngOnChanges(){
    if (this.isCommercial){
      this.incomeService = this.injector.get(CommercialIncomeService); 
      this.maxOccupancyPercent = this.config.maxCommercialOccupancy;
    } else {
      this.incomeService = this.injector.get(ResidentialIncomeService);
      this.maxOccupancyPercent = this.config.maxResidentialOccupancy;
    }
  }

	ngOnInit(){

    const validators = [Validators.required];

		this.incomes2 = this.incomeService.chincomes$;
		
    this.incomeTypeLabel = this.isCommercial ? 'commercial' : 'residential';

    this.effectiveGrossIncome = this.incomeService.egi$;
    this.occupancy = this.incomeService.observableOccupancy$
    this.gross = this.incomeService.totalGrossIncome$;

		this.occupancyPercent = new FormControl(this.occupancy.getValue(), validators);

    this.subs.push(this.occupancyPercent.valueChanges.subscribe(this.handleOccupancyPercent.bind(this)));

	}

	handleOccupancyPercent(){

    if (this.occupancyPercent.value > this.maxOccupancyPercent){
      this.occupancyPercent.patchValue(this.maxOccupancyPercent);
    }

    if (this.occupancyPercent.value < this.minOccupancyPercent){
      this.occupancyPercent.patchValue(this.minOccupancyPercent);
    }

    this.incomeService.saveOccupancy(this.occupancyPercent.value);

	}

  // Note: would like to add this (and the next) validators, but
  // they result in a zone error when the max (min) values for different
  // component instances differ

  maxVal(max: number): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} => {
        if (control.value > max) {
          control.setValue(max);
        } 
        return null;
    };
  }

  minVal(min: number): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} => {
        if (control.value < min) {
          control.setValue(min);
        } 
        return null;
    };
  }

  ngOnDestroy(){
    this.subs.forEach(sub => sub.unsubscribe());
  }

}
