import { Observable } from 'rxjs/Observable';
import {GUID, CURRENT_AUTHOR_ID} from '../app-config';
import { ComponentFixture, inject, TestBed, async } from '@angular/core/testing';
import { By }                                from '@angular/platform-browser';
import { DebugElement, Input, Output, Component, EventEmitter } from '@angular/core';
import { Validators, ValidatorFn, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { DynamicFormComponent} from './dynamic-form.component';
import { DynamicFormQuestionComponent } from './dynamic-form-question.component';
import { QuestionService }    from './question.service';
import { LoanCostsService, LocalStorageService }          from '../services';
import { LOAN_COSTS_CONFIG } from './config';

class FakeLoanCostsService {
};
class FakeLocalStorageService { 
  get(data: any) { 
    return {data: []};
  }
  put(arg1: any, arg2: any){
  }
};

describe('DynamicFormComponent', () => {

  let component: DynamicFormComponent;
  let fixture: ComponentFixture<DynamicFormComponent>;
	let questions: QuestionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormsModule], 
      declarations: [DynamicFormComponent, DynamicFormQuestionComponent],
      providers: [ 
      QuestionService, 
      {provide: LocalStorageService, useClass: FakeLocalStorageService}, 
      {provide: LoanCostsService, useClass: FakeLoanCostsService}, 
      {provide: CURRENT_AUTHOR_ID, useValue: GUID},
      {provide: LOAN_COSTS_CONFIG, useValue: 'some value'}
      ]
    });

    fixture = TestBed.createComponent(DynamicFormComponent);
    component = fixture.componentInstance;
    questions = TestBed.get(QuestionService); 
    component.questionsObj = questions.getQuestionsObject();
    component.ngOnInit(); 
    fixture.detectChanges();
  });

	it('should have loan-term field for values between 0 and 420', () => {
		let term = component.form.controls['loan-term'];
    const maxTerm = 420;
    expect(term.value).toBe(maxTerm)
		term.setValue(maxTerm - 1);
    expect(term.value).toBe(maxTerm - 1)
		term.setValue(maxTerm + 1);
    expect(term.value).toBe(maxTerm)
    const minTerm = 0;
		term.setValue(minTerm + 1);
    expect(term.value).toBe(minTerm + 1)
		term.setValue(minTerm - 1);
    expect(term.value).toBe(minTerm)
	});

	it('should have mortgage-interest-rate field for values bewteen 0 and 99', () => {
		let subj = component.form.controls['mortgage-interest-rate'];
    const maxRate = 99;
    expect(subj.value).not.toBe(maxRate - 1);
		subj.setValue(maxRate - 1);
    expect(subj.value).toBe(maxRate - 1);
		subj.setValue(maxRate + 1);
    expect(subj.value).toBe(maxRate);
    const minRate = 0;
		subj.setValue(minRate + 1);
    expect(subj.value).toBe(minRate + 1)
		subj.setValue(minRate - 1);
    expect(subj.value).toBe(minRate)
	});

  it('should enfore max 100 value for title-and-recording, financing-fee under certain conditions ', ()=>{
    const subjects = [
      {field: 'title-and-recording', checkbox: 'title-and-recording-percent'},
      {field: 'financing-fee', checkbox: 'financing-fee-is-percent-of-loan'}
    ];
    subjects.forEach( subj => {
      let field = component.form.controls[subj.field];
      let checkbox = component.form.controls[subj.checkbox];
      checkbox.setValue(false);
      field.setValue(101);
      expect(field.value).toBe(101);
      checkbox.setValue(true);
      expect(field.value).toBe(100);
      field.setValue(200);
      expect(field.value).toBe(100);
    });
  })

  it('should have expected form elements in the DOM', ()=>{
    const fields = [
      'loan-request-amount',
      'land-value',
      'loan-term',
      'mortgage-interest-rate',
      'project-value',
      'legal-and-organizational',
      'repairs-or-improvements',
      'survey',
      'other',
      'financing-fee',
      'title-and-recording',
      'third-party-reports'
    ];

    fields.forEach( fldVal => {
      let ele = fixture.nativeElement.querySelector("label[for|='" + fldVal + "']");
      expect(ele).not.toBe(null);
      ele = fixture.nativeElement.querySelector("input#" + fldVal);
      expect(ele).not.toBe(null);
    });

  });

  it('should have expected number of df-question components', () => {
      let eles = fixture.nativeElement.querySelectorAll("df-question");
      expect(eles.length).toBe(17);
  })

});


