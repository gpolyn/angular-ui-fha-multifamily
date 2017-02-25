import { IOtherIncome } from './other-income';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { IResidentialIncomeService, ICommercialIncomeService } from '../../income-service.interface';

export abstract class CommercialIncomeService implements ICommercialIncomeService<IOtherIncome> {

  privateIncomes: BehaviorSubject<IOtherIncome[]>;
  addIncome(income: IOtherIncome) {}
  removeIncome(income: IOtherIncome) {}
  chincomes$: Observable<IOtherIncome[]>;

}

export abstract class ResidentialIncomeService extends CommercialIncomeService implements IResidentialIncomeService<IOtherIncome> {
}
