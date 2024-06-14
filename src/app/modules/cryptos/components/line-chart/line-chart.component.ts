import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { ApexAxisChartSeries, ApexChart, ApexDataLabels, ApexFill, ApexGrid, ApexStroke, ApexTitleSubtitle, ApexTooltip, ApexXAxis, ApexYAxis, ChartComponent, NgApexchartsModule } from 'ng-apexcharts';

export interface ILineChartConfig {
  series: ApexAxisChartSeries;
  xaxis: {
    categories: any[],
    type: string;
    labels?: any;
  };
}

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  dataLebels: ApexDataLabels;
  fill: ApexFill;
  stroke: ApexStroke;
  title: ApexTitleSubtitle;
  yaxis: ApexYAxis;
  tooltip: ApexTooltip;
}

const configMock = {
  series: [
    {
      name: 'Line 1',
      data: [1, 2, 3, 4, 5],
      color: '#008f39'
    },
    {
      name: 'Line 2',
      data: [2, 6, 2, 3, 20],
      color: '#F55800'
    }
  ],
  xaxis: {
    categories: ['12/12/2022', '13/12/2022', '14/12/2022', '15/12/2022', '16/12/2022'],
    type: 'datatime'
  }
}

@Component({
  selector: 's-line-chart',
  standalone: true,
  imports: [NgApexchartsModule],
  templateUrl: './line-chart.component.html',
  styleUrl: './line-chart.component.scss'
})
export class LineChartComponent implements OnInit, OnChanges {

  @Input() config!: ILineChartConfig; // = configMock;
  chartOptions!: Partial<ChartOptions> | any;
  loading = true;

  @ViewChild('chart') chart!: ChartComponent;
  
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['config'] && !changes['config'].firstChange) {
      this.setConfig();
    }
  }

  ngOnInit(): void {
    this.setConfig();
  }

  setConfig() {
    this.chartOptions = {
      series: this.config.series,
      chart: {
        height: 350,
        type: "area",
        stacked: false,
      },
      dataLabels: {
        enabled: false
      },
      legend: {
        show: false
      },
      fill: {
        type: "gradient",
        gradient: {
          shadeIntensity: 1,
          inverseColors: false,
          opacityFrom: 1,
          opacityTo: 0,
          stops: [0, 90, 100]
        }
      },
      stroke: {
        curve: 'smooth',
        width: 7
      },
      title: {
        text: "Line Chart",
        align: "left"
      },
      xaxis: this.config.xaxis,
      yaxis: {
        labels: {
          formatter: function(value: number) {
            return '€' + value.toFixed(2);
          }
        }
      },
      tooltip: {
        y: {
          formatter: function(value: number) {
            return '€' + value.toFixed(2);
          }
        }
      }
    }
    this.loading = false;
  }

}
