import {Injectable} from '@angular/core';
import { IIncome } from './shared/interfaces';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { ParkingIncome } from './shared/parking-income';

@Injectable()
export class IncomeServiceRevised {

  private lastId: number = 0;
  private incomes: Array<any> = [];
  private observableIncomes: BehaviorSubject<any[]> = new BehaviorSubject([]);
	chincomes$: Observable<any[]> = this.observableIncomes.asObservable();

  constructor(){
    console.log("special service!!!")
  }

  refresh() {
    this.observableIncomes.next(this.incomes);
  }

	addIncome(e: any){
    console.log("too IncomeServiceRevised", e)
		e.id = ++this.lastId;
		this.incomes.push(e);
		this.refresh();
    console.log("incomes", this.incomes);
	}

	removeIncome(e: any) {
    console.log("too IncomeServiceRevised", e)
		this.incomes = this.incomes.filter(income => income.id !== e.id);
		this.refresh();
  }

}
