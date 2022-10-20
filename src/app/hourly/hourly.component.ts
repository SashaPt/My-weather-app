import { Component, Input, OnInit } from '@angular/core';
import { IHourWeather } from '../shared/model/weather.model';

@Component({
  selector: 'app-hourly',
  templateUrl: './hourly.component.html',
  styleUrls: ['./hourly.component.scss']
})
export class HourlyComponent implements OnInit {
  @Input() dayForecast!: IHourWeather;
  constructor() { }

  ngOnInit(): void {
  }
  getIcon(iconName: string): string {
    return `http://openweathermap.org/img/w/${iconName}.png`;
  }
}
