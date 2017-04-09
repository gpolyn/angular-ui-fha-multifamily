import { Component, Input, OnInit }  from '@angular/core';
import { FormGroup }                 from '@angular/forms';
import { QuestionBase }              from './question-base';
import { QuestionControlService }    from './question-control.service';

@Component({
  selector: 'dynamic-form',
  template: require('./dynamic-form.component.html'),
  providers: [ QuestionControlService ]
})
export class DynamicFormComponent implements OnInit {
  @Input() questions: QuestionBase<any>[] = [];
  @Input() questionsObj: any = {};
  form: FormGroup;
  elevatorStatus: any;
  payLoad = '';
  constructor(private qcs: QuestionControlService) {  }
  ngOnInit() {
    console.log('questionsObj', this.questionsObj);
    console.log('questions', this.questions);
  //this.form = this.qcs.toFormGroup(this.questions);
    this.form = this.qcs.objectToFormGroup(this.questionsObj);
    this.form.valueChanges.subscribe((e)=>console.log(e));
    this.enforceOptionalMaxNumericLimit = this.enforceOptionalMaxNumericLimit.bind(this);
    this.form.valueChanges.subscribe(this.enforceOptionalMaxNumericLimit);
  }

  private enforceOptionalMaxNumericLimit(e) {
    console.log('LAH', e);
  };

  onSubmit() {
    this.payLoad = JSON.stringify(this.form.value);
  }
}
