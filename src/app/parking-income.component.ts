import {Input, Component, OnInit} from '@angular/core';
import { ParkingIncome, CommercialParkingIncome, ResidentialParkingIncome } from './parking-income';
import { ParkingIncomeService } from './parking-income.service';
import { IncomeService } from './income.service';

@Component({
  selector: 'parking-income',
  template: require('./parking-income.component.html'),
	providers: [ParkingIncomeService, IncomeService]
})

export class ParkingIncomeComponent implements OnInit {

  @Input() isCommercial: boolean;

  parkingIncomes: Array<ParkingIncome> = [];

  constructor(private incomeService: IncomeService<ParkingIncome>, private parkingIncomeService: ParkingIncomeService){ }

  private helpful = (incomes) => this.parkingIncomes = [...incomes, this.parkingIncomeService.getNewIncome(this.isCommercial)].reverse();

  ngOnInit(): void {
    if (this.isCommercial){
      this.incomeService.getIncomes(CommercialParkingIncome).then(this.helpful);
    } else {
      this.incomeService.getIncomes(ResidentialParkingIncome).then(this.helpful);
    }
  }

  handleSave(e: any): void {
    this.incomeService.addIncome(e).then(this.helpful);
  }

  handleDestroy(e: any): void {
    this.incomeService.deleteTodoById(e).then(this.helpful);
  }

}
