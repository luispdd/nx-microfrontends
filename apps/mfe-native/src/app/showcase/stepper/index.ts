import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

@Component({
  selector: 'app-stepper',
  standalone: true,
  imports: [],
  template: `
    <div class="p-6 max-w-4xl text-slate-100">
      <div class="mb-6">
        <h1 class="text-2xl font-bold text-white mb-1">Stepper</h1>
        <p class="text-sm text-slate-400">Multi-step sequential workflow wizard with step indicators and navigation.</p>
      </div>

      <div class="p-6 border border-slate-700 rounded-2xl bg-slate-800 shadow-lg text-slate-100">
        <div class="max-w-xl space-y-6">
          <!-- Step Headers -->
          <div class="flex items-center justify-between">
            @for (step of [
              { num: 1, label: 'Target Architecture' },
              { num: 2, label: 'Benchmark Parameters' },
              { num: 3, label: 'Review & Execution' }
            ]; track step.num) {
              <div class="flex items-center gap-2">
                <div
                  [class.bg-emerald-600]="currentStep() >= step.num"
                  [class.text-white]="currentStep() >= step.num"
                  [class.bg-slate-900]="currentStep() < step.num"
                  [class.text-slate-400]="currentStep() < step.num"
                  class="w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs border border-slate-700 transition"
                >{{ step.num }}</div>
                <span class="text-xs font-semibold text-slate-200 hidden sm:inline">{{ step.label }}</span>
              </div>
              @if (step.num < 3) {
                <div class="flex-grow mx-2 h-0.5" [class.bg-emerald-600]="currentStep() > step.num" [class.bg-slate-700]="currentStep() <= step.num"></div>
              }
            }
          </div>

          <!-- Step Content -->
          <div class="p-6 bg-slate-900 border border-slate-700 rounded-xl shadow-sm text-sm">
            @if (currentStep() === 1) {
              <div class="space-y-2">
                <h3 class="text-base font-semibold text-white">Step 1: Select Target Architecture</h3>
                <p class="text-sm text-slate-300">Select target microfrontend to benchmark (Material, PrimeNG, Native).</p>
              </div>
            } @else if (currentStep() === 2) {
              <div class="space-y-2">
                <h3 class="text-base font-semibold text-white">Step 2: Configure Parameters</h3>
                <p class="text-sm text-slate-300">Configure automated run with 5 sample iterations and 60s cache TTL.</p>
              </div>
            } @else {
              <div class="space-y-2">
                <h3 class="text-base font-semibold text-white">Step 3: Review & Execution</h3>
                <p class="text-sm text-slate-300">Review configuration summary and execute automated telemetry pipeline.</p>
              </div>
            }
          </div>

          <!-- Actions -->
          <div class="flex justify-between">
            <button
              type="button"
              (click)="prev()"
              [disabled]="currentStep() === 1"
              class="px-4 py-2 border border-slate-700 rounded-lg text-sm font-semibold disabled:opacity-40 hover:bg-slate-900/60 text-slate-200 transition"
            >Back</button>
            <button
              type="button"
              (click)="next()"
              class="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm font-semibold transition"
            >{{ currentStep() === 3 ? 'Execute' : 'Next Step' }}</button>
          </div>
        </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StepperComponent {
  currentStep = signal(1);

  next() { this.currentStep.update(s => Math.min(3, s + 1)); }
  prev() { this.currentStep.update(s => Math.max(1, s - 1)); }
}
