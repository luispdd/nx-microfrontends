import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Select } from 'primeng/select';
import { MultiSelect } from 'primeng/multiselect';
import { FormsModule } from '@angular/forms';
import { MOCK_COUNTRIES, MOCK_CATEGORIES } from '@nx-microfrontends/shared-models';

@Component({
  selector: 'app-dropdown-showcase',
  standalone: true,
  imports: [CommonModule, Select, MultiSelect, FormsModule],
  template: `
    <div class="p-6 max-w-4xl text-slate-100">
      <div class="mb-6">
        <h1 class="text-2xl font-bold text-white mb-1">Select / Dropdown</h1>
        <p class="text-sm text-slate-400">PrimeNG select / dropdown controls for single and multiple item selection.</p>
      </div>

      <div class="p-6 border border-slate-700 rounded-2xl bg-slate-800 shadow-lg text-slate-100">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div class="space-y-3">
            <label for="p-single-select" class="block text-sm font-semibold text-slate-200">Department / Category</label>
            <p-select
              inputId="p-single-select"
              [options]="categories"
              [ngModel]="selectedCategory()"
              (ngModelChange)="selectedCategory.set($event)"
              placeholder="Select Category"
              class="w-full"
            />
            <p class="text-xs text-slate-400">Selected: <span class="font-semibold text-amber-400">{{ selectedCategory() }}</span></p>
          </div>

          <div class="space-y-3">
            <label for="p-multi-select" class="block text-sm font-semibold text-slate-200">Countries (Multiple)</label>
            <p-multiselect
              inputId="p-multi-select"
              [options]="countries"
              [ngModel]="selectedCountries()"
              (ngModelChange)="selectedCountries.set($event)"
              optionLabel="name"
              optionValue="code"
              placeholder="Select Countries"
              class="w-full"
            />
            <p class="text-xs text-slate-400">Selected Countries Count: <span class="font-semibold text-amber-400">{{ selectedCountries().length }}</span></p>
          </div>
        </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DropdownShowcaseComponent {
  selectedCategory = signal<string>(MOCK_CATEGORIES[0]);
  selectedCountries = signal<string[]>([MOCK_COUNTRIES[0].code, MOCK_COUNTRIES[1].code]);

  categories = MOCK_CATEGORIES;
  countries = MOCK_COUNTRIES;
}
