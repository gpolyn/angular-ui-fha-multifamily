export interface IIncome {
  id: any;
  readonly isCommercial: boolean;
  totalMonthlyIncome(): number;
  type: string;
}
