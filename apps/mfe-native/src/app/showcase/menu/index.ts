import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [],
  template: `
    <div class="p-6 max-w-4xl text-slate-100">
      <div class="mb-6">
        <h1 class="text-2xl font-bold text-white mb-1">Menu</h1>
        <p class="text-sm text-slate-400">Native HTML vertical navigation menu with sections, badges, and active states.</p>
      </div>

      <div class="p-6 border border-slate-700 rounded-2xl bg-slate-800 shadow-lg text-slate-100">
        <div class="w-64 bg-slate-900 border border-slate-700 rounded-2xl p-4 shadow-sm space-y-1">
          @for (item of items; track item.id) {
            <button
              type="button"
              (click)="select(item.id)"
              [class.bg-emerald-950]="activeItem() === item.id"
              [class.text-emerald-400]="activeItem() === item.id"
              [class.font-bold]="activeItem() === item.id"
              [class.text-slate-200]="activeItem() !== item.id"
              class="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm transition hover:bg-slate-800 cursor-pointer"
            >
              <span>{{ item.label }}</span>
              @if (item.badge) {
                <span class="text-xs px-2 py-0.5 rounded-full bg-emerald-900 border border-emerald-700 text-emerald-200 font-mono">{{ item.badge }}</span>
              }
            </button>
          }
        </div>

        <div class="mt-4 p-3 bg-slate-900 rounded-xl border border-slate-700 text-xs text-slate-400">
          Active Item: <strong class="text-emerald-400 font-mono">{{ activeItem() }}</strong>
        </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuComponent {
  activeItem = signal('dash');

  items = [
    { id: 'dash', label: 'Dashboard', badge: '' },
    { id: 'perf', label: 'Web Vitals', badge: 'Live' },
    { id: 'suites', label: 'Playwright Tests', badge: '12' },
    { id: 'settings', label: 'Settings', badge: '' }
  ];

  select(id: string) {
    this.activeItem.set(id);
  }
}
