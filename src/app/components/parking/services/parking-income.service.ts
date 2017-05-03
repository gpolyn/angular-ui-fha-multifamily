import { IParkingIncome } from '../interfaces/parking-income.interface';
import { Observable } from 'rxjs/Observable';
import { IResidentialIncomeService, ICommercialIncomeService } from '../interfaces/app.interface';

export abstract class CommercialIncomeService implements ICommercialIncomeService<IParkingIncome> {

  addIncome(income: IParkingIncome) {}
  removeIncome(income: IParkingIncome) {}
  chincomes$: Observable<IParkingIncome[]>;

}

export abstract class ResidentialIncomeService extends CommercialIncomeService implements IResidentialIncomeService<IParkingIncome> {
}
