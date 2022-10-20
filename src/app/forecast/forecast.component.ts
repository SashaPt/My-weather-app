import { Component, Input, OnInit } from '@angular/core';
import { IHourWeather } from '../shared/model/weather.model';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.scss']
})
export class ForecastComponent implements OnInit {
  @Input() dayForecast!: IHourWeather;

  constructor() {}

  ngOnInit(): void {}

  getIcon(iconName: string): string {
    return `http://openweathermap.org/img/w/${iconName}.png`;
  }
}
