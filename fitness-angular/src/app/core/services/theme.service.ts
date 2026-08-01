import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly STORAGE_KEY = 'fitness_dark_mode';
  private _isDark$ = new BehaviorSubject<boolean>(this.getStoredPreference());

  readonly isDark$ = this._isDark$.asObservable();

  get isDark(): boolean {
    return this._isDark$.value;
  }

  constructor() {
    this.applyTheme(this._isDark$.value);
  }

  toggle(): void {
    const next = !this._isDark$.value;
    this._isDark$.next(next);
    try {
      localStorage.setItem(this.STORAGE_KEY, String(next));
    } catch {
      // localStorage may not be available in all environments
    }
    this.applyTheme(next);
  }

  private getStoredPreference(): boolean {
    try {
      return localStorage.getItem(this.STORAGE_KEY) === 'true';
    } catch {
      return false;
    }
  }

  private applyTheme(dark: boolean): void {
    document.body.classList.toggle('dark-theme', dark);
  }
}
