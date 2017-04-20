import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { TestBed, ComponentFixture } from '@angular/core/testing';

import { ReactiveFormsModule, FormsModule, FormBuilder} from '@angular/forms';

import { OperatingExpensesComponent } from './opex.component';
import { OperatingExpensesService } from './opex.service';

const initialOpex = {
  operating_expenses: 20,
  operating_expenses_is_percent_of_effective_gross_income: true
}

const opexServiceStub = {
  observableOpex$: new BehaviorSubject<any>(initialOpex),
  observableNOI$: ( new BehaviorSubject<number>(10) ).asObservable(),
	save: (data: any) => {}
}
const initialNoi = 20;

class FakeOperatingExpensesService {
  observableOpex$: BehaviorSubject<any> = new BehaviorSubject<any>(initialOpex);
  observableNOI$: BehaviorSubject<number> = new BehaviorSubject<number>(initialNoi);
  save(data: any){}
};

let component: OperatingExpensesComponent;
let fixture: ComponentFixture<OperatingExpensesComponent>;
let opexIsPercent: any;
let opex: any;
const min = 0;
const lessThanMin = min - 1;
const max = 100;
const greaterThanMax = max + 1;
let opexSvc: OperatingExpensesService;
let opexSvc2: OperatingExpensesService;

describe('OperatingExpenses', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormsModule], 
      declarations: [OperatingExpensesComponent],
      providers: [
        FormBuilder, 
        {provide: OperatingExpensesService, useClass: FakeOperatingExpensesService}
      ]
    });

    fixture = TestBed.createComponent(OperatingExpensesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
		opex = component.opexForm.controls['operating_expenses'];
		opexIsPercent = component.opexForm.controls['operating_expenses_is_percent_of_effective_gross_income'];
    opexSvc = TestBed.get(OperatingExpensesService);
    opexSvc2 = fixture.debugElement.injector.get(OperatingExpensesService);
  });

  it('should display initial noi', ()=>{
    const ele = fixture.nativeElement.querySelector('span#net-operating-income');
    const valueAsFormatted = `$${initialNoi}.00`;
    expect(ele.textContent).toBe(valueAsFormatted);
  })

  it('should display initial operating_expenses', ()=>{
    const ele = fixture.nativeElement.querySelector('input#total');
    expect(ele.value).toBe(String(initialOpex.operating_expenses));
  })

  it('should display initial operating_expenses_is_percent_of_effective_gross_income value', ()=>{
    const ele = fixture.nativeElement.querySelector('input#totalOperatingExpenseIsPercent');
    expect(ele.checked).toBe(initialOpex.operating_expenses_is_percent_of_effective_gross_income);
  })

  xit('should update form from observableOpex', () =>{
    const nextOpex = {operating_expenses_is_percent_of_effective_gross_income: !initialOpex.operating_expenses_is_percent_of_effective_gross_income, operating_expenses: initialOpex.operating_expenses + 10};
    opexSvc.observableOpex$.next(nextOpex);
    fixture.detectChanges();
		opex = component.opexForm.controls['operating_expenses'];
		opexIsPercent = component.opexForm.controls['operating_expenses_is_percent_of_effective_gross_income'];
    expect(opexIsPercent.value).toBe(nextOpex.operating_expenses_is_percent_of_effective_gross_income);
    expect(opex.value).toEqual(nextOpex.operating_expenses);
  })

  it('should have noi given by OperatingExpensesService', () => {
    let noi;
    component.noi.subscribe(val => noi = val);
    expect(noi).toEqual(20);
  });

  it('should have expected initial values', () => {
    expect(opexIsPercent.value).toBe(initialOpex.operating_expenses_is_percent_of_effective_gross_income);
    expect(opex.value).toEqual(initialOpex.operating_expenses);
  });

  it('should enforce min, max limits when operating_expenses_is_percent_of_effective_gross_income == true', () => {
    opex.setValue(lessThanMin);
    expect(opex.value).toBe(min);
    opex.setValue(greaterThanMax);
    expect(opex.value).toBe(max);
  });

  it('should enforce min limit when operating_expenses_is_percent_of_effective_gross_income != true', () => {
    opexIsPercent.setValue(false);
    opex.setValue(greaterThanMax);
    expect(opex.value).toBe(greaterThanMax);
    opex.setValue(lessThanMin);
    expect(opex.value).toBe(min);
  });

});
