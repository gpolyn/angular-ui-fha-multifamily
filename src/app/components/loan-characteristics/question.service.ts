import { Injectable }       from '@angular/core';
import { DropdownQuestion } from './question-dropdown';
import { QuestionBase }     from './question-base';
import { TextboxQuestion }  from './question-textbox';
import { CheckboxQuestion }  from './question-checkbox';
import { RadioQuestion }  from './question-radio';
import { Validators, ValidatorFn} from '@angular/forms';

@Injectable()
export class QuestionService {

  private xForm: any = {};
  private questions: any = {};


  constructor(){
  // let questions = {};
    this.getQuestions().forEach( question => {
      this.xForm[question.key] = question.name;
     this.questions[question.key] = question;
    //questions[question.name] = question;
    });
    //return questions;    
  }

  private getQuestions() {
    let questions: QuestionBase<any>[] = [
      new TextboxQuestion({
        key: 'transaction-amount',
        id: 'transaction-amount',
        name: 'transaction_amount',
        required: true,
        label: 'transaction amount',
        containerId: 'transaction-amount-input',
        validators: [Validators.required, this.minVal(0)],
        type: 'number',
      }),
      new TextboxQuestion({
        key: 'loan-term',
        label: 'term in months',
        name: 'term_in_months',
        value: 420,
        required: true,
        type: 'number',
        validators: [Validators.required, this.minVal(0), this.maxVal(420)],
      }),
      new TextboxQuestion({
        key: 'loan-request-amount',
        required: true,
        name: 'loan_request',
        label: 'loan request',
        validators: [Validators.required, this.minVal(0)],
        type: 'number',
      }),
      new TextboxQuestion({
        key: 'annual-replacement-reserves-per-unit',
        label: '',
        name: 'annual_replacment_reserve_per_unit',
        value: 250,
        validators: [Validators.required, this.minVal(0)],
        type: 'number',
      }),
      new TextboxQuestion({
        key: 'land-value',
        label: 'land value',
        type: 'number',
        name: 'as_is_value_of_land_in_fee_simple',
        validators: [ this.minVal(0)],
      }),
      new TextboxQuestion({
        key: 'third-party-reports',
        label: 'third party reports',
        name: 'third_party_reports',
        type: 'number',
        validators: [this.minVal(0)],
      }),
      new TextboxQuestion({
        key: 'legal-and-organizational',
        name: 'legal_and_organizational',
        label: 'legal & organizational',
        validators: [this.minVal(0)],
        type: 'number',
      }),
      new RadioQuestion({
        key: 'loan-type',
        containerId: 'transaction-amount-type-selector',
        name: 'loan_type',
        value: 'purchase',
        options: [
          {key: 'purchase',  value: 'purchase', id: 'purchase'},
          {key: 'existing debt',  value: 'debt', id: 'debt'}
        ],
      }),
      new TextboxQuestion({
        key: 'repairs-or-improvements',
        name: 'repairs',
        className: 'optional',
        label: 'repairs/improvements',
        validators: [this.minVal(0)],
        type: 'number',
      }),
      new TextboxQuestion({
        key: 'survey',
        name: 'survey',
        label: 'survey',
        validators: [this.minVal(0)],
        type: 'number',
      }),
      new TextboxQuestion({
        key: 'other',
        label: 'other',
        name: 'other',
        validators: [this.minVal(0)],
        type: 'number',
      }),
      new TextboxQuestion({
        key: 'mortgage-interest-rate',
        name: 'mortgage_interest_rate',
        required: true,
        label: 'mortgage interest rate',
        validators: [Validators.required, this.minVal(0), this.maxVal(99)],
        value: 5.25,
        type: 'number',
      }),
      new TextboxQuestion({
        key: 'project-value',
        label: 'project value',
        name: 'value_in_fee_simple',
        validators: [Validators.required, this.minVal(0)],
        type: 'number',
      }),
      new TextboxQuestion({
        key: 'financing-fee',
        label: 'financing fee',
        name: 'financing_fee',
        validators: [Validators.required, this.minVal(0)],
        type: 'number',
      }),
      new CheckboxQuestion({
        key: 'financing-fee-is-percent-of-loan',
        name: 'financing_fee_is_percent_of_loan',
        label: '% of loan',
        value: 'true',
        type: 'checkbox',
      }),
      new TextboxQuestion({
        key: 'title-and-recording',
        name: 'title_and_recording',
        label: 'title & recording',
        validators: [Validators.required, this.minVal(0)],
        type: 'number',
      }),
      new CheckboxQuestion({
        key: 'title-and-recording-percent',
        name: 'title_and_recording_is_percent_of_loan',
        label: '% of loan',
        value: 'true',
        type: 'checkbox',
      }),
    ];
    return questions;
  }

  questionKeyToDataMember(key: string){
    return this.xForm[key];
  }

  convertValues(rawValues: any){
    console.log('QuestionService#convertValues');
    const converted = {};
    let type = null;
    for (let k in rawValues){
      type = typeof(rawValues[k]);
      if (rawValues[k].length > 0 || type === 'boolean' || type === 'number'){
        if (this.questions[k].type === 'number'){
          converted[this.questions[k].name] = Number(rawValues[k]);
        } else if (this.questions[k].type === 'checkbox'){
          converted[this.questions[k].name] = rawValues[k];
        } else {
          converted[this.questions[k].name] = rawValues[k];
        }
      }
    }
    return converted;
  }

  getQuestionsObject() {
    return this.questions;
  }

  maxVal(max: number): { [key: string]: any; } {
    const special: { [key: string]: any; } = (e) => {
      if (e.value > max) {
        e.setValue(max)
      } 
    };
    return special;
  }

  maybeNumericize(): { [key: string]: any; } {
    console.log('maybeNumericize')
    const special: { [key: string]: any; } = (e) => {
      console.log(e.value);
      console.log(typeof(e.value) === 'number'); 
      console.log(typeof(e.value) === 'string'); 
      if (typeof(e.value) === 'string' && e.value.length > 0){
      //e.setValue(Number(e.value));
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
