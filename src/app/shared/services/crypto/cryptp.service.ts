import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, interval, shareReplay, startWith, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CryptoService {

  private baseUrl = 'https://api.coingecko.com/api/v3/';
  private refreshInterval = 600000; //6000

  private _http = inject(HttpClient);

  // getCryptoPrices(): Observable<any> {
  //   return this._http.get(`${this.baseUrl}/coins/markets`, {
  //     params: {
  //       vs_currency: 'usd',
  //       order: 'market_cap_desc',
  //       per_page: 10,
  //       page: 1,
  //       sparkline: 'false',
  //       x_cg_demo_api_key: 'CG-mf16kq5Rz3JE6zAe3mGncNrM'
  //     }
  //   });
  // }
  getCryptoPrices(): Observable<any> {
    return interval(this.refreshInterval).pipe(
      startWith(0),
      switchMap(() => this._http.get(`${this.baseUrl}/coins/markets`, {
        params: {
          vs_currency: 'eur',
          order: 'market_cap_desc',
          per_page: 10,
          page: 1,
          sparkline: 'false',
          x_cg_demo_api_key: 'CG-mf16kq5Rz3JE6zAe3mGncNrM'
        }
      })),
      shareReplay(1)
    );
  }

  getHistory(id: string = 'bitcoin') {
    return interval(this.refreshInterval).pipe(
      startWith(0),
      switchMap(() => this._http.get(`${this.baseUrl}/coins/${id}/history`, {
        params: {
          date: 'dd-mm-yyyy',
          // vs_currency: 'usd',
          // order: 'market_cap_desc',
          // per_page: 10,
          // page: 1,
          // sparkline: 'false',
          x_cg_demo_api_key: 'CG-mf16kq5Rz3JE6zAe3mGncNrM'
        }
      })),
      shareReplay(1)
    );
  }

  getCryptoMarketChart(id: string, from: number, to: number): Observable<any> {
    return this._http.get(`${this.baseUrl}/coins/${id}/market_chart/range`, {
      params: {
        vs_currency: 'eur',
        from: from.toString(),
        to: to.toString(),
        x_cg_demo_api_key: 'CG-mf16kq5Rz3JE6zAe3mGncNrM'
      }
    });
  }
}
