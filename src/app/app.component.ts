import { Component, OnInit } from '@angular/core';
import {
  IForecastWeather,
  IHourWeather,
  IWeather,
} from './shared/model/weather.model';
import { WeatherService } from './shared/service/weather.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  cityName: string = '';
  currentWeather!: IWeather;
  currentWeatherTimezoned!: IWeather;
  forecastInfo!: IForecastWeather;
  forecastWeather: IHourWeather[] = [];
  forecastWeatherTimezoned: IHourWeather[] = [];
  isTodayActive: boolean = true;
  isForecastActive: boolean = false;
  selectedDate: number = 0;
  fiveDaysWeather: IHourWeather[] = [];
  threeHoursWeather: IHourWeather[] = [];
  isError: boolean = false;
  error: any;

  constructor(private weatherService: WeatherService) {}
  ngOnInit() {}
  getCurrentWeather() {
    return this.weatherService
      .getCurrentWeatherByCityName(this.cityName)
      .subscribe(
        (data) => {
          this.currentWeather = data;
          this.currentWeatherTimezoned = this.changeCurrentTimeZone(
            this.currentWeather
          );
          if (this.isTodayActive) this.selectedDate = this.currentWeatherTimezoned.dt;
          this.isError = false;
        },
        (error) => {
          this.error = error.message;
          console.log(this.error);
          this.isError = true;
        }
      );
  }
  getForecastWeather() {
    return this.weatherService
      .getForecastWeatherByCityName(this.cityName)
      .subscribe(
        (data) => {
          this.forecastInfo = data;
          this.forecastWeather = data?.list;
          this.forecastWeatherTimezoned = this.changeForecastTimeZone(
            this.forecastWeather
          );
          this.fiveDaysWeather = this.getFiveDaysWeather(
            this.forecastWeatherTimezoned
          );
          this.isError = false;
        },
        (error) => {
          this.error = error.message;
          console.log(this.error);
          this.isError = true;
        }
      );
  }
  getWeather() {
    this.selectedDate = 0;
    this.getCurrentWeather();
    this.getForecastWeather();
  }
  showForecast() {
    this.isTodayActive = false;
    this.isForecastActive = true;
    this.selectedDate = 0;
  }
  showCurrent() {
    this.isTodayActive = true;
    this.isForecastActive = false;
    if (this.currentWeather) {
      this.selectedDate = this.currentWeatherTimezoned.dt;
    }
  }
  getFiveDaysWeather(array: IHourWeather[]) {
    return array.filter(
      (elem) =>
        new Date(elem.dt * 1000).getHours() > 12 &&
        new Date(elem.dt * 1000).getHours() < 16
    );
  }
  getThreeHoursWeather(array: IHourWeather[], date: number) {
    return array.filter(
      (elem) =>
        new Date(elem.dt * 1000).getDate() == new Date(date * 1000).getDate()
    );
  }
  changeForecastTimeZone(local: IHourWeather[]) {
    return local.map((elem) => {
      return {
        ...elem,
        dt:
          elem.dt +
          new Date(elem.dt * 1000).getTimezoneOffset() * 60 +
          this.forecastInfo.city.timezone,
      };
    });
  }
  changeCurrentTimeZone(local: IWeather) {
    return {
      ...local,
      sys: 
      { ...local.sys,
        sunrise: local.sys.sunrise +
        new Date(local.sys.sunrise * 1000).getTimezoneOffset() * 60 +
        this.currentWeather.timezone, 
        sunset: local.sys.sunset +
        new Date(local.sys.sunset * 1000).getTimezoneOffset() * 60 +
        this.currentWeather.timezone, 
      },
      dt:
        local.dt +
        new Date(local.dt * 1000).getTimezoneOffset() * 60 +
        this.currentWeather.timezone, 
    };
  }
}
