import { ParkingIncome } from './parking-income';
import { Observable } from 'rxjs/Observable';
import { IResidentialIncomeService, ICommercialIncomeService } from '../../income-service.interface';

export abstract class CommercialIncomeService implements ICommercialIncomeService<ParkingIncome> {

  addIncome(income: ParkingIncome) {}
  removeIncome(income: ParkingIncome) {}
  chincomes$: Observable<ParkingIncome[]>;

}

export abstract class ResidentialIncomeService extends CommercialIncomeService implements IResidentialIncomeService<ParkingIncome> {
}
