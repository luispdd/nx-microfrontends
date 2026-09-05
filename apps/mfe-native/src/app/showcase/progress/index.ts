import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

@Component({
  selector: 'app-progress',
  standalone: true,
  imports: [],
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
              <span class="font-mono text-emerald-400">{{ progressValue() }}%</span>
            </div>
            <progress
              class="w-full h-3 rounded-full overflow-hidden accent-emerald-600 bg-slate-900"
              [value]="progressValue()"
              max="100"
            ></progress>
            <div class="flex gap-2 pt-2">
              <button
                type="button"
                (click)="dec()"
                class="px-3 py-1.5 border border-slate-700 rounded-lg text-xs font-bold hover:bg-slate-900/60 text-slate-200 transition"
              >-10%</button>
              <button
                type="button"
                (click)="inc()"
                class="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition"
              >+10%</button>
              <button
                type="button"
                (click)="reset()"
                class="px-3 py-1.5 text-xs text-slate-400 hover:text-white transition"
              >Reset</button>
            </div>
          </div>

          <!-- Section 2: Indeterminate Progress -->
          <div class="space-y-3 pt-4 border-t border-slate-700/60">
            <div class="text-sm font-semibold text-slate-200">
              Indeterminate Progress (Loading State)
            </div>
            <div class="w-full bg-slate-900 rounded-full h-2.5 overflow-hidden">
              <div class="bg-emerald-500 h-full rounded-full w-1/3 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProgressComponent {
  progressValue = signal(65);

  inc() { this.progressValue.update(v => Math.min(100, v + 10)); }
  dec() { this.progressValue.update(v => Math.max(0, v - 10)); }
  reset() { this.progressValue.set(65); }
}
