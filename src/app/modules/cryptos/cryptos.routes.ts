import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./containers/cryptos/cryptos.component').then((c) => c.CryptosComponent),
  },
];

export default routes;