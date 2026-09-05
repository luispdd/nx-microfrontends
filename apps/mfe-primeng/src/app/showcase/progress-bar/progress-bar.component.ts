import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgressBar } from 'primeng/progressbar';
import { Button } from 'primeng/button';

@Component({
  selector: 'app-progress-bar-showcase',
  standalone: true,
  imports: [CommonModule, ProgressBar, Button],
  template: `
    <div class="p-6 max-w-4xl text-slate-100">
      <div class="mb-6">
        <h1 class="text-2xl font-bold text-white mb-1">ProgressBar</h1>
        <p class="text-sm text-slate-400">Determinate progress bar with interactive controls and indeterminate loading state.</p>
      </div>

      <div class="p-6 border border-slate-700 rounded-2xl bg-slate-800 shadow-lg text-slate-100">
        <div class="max-w-xl space-y-6">
          <!-- Section 1: Determinate Progress -->
          <div class="space-y-3">
            <div class="flex justify-between items-center text-sm font-semibold text-slate-200">
              <span>Determinate Progress</span>
              <span class="font-mono text-amber-400">{{ progressValue() }}%</span>
            </div>
            <p-progressbar [value]="progressValue()" />
            <div class="flex gap-2 pt-2">
              <p-button (onClick)="dec()" label="-10%" severity="secondary" size="small" />
              <p-button (onClick)="inc()" label="+10%" size="small" />
              <p-button (onClick)="reset()" label="Reset" severity="secondary" [text]="true" size="small" />
            </div>
          </div>

          <!-- Section 2: Indeterminate Progress -->
          <div class="space-y-3 pt-4 border-t border-slate-700/60">
            <div class="text-sm font-semibold text-slate-200">
              Indeterminate Progress (Loading State)
            </div>
            <p-progressbar mode="indeterminate" [style]="{ height: '6px' }" />
          </div>
        </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProgressBarShowcaseComponent {
  progressValue = signal(65);

  inc() { this.progressValue.update(v => Math.min(100, v + 10)); }
  dec() { this.progressValue.update(v => Math.max(0, v - 10)); }
  reset() { this.progressValue.set(65); }
}
