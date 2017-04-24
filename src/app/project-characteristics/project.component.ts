import { Inject, OnDestroy, ChangeDetectionStrategy, Component, OnInit, OnChanges } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { FormBuilder, FormGroup, ValidatorFn, AbstractControl } from '@angular/forms';
import {ProjectCharacteristicsService} from '../project-characteristics.service';
import { PROJECT_CONFIG } from './config';

@Component({
  selector: 'project-characteristics',
  template: `
    <div id='metropolitan-area'>
      <msa-waiver [value]='myProject.metropolitan_area_waiver' (change)="handleChange($event.target.value, 'metropolitan_area_waiver')"></msa-waiver>
    </div>
    <div id='affordability'>
      <project-status [status]='myProject.affordability' (statusChange)="handleChange($event, 'affordability')"></project-status>
    </div>
    <div id='elevator-status'>
      project has elevator?
      <select id='elevator-status' name="elevator-status" (change)="handleChange($event.target.value, 'is_elevator_project')" [value]="myProject.is_elevator_project">
        <option *ngFor="let status of elevatorStatuses" [value]="status.value">  
          {{status.display}}
        </option>
      </select>
    </div>
  `
})

export class ProjectComponent implements OnInit, OnDestroy {

  form: FormGroup;
  private subs: any[] = [];
  private myProject: any;
  private elevatorStatuses: any[] = [
    {value: 'true', display: 'true'},
    {value: 'false', display: 'false'}
  ];
  private readonly initialState: any = {
    is_elevator_project: 'false',
    metropolitan_area_waiver: 'standard waiver',
    affordability: 'market'
  }

  constructor(private dataSvc: ProjectCharacteristicsService, @Inject(PROJECT_CONFIG) private config: any){
  }

  handleChange(event: any, origin: string){
    console.log('handling change', event, origin);
    const update = {...this.myProject, [origin]: event};
    console.log('about to update with', update);
    this.dataSvc.save(update)
  }

  ngOnInit() {
    this.form = new FormGroup({});
    let initialProjectVals;
    console.log('PROJECT CONFIG', this.config);
    this.dataSvc.projectCharacteristics$.subscribe(val => initialProjectVals = val);
    console.log('stored vals', initialProjectVals)
    const vals = {...this.config, ...initialProjectVals};
    console.log('about to use', vals);
    this.myProject = vals;
    //this.myProject = initialProjectVals;
  }
  ngOnDestroy(){}

}
