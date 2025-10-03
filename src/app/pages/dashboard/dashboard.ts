import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgApexchartsModule } from 'ng-apexcharts';
import { Overview, TimeSeries, AttackTypes, AlertItem } from '../../models/models';
import { DataService } from '../../services/data';


// export type ChartOptions = {
//   series: ApexAxisChartSeries;
//   chart: ApexChart;
//   xaxis: ApexXAxis;
//   dataLabels: ApexDataLabels;
//   stroke: ApexStroke;
//   tooltip: ApexTooltip;
//   legend: ApexLegend;
//   grid: ApexGrid;
// };


export type ChartOptions = any;


@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, NgApexchartsModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit {
  overview: Overview | null = null;
  timeseries: TimeSeries | null = null;
  attacks: AttackTypes | null = null;
  recentAlerts: AlertItem[] = [];

  // chart options
  trafficChartOptions: ChartOptions = {};
  donutOptions: ChartOptions = {};

  constructor(private ds: DataService) {}

  ngOnInit() {
    this.ds.getOverview().subscribe(o => this.overview = o);
    this.ds.getTimeSeries().subscribe(ts => {
      this.timeseries = ts;
      this.trafficChartOptions = {
        series: [{ name: 'Traffic', data: ts.series }],
        chart: { type: 'line', height: 320, toolbar: { show: false } },
        xaxis: { categories: ts.categories },
        stroke: { curve: 'smooth', width: 3 },
        tooltip: { theme: 'dark' }
      };
    });
    this.ds.getAttackTypes().subscribe(a => {
      this.attacks = a;
      this.donutOptions = {
        series: a.values,
        chart: { type: 'donut', height: 260 },
        labels: a.labels,
        legend: { position: 'bottom' }
      };
    });
    this.ds.getAlerts().subscribe(arr => this.recentAlerts = arr);
  }
}
