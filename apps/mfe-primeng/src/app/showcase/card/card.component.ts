import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Card } from 'primeng/card';
import { Button } from 'primeng/button';

@Component({
  selector: 'app-card-showcase',
  standalone: true,
  imports: [CommonModule, Card, Button],
  template: `
    <div class="p-6 max-w-4xl text-slate-100">
      <div class="mb-6">
        <h1 class="text-2xl font-bold text-white mb-1">Card</h1>
        <p class="text-sm text-slate-400">Structured content containers with headers, statistics, and action footers.</p>
      </div>

      <div class="p-6 border border-slate-700 rounded-2xl bg-slate-800 shadow-lg text-slate-100">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Card 1 -->
          <p-card header="Microfrontend Architecture" subheader="Host & Remotes" [style]="{ 'background': '#0f172a', 'border': '1px solid #334155' }">
            <p class="text-sm text-slate-300">
              Native Federation dynamic manifest routing across independent deployment artifacts.
            </p>
            <div class="flex gap-2 mt-4">
              <span class="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-950 text-amber-300 border border-amber-700">Port 4200</span>
              <span class="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-950 text-emerald-300 border border-emerald-700">Healthy</span>
            </div>
            <ng-template #footer>
              <div class="flex gap-2 justify-end">
                <p-button label="Metrics" severity="secondary" size="small" />
                <p-button label="Manage Remote" size="small" />
              </div>
            </ng-template>
          </p-card>

          <!-- Card 2 -->
          <p-card header="Performance Telemetry" subheader="Core Web Vitals" [style]="{ 'background': '#0f172a', 'border': '1px solid #334155' }">
            <div class="space-y-3">
              <div class="grid grid-cols-2 gap-3">
                <div class="p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <div class="text-xs text-slate-400">LCP Score</div>
                  <div class="text-xl font-bold text-emerald-400">0.82 s</div>
                </div>
                <div class="p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <div class="text-xs text-slate-400">CLS Score</div>
                  <div class="text-xl font-bold text-emerald-400">0.001</div>
                </div>
              </div>
              <p class="text-xs text-slate-400">Continuous telemetry monitoring on Chromium engine.</p>
            </div>
            <ng-template #footer>
              <div class="flex justify-end">
                <p-button label="Run Audit" severity="secondary" size="small" />
              </div>
            </ng-template>
          </p-card>
        </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardShowcaseComponent {}
