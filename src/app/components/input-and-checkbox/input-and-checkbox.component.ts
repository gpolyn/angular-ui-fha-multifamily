import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormControl, FormGroup } from '@angular/forms';

export interface MaybePercent {
  value: number;
  isPercent: boolean;
}

@Component({
	selector: 'hero-detail',
	template: `
		<form [formGroup]="heroForm" novalidate>
		<label class="center-block">Name:
			<input type="number" formControlName="value">
			<input type="checkbox" formControlName="isPercent">
		</label>
		</form>
	`
})

export class HeroDetailComponent1 implements OnInit {
	@Input() maxValueWhenChecked: number;
  @Output() 
	maybePercent = new EventEmitter<MaybePercent>();
	lastFineValue: number;
  heroForm = new FormGroup ({
		value: new FormControl(),
		isPercent: new FormControl()
  });

	ngOnInit(){
		this.heroForm.valueChanges.subscribe(e => this.limitValue(e));
	}

	protected limitValue(formData: any){

		if (formData.value < 100) {
			this.lastFineValue = formData.value;
    } else {
      if (formData.isPercent){
        this.heroForm.patchValue({
          value: this.lastFineValue
        })
        formData.value = this.lastFineValue;
      }
    }

    this.maybePercent.emit(<MaybePercent>formData);
	}

}

