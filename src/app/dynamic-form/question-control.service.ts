import { Injectable }   from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { QuestionBase } from './question-base';

@Injectable()
export class QuestionControlService {
  constructor() { }

  toFormGroup(questions: QuestionBase<any>[] ) {
    let group: any = {};

    questions.forEach(question => {
      group[question.key] =  new FormControl(question.value || '', question.validators);
    });
    group['counter-input'] = new FormControl('');
    return new FormGroup(group);
  }
}
