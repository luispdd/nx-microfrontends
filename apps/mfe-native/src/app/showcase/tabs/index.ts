import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

@Component({
  selector: 'app-tabs',
  standalone: true,
  imports: [],
  template: `
    <div class="p-6 max-w-4xl text-slate-100">
      <div class="mb-6">
        <h1 class="text-2xl font-bold text-white mb-1">Tabs</h1>
        <p class="text-sm text-slate-400">Tabbed content switcher with active indicator and responsive panels.</p>
      </div>

      <div class="p-6 border border-slate-700 rounded-2xl bg-slate-800 shadow-lg text-slate-100">
        <div class="max-w-2xl bg-slate-900 border border-slate-700 rounded-xl overflow-hidden p-4">
          <div class="border-b border-slate-700 flex space-x-6">
            <button
              type="button"
              (click)="setTab('overview')"
              [class.border-emerald-500]="activeTab() === 'overview'"
              [class.text-emerald-400]="activeTab() === 'overview'"
              [class.border-transparent]="activeTab() !== 'overview'"
              [class.text-slate-400]="activeTab() !== 'overview'"
              class="py-3 px-2 border-b-2 font-semibold text-sm transition"
            >Overview</button>
            <button
              type="button"
              (click)="setTab('metrics')"
              [class.border-emerald-500]="activeTab() === 'metrics'"
              [class.text-emerald-400]="activeTab() === 'metrics'"
              [class.border-transparent]="activeTab() !== 'metrics'"
              [class.text-slate-400]="activeTab() !== 'metrics'"
              class="py-3 px-2 border-b-2 font-semibold text-sm transition"
            >Metrics</button>
            <button
              type="button"
              (click)="setTab('config')"
              [class.border-emerald-500]="activeTab() === 'config'"
              [class.text-emerald-400]="activeTab() === 'config'"
              [class.border-transparent]="activeTab() !== 'config'"
              [class.text-slate-400]="activeTab() !== 'config'"
              class="py-3 px-2 border-b-2 font-semibold text-sm transition"
            >Configuration</button>
          </div>

          <div class="py-4 text-sm text-slate-300 leading-relaxed">
            @if (activeTab() === 'overview') {
              <div>
                Demonstrates component library footprint and UI rendering efficiency in independent federation containers.
              </div>
            } @else if (activeTab() === 'metrics') {
              <div>
                Target thresholds: LCP &lt; 2.5s, CLS &lt; 0.1, FID &lt; 100ms on standard Chromium runtime.
              </div>
            } @else {
              <div>
                Build target: Bun 1.3.14 + Angular 22 standalone components with OnPush change detection.
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabsComponent {
  activeTab = signal<'overview' | 'metrics' | 'config'>('overview');

  setTab(tab: 'overview' | 'metrics' | 'config') {
    this.activeTab.set(tab);
  }
}
