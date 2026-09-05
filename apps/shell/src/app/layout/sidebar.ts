import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { RouterLink, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="w-64 h-full bg-slate-950 border-r border-slate-800 text-slate-300 flex flex-col">
      <div class="p-5 text-xl font-extrabold border-b border-slate-800 text-white flex items-center gap-2">
        <span class="text-indigo-400">⚡</span> NX Microfrontends
      </div>
      <nav class="flex-1 p-4 space-y-2">
        <a
          routerLink="/dashboard"
          [class]="activeMfe() === 'dashboard'
            ? 'flex items-center space-x-3 p-3 rounded-lg bg-slate-800 text-blue-400 font-semibold border-l-4 border-blue-500 transition-colors'
            : 'flex items-center space-x-3 p-3 rounded-lg hover:bg-slate-900 hover:text-white transition-colors'"
        >
          <span class="text-xl">📊</span>
          <span>Performance Dashboard</span>
        </a>

        <a
          routerLink="/material"
          [class]="activeMfe() === 'material'
            ? 'flex items-center space-x-3 p-3 rounded-lg bg-slate-800 text-indigo-400 font-semibold border-l-4 border-indigo-500 transition-colors'
            : 'flex items-center space-x-3 p-3 rounded-lg hover:bg-slate-900 hover:text-white transition-colors'"
        >
          <span class="text-xl">🎨</span>
          <span>Material MFE</span>
        </a>

        <a
          routerLink="/primeng"
          [class]="activeMfe() === 'primeng'
            ? 'flex items-center space-x-3 p-3 rounded-lg bg-slate-800 text-amber-400 font-semibold border-l-4 border-amber-500 transition-colors'
            : 'flex items-center space-x-3 p-3 rounded-lg hover:bg-slate-900 hover:text-white transition-colors'"
        >
          <span class="text-xl">🧩</span>
          <span>PrimeNG MFE</span>
        </a>

        <a
          routerLink="/native"
          [class]="activeMfe() === 'native'
            ? 'flex items-center space-x-3 p-3 rounded-lg bg-slate-800 text-emerald-400 font-semibold border-l-4 border-emerald-500 transition-colors'
            : 'flex items-center space-x-3 p-3 rounded-lg hover:bg-slate-900 hover:text-white transition-colors'"
        >
          <span class="text-xl">⚡</span>
          <span>Native MFE</span>
        </a>
      </nav>

      @if (currentSubpath()) {
        <div class="p-4 border-t border-slate-800/80 bg-slate-900/50">
          <div class="text-xs text-slate-400 font-medium mb-1">Active Component:</div>
          <div class="text-xs font-mono text-cyan-400 truncate bg-slate-950 px-2 py-1 rounded border border-slate-800">
            {{ currentSubpath() }}
          </div>
        </div>
      }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent {
  private router = inject(Router);
  activeMfe = signal<'dashboard' | 'material' | 'primeng' | 'native' | null>('dashboard');
  currentSubpath = signal<string>('');

  constructor() {
    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe(() => {
        this.updateState();
      });
    this.updateState();
  }

  private updateState() {
    const url = this.router.url.split('?')[0].split('#')[0];
    const segments = url.split('/').filter(Boolean);
    const first = segments[0] as 'dashboard' | 'material' | 'primeng' | 'native' | undefined;

    if (first && ['material', 'primeng', 'native', 'dashboard'].includes(first)) {
      this.activeMfe.set(first);
    } else {
      this.activeMfe.set('dashboard');
    }

    if (segments.length >= 2 && ['material', 'primeng', 'native'].includes(segments[0])) {
      this.currentSubpath.set(segments.slice(1).join('/'));
    } else {
      this.currentSubpath.set('');
    }
  }
}
