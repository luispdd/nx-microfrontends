import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

@Component({
  selector: 'app-spinner',
  standalone: true,
  imports: [],
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
                <div class="w-6 h-6 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
                <span class="text-xs text-slate-400">24px</span>
              </div>
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 border-3 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
                <span class="text-xs text-slate-400">40px</span>
              </div>
              <div class="flex items-center gap-3">
                <div class="w-14 h-14 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
                <span class="text-xs text-slate-400">56px</span>
              </div>
            </div>
          </div>

          <!-- Section 2: Async Action Button -->
          <div class="space-y-3 pt-4 border-t border-slate-700/60">
            <h2 class="text-sm font-semibold text-slate-200">Button Integration</h2>
            <button
              type="button"
              (click)="triggerLoad()"
              [disabled]="isLoading()"
              class="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg text-sm transition disabled:opacity-75"
            >
              @if (isLoading()) {
                <div class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpinnerComponent {
  isLoading = signal(false);

  triggerLoad() {
    this.isLoading.set(true);
    setTimeout(() => this.isLoading.set(false), 1500);
  }
}
