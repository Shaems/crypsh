import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

export interface INavbar {
  logo?: string;
  title: string;
  navs: ILink[];
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
}
