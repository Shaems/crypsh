import { Component, Input, OnDestroy, OnInit, inject } from '@angular/core';
import { ILineChartConfig, LineChartComponent } from '../../components/line-chart/line-chart.component';
import { CryptoService } from '../../../../shared/services/crypto/cryptp.service';
import { CommonModule } from '@angular/common';
import { Subject, Subscription } from 'rxjs';
import { FindCrypto } from '../../../../shared/models/find-crypto.model';
import { ITab, TabsComponent } from '../../../../shared/components/tabs/tabs.component';
import { BreadcrumComponent, IBreadcrum } from '../../../../shared/components/breadcrum/breadcrum.component';
import { DateFilter } from '../../enums/date-filter';
import { ICoin } from '../../../../shared/interfaces/coin.interface';
import { IRangeResponse } from '../../../../shared/interfaces/range-response';

@Component({
  selector: 's-crypto-detail',
  standalone: true,
  imports: [LineChartComponent, CommonModule, TabsComponent, BreadcrumComponent],
  templateUrl: './crypto-detail.component.html',
  styleUrl: './crypto-detail.component.scss'
})
export class CryptoDetailComponent implements OnInit, OnDestroy {
  @Input('id') id!: string;
  configChart!: ILineChartConfig;
  findCrypto = new FindCrypto;
  crypto!: ICoin;
  tabsDate!: ITab[];
  isLoading!: boolean;
  breadcrum!: IBreadcrum[];
  private unsubscribe$ = new Subject<void>();

  private _cryptoService = inject(CryptoService);

  private _dateFilter = {
    [DateFilter.DAY]: this._getHistoryByDays,
    [DateFilter.WEEK]: this._getHistoryByDays,
    [DateFilter.MONTH]: this._getHistoryByDays,
  };

  ngOnInit(): void {
    this._initialConfig();
    this._getHistoryByDays(DateFilter.DAY);
    this._cryptoService.coin$.subscribe({
      next: (coins: ICoin[]) => {
        this.crypto = coins[0];
      },
      error: (error) => console.error('Error fetching crypto prices', error)
    });
    this._cryptoPrices();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  getChangeClass(change: number): string {
    return change > 0 ? 'text-success' : 'text-danger';
  }

  tabSelect(tab: ITab) {
    const date = Number(tab.id) as DateFilter;
    this._dateFilter[date].call(this, date);
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
    this._cryptoService.getCoin(this.findCrypto);
  }

  private _getHistory(from: number, to: number) {
    this.isLoading = true;
    this._cryptoService.getCryptoMarketChart(this.id, from, to).subscribe({
      next: (resp: IRangeResponse) => {
        this._configChart(resp);
      },
      error: (error) => console.error('Error history', error)
    });
  }

  private _configChart(resp: IRangeResponse) {
    const formattedDates = resp.prices.map((price: any) => this.convertTimestampToDateString(price[0]));
    this.configChart = {
      series: [
        {
          name: "Precio",
          data: resp.prices.map((price: any) => price[1])
        }
      ],
      xaxis: {
        categories: this.processDates(formattedDates),
        labels: {
          formatter: function (value: string) {
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
  }

  private _initialConfig() {
    this.tabsDate = [
      { title: '24h', id: DateFilter.DAY.toString(), selected: true },
      { title: '7d', id: DateFilter.WEEK.toString() },
      { title: '1m', id: DateFilter.MONTH.toString() }
    ];
    this.breadcrum = [
      { title: 'Criptomonedas', link: '/cryptos' },
      { title: `${this.id}` }
    ];
  }

  private _getHistoryByDays(days: number) {
    const from = Math.floor((new Date().getTime() - days * 24 * 60 * 60 * 1000) / 1000);
    const to = Math.floor(new Date().getTime() / 1000);
    this._getHistory(from, to);
  }

}
