import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export enum Theme {
  LIGHT = 'light',
  DARK = 'dark'
}
@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private activeTheme = new BehaviorSubject<string>(Theme.LIGHT);
  public readonly activeTheme$ = this.activeTheme.asObservable();

  toggleTheme() {
    const theme = this.activeTheme.value === Theme.LIGHT ? Theme.DARK : Theme.LIGHT;
    this.activeTheme.next(theme);
    this.setTheme();
  }

  setTheme() {
    document.documentElement.setAttribute('data-theme', this.activeTheme.value);
  }

}
