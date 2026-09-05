import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StepperModule } from 'primeng/stepper';
import { Button } from 'primeng/button';

@Component({
  selector: 'app-stepper-showcase',
  standalone: true,
  imports: [CommonModule, StepperModule, Button],
  template: `
    <div class="p-6 max-w-4xl text-slate-100">
      <div class="mb-6">
        <h1 class="text-2xl font-bold text-white mb-1">Stepper</h1>
        <p class="text-sm text-slate-400">Multi-step sequential workflow wizard with step indicators and navigation.</p>
      </div>

      <div class="p-6 border border-slate-700 rounded-2xl bg-slate-800 shadow-lg text-slate-100">
        <div class="max-w-xl">
          <p-stepper [value]="1">
            <p-step-list>
              <p-step [value]="1">Target Architecture</p-step>
              <p-step [value]="2">Benchmark Parameters</p-step>
              <p-step [value]="3">Review & Execution</p-step>
            </p-step-list>
            <p-step-panels>
              <p-step-panel [value]="1">
                <ng-template #content let-activateCallback="activateCallback">
                  <div class="py-4 space-y-3">
                    <h3 class="text-base font-semibold text-white">Step 1: Select Target Architecture</h3>
                    <p class="text-sm text-slate-300">Select target microfrontend to benchmark (Material, PrimeNG, Native).</p>
                    <div class="flex justify-end pt-2">
                      <p-button label="Next Step" (onClick)="activateCallback(2)" size="small" />
                    </div>
                  </div>
                </ng-template>
              </p-step-panel>

              <p-step-panel [value]="2">
                <ng-template #content let-activateCallback="activateCallback">
                  <div class="py-4 space-y-3">
                    <h3 class="text-base font-semibold text-white">Step 2: Configure Parameters</h3>
                    <p class="text-sm text-slate-300">Configure automated run with 5 sample iterations and 60s cache TTL.</p>
                    <div class="flex justify-between pt-2">
                      <p-button label="Back" (onClick)="activateCallback(1)" severity="secondary" size="small" />
                      <p-button label="Next Step" (onClick)="activateCallback(3)" size="small" />
                    </div>
                  </div>
                </ng-template>
              </p-step-panel>

              <p-step-panel [value]="3">
                <ng-template #content let-activateCallback="activateCallback">
                  <div class="py-4 space-y-3">
                    <h3 class="text-base font-semibold text-white">Step 3: Review & Execution</h3>
                    <p class="text-sm text-slate-300">Review configuration summary and execute automated telemetry pipeline.</p>
                    <div class="flex justify-between pt-2">
                      <p-button label="Back" (onClick)="activateCallback(2)" severity="secondary" size="small" />
                      <p-button label="Execute" size="small" />
                    </div>
                  </div>
                </ng-template>
              </p-step-panel>
            </p-step-panels>
          </p-stepper>
        </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StepperShowcaseComponent {}
