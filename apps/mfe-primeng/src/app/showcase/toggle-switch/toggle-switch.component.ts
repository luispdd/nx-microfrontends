import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToggleSwitch } from 'primeng/toggleswitch';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-toggle-switch-showcase',
  standalone: true,
  imports: [CommonModule, ToggleSwitch, FormsModule],
  template: `
    <div class="p-6 max-w-4xl text-slate-100">
      <div class="mb-6">
        <h1 class="text-2xl font-bold text-white mb-1">ToggleSwitch</h1>
        <p class="text-sm text-slate-400">PrimeNG toggle switches for interactive boolean settings.</p>
      </div>

      <div class="p-6 border border-slate-700 rounded-2xl bg-slate-800 shadow-lg text-slate-100">
        <div class="space-y-4 max-w-lg">
          <!-- Switch 1 -->
          <div class="flex items-center justify-between p-4 rounded-xl border border-slate-700 bg-slate-900 shadow-sm hover:border-amber-400 transition select-none">
            <div>
              <span class="text-sm font-semibold text-white block">Performance Metric Alerts</span>
              <span class="text-xs text-slate-400">Notify when LCP exceeds 2500ms</span>
            </div>
            <p-toggleswitch
              inputId="p-ts-notif"
              [ngModel]="notifications()"
              (ngModelChange)="notifications.set($event)"
            />
          </div>

          <!-- Switch 2 -->
          <div class="flex items-center justify-between p-4 rounded-xl border border-slate-700 bg-slate-900 shadow-sm hover:border-amber-400 transition select-none">
            <div>
              <span class="text-sm font-semibold text-white block">Real-time Web Vitals Stream</span>
              <span class="text-xs text-slate-400">BroadcastChannel metric synchronization</span>
            </div>
            <p-toggleswitch
              inputId="p-ts-analytics"
              [ngModel]="analytics()"
              (ngModelChange)="analytics.set($event)"
            />
          </div>

          <div class="p-3 bg-slate-900 rounded-lg border border-slate-700 text-xs text-slate-300">
            Alerts: <strong class="text-amber-400">{{ notifications() ? 'ON' : 'OFF' }}</strong> |
            Stream: <strong class="text-amber-400">{{ analytics() ? 'ON' : 'OFF' }}</strong>
          </div>
        </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToggleSwitchShowcaseComponent {
  notifications = signal(true);
  analytics = signal(true);
}
