import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

interface IOpexServiceCapsule {
  opex: number;
  isPercent: boolean;  
  metadata?: any;
}

@Injectable()
export class OpexService {

  private simpleOpex: IOpexServiceCapsule;
  opex$: BehaviorSubject<IOpexServiceCapsule>; 

  constructor(){
    this.simpleOpex = {opex: undefined, isPercent: undefined};
    this.opex$ = new BehaviorSubject<IOpexServiceCapsule>(this.simpleOpex);
  }

  save(data: IOpexServiceCapsule){
    console.log('OpexService#save', data); 
    this.simpleOpex = data;
    this.opex$.next(this.simpleOpex);
  }

}
