import { ViewEncapsulation, Input, Inject, ChangeDetectionStrategy, Component, OnInit, OnChanges, Output, Injector, EventEmitter} from '@angular/core';
import { IParkingIncome } from './parking-income';
import style from './parking-income.style';
import { CommercialIncomeService, ResidentialIncomeService } from './parking-income.service';
import { Observable } from 'rxjs/Observable';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PARKING_INC_CONFIG } from './config';

class ParkingIncome implements IParkingIncome {

  parkingStyle: string;
  squareFeet?: number;
  spaces: number;
  monthlyFee: number;
  totalMonthlyIncome: number;

  constructor(options: {
    squareFeet?: number, 
    spaces: number, 
    parkingStyle: string, 
    monthlyFee: number}){

    this.spaces = options.spaces;
    this.squareFeet = options.squareFeet;
    this.parkingStyle = options.parkingStyle;
    this.monthlyFee = options.monthlyFee;
    this.totalMonthlyIncome = this.monthlyFee * this.spaces;
  }

}

abstract class ParkingIncomeComponent<T extends IParkingIncome> implements OnInit { 

  newIncomeForm: FormGroup;
  incomes: Observable<Array<IParkingIncome>>;
  private fb: FormBuilder;
  readonly parkingStyles: string[] = ['indoor', 'outdoor'];

  constructor( private incomeService: ResidentialIncomeService | CommercialIncomeService, private config: T){
    this.fb = new FormBuilder();
  }

  private createForm() {
    const validatedRent = {monthlyFee: [this.config.monthlyFee, [Validators.required]]};
    const validatedSpaces = {spaces: [this.config.spaces, [Validators.required]]};
    this.newIncomeForm = this.fb.group(Object.assign({}, this.config, validatedRent, validatedSpaces));
  }

  addClick(){

    if (this.newIncomeForm.valid){
      const formVals = this.newIncomeForm.value;
      this.incomeService.addIncome(new ParkingIncome(this.newIncomeForm.value));
    }

    this.newIncomeForm.reset(this.config);
  }

  ngOnInit() {
    this.incomes = this.incomeService.chincomes$;
    this.createForm();
  }

  handleDestroy(e: T) {
		this.incomeService.removeIncome(e);
  }

}

@Component({
  selector: 'commercial-parking-income',
  template: require('./commercial-parking-income.component.html'),
  // github.com/webpack-contrib/style-loader/issues/123
  //styles: [require('./parking-income.css').toString()],
  styles: [style],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommercialParkingIncomeComponent<T extends IParkingIncome> extends ParkingIncomeComponent<T> { 

  constructor(incomeService: CommercialIncomeService, @Inject(PARKING_INC_CONFIG) config: T){
    super(incomeService, config);
  }

}

@Component({
  selector: 'residential-parking-income',
  template: require('./parking-income.component.html'),
  styles: [style],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResidentialParkingIncomeComponent<T extends IParkingIncome> extends ParkingIncomeComponent<T> { 
  constructor(incomeService: ResidentialIncomeService, @Inject(PARKING_INC_CONFIG) config: T){
    super(incomeService, config);
  }

}

/*

export class ParkingIncomeComponent implements OnInit {

  @Input() isCommercial: boolean;
	incomes: Observable<ParkingIncome[]>;
  newIncomeForm: FormGroup;
  parkingStyles: string[];
  private incomeService: any;

  constructor(private fb: FormBuilder, private injector: Injector, @Inject(PARKING_INC_CONFIG) private config: IParkingIncome){
  }

  createForm() {

		this.parkingStyles = [ParkingIncome.INDOOR, ParkingIncome.OUTDOOR]
    this.newIncomeForm = this.fb.group(this.config);

  }

  addNewIncome(){
    console.log("addNewIncome", this.newIncomeForm.value);
    this.incomeService.addIncome(new ParkingIncome(this.newIncomeForm.value));
    this.newIncomeForm.reset(this.config);
  }

  ngOnChanges(){
    if (this.isCommercial){
      this.incomeService = this.injector.get(CommercialIncomeService); 
    } else {
      this.incomeService = this.injector.get(ResidentialIncomeService);
    }
  }

  ngOnInit() {
		this.incomes = this.incomeService.chincomes$;
    this.createForm();
  }

  handleDestroy(e: any) {
		this.incomeService.removeIncome(e);
  }

}
*/
