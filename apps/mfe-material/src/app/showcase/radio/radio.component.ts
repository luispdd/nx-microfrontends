import { RouterLink } from '@angular/router';
import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-radio-showcase',
  standalone: true,
  imports: [CommonModule, MatRadioModule, FormsModule, RouterLink],
  template: `
    <div class="p-6 max-w-4xl text-slate-100">
      <div class="mb-6">
        <h1 class="text-2xl font-bold text-white mb-1">RadioButton</h1>
        <p class="text-sm text-slate-400">Angular Material radio button groups styled with card layout and selection highlights.</p>
      </div>

      <div class="p-6 border border-slate-700 rounded-2xl bg-slate-800 shadow-lg text-slate-100">
        <div class="space-y-4 max-w-xl">
          <span class="block text-sm font-semibold text-slate-200">Select Architecture Profile</span>
          <mat-radio-group
            [ngModel]="selectedPlan()"
            (ngModelChange)="selectedPlan.set($event)"
            class="grid grid-cols-1 sm:grid-cols-3 gap-3">
            @for (item of plans; track item.id) {
              <div
                [class.border-indigo-500]="selectedPlan() === item.id"
                [class.bg-indigo-950/40]="selectedPlan() === item.id"
                [class.border-slate-700]="selectedPlan() !== item.id"
                class="flex flex-col p-4 border-2 rounded-xl cursor-pointer hover:border-indigo-400 transition bg-slate-900 shadow-sm"
                (click)="selectedPlan.set(item.id)"
                (keydown.enter)="selectedPlan.set(item.id)"
                (keydown.space)="selectedPlan.set(item.id)"
                tabindex="0"
                role="radio"
                [attr.aria-checked]="selectedPlan() === item.id">
                <div class="flex items-center justify-between mb-2">
                  <mat-radio-button
                    [value]="item.id"
                    color="primary"
                    class="!p-0"
                    (click)="$event.stopPropagation()"
                    (keypress)="$event.stopPropagation()">
                  </mat-radio-button>
                  <span class="text-xs font-bold px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-slate-200">{{ item.price }}</span>
                </div>
                <span class="font-bold text-white">{{ item.name }}</span>
                <span class="text-xs text-slate-400">{{ item.desc }}</span>
              </div>
            }
          </mat-radio-group>
          <p class="text-xs text-slate-300">Active Profile: <span class="font-mono font-bold text-indigo-400">{{ selectedPlan() }}</span></p>
        </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RadioShowcase {
  selectedPlan = signal<string>('pro');

  plans = [
    { id: 'basic', name: 'Micro', desc: 'Minimal footprint', price: 'Free' },
    { id: 'pro', name: 'Standard', desc: 'Optimal benchmark', price: 'Fast' },
    { id: 'enterprise', name: 'Enterprise', desc: 'Full federation', price: 'Heavy' }
  ];
}