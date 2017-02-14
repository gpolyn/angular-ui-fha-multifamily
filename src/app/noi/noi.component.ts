import { OnDestroy, Component,  OnInit, forwardRef, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { ValidatorFn, AbstractControl, Validators, FormControl, ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS } from '@angular/forms';
import {Observable} from 'rxjs/Observable';  
import {HeroDetailComponent1} from '../input-and-checkbox/input-and-checkbox.component'; 

@Component({
  selector: 'noi',
  template: `
    <label>
      effective income <div>{{income}}</div>
    </label>
    <hero-detail [maxValueWhenChecked]="100" (maybePercent)="recalculateNOI($event)"></hero-detail>
    <label>
      net operating income<div>{{noi}}</div>
    </label>
  `
})
export class NOIComponent implements OnInit, OnDestroy {

  @Input() effectiveIncome: Observable<number>
	@Output()
  onChange: EventEmitter<any> = new EventEmitter();
  private subs: any[] = [];
  income: number = 0;

	ngOnInit(){
    this.subs.push(this.effectiveIncome.subscribe(this.handleEffectiveIncome.bind(this)))
	}

  handleEffectiveIncome(e: number){
    console.log("handleEffectiveIncome", e);
    this.income = e;
    this.recalculateNOI();
  }

  recalculateNOI(e?: any){
    console.log("handleOpex", e);

    if (e.isPercent){
      
    } else {

    }

  }

  ngOnDestroy(){
    this.subs.forEach(sub => sub.unsubscribe())
  }

}
