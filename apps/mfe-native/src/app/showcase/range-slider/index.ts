import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

@Component({
  selector: 'app-range-slider',
  standalone: true,
  imports: [],
  template: `
    <div class="p-6 max-w-4xl text-slate-100">
      <div class="mb-6">
        <h1 class="text-2xl font-bold text-white mb-1">Slider</h1>
        <p class="text-sm text-slate-400">Native HTML range sliders with continuous and stepped value adjustments.</p>
      </div>

      <div class="p-6 border border-slate-700 rounded-2xl bg-slate-800 shadow-lg text-slate-100">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl">
          <!-- Continuous Slider -->
          <div class="space-y-4">
            <div class="flex justify-between items-center">
              <label for="continuous-slider" class="block text-sm font-semibold text-slate-200">Continuous Slider</label>
              <span class="px-2 py-0.5 bg-emerald-950 border border-emerald-700 text-emerald-300 text-xs font-bold rounded-full font-mono">{{ volume() }}%</span>
            </div>
            <input
              id="continuous-slider"
              type="range"
              min="0"
              max="100"
              [value]="volume()"
              (input)="updateVolume($event)"
              class="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-600"
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
              <label for="stepped-slider" class="block text-sm font-semibold text-slate-200">Stepped Slider (Step = 10)</label>
              <span class="px-2 py-0.5 bg-emerald-950 border border-emerald-700 text-emerald-300 text-xs font-bold rounded-full font-mono">{{ stepVal() }} pts</span>
            </div>
            <input
              id="stepped-slider"
              type="range"
              min="0"
              max="100"
              step="10"
              [value]="stepVal()"
              (input)="updateStep($event)"
              class="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-600"
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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RangeSliderComponent {
  volume = signal(65);
  stepVal = signal(20);

  updateVolume(e: Event) {
    this.volume.set(parseInt((e.target as HTMLInputElement).value, 10));
  }
  updateStep(e: Event) {
    this.stepVal.set(parseInt((e.target as HTMLInputElement).value, 10));
  }
}
