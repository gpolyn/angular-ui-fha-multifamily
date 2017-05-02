import { Inject, Component, Input, OnInit }  from '@angular/core';
import { FormGroup }                 from '@angular/forms';
import { QuestionBase }              from './question-base';
import { QuestionControlService }    from './question-control.service';
import { QuestionService }           from './question.service';
import { LoanCostsService, ILoanCosts }          from '../../services';
import { LOAN_COSTS_CONFIG } from './config';

@Component({
  selector: 'loan-characteristics',
  template: require('./dynamic-form.component.html'),
  providers: [ QuestionControlService, LoanCostsService ]
})
export class DynamicFormComponent implements OnInit {
  @Input() questions: QuestionBase<any>[] = [];
  @Input() questionsObj: any = {};
  form: FormGroup;
  costs$: any;
  private initialValues: any;
  payLoad = '';
  private subs: any[] = [];

  constructor(private qcs: QuestionControlService, private costSvc: LoanCostsService, private qs: QuestionService, @Inject(LOAN_COSTS_CONFIG) private config: any) {  }
  ngOnInit() {
    console.log('questionsObj', this.questionsObj)
    this.costSvc.costs$.subscribe(data => this.initialValues = data.data);
    const combinedInitialVals = {...this.config, ...this.initialValues};
    //this.form = this.qcs.objectToFormGroup(this.questionsObj, this.initialValues);
    this.form = this.qcs.objectToFormGroup(this.questionsObj, combinedInitialVals);
    this.form.valueChanges.subscribe((e)=>console.log(e));
    this.enforceOptionalMaxNumericLimit = this.enforceOptionalMaxNumericLimit.bind(this);
    this.form.valueChanges.subscribe(this.enforceOptionalMaxNumericLimit);
    // this.costSvc.costs$.subscribe(costs => this.costs$ = costs);
    this.handleCostsSvcChange = this.handleCostsSvcChange.bind(this);
    this.subs.push(this.costSvc.costs$.subscribe(this.handleCostsSvcChange));
  }

  ngOnDestroy(){
    this.subs.forEach(sub => sub.unsubscribe());
  }

  handleCostsSvcChange(payload: any){
    if (payload.metadata !== this.costSvc.currentAuthorId){
      console.log('data is not mine ', payload);
      // object comparison ?
      // update view
      this.costs$ = payload.data;
    } else {
      console.log('data is already mine ', payload);
      this.costs$ = payload.data;
    }

  }

  private enforceOptionalMaxNumericLimit(e) {
    // console.log('LAH', e);
    const converted = this.qs.convertValues(e);
    console.log('cvted', converted);
    this.costSvc.save(<ILoanCosts>converted);
  };

}
