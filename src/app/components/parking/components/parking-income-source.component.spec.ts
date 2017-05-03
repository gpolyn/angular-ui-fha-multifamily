import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { IParkingIncome } from '../interfaces/parking-income.interface';
import { ParkingIncomeSourceComponent } from './parking-income-source.component';

const testIncome: IParkingIncome = {
  parkingStyle: '',
  squareFeet: 678,
  spaces: 34,
  monthlyFee: 432,
  totalMonthlyIncome: undefined
};

let comp: any;
let parkingStyleEl: DebugElement;
let squareFeetEl: DebugElement;
let spacesEl: DebugElement;
let monthlyFeeEl: DebugElement;
let expectedIncome: IParkingIncome;

describe('ParkingIncomeSourceComponent when tested directly', () => {

  let fixture: ComponentFixture<ParkingIncomeSourceComponent<IParkingIncome>>;

	beforeEach( async(() => {
		TestBed.configureTestingModule({
			declarations: [ ParkingIncomeSourceComponent ],
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(ParkingIncomeSourceComponent);
    commonSetup(fixture);
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

describe('ParkingIncomeSourceComponent when inside a test host', () => {

  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach( async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
				ParkingIncomeSourceComponent, 
				TestHostComponent 
			]
    }).compileComponents();
  }));

  beforeEach(() => {

    fixture = TestBed.createComponent(TestHostComponent);
    commonSetup(fixture);

  });

  tests();

  it('should raise event when clicked', () => {

		let button = fixture.debugElement.nativeElement.querySelector('button');
		button.click()
		expect(comp.incomeForDestruction).toBe(testIncome);

  });

});

function commonSetup(fixture: any){
  comp = fixture.componentInstance;
  parkingStyleEl = fixture.debugElement.query(By.css('.indoor-or-outdoor')); 
  squareFeetEl = fixture.debugElement.query(By.css('.total-square-feet')); 
  monthlyFeeEl = fixture.debugElement.query(By.css('.monthly-fee')); 
  spacesEl = fixture.debugElement.query(By.css('.spaces')); 
  expectedIncome = testIncome;
  comp.income = expectedIncome;
  fixture.detectChanges();
}

function tests(){

  it('should display income parkingStyle', () => {
    expect(parkingStyleEl.nativeElement.textContent).toContain(comp.income.parkingStyle);
  });

  it('should display square feet', () => {
    expect(squareFeetEl.nativeElement.textContent).toContain(comp.income.squareFeet);
  });

  it('should display monthly rent', () => {
    expect(monthlyFeeEl.nativeElement.textContent).toContain(comp.income.monthlyFee);
  });

  it('should display spaces', () => {
    expect(spacesEl.nativeElement.textContent).toContain(comp.income.spaces);
  });

}

import { Component } from '@angular/core';

@Component({
  template: `
    <parking-income-source [income]="income" (onDestroy)="handleDestroy($event)"></parking-income-source>`
})
class TestHostComponent {

  income: IParkingIncome = testIncome; 
	incomeForDestruction: IParkingIncome;
  handleDestroy(income) { this.incomeForDestruction = income; }

}
