import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./containers/cryptos-main/cryptos-main.component').then((c) => c.CryptosMainComponent),
  },
  {
    path: 'detail/:id',
    loadComponent: () => import('./containers/crypto-detail/crypto-detail.component').then((c) => c.CryptoDetailComponent),
  }
];

export default routes;