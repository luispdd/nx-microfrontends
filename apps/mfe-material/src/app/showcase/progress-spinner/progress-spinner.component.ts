import { RouterLink } from '@angular/router';
import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-progress-spinner-showcase',
  standalone: true,
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    RouterLink
  ],
  template: `
    <div class="p-6 max-w-4xl text-slate-100">
      <div class="mb-6">
        <h1 class="text-2xl font-bold text-white mb-1">ProgressSpinner</h1>
        <p class="text-sm text-slate-400">Circular animated loading indicators in multiple sizes with simulated async trigger.</p>
      </div>

      <div class="p-6 border border-slate-700 rounded-2xl bg-slate-800 shadow-lg text-slate-100">
        <div class="max-w-xl space-y-8">
          <!-- Section 1: Circular Spinners -->
          <div class="space-y-3">
            <h2 class="text-sm font-semibold text-slate-200">Indicator Sizes</h2>
            <div class="flex items-center gap-8 p-4 bg-slate-900 rounded-xl border border-slate-700/80">
              <div class="flex items-center gap-3">
                <mat-progress-spinner mode="indeterminate" diameter="24" strokeWidth="3" color="primary"></mat-progress-spinner>
                <span class="text-xs text-slate-400">24px</span>
              </div>
              <div class="flex items-center gap-3">
                <mat-progress-spinner mode="indeterminate" diameter="40" strokeWidth="4" color="primary"></mat-progress-spinner>
                <span class="text-xs text-slate-400">40px</span>
              </div>
              <div class="flex items-center gap-3">
                <mat-progress-spinner mode="indeterminate" diameter="56" strokeWidth="5" color="primary"></mat-progress-spinner>
                <span class="text-xs text-slate-400">56px</span>
              </div>
            </div>
          </div>

          <!-- Section 2: Async Action Button -->
          <div class="space-y-3 pt-4 border-t border-slate-700/60">
            <h2 class="text-sm font-semibold text-slate-200">Button Integration</h2>
            <button
              mat-flat-button
              color="primary"
              (click)="triggerLoad()"
              [disabled]="isLoading()"
              class="flex items-center gap-2"
            >
              @if (isLoading()) {
                <mat-progress-spinner mode="indeterminate" diameter="16" strokeWidth="2" class="inline-block"></mat-progress-spinner>
                <span>Processing...</span>
              } @else {
                <span>Simulate Async Action</span>
              }
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProgressSpinnerShowcase {
  isLoading = signal(false);

  triggerLoad() {
    this.isLoading.set(true);
    setTimeout(() => this.isLoading.set(false), 1500);
  }
}