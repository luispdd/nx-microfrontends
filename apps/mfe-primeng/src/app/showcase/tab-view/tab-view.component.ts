import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabsModule } from 'primeng/tabs';

@Component({
  selector: 'app-tab-view-showcase',
  standalone: true,
  imports: [CommonModule, TabsModule],
  template: `
    <div class="p-6 max-w-4xl text-slate-100">
      <div class="mb-6">
        <h1 class="text-2xl font-bold text-white mb-1">Tabs</h1>
        <p class="text-sm text-slate-400">Tabbed content switcher with active indicator and responsive panels.</p>
      </div>

      <div class="p-6 border border-slate-700 rounded-2xl bg-slate-800 shadow-lg text-slate-100">
        <div class="max-w-2xl bg-slate-900 border border-slate-700 rounded-xl overflow-hidden p-4">
          <p-tabs value="0">
            <p-tablist>
              <p-tab value="0">Overview</p-tab>
              <p-tab value="1">Metrics</p-tab>
              <p-tab value="2">Configuration</p-tab>
            </p-tablist>
            <p-tabpanels>
              <p-tabpanel value="0">
                <div class="py-4 text-sm text-slate-300 leading-relaxed">
                  Demonstrates component library footprint and UI rendering efficiency in independent federation containers.
                </div>
              </p-tabpanel>
              <p-tabpanel value="1">
                <div class="py-4 text-sm text-slate-300 leading-relaxed">
                  Target thresholds: LCP &lt; 2.5s, CLS &lt; 0.1, FID &lt; 100ms on standard Chromium runtime.
                </div>
              </p-tabpanel>
              <p-tabpanel value="2">
                <div class="py-4 text-sm text-slate-300 leading-relaxed">
                  Build target: Bun 1.3.14 + Angular 22 standalone components with OnPush change detection.
                </div>
              </p-tabpanel>
            </p-tabpanels>
          </p-tabs>
        </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TabViewShowcaseComponent {}
