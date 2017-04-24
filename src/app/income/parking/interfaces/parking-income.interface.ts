import { IIncome2 } from './app.interface';

export interface IParkingIncome extends IIncome2 {

  parkingStyle: string;
  squareFeet?: number;
  spaces: number;
  monthlyFee: number;
  totalMonthlyIncome: number;

}
