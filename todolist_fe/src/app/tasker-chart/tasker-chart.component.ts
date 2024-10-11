import { Component } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-tasker-chart',
  templateUrl: './tasker-chart.component.html',
  styleUrls: ['./tasker-chart.component.scss']
})
export class TaskerChartComponent {

  public chart: any;
  
  ngOnInit() {
    this.createChart();
  }

  createChart() {
    this.chart = new Chart("taskerChart", {
      type: 'bar',
      data: {
        labels: ["🐨", "🐼", "🐻"],
        datasets: [
          {
            label: "Complete Tasks",
            data: ['600', '576', '372'],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(255, 159, 64, 0.2)',
              'rgba(255, 205, 86, 0.2)',
            ],
            borderColor: [
              'rgb(255, 99, 132)',
              'rgb(255, 159, 64)',
              'rgb(255, 205, 86)',
            ],
            borderWidth: 1
          }
        ]
      },
      options: {
        aspectRatio:2.5
      }
    });
  }
}
