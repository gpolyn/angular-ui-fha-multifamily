import {Component, OnInit} from '@angular/core';
import { ApartmentIncome } from './apartment-income';
import { IncomeService } from './income.service';

@Component({
  selector: 'apartment-income',
  template: require('./apartment-income.component.html'),
	providers: [IncomeService]
})

export class ApartmentIncomeComponent implements OnInit {

  apartmentIncomes: Array<ApartmentIncome> = [];

  constructor(private incomeService: IncomeService<ApartmentIncome>){ }

  private helpful = (incomes) => this.apartmentIncomes = [...incomes, new ApartmentIncome()].reverse(); // wanted a certain order

  ngOnInit(): void {
    this.incomeService.getIncomes(ApartmentIncome).then(this.helpful);
  }

  handleSave(e: any): void {
    this.incomeService.addIncome(e).then(this.helpful);
  }

  handleDestroy(e: any): void {
    this.incomeService.deleteTodoById(e).then(this.helpful);
  }

}
