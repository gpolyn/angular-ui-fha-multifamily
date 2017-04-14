import { Injectable, EventEmitter, Optional} from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { CommercialIncomeService, ResidentialIncomeService} from '../special.service';
import { OpexService } from '../opex.service';

export interface IOpex {
  opex: number;
  isPercent: boolean;  
}

export interface IServiceContainer extends IOpex {
  metadata?: any;
}

@Injectable()
export class OperatingExpensesService {

  private opex: BehaviorSubject<IServiceContainer>; 
  observableOpex$: BehaviorSubject<IServiceContainer>;
  private simpleOpex: IOpex;
  readonly TOKEN: string = 'fart';

  private effectiveIncome: BehaviorSubject<number>;
  observableEffectiveIncome$: Observable<number>;

  observableNOI$: Observable<number>;

  constructor(
    @Optional() private commercialIncome: CommercialIncomeService,
    private residentialIncome: ResidentialIncomeService,
    private opexBackend: OpexService 
  ){
  // console.log("Opex service", commercialIncome, residentialIncome);

    //this.observableEffectiveIncome$ = Observable.combineLatest(commercialIncome.egi$, residentialIncome.egi$, (comm, residential) => { return comm + residential;});
    
    this.opex = new BehaviorSubject<IOpex>(<IOpex>{opex: 30, isPercent: true});
    this.observableOpex$ = this.opex;

    this.observableNOI$ = Observable.combineLatest(this.observableEffectiveIncome$, this.observableOpex$, (inc,opex)=>{ return opex.isPercent ? ( inc * (1 - opex.opex/100.0) ) : ( inc - opex.opex ) ;});
    opexBackend.opex$.filter(opex => opex.metadata == this.TOKEN).subscribe(result => console.log("hey baby", result));
  }

  save<T extends IOpex>(data: T){
    // console.log("save opex", data); 
    this.simpleOpex = data;
    this.observableOpex$.next(this.simpleOpex);
    this.simpleOpex['metadata'] = this.TOKEN;
    this.opexBackend.save(this.simpleOpex)
  }

}


