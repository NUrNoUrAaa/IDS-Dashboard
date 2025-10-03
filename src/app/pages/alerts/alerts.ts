import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertItem } from '../../models/models';
import { DataService } from '../../services/data';



@Component({
  selector: 'app-alerts',
  imports: [CommonModule],
  templateUrl: './alerts.html',
  styleUrl: './alerts.css'
})
export class Alerts implements OnInit {
  alerts: AlertItem[] = [];
  constructor(private ds: DataService) {}
  ngOnInit() { this.ds.getAlerts().subscribe(a=>this.alerts=a); }
}
