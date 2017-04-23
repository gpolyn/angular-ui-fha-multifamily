import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter} from '@angular/core';
import { IApartmentIncome } from './apartment-income';

@Component({
  selector: 'apartment-income-source',
  template: require('./apartment-income-source.component.html'),
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ApartmentIncomeSourceComponent<T extends IApartmentIncome> {

  @Input() income: T;
  @Output() onDestroy: EventEmitter<any> = new EventEmitter(false);

}
