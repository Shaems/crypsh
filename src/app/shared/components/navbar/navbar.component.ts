import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Theme } from '../../services/theme/theme.service';

export interface INavbar {
  logo?: string;
  title: string;
  navs: ILink[];
  theme: Theme;
}

export interface ILink {
  name: string;
  link: string;
}

@Component({
  selector: 's-navbar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  @Input() navbar!: INavbar;
  @Output() toggleThemeEvent = new EventEmitter<void>();

  Theme = Theme;

  toggleTheme() {
    this.toggleThemeEvent.emit();
  }
}
