import {
    TestBed
} from '@angular/core/testing';

import {
    ReactiveFormsModule,
		FormGroup
} from '@angular/forms';

import { ParkingIncomeComponent } from './parking-income.component';
import { ParkingIncomeSourceComponent } from './parking-income-source.component';

describe('ParkingIncomeComponent', () => {
  
  let component: ParkingIncomeComponent;
  let residentialIncSvcStub: any;
  let commercialIncSvcStub: any;

	beforeEach(() => {

    residentialIncSvcStub = { };
    commercialIncSvcStub = Object.assign({}, residentialIncSvcStub);

		TestBed.configureTestingModule({
				declarations: [ParkingIncomeComponent, ParkingIncomeSourceComponent],
				imports: [ ReactiveFormsModule]
		});

		const fixture = TestBed.createComponent(ParkingIncomeComponent);
		component = fixture.componentInstance;
	});

	it('should have a defined component', () => {
			expect(component).toBeDefined();
	});

	it('should create a `FormGroup` comprised of `FormControl`s', () => {
			component.ngOnInit();
			expect(component.newIncomeForm instanceof FormGroup).toBe(true);
	});

});
