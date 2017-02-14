import { Component, Input, OnInit }  from '@angular/core';
import { FormGroup }                 from '@angular/forms';
import { QuestionBase }              from './question-base';
import { QuestionControlService }    from './question-control.service';
import { CounterInputComponent }    from '../input-and-checkbox/textfield-and-checkbox.component';
@Component({
  selector: 'dynamic-form',
  template: require('./dynamic-form.component.html'),
  providers: [ QuestionControlService ]
})
export class DynamicFormComponent implements OnInit {
  @Input() questions: QuestionBase<any>[] = [];
  form: FormGroup;
  payLoad = '';
  constructor(private qcs: QuestionControlService) {  }
  ngOnInit() {
    this.form = this.qcs.toFormGroup(this.questions);
    this.form.valueChanges.subscribe((e)=>console.log(e));
  }
  onSubmit() {
    this.payLoad = JSON.stringify(this.form.value);
  }
}
