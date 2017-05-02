import { Component, Input } from '@angular/core';
import { FormGroup }        from '@angular/forms';
import { QuestionBase }     from './question-base';
@Component({
  selector: 'df-question',
  template: require('./dynamic-form-question.component.html'),
  // template: require('./dynamic-form-question.component.alt.html'),
})
export class DynamicFormQuestionComponent {
  @Input() question: QuestionBase<any>;
  @Input() form: FormGroup;
}
