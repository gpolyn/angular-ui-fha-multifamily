import {Injectable} from '@angular/core';
import { IIncome } from './interfaces';

@Injectable()
export class IncomeService<T extends IIncome> {

  lastId: number = 0;
  incomes: IIncome[] = [];
  private incomeCollections: Map<string, any[]> = new Map<string, any[]>();
  private readonly storageId = 'income-angularjs-typescript';

  constructor() { }

	get (): any[] {
			return JSON.parse(localStorage.getItem(this.storageId) || '[]');
	}

	put<T extends IIncome> (incomes: T[]) {
			localStorage.setItem(this.storageId, JSON.stringify(incomes));
	}

  addIncome<T extends IIncome>(income: T): Promise<T> {

    return new Promise((res)=>{

      const type = income.type;
      income.id = [type, ++this.lastId];

      if (this.incomeCollections.has(type)){
        const incomes = this.incomeCollections.get(type);
        incomes.push(income);
        this.incomeCollections.set(type, incomes);
      } else {
        this.incomeCollections.set(type, [income]);
      }

      res(this.incomeCollections.get(type));

    });
  }

  getIncomes<T extends IIncome>(c: {new(): T;}): Promise<T[]> {
		console.log('IncomeService.getIncomes')

    return new Promise((res)=>{

      const tInstance = new c();
      const tInstanceName = tInstance.type;

      if (this.incomeCollections.has(tInstanceName)){
        res(this.incomeCollections.get(tInstanceName));
      } else {
        res([]);
      }

    });

	}

  deleteTodoById(id: any):  Promise<any[]>{

    return new Promise((res)=>{
      const todos = this.incomeCollections.get(id[0]).filter(todo => todo.id !== id);
      this.incomeCollections.set(id[0], todos);
      res(todos);
    })

  }

}

@Injectable()
export class IncomeServiceRevised<T extends IIncome> {

  private lastId: number = 0;
  private incomes: Array<IIncome> = [];

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
