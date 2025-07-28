import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WeatherApiService } from '../weather-api.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router'; 
import { Router } from '@angular/router';


@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, RouterModule],
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css'],
  providers: [WeatherApiService],
  
})
export class WeatherComponent {
  public weatherData:any= '';
  public imgPath:string="https://www.weatherbit.io/static/img/icons/";
  cities: string[] = [
    'Toronto',
    'New York',
    'London',
    'Los Angeles',
    'Tokyo',
    'Mumbai',
    'Paris',
    'Berlin',
    'Dubai',
    'New Delhi',
  ];
  selectedCity: string = 'New Delhi'; 

  constructor(public _Api: WeatherApiService, private router: Router) {}//

  goHome() {
    this.router.navigate(['/']);
  }

  ngOnInit() {
    this.fetchWeather();
  }

  fetchWeather() {
    this._Api.getWeather(this.selectedCity).subscribe(
      (data) => {
        console.log(`Weather for ${this.selectedCity}:`, data);
        this.weatherData=data.data;
      },
      (error) => {
        console.error(`Failed to fetch weather for ${this.selectedCity}:`, error);
      }
    );
  }

  onCityChange() {
    this.fetchWeather();
  }
}
