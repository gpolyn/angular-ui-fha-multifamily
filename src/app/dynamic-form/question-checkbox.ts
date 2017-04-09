import { QuestionBase } from './question-base';

export class CheckboxQuestion extends QuestionBase<string> {
  controlType = 'checkbox';
  type: 'checkbox';
  value: 'true';

  constructor(options: {} = {}) {
    super(options);
    this.type = options['type'] || '';
  }
}
