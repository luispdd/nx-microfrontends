import { RouterLink } from '@angular/router';
import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MOCK_CATEGORIES, MOCK_COUNTRIES } from '@nx-microfrontends/shared-models';

@Component({
  selector: 'app-select-showcase',
  standalone: true,
  imports: [CommonModule, MatSelectModule, MatFormFieldModule, ReactiveFormsModule, RouterLink],
  template: `
    <div class="p-6 max-w-4xl text-slate-100">
      <div class="mb-6">
        <h1 class="text-2xl font-bold text-white mb-1">Select / Dropdown</h1>
        <p class="text-sm text-slate-400">Angular Material select / dropdown controls for single and multiple item selection.</p>
      </div>

      <div class="p-6 border border-slate-700 rounded-2xl bg-slate-800 shadow-lg text-slate-100">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div class="space-y-3">
            <label for="mat-single-select" class="block text-sm font-semibold text-slate-200">Department / Category</label>
            <mat-form-field appearance="outline" class="w-full">
              <mat-label>Department</mat-label>
              <mat-select id="mat-single-select" [formControl]="categoryControl">
                @for (cat of categories; track cat) {
                  <mat-option [value]="cat">{{ cat }}</mat-option>
                }
              </mat-select>
            </mat-form-field>
            <p class="text-xs text-slate-400">Selected: <span class="font-semibold text-indigo-400">{{ categoryControl.value }}</span></p>
          </div>

          <div class="space-y-3">
            <label for="mat-multi-select" class="block text-sm font-semibold text-slate-200">Countries (Multiple)</label>
            <mat-form-field appearance="outline" class="w-full">
              <mat-label>Select Countries</mat-label>
              <mat-select id="mat-multi-select" [formControl]="countriesControl" multiple>
                @for (country of countries; track country.code) {
                  <mat-option [value]="country.code">{{ country.name }}</mat-option>
                }
              </mat-select>
            </mat-form-field>
            <p class="text-xs text-slate-400">Selected Countries Count: <span class="font-semibold text-indigo-400">{{ countriesControl.value?.length || 0 }}</span></p>
          </div>
        </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectShowcase {
  categoryControl = new FormControl(MOCK_CATEGORIES[0]);
  countriesControl = new FormControl<string[]>([MOCK_COUNTRIES[0].code, MOCK_COUNTRIES[1].code]);

  categories = MOCK_CATEGORIES;
  countries = MOCK_COUNTRIES;
}