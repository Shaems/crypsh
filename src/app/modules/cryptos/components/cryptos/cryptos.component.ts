import { Component, EventEmitter, Input, Output, ViewEncapsulation, inject } from '@angular/core';
import { ITableHeader, TableComponent } from '../../../../shared/components/table/table.component';
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
  @Output() ordenByEvent = new EventEmitter<string>();

  headers: ITableHeader[] = [
    { title: '#' },
    { title: 'Nombre' },
    { title: 'Precio' },
    { title: 'Cambio 24h' },
    { title: 'Volumen 24h' },
    { title: 'Cap. Mercado', id: 'market_cap' }
  ];

  private _router = inject(Router);

  getChangeClass(change: number): string {
    return change > 0 ? 'text-success' : 'text-danger';
  }

  ordenBy(orderBy: string) {
    this.ordenByEvent.emit(orderBy);
  }

  goDetail(id: string) {
    this._router.navigate([`/cryptos/detail/${id}`]);
  }
}
