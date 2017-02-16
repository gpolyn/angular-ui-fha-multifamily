import {Injectable} from '@angular/core';
import { IIncome } from './interfaces';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { ParkingIncome } from './parking-income';

@Injectable()
export class IncomeServiceRevised {

  private lastId: number = 0;
  private incomes: Array<any> = [];
  private observableIncomes: BehaviorSubject<ParkingIncome[]> = new BehaviorSubject([]);
	chincomes$: Observable<ParkingIncome[]> = this.observableIncomes.asObservable();

	constructor() { 
	} 

  refresh() {
    this.observableIncomes.next(this.incomes);
  }

	addIncome(e: ParkingIncome){
		e.id = ++this.lastId;
		this.incomes.push(e);
		this.refresh();
	}

	removeIncome(e: ParkingIncome) {
		console.log("removeIncome", e);
		this.incomes = this.incomes.filter(income => income.id !== e.id);
		this.refresh();
  }

  totalIncome(): Promise<number> {
    return new Promise((res) => {
      const result = this.incomes.reduce((prev,i2)=>{ 
        return prev + i2.totalMonthlyIncome();  
      }, 0);
      res(result);
    });
  }

	/*
  saveIncome<T extends IIncome>(income: T): Promise<T[]> {
    console.log("IncomeServiceRevised", this.incomes)        
    return new Promise((res)=>{
      income.id = ++this.lastId;
      this.incomes.push(income);
      res(this.incomes);
    });
  }

  getIncomes(): Promise<T[]> {
		console.log('IncomeServiceRevised.getIncomes')
    return Promise.resolve(this.incomes);
	}

  deleteIncome(id: any): Promise<T[]> {
    return new Promise((res)=>{
      this.incomes = this.incomes.filter(income => id !== income.id);
      res(this.incomes);
    })
  }
	*/

}
