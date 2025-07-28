import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { WeatherComponent } from './app/weather/weather.component';
import { CurrencyConverterComponent } from './app/currency-converter/currency-converter.component';
import { AppComponent } from './app/app.component';


bootstrapApplication(AppComponent,  {
  providers: [provideHttpClient()]
}).catch((err) => console.error(err));
  