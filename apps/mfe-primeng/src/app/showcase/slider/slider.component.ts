import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Slider } from 'primeng/slider';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-slider-showcase',
  standalone: true,
  imports: [CommonModule, Slider, FormsModule],
  template: `
    <div class="p-6 max-w-4xl text-slate-100">
      <div class="mb-6">
        <h1 class="text-2xl font-bold text-white mb-1">Slider</h1>
        <p class="text-sm text-slate-400">PrimeNG sliders with continuous and stepped value adjustments.</p>
      </div>

      <div class="p-6 border border-slate-700 rounded-2xl bg-slate-800 shadow-lg text-slate-100">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl">
          <!-- Continuous Slider -->
          <div class="space-y-4">
            <div class="flex justify-between items-center">
              <label class="block text-sm font-semibold text-slate-200">Continuous Slider</label>
              <span class="px-2 py-0.5 bg-amber-950 border border-amber-700 text-amber-300 text-xs font-bold rounded-full font-mono">{{ volume() }}%</span>
            </div>
            <p-slider
              [ngModel]="volume()"
              (ngModelChange)="volume.set($event)"
              [min]="0"
              [max]="100"
              class="w-full"
            />
            <div class="flex justify-between text-xs text-slate-400">
              <span>0%</span>
              <span>50%</span>
              <span>100%</span>
            </div>
          </div>

          <!-- Stepped Slider -->
          <div class="space-y-4">
            <div class="flex justify-between items-center">
              <label class="block text-sm font-semibold text-slate-200">Stepped Slider (Step = 10)</label>
              <span class="px-2 py-0.5 bg-amber-950 border border-amber-700 text-amber-300 text-xs font-bold rounded-full font-mono">{{ stepVal() }} pts</span>
            </div>
            <p-slider
              [ngModel]="stepVal()"
              (ngModelChange)="stepVal.set($event)"
              [min]="0"
              [max]="100"
              [step]="10"
              class="w-full"
            />
            <div class="flex justify-between text-xs text-slate-400">
              <span>0</span>
              <span>50</span>
              <span>100</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SliderShowcaseComponent {
  volume = signal(65);
  stepVal = signal(20);
}
