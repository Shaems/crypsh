import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { CryptoService } from '../../../../shared/services/crypto/cryptp.service';
import { CryptosComponent } from '../../components/cryptos/cryptos.component';
import { FindCrypto } from '../../../../shared/models/find-crypto.model';
import { ICoin } from '../../../../shared/interfaces/coin.interface';

@Component({
  selector: 's-cryptos-main',
  standalone: true,
  imports: [CommonModule, CryptosComponent],
  templateUrl: './cryptos-main.component.html',
  styleUrl: './cryptos-main.component.scss'
})
export class CryptosMainComponent {

  cryptos: ICoin[] = [];
  findCrypto = new FindCrypto;
  private subscription!: Subscription;

  private _cryptoService =  inject(CryptoService);

  ngOnInit(): void {
    this._cryptoPrices();
  }

  ordenBy(orderBy: string) {
    this.findCrypto.order = orderBy;
    this._cryptoPrices();
  }

  private _cryptoPrices(): void {
    this.subscription = this._cryptoService.getCryptoPrices(this.findCrypto).subscribe({
      next: (coins: ICoin[]) => {
        this.cryptos = coins;
      },
      error: (error) => console.error('Error fetching crypto prices', error)
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}

