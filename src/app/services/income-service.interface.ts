import { Observable } from 'rxjs/Observable';

export interface IIncome2 {
  totalMonthlyIncome: number;
}

export interface IIncome {
  id: any;
  readonly isCommercial: boolean;
  totalMonthlyIncome(): number;
  type: string;
}

interface ICommonIncomeService<T extends IIncome2> {
  chincomes$: Observable<T[]>; 
	addIncome(e: T): void;
	removeIncome(e: T): void;
}

export interface ICommercialIncomeService<T extends IIncome2> extends ICommonIncomeService<T> { }

export interface IResidentialIncomeService<T extends IIncome2> extends ICommonIncomeService<T>{ }
