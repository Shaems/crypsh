import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { CryptoService } from '../../../../shared/services/crypto/cryptp.service';
import { CryptosComponent } from '../../components/cryptos/cryptos.component';
import { FindCrypto } from '../../../../shared/models/find-crypto.model';
import { ICoin } from '../../../../shared/interfaces/coin.interface';
import { Subject } from 'rxjs';

@Component({
  selector: 's-cryptos-main',
  standalone: true,
  imports: [CommonModule, CryptosComponent],
  templateUrl: './cryptos-main.component.html',
  styleUrl: './cryptos-main.component.scss'
})
export class CryptosMainComponent implements OnInit, OnDestroy {

  cryptos: ICoin[] = [];
  findCrypto = new FindCrypto;
  private unsubscribe$ = new Subject<void>();

  private _cryptoService =  inject(CryptoService);

  ngOnInit(): void {
    this._cryptoService.coins$.subscribe({
      next: (coins: ICoin[]) => {
        this.cryptos = coins;
      },
      error: (error) => console.error('Error fetching crypto prices', error)
    });
    this._getCoins();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  ordenBy(orderBy: string) {
    this.findCrypto.order = orderBy;
    this._getCoins();
  }

  private _getCoins(): void {
    this._cryptoService.getCoins(this.findCrypto);
  }
}

