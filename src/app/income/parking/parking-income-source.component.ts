import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter} from '@angular/core';
import { ParkingIncome } from './parking-income';

@Component({
  selector: 'parking-income-source',
  template: require('./parking-income-source.component.html'),
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ParkingIncomeSourceComponent {

  @Input() parkingIncome: ParkingIncome;
  @Output() onDestroy: EventEmitter<any> = new EventEmitter(false);

}
