import { IIncome } from './interfaces';

export abstract class OtherIncome implements IIncome {

  id: any;
  usage: string;
  squareFeet: number;
  monthlyRent: number;
  readonly isCommercial: boolean;
  readonly type: string;

  isValid(): boolean {
    return this.monthlyRent > 0 && this.squareFeetIsValid();
  }

  totalMonthlyIncome(): number {
    return this.isValid() ? this.monthlyRent : 0;
  }

  private squareFeetIsValid(): boolean {
  return this.squareFeet ? this.squareFeet > 0 : true;
  }

}

export class OtherResidentialIncome extends OtherIncome {

  readonly isCommercial: boolean = false;
  readonly type: string = 'OtherResidentialIncome';

}

export class OtherCommercialIncome extends OtherIncome {

  readonly isCommercial: boolean = true;
  readonly type: string = 'OtherCommercialIncome';

}
