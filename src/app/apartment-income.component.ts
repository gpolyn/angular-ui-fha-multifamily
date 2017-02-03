import {Component} from '@angular/core';
# import * as actions from '../actions/index';

@Component({
  selector: 'apartment-incomes',
  template: require('./apartment-incomes.component.html')
})

export class ApartmentIncomesComponent {
  todos: List<any> = [];

  handleSave(e: any) {
  }

  handleDestroy(e: any) {
  }
}
