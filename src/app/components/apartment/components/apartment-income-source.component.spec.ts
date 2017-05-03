import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { IApartmentIncome } from '../interfaces/apartment-income.interface';
import { ApartmentIncomeSourceComponent } from './apartment-income-source.component';

const testIncome: IApartmentIncome = {
  bedrooms: 2,
  squareFeet: 678,
  units: 34,
  monthlyRent: 432,
};

let comp: any;
let bedroomCountEl: DebugElement;
let squareFeetEl: DebugElement;
let UnitsEl: DebugElement;
let monthlyRentEl: DebugElement;
let expectedIncome: IApartmentIncome;

describe('ApartmentIncomeSourceComponent when tested directly', () => {

  let fixture: ComponentFixture<ApartmentIncomeSourceComponent<IApartmentIncome>>;

	beforeEach( async(() => {
		TestBed.configureTestingModule({
			declarations: [ ApartmentIncomeSourceComponent ],
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(ApartmentIncomeSourceComponent);
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

describe('ApartmentIncomeSourceComponent when inside a test host', () => {

  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach( async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
				ApartmentIncomeSourceComponent, 
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
  squareFeetEl = fixture.debugElement.query(By.css('.square-feet')); 
  monthlyRentEl = fixture.debugElement.query(By.css('.monthly-rent')); 
  UnitsEl = fixture.debugElement.query(By.css('.unit-count')); 
  bedroomCountEl = fixture.debugElement.query(By.css('.bedroom-count')); 
  expectedIncome = testIncome;
  comp.income = expectedIncome;
  fixture.detectChanges();
}

function tests(){

  it('should display income bedroom count', () => {
    expect(bedroomCountEl.nativeElement.textContent).toContain(comp.income.bedrooms);
  });

  it('should display square feet', () => {
    expect(squareFeetEl.nativeElement.textContent).toContain(comp.income.squareFeet);
  });

  it('should display monthly rent', () => {
    expect(monthlyRentEl.nativeElement.textContent).toContain(comp.income.monthlyRent);
  });

  it('should display units', () => {
    expect(UnitsEl.nativeElement.textContent).toContain(comp.income.units);
  });

}

import { Component } from '@angular/core';

@Component({
  template: `
    <apartment-income-source [income]="income" (onDestroy)="handleDestroy($event)"></apartment-income-source>`
})
class TestHostComponent {

  income: IApartmentIncome = testIncome; 
	incomeForDestruction: IApartmentIncome;
  handleDestroy(income) { this.incomeForDestruction = income; }

}
