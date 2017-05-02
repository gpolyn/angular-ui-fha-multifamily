import { QuestionBase } from './question-base';

export class CheckboxQuestion extends QuestionBase<string> {
  controlType = 'checkbox';
  type: 'checkbox';

  constructor(options: {} = {}) {
    super(options);
  }
}
