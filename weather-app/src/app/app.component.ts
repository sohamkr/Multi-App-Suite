import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WeatherComponent} from './weather/weather.component'
import {CurrencyConverterComponent} from './currency-converter/currency-converter.component'
import {TodoComponent} from './components/todo/todo.component'
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
 



@Component({
  selector: 'app-root',
  imports: [RouterOutlet, WeatherComponent, CurrencyConverterComponent, TodoComponent],
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.sass',
})
export class AppComponent {
  title = 'weather-app';
}
