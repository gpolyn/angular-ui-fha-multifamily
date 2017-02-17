import {Component, Output, EventEmitter} from '@angular/core';
import { QuestionService } from '../dynamic-form/question.service';
import { IncomeServiceRevised } from '../special.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'fha-app',
  providers: [QuestionService],
  template: require('./app.component.html')
})
export class AppComponent {

  questions: any[];
  @Output()
  totalResidentialIncome: EventEmitter<number> = new EventEmitter<number>();
  @Output()
  totalCommercialIncome: EventEmitter<number> = new EventEmitter<number>();
  @Output()
  totalEffectiveIncome: EventEmitter<number> = new EventEmitter<number>();
  residentialEGI: any;
  commercialEGI: any;
	incomes: Observable<any[]>;


  constructor(service: QuestionService, private incomeService: IncomeServiceRevised) {
    this.questions = service.getQuestions();
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
