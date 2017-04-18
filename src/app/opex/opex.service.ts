import { Injectable, EventEmitter, Optional} from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { GrossIncomeService} from '../special.service';
import { OpexService } from '../opex.service';

export interface IOpex {
  operating_expenses: number;
  operating_expenses_is_percent_of_effective_gross_income: boolean;  
}

@Injectable()
export class OperatingExpensesService {

  private opex: IOpex;
  private gross: number = 0;
  observableOpex$: BehaviorSubject<IOpex>;
  private noi$: BehaviorSubject<number>;
  observableNOI$: Observable<number>;

  constructor(
    private grossIncomeService: GrossIncomeService,
    private opexBackend: OpexService 
  ){
    this.noi$ = new BehaviorSubject<number>(0);
    this.observableNOI$ = this.noi$.asObservable();
    this.calculateNOI = this.calculateNOI.bind(this);
    this.opexBackend.opex$.subscribe(val => {
      this.opex = val;
      this.calculateNOI();
    });
    this.grossIncomeService.grossIncome$.subscribe(val => {
      this.gross = val;
      this.calculateNOI();
    });
    this.observableOpex$ = new BehaviorSubject<IOpex>(this.opex);
    this.save = this.save.bind(this);
    this.calculateNOI = this.calculateNOI.bind(this);
  }

  calculateNOI(){
    let noi;

    if (this.opex.operating_expenses_is_percent_of_effective_gross_income === true){
      noi = this.gross * (1 - this.opex.operating_expenses/100.0);
    } else {
      noi = this.gross - this.opex.operating_expenses;
    }

    this.noi$.next(noi);
  }

  save<T extends IOpex>(data: T){
    this.opexBackend.save(data)
  }

}


