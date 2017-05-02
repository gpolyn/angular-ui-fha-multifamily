import {Component, Output, EventEmitter} from '@angular/core';
import { QuestionService } from '../components';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import {GrossIncomeService} from '../services';

@Component({
  selector: 'fha-app',
  providers: [QuestionService, GrossIncomeService],
  template: require('./app.component.html')
})
export class AppComponent {

  questions: any[];
  questionsObj: any;
  @Output()
  totalResidentialIncome: EventEmitter<number> = new EventEmitter<number>();
  @Output()
  totalCommercialIncome: EventEmitter<number> = new EventEmitter<number>();
  @Output()
  totalEffectiveIncome: EventEmitter<number> = new EventEmitter<number>();
  residentialEGI: any;
  commercialEGI: any;
	incomes: Observable<any[]>;
  maxCommercialOccupancy: number = 90;
  maxResidentialOccupancy: number = 80;
  grossIncome$: Observable<number>;

  constructor(service: QuestionService, grossService: GrossIncomeService) {
    this.questionsObj = service.getQuestionsObject();
    this.grossIncome$ = grossService.grossIncome$;
  }

  handleEGI(e:any){
    console.log(e)
    // this.totalEffectiveIncome.emit(e);
  }

  handleResidentialIncome(e: any){
  //  this.totalResidentialIncome.emit(e.incomeChange)
  }

  handleCommercialIncome(e: any){
    console.log("AppComponent#handleCommercialIncome", e);
    // this.totalCommercialIncome.emit(e.incomeChange)
  }

}
