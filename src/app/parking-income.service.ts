import {Injectable} from '@angular/core';
import { ResidentialParkingIncome, CommercialParkingIncome } from './parking-income';

@Injectable()
export class ParkingIncomeService {

  getNewIncome(isCommercial: boolean) {
    return isCommercial ? new CommercialParkingIncome() : new ResidentialParkingIncome();
  }

}

