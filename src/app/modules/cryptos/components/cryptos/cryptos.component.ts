import { Component, Input, ViewEncapsulation, inject } from '@angular/core';
import { TableComponent } from '../../../../shared/components/table/table.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 's-cryptos',
  standalone: true,
  imports: [TableComponent, CommonModule],
  templateUrl: './cryptos.component.html',
  styleUrl: './cryptos.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class CryptosComponent {

  @Input() cryptos!: any;
  headers = [ '#', '', 'Nombre', 'Precio (EUR)', 'Cambio 24h', 'Volumen 24h', 'Cap. Mercado'];

  private _router = inject(Router);

  getChangeClass(change: number): string {
    return change > 0 ? 'text-success' : 'text-danger';
  }

  goDetail(id: string) {
    this._router.navigate([`/cryptos/detail/${id}`]);
  }
}
