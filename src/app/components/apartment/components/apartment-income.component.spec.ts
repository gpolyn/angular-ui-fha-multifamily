import { IIncome2 } from '../interfaces/app.interface';
import { Observable } from 'rxjs/Observable';
import { ComponentFixture, inject, TestBed, async } from '@angular/core/testing';
import { By }                                from '@angular/platform-browser';
import { DebugElement, Input, Output, Component, EventEmitter } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

const INITIAL_APT_INCOME_CONFIG = {
  bedrooms: 2,
  squareFeet: 678,
  units: 34,
  monthlyRent: 432,
};

import { APARTMENT_INC_CONFIG} from '../config/config';
import { IApartmentIncome } from '../interfaces/apartment-income.interface';
import { ApartmentIncomeService }      from '../services/income.service';
import { ApartmentIncomeComponent } from './apartment-income.component';
import { ApartmentIncomeSourceComponent } from './apartment-income-source.component';

const someIncome: IApartmentIncome = {
  bedrooms: 3,
  squareFeet: 78,
  units: 340,
  monthlyRent: 42,
};

class FakeIncomeService {

  privateIncomes: BehaviorSubject<IApartmentIncome[]> = new BehaviorSubject([]);
  chincomes$: Observable<IApartmentIncome[]> = this.privateIncomes.asObservable();

  addIncome(income: IApartmentIncome) {}
  removeIncome(income: IApartmentIncome) {}

}

@Component({
  selector: 'apartment-income-source',
  template: ''
})
class MockApartmentIncomeSourceComponent {
  @Input() income;
  @Output() onDestroy: EventEmitter<any> = new EventEmitter(false);
}

let comp: any;
let fixture: any;
let componentIncomeService: any;
let incomeService: any;
let spy: any;

describe('ApartmentIncomeComponent', () => {

	beforeEach(() => {

    TestBed.configureTestingModule({
       declarations: [ ApartmentIncomeSourceComponent, ApartmentIncomeComponent ],
       imports: [ReactiveFormsModule, FormsModule],
       providers:    [ 
         {provide: ApartmentIncomeService, useClass: FakeIncomeService},
         {provide: APARTMENT_INC_CONFIG, useValue: INITIAL_APT_INCOME_CONFIG}
			 ]
    });

    TestBed.compileComponents();
    fixture = TestBed.createComponent(ApartmentIncomeComponent);
    comp    = fixture.componentInstance;

    fixture.detectChanges();

    incomeService = fixture.debugElement.injector.get(ApartmentIncomeService);
    componentIncomeService = incomeService;
    incomeService = TestBed.get(ApartmentIncomeService);

	});

  tests();

})

function tests(){

  it('should initially display configured income usage', () => {
    expect(comp.newIncomeForm.controls['bedrooms'].value).toEqual(INITIAL_APT_INCOME_CONFIG.bedrooms);
  });

  it('should initially display configured square feet', () => {
    expect(comp.newIncomeForm.controls['squareFeet'].value).toEqual(INITIAL_APT_INCOME_CONFIG.squareFeet);
  });

  it('should initially display configured monthly rent', () => {
    expect(comp.newIncomeForm.controls['monthlyRent'].value).toEqual(INITIAL_APT_INCOME_CONFIG.monthlyRent);
  });

  it('should handle other-income-source onDestroy with handleDestroy',()=>{

    componentIncomeService.privateIncomes.next([someIncome]);
    fixture.detectChanges();
    const otherIncomes = fixture.debugElement.queryAllNodes(By.css('apartment-income-source'));

    const expected = "expected";
    spyOn(comp, 'handleDestroy');
    otherIncomes[0].componentInstance.onDestroy.emit(expected);
    expect(comp.handleDestroy).toHaveBeenCalledWith(expected);
    
  })


  it('should call removeIncome on service from handleDestroy', ()=>{

    componentIncomeService.privateIncomes.next([someIncome]);
    fixture.detectChanges();
    const otherIncomes = fixture.debugElement.queryAllNodes(By.css('apartment-income-source'));
    const expected = "expected";
    spyOn(incomeService, 'removeIncome');
    otherIncomes[0].componentInstance.onDestroy.emit(someIncome);
    expect(incomeService.removeIncome).toHaveBeenCalledWith(someIncome);
    
  })


  it('should add valid income with ApartmentIncomeService', () => {
    spy = spyOn(incomeService, 'addIncome');
    comp.newIncomeForm.patchValue({monthlyRent: 300});
		const button = fixture.debugElement.nativeElement.querySelector('.add button');
		button.click();
    const whatWasCalled: IIncome2 = spy.calls.mostRecent();
    expect(whatWasCalled.totalMonthlyIncome).not.toBe(null);
  });

  it('should not add invalid income with ApartmentIncomeService', () => {
    spy = spyOn(incomeService, 'addIncome');
    comp.newIncomeForm.patchValue({monthlyRent: undefined});
		const button = fixture.debugElement.nativeElement.querySelector('.add button');
		button.click();
    expect(spy.calls.any()).toEqual(false);
  });


  it('should call removeIncome when delete is clicked on particular income', () => {

    spyOn(incomeService, 'removeIncome');
    componentIncomeService.privateIncomes.next([someIncome]);
    fixture.detectChanges();
    const initialList = fixture.debugElement.queryAllNodes(By.css('apartment-income-source'));
    expect(initialList.length).toBe(1);
		const button = fixture.debugElement.nativeElement.querySelector('.delete-container button');
    button.click();
    expect(incomeService.removeIncome).toHaveBeenCalledWith(someIncome);

  });


  it('should display observable incomes', () => {

    const initialList = fixture.debugElement.queryAllNodes(By.css('apartment-income-source'));
    expect(initialList.length).toBe(0);

    componentIncomeService.privateIncomes.next([someIncome]);

    fixture.detectChanges();

    const updatedList = fixture.debugElement.queryAllNodes(By.css('apartment-income-source'));

    let incomes;

    comp.incomes.subscribe((_incomes: any) => {
      incomes = _incomes;
    })

    expect(updatedList.length).toBe(1);
    expect(updatedList[0].componentInstance.income).toBe(incomes[0]);

  });

}
