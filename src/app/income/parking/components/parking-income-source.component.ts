import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter} from '@angular/core';
import { IParkingIncome } from '../interfaces/parking-income.interface';

@Component({
  selector: 'parking-income-source',
  template: require('../templates/parking-income-source.component.html'),
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ParkingIncomeSourceComponent<T extends IParkingIncome> {

  @Input() income: T;
  @Output() onDestroy: EventEmitter<any> = new EventEmitter(false);

}
