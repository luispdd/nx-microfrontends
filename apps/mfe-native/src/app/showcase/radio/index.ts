import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

@Component({
  selector: 'app-radio',
  standalone: true,
  imports: [],
  template: `
    <div class="p-6 max-w-4xl text-slate-100">
      <div class="mb-6">
        <h1 class="text-2xl font-bold text-white mb-1">RadioButton</h1>
        <p class="text-sm text-slate-400">Native HTML radio button groups styled with card layout and selection highlights.</p>
      </div>

      <div class="p-6 border border-slate-700 rounded-2xl bg-slate-800 shadow-lg text-slate-100">
        <div class="space-y-4 max-w-xl">
          <span class="block text-sm font-semibold text-slate-200">Select Architecture Profile</span>
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
            @for (item of plans; track item.id) {
              <label
                [class.border-emerald-600]="selectedPlan() === item.id"
                [class.bg-emerald-950/40]="selectedPlan() === item.id"
                [class.border-slate-700]="selectedPlan() !== item.id"
                class="flex flex-col p-4 border-2 rounded-xl cursor-pointer hover:border-emerald-400 transition bg-slate-900 shadow-sm"
              >
                <div class="flex items-center justify-between mb-2">
                  <input
                    type="radio"
                    name="plan"
                    [value]="item.id"
                    [checked]="selectedPlan() === item.id"
                    (change)="setPlan(item.id)"
                    class="w-4 h-4 text-emerald-600 accent-emerald-600 cursor-pointer"
                  />
                  <span class="text-xs font-bold px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-slate-200">{{ item.price }}</span>
                </div>
                <span class="font-bold text-white">{{ item.name }}</span>
                <span class="text-xs text-slate-400">{{ item.desc }}</span>
              </label>
            }
          </div>
          <p class="text-xs text-slate-300">Active Profile: <span class="font-mono font-bold text-emerald-400">{{ selectedPlan() }}</span></p>
        </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RadioComponent {
  selectedPlan = signal<string>('pro');

  plans = [
    { id: 'basic', name: 'Micro', desc: 'Minimal footprint', price: 'Free' },
    { id: 'pro', name: 'Standard', desc: 'Optimal benchmark', price: 'Fast' },
    { id: 'enterprise', name: 'Enterprise', desc: 'Full federation', price: 'Heavy' }
  ];

  setPlan(plan: string) {
    this.selectedPlan.set(plan);
  }
}
