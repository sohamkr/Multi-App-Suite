import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherApiService {

   private apiKey = '4513c7d025384a718563017ad13d500f'; 
    private apiUrl = 'https://api.weatherbit.io/v2.0/forecast/daily?city=';
  
    constructor(private http: HttpClient) {}
  
    getWeather(city: any) {

        return this.http.get<any>(`${this.apiUrl}${city}&key=${this.apiKey}&days=3`);
    }
  }
  

