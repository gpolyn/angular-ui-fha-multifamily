import { Validators, ValidatorFn} from '@angular/forms';

export class QuestionBase<T>{
  value: T;
  key: string;
  label: string;
  required: boolean;
  maximumNumericValue: number;
  mininumNumericValue: number;
  order: number;
  controlType: string;
  validators: ValidatorFn|ValidatorFn[];
  constructor(options: {
      value?: T,
      key?: string,
      label?: string,
      required?: boolean,
      order?: number,
      controlType?: string,
      validators?: ValidatorFn|ValidatorFn[]
    } = {}) {
    this.value = options.value;
    this.key = options.key || '';
    this.label = options.label || '';
    this.required = !!options.required;
    this.order = options.order === undefined ? 1 : options.order;
    this.controlType = options.controlType || '';
    this.validators = options.validators;
  }

}
