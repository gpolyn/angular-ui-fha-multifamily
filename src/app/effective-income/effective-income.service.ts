import {Observable} from 'rxjs/Observable';  
import {BehaviorSubject} from 'rxjs/BehaviorSubject';  

abstract class AbstractBaseIncomeService {
  observableOccupancy$: BehaviorSubject<number>;
  protected observableIncomes;
  chincomes$: Observable<any[]>;
  totalGrossIncome$: Observable<number>;
  egi$: Observable<number>;
    saveOccupancy(occupancy: number){}
}

export abstract class AbstractResidentialIncomeService extends AbstractBaseIncomeService {}

export abstract class AbstractCommercialIncomeService extends AbstractBaseIncomeService {}
