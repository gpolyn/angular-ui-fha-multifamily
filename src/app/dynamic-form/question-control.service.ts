import { Injectable }   from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { QuestionBase } from './question-base';

@Injectable()
export class QuestionControlService {
  constructor() { }

  objectToFormGroup(questions: any, initialValues?: any) {
    console.log('objectToFormGroup initialValue', initialValues)
    let group: any = {};
    let initialVal = null;

    for (let questionKey in questions){
      initialVal = initialValues[questions[questionKey].name];
      group[questionKey] =  new FormControl(initialVal || '', questions[questionKey].validators);
    }
    console.log('group is ', group)
    return new FormGroup(group, this.checkboxValidator);
  }

  checkboxValidator(g: FormGroup){
    if (g.get('financing-fee-is-percent-of-loan').value && Number(g.get('financing-fee').value) > 100){
      g.patchValue({'financing-fee': 100});
    }
    if (g.get('title-and-recording-percent').value && Number(g.get('title-and-recording').value) > 100){
      g.patchValue({'title-and-recording': 100});
    }
    return null;
  }

  /*
  checkboxValidator(g: FormGroup){
    if (g.get('financing_fee_is_percent_of_loan').value && Number(g.get('financing_fee').value) > 100){
      g.patchValue({'financing_fee': 100});
    }
    if (g.get('title_and_recording_is_percent_of_loan').value && Number(g.get('title_and_recording').value) > 100){
      g.patchValue({'title_and_recording': 100});
    }
    return null;
  }
  */
}
