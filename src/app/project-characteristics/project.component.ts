import { OnDestroy, ChangeDetectionStrategy, Component, OnInit, OnChanges } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { FormBuilder, FormGroup, ValidatorFn, AbstractControl } from '@angular/forms';


@Component({
  selector: 'project-characteristics',
  template: `
    <div id='metropolitan-area'>
      <msa-waiver (change)="handleChange($event.target.value, 'msa')"></msa-waiver>
    </div>
    <div id='affordability'>
      <project-status [status]='myProject.status' (statusChange)="handleChange($event, 'project_status')"></project-status>
    </div>
    <div id='elevator-status'>
      project has elevator?
      <select id='elevator-status' name="elevator-status" (change)="handleChange($event.target.value, 'elevator')" [(ngModel)]="myProject.elevator_status">
        <option *ngFor="let status of elevatorStatuses" [value]="status.value">  
          {{status.display}}
        </option>
      </select>
    </div>
  `
})

export class ProjectComponent implements OnInit, OnDestroy, OnChanges {

  form: FormGroup;
  private subs: any[] = [];
  private myProject: any;
  private elevatorStatuses: any[] = [
    {value: 'true', display: 'true'},
    {value: 'false', display: 'false'}
  ];

  constructor(private fb: FormBuilder){
  }

	ngOnChanges(changes: any) {
	}

  handleChange(event: any, origin: string){
    console.log('handling change', event, origin, this.myProject);
  }

  ngOnInit() {
    this.form = new FormGroup({});
    this.myProject = {status: 'subsidized', elevator_status: 'true'};
  }
  ngOnDestroy(){}

}
