import {Component, Output, EventEmitter} from '@angular/core';
import { QuestionService } from '../dynamic-form/question.service';

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

  constructor(service: QuestionService) {
    this.questions = service.getQuestions();

    this.residentialEGI = {isCommercial: false, totalIncome: 0,occupancyPercent:85, maxOccupancyPercent:95}

    this.commercialEGI = {isCommercial: true, totalIncome:0,occupancyPercent:80, maxOccupancyPercent:80}
  }

  handleEGI(e:any){
    console.log(e)
    this.totalEffectiveIncome.emit(e);
  }

  handleResidentialIncome(e: any){
    this.totalResidentialIncome.emit(e.incomeChange)
  }

  handleCommercialIncome(e: any){
    console.log("AppComponent#handleCommercialIncome", e);
    this.totalCommercialIncome.emit(e.incomeChange)
  }

}
