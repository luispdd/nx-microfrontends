import { RouterLink } from '@angular/router';
import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-progress-bar-showcase',
  standalone: true,
  imports: [CommonModule, MatProgressBarModule, MatButtonModule, RouterLink],
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
              <span class="font-mono text-indigo-400">{{ progressValue() }}%</span>
            </div>
            <mat-progress-bar mode="determinate" [value]="progressValue()" color="primary" class="rounded"></mat-progress-bar>
            <div class="flex gap-2 pt-2">
              <button mat-stroked-button (click)="dec()" class="!border-slate-700 !text-slate-200">-10%</button>
              <button mat-flat-button color="primary" (click)="inc()">+10%</button>
              <button mat-button (click)="reset()" class="!text-slate-400">Reset</button>
            </div>
          </div>

          <!-- Section 2: Indeterminate Progress -->
          <div class="space-y-3 pt-4 border-t border-slate-700/60">
            <div class="text-sm font-semibold text-slate-200">
              Indeterminate Progress (Loading State)
            </div>
            <mat-progress-bar mode="indeterminate" color="primary" class="rounded"></mat-progress-bar>
          </div>
        </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProgressBarShowcase {
  progressValue = signal(65);

  inc() { this.progressValue.update(v => Math.min(100, v + 10)); }
  dec() { this.progressValue.update(v => Math.max(0, v - 10)); }
  reset() { this.progressValue.set(65); }
}