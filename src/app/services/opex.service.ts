import {Injectable, Inject} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { CURRENT_AUTHOR_ID } from '../app-config';
import { LocalStorageService } from './localStorage.service';

interface IServiceContainer<T>{
  metadata: any;
  data: T;
}

interface IOpex {
  operating_expenses: number;
  operating_expenses_is_percent_of_effective_gross_income: boolean;  
}

const initialValues = {
  operating_expenses_is_percent_of_effective_gross_income: true,
  operating_expenses: 35
};

interface IOpexServiceCapsule {
  opex: number;
  isPercent: boolean;  
  metadata?: any;
}

@Injectable()
export class OpexService {

  private readonly STORAGE_ID = 'operatingExpenses';
  private opex: BehaviorSubject<IOpex>; 
  opex$: Observable<IOpex>; 

  constructor(@Inject(CURRENT_AUTHOR_ID) public currentAuthorId: any, private storage: LocalStorageService) {
    const lastOpex = storage.get(this.STORAGE_ID);
    const initOpex = {...initialValues, ...lastOpex.data};
    this.opex = new BehaviorSubject(initOpex);
    this.opex$ = this.opex.asObservable();
  }

  save(opex: IOpex){
    console.log('OpexService#save', opex); 
    const containerizedOpex = {metadata: this.currentAuthorId, data: opex};
    this.storage.put(this.STORAGE_ID, containerizedOpex);
    this.opex.next(opex);
  }

}
