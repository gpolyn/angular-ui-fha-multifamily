import {Injectable, EventEmitter} from '@angular/core';
import { IIncome } from './shared/interfaces';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { ParkingIncome } from './shared/parking-income';

@Injectable()
export class IncomeServiceRevised {

  private lastId: number = 0;
  private incomes: Array<IIncome> = [];
  private occupancy: number = 90;
  observableOccupancy$: BehaviorSubject<number>;
  private observableIncomes: BehaviorSubject<IIncome[]> = new BehaviorSubject([]);
	chincomes$: Observable<IIncome[]> = this.observableIncomes.asObservable();
  totalGrossIncome$: Observable<number>;
  egi$: Observable<number>;

  constructor(){
  
    this.observableOccupancy$ = new BehaviorSubject<number>(this.occupancy);

    this.totalGrossIncome$ = this.observableIncomes.map((todos: any) => todos.reduce((count, todo) =>  count + todo.totalMonthlyIncome(), 0));

    this.egi$ = Observable.combineLatest(this.observableOccupancy$, this.totalGrossIncome$, (occ,inc)=>{ return occ/100 * inc;});

  }

  refresh() {
    this.observableIncomes.next(this.incomes);
  }

	addIncome(e: IIncome){
    console.log("too IncomeServiceRevised", e.totalMonthlyIncome());
		e.id = ++this.lastId;
		this.incomes.push(e);
		this.refresh();
    console.log("incomes", this.incomes);
	}

	removeIncome(e: IIncome) {
    console.log("too IncomeServiceRevised", e)
		this.incomes = this.incomes.filter(income => income.id !== e.id);
		this.refresh();
  }

  saveOccupancy(occupancy: number){
    this.occupancy = occupancy;
    this.observableOccupancy$.next(this.occupancy);
  }

}

export class CommercialIncomeService extends IncomeServiceRevised {
}

export class ResidentialIncomeService extends IncomeServiceRevised {
}


