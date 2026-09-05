import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-accordion',
  standalone: true,
  imports: [],
  template: `
    <div class="p-6 max-w-4xl text-slate-100">
      <div class="mb-6">
        <h1 class="text-2xl font-bold text-white mb-1">Accordion</h1>
        <p class="text-sm text-slate-400">Expandable disclosure panels for organizing multi-section content.</p>
      </div>

      <div class="p-6 border border-slate-700 rounded-2xl bg-slate-800 shadow-lg text-slate-100">
        <div class="max-w-2xl space-y-3">
          <details class="group border border-slate-700 rounded-xl bg-slate-900 p-4 open:shadow-sm transition" open>
            <summary class="flex justify-between items-center font-semibold text-white cursor-pointer list-none select-none">
              <span>Why compare Native HTML vs PrimeNG vs Material?</span>
              <span class="transform group-open:rotate-180 transition-transform text-emerald-400">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
              </span>
            </summary>
            <p class="mt-3 text-sm text-slate-300 leading-relaxed">
              Component libraries add varying degrees of DOM complexity, CSS layers, and JavaScript bundles. Measuring them in an identical microfrontend setup reveals real runtime costs.
            </p>
          </details>

          <details class="group border border-slate-700 rounded-xl bg-slate-900 p-4 open:shadow-sm transition">
            <summary class="flex justify-between items-center font-semibold text-white cursor-pointer list-none select-none">
              <span>How does Native Federation handle remote sharing?</span>
              <span class="transform group-open:rotate-180 transition-transform text-emerald-400">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
              </span>
            </summary>
            <p class="mt-3 text-sm text-slate-300 leading-relaxed">
              Via module federation dynamic manifests, allowing independent deployments to share singleton dependencies like Angular core and RxJS.
            </p>
          </details>

          <details class="group border border-slate-700 rounded-xl bg-slate-900 p-4 open:shadow-sm transition">
            <summary class="flex justify-between items-center font-semibold text-white cursor-pointer list-none select-none">
              <span>What are the core web vitals benchmark targets?</span>
              <span class="transform group-open:rotate-180 transition-transform text-emerald-400">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
              </span>
            </summary>
            <p class="mt-3 text-sm text-slate-300 leading-relaxed">
              LCP &lt; 2.5s, INP &lt; 200ms, and CLS &lt; 0.1 for optimal user experience.
            </p>
          </details>
        </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccordionComponent {}
