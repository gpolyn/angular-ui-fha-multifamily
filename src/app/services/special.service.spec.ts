import {  MyCommercialOtherIncomeService,
          MyResidentialOtherIncomeService,
          MyResidentialParkingIncomeService,
          MyCommercialParkingIncomeService,
          GrossIncomeService,
          CommercialIncomeService,
          ResidentialIncomeService} from './special.service';
import { IIncome2 } from '../income-service.interface';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

const fake = {
  addIncome: (inc: any) => {},
  removeIncome: (inc: any) => {},
  chincomes$: undefined
}

const fake2 = Object.assign({}, fake);

let someIncome: IIncome2 = {
  totalMonthlyIncome: 300
}

let serviceUnderTest: any;
let commercialAddIncomeSpy;
let commercialRemoveIncomeSpy;
let residentialAddIncomeSpy;
let residentialRemoveIncomeSpy;
let commercialObservableIncomes: BehaviorSubject<Array<IIncome2>>;
let residentialObservableIncomes: BehaviorSubject<Array<IIncome2>>;

let typeObj: any;
let serviceDependency: string;
let offServiceDependency: string;
let offServiceDependencyObservable: any;
let serviceDependencyObservable: any;
let serviceDependencyAddIncomeSpy: any;
let serviceDependencyRemoveIncomeSpy: any;
let offServiceDependencyAddIncomeSpy: any;
let offServiceDependencyRemoveIncomeSpy: any;

describe('MyCommercialParkingIncomeService', () => {

	beforeEach(() => {

    commercialSetup();

    typeObj = {type: 'commercialParkingIncome'};

    serviceUnderTest = new MyCommercialParkingIncomeService(fake as CommercialIncomeService, fake2 as ResidentialIncomeService);
  });

  tests();

});

describe('GrossIncomeService', () => {

  let service: GrossIncomeService;

  it('should report correct grossIncome$', () => {
    const commEgi = 20;
    const resEgi = 2 * commEgi;
    const commercialEGI$: BehaviorSubject<number> = new BehaviorSubject<number>(commEgi);
    const residentialEGI$: BehaviorSubject<number> = new BehaviorSubject<number>(resEgi);
    const fakeCommercialIncomeSvc = { egi$: commercialEGI$ };
    const fakeResidentialIncomeSvc = { egi$: residentialEGI$ };
    service = new GrossIncomeService(fakeCommercialIncomeSvc as CommercialIncomeService, fakeResidentialIncomeSvc as ResidentialIncomeService);
    let gross;
    service.grossIncome$.subscribe(val => gross = val);
    expect(gross).toBe(commEgi + resEgi);
  });

})

describe('MyCommercialOtherIncomeService', () => {

	beforeEach(() => {

    commercialSetup();

    typeObj = {type: 'commercialOtherIncome'};

    serviceUnderTest = new MyCommercialOtherIncomeService(fake as CommercialIncomeService, fake2 as ResidentialIncomeService);
  });

  tests();

});

describe('MyResidentialOtherIncomeService', () => {

	beforeEach(() => {

    residentialSetup();

    typeObj = {type: 'residentialOtherIncome'};

    serviceUnderTest = new MyResidentialOtherIncomeService(fake as CommercialIncomeService, fake2 as ResidentialIncomeService);
  });

  tests();

});

describe('MyResidentialParkingIncomeService', () => {

	beforeEach(() => {

    residentialSetup();

    typeObj = {type: 'residentialParkingIncome'};

    serviceUnderTest = new MyResidentialParkingIncomeService(fake as CommercialIncomeService, fake2 as ResidentialIncomeService);
  });

  tests();

});

function tests() {

  it(`#addIncome calls addIncome on ${serviceDependency} using correctly typed income`, () => {

    const inc2 = Object.assign({}, typeObj, someIncome);
    serviceUnderTest.addIncome(someIncome);
    expect(serviceDependencyAddIncomeSpy).toHaveBeenCalledWith(inc2);
    expect(offServiceDependencyAddIncomeSpy.calls.any()).toEqual(false);

  });

  it(`#removeIncome calls removeIncome on ${serviceDependency} with passed income`, () => {

    serviceUnderTest.removeIncome(someIncome);
    expect(serviceDependencyRemoveIncomeSpy).toHaveBeenCalledWith(someIncome);
    expect(offServiceDependencyRemoveIncomeSpy.calls.any()).toEqual(false);

  });

  it(`#chincomes$ should be ${serviceDependency}#chincomes$ only of correct type`, () => {

    const blah = Object.assign({}, typeObj, someIncome);
    const meh = {type: 'someOtherIncome', totalMonthlyIncome: 400};

    serviceDependencyObservable.next([blah, meh]);

    serviceUnderTest.chincomes$.subscribe(inc => {
      expect(inc).toEqual([blah]);  
    });

  });

  it(`#chincomes$ should be not be ${offServiceDependency}#chincomes$`, () => {

    const blah = Object.assign({},typeObj, someIncome);
    const whuh = Object.assign({},typeObj, {totalMonthlyIncome: 1235});

    offServiceDependencyObservable.next([blah, whuh]);

    serviceUnderTest.chincomes$.subscribe(inc => {
      expect(inc.length).toBe(0);  
    });

  });
}

function commonSetup(){
  someIncome = {totalMonthlyIncome: 400};
  commercialObservableIncomes = new BehaviorSubject([]);
  residentialObservableIncomes = new BehaviorSubject([]);
  fake.chincomes$ = commercialObservableIncomes.asObservable();
  fake2.chincomes$ = residentialObservableIncomes.asObservable();
  commercialAddIncomeSpy = spyOn(fake, 'addIncome');
  commercialRemoveIncomeSpy = spyOn(fake, 'removeIncome');
  residentialAddIncomeSpy = spyOn(fake2, 'addIncome');
  residentialRemoveIncomeSpy = spyOn(fake2, 'removeIncome');
}

function commercialSetup(){

  commonSetup()

  serviceDependency = 'CommercialIncomeService';
  offServiceDependency = 'ResidentialIncomeService';

  offServiceDependencyObservable = residentialObservableIncomes;
  offServiceDependencyAddIncomeSpy = residentialAddIncomeSpy;
  offServiceDependencyRemoveIncomeSpy = residentialRemoveIncomeSpy;

  serviceDependencyObservable = commercialObservableIncomes;
  serviceDependencyAddIncomeSpy = commercialAddIncomeSpy;
  serviceDependencyRemoveIncomeSpy = commercialRemoveIncomeSpy;

}

function residentialSetup(){

  commonSetup()

  serviceDependency = 'ResidentialIncomeService';
  offServiceDependency = 'CommercialIncomeService';

  offServiceDependencyObservable = commercialObservableIncomes;
  offServiceDependencyAddIncomeSpy = commercialAddIncomeSpy;
  offServiceDependencyRemoveIncomeSpy = commercialRemoveIncomeSpy;

  serviceDependencyObservable = residentialObservableIncomes;
  serviceDependencyAddIncomeSpy = residentialAddIncomeSpy;
  serviceDependencyRemoveIncomeSpy = residentialRemoveIncomeSpy;

}
