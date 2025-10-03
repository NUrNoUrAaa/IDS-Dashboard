import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartComponent } from "ng-apexcharts";

@Component({
  selector: 'app-analytics',
  imports: [CommonModule, ChartComponent],
  templateUrl: './analytics.html',
  styleUrl: './analytics.css'
})
export class Analytics implements OnInit {
  overview = {
    totalTraffic: 10234,
    detected: 123,
    accuracy: 98,
    activeAlerts: 4
  };

  recentAlerts = [
    { time: '12:01', type: 'DDoS', src: '192.168.1.5', severity: 'High' },
    { time: '12:05', type: 'SQLi', src: '192.168.1.6', severity: 'Medium' }
  ];

  trafficChartOptions: any = {};
  donutOptions: any = {};

  ngOnInit() {
    this.trafficChartOptions = {
      series: [{ name: 'Traffic', data: [10, 41, 35, 51, 49, 62, 69] }],
      chart: { type: 'line', height: 280 },
      xaxis: { categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] },
      stroke: { curve: 'smooth' },
      tooltip: { enabled: true }
    };

    this.donutOptions = {
      series: [44, 55, 13],
      chart: { type: 'donut', height: 280 },
      labels: ['Normal', 'DDoS', 'SQLi'],
      legend: { position: 'bottom' }
    };
  }
}