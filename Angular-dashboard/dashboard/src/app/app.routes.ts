import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { WeatherComponent } from './weather/weather.component';
import { CurrencyConverterComponent } from './currency-converter/currency-converter.component';
import { TodoComponent } from './components/todo/todo.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'weather', component: WeatherComponent },
  { path: 'currency', component: CurrencyConverterComponent },
  { path: 'todo', component: TodoComponent },
  { path: '**', redirectTo: '' }
];
