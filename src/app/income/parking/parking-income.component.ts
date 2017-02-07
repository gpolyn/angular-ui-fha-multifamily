import {Input, Component, OnInit} from '@angular/core';
import { ParkingIncome } from './parking-income';
import { IncomeServiceRevised } from './income.service';

@Component({
  selector: 'parking-income',
  template: require('./parking-income.component.html'),
	providers: [ IncomeServiceRevised ]
})

export class ParkingIncomeComponent implements OnInit {

  @Input() isCommercial: boolean;

  parkingIncomes: Array<ParkingIncome> = [];

  constructor(private incomeService: IncomeServiceRevised<ParkingIncome>){ }

  private helpful = (incomes) => this.parkingIncomes = [...incomes, new ParkingIncome(this.isCommercial)].reverse();

  ngOnInit() {
    this.incomeService.getIncomes().then(this.helpful);
  }

  handleSave(e: any) {
    this.incomeService.saveIncome(e).then(this.helpful);
  }

  handleDestroy(e: any) {
    this.incomeService.deleteIncome(e).then(this.helpful);
  }

}
