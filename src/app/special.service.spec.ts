import { IncomeServiceRevised } from './special.service';
import { ParkingIncome } from './shared/parking-income';

describe('DependentService without the TestBed', () => {

  let service: IncomeServiceRevised;

  it('#addIncome should add the income to the service observable', () => {

    service = new IncomeServiceRevised();
    const expected = new ParkingIncome(true);
    service.addIncome(expected);
    service.chincomes$.subscribe(inc => {
      expect(inc).toEqual([expected]);
    });

  });

  it('#removeIncome should remove the income from the service observable', () => {

    service = new IncomeServiceRevised();
    const expected = new ParkingIncome(true);
    service.addIncome(expected);
    let resultingIncome;
    service.chincomes$.subscribe(
      inc => {
        resultingIncome = inc[0];
      },
      e => {},
      () => {
        console.log("HI FRM THE TEST", resultingIncome)
        service.removeIncome(resultingIncome);
        service.chincomes$.subscribe(inc => {
          expect(inc.length).toBe(1);  
        })
      }
    );

  });

  /*
  it('#getValue should return faked value by way of a fakeService', () => {
    service = new DependentService(new FakeFancyService());
    expect(service.getValue()).toBe('faked value');
  });

  it('#getValue should return faked value from a fake object', () => {
    const fake =  { getValue: () => 'fake value' };
    service = new DependentService(fake as FancyService);
    expect(service.getValue()).toBe('fake value');
  });

  it('#getValue should return stubbed value from a FancyService spy', () => {
    const fancy = new FancyService();
    const stubValue = 'stub value';
    const spy = spyOn(fancy, 'getValue').and.returnValue(stubValue);
    service = new DependentService(fancy);
    expect(service.getValue()).toBe(stubValue, 'service returned stub value');
    expect(spy.calls.count()).toBe(1, 'stubbed method was called once');
    expect(spy.calls.mostRecent().returnValue).toBe(stubValue);
  });
  */
});

