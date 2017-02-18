import {Injectable, EventEmitter, Optional} from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { CommercialIncomeService, ResidentialIncomeService} from '../special.service';

export interface IOpex {
  opex: number;
  isPercent: boolean;  
  isExternal: boolean;
}

@Injectable()
export class OperatingExpensesService {

  private opex: BehaviorSubject<IOpex>; 
  observableOpex$: BehaviorSubject<IOpex>;
  private simpleOpex: IOpex;

  private effectiveIncome: BehaviorSubject<number>;
  observableEffectiveIncome$: Observable<number>;

  observableNOI$: Observable<number>;

  constructor(
    @Optional() private commercialIncome: CommercialIncomeService,
    private residentialIncome: ResidentialIncomeService
  ){

    console.log("Opex service", commercialIncome, residentialIncome);

    this.observableEffectiveIncome$ = Observable.combineLatest(commercialIncome.egi$, residentialIncome.egi$, (comm, residential) => { return comm + residential;});
    
    this.opex = new BehaviorSubject<IOpex>(<IOpex>{opex: 30, isPercent: true});
    this.observableOpex$ = this.opex;

    this.observableNOI$ = Observable.combineLatest(this.observableEffectiveIncome$, this.observableOpex$, (inc,opex)=>{ return opex.isPercent ? ( inc * (1 - opex.opex/100.0) ) : ( inc - opex.opex ) ;});
  }

  save<T extends IOpex>(data: T){
    console.log("save opex", data); 
    this.simpleOpex = data;
    this.simpleOpex['isExternal'] = true;
    this.observableOpex$.next(this.simpleOpex);
  }

}


