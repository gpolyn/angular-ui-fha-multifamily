import { Component, OnInit, forwardRef, Input, OnChanges, Output } from '@angular/core';
import { FormControl, ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS } from '@angular/forms';

export interface CheckedNumber {
  numericValue: number;
  isChecked: boolean;
}

@Component({
  selector: 'counter-input',
  template: `
		<label>{{textFieldLabel}}
			<input type="number" [(ngModel)]="numericValue">
			<input type="checkbox" [(ngModel)]="isChecked" [attr.checked]="isChecked">
		</label>
  `,
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => CounterInputComponent), multi: true },
  ]
})
export class CounterInputComponent implements ControlValueAccessor, OnChanges {

  propagateChange: any = () => { 
		console.log("propogating cge");
		if (this.numericValue > 100) {
			this.numericValue = 89;
		}
		this.checkedNumber = <CheckedNumber>{ numericValue: this.numericValue, isChecked: this.isChecked};
	};

  @Input() textFieldLabel: string;
  @Input('numericValue') _numericValue: number;
  @Input('isChecked') _isChecked: boolean = false;
  @Input() min: number;
  @Input() max: number;
  @Input() enforceMinOnlyWhenChecked: boolean;
  @Input() enforceMaxOnlyWhenChecked: boolean;
	@Output() checkedNumber: CheckedNumber;

  get numericValue() {
    return this._numericValue;
  }

  set numericValue(val) {
    this._numericValue = val;
    this.propagateChange(this._numericValue);
  }

  get isChecked() {
    return this._isChecked;
  }

  set isChecked(val) {
    this._isChecked = val;
    this.propagateChange(this._isChecked);
  }

  ngOnChanges(inputs) {
			console.log("G#ngOnChanges", inputs);
      this.propagateChange(this.isChecked);
      this.propagateChange(this.numericValue);
  }

  writeValue(value) {
		console.log("G#writeValue", value);
    if (value) {
  //    this.counterValue = value;
    }
  }

  registerOnChange(fn) {
		console.log("G#registerOnChange");
		const fart = (e) => {console.log(e)};
    //this.propagateChange = fn;
    this.propagateChange = fart;
  }

  registerOnTouched() {}

}
