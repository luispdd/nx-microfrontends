import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-tooltip',
  standalone: true,
  imports: [],
  template: `
    <div class="p-6 max-w-4xl text-slate-100">
      <div class="mb-6">
        <h1 class="text-2xl font-bold text-white mb-1">Tooltip</h1>
        <p class="text-sm text-slate-400">Directional hover tooltips supporting top, bottom, left, and right positions.</p>
      </div>

      <div class="p-6 border border-slate-700 rounded-2xl bg-slate-800 shadow-lg text-slate-100">
        <div class="max-w-xl py-8 flex flex-wrap justify-center gap-6">
          <!-- Top -->
          <div class="relative group">
            <button type="button" class="px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm font-medium hover:bg-slate-800 text-slate-200 transition">
              Top
            </button>
            <div class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block bg-slate-950 text-white text-xs py-1.5 px-3 rounded shadow-lg whitespace-nowrap z-10 border border-slate-800">
              Tooltip on Top
              <div class="w-2 h-2 bg-slate-950 border-r border-b border-slate-800 rotate-45 absolute -bottom-1 left-1/2 -translate-x-1/2"></div>
            </div>
          </div>

          <!-- Bottom -->
          <div class="relative group">
            <button type="button" class="px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm font-medium hover:bg-slate-800 text-slate-200 transition">
              Bottom
            </button>
            <div class="absolute top-full left-1/2 -translate-x-1/2 mt-2 hidden group-hover:block bg-slate-950 text-white text-xs py-1.5 px-3 rounded shadow-lg whitespace-nowrap z-10 border border-slate-800">
              Tooltip on Bottom
              <div class="w-2 h-2 bg-slate-950 border-l border-t border-slate-800 rotate-45 absolute -top-1 left-1/2 -translate-x-1/2"></div>
            </div>
          </div>

          <!-- Left -->
          <div class="relative group">
            <button type="button" class="px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm font-medium hover:bg-slate-800 text-slate-200 transition">
              Left
            </button>
            <div class="absolute right-full top-1/2 -translate-y-1/2 mr-2 hidden group-hover:block bg-slate-950 text-white text-xs py-1.5 px-3 rounded shadow-lg whitespace-nowrap z-10 border border-slate-800">
              Tooltip on Left
              <div class="w-2 h-2 bg-slate-950 border-t border-r border-slate-800 rotate-45 absolute -right-1 top-1/2 -translate-y-1/2"></div>
            </div>
          </div>

          <!-- Right -->
          <div class="relative group">
            <button type="button" class="px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm font-medium hover:bg-slate-800 text-slate-200 transition">
              Right
            </button>
            <div class="absolute left-full top-1/2 -translate-y-1/2 ml-2 hidden group-hover:block bg-slate-950 text-white text-xs py-1.5 px-3 rounded shadow-lg whitespace-nowrap z-10 border border-slate-800">
              Tooltip on Right
              <div class="w-2 h-2 bg-slate-950 border-b border-l border-slate-800 rotate-45 absolute -left-1 top-1/2 -translate-y-1/2"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TooltipComponent {}
