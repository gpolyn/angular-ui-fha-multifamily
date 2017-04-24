import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { IOtherIncome } from './interfaces/other-income.interface';
import { OtherIncomeSourceComponent } from './other-income-source.component';

const testIncome: IOtherIncome = {
  usage: "some use",
  squareFeet: 25,
  monthlyRent: 250,
  totalMonthlyIncome: undefined
};

let comp: any;
let usageEl: DebugElement;
let squareFeetEl: DebugElement;
let monthlyRentEl: DebugElement;
let expectedIncome: IOtherIncome;

describe('OtherIncomeSourceComponent when tested directly', () => {

  let fixture: ComponentFixture<OtherIncomeSourceComponent<IOtherIncome>>;

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

  tests();

  it('should raise selected event when clicked', () => {

    comp.onDestroy.subscribe( event => {
			expect(event).toEqual(expectedIncome);
		});

		let button = fixture.debugElement.nativeElement.querySelector('button');

		button.click();

  });

});

describe('IncomeSourceComponent when inside a test host', () => {

  let fixture: ComponentFixture<TestHostComponent>;

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
    comp = fixture.componentInstance;
		usageEl = fixture.debugElement.query(By.css('.use')); 
		squareFeetEl = fixture.debugElement.query(By.css('.square-feet')); 
		monthlyRentEl = fixture.debugElement.query(By.css('.monthly-rent')); 
		expectedIncome = testIncome;
		comp.income = expectedIncome;
    fixture.detectChanges();
  });

  tests();

  it('should raise event when clicked', () => {

		let button = fixture.debugElement.nativeElement.querySelector('button');
		button.click()
		expect(comp.incomeForDestruction).toBe(testIncome);

  });

});

function tests(){

  it('should display income usage', () => {
    expect(usageEl.nativeElement.textContent).toContain(comp.income.usage);
  });

  it('should display square feet', () => {
    expect(squareFeetEl.nativeElement.textContent).toContain(comp.income.squareFeet);
  });

  it('should display monthly rent', () => {
    expect(monthlyRentEl.nativeElement.textContent).toContain(comp.income.monthlyRent);
  });

}

import { Component } from '@angular/core';

@Component({
  template: `
    <other-income-source class="other-income-source" [income]="income"  (onDestroy)="handleDestroy($event)"></other-income-source>`
})
class TestHostComponent {

  income: IOtherIncome = testIncome; 
	incomeForDestruction: IOtherIncome;
  handleDestroy(income) { this.incomeForDestruction = income; }

}
