import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';  
import {BehaviorSubject} from 'rxjs/BehaviorSubject';  

abstract class AbstractBaseIncomeService {
  observableOccupancy$: BehaviorSubject<number>;
  totalGrossIncome$: Observable<number>;
  egi$: Observable<number>;
  saveOccupancy(occupancy: number){}
}

@Injectable()
export abstract class AbstractResidentialIncomeService extends AbstractBaseIncomeService {}

@Injectable()
export abstract class AbstractCommercialIncomeService extends AbstractBaseIncomeService {}
