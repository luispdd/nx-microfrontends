import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-divider',
  standalone: true,
  imports: [],
  template: `
    <div class="p-6 max-w-4xl text-slate-100">
      <div class="mb-6">
        <h1 class="text-2xl font-bold text-white mb-1">Divider</h1>
        <p class="text-sm text-slate-400">Horizontal, vertical, and labeled content separators.</p>
      </div>

      <div class="p-6 border border-slate-700 rounded-2xl bg-slate-800 shadow-lg text-slate-100">
        <div class="max-w-xl space-y-8">
          <!-- Section 1: Horizontal Divider -->
          <div class="space-y-3">
            <h2 class="text-sm font-semibold text-slate-200">Horizontal Content Separation</h2>
            <div class="p-4 bg-slate-900 rounded-xl border border-slate-700/80 space-y-3">
              <div class="text-sm text-slate-300">First Section: Architecture Overview</div>
              <hr class="border-slate-700" />
              <div class="text-sm text-slate-300">Second Section: Remote Bundles</div>
            </div>
          </div>

          <!-- Section 2: Labeled / Centered Divider -->
          <div class="space-y-3">
            <h2 class="text-sm font-semibold text-slate-200">Labeled Separator</h2>
            <div class="relative flex items-center justify-center py-2">
              <div class="flex-grow border-t border-slate-700"></div>
              <span class="flex-shrink mx-4 text-xs uppercase font-bold text-emerald-400 bg-slate-900 px-3 py-1 rounded-full border border-slate-700">OR CONTINUE WITH</span>
              <div class="flex-grow border-t border-slate-700"></div>
            </div>
          </div>

          <!-- Section 3: Vertical Divider -->
          <div class="space-y-3">
            <h2 class="text-sm font-semibold text-slate-200">Vertical Divider</h2>
            <div class="flex items-center gap-4 p-4 bg-slate-900 rounded-xl border border-slate-700/80 text-sm">
              <span class="text-slate-300">Material MFE</span>
              <div class="h-6 w-px bg-slate-700"></div>
              <span class="text-slate-300">PrimeNG MFE</span>
              <div class="h-6 w-px bg-slate-700"></div>
              <span class="text-slate-300">Native MFE</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DividerComponent {}
