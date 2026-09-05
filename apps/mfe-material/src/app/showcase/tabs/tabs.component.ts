import { RouterLink } from '@angular/router';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tabs-showcase',
  standalone: true,
  imports: [CommonModule, MatTabsModule, RouterLink],
  template: `
    <div class="p-6 max-w-4xl text-slate-100">
      <div class="mb-6">
        <h1 class="text-2xl font-bold text-white mb-1">Tabs</h1>
        <p class="text-sm text-slate-400">Tabbed content switcher with active indicator and responsive panels.</p>
      </div>

      <div class="p-6 border border-slate-700 rounded-2xl bg-slate-800 shadow-lg text-slate-100">
        <div class="max-w-2xl bg-slate-900 border border-slate-700 rounded-xl overflow-hidden p-2">
          <mat-tab-group class="text-slate-100">
            <mat-tab label="Overview">
              <div class="p-6 text-sm text-slate-300 leading-relaxed">
                Demonstrates component library footprint and UI rendering efficiency in independent federation containers.
              </div>
            </mat-tab>
            <mat-tab label="Metrics">
              <div class="p-6 text-sm text-slate-300 leading-relaxed">
                Target thresholds: LCP &lt; 2.5s, CLS &lt; 0.1, FID &lt; 100ms on standard Chromium runtime.
              </div>
            </mat-tab>
            <mat-tab label="Configuration">
              <div class="p-6 text-sm text-slate-300 leading-relaxed">
                Build target: Bun 1.3.14 + Angular 22 standalone components with OnPush change detection.
              </div>
            </mat-tab>
          </mat-tab-group>
        </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TabsShowcase {}