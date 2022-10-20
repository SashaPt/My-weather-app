import { Component, Input, OnInit } from '@angular/core';
import { IWeather } from '../shared/model/weather.model';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss'],
})
export class WeatherComponent implements OnInit {
  today: Date = new Date();
  @Input() currentWeatherTimezoned!: IWeather;

  constructor() {}

  ngOnInit(): void {}

  getIcon(iconName: string): string {
    return `http://openweathermap.org/img/w/${iconName}.png`;
  }
}
