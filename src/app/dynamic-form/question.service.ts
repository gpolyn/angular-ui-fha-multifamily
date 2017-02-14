import { Injectable }       from '@angular/core';
import { DropdownQuestion } from './question-dropdown';
import { QuestionBase }     from './question-base';
import { TextboxQuestion }  from './question-textbox';
import { RadioQuestion }  from './question-radio';
import { Validators, ValidatorFn} from '@angular/forms';
@Injectable()
export class QuestionService {
  // Todo: get from a remote source of question metadata
  // Todo: make asynchronous
  getQuestions() {
    let questions: QuestionBase<any>[] = [
      new DropdownQuestion({
        key: 'elevator-status',
        value: 'false',
        label: 'project has elevator?',
        options: [
          {key: 'true',  value: 'true'},
          {key: 'false',  value: 'false'}
        ],
        order: 1
      }),
      new TextboxQuestion({
        key: 'transaction-amount',
        label: 'transaction amount',
        validators: [Validators.required, this.minVal(0)],
        type: 'number',
        order: 2
      }),
      new TextboxQuestion({
        key: 'loan-term',
        label: 'term in months',
        value: 420,
        required: true,
        type: 'number',
        validators: [Validators.required, this.minVal(0), this.maxVal(420)],
        order: 3
      }),
      new TextboxQuestion({
        key: 'loan-request-amount',
        label: 'loan request',
        validators: [Validators.required, this.minVal(0)],
        type: 'number',
        order: 4
      }),
      new TextboxQuestion({
        key: 'loan-replacement-reserves',
        label: 'annual replacment reserves per unit',
        value: 250,
        validators: [Validators.required, this.minVal(0)],
        type: 'number',
        order: 5
      }),
      new TextboxQuestion({
        key: 'land-value',
        label: 'land value',
        type: 'number',
        validators: [ this.minVal(0)],
        order: 6
      }),
      new TextboxQuestion({
        key: 'third-party-reports',
        label: 'third party reports',
        type: 'number',
        validators: [this.minVal(0)],
        order: 7
      }),
      new TextboxQuestion({
        key: 'legal-and-organizational',
        label: 'legal & organizational',
        validators: [this.minVal(0)],
        type: 'number',
        order: 7
      }),
      new RadioQuestion({
        key: 'loan-type',
        value: 'purchase',
        options: [
          {key: 'purchase',  value: 'purchase'},
          {key: 'existing debt',  value: 'existing debt'}
        ],
        order: 8
      }),
      new TextboxQuestion({
        key: 'repairs-and-improvements',
        label: 'repairs/improvements',
        validators: [this.minVal(0)],
        type: 'number',
        order: 9
      }),
      new TextboxQuestion({
        key: 'survey',
        label: 'survey',
        validators: [this.minVal(0)],
        type: 'number',
        order: 10
      }),
      new TextboxQuestion({
        key: 'other',
        label: 'other',
        validators: [this.minVal(0)],
        type: 'number',
        order: 11
      }),
      new TextboxQuestion({
        key: 'mortgage-interest-rate',
        label: 'mortgage interest rate',
        validators: [Validators.required, this.minVal(0), this.maxVal(99)],
        value: 5.25,
        type: 'number',
        order: 12
      }),
      new TextboxQuestion({
        key: 'project-value',
        label: 'project value',
        validators: [Validators.required, this.minVal(0)],
        type: 'number',
        order: 12
      }),
    ];
    return questions.sort((a, b) => a.order - b.order);
  }

  maxVal(max: number): { [key: string]: any; } {
    const special: { [key: string]: any; } = (e) => {
      if (e.value > max) {
        e.setValue(max)
      } 
    };
    return special;
  }

  minVal(min: number): { [key: string]: any; } {
    const special: { [key: string]: any; } = (e) => {
      if (e.value < min) {
        e.setValue(min)
      } 
    };
    return special;
  }

}