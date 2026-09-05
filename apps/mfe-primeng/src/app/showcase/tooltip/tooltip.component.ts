import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Tooltip, TooltipModule } from 'primeng/tooltip';
import { Button, ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-tooltip-showcase',
  standalone: true,
  imports: [CommonModule, Tooltip, TooltipModule, Button, ButtonModule],
  template: `
    <div class="p-6 max-w-4xl text-slate-100">
      <div class="mb-6">
        <h1 class="text-2xl font-bold text-white mb-1">Tooltip</h1>
        <p class="text-sm text-slate-400">Directional hover tooltips supporting top, bottom, left, and right positions.</p>
      </div>

      <div class="p-6 border border-slate-700 rounded-2xl bg-slate-800 shadow-lg text-slate-100">
        <div class="max-w-xl py-8 flex flex-wrap justify-center gap-6">
          <p-button pTooltip="Tooltip on Top" tooltipPosition="top" label="Top" severity="secondary" size="small" />
          <p-button pTooltip="Tooltip on Bottom" tooltipPosition="bottom" label="Bottom" severity="secondary" size="small" />
          <p-button pTooltip="Tooltip on Left" tooltipPosition="left" label="Left" severity="secondary" size="small" />
          <p-button pTooltip="Tooltip on Right" tooltipPosition="right" label="Right" severity="secondary" size="small" />
        </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TooltipShowcaseComponent {}
