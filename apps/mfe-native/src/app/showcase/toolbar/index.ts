import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [],
  template: `
    <div class="p-6 max-w-4xl text-slate-100">
      <div class="mb-6">
        <h1 class="text-2xl font-bold text-white mb-1">Toolbar</h1>
        <p class="text-sm text-slate-400">Action toolbar container with search input, filter controls, and primary action buttons.</p>
      </div>

      <div class="p-6 border border-slate-700 rounded-2xl bg-slate-800 shadow-lg text-slate-100">
        <div class="max-w-3xl">
          <div class="p-3 bg-slate-900 border border-slate-700 rounded-xl shadow-sm flex flex-wrap items-center justify-between gap-4">
            <div class="flex items-center gap-2">
              <input
                type="text"
                placeholder="Filter benchmark..."
                class="px-3 py-1.5 bg-slate-800 border border-slate-700 rounded-lg text-sm text-white outline-none focus:border-emerald-500"
              />
              <button type="button" class="px-3 py-1.5 border border-slate-700 rounded-lg text-xs font-semibold hover:bg-slate-800 text-slate-200 transition">Filter</button>
            </div>
            <div class="flex items-center gap-2">
              <button type="button" class="px-3 py-1.5 border border-slate-700 rounded-lg text-xs font-semibold hover:bg-slate-800 text-slate-200 transition">Export</button>
              <button type="button" class="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold transition">+ New Test</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToolbarComponent {}
