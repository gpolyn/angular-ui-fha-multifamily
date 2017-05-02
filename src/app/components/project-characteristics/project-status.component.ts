import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';

@Component({
  selector: 'project-status',
  template: `
    apartment rents are
		<template ngFor let-option [ngForOf]='options'>
			<label for="option"> {{option}} </label>
			<input [id]='option' name='project_status' [(ngModel)]='myStatus' (change)="onChange($event)" type="radio" [value]="option">
		</template>
  `
})

export class ProjectStatusComponent implements OnInit {
  static MARKET: string = 'market';
  static AFFORDABLE: string = 'affordable';
  static SUBSIDIZED: string = 'subsidized';
  @Output() statusChange = new EventEmitter<string>();
	@Input() status: string;
	private myStatus: string = ProjectStatusComponent.MARKET;
  readonly options: string[] = [ProjectStatusComponent.MARKET, ProjectStatusComponent.AFFORDABLE, ProjectStatusComponent.SUBSIDIZED];

	onChange(data: any) {
		this.statusChange.emit(this.myStatus);
	}

	ngOnInit(){
		this.myStatus = this.status || this.myStatus;
	}

}
