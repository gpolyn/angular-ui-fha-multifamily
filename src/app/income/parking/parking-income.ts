import { OpaqueToken } from '@angular/core';
import { IIncome2 } from '../../income-service.interface';

export interface IParkingIncome extends IIncome2 {

  parkingStyle: string;
  squareFeet: number;
  spaces: number;
  monthlyFee: number;
  totalMonthlyIncome: number;

}

export class ParkingIncome implements IIncome2 {

  id: any;
  parkingStyle: string;
  squareFeet: number;
  spaces: number;
  monthlyFee: number;
  totalMonthlyIncome: number;

  // readonly isCommercial: boolean;
  // readonly type: string;
  readonly parkingStyles: string[] = ['indoor', 'outdoor'];
  static INDOOR: string = 'indoor';
  static OUTDOOR: string = 'outdoor';

  constructor(options: {
    spaces: number,
    squareFeet?: number,
    monthlyFee: number,
    isIndoor?: boolean
  }) {

    this.spaces = options.spaces;
    this.squareFeet = options.squareFeet;
    this.monthlyFee = options.monthlyFee;

    if (options.isIndoor){
      this.parkingStyle = this.parkingStyles[0];
    } else {
      this.parkingStyle = this.parkingStyles[1];
    }

    this.totalMonthlyIncome = this.monthlyFee * this.spaces;
  }

  /*
  
  isValid(): boolean {
    return this.monthlyFee > 0 &&  this.spaces > 0 && this.squareFeetIsValid();
  }

  totalMonthlyIncome(): number {
    return this.isValid() ? this.monthlyFee * this.spaces : 0;
  }
  */

  private squareFeetIsValid(): boolean {
    return this.squareFeet ? this.squareFeet > 0 : true;
  }

}

export const INITIAL_PARKING_INCOME_CONFIG: IParkingIncome = {
  parkingStyle: undefined,
  squareFeet: undefined,
  spaces: undefined,
  monthlyFee: undefined,
  totalMonthlyIncome: undefined
};

export let PARKING_INC_CONFIG = new OpaqueToken('app.parkingIncome.initialConfig');
