import { RouterLink } from '@angular/router';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-expansion-panel-showcase',
  standalone: true,
  imports: [CommonModule, MatExpansionModule, RouterLink],
  template: `
    <div class="p-6 max-w-4xl text-slate-100">
      <div class="mb-6">
        <h1 class="text-2xl font-bold text-white mb-1">Accordion</h1>
        <p class="text-sm text-slate-400">Expandable disclosure panels for organizing multi-section content.</p>
      </div>

      <div class="p-6 border border-slate-700 rounded-2xl bg-slate-800 shadow-lg text-slate-100">
        <div class="max-w-2xl">
          <mat-accordion class="space-y-3">
            <mat-expansion-panel [expanded]="true" class="!bg-slate-900 !border !border-slate-700 !text-slate-100 rounded-xl overflow-hidden shadow-none">
              <mat-expansion-panel-header class="!text-white hover:!bg-slate-800/60">
                <mat-panel-title class="!text-white font-semibold">
                  Why compare Native HTML vs PrimeNG vs Material?
                </mat-panel-title>
              </mat-expansion-panel-header>
              <p class="py-2 text-sm text-slate-300 leading-relaxed">
                Component libraries add varying degrees of DOM complexity, CSS layers, and JavaScript bundles. Measuring them in an identical microfrontend setup reveals real runtime costs.
              </p>
            </mat-expansion-panel>

            <mat-expansion-panel class="!bg-slate-900 !border !border-slate-700 !text-slate-100 rounded-xl overflow-hidden shadow-none">
              <mat-expansion-panel-header class="!text-white hover:!bg-slate-800/60">
                <mat-panel-title class="!text-white font-semibold">
                  How does Native Federation handle remote sharing?
                </mat-panel-title>
              </mat-expansion-panel-header>
              <p class="py-2 text-sm text-slate-300 leading-relaxed">
                Via module federation dynamic manifests, allowing independent deployments to share singleton dependencies like Angular core and RxJS.
              </p>
            </mat-expansion-panel>

            <mat-expansion-panel class="!bg-slate-900 !border !border-slate-700 !text-slate-100 rounded-xl overflow-hidden shadow-none">
              <mat-expansion-panel-header class="!text-white hover:!bg-slate-800/60">
                <mat-panel-title class="!text-white font-semibold">
                  What are the core web vitals benchmark targets?
                </mat-panel-title>
              </mat-expansion-panel-header>
              <p class="py-2 text-sm text-slate-300 leading-relaxed">
                LCP &lt; 2.5s, INP &lt; 200ms, and CLS &lt; 0.1 for optimal user experience.
              </p>
            </mat-expansion-panel>
          </mat-accordion>
        </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExpansionPanelShowcase {}