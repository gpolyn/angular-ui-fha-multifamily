import { QuestionBase } from './question-base';

export class TextboxQuestion extends QuestionBase<string> {
  controlType = 'textbox';
  type: 'number';

  constructor(options: {} = {}) {
    super(options);
    this.type = options['type'] || '';
  }
}
