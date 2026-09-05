import { RouterLink } from '@angular/router';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card-showcase',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatDividerModule,
    RouterLink
  ],
  template: `
    <div class="p-6 max-w-4xl text-slate-100">
      <div class="mb-6">
        <h1 class="text-2xl font-bold text-white mb-1">Card</h1>
        <p class="text-sm text-slate-400">Structured content containers with headers, statistics, and action footers.</p>
      </div>

      <div class="p-6 border border-slate-700 rounded-2xl bg-slate-800 shadow-lg text-slate-100">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Card 1 -->
          <mat-card appearance="outlined" class="!bg-slate-900 !border-slate-700 !text-slate-100 rounded-2xl overflow-hidden flex flex-col justify-between">
            <mat-card-header class="p-4 pb-2">
              <mat-card-title class="!text-lg !font-bold !text-white">Microfrontend Architecture</mat-card-title>
              <mat-card-subtitle class="!text-xs !text-indigo-400">Host & Remotes</mat-card-subtitle>
            </mat-card-header>

            <mat-card-content class="p-4 !text-sm !text-slate-300">
              <p>Native Federation dynamic manifest routing across independent deployment artifacts.</p>
              <div class="flex gap-2 mt-4">
                <span class="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-950 text-indigo-300 border border-indigo-700">Port 4200</span>
                <span class="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-950 text-emerald-300 border border-emerald-700">Healthy</span>
              </div>
            </mat-card-content>

            <div>
              <mat-divider class="!border-slate-700"></mat-divider>
              <mat-card-actions class="p-3 flex justify-end gap-2 bg-slate-900/80">
                <button mat-button class="!text-slate-400 hover:!text-white">Metrics</button>
                <button mat-flat-button color="primary">Manage Remote</button>
              </mat-card-actions>
            </div>
          </mat-card>

          <!-- Card 2 -->
          <mat-card appearance="outlined" class="!bg-slate-900 !border-slate-700 !text-slate-100 rounded-2xl overflow-hidden flex flex-col justify-between">
            <mat-card-header class="p-4 pb-2">
              <mat-card-title class="!text-lg !font-bold !text-white">Performance Telemetry</mat-card-title>
              <mat-card-subtitle class="!text-xs !text-indigo-400">Core Web Vitals</mat-card-subtitle>
            </mat-card-header>

            <mat-card-content class="p-4 !text-sm !text-slate-300 space-y-3">
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
            </mat-card-content>

            <div>
              <mat-divider class="!border-slate-700"></mat-divider>
              <mat-card-actions class="p-3 flex justify-end gap-2 bg-slate-900/80">
                <button mat-stroked-button color="primary">Run Audit</button>
              </mat-card-actions>
            </div>
          </mat-card>
        </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardShowcase {}