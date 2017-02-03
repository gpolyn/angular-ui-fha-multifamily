import {Component, Input, Output, EventEmitter} from '@angular/core';
import { FormsModule } from '@angular/forms';
import {TestBed, async, tick, fakeAsync} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {ApartmentIncome} from './apartment-income';
import {ApartmentIncomeComponent} from './apartment-income.component';

@Component({
  selector: 'fountain-app',
  template: require('./apartment-income.component.html')
})

class MockApartmentIncomeComponent {
  @Input() apartmentIncome;
  @Output() onSave: EventEmitter<any> = new EventEmitter(false);
  @Output() onDestroy: EventEmitter<any> = new EventEmitter(false);
}

describe('ApartmentIncomeComponent', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule ],
      declarations: [
        ApartmentIncomeComponent,
        MockApartmentIncomeComponent
      ]
    });
    TestBed.compileComponents();
  }));

  it('should render the correct elements', fakeAsync(() => {
    const fixture = TestBed.createComponent(ApartmentIncomeComponent);
    const AptIncCmp = fixture.componentInstance;
    const units = 20;
    const rent = 30;
    const sqFt = 40;
    const bedrooms = 3;
    AptIncCmp.apartmentIncome = new ApartmentIncome();
    AptIncCmp.apartmentIncome.units = units;
    AptIncCmp.apartmentIncome.monthlyRent = rent;
    AptIncCmp.apartmentIncome.bedrooms = bedrooms;
    AptIncCmp.apartmentIncome.squareFeet = sqFt;

    fixture.detectChanges();
    tick();
    const unitsInput = fixture.debugElement.query(By.css('input#units')).nativeElement;
    unitsInput.dispatchEvent(new Event('input'));
    expect(unitsInput.value).toEqual('20');

    const rentInput = fixture.debugElement.query(By.css('input#monthly-rent')).nativeElement;
    rentInput.dispatchEvent(new Event('input'));
    expect(rentInput.value).toEqual('30');

  }));

});
