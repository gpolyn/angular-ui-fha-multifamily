import { IIncome2 } from './app.interface';

export interface IOtherIncome extends IIncome2 {
  usage?: string;
  squareFeet?: number;
  monthlyRent: number;
  totalMonthlyIncome: number;
}
