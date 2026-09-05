import { RouterLink } from '@angular/router';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tooltip-showcase',
  standalone: true,
  imports: [CommonModule, MatTooltipModule, MatButtonModule, RouterLink],
  template: `
    <div class="p-6 max-w-4xl text-slate-100">
      <div class="mb-6">
        <h1 class="text-2xl font-bold text-white mb-1">Tooltip</h1>
        <p class="text-sm text-slate-400">Directional hover tooltips supporting top, bottom, left, and right positions.</p>
      </div>

      <div class="p-6 border border-slate-700 rounded-2xl bg-slate-800 shadow-lg text-slate-100">
        <div class="max-w-xl py-8 flex flex-wrap justify-center gap-6">
          <button mat-stroked-button matTooltip="Tooltip on Top" matTooltipPosition="above" class="!border-slate-700 !text-slate-200">
            Top
          </button>
          <button mat-stroked-button matTooltip="Tooltip on Bottom" matTooltipPosition="below" class="!border-slate-700 !text-slate-200">
            Bottom
          </button>
          <button mat-stroked-button matTooltip="Tooltip on Left" matTooltipPosition="left" class="!border-slate-700 !text-slate-200">
            Left
          </button>
          <button mat-stroked-button matTooltip="Tooltip on Right" matTooltipPosition="right" class="!border-slate-700 !text-slate-200">
            Right
          </button>
        </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TooltipShowcase {}