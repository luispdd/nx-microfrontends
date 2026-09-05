import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgressSpinner } from 'primeng/progressspinner';
import { Button } from 'primeng/button';

@Component({
  selector: 'app-progress-spinner-showcase',
  standalone: true,
  imports: [CommonModule, ProgressSpinner, Button],
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
                <p-progress-spinner strokeWidth="3" [style]="{ width: '24px', height: '24px' }" />
                <span class="text-xs text-slate-400">24px</span>
              </div>
              <div class="flex items-center gap-3">
                <p-progress-spinner strokeWidth="4" [style]="{ width: '40px', height: '40px' }" />
                <span class="text-xs text-slate-400">40px</span>
              </div>
              <div class="flex items-center gap-3">
                <p-progress-spinner strokeWidth="5" [style]="{ width: '56px', height: '56px' }" />
                <span class="text-xs text-slate-400">56px</span>
              </div>
            </div>
          </div>

          <!-- Section 2: Async Action Button -->
          <div class="space-y-3 pt-4 border-t border-slate-700/60">
            <h2 class="text-sm font-semibold text-slate-200">Button Integration</h2>
            <p-button
              (onClick)="triggerLoad()"
              [loading]="isLoading()"
              [label]="isLoading() ? 'Processing...' : 'Simulate Async Action'"
              size="small"
            />
          </div>
        </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProgressSpinnerShowcaseComponent {
  isLoading = signal(false);

  triggerLoad() {
    this.isLoading.set(true);
    setTimeout(() => this.isLoading.set(false), 1500);
  }
}
