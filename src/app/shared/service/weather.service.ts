import { HttpClient } from '@angular/common/http';
import { Injectable, Input } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { IForecastWeather, IWeather } from '../model/weather.model';
import { catchError } from 'rxjs/operators';

const API_URL = 'https://api.openweathermap.org/data/2.5';
const API_KEY = '489dae3d5e2fc4102bd4ab2f128d70ee';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  constructor(private httpClient: HttpClient) {}

  getCurrentWeatherByCityName(cityName: string): Observable<IWeather> {
    return this.httpClient
      .get<IWeather>(
        `${API_URL}/weather?q=${cityName}&units=metric&appid=${API_KEY}`
      )
  }
  getForecastWeatherByCityName(
    cityName: string
  ): Observable<IForecastWeather> {
    return this.httpClient
      .get<IForecastWeather>(
        `${API_URL}/forecast?q=${cityName}&units=metric&appid=${API_KEY}`
      )
  
  }
}
