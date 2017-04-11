import { IIncome2 } from '../../income-service.interface';
import { Observable } from 'rxjs/Observable';
import { ComponentFixture, inject, TestBed, async } from '@angular/core/testing';
import { By }                                from '@angular/platform-browser';
import { DebugElement, Input, Output, Component, EventEmitter } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

const INITIAL_OTHER_INCOME_CONFIG = {
  parkingStyle: 'indoor',
  squareFeet: 20,
  monthlyFee: 300,
  spaces: 300,
  totalMonthlyIncome: undefined
};

import { IParkingIncome } from './parking-income';
import { PARKING_INC_CONFIG } from './config';
import { CommercialIncomeService, ResidentialIncomeService }      from './parking-income.service';
import { CommercialParkingIncomeComponent, ResidentialParkingIncomeComponent } from './parking-income.component';
import { ParkingIncomeSourceComponent } from './parking-income-source.component';

const someIncome: IParkingIncome = {
  parkingStyle: 'outdoor',
  squareFeet: 200,
  monthlyFee: 304,
  spaces: 320,
  totalMonthlyIncome: undefined
};

abstract class FakeIncomeServiceBase {

  privateIncomes: BehaviorSubject<IParkingIncome[]> = new BehaviorSubject([]);
  chincomes$: Observable<IParkingIncome[]> = this.privateIncomes.asObservable();

  addIncome(income: IParkingIncome) {}
  removeIncome(income: IParkingIncome) {}

}

class FakeCommercialIncomeService extends FakeIncomeServiceBase implements CommercialIncomeService { }

class FakeResidentialIncomeService extends FakeIncomeServiceBase implements ResidentialIncomeService { }

@Component({
  selector: 'parking-income-source',
  template: ''
})
class MockParkingIncomeSourceComponent {
  @Input() income;
  @Output() onDestroy: EventEmitter<any> = new EventEmitter(false);
}

let comp: any;
let fixture: any;
let componentIncomeService: any;
let incomeService: any;
let spy: any;

describe('ResidentialParkingIncomeComponent', () => {

	beforeEach(() => {

    TestBed.configureTestingModule({
       declarations: [ ParkingIncomeSourceComponent, ResidentialParkingIncomeComponent ],
       imports: [ReactiveFormsModule, FormsModule],
       providers:    [ 
         {provide: ResidentialIncomeService, useClass: FakeResidentialIncomeService},
         {provide: PARKING_INC_CONFIG, useValue: INITIAL_OTHER_INCOME_CONFIG}
			 ]
    });

    TestBed.compileComponents();
    fixture = TestBed.createComponent(ResidentialParkingIncomeComponent);
    comp    = fixture.componentInstance;

    fixture.detectChanges();

    incomeService = fixture.debugElement.injector.get(ResidentialIncomeService);
    componentIncomeService = incomeService;
    incomeService = TestBed.get(ResidentialIncomeService);

	});

  tests();

})

describe('CommercialParkingIncomeComponent', () => {

	beforeEach(() => {

    TestBed.configureTestingModule({
       declarations: [ ParkingIncomeSourceComponent, CommercialParkingIncomeComponent ],
       imports: [ReactiveFormsModule, FormsModule],
       providers:    [ 
         {provide: CommercialIncomeService, useClass: FakeCommercialIncomeService},
         {provide: PARKING_INC_CONFIG, useValue: INITIAL_OTHER_INCOME_CONFIG}
			 ]
    });


    TestBed.compileComponents();
    fixture = TestBed.createComponent(CommercialParkingIncomeComponent);
    comp    = fixture.componentInstance;

    fixture.detectChanges();

    incomeService = fixture.debugElement.injector.get(CommercialIncomeService);
    componentIncomeService = incomeService;
    incomeService = TestBed.get(CommercialIncomeService);

	});

  tests();

});

