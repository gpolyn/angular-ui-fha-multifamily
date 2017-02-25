import { IIncome2 } from '../../income-service.interface';
import { Observable } from 'rxjs/Observable';
import { ComponentFixture, inject, TestBed, async } from '@angular/core/testing';
import { By }                                from '@angular/platform-browser';
import { DebugElement, Input, Output, Component, EventEmitter } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

const INITIAL_OTHER_INCOME_CONFIG = {
  usage: "blah blah",
  squareFeet: 20,
  monthlyRent: 300,
  totalMonthlyIncome: undefined
};

import { OTHER_INC_CONFIG, IOtherIncome } from './other-income';
import { CommercialIncomeService, ResidentialIncomeService }      from './other-income.service';
import { CommercialOtherIncomeComponent, ResidentialOtherIncomeComponent } from './other-income.component';
import { OtherIncome } from './other-income';
import { OtherIncomeSourceComponent } from './other-income-source.component';

const someIncome: IOtherIncome = {
  usage: "f u",
  squareFeet: 208,
  monthlyRent: 310,
  totalMonthlyIncome: undefined
};

abstract class FakeIncomeServiceBase {

  privateIncomes: BehaviorSubject<OtherIncome[]> = new BehaviorSubject([]);
  chincomes$: Observable<OtherIncome[]> = this.privateIncomes.asObservable();

  addIncome(income: OtherIncome) {}
  removeIncome(income: OtherIncome) {}

}

class FakeCommercialIncomeService extends FakeIncomeServiceBase implements CommercialIncomeService {

}

class FakeResidentialIncomeService extends FakeIncomeServiceBase implements ResidentialIncomeService {

}

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
         OtherIncome,
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
         OtherIncome,
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

