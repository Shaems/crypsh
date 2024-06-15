import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

export interface ITab {
  selected?: boolean;
  title: string;
  id?: string;
}

@Component({
  selector: 's-tabs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tabs.component.html',
  styleUrl: './tabs.component.scss'
})
export class TabsComponent {

  @Input() tabs?: ITab[];
  @Output() tabEvent = new EventEmitter<ITab>();

  selectTab(tab: ITab) {
    if (tab.selected) return;
    this.tabs?.forEach(tab => (tab.selected = false));
    tab.selected = true;
    this.tabEvent.emit(tab);
  }
}
