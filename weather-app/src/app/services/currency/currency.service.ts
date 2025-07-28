import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  currencies:Currency []=[];
  lastUpdate:string="";
  usdRateApi='https://open.er-api.com/v6/latest/USD';
 

  constructor(private http: HttpClient) { }

  getUSDRates() {
    return this.http.get<any>(this.usdRateApi);
  }

  public getCurrencies(){
    return this.currencies;
  }

  public getCurrenciesObservable(): Observable<Currency[]> {
    if (this.currencies.length === 0) {
      return this.http.get<any>('https://open.er-api.com/v6/latest/USD').pipe(
        switchMap(data => {
          this.currencies = Object.keys(data.rates).map(key => ({
            rate: data.rates[key],
            full_name: '',
            name: key,
            symbol: ''
          }));
          this.lastUpdate = data.time_last_update_utc;
 
          return this.http.get<any>('https://restcountries.com/v3.1/all?fields=currencies').pipe(
            map(countries => {
              countries.forEach((country:any) => {
                const name = Object.keys(country.currencies)[0];
                const index = this.currencies.findIndex(currency => currency.name === name);
                if (index !== -1) {
                  this.currencies[index] = {
                    ...this.currencies[index],
                    full_name: country.currencies[name].name,
                    symbol: country.currencies[name].symbol
                  };
                }
              });
              return this.currencies;
            })
          );
        })
      );
    } else {
      return of(this.currencies);
    }
  }
 

}
interface Currency {
  rate: number;
  full_name: string;
  name: string;
  symbol: string;
}

