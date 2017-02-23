import {Injectable} from '@angular/core';
import { IIncome } from './shared/interfaces';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import {IIncome2, ICommercialIncomeService, IResidentialIncomeService} from './income-service.interface';

@Injectable()
export class IncomeServiceRevised {

  private lastId: number = 0;
  private incomes: Array<IIncome> = [];
  private occupancy: number = 90;
  observableOccupancy$: BehaviorSubject<number>;
  protected observableIncomes: BehaviorSubject<IIncome[]> = new BehaviorSubject([]);
  chincomes$: Observable<IIncome[]> = this.observableIncomes.asObservable();
  totalGrossIncome$: Observable<number>;
  egi$: Observable<number>;

  constructor(){
  
    this.observableOccupancy$ = new BehaviorSubject<number>(this.occupancy);

    this.totalGrossIncome$ = this.observableIncomes.map((todos: any) => todos.reduce((count, todo) =>  count + todo.totalMonthlyIncome, 0));

    this.egi$ = Observable.combineLatest(this.observableOccupancy$, this.totalGrossIncome$, (occ,inc)=>{ return occ/100 * inc;});

  }

  private refresh() {
    this.observableIncomes.next(this.incomes);
  }

	addIncome(e: IIncome){
    console.log('too IncomeServiceRevised', e);
		e.id = ++this.lastId;
		this.incomes.push(e);
		this.refresh();
    console.log('incomes', this.incomes);
	}

	removeIncome(e: IIncome) {
    console.log("about to remove ", e)
		this.incomes = this.incomes.filter(income => income.id !== e.id);
		this.refresh();
  }

  saveOccupancy(occupancy: number){
    this.occupancy = occupancy;
    this.observableOccupancy$.next(this.occupancy);
  }

}

export class CommercialIncomeService extends IncomeServiceRevised {
  constructor(){ super(); console.log("CommercialIncomeService");}
};

export class ResidentialIncomeService extends IncomeServiceRevised {
  constructor(){ super(); console.log("ResidentialIncomeService");}
};

abstract class MultiIncomeService {

  private incomeService: any;
  chincomes$: Observable<IIncome2[]>; 

  constructor(commSvc: CommercialIncomeService, resSvc: ResidentialIncomeService, private isCommercial: boolean, private incomeType: string){ 

    if (isCommercial) {
      this.incomeService = commSvc; 
    } else {
      this.incomeService = resSvc;
    }

    this.chincomes$ = this.incomeService.chincomes$.map( incomes => incomes.filter( income => income.type == this.incomeType));

  }

	addIncome(e: any){
    console.log('MultiIncomeService#addIncome', e);
    e['type'] = this.incomeType;
    this.incomeService.addIncome(e);
	}

	removeIncome(e: any) {
    console.log('MultiIncomeService#remove', e)
    this.incomeService.removeIncome(e);
  }

}


@Injectable()
export class MyCommercialOtherIncomeService extends MultiIncomeService {

  constructor(commSvc: CommercialIncomeService, resSvc: ResidentialIncomeService){ 
    super(commSvc, resSvc, true, 'commercialOtherIncome');
  }

};

@Injectable()
export class MyResidentialOtherIncomeService extends MultiIncomeService implements IResidentialIncomeService<IIncome2> {

  constructor(commSvc: CommercialIncomeService, resSvc: ResidentialIncomeService){ 
    super(commSvc, resSvc, false, 'residentialOtherIncome');
  }

};

@Injectable()
export class MyResidentialParkingIncomeService extends MultiIncomeService implements ICommercialIncomeService<IIncome2> {

  constructor(commSvc: CommercialIncomeService, resSvc: ResidentialIncomeService){ 
    super(commSvc, resSvc, false, 'residentialParkingIncome');
  }

};

@Injectable()
export class MyCommercialParkingIncomeService extends MultiIncomeService implements IResidentialIncomeService<IIncome2> {

  constructor(commSvc: CommercialIncomeService, resSvc: ResidentialIncomeService){ 
    super(commSvc, resSvc, true, 'commercialParkingIncome');
  }

};
