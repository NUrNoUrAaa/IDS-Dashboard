import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';
import { ModelDetailsComponent } from '../model-details/model-details';

@Component({
  selector: 'app-models',
  imports: [CommonModule, NgChartsModule ,ModelDetailsComponent],
  templateUrl: './models.html',
  styleUrls: ['./models.css']
})
export class Models  {
  models = [
    { name: 'Random Forest', description: 'Tree-based ensemble model.', accuracy: 97, precision: 96, recall: 95 },
    { name: 'XGBoost', description: 'Boosted decision tree model.', accuracy: 98, precision: 97, recall: 96 },
    { name: 'Neural Network', description: 'Deep learning model.', accuracy: 99, precision: 98, recall: 97 }
  ];

  selectedModel: string = '';

  setAsPreferred(model: any) {
    this.selectedModel = model.name;
    alert(`Preferred model set to: ${model.name}`);
  }

  getChartData(model: any) {
    return {
      labels: ['Accuracy', 'Precision', 'Recall'],
      datasets: [
        {
          data: [model.accuracy, model.precision, model.recall],
          backgroundColor: ['#3b82f6', '#8b5cf6', '#10b981']
        }
      ]
    };
  }

  chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: { y: { beginAtZero: true, max: 100 } }

  };


selectedModelForDetails: any = null;

showDetails(model: any) {
  this.selectedModelForDetails = model;
}


}
