import { Component, input, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerformanceMetric } from '@nx-microfrontends/shared-models';

@Component({
  selector: 'lib-metric-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="p-4 rounded-lg shadow border border-slate-700 bg-slate-800 text-slate-100">
      <h3 class="text-sm font-medium text-slate-400">{{ metric().name }}</h3>
      <div class="mt-2 flex items-baseline gap-2">
        <span class="text-2xl font-semibold" [ngClass]="colorClass()">{{ metric().value.toFixed(2) }}</span>
        <span class="text-sm text-slate-400">ms</span>
      </div>
      <p class="mt-1 text-xs text-slate-500">Source: {{ metric().source }}</p>
    </div>
  `
})
export class MetricCardComponent {
  metric = input.required<PerformanceMetric>();
  
  colorClass = computed(() => {
    switch (this.metric().rating) {
      case 'good': return 'text-emerald-400';
      case 'needs-improvement': return 'text-amber-400';
      case 'poor': return 'text-rose-400';
      default: return 'text-slate-100';
    }
  });
}
