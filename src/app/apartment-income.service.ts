import { Injectable, ReflectiveInjector } from '@angular/core';
import { IIncome } from './shared/interfaces';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { LocalStorageService } from './localStorage.service';

@Injectable()
export class ApartmentIncomeService {

  private lastId: number = 0;
  private incomes: Array<IIncome>;
  protected observableIncomes: BehaviorSubject<IIncome[]>;
  incomes$: Observable<IIncome[]>;

  constructor(private storage: LocalStorageService){
    this.incomes = this.storage.get('apartmentIncomes') || [];
    this.observableIncomes = new BehaviorSubject(this.incomes);
    this.incomes$ = this.observableIncomes.asObservable();
  }

  private refresh() {
    this.storage.put('apartmentIncomes', this.incomes);
    this.observableIncomes.next(this.incomes);
  }

	addIncome(e: IIncome){
		e.id = ++this.lastId;
    e['type'] = 'apartment';
		this.incomes.push(e);
		this.refresh();
	}

	removeIncome(e: IIncome) {
    console.log("about to remove ", e)
		this.incomes = this.incomes.filter(income => income.id !== e.id);
		this.refresh();
  }

}
