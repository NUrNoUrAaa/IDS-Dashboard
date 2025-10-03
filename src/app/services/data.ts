import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface Overview {
  totalTraffic: string;
  detected: number;
  accuracy: number;
  activeAlerts: number;
}

export interface TimeSeries {
  categories: string[];
  series: number[];
}

export interface AttackTypes {
  labels: string[];
  values: number[];
}

export interface AlertItem {
  time: string;
  type: string;
  src: string;
  severity: string;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private baseUrl = '/api';

  private mockOverview: Overview = {
    totalTraffic: '120,000',
    detected: 5340,
    accuracy: 98,
    activeAlerts: 32
  };

  private mockTime: TimeSeries = {
    categories: ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],
    series: [40,60,55,70,91,125,150]
  };

  private mockAttacks: AttackTypes = {
    labels: ['DoS','Probe','R2L','U2R'],
    values: [45,30,15,10]
  };

  private mockAlerts: AlertItem[] = [
    { time: '2025-10-01 21:57', type: 'DoS', src: '192.168.1.4', severity: 'High' },
    { time: '2025-10-01 20:12', type: 'Probe', src: '10.0.0.3', severity: 'Medium' },
    { time: '2025-10-01 18:05', type: 'R2L', src: '172.16.0.5', severity: 'Low' }
  ];

  constructor(private http: HttpClient) {}


  getOverview(): Observable<Overview> {
    return this.http.get<Overview>(`${this.baseUrl}/overview`).pipe(
      catchError(_ => of(this.mockOverview))
    );
  }

  getTimeSeries(): Observable<TimeSeries> {
    return this.http.get<TimeSeries>(`${this.baseUrl}/timeseries`).pipe(
      catchError(_ => of(this.mockTime))
    );
  }

  getAttackTypes(): Observable<AttackTypes> {
    return this.http.get<AttackTypes>(`${this.baseUrl}/attack-types`).pipe(
      catchError(_ => of(this.mockAttacks))
    );
  }

  getAlerts(): Observable<AlertItem[]> {
    return this.http.get<AlertItem[]>(`${this.baseUrl}/alerts`).pipe(
      catchError(_ => of(this.mockAlerts))
    );
  }
}
