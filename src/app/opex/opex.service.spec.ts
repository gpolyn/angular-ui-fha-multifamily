import { TestBed } from '@angular/core/testing';
import { OperatingExpensesService,
         AbstractGrossIncomeService,
         AbstractOperatingExpenseService
       } from './opex.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

interface IOpex {
  operating_expenses: number;
  operating_expenses_is_percent_of_effective_gross_income: boolean;  
}

const initialOpex = {
  operating_expenses: 20,
  operating_expenses_is_percent_of_effective_gross_income: true
}
const initialGross = 34;
const grossBS: BehaviorSubject<number> = new BehaviorSubject(initialGross);
const opexBS: BehaviorSubject<IOpex> = new BehaviorSubject(initialOpex);

class FakeAbstractOperatingExpensesService {
  public opexBS: BehaviorSubject<IOpex>;
  public opex$: Observable<IOpex>;
  constructor(){
    //this.opexBS = new BehaviorSubject<IOpex>(initialOpex);
    this.opexBS = opexBS;
    this.opex$ = this.opexBS.asObservable();
  }
}

describe('OperatingExpensesService', () => {

  let service: OperatingExpensesService;
  let absOpexService: AbstractOperatingExpenseService;
  let spy: any;

  beforeEach(() => {
    grossBS.next(initialGross);
    opexBS.next(initialOpex);
    const gross$: Observable<number> = grossBS.asObservable();
    const fakeAbstractGrossIncomeService = { grossIncome$: gross$ };
    const opex: Observable<IOpex> = opexBS.asObservable();
    const fakeAbstractOperatingExpenseService = { opex$: opex };
    fakeAbstractOperatingExpenseService['save'] = (opex: IOpex) => {};
    spy = spyOn(fakeAbstractOperatingExpenseService, 'save');
    service = new OperatingExpensesService(fakeAbstractGrossIncomeService as AbstractGrossIncomeService, fakeAbstractOperatingExpenseService as AbstractOperatingExpenseService);
    TestBed.configureTestingModule({
      providers: [
        OperatingExpensesService,
        //{provide: AbstractOperatingExpenseService, useValue: fakeAbstractOperatingExpenseService},
        {provide: AbstractOperatingExpenseService, useClass: FakeAbstractOperatingExpensesService},
        {provide: AbstractGrossIncomeService, useValue: fakeAbstractGrossIncomeService}
      ]
    });
    service = TestBed.get(OperatingExpensesService);
    absOpexService = TestBed.get(AbstractOperatingExpenseService);

  })

  it('should be defined', ()=>{
    expect(service).toBeDefined()
  })

  it('should have expected initial noi when operating_expenses_is_percent_of_effective_gross_income is true', () => {
    const expected = initialGross * (1 - initialOpex.operating_expenses/100.0);
    let noi;
    service.observableNOI$.subscribe(val => noi = val);
    expect(noi).toBe(expected);
  });

  it('should have expected initial noi when operating_expenses_is_percent_of_effective_gross_income is false', () => {
    const gross$: Observable<number> = grossBS.asObservable();
    const fakeAbstractGrossIncomeService = { grossIncome$: gross$ };
    const revisedOpex: IOpex = {...initialOpex, operating_expenses_is_percent_of_effective_gross_income: false};
    opexBS.next(revisedOpex);
    const opex: Observable<IOpex> = opexBS.asObservable();
    const fakeAbstractOperatingExpenseService = { opex$: opex };
    fakeAbstractOperatingExpenseService['save'] = (opex: IOpex) => {};
    service = new OperatingExpensesService(fakeAbstractGrossIncomeService as AbstractGrossIncomeService, fakeAbstractOperatingExpenseService as AbstractOperatingExpenseService);
    const expected = initialGross - initialOpex.operating_expenses;
    let noi;
    service.observableNOI$.subscribe(val => noi = val);
    expect(noi).toBe(expected);
  });

  it('should have expected opex as initial observableOpex$', () => {
    let opex;
    service.observableOpex$.subscribe(val => opex = val);
    expect(opex).toBe(initialOpex);
  });

  xit('should have expected observableOpex$ after underlying opex is changed', () => {
    const newOpex = {operating_expenses: 23, operating_expenses_is_percent_of_effective_gross_income: !initialOpex.operating_expenses_is_percent_of_effective_gross_income}
    let opex;
    opexBS.next(newOpex);
    service.observableOpex$.subscribe(val => {
      expect(val).toBe(newOpex);
    });
  });

  xit('should have expected noi after underlying opex operating_expenses_is_percent_of_effective_gross_income is changed', ()=>{});

  xit('should have expected noi after underlying opex operating_expenses is changed', ()=>{});

});
