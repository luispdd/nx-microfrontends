import { RouterLink } from '@angular/router';
import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-checkbox-showcase',
  standalone: true,
  imports: [CommonModule, MatCheckboxModule, FormsModule, RouterLink],
  template: `
    <div class="p-6 max-w-4xl text-slate-100">
      <div class="mb-6">
        <h1 class="text-2xl font-bold text-white mb-1">Checkbox</h1>
        <p class="text-sm text-slate-400">Angular Material checkboxes with single agreement state and feature selection groups.</p>
      </div>

      <div class="p-6 border border-slate-700 rounded-2xl bg-slate-800 shadow-lg text-slate-100">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <!-- Single Checkbox -->
          <div class="space-y-4">
            <h3 class="font-semibold text-slate-100">Single Agreement Checkbox</h3>
            <div class="flex items-start gap-3">
              <mat-checkbox
                [checked]="acceptedTerms()"
                (change)="acceptedTerms.set($event.checked)"
                color="primary"
                id="mat-terms-cb">
                <span class="text-sm font-medium text-white">Accept Terms and Conditions</span>
                <p class="text-xs text-slate-400">Agree to execute automated microfrontend benchmarking protocols.</p>
              </mat-checkbox>
            </div>
            <div class="text-xs text-slate-300">
              Status: <span class="font-bold" [class.text-indigo-400]="acceptedTerms()">{{ acceptedTerms() ? 'Accepted' : 'Not Accepted' }}</span>
            </div>
          </div>

          <!-- Checkbox Group -->
          <div class="space-y-4">
            <h3 class="font-semibold text-slate-100">Feature Selection Group</h3>
            <div class="space-y-2">
              @for (opt of features; track opt.id) {
                <div class="p-2 rounded-lg hover:bg-slate-900/60 transition">
                  <mat-checkbox
                    [checked]="isFeatureSelected(opt.id)"
                    (change)="toggleFeature(opt.id)"
                    color="primary">
                    <span class="text-sm text-slate-100">{{ opt.label }}</span>
                  </mat-checkbox>
                </div>
              }
            </div>
            <p class="text-xs text-slate-400">Selected: <span class="font-mono text-indigo-400">{{ selectedFeatures().join(', ') || 'None' }}</span></p>
          </div>
        </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CheckboxShowcase {
  acceptedTerms = signal(false);
  selectedFeatures = signal<string[]>(['fast', 'accessible']);

  features = [
    { id: 'fast', label: 'Zero Runtime JS Overhead' },
    { id: 'accessible', label: 'WAI-ARIA Semantic Markup' },
    { id: 'tailwind', label: 'Tailwind Utility Layer' }
  ];

  toggleFeature(feature: string) {
    const curr = this.selectedFeatures();
    if (curr.includes(feature)) {
      this.selectedFeatures.set(curr.filter(f => f !== feature));
    } else {
      this.selectedFeatures.set([...curr, feature]);
    }
  }

  isFeatureSelected(feature: string) {
    return this.selectedFeatures().includes(feature);
  }
}