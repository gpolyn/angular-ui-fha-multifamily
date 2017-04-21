import { Component, EventEmitter, Input, Output, OnChanges, OnInit, SimpleChange } from '@angular/core';

@Component({
  selector: 'project-status',
  template: `
    apartment rents are
		<template ngFor let-option [ngForOf]='options'>
			<label for="option"> {{option}} </label>
			<input [id]='option' name='project_status' [(ngModel)]='myStatus' (change)="onChange($event.target.value)" type="radio" [value]="option">
		</template>
  `
})

export class ProjectStatusComponent implements OnChanges, OnInit {
  static MARKET: string = 'market';
  static AFFORDABLE: string = 'affordable';
  static SUBSIDIZED: string = 'subsidized';
  @Output() statusChange = new EventEmitter<string>();
	@Input() status: string;
	private myStatus: string = ProjectStatusComponent.MARKET;
  readonly options: string[] = [ProjectStatusComponent.MARKET, ProjectStatusComponent.AFFORDABLE, ProjectStatusComponent.SUBSIDIZED];

	onChange(deviceValue) {
    console.log("vakl", deviceValue)
		console.log('status', this.myStatus);
		this.statusChange.emit(this.myStatus);
	}

	ngOnInit(){
		this.myStatus = this.status || this.myStatus;
	}

	ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
		let log: string[] = [];
		for (let propName in changes) {
			let changedProp = changes[propName];
			let to = JSON.stringify(changedProp.currentValue);
			if (changedProp.isFirstChange()) {
				console.log(`Initial value of ${propName} set to ${to}`);
			} else {
				let from = JSON.stringify(changedProp.previousValue);
				console.log(`${propName} changed from ${from} to ${to}`);
			}
		}
	}

}
