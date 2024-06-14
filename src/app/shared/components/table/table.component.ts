import { CommonModule } from '@angular/common';
import { Component, Input, TemplateRef, ViewEncapsulation } from '@angular/core';

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
  @Input() headers!: string[];

}