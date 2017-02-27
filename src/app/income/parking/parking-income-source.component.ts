import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter} from '@angular/core';
import { IParkingIncome } from './parking-income';

@Component({
  selector: 'parking-income-source',
  template: require('./parking-income-source.component.html'),
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ParkingIncomeSourceComponent<T extends IParkingIncome> {

  @Input() income: T;
  @Output() onDestroy: EventEmitter<any> = new EventEmitter(false);

}
