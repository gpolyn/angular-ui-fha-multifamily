import {Component, OnInit} from '@angular/core';
import { IncomeService } from './income.service';
import { OtherResidentialIncome } from './other-income';
//import { OtherNonParkingIncomeComponent } from './other-non-parking-income.component';

@Component({
  selector: 'other-residential-non-parking-income',
  template: require('./other-non-parking-residential-income.component.original.html'),
	providers: [IncomeService]
})

//export class OtherResidentialNonParkingIncomeComponent extends OtherNonParkingIncomeComponent<OtherResidentialIncome> {
export class OtherResidentialNonParkingIncomeComponent {

  otherIncomes: Array<OtherResidentialIncome> = [];

  constructor(protected incomeService: IncomeService<OtherResidentialIncome>){
  }

  protected helpful = (incomes) => this.otherIncomes = [...incomes, new OtherResidentialIncome()].reverse(); // wanted a certain order

  ngOnInit(): void {
    this.incomeService.getIncomes(OtherResidentialIncome).then(this.helpful);
  }

  handleSave(e: any): void {
    this.incomeService.addIncome(e).then(this.helpful);
  }

  handleDestroy(e: any): void {
    this.incomeService.deleteTodoById(e).then(this.helpful);
  }

}
