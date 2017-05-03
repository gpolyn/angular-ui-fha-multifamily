import { IOtherIncome } from '../interfaces/other-income.interface';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { IResidentialIncomeService, ICommercialIncomeService } from '../interfaces/app.interface';

export abstract class CommercialIncomeService implements ICommercialIncomeService<IOtherIncome> {

  addIncome(income: IOtherIncome) {}
  removeIncome(income: IOtherIncome) {}
  chincomes$: Observable<IOtherIncome[]>;

}

export abstract class ResidentialIncomeService extends CommercialIncomeService implements IResidentialIncomeService<IOtherIncome> {
}
