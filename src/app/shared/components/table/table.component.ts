import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, TemplateRef, ViewEncapsulation } from '@angular/core';

export type OrdenByType = "asc" | "desc";

export interface ITableHeader {
  id?: string;
  title: string;
}

@Component({
  selector: 's-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class TableComponent {

  @Input() headerTemplate!: TemplateRef<any>;
  @Input() bodyTemplate!: TemplateRef<any>;
  @Input() headers!: ITableHeader[];
  @Output() ordenBy = new EventEmitter<string>();

  field!: string;
  ordenByType!: OrdenByType;

  onHeaderClick(field: string) {
    this.ordenByType = this.field === field && this.ordenByType === 'asc' ? 'desc' : 'asc';
    this.field = field;
    const order = `${this.field}_${this.ordenByType}`;
    console.log(order)
    this.ordenBy.emit(order);
  }
}