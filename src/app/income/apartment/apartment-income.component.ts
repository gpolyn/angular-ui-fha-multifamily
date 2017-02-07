import {Component, OnInit} from '@angular/core';
import { ApartmentIncome } from './apartment-income';
import { IncomeServiceRevised } from './income.service';

@Component({
  selector: 'apartment-income',
  template: require('./apartment-income.component.html'),
	providers: [IncomeServiceRevised]
})

export class ApartmentIncomeComponent implements OnInit {

  apartmentIncomes: Array<ApartmentIncome> = [];

  constructor(private incomeService: IncomeServiceRevised<ApartmentIncome>){ }

  private helpful = (incomes) => this.apartmentIncomes = [...incomes, new ApartmentIncome()].reverse(); // wanted a certain order

  ngOnInit(): void {
    this.incomeService.getIncomes().then(this.helpful);
  }

  handleSave(e: any): void {
    this.incomeService.saveIncome(e).then(this.helpful);
  }

  handleDestroy(e: any): void {
    this.incomeService.deleteIncome(e).then(this.helpful);
  }

}
