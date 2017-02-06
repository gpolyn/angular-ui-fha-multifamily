import { OtherIncome } from './other-income';
import { IncomeService } from './income.service';

export abstract class OtherNonParkingIncomeComponent<T extends OtherIncome> {

  otherIncomes: Array<T> = [];

  constructor(protected incomeService: IncomeService<T>){
  }


}
