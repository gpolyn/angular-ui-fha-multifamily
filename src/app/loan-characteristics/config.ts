import { OpaqueToken } from '@angular/core';

export const INITIAL_CONFIG = {
  loan_type: 'purchase',
  term_in_months: 420,
  mortgage_interest_rate: 5.25,
  annual_replacment_reserve_per_unit: 400
};

export let LOAN_COSTS_CONFIG = new OpaqueToken('app.loanCosts.initialConfig');
