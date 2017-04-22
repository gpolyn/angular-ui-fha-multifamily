import {Component, OnInit, EventEmitter, Output} from '@angular/core';
import { ApartmentIncome } from './apartment-income';
import { IncomeServiceRevised, ApartmentIncomeService } from './income.service';
import './apartment-income.css';

export interface ApartmentIncomeChange {
  isCommercial: boolean;
  incomeChange: number;
}

@Component({
  selector: 'apartment-income',
  // github.com/webpack-contrib/style-loader/issues/123
  styles: [require('./apartment-income.css').toString()],
  template: require('./apartment-income.component.html'),
	providers: [IncomeServiceRevised]
})

export class ApartmentIncomeComponent implements OnInit {

  @Output() incomeChange = new EventEmitter<ApartmentIncomeChange>();

  apartmentIncomes: Array<ApartmentIncome> = [];

  constructor(private incomeService: IncomeServiceRevised<ApartmentIncome>, private altIncomeSvc: ApartmentIncomeService){ }

  private helpful = (incomes) => this.apartmentIncomes = [...incomes, new ApartmentIncome()].reverse(); // wanted a certain order

  ngOnInit(): void {
    this.incomeService.getIncomes().then(this.helpful);
  }

  handleSave(e: any): void {
    console.log('saving apartment income')
    this.altIncomeSvc.addIncome(e);
    this.incomeService.saveIncome(e).then(this.helpful);
    this.incomeService.totalIncome().then((income) => {
      this.incomeChange.emit(<ApartmentIncomeChange>{isCommercial: false, incomeChange: income});
    })
  }

  handleDestroy(e: any): void {
    console.log('destroying income')
    this.altIncomeSvc.removeIncome(e.id)
    this.incomeService.deleteIncome(e).then(this.helpful);
    this.incomeService.totalIncome().then((income) => {
      this.incomeChange.emit(<ApartmentIncomeChange>{isCommercial: false, incomeChange: income});
    })
  }

}
