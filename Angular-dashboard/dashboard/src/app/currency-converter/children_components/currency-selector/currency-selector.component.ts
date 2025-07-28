import { Component } from '@angular/core';
import {CurrencyService} from '../../../services/currency/currency.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Input, ViewChild } from '@angular/core';

@Component({
  selector: 'app-currency-selector',
  imports: [FormsModule, CommonModule],
  templateUrl: './currency-selector.component.html',
  styleUrl: './currency-selector.css'
})
export class CurrencySelectorComponent {
  public findCurrency = '';
  public currencies: any;
  public elementCurrenciesList: any;
  public isEdited = true;
  public ignoreFocusOut = false;
  public noResultsFind = false;
  public selectedCurrency: any;

  @ViewChild('search_input', { static: false }) search_input: any;
  @Input() selectorId: any;
  @Input() changeCurrency: any;

  constructor(public _cs: CurrencyService) {}

  ngOnInit(): void {
    this.isEdited = true;
    this._cs.getCurrenciesObservable().subscribe(
      data => {
        this.currencies = data;
        this.selectedCurrency = this._cs.getCurrencies()[0];
      },
      error => console.error(error)
    );
  }

  ngAfterViewInit(): void {
    this.elementCurrenciesList = document.getElementById(`currenciesList ${this.selectorId}`);
  }

  valueFinding() {
    console.log("valueFinding triggered");
    this.currencies = this._cs.getCurrencies()
      .filter(item =>
        item.name.toLowerCase().includes(this.findCurrency.toLowerCase()) ||
        item.full_name.toLowerCase().includes(this.findCurrency.toLowerCase()) ||
        item.symbol.toLowerCase().includes(this.findCurrency.toLowerCase())
      )
      .map(item => ({
        ...item,
        full_name: item.full_name.toUpperCase(),
        symbol: `[${item.symbol}]`
      }));
    this.noResultsFind = this.currencies.length === 0;
  }

  selectCurrencyFunc(currency: any) {
    console.log("selectCurrencyFunc triggered", currency);
    this.selectedCurrency = currency;
    this.changeCurrency(currency);
  }

  HideDropdown() {
    if (this.elementCurrenciesList) {
      this.elementCurrenciesList.className = "dropdown-menu scrollable-menu";
      this.isEdited = true;
    }
  }

  showDropdown() {
    if (this.elementCurrenciesList) {
      this.elementCurrenciesList.className = "dropdown-menu scrollable-menu show";
      this.isEdited = false;
    }
  }

  focusOutInput() {
    console.log("focusOutInput triggered");
    if (!this.ignoreFocusOut) {
      this.HideDropdown();
    }
  }

  dropClick() {
    if (this.isEdited) {
      this.showDropdown();
      this.findCurrency = '';
      this.search_input?.nativeElement.focus();
    }
  }
}
