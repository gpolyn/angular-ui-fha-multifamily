import { Injectable, Inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { CURRENT_AUTHOR_ID } from '../config';
import { LocalStorageService } from './localStorage.service';

export interface ILoanCosts {
  repairs?: number;
  financing_fee?: number;
  financing_fee_is_percent_of_loan?: boolean;
  title_and_recording?: number;
  title_and_recording_is_percent_of_loan?: boolean;
  legal_and_organizational?: number;
  third_party_reports?: number;
  survey?: number;
  other?: number;
  term_in_months: number;
  mortgage_interest_rate: number;
  annual_replacement_reserve_per_unit: number;
}

export interface IServiceContainer<T>{
  metadata: any;
  data: T;
}

const exampleCosts = {
  term_in_months: 420,
  mortgage_interest_rate: 5.75,
  annual_replacement_reserve_per_unit: 300
};

@Injectable()
export class LoanCostsService {

  private loanCosts: ILoanCosts;
  protected observableCosts: BehaviorSubject<IServiceContainer<ILoanCosts>>;
  public costs$: Observable<IServiceContainer<ILoanCosts>>;

  constructor(@Inject(CURRENT_AUTHOR_ID) public currentAuthorId: any, private storage: LocalStorageService) {
    const lastCosts = storage.get('loanCosts');
    this.loanCosts = {...exampleCosts, ...lastCosts.data};
    this.observableCosts = new BehaviorSubject({metadata: currentAuthorId, data: this.loanCosts});
    this.costs$ = this.observableCosts.asObservable();
  }

  save(loanCosts: ILoanCosts){
    this.loanCosts = loanCosts
    const containerizedCosts = {metadata: this.currentAuthorId, data: this.loanCosts};
    this.storage.put('loanCosts', containerizedCosts);
    this.observableCosts.next(containerizedCosts);
    // this.observableCosts.next(data: this.loanCosts);
  }

}
