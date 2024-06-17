import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, interval, shareReplay, startWith, switchMap } from 'rxjs';
import { FindCrypto } from '../../models/find-crypto.model';
import { environment } from '../../../../environments/environment';
import { ROUTES } from '../../constants/routes.constant';
import { IRangeResponse } from '../../interfaces/range-response.interface';
import { ICoin } from '../../interfaces/coin.interface';

@Injectable({
  providedIn: 'root'
})
export class CryptoService {

  private refreshInterval = 6000;

  private _http = inject(HttpClient);

  getCryptoPrices(find: FindCrypto): Observable<ICoin[]> {
    return interval(this.refreshInterval).pipe(
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
      shareReplay(1)
    );
  }

  getCryptoMarketChart(id: string, from: number, to: number): Observable<IRangeResponse> {
    return this._http.get<IRangeResponse>(`${environment.api}${ROUTES.RANGE(id)}`, {
      params: {
        vs_currency: 'eur',
        from: from.toString(),
        to: to.toString(),
        x_cg_demo_api_key: 'CG-mf16kq5Rz3JE6zAe3mGncNrM'
      }
    });
  }
}

