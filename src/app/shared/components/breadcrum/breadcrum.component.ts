import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

export interface IBreadcrum {
  title?: string;
  link?: string;
}

@Component({
  selector: 's-breadcrum',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './breadcrum.component.html',
  styleUrl: './breadcrum.component.scss'
})
export class BreadcrumComponent {

  @Input() config!: IBreadcrum[];
}
