import { IParkingIncome } from './parking-income';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { IResidentialIncomeService, ICommercialIncomeService } from '../../income-service.interface';

export abstract class CommercialIncomeService implements ICommercialIncomeService<IParkingIncome> {

  privateIncomes: BehaviorSubject<IParkingIncome[]>;
  addIncome(income: IParkingIncome) {}
  removeIncome(income: IParkingIncome) {}
  chincomes$: Observable<IParkingIncome[]>;

}

export abstract class ResidentialIncomeService extends CommercialIncomeService implements IResidentialIncomeService<IParkingIncome> {
}
