import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgApexchartsModule } from 'ng-apexcharts';

@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [CommonModule, NgApexchartsModule],
  templateUrl: './analytics.html',
  styleUrls: ['./analytics.css']
})
export class Analytics implements OnInit {
  Math = Math;
  overview = {
    totalTraffic: 10234,
    detected: 123,
    accuracy: 98,
    activeAlerts: 4
  };

  recentAlerts = Array.from({ length: 34 }).map((_, i) => {
    const sev = i % 3 === 0 ? 'High' : (i % 3 === 1 ? 'Medium' : 'Low');
    return {
      time: `2025-10-0${(i % 9) + 1} 1${(i % 6)}:0${i % 6}`,
      type: ['DDoS', 'SQLi', 'Probe', 'PortScan'][i % 4],
      src: `192.168.0.${10 + i}`,
      severity: sev
    };
  });

  pageSize = 8;
  currentPage = 1;
  get totalPages() {
    return Math.max(1, Math.ceil(this.recentAlerts.length / this.pageSize));
  }
  get pagedAlerts() {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.recentAlerts.slice(start, start + this.pageSize);
  }
  goPage(n: number) {
    if (n < 1) n = 1;
    if (n > this.totalPages) n = this.totalPages;
    this.currentPage = n;
  }

  trafficChartOptions: any = {};
  barChartOptions: any = {};
  areaChartOptions: any = {};
  donutOptions: any = {};
  radarOptions: any = {};
  heatmapOptions: any = {};

 ngOnInit() {
    this.applyTheme();

    const observer = new MutationObserver(() => {
      this.applyTheme();
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });
  }

  applyTheme() {
    const isDark = document.documentElement.classList.contains('dark');
    const textColor = isDark ? '#FFFFFFFF' : '#000000FF';
    const gridColor = isDark ? '#334155' : '#e6e6e6';

    this.trafficChartOptions = {
      series: [{ name: 'Traffic', data: [120, 250, 190, 300, 420, 360, 480] }],
      chart: { type: 'line', height: 300, animations: { enabled: true, easing: 'easeinout', speed: 700 }, foreColor: textColor },
      stroke: { curve: 'smooth', width: 3 },
      xaxis: { categories: ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'], labels: { style: { colors: textColor } } },
      colors: [isDark ? '#7dd3fc' : '#2563eb'],
      grid: { borderColor: gridColor },
      tooltip: { theme: isDark ? 'dark' : 'light' },
      dataLabels: { enabled: true, style: { colors: [textColor] } },
      theme: { mode: isDark ? 'dark' : 'light' }
    };

    this.barChartOptions = {
      series: [{ name: 'Attacks', data: [44, 55, 13, 33, 22] }],
      chart: { type: 'bar', height: 260, animations: { enabled: true, speed: 700 }, foreColor: textColor },
      xaxis: { categories: ['DDoS','SQLi','XSS','BruteForce','Others'], labels: { style: { colors: textColor } } },
      plotOptions: { bar: { borderRadius: 8, columnWidth: '55%' } },
      colors: [isDark ? '#fb7185' : '#ef4444'],
      grid: { borderColor: gridColor },
      tooltip: { theme: isDark ? 'dark' : 'light' },
      dataLabels: { enabled: true, style: { colors: [textColor] } },
      theme: { mode: isDark ? 'dark' : 'light' }
    };

    this.areaChartOptions = {
      series: [{ name: 'Detections', data: [31, 40, 28, 51, 42, 109, 100] }],
      chart: { type: 'area', height: 260, animations: { enabled: true, speed: 700 }, foreColor: textColor },
      xaxis: { categories: ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'], labels: { style: { colors: textColor } } },
      stroke: { curve: 'smooth' },
      fill: { type: 'gradient', gradient: { shade: isDark ? 'dark' : 'light', opacityFrom: 0.6, opacityTo: 0.1 } },
      colors: [isDark ? '#06b6d4' : '#2563eb'],
      grid: { borderColor: gridColor },
      tooltip: { theme: isDark ? 'dark' : 'light' },
      dataLabels: { enabled: true, style: { colors: [textColor] } },
      theme: { mode: isDark ? 'dark' : 'light' }
    };

    this.donutOptions = {
      series: [60, 25, 10, 5],
      chart: { type: 'donut', height: 260, foreColor: textColor },
      labels: ['Normal','DDoS','SQLi','Probe'],
      legend: { position: 'bottom', labels: { colors: textColor } },
      colors: isDark ? ['#34d399', '#fb7185', '#fbbf24', '#60a5fa'] : ['#10b981', '#ef4444', '#f59e0b', '#3b82f6'],
      tooltip: { theme: isDark ? 'dark' : 'light' },
      dataLabels: { enabled: true, style: { colors: [textColor] } },
      theme: { mode: isDark ? 'dark' : 'light' }
    };

    this.radarOptions = {
      series: [
        { name: 'RandomForest', data: [98, 96, 95, 92, 94] },
        { name: 'SVM', data: [93, 92, 91, 89, 90] }
      ],
      chart: { type: 'radar', height: 300, foreColor: textColor, animations: { enabled: true } },
      xaxis: { categories: ['Accuracy','Precision','Recall','F1','AUC'], labels: { style: { colors: textColor } } },
      colors: isDark ? ['#a78bfa', '#60a5fa'] : ['#7c3aed', '#2563eb'],
      tooltip: { theme: isDark ? 'dark' : 'light' },
      dataLabels: { enabled: true, style: { colors: [textColor] } },
      theme: { mode: isDark ? 'dark' : 'light' }
    };

    this.heatmapOptions = {
      series: [
        { name: 'Mon', data: this.generateHeatData(24) },
        { name: 'Tue', data: this.generateHeatData(24) },
        { name: 'Wed', data: this.generateHeatData(24) },
        { name: 'Thu', data: this.generateHeatData(24) },
        { name: 'Fri', data: this.generateHeatData(24) },
      ],
      chart: { type: 'heatmap', height: 200, foreColor: textColor },
      dataLabels: { enabled: true, style: { colors: ['#000000FF'] } },
      colors: ['#ef4444','#f59e0b','#10b981' ,'#3b82f6','#8b5cf6', '#ec4899'],
      plotOptions: { heatmap: { radius: 4 } },
      tooltip: { theme: isDark ? 'dark' : 'light' },
      theme: { mode: isDark ? 'dark' : 'light' },
      grid: { borderColor: gridColor }
    };
  }

  private generateHeatData(points: number) {
    return Array.from({ length: points }).map(() => Math.floor(Math.random() * 10));
  }

  progressPct(value: number) {
    return Math.max(0, Math.min(100, value)) + '%';
  }

  severityColor(sev: string) {
    switch (sev) {
      case 'High': return 'text-red-500 font-bold';
      case 'Medium': return 'text-yellow-500 font-semibold';
      case 'Low': return 'text-green-500 font-medium';
      default: return '';
    }
  }
}
