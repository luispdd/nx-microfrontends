import { RouterLink } from '@angular/router';
import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-stepper-showcase',
  standalone: true,
  imports: [
    CommonModule,
    MatStepperModule,
    MatButtonModule,
    RouterLink
  ],
  template: `
    <div class="p-6 max-w-4xl text-slate-100">
      <div class="mb-6">
        <h1 class="text-2xl font-bold text-white mb-1">Stepper</h1>
        <p class="text-sm text-slate-400">Multi-step sequential workflow wizard with step indicators and navigation.</p>
      </div>

      <div class="p-6 border border-slate-700 rounded-2xl bg-slate-800 shadow-lg text-slate-100">
        <div class="max-w-xl">
          <mat-stepper [linear]="false" class="!bg-slate-900 rounded-xl border border-slate-700 p-4">
            <!-- Step 1 -->
            <mat-step>
              <ng-template matStepLabel>Target Architecture</ng-template>
              <div class="py-4 space-y-3">
                <h3 class="text-base font-semibold text-white">Step 1: Select Target Architecture</h3>
                <p class="text-sm text-slate-300">Select target microfrontend to benchmark (Material, PrimeNG, Native).</p>
                <div class="flex justify-end pt-2">
                  <button mat-flat-button color="primary" matStepperNext>Next Step</button>
                </div>
              </div>
            </mat-step>

            <!-- Step 2 -->
            <mat-step>
              <ng-template matStepLabel>Benchmark Parameters</ng-template>
              <div class="py-4 space-y-3">
                <h3 class="text-base font-semibold text-white">Step 2: Configure Parameters</h3>
                <p class="text-sm text-slate-300">Configure automated run with 5 sample iterations and 60s cache TTL.</p>
                <div class="flex justify-between pt-2">
                  <button mat-button matStepperPrevious class="!text-slate-400">Back</button>
                  <button mat-flat-button color="primary" matStepperNext>Next Step</button>
                </div>
              </div>
            </mat-step>

            <!-- Step 3 -->
            <mat-step>
              <ng-template matStepLabel>Review & Execution</ng-template>
              <div class="py-4 space-y-3">
                <h3 class="text-base font-semibold text-white">Step 3: Review & Execution</h3>
                <p class="text-sm text-slate-300">Review configuration summary and execute automated telemetry pipeline.</p>
                <div class="flex justify-between pt-2">
                  <button mat-button matStepperPrevious class="!text-slate-400">Back</button>
                  <button mat-flat-button color="primary">Execute</button>
                </div>
              </div>
            </mat-step>
          </mat-stepper>
        </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StepperShowcase {}