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
  private commercialOccupancy: number = 90;
  observableCommercialOccupancy$: BehaviorSubject<number>;
  observableResidentialOccupancy$: BehaviorSubject<number>;
  private residentialOccupancy: number = 80;
  private observableIncomes: BehaviorSubject<IIncome[]> = new BehaviorSubject([]);
	chincomes$: Observable<IIncome[]> = this.observableIncomes.asObservable();
  totalGrossCommercialIncome$: Observable<number>;
  totalGrossResidentialIncome$: Observable<number>;
  commercialEGI$: Observable<number>;
  residentialEGI$: Observable<number>;

  constructor(){
  
    this.observableResidentialOccupancy$ = new BehaviorSubject<number>(this.residentialOccupancy);

    this.observableCommercialOccupancy$ = new BehaviorSubject<number>(this.commercialOccupancy);

    this.totalGrossCommercialIncome$ = this.observableIncomes.map((todos: any) => todos.reduce((count, todo) => todo.isCommercial ? count + todo.totalMonthlyIncome() : count, 0));
    this.totalGrossResidentialIncome$ = this.observableIncomes.map((todos: any) => todos.reduce((count, todo) => !todo.isCommercial ? count + todo.totalMonthlyIncome() : count, 0));
    this.commercialEGI$ = Observable.combineLatest(this.observableResidentialOccupancy$, this.totalGrossCommercialIncome$, (occ,inc)=>{ return occ/100 * inc;});

    this.residentialEGI$ = Observable.combineLatest(this.observableResidentialOccupancy$, this.totalGrossResidentialIncome$, (occ,inc)=>{ return occ/100 * inc;});

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

  saveOccupancy(isCommercial: boolean, occupancy: number){
    if (isCommercial){
      this.saveCommercialOccupancy(occupancy);
    } else {
      this.saveResidentialOccupancy(occupancy);
    }
  }

  private saveCommercialOccupancy(occ: number){
    this.commercialOccupancy = occ;
    this.observableCommercialOccupancy$.next(this.commercialOccupancy);
  }

  private saveResidentialOccupancy(occ: number){
    this.residentialOccupancy = occ;
    this.observableResidentialOccupancy$.next(this.residentialOccupancy);
  }

}

export class CommercialIncomeService extends IncomeServiceRevised {
}

export class ResidentialIncomeService extends IncomeServiceRevised {
}


