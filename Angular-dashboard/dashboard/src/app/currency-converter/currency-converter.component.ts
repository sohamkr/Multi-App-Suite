import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms';
import {CurrencyService} from '../services/currency/currency.service'
import { CommonModule } from '@angular/common';
import {CurrencySelectorComponent} from './children_components/currency-selector/currency-selector.component';
import { ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';


@Component({
  selector: 'app-currency-converter',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, CurrencySelectorComponent, FormsModule, RouterModule],
  templateUrl: './currency-converter.component.html',
  styleUrl: './currency-converter.component.css'

  


})
export class CurrencyConverterComponent {
  public currency:any = '';
  public errorMessage:any = '';
  currencyConverter:FormGroup ;
  public currencies: any = [];
  public amount_value: any = 1;
  public to: any;
  public from: any;
  public resultFrom: any;
  public resultTo: any;
  public resultInfo: any;
  public isResult = false;
  public fromCurrency: any;
  public toCurrency: any;

  @ViewChild('from') fromComponent:any;
  @ViewChild('to') toComponent:any;

  


  constructor(private fb: FormBuilder, public _cs: CurrencyService, private router: Router) { 
    this.currencyConverter = this.fb.group({ 
    amount: ['100', Validators.required],
    from: ['dollar', Validators.required],
    to: ['rupee', Validators.required]
  }); }

  goHome() {
    this.router.navigate(['/']);
  }

  ngOnInit(): void {
    this._cs.getCurrenciesObservable().subscribe(
      (data) => {
        this.currencies = data;
        console.log(data);
        
      },
      (error) => {
        console.log(error);
      }
    );
  }

  public exchange(){
    let rateBase = this.to.rate/this.from.rate;
    let result = this.amount_value*rateBase;
    this.resultFrom = this.amount_value + " " + (this.from.full_name ? this.from.full_name :  this.from.name) + " =";
    this.resultTo = (result).toFixed(5) + " " + (this.to.full_name ? this.to.full_name :  this.to.name);
    this.resultInfo = (1).toFixed(2) + " " + this.from.name + " = " + rateBase.toFixed(6) + " " +this.to.name + '\n '
                      +  (1).toFixed(2) + " " + this.to.name + " = " + (1/rateBase).toFixed(6) + " " +this.from.name ;
    console.log('RateBase:' +rateBase);
  }

  public selectFrom = (currency:any): void =>{
    console.log("from");
    console.log(currency);
    this.from=currency;
    if (this.isResult){
      this.exchange();
    }
  }

  public selectTo = (currency:any): void =>{
    console.log("To");
    this.to=currency;
    console.log(currency);
    if (this.isResult){
      this.exchange();
      
    }
  }


  changeAmountValue(){
    console.log("Change amount");
    this.amount_value = (Math.round( this.amount_value * 100) / 100).toFixed(2);
    if (this.isResult){
      this.exchange();
    }
  }

  submitForm(){
    this.exchange();
    this.isResult= true;
  }

  swapCurrencies() {
    const temp = this.from;
    // this.fromCurrency = this.toCurrency;
    // this.toCurrency = temp;
    // this.changeAmountValue(); 
    this.fromComponent.selectCurrencyFunc(this.to);
    this.toComponent.selectCurrencyFunc(temp);
    if (this.isResult){
      this.exchange();
    }
  }
  

  
  

}

