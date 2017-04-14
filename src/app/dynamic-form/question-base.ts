import { ValidatorFn} from '@angular/forms';

export class QuestionBase<T>{
  value: T;
  key: string;
  name: string;
  className: string;
  label: string;
  id: string;
  required: boolean;
  containerId: string;
  type: string;
  controlType: string;
  validators: ValidatorFn|ValidatorFn[];
  constructor(options: {
      value?: T,
      key?: string,
      label?: string,
      required?: boolean,
      type?: string,
      id?: string,
      name?: string,
      controlType?: string,
      validators?: ValidatorFn|ValidatorFn[]
    } = {}) {
    this.value = options.value;
    this.key = options.key || '';
    this.label = options.label || '';
    this.required = !!options.required;
    this.controlType = options.controlType || '';
    this.type = options.type || '';
    this.validators = options.validators;
    this.id = options.id;
    this.name = options.name;
  }

}