/*
import { OTHER_INC_CONFIG, IOtherIncome } from './other-income';
import { CommercialIncomeService, ResidentialIncomeService }      from './other-income.service';
import { CommercialOtherIncomeComponent, ResidentialOtherIncomeComponent } from './other-income.component';
import { OtherIncomeSourceComponent } from './other-income-source.component';

const someIncome: IOtherIncome = {
  usage: "f u",
  squareFeet: 208,
  monthlyRent: 310,
  totalMonthlyIncome: undefined
};

abstract class FakeIncomeServiceBase {

  privateIncomes: BehaviorSubject<IOtherIncome[]> = new BehaviorSubject([]);
  chincomes$: Observable<IOtherIncome[]> = this.privateIncomes.asObservable();

  addIncome(income: IOtherIncome) {}
  removeIncome(income: IOtherIncome) {}

}

class FakeCommercialIncomeService extends FakeIncomeServiceBase implements CommercialIncomeService { }

class FakeResidentialIncomeService extends FakeIncomeServiceBase implements ResidentialIncomeService { }

@Component({
  selector: 'other-income-source',
  template: ''
})
class MockOtherIncomeSourceComponent {
  @Input() income;
  @Output() onDestroy: EventEmitter<any> = new EventEmitter(false);
}

let comp: any;
let fixture: any;
let componentIncomeService: any;
let incomeService: any;
let spy: any;

describe('ResidentialOtherIncomeComponent', () => {

	beforeEach(() => {

    TestBed.configureTestingModule({
       declarations: [ OtherIncomeSourceComponent, ResidentialOtherIncomeComponent ],
       imports: [ReactiveFormsModule, FormsModule],
       providers:    [ 
         {provide: ResidentialIncomeService, useClass: FakeResidentialIncomeService},
         {provide: OTHER_INC_CONFIG, useValue: INITIAL_OTHER_INCOME_CONFIG}
			 ]
    });

    TestBed.compileComponents();
    fixture = TestBed.createComponent(ResidentialOtherIncomeComponent);
    comp    = fixture.componentInstance;

    fixture.detectChanges();

    incomeService = fixture.debugElement.injector.get(ResidentialIncomeService);
    componentIncomeService = incomeService;
    incomeService = TestBed.get(ResidentialIncomeService);

	});

  tests();

})

describe('CommercialOtherIncomeComponent', () => {

	beforeEach(() => {

    TestBed.configureTestingModule({
       declarations: [ OtherIncomeSourceComponent, CommercialOtherIncomeComponent ],
       imports: [ReactiveFormsModule, FormsModule],
       providers:    [ 
         {provide: CommercialIncomeService, useClass: FakeCommercialIncomeService},
         {provide: OTHER_INC_CONFIG, useValue: INITIAL_OTHER_INCOME_CONFIG}
			 ]
    });


    TestBed.compileComponents();
    fixture = TestBed.createComponent(CommercialOtherIncomeComponent);
    comp    = fixture.componentInstance;

    fixture.detectChanges();

    incomeService = fixture.debugElement.injector.get(CommercialIncomeService);
    componentIncomeService = incomeService;
    incomeService = TestBed.get(CommercialIncomeService);

	});

  tests();

});

function tests(){

  it('should initially display configured income usage', () => {
    expect(comp.newIncomeForm.controls['usage'].value).toEqual(INITIAL_OTHER_INCOME_CONFIG.usage);
  });

  it('should initially display configured square feet', () => {
    expect(comp.newIncomeForm.controls['squareFeet'].value).toEqual(INITIAL_OTHER_INCOME_CONFIG.squareFeet);
  });

  it('should initially display configured monthly rent', () => {
    expect(comp.newIncomeForm.controls['monthlyRent'].value).toEqual(INITIAL_OTHER_INCOME_CONFIG.monthlyRent);
  });

  it('should handle other-income-source onDestroy with handleDestroy',()=>{

    

    componentIncomeService.privateIncomes.next([someIncome]);

    fixture.detectChanges();

    const otherIncomes = fixture.debugElement.queryAllNodes(By.css('other-income-source'));

    const expected = "expected";

    spyOn(comp, 'handleDestroy');

    otherIncomes[0].componentInstance.onDestroy.emit(expected);

    expect(comp.handleDestroy).toHaveBeenCalledWith(expected);
    
  })

  it('should call removeIncome on service from handleDestroy', ()=>{

    componentIncomeService.privateIncomes.next([someIncome]);

    fixture.detectChanges();

    const otherIncomes = fixture.debugElement.queryAllNodes(By.css('other-income-source'));

    const expected = "expected";

    spyOn(incomeService, 'removeIncome');

    otherIncomes[0].componentInstance.onDestroy.emit(someIncome);

    expect(incomeService.removeIncome).toHaveBeenCalledWith(someIncome);
    
  })

  it('should add valid income with CommercialIncomeService', () => {
    spy = spyOn(incomeService, 'addIncome');
    comp.newIncomeForm.patchValue({monthlyRent: 300});
		const button = fixture.debugElement.nativeElement.querySelector('button#add-other-income');
		button.click();
    const whatWasCalled: IIncome2 = spy.calls.mostRecent();
    expect(whatWasCalled.totalMonthlyIncome).not.toBe(null);
  });

  it('should not add invalid income with CommercialIncomeService', () => {
    spy = spyOn(incomeService, 'addIncome');
    comp.newIncomeForm.patchValue({monthlyRent: undefined});
		const button = fixture.debugElement.nativeElement.querySelector('button#add-other-income');
		button.click();
    expect(spy.calls.any()).toEqual(false);
  });

  it('should call removeIncome when delete is clicked on particular income', () => {

    spyOn(incomeService, 'removeIncome');

    componentIncomeService.privateIncomes.next([someIncome]);

    fixture.detectChanges();

    const initialList = fixture.debugElement.queryAllNodes(By.css('other-income-source'));
    expect(initialList.length).toBe(1);

		const button = fixture.debugElement.nativeElement.querySelector('other-income-source button');

    button.click();

    expect(incomeService.removeIncome).toHaveBeenCalledWith(someIncome);

  });

  it('should display observable incomes', () => {

    const initialList = fixture.debugElement.queryAllNodes(By.css('other-income-source'));
    expect(initialList.length).toBe(0);

    componentIncomeService.privateIncomes.next([someIncome]);

    fixture.detectChanges();

    const updatedList = fixture.debugElement.queryAllNodes(By.css('other-income-source'));

    let incomes;

    comp.incomes.subscribe((_incomes: any) => {
      incomes = _incomes;
    })

    expect(updatedList.length).toBe(1);
    expect(updatedList[0].componentInstance.income).toBe(incomes[0]);

  });

}
*/
