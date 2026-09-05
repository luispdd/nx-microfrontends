import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [],
  template: `
    <div class="p-6 max-w-4xl text-slate-100">
      <div class="mb-6">
        <h1 class="text-2xl font-bold text-white mb-1">Card</h1>
        <p class="text-sm text-slate-400">Structured content containers with headers, statistics, and action footers.</p>
      </div>

      <div class="p-6 border border-slate-700 rounded-2xl bg-slate-800 shadow-lg text-slate-100">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Card 1 -->
          <div class="bg-slate-900 border border-slate-700 rounded-2xl p-4 flex flex-col justify-between shadow-sm">
            <div>
              <div class="pb-2">
                <h3 class="text-lg font-bold text-white">Microfrontend Architecture</h3>
                <span class="text-xs text-emerald-400 font-medium">Host & Remotes</span>
              </div>
              <p class="text-sm text-slate-300 mt-2">
                Native Federation dynamic manifest routing across independent deployment artifacts.
              </p>
              <div class="flex gap-2 mt-4">
                <span class="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-950 text-emerald-300 border border-emerald-700">Port 4200</span>
                <span class="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-950 text-emerald-300 border border-emerald-700">Healthy</span>
              </div>
            </div>

            <div class="pt-4 mt-4 border-t border-slate-800 flex justify-end gap-2">
              <button type="button" class="px-3 py-1.5 text-xs text-slate-400 hover:text-white rounded-lg transition">Metrics</button>
              <button type="button" class="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg transition">Manage Remote</button>
            </div>
          </div>

          <!-- Card 2 -->
          <div class="bg-slate-900 border border-slate-700 rounded-2xl p-4 flex flex-col justify-between shadow-sm">
            <div>
              <div class="pb-2">
                <h3 class="text-lg font-bold text-white">Performance Telemetry</h3>
                <span class="text-xs text-emerald-400 font-medium">Core Web Vitals</span>
              </div>
              <div class="space-y-3 mt-2">
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
              </div>
            </div>

            <div class="pt-4 mt-4 border-t border-slate-800 flex justify-end">
              <button type="button" class="px-3 py-1.5 border border-slate-700 hover:bg-slate-800 text-slate-200 text-xs font-semibold rounded-lg transition">Run Audit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent {}
