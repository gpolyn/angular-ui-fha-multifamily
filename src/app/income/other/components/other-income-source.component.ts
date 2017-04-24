import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter} from '@angular/core';
import { IOtherIncome } from '../interfaces/other-income.interface';

@Component({
  selector: 'other-income-source',
  template: require('../templates/other-income-source.component.html'),
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class OtherIncomeSourceComponent<T extends IOtherIncome> {

  @Input() income: T;
  @Output() onDestroy: EventEmitter<any> = new EventEmitter(false);

}
