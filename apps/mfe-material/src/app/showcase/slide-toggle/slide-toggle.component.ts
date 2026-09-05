import { RouterLink } from '@angular/router';
import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-slide-toggle-showcase',
  standalone: true,
  imports: [CommonModule, MatSlideToggleModule, FormsModule, RouterLink],
  template: `
    <div class="p-6 max-w-4xl text-slate-100">
      <div class="mb-6">
        <h1 class="text-2xl font-bold text-white mb-1">ToggleSwitch</h1>
        <p class="text-sm text-slate-400">Angular Material toggle switches for interactive boolean settings.</p>
      </div>

      <div class="p-6 border border-slate-700 rounded-2xl bg-slate-800 shadow-lg text-slate-100">
        <div class="space-y-4 max-w-lg">
          <!-- Switch 1 -->
          <div class="flex items-center justify-between p-4 rounded-xl border border-slate-700 bg-slate-900 shadow-sm hover:border-indigo-400 transition select-none">
            <div>
              <span class="text-sm font-semibold text-white block">Performance Metric Alerts</span>
              <span class="text-xs text-slate-400">Notify when LCP exceeds 2500ms</span>
            </div>
            <mat-slide-toggle
              [checked]="notifications()"
              (change)="notifications.set($event.checked)"
              color="primary"
              aria-label="Toggle performance alerts">
            </mat-slide-toggle>
          </div>

          <!-- Switch 2 -->
          <div class="flex items-center justify-between p-4 rounded-xl border border-slate-700 bg-slate-900 shadow-sm hover:border-indigo-400 transition select-none">
            <div>
              <span class="text-sm font-semibold text-white block">Real-time Web Vitals Stream</span>
              <span class="text-xs text-slate-400">BroadcastChannel metric synchronization</span>
            </div>
            <mat-slide-toggle
              [checked]="analytics()"
              (change)="analytics.set($event.checked)"
              color="primary"
              aria-label="Toggle web vitals stream">
            </mat-slide-toggle>
          </div>

          <div class="p-3 bg-slate-900 rounded-lg border border-slate-700 text-xs text-slate-300">
            Alerts: <strong class="text-indigo-400">{{ notifications() ? 'ON' : 'OFF' }}</strong> |
            Stream: <strong class="text-indigo-400">{{ analytics() ? 'ON' : 'OFF' }}</strong>
          </div>
        </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SlideToggleShowcase {
  notifications = signal(true);
  analytics = signal(true);
}