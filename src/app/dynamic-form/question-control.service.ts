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
    console.log('HEY XU', group);
    return new FormGroup(group);
  }

  objectToFormGroup(questions: any) {
    console.log('objectToFormGroup', questions);
    let group: any = {};

    for (let questionKey in questions){
      console.log('k', questionKey)
      group[questionKey] =  new FormControl(questions[questionKey].value || '', questions[questionKey].validators);
    }
    console.log('HEY FU', group);
    return new FormGroup(group, this.checkboxValidator);
  }

  checkboxValidator(g: FormGroup){
    console.log({amount: g.get('transaction-amount').value, term: g.get('loan-term').value})
    if (g.get('financing-fee-is-percent-of-loan').value && Number(g.get('other').value) > 100){
      g.patchValue({'other': 100});
    }
    return null;
  }
}
