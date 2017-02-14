import {Injectable} from '@angular/core';
import { IIncome } from './interfaces';

@Injectable()
export class IncomeServiceRevised<T extends IIncome> {

  private lastId: number = 0;
  private incomes: Array<IIncome> = [];

  totalIncome(): Promise<number> {
    return new Promise((res) => {
      const result = this.incomes.reduce((prev,i2)=>{ 
        return prev + i2.totalMonthlyIncome();  
      }, 0);
      res(result);
    });
  }

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

}
