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
