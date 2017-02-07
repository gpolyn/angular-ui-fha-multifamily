import {Component, OnInit} from '@angular/core';
import { IncomeService } from './income.service';
import { OtherCommercialIncome } from './other-income';
import { OtherNonParkingIncomeComponent } from './other-non-parking-income.component';

@Component({
  selector: 'other-commercial-non-parking-income',
  template: require('./other-non-parking-commercial-income.component.html'),
	providers: [IncomeService]
})

export class OtherCommercialNonParkingIncomeComponent extends OtherNonParkingIncomeComponent<OtherCommercialIncome> {

  constructor(protected incomeService: IncomeService<OtherCommercialIncome>){
    super(incomeService);
  }

  helpful = (incomes) => this.otherIncomes = [...incomes, new OtherCommercialIncome()].reverse(); 

  ngOnInit(): void {
    this.incomeService.getIncomes(OtherCommercialIncome).then(this.helpful);
  }

  handleSave(e: any): void {
    this.incomeService.addIncome(e).then(this.helpful);
  }

  handleDestroy(e: any): void {
    this.incomeService.deleteTodoById(e).then(this.helpful);
  }

}