function tests(){

  it('should initially display configured income spaces', () => {
    expect(comp.newIncomeForm.controls['spaces'].value).toEqual(INITIAL_OTHER_INCOME_CONFIG.spaces);
  });

  it('should initially display configured parkingStyle', () => {
    expect(comp.newIncomeForm.controls['parkingStyle'].value).toEqual(INITIAL_OTHER_INCOME_CONFIG.parkingStyle);
  });

  it('should initially display configured square feet', () => {
    expect(comp.newIncomeForm.controls['squareFeet'].value).toEqual(INITIAL_OTHER_INCOME_CONFIG.squareFeet);
  });

  it('should initially display configured monthly fee', () => {
    expect(comp.newIncomeForm.controls['monthlyFee'].value).toEqual(INITIAL_OTHER_INCOME_CONFIG.monthlyFee);
  });

  it('should handle parking-income-source onDestroy with handleDestroy',()=>{

    componentIncomeService.privateIncomes.next([someIncome]);

    fixture.detectChanges();

    const otherIncomes = fixture.debugElement.queryAllNodes(By.css('parking-income-source'));

    const expected = "expected";

    spyOn(comp, 'handleDestroy');

    otherIncomes[0].componentInstance.onDestroy.emit(expected);

    expect(comp.handleDestroy).toHaveBeenCalledWith(expected);
    
  })

  it('should call removeIncome on service from handleDestroy', ()=>{

    componentIncomeService.privateIncomes.next([someIncome]);

    fixture.detectChanges();

    const otherIncomes = fixture.debugElement.queryAllNodes(By.css('parking-income-source'));

    const expected = "expected";

    spyOn(incomeService, 'removeIncome');

    otherIncomes[0].componentInstance.onDestroy.emit(someIncome);

    expect(incomeService.removeIncome).toHaveBeenCalledWith(someIncome);
    
  })

  it('should add valid income with CommercialIncomeService', () => {
    spy = spyOn(incomeService, 'addIncome');
    comp.newIncomeForm.patchValue({monthlyFee: 300, spaces: 26});
		const button = fixture.debugElement.nativeElement.querySelector('button.add-item');
		button.click();
    const whatWasCalled: IIncome2 = spy.calls.mostRecent();
    expect(whatWasCalled.totalMonthlyIncome).not.toBe(null);
  });

  it('should not add income without monthlyFee with CommercialIncomeService', () => {
    spy = spyOn(incomeService, 'addIncome');
    comp.newIncomeForm.patchValue({monthlyFee: undefined});
		const button = fixture.debugElement.nativeElement.querySelector('button.add-item');
		button.click();
    expect(spy.calls.any()).toEqual(false);
  });

  it('should not add income without spaces with backing income service', () => {
    spy = spyOn(incomeService, 'addIncome');
    comp.newIncomeForm.patchValue({spaces: undefined});
		const button = fixture.debugElement.nativeElement.querySelector('button.add-item');
		button.click();
    expect(spy.calls.any()).toEqual(false);
  });

  it('should call removeIncome when delete is clicked on particular income', () => {

    spyOn(incomeService, 'removeIncome');

    componentIncomeService.privateIncomes.next([someIncome]);

    fixture.detectChanges();

    const initialList = fixture.debugElement.queryAllNodes(By.css('parking-income-source'));
    expect(initialList.length).toBe(1);

		const button = fixture.debugElement.nativeElement.querySelector('parking-income-source button');

    button.click();

    expect(incomeService.removeIncome).toHaveBeenCalledWith(someIncome);

  });

  it('should display observable incomes', () => {

    const initialList = fixture.debugElement.queryAllNodes(By.css('parking-income-source'));
    expect(initialList.length).toBe(0);

    componentIncomeService.privateIncomes.next([someIncome]);

    fixture.detectChanges();

    const updatedList = fixture.debugElement.queryAllNodes(By.css('parking-income-source'));

    let incomes;

    comp.incomes.subscribe((_incomes: any) => {
      incomes = _incomes;
    })

    expect(updatedList.length).toBe(1);
    expect(updatedList[0].componentInstance.income).toBe(incomes[0]);

  });

}

