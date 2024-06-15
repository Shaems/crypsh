import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { CryptoService } from '../../../../shared/services/crypto/cryptp.service';
import { CryptosComponent } from '../../components/cryptos/cryptos.component';
import { FindCrypto } from '../../../../shared/models/find-crypto.model';

@Component({
  selector: 's-cryptos-main',
  standalone: true,
  imports: [CommonModule, CryptosComponent],
  templateUrl: './cryptos-main.component.html',
  styleUrl: './cryptos-main.component.scss'
})
export class CryptosMainComponent {

  cryptos: any[] = [];
  findCrypto = new FindCrypto;
  private subscription!: Subscription;

  private _cryptoService =  inject(CryptoService);

  ngOnInit(): void {
    this._cryptoPrices();
    console.log(this.findCrypto)
    // this.cryptos = [
    //   { market_cap_rank: 1, name: 'Bitcoin', current_price: 7079100 , market_cap: 1393888887205 },
    //   { market_cap_rank: 2, name: 'Ethereum', current_price: 378033, market_cap: 454138693271 },
    //   { market_cap_rank: 3, name: 'Tether', current_price: 100, market_cap: 112337267262 },
    //   { market_cap_rank: 4, name: 'BNB', current_price: 69630, market_cap: 107159718946 },
    //   { market_cap_rank: 5, name: 'Solana', current_price: 16898, market_cap: 77863771534 },
    //   { market_cap_rank: 6, name: 'Lido Staked Ether', current_price: 377836, market_cap: 35967992536 },
    //   { market_cap_rank: 7, name: 'USDC', current_price: 100, market_cap: 32368695208 },
    //   { market_cap_rank: 8, name: 'XRP', current_price: 0.52, market_cap: 28939790423 },
    //   { market_cap_rank: 9, name: 'Dogecoin', current_price: 0.16, market_cap: 22998767872 },
    //   { market_cap_rank: 10, name: 'Toncoin', current_price: 7.52, market_cap: 18283729018 }
    // ];
  }

  ordenBy(orderBy: string) {
    this.findCrypto.order = orderBy;
    this._cryptoPrices();
  }

  private _cryptoPrices(): void {
    this.subscription = this._cryptoService.getCryptoPrices(this.findCrypto).subscribe({
      next: (data) => {
        this.cryptos = data;
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

