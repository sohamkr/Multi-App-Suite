import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherApiService {

   private apiKey = '7243ebd0227241829670061db92eae93'; 
    private apiUrl = 'https://api.weatherbit.io/v2.0/forecast/daily?city=';
  
    constructor(private http: HttpClient) {}
  
    getWeather(city: any) {

        return this.http.get<any>(`${this.apiUrl}${city}&key=${this.apiKey}&days=3`);
    }
  }
  

