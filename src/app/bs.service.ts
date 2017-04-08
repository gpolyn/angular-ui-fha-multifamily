import {Injectable} from '@angular/core';
import { ParkingIncome } from './shared/parking-income';
import { CommercialIncomeService, ResidentialIncomeService } from './special.service';


@Injectable()
export class BSService {

  constructor(private commercial: CommercialIncomeService, private residential: ResidentialIncomeService){
    const inc1 = new ParkingIncome(true);    
    const inc2 = new ParkingIncome(false);    
    commercial.addIncome(inc1);
    residential.addIncome(inc2);
  }

}

