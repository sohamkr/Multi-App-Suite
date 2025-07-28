import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { provideRouter, Routes } from '@angular/router';
import { AppComponent } from './app/app.component';
import { WeatherComponent } from './app/weather/weather.component';
import { CurrencyConverterComponent } from './app/currency-converter/currency-converter.component';
import { TodoComponent } from './app/components/todo/todo.component';
import { HttpClientModule } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { routes } from './app/routes'

// const routes: Routes = [
//   { path: '', redirectTo: 'weather', pathMatch: 'full' },
//   { path: 'weather', component: WeatherComponent },
//   { path: 'currency', component: CurrencyConverterComponent },
//   { path: 'todo', component: TodoComponent },
// ];

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    importProvidersFrom(HttpClientModule) // ✅ Fix: Provide HttpClientModule
  ],
}).catch(err => console.error(err));
  