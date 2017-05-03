import { Observable } from 'rxjs/Observable';
import { ComponentFixture, inject, TestBed, async } from '@angular/core/testing';
import { By }                                from '@angular/platform-browser';
import { DebugElement, Input, Output, Component, EventEmitter } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { AbstractCommercialIncomeService, AbstractResidentialIncomeService } from './effective-income.service';
import { APP_CONFIG } from '../../config';

const INITIAL_CONFIG = {
  maxCommercialOccupancy: 80,
  maxResidentialOccupancy: 95
};

import { CommercialIncomeService, ResidentialIncomeService }      from '../../services';
import { ResidentialEffectiveIncomeComponent, CommercialEffectiveIncomeComponent } from './effective-income.component';


let comp: any;
let fixture: any;
let componentIncomeService: any;
let incomeService: any;
let spy: any;
let grossIncomeEl: DebugElement;
let egiEl: DebugElement;
const initialGrossIncomeValue = 4325;
const initialEffectiveIncomeValue = 325;

function setup(initialServiceOccupancyValue: number, isResidentialComponent: boolean = true){

  const fake = {
    egi$: new BehaviorSubject<number>(initialEffectiveIncomeValue).asObservable(),
    totalGrossIncome$: new BehaviorSubject<number>(initialGrossIncomeValue).asObservable(),
    observableOccupancy$: new BehaviorSubject<number>(initialServiceOccupancyValue),
    saveOccupancy(occupancy: number){}
  }

  if (isResidentialComponent) {
    TestBed.configureTestingModule({
       declarations: [ ResidentialEffectiveIncomeComponent ],
       imports: [ReactiveFormsModule, FormsModule],
       providers:    [ 
         {provide: AbstractResidentialIncomeService, useValue: fake },
         {provide: APP_CONFIG, useValue: INITIAL_CONFIG}
       ]
    });

    TestBed.compileComponents();
    fixture = TestBed.createComponent(ResidentialEffectiveIncomeComponent);
    comp    = fixture.componentInstance;

    fixture.detectChanges();

    incomeService = fixture.debugElement.injector.get(AbstractResidentialIncomeService);
    componentIncomeService = incomeService;
    incomeService = TestBed.get(AbstractResidentialIncomeService);
  } else {
    TestBed.configureTestingModule({
       declarations: [ CommercialEffectiveIncomeComponent ],
       imports: [ReactiveFormsModule, FormsModule],
       providers:    [ 
         {provide: AbstractCommercialIncomeService, useValue: fake },
         {provide: APP_CONFIG, useValue: INITIAL_CONFIG}
       ]
    });

    TestBed.compileComponents();
    fixture = TestBed.createComponent(CommercialEffectiveIncomeComponent);
    comp    = fixture.componentInstance;

    fixture.detectChanges();

    incomeService = fixture.debugElement.injector.get(AbstractCommercialIncomeService);
    componentIncomeService = incomeService;
    incomeService = TestBed.get(AbstractCommercialIncomeService);
  }

}

