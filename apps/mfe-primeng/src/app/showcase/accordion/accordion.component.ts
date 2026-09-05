import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccordionModule } from 'primeng/accordion';

@Component({
  selector: 'app-accordion-showcase',
  standalone: true,
  imports: [CommonModule, AccordionModule],
  template: `
    <div class="p-6 max-w-4xl text-slate-100">
      <div class="mb-6">
        <h1 class="text-2xl font-bold text-white mb-1">Accordion</h1>
        <p class="text-sm text-slate-400">Expandable disclosure panels for organizing multi-section content.</p>
      </div>

      <div class="p-6 border border-slate-700 rounded-2xl bg-slate-800 shadow-lg text-slate-100">
        <div class="max-w-2xl">
          <p-accordion value="0" class="space-y-3">
            <p-accordion-panel value="0">
              <p-accordion-header>Why compare Native HTML vs PrimeNG vs Material?</p-accordion-header>
              <p-accordion-content>
                <p class="text-sm text-slate-300 leading-relaxed">
                  Component libraries add varying degrees of DOM complexity, CSS layers, and JavaScript bundles. Measuring them in an identical microfrontend setup reveals real runtime costs.
                </p>
              </p-accordion-content>
            </p-accordion-panel>

            <p-accordion-panel value="1">
              <p-accordion-header>How does Native Federation handle remote sharing?</p-accordion-header>
              <p-accordion-content>
                <p class="text-sm text-slate-300 leading-relaxed">
                  Via module federation dynamic manifests, allowing independent deployments to share singleton dependencies like Angular core and RxJS.
                </p>
              </p-accordion-content>
            </p-accordion-panel>

            <p-accordion-panel value="2">
              <p-accordion-header>What are the core web vitals benchmark targets?</p-accordion-header>
              <p-accordion-content>
                <p class="text-sm text-slate-300 leading-relaxed">
                  LCP &lt; 2.5s, INP &lt; 200ms, and CLS &lt; 0.1 for optimal user experience.
                </p>
              </p-accordion-content>
            </p-accordion-panel>
          </p-accordion>
        </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccordionShowcaseComponent {}
