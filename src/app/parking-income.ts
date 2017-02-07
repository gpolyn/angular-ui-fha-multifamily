import { IIncome } from './interfaces';

export class ParkingIncome implements IIncome {

  id: any;
  parkingStyle: string;
  squareFeet: number;
  spaces: number;
  monthlyFee: number;
  readonly isCommercial: boolean;
  readonly type: string;
  readonly parkingStyles: string[] = ['indoor', 'outdoor'];
  static INDOOR: string = 'indoor';
  static OUTDOOR: string = 'outdoor';
  readonly isCommercial: boolean;

  constructor(isCommercial: boolean, protected isIndoor: boolean = true){

    this.isCommercial = isCommercial; 

    if (isIndoor){
      this.parkingStyle = this.parkingStyles[0];
    } else {
      this.parkingStyle = this.parkingStyles[1];
    }

  }

  isValid(): boolean {
    return this.monthlyFee > 0 &&  this.spaces > 0 && this.squareFeetIsValid();
  }

  totalMonthlyIncome(): number {
    return this.isValid() ? this.monthlyFee * this.spaces : 0;
  }

  private squareFeetIsValid(): boolean {
    return this.squareFeet ? this.squareFeet > 0 : true;
  }

}

export class ResidentialParkingIncome extends ParkingIncome {

  readonly type: string = 'ResidentialParkingIncome';

}

export class CommercialParkingIncome extends ParkingIncome {

  readonly isCommercial: boolean = true;
  readonly type: string = 'CommercialParkingIncome';

}
