import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter} from '@angular/core';
import { IOtherIncome } from './other-income';

@Component({
  selector: 'other-income-source',
  template: require('./other-income-source.component.html'),
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class OtherIncomeSourceComponent<T extends IOtherIncome> {

  @Input() income: T;
  @Output() onDestroy: EventEmitter<any> = new EventEmitter(false);

}
