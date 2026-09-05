import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Checkbox } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-checkbox-showcase',
  standalone: true,
  imports: [CommonModule, Checkbox, FormsModule],
  template: `
    <div class="p-6 max-w-4xl text-slate-100">
      <div class="mb-6">
        <h1 class="text-2xl font-bold text-white mb-1">Checkbox</h1>
        <p class="text-sm text-slate-400">PrimeNG checkboxes with single agreement state and feature selection groups.</p>
      </div>

      <div class="p-6 border border-slate-700 rounded-2xl bg-slate-800 shadow-lg text-slate-100">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <!-- Single Checkbox -->
          <div class="space-y-4">
            <h3 class="font-semibold text-slate-100">Single Agreement Checkbox</h3>
            <label class="flex items-start gap-3 cursor-pointer select-none">
              <p-checkbox
                inputId="p-terms-cb"
                [binary]="true"
                [ngModel]="acceptedTerms()"
                (ngModelChange)="acceptedTerms.set($event)"
              />
              <div>
                <span class="text-sm font-medium text-white">Accept Terms and Conditions</span>
                <p class="text-xs text-slate-400">Agree to execute automated microfrontend benchmarking protocols.</p>
              </div>
            </label>
            <div class="text-xs text-slate-300">
              Status: <span class="font-bold" [class.text-amber-400]="acceptedTerms()">{{ acceptedTerms() ? 'Accepted' : 'Not Accepted' }}</span>
            </div>
          </div>

          <!-- Checkbox Group -->
          <div class="space-y-4">
            <h3 class="font-semibold text-slate-100">Feature Selection Group</h3>
            <div class="space-y-2">
              @for (opt of features; track opt.id) {
                <label class="flex items-center gap-3 cursor-pointer p-2 rounded-lg hover:bg-slate-900/60 transition select-none">
                  <p-checkbox
                    [inputId]="'p-opt-' + opt.id"
                    [value]="opt.id"
                    [ngModel]="selectedFeatures()"
                    (ngModelChange)="selectedFeatures.set($event)"
                  />
                  <span class="text-sm text-slate-100">{{ opt.label }}</span>
                </label>
              }
            </div>
            <p class="text-xs text-slate-400">Selected: <span class="font-mono text-amber-400">{{ selectedFeatures().join(', ') || 'None' }}</span></p>
          </div>
        </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CheckboxShowcaseComponent {
  acceptedTerms = signal(false);
  selectedFeatures = signal<string[]>(['fast', 'accessible']);

  features = [
    { id: 'fast', label: 'Zero Runtime JS Overhead' },
    { id: 'accessible', label: 'WAI-ARIA Semantic Markup' },
    { id: 'tailwind', label: 'Tailwind Utility Layer' }
  ];
}
