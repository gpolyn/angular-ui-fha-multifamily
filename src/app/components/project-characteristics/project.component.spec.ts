import { Observable } from 'rxjs/Observable';
import { ComponentFixture, inject, TestBed, async } from '@angular/core/testing';
import { By }                                from '@angular/platform-browser';
import { DebugElement, Input, Output, Component, EventEmitter } from '@angular/core';
import { Validators, ValidatorFn, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import {ProjectComponent} from './project.component';
import {ProjectStatusComponent} from './project-status.component';
import {MSAWaiverComponent} from './msa-waiver.component';
import { PROJECT_CONFIG } from './config';
import {ProjectCharacteristicsService} from '../../services';

const SOME_CONFIG = {
  is_elevator_project: 'true',
  metropolitan_area_waiver: 'maximum waiver',
  affordability: 'subsidized'
};

const initialProjectCharacteristics = {
  metropolitan_area_waiver: 'Albany, NY',
  affordability: 'market'
};


class FakeService {
  public projectCharacteristics$ = Observable.of(initialProjectCharacteristics);
  save(projectData: any){}
};

describe('ProjectComponent', () => {

  let component: ProjectComponent;
  let fixture: ComponentFixture<ProjectComponent>;
  let incomeService: ProjectCharacteristicsService;
  let spy: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormsModule], 
      declarations: [ProjectComponent, MSAWaiverComponent, ProjectStatusComponent],
      providers: [ 
      {provide: ProjectCharacteristicsService, useClass: FakeService}, 
      {provide: PROJECT_CONFIG, useValue: SOME_CONFIG},
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectComponent);
    component = fixture.componentInstance;
    component.ngOnInit(); 
    fixture.detectChanges();
    incomeService = fixture.debugElement.injector.get(ProjectCharacteristicsService);
  });

  it('should have initial given by service, else by config', ()=>{
    const msa = fixture.debugElement.query(By.css('select#high-cost-setting'));
    expect(msa.nativeElement.value).toBe(initialProjectCharacteristics.metropolitan_area_waiver);
    const elevatorStatus = fixture.debugElement.query(By.css('select#elevator-status'));
    expect(elevatorStatus.nativeElement.value).toBe(SOME_CONFIG.is_elevator_project);
  })

  xit('should call service with expected value when msa changed', ()=>{
    spyOn(incomeService, 'save');
    const input = fixture.debugElement.query(By.css('select#high-cost-setting'));
    const el = input.nativeElement;
    el.value = 'Atlanta, GA';
    el.dispatchEvent(new Event('change'));
    fixture.detectChanges();
    expect(incomeService.save).toHaveBeenCalledWith(el.value);
  });

  it('should call service with expected value when elevatorStatus changed', ()=>{
    spy = spyOn(incomeService, 'save');
    const input = fixture.debugElement.query(By.css('select#elevator-status'));
    const el = input.nativeElement;
    el.value = 'false';
    el.dispatchEvent(new Event('change'));
    fixture.detectChanges();
    expect(spy.calls.mostRecent().args[0].is_elevator_project).toBe(el.value)
  });

  xit('should have initial given by service, else by config for affordability', ()=>{
    const affordable = fixture.debugElement.query(By.css('input#affordable'));
    expect(affordable.nativeElement.checked).toBe(false);
    const market = fixture.debugElement.query(By.css('input#market'));
    expect(market.nativeElement.checked).toBe(true);
    const subsidized = fixture.debugElement.query(By.css('input#subsidized'));
    expect(subsidized.nativeElement.checked).toBe(false);
  })

});

