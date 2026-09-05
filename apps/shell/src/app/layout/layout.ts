import { Component, ChangeDetectionStrategy, inject, signal, computed } from '@angular/core';
import { RouterOutlet, RouterLink, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { SidebarComponent } from './sidebar';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, SidebarComponent],
  template: `
    <div class="flex h-screen w-full overflow-hidden bg-slate-900 text-slate-100">
      <app-sidebar></app-sidebar>
      <main class="flex-1 overflow-auto p-6 bg-slate-900 flex flex-col">
        @if (isInnerPage()) {
          <header class="mb-5 flex flex-wrap items-center justify-between gap-3 bg-slate-950/80 border border-slate-800 backdrop-blur px-5 py-3 rounded-xl shadow-lg shrink-0">
            <div class="flex items-center gap-3">
              <a
                [routerLink]="libraryOverviewLink()"
                class="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-semibold rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 hover:border-slate-600 transition-colors shadow-sm"
              >
                <span>&larr;</span>
                <span>Back to {{ libraryName() }} Overview</span>
              </a>
              <span class="text-slate-700">|</span>
              <span class="text-xs text-slate-400">
                Viewing: <span class="text-indigo-300 font-mono font-semibold">{{ currentSubpath() }}</span>
              </span>
            </div>

            <!-- Cross-Library Comparison Quick-Switch Bar -->
            <div class="flex items-center gap-2">
              <span class="text-xs text-slate-400 font-medium">Compare with:</span>
              <a
                [routerLink]="'/material/' + currentSubpath()"
                [class]="activeMfe() === 'material'
                  ? 'px-3 py-1 text-xs font-semibold rounded-lg bg-indigo-950 text-indigo-300 border border-indigo-500/60 shadow-sm'
                  : 'px-3 py-1 text-xs font-medium rounded-lg bg-slate-800/90 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-700 transition-colors'"
              >
                🎨 Material
              </a>
              <a
                [routerLink]="'/primeng/' + currentSubpath()"
                [class]="activeMfe() === 'primeng'
                  ? 'px-3 py-1 text-xs font-semibold rounded-lg bg-amber-950 text-amber-300 border border-amber-500/60 shadow-sm'
                  : 'px-3 py-1 text-xs font-medium rounded-lg bg-slate-800/90 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-700 transition-colors'"
              >
                🧩 PrimeNG
              </a>
              <a
                [routerLink]="'/native/' + currentSubpath()"
                [class]="activeMfe() === 'native'
                  ? 'px-3 py-1 text-xs font-semibold rounded-lg bg-emerald-950 text-emerald-300 border border-emerald-500/60 shadow-sm'
                  : 'px-3 py-1 text-xs font-medium rounded-lg bg-slate-800/90 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-700 transition-colors'"
              >
                ⚡ Native HTML
              </a>
            </div>
          </header>
        }
        <div class="flex-1">
          <router-outlet></router-outlet>
        </div>
      </main>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutComponent {
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

  isInnerPage = computed(() => !!this.currentSubpath() && this.activeMfe() !== 'dashboard');
  libraryOverviewLink = computed(() => `/${this.activeMfe() || 'dashboard'}`);
  libraryName = computed(() => {
    switch (this.activeMfe()) {
      case 'material': return 'Material';
      case 'primeng': return 'PrimeNG';
      case 'native': return 'Native HTML';
      default: return 'Library';
    }
  });
}

