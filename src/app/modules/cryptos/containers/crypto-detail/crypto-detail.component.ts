import { Component, Input, OnInit, inject } from '@angular/core';
import { ILineChartConfig, LineChartComponent } from '../../components/line-chart/line-chart.component';
import { CryptoService } from '../../../../shared/services/crypto/cryptp.service';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { FindCrypto } from '../../../../shared/models/find-crypto.model';
import { ITab, TabsComponent } from '../../../../shared/components/tabs/tabs.component';
import { BreadcrumComponent, IBreadcrum } from '../../../../shared/components/breadcrum/breadcrum.component';

@Component({
  selector: 's-crypto-detail',
  standalone: true,
  imports: [LineChartComponent, CommonModule, TabsComponent, BreadcrumComponent],
  templateUrl: './crypto-detail.component.html',
  styleUrl: './crypto-detail.component.scss'
})
export class CryptoDetailComponent implements OnInit {
  @Input('id') id!: string;
  configChart!: ILineChartConfig;
  findCrypto = new FindCrypto;
  crypto!: any;
  tabsDate!: ITab[];
  isLoading!: boolean;
  breadcrum!: IBreadcrum[];
  private subscription!: Subscription;

  private _cryptoService = inject(CryptoService);

  private _dateFilter = {
    [DateFilter.DAY]: this._perDay,
    [DateFilter.WEEK]: this._perWeek,
    [DateFilter.MONTH]: this._perMonth,
  };

  ngOnInit(): void {
    this._initialConfig();
    this._perDay();
    this._cryptoPrices();
  }

  getChangeClass(change: number): string {
    return change > 0 ? 'text-success' : 'text-danger';
  }

  tabSelect(tab: ITab) {
    const date = tab.id as DateFilter;
    this._dateFilter[date].call(this);
  }

  getHistory(from: number, to: number) {
    this.isLoading = true;
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
        this.isLoading = false;
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

  private _cryptoPrices(): void {
    this.findCrypto.ids = this.id;
    this.subscription = this._cryptoService.getCryptoPrices(this.findCrypto).subscribe({
      next: (data) => {
        this.crypto = data[0];
      },
      error: (error) => console.error('Error fetching crypto prices', error)
    });
  }

  private _initialConfig() {
    this.tabsDate = [
      { title: '24h', id: DateFilter.DAY, selected: true },
      { title: '7d', id: DateFilter.WEEK },
      { title: '1m', id: DateFilter.MONTH }
    ];
    this.breadcrum = [
      { title: 'Criptomonedas', link: '/cryptos' },
      { title: `${this.id}` }
    ];
  }

  private _perDay() {
    const from = Math.floor((new Date().getTime() - 24 * 60 * 60 * 1000) / 1000);
    const to = Math.floor(new Date().getTime() / 1000);
    this.getHistory(from, to);
  }

  private _perWeek() {
    const from = Math.floor((new Date().getTime() - 7 * 24 * 60 * 60 * 1000) / 1000);
    const to = Math.floor(new Date().getTime() / 1000);
    this.getHistory(from, to);
  }

  private _perMonth() {
    const from = Math.floor((new Date().getTime() - 30 * 24 * 60 * 60 * 1000) / 1000);
    const to = Math.floor(new Date().getTime() / 1000);
    this.getHistory(from, to);
  }
}

export enum DateFilter {
  DAY = 'day',
  WEEK = 'week',
  MONTH = 'month'
}
