import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { Theme, ThemeService } from './shared/services/theme/theme.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavbarComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'crypsh';
  navbar = {
    title: 'Crypsh',
    navs: [
      { name: 'Cryptos', link: '/cryptos'},
      { name: 'Gráficos', link: '/cryptos/chart'},
    ],
    theme: Theme.LIGHT
  };
  themeSubscription!: Subscription;

  private _themeService = inject(ThemeService);

  ngOnInit() {
    this.themeSubscription = this._themeService.activeTheme$.subscribe(theme => {
      this.navbar.theme = theme as Theme;
      // console.log(theme)
      // document.documentElement.setAttribute('data-theme', theme);
    });
  }

  ngOnDestroy() {
    this.themeSubscription.unsubscribe();
  }

  toggleTheme() {
    this._themeService.toggleTheme();
  }
}
