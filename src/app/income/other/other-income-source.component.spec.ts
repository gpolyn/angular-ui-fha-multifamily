import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { OtherIncome } from './other-income';
import { OtherIncomeSourceComponent } from './other-income-source.component';

const testIncome = new OtherIncome();
testIncome.usage = "some use";
testIncome.squareFeet = 25;
testIncome.monthlyRent = 250;

describe('OtherIncomeSourceComponent when tested directly', () => {

  let comp: OtherIncomeSourceComponent<OtherIncome>;
  let expectedIncome: OtherIncome;
  let fixture: ComponentFixture<OtherIncomeSourceComponent<OtherIncome>>;
  let usageEl: DebugElement;
  let squareFeetEl: DebugElement;
  let monthlyRentEl: DebugElement;

	beforeEach( async(() => {
		TestBed.configureTestingModule({
			declarations: [ OtherIncomeSourceComponent ],
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(OtherIncomeSourceComponent);
		comp    = fixture.componentInstance;
		usageEl = fixture.debugElement.query(By.css('.use')); 
		squareFeetEl = fixture.debugElement.query(By.css('.square-feet')); 
		monthlyRentEl = fixture.debugElement.query(By.css('.monthly-rent')); 

		expectedIncome = testIncome;
		comp.income = expectedIncome;
		
		fixture.detectChanges(); 
	});

  it('should display income usage', () => {
    expect(usageEl.nativeElement.textContent).toContain(expectedIncome.usage);
  });

  it('should display square feet', () => {
    expect(squareFeetEl.nativeElement.textContent).toContain(expectedIncome.squareFeet);
  });

  it('should display monthly rent', () => {
    expect(monthlyRentEl.nativeElement.textContent).toContain(expectedIncome.monthlyRent);
  });

  it('should raise selected event when clicked', () => {

    comp.onDestroy.subscribe( event => {
			expect(event).toEqual(expectedIncome);
		});

		let button = fixture.debugElement.nativeElement.querySelector('button');

		button.click();

  });

});

describe('IncomeSourceComponent when inside a test host', () => {

  let testHost: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;
  let usageEl: DebugElement;
  let squareFeetEl: DebugElement;
  let monthlyRentEl: DebugElement;

  beforeEach( async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
				OtherIncomeSourceComponent, 
				TestHostComponent 
			]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture  = TestBed.createComponent(TestHostComponent);
    testHost = fixture.componentInstance;
		usageEl = fixture.debugElement.query(By.css('.use')); 
		squareFeetEl = fixture.debugElement.query(By.css('.square-feet')); 
		monthlyRentEl = fixture.debugElement.query(By.css('.monthly-rent')); 
    fixture.detectChanges();
  });

  it('should display income usage', () => {
    expect(usageEl.nativeElement.textContent).toContain(testHost.income.usage);
  });

  it('should display square feet', () => {
    expect(squareFeetEl.nativeElement.textContent).toContain(testHost.income.squareFeet);
  });

  it('should display monthly rent', () => {
    expect(monthlyRentEl.nativeElement.textContent).toContain(testHost.income.monthlyRent);
  });

  it('should raise event when clicked', () => {

		let button = fixture.debugElement.nativeElement.querySelector('button');
		button.click()
		expect(testHost.incomeForDestruction).toBe(testIncome);

  });

});

import { Component } from '@angular/core';

@Component({
  template: `
    <other-income-source  [income]="income"  (onDestroy)="handleDestroy($event)"></other-income-source>`
})
class TestHostComponent {

  income: OtherIncome = testIncome; 
	incomeForDestruction: OtherIncome;
  handleDestroy(income) { this.incomeForDestruction = income; }

}
