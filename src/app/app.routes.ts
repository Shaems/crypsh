import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'cryptos',
    loadChildren: () => import('./modules/cryptos/cryptos.routes'),
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
];