describe('ResidentialEffectiveIncomeComponent', () => {

  it('should initially display service-given occupancy when < max occupancy', () => {
    setup(65);
    expect(comp.occupancyPercent.value).toEqual(65);
  });

  it('should initially display max occupancy when svc occupancy > max occupancy', () => {
    setup(100);
    expect(comp.occupancyPercent.value).toEqual(INITIAL_CONFIG.maxResidentialOccupancy);
  });

  it('should initially display config occupancy when no service occupancy', () => {
    setup(null);
    expect(comp.occupancyPercent.value).toEqual(INITIAL_CONFIG.maxResidentialOccupancy);
  });

  it('should display egi initially as expected',()=>{
    setup(75);
    const el = fixture.debugElement.nativeElement.querySelector('span#effective-gross-residential-income');
    expect(el.textContent).toContain('$325.00');
  })

  it('should not accept occupancy < 0',()=>{
    setup(75);
    let input = fixture.debugElement.query(By.css('input'));
    let el = input.nativeElement;
    expect(el.value).toBe('75');
    el.value = '-1';
    el.dispatchEvent(new Event('input'));
    expect(comp.occupancyPercent.value).toEqual(0);
  })

  it('should not accept occupancy > max occupancy',()=>{
    setup(75);
    let input = fixture.debugElement.query(By.css('input'));
    let el = input.nativeElement;
    expect(el.value).toBe('75');
    el.value = '' + (INITIAL_CONFIG.maxResidentialOccupancy + 1);
    el.dispatchEvent(new Event('input'));
    expect(comp.occupancyPercent.value).toEqual(INITIAL_CONFIG.maxResidentialOccupancy);
  })

  it('should call service when occupancy is changed',()=>{
    setup(75);
    spyOn(componentIncomeService, 'saveOccupancy');
    let input = fixture.debugElement.query(By.css('input'));
    let el = input.nativeElement;
    el.value = '' + (INITIAL_CONFIG.maxResidentialOccupancy - 1);
    el.dispatchEvent(new Event('input'));
    expect(componentIncomeService.saveOccupancy).toHaveBeenCalledWith(INITIAL_CONFIG.maxResidentialOccupancy - 1);
  })

  it('should display gross initially as expected',()=>{
    setup(75);
    const grossIncomeEl = fixture.debugElement.nativeElement.querySelector('span.income');
    expect(grossIncomeEl.textContent).toContain('$4,325.00');
  })


})

describe('CommercialEffectiveIncomeComponent', () => {

  it('should initially display service-given occupancy when < max occupancy', () => {
    setup(65, false);
    expect(comp.occupancyPercent.value).toEqual(65);
  });

  it('should initially display max occupancy when svc occupancy > max occupancy', () => {
    setup(100, false);
    expect(comp.occupancyPercent.value).toEqual(INITIAL_CONFIG.maxCommercialOccupancy);
  });

  it('should initially display config occupancy when no service occupancy', () => {
    setup(null, false);
    expect(comp.occupancyPercent.value).toEqual(INITIAL_CONFIG.maxCommercialOccupancy);
  });

  it('should display egi initially as expected',()=>{
    setup(75, false);
    const el = fixture.debugElement.nativeElement.querySelector('span#effective-gross-commercial-income');
    expect(el.textContent).toContain('$325.00');
  })

  it('should not accept occupancy < 0',()=>{
    setup(75, false);
    let input = fixture.debugElement.query(By.css('input'));
    let el = input.nativeElement;
    expect(el.value).toBe('75');
    el.value = '-1';
    el.dispatchEvent(new Event('input'));
    expect(comp.occupancyPercent.value).toEqual(0);
  })

  it('should not accept occupancy > max occupancy',()=>{
    setup(75, false);
    let input = fixture.debugElement.query(By.css('input'));
    let el = input.nativeElement;
    expect(el.value).toBe('75');
    el.value = '' + (INITIAL_CONFIG.maxCommercialOccupancy + 1);
    el.dispatchEvent(new Event('input'));
    expect(comp.occupancyPercent.value).toEqual(INITIAL_CONFIG.maxCommercialOccupancy);
  })

  it('should call service when occupancy is changed',()=>{
    setup(75, false);
    spyOn(componentIncomeService, 'saveOccupancy');
    let input = fixture.debugElement.query(By.css('input'));
    let el = input.nativeElement;
    el.value = '' + (INITIAL_CONFIG.maxCommercialOccupancy - 1);
    el.dispatchEvent(new Event('input'));
    expect(componentIncomeService.saveOccupancy).toHaveBeenCalledWith(INITIAL_CONFIG.maxCommercialOccupancy - 1);
  })

  it('should display gross initially as expected',()=>{
    setup(75, false);
    const grossIncomeEl = fixture.debugElement.nativeElement.querySelector('span.income');
    expect(grossIncomeEl.textContent).toContain('$4,325.00');
  })

})

