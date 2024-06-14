import { Component, Input, OnInit, inject } from '@angular/core';
import { ILineChartConfig, LineChartComponent } from '../../components/line-chart/line-chart.component';
import { CryptoService } from '../../../../shared/services/crypto/cryptp.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 's-crypto-detail',
  standalone: true,
  imports: [LineChartComponent, CommonModule],
  templateUrl: './crypto-detail.component.html',
  styleUrl: './crypto-detail.component.scss'
})
export class CryptoDetailComponent implements OnInit {
  @Input('id') id!: string;
  configChart!: ILineChartConfig;

  private _cryptoService = inject(CryptoService);

  ngOnInit(): void {
    this.getHistory();
  }

  getHistory() {
    const from = Math.floor((new Date().getTime() - 7 * 24 * 60 * 60 * 1000) / 1000); // 7 days ago
    const to = Math.floor(new Date().getTime() / 1000); // current time
    this._cryptoService.getCryptoMarketChart(this.id, from, to).subscribe({
      next: (data) => {
        const formattedDates = data.prices.map((price: any) => this.convertTimestampToDateString(price[0]));
        this.configChart = {
          series: [
            {
              name: "Precio",
              data: data.prices.map((price: any) => price[1])
            }
          ],
          xaxis: {
            categories: this.processDates(formattedDates),
            labels: {
              formatter: function(value: string) {
                const date = new Date(value);
                if (!isNaN(date.getTime())) {
                  const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short' };
                  return new Intl.DateTimeFormat('en-GB', options).format(date);
                }
                return '';
              }
            },
            type: 'datatime',
          }
        }
      },
      error: (error) => console.error('Error history', error)
    });
  }

  convertTimestampToDateString(timestamp: number): string {
    const date = new Date(timestamp);
    const day = date.getDate().toString().padStart(2, '0');
    const month = date.toLocaleString('default', { month: 'short' });
    return `${day} ${month}`;
  }

  processDates(dates: string[]): string[] {
    let lastDate = '';
    return dates.map(date => {
      if (date === lastDate) {
        return '';
      } else {
        lastDate = date;
        return date;
      }
    });
  }
}
