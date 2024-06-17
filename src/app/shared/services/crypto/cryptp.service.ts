import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, interval, shareReplay, startWith, switchMap, tap } from 'rxjs';
import { FindCrypto } from '../../models/find-crypto.model';
import { environment } from '../../../../environments/environment';
import { ROUTES } from '../../constants/routes.constant';
import { ICoin } from '../../interfaces/coin.interface';
import { IRangeResponse } from '../../interfaces/range-response';

@Injectable({
  providedIn: 'root'
})
export class CryptoService {

  private refreshInterval = 6000;
  private coninsSubject = new BehaviorSubject<ICoin[]>([]);
  public coins$ = this.coninsSubject.asObservable();

  private coninSubject = new BehaviorSubject<ICoin[]>([]);
  public coin$ = this.coninSubject.asObservable();

  private rangeSubject = new BehaviorSubject<IRangeResponse>({
    prices: [],
    market_caps: [],
    total_volumes: [],
  });
  public range$ = this.rangeSubject.asObservable();

  private _http = inject(HttpClient);

  getCoin(find: FindCrypto): void {
    interval(this.refreshInterval).pipe(
      startWith(0),
      switchMap(() => this._http.get<ICoin[]>(`${environment.api}${ROUTES.MARKETS}`, {
        params: {
          vs_currency: find.vs_currency,
          ids: find.ids ?? '',
          order: find.order ?? '',
          per_page: find.per_page,
          page: find.page,
          precision: 'full',
          sparkline: 'false',
          x_cg_demo_api_key: 'CG-mf16kq5Rz3JE6zAe3mGncNrM'
        }
      })),
      tap((coins: ICoin[]) => this.coninSubject.next(coins)),
      shareReplay(1)
    ).subscribe();
  }

  getCoins(find: FindCrypto): void {
    interval(this.refreshInterval).pipe(
      startWith(0),
      switchMap(() => this._http.get<ICoin[]>(`${environment.api}${ROUTES.MARKETS}`, {
        params: {
          vs_currency: find.vs_currency,
          order: find.order ?? '',
          per_page: find.per_page,
          page: find.page,
          precision: 'full',
          sparkline: 'false',
          x_cg_demo_api_key: 'CG-mf16kq5Rz3JE6zAe3mGncNrM'
        }
      })),
      tap((coins: ICoin[]) => this.coninsSubject.next(coins)),
      shareReplay(1)
    ).subscribe();
  }

  getCryptoMarketChart(id: string, from: number, to: number): Observable<IRangeResponse> {
    return interval(this.refreshInterval).pipe(
      startWith(0),
      switchMap(() => this._http.get<IRangeResponse>(`${environment.api}${ROUTES.RANGE(id)}`, {
        params: {
          vs_currency: 'eur',
          from: from.toString(),
          to: to.toString(),
          x_cg_demo_api_key: 'CG-mf16kq5Rz3JE6zAe3mGncNrM'
        }
      })),
      shareReplay(1)
    );
  }

  getChart(id: string, from: number, to: number): void {
    interval(this.refreshInterval).pipe(
      startWith(0),
      switchMap(() => this._http.get<IRangeResponse>(`${environment.api}${ROUTES.RANGE(id)}`, {
        params: {
          vs_currency: 'eur',
          from: from.toString(),
          to: to.toString(),
          x_cg_demo_ao_api_key: 'CG-mf16kq5Rz3JE6zAe3mGncNrM'
        }
      })),
      tap((range: IRangeResponse) => this.rangeSubject.next(range)),
      shareReplay(1)
    ).subscribe();
  }
}
