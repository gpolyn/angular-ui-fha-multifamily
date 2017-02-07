import {Injectable} from '@angular/core';
import { ParkingIncome } from './parking-income';

@Injectable()
export class ParkingIncomeService{

  getNewIncome(isCommercial: boolean): ParkingIncome {
    return new ParkingIncome(isCommercial);
  }

}

