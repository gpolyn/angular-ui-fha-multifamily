import { Inject, Injector, OnDestroy, Component,  OnInit, forwardRef, Input, OnChanges } from '@angular/core';
import { ValidatorFn, AbstractControl, Validators, FormControl } from '@angular/forms';
import {Observable} from 'rxjs/Observable';  
import {BehaviorSubject} from 'rxjs/BehaviorSubject';  
import { ParkingIncome } from '../shared/parking-income';
import 'rxjs/add/operator/filter'; 
import { CommercialIncomeService, ResidentialIncomeService } from '../special.service';
import { AbstractCommercialIncomeService, AbstractResidentialIncomeService } from './effective-income.service';
import { IAppConfig, APP_CONFIG } from '../app-config';

export interface EffectiveIncome {
	totalIncome: number;
	occupancyPercent: number;
	maxOccupancyPercent: number;
	minOccupancyPercent: number;
  egi: number;
}

class EffectiveIncomeComponent implements OnInit, OnDestroy {

  protected maxOccupancyPercent: number = 100;
  protected minOccupancyPercent: number = 0;
  protected incomeTypeLabel: string;
	occupancyPercent: FormControl; 
  private subs: any[] = [];

  occupancy: BehaviorSubject<number>;
  gross: Observable<number>;
  effectiveGrossIncome: Observable<number>;

    //constructor(protected incomeService: CommercialIncomeService | ResidentialIncomeService){
  constructor(protected incomeService: any){
  }

	ngOnInit(){

    if (this.incomeService.observableOccupancy$.getValue() > this.maxOccupancyPercent){
      this.incomeService.observableOccupancy$.next(this.maxOccupancyPercent);
    }

    const validators = [Validators.required];

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

@Component({
  selector: 'commercial-effective-income',
  template: require('./commercial-effective-income.component.html')
})
export class CommercialEffectiveIncomeComponent extends EffectiveIncomeComponent {

  constructor(@Inject(APP_CONFIG) private config: IAppConfig, protected incomeService: AbstractCommercialIncomeService){
    super(incomeService);
    console.log('CommercialEffectiveIncomeComponent')
    this.incomeTypeLabel = 'commercial';
    //this.config = config;
    this.maxOccupancyPercent = this.config.maxCommercialOccupancy;
    console.log('CommercialEffectiveIncomeComponent max occupancy', this.maxOccupancyPercent)
  }

}

@Component({
  selector: 'residential-effective-income',
  template: require('./residential-effective-income.component.html')
})
export class ResidentialEffectiveIncomeComponent extends EffectiveIncomeComponent {

  constructor(@Inject(APP_CONFIG) private config: IAppConfig, protected incomeService: AbstractResidentialIncomeService){
    super(incomeService);
    this.incomeTypeLabel = 'residential';
    this.maxOccupancyPercent = this.config.maxResidentialOccupancy;
    console.log('ResidentialEffectiveIncomeComponent max occupancy', this.maxOccupancyPercent)
  }

}
