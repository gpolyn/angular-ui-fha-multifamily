import {Injectable} from '@angular/core';
import { IIncome } from './interfaces';
import { IApartmentIncome } from './apartment-income';
import { Observable } from 'rxjs/Observable';

export abstract class ApartmentIncomeService {

  addIncome(income: IApartmentIncome) {}
  removeIncome(income: IApartmentIncome) {}
  chincomes$: Observable<IApartmentIncome[]>;

}

@Injectable()
export class IncomeServiceRevised<T extends IApartmentIncome> {


  private lastId: number = 0;
  private incomes: Array<IIncome> = [];
  private observedIncomes: IApartmentIncome[];

  constructor(private dataSvc: ApartmentIncomeService){
    dataSvc.chincomes$.subscribe(val => this.observedIncomes = val);
  }

  totalIncome(): Promise<number> {
    return new Promise((res) => {
      const result = this.incomes.reduce((prev,i2)=>{ 
        return prev + i2.totalMonthlyIncome();  
      }, 0);
      res(result);
    });
  }

  saveIncome(income: any): Promise<IApartmentIncome[]> {
    console.log("IncomeServiceRevised", this.incomes);        
    console.log("IncomeServiceRevised ahh", income);        
    return new Promise((res)=>{
      income.id = ++this.lastId;
      this.incomes.push(income);
      const totalIncome = income.totalMonthlyIncome();
      const updatedIncome = {
        bedrooms: income.bedrooms,
        units: income.units,
        squareFeet: income.squareFeet,
        monthlyRent: income.monthlyRent,
        totalMonthlyIncome: totalIncome
      }
      this.dataSvc.addIncome(updatedIncome);
      res(this.incomes);
    });
  }

  getIncomes(): Promise<IApartmentIncome[]> {
		console.log('IncomeServiceRevised.getIncomes');
    //return Promise.resolve(this.incomes);
    //return Promise.resolve(this.observedIncomes);
    return new Promise(res => {
      const updatedIncomes = this.observedIncomes.map(income => { income['newApartmentIncome'] = false; return income; })
      console.log('updated incomes', updatedIncomes)
      res(updatedIncomes)
    });
    //return this.observedIncomes.map(income => income['newApartmentIncome'] = false).toPromise()
	}

  deleteIncome(id: any): Promise<T[]> {
    return new Promise((res)=>{
      this.incomes = this.incomes.filter(income => id !== income.id);
      res(this.incomes);
    })
  }

}
