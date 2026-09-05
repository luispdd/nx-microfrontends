import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

@Component({
  selector: 'app-toggle-switch',
  standalone: true,
  imports: [],
  template: `
    <div class="p-6 max-w-4xl text-slate-100">
      <div class="mb-6">
        <h1 class="text-2xl font-bold text-white mb-1">ToggleSwitch</h1>
        <p class="text-sm text-slate-400">Native HTML toggle switches for interactive boolean settings.</p>
      </div>

      <div class="p-6 border border-slate-700 rounded-2xl bg-slate-800 shadow-lg text-slate-100">
        <div class="space-y-4 max-w-lg">
          <!-- Switch 1 -->
          <label class="flex items-center justify-between cursor-pointer p-4 rounded-xl border border-slate-700 bg-slate-900 shadow-sm hover:border-emerald-400 transition select-none">
            <div>
              <span class="text-sm font-semibold text-white block">Performance Metric Alerts</span>
              <span class="text-xs text-slate-400">Notify when LCP exceeds 2500ms</span>
            </div>
            <div class="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" aria-label="Toggle performance alerts" [checked]="notifications()" (change)="toggleNotif()" class="sr-only peer" />
              <div class="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-emerald-600 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all shadow-inner"></div>
            </div>
          </label>

          <!-- Switch 2 -->
          <label class="flex items-center justify-between cursor-pointer p-4 rounded-xl border border-slate-700 bg-slate-900 shadow-sm hover:border-emerald-400 transition select-none">
            <div>
              <span class="text-sm font-semibold text-white block">Real-time Web Vitals Stream</span>
              <span class="text-xs text-slate-400">BroadcastChannel metric synchronization</span>
            </div>
            <div class="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" aria-label="Toggle web vitals stream" [checked]="analytics()" (change)="toggleAnalytics()" class="sr-only peer" />
              <div class="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-emerald-600 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all shadow-inner"></div>
            </div>
          </label>

          <div class="p-3 bg-slate-900 rounded-lg border border-slate-700 text-xs text-slate-300">
            Alerts: <strong class="text-emerald-400">{{ notifications() ? 'ON' : 'OFF' }}</strong> |
            Stream: <strong class="text-emerald-400">{{ analytics() ? 'ON' : 'OFF' }}</strong>
          </div>
        </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToggleSwitchComponent {
  notifications = signal(true);
  analytics = signal(true);

  toggleNotif() { this.notifications.set(!this.notifications()); }
  toggleAnalytics() { this.analytics.set(!this.analytics()); }
}
