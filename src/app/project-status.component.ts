import { Component, EventEmitter, Input, Output } from '@angular/core';
@Component({
  selector: 'project-status',
  template: `
    <div>
    <label for='project-status-radio'>apartment rents are </label>
    <div id='project-status-radio' *ngFor="let option of options">
        <label>
        <input (change)="onChange($event.target.value)" type="radio" [value]="option">
        {{option}}
        </label>
    </div>
  </div>
  `
})
export class ProjectStatusComponent {
  static MARKET: string = 'market';
  static AFFORDABLE: string = 'affordable';
  static SUBSIDIZED: string = 'subsidized';
  @Output() onVoted = new EventEmitter<boolean>();
  readonly options: string[] = [ProjectStatusComponent.MARKET, ProjectStatusComponent.AFFORDABLE, ProjectStatusComponent.SUBSIDIZED];

	onChange(deviceValue) {
    console.log("vakl", deviceValue)
		this.onVoted.emit(deviceValue);
	}

}
