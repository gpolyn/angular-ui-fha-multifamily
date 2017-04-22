import { IIncome } from './interfaces';

export interface IApartmentIncome {
  bedrooms: number;
  units: number;
  squareFeet?: number;
  monthlyRent: number;
}

export class ApartmentIncome implements IIncome {
  id: any;
  bedrooms: number = 0;
  readonly isCommercial: boolean = false;
  units: number;
  squareFeet: number;
  monthlyRent: number;
  readonly bedroomRange: number[] = [0,1,2,3,4];
  readonly type: string = 'ApartmentIncome';

  constructor(bedrooms?: number) {
  }

  isValid(): boolean {
    return (this.units > 0 && this.monthlyRent > -1 && this.bedrooms > -1);
  }

  totalMonthlyIncome(): number {
    if ( this.isValid() ) {
      return this.units * this.monthlyRent;
    }
    return 0; // no income if not valid
  }

}
