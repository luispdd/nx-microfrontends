import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { MOCK_COUNTRIES, MOCK_CATEGORIES } from '@nx-microfrontends/shared-models';

@Component({
  selector: 'app-select',
  standalone: true,
  imports: [],
  template: `
    <div class="p-6 max-w-4xl text-slate-100">
      <div class="mb-6">
        <h1 class="text-2xl font-bold text-white mb-1">Select / Dropdown</h1>
        <p class="text-sm text-slate-400">Native HTML select / dropdown controls for single and multiple item selection.</p>
      </div>

      <div class="p-6 border border-slate-700 rounded-2xl bg-slate-800 shadow-lg text-slate-100">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div class="space-y-3">
            <label for="single-select" class="block text-sm font-semibold text-slate-200">Department / Category</label>
            <div class="relative">
              <select
                id="single-select"
                [value]="selectedCategory()"
                (change)="onSelect($event)"
                class="w-full appearance-none bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 pr-10 text-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none shadow-sm cursor-pointer"
              >
                @for (cat of categories; track cat) {
                  <option [value]="cat">{{ cat }}</option>
                }
              </select>
              <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-400">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
              </div>
            </div>
            <p class="text-xs text-slate-400">Selected: <span class="font-semibold text-emerald-400">{{ selectedCategory() }}</span></p>
          </div>

          <div class="space-y-3">
            <label for="multi-select" class="block text-sm font-semibold text-slate-200">Countries (Multiple)</label>
            <select
              id="multi-select"
              multiple
              size="5"
              (change)="onMultiSelect($event)"
              class="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none shadow-sm"
            >
              @for (country of countries; track country.code) {
                <option [value]="country.code" [selected]="selectedCountries().includes(country.code)">{{ country.name }}</option>
              }
            </select>
            <p class="text-xs text-slate-400">Selected Countries Count: <span class="font-semibold text-emerald-400">{{ selectedCountries().length }}</span></p>
          </div>
        </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectComponent {
  selectedCategory = signal(MOCK_CATEGORIES[0]);
  selectedCountries = signal<string[]>([MOCK_COUNTRIES[0].code, MOCK_COUNTRIES[1].code]);

  categories = MOCK_CATEGORIES;
  countries = MOCK_COUNTRIES;

  onSelect(e: Event) {
    this.selectedCategory.set((e.target as HTMLSelectElement).value);
  }

  onMultiSelect(e: Event) {
    const selected = Array.from((e.target as HTMLSelectElement).selectedOptions).map(o => o.value);
    this.selectedCountries.set(selected);
  }
}
