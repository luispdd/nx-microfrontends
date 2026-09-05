import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RadioButton } from 'primeng/radiobutton';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-radio-showcase',
  standalone: true,
  imports: [CommonModule, RadioButton, FormsModule],
  template: `
    <div class="p-6 max-w-4xl text-slate-100">
      <div class="mb-6">
        <h1 class="text-2xl font-bold text-white mb-1">RadioButton</h1>
        <p class="text-sm text-slate-400">PrimeNG radio button groups styled with card layout and selection highlights.</p>
      </div>

      <div class="p-6 border border-slate-700 rounded-2xl bg-slate-800 shadow-lg text-slate-100">
        <div class="space-y-4 max-w-xl">
          <span class="block text-sm font-semibold text-slate-200">Select Architecture Profile</span>
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
            @for (item of plans; track item.id) {
              <div
                [class.border-amber-500]="selectedPlan() === item.id"
                [class.bg-amber-950/40]="selectedPlan() === item.id"
                [class.border-slate-700]="selectedPlan() !== item.id"
                class="flex flex-col p-4 border-2 rounded-xl cursor-pointer hover:border-amber-400 transition bg-slate-900 shadow-sm"
                (click)="selectedPlan.set(item.id)">
                <div class="flex items-center justify-between mb-2">
                  <p-radiobutton
                    [inputId]="'p-rb-' + item.id"
                    name="plan"
                    [value]="item.id"
                    [ngModel]="selectedPlan()"
                    (ngModelChange)="selectedPlan.set($event)"
                  />
                  <span class="text-xs font-bold px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-slate-200">{{ item.price }}</span>
                </div>
                <span class="font-bold text-white">{{ item.name }}</span>
                <span class="text-xs text-slate-400">{{ item.desc }}</span>
              </div>
            }
          </div>
          <p class="text-xs text-slate-300">Active Profile: <span class="font-mono font-bold text-amber-400">{{ selectedPlan() }}</span></p>
        </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RadioShowcaseComponent {
  selectedPlan = signal<string>('pro');

  plans = [
    { id: 'basic', name: 'Micro', desc: 'Minimal footprint', price: 'Free' },
    { id: 'pro', name: 'Standard', desc: 'Optimal benchmark', price: 'Fast' },
    { id: 'enterprise', name: 'Enterprise', desc: 'Full federation', price: 'Heavy' }
  ];
}
