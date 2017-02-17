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

  //constructor(isCommercial: boolean, protected isIndoor: boolean = true){
  constructor(options: {
    isCommercial?: boolean,
    spaces?: number,
    squareFeet?: number,
    monthlyFee?: number,
    isIndoor?: boolean
  } = {}) {

    this.isCommercial = options.isCommercial; 
    this.spaces = options.spaces;
    this.squareFeet = options.squareFeet;
    this.monthlyFee = options.monthlyFee;

    if (options.isIndoor){
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

abstract class ActivatableParkingIncome extends ParkingIncome {

    isActive: boolean = false;

    activate() {
        this.isActive = true;
    }
    deactivate() {
        this.isActive = false;
    }
}

export class ResidentialParkingIncome extends ActivatableParkingIncome {

  readonly isCommercial: boolean = false;
  readonly type: string = 'ResidentialParkingIncome';

}

export class CommercialParkingIncome extends ActivatableParkingIncome {

  readonly isCommercial: boolean = true;
  readonly type: string = 'CommercialParkingIncome';

}
