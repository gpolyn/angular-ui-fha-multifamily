import { Optional, Injectable, Injector, ReflectiveInjector } from '@angular/core';
import { IIncome } from './income-service.interface';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import {LocalStorageService} from '../services'
import { IIncome2, ICommercialIncomeService, IResidentialIncomeService } from './income-service.interface';


@Injectable()
class IncomeStorageService {

  STORAGE_ID = 'sizemymultifamilyloan_angular_v1';
  storageSpace: string;
  private injector: Injector;
  private localStorageSvc: LocalStorageService;

  constructor(storageSpace: string = ''){
    this.storageSpace = storageSpace;
    this.injector = ReflectiveInjector.resolveAndCreate([LocalStorageService]);
    this.localStorageSvc = this.injector.get(LocalStorageService);
  }

	get(): IIncome[] {
  const allData = JSON.parse(localStorage.getItem(this.STORAGE_ID) || '{}');
  const aData = this.localStorageSvc.get(this.storageSpace);
  if (Object.keys(aData).length === 0){
    return [];
    } else {
      return aData;
    }
    //return allData[this.storageSpace] || [];
  //return allData || [];
	}

	put(incomes: IIncome[]) {
    console.log('about to add', incomes);
    /*
    const type = incomes[0].type;
    const allData = JSON.parse(localStorage.getItem(this.STORAGE_ID) || '{}');
    allData[this.storageSpace] = incomes;
		localStorage.setItem(this.STORAGE_ID, JSON.stringify(allData));
    */
    this.localStorageSvc.put(this.storageSpace, incomes);
	}
}

class IncomeServiceRevised {

  private lastId: number = 0;
  private incomes: Array<IIncome> = [];
  private occupancy: number = 90;
  observableOccupancy$: BehaviorSubject<number>;
  protected observableIncomes: BehaviorSubject<IIncome[]> = new BehaviorSubject([]);
  chincomes$: Observable<IIncome[]> = this.observableIncomes.asObservable();
  totalGrossIncome$: Observable<number>;
  egi$: Observable<number>;

  constructor(private incomeStorageService: IncomeStorageService){
  
    this.observableOccupancy$ = new BehaviorSubject<number>(this.occupancy);
    const storedIncomes = incomeStorageService.get();
    this.incomes = storedIncomes;
    // storedIncomes.map(incs => this.incomes = incs)
    this.observableIncomes = new BehaviorSubject(this.incomes);
    this.chincomes$ = this.observableIncomes.asObservable();

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
    this.incomeStorageService.put(this.incomes);
		this.refresh();
    console.log('incomes', this.incomes);
	}

	removeIncome(e: IIncome) {
    console.log("about to remove ", e)
		this.incomes = this.incomes.filter(income => income.id !== e.id);
    this.incomeStorageService.put(this.incomes);
		this.refresh();
  }

  saveOccupancy(occupancy: number){
    this.occupancy = occupancy;
    this.observableOccupancy$.next(this.occupancy);
  }

}

abstract class IncomeServiceBase {

//private injector: Injector = ReflectiveInjector.resolveAndCreate([IncomeStorageService]);
  chincomes$: any;
  totalGrossIncome$: any;
  egi$: any;
  private incomeService: any;
  observableOccupancy$: any;

  constructor(svc: IncomeStorageService){

    this.incomeService = new IncomeServiceRevised(svc);
    this.chincomes$ = this.incomeService.chincomes$;
    this.totalGrossIncome$ = this.incomeService.totalGrossIncome$;
    this.egi$ = this.incomeService.egi$;
    this.observableOccupancy$ = this.incomeService.observableOccupancy$;

  }

  saveOccupancy(occupancy: number){ return this.incomeService.saveOccupancy(occupancy); }

  addIncome(e: IIncome) { return this.incomeService.addIncome(e); }

  removeIncome(e: IIncome) { return this.incomeService.removeIncome(e); }
}

@Injectable()
export class CommercialIncomeService extends IncomeServiceBase {
  
  constructor(){super(new IncomeStorageService('commercialIncomes'));}
  
};

@Injectable()
export class ResidentialIncomeService extends IncomeServiceBase {

  constructor(){super(new IncomeStorageService('residentialIncomes'));}

};

@Injectable()
export class GrossIncomeService {

  private grossIncome: BehaviorSubject<number>;
  grossIncome$: Observable<number>;

  constructor(private commercialIncomeSvc: CommercialIncomeService, private residentialIncomeSvc: ResidentialIncomeService){
    
    let src1 = 0;
    let src2 = 0;
    this.grossIncome = new BehaviorSubject<number>(0);
    this.grossIncome$ = this.grossIncome.asObservable();

    const getTotalGross = () => { 
      this.grossIncome.next(src1 + src2);
    };

    commercialIncomeSvc.egi$.subscribe(val => { 
      src1 = val;
      getTotalGross();
    });

    residentialIncomeSvc.egi$.subscribe(val => { 
      src2 = val;
      getTotalGross();
    });
  }

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
export class MyApartmentIncomeService extends MultiIncomeService {

  constructor(commSvc: CommercialIncomeService, resSvc: ResidentialIncomeService){ 
    super(commSvc, resSvc, false, 'apartmentIncome');
  }

};


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

class IncomeServiceBridgeBase <T extends IncomeServiceBase> {
  observableOccupancy$: BehaviorSubject<number>;
  totalGrossIncome$: Observable<number>;
  egi$: Observable<number>;
  private injector: Injector;
  private localStorageSvc: LocalStorageService;

  constructor(protected svc: T, protected namespace: string){
    this.observableOccupancy$ = svc.observableOccupancy$;
    this.totalGrossIncome$ = svc.totalGrossIncome$;
    this.egi$ = svc.egi$;
    this.injector = ReflectiveInjector.resolveAndCreate([LocalStorageService]);
    this.localStorageSvc = this.injector.get(LocalStorageService);
    const lastSavedOccupancy = this.localStorageSvc.get(namespace);
    console.log('LAST SAVED OCCUPANCY', lastSavedOccupancy);
    const isEmpty = Object.keys(lastSavedOccupancy).length === 0 && lastSavedOccupancy.constructor === Object;
    if (!isEmpty) {
      this.svc.saveOccupancy(lastSavedOccupancy);
    }
  }

  saveOccupancy(occupancy: number){
    this.localStorageSvc.put(this.namespace, occupancy);
    this.svc.saveOccupancy(occupancy);
  }

}

@Injectable()
export class ResidentialIncomeServiceBridge extends IncomeServiceBridgeBase<ResidentialIncomeService> {
  constructor(protected svc: ResidentialIncomeService){
    super(svc, 'residentialOccupancy'); 
  }
}

@Injectable()
export class CommercialIncomeServiceBridge extends IncomeServiceBridgeBase<CommercialIncomeService> {
  constructor(protected svc: CommercialIncomeService){
    super(svc, 'commercialOccupancy'); 
  }
}
