import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatePicker } from 'primeng/datepicker';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-datepicker-showcase',
  standalone: true,
  imports: [CommonModule, DatePicker, FormsModule],
  template: `
    <div class="p-6 max-w-4xl text-slate-100">
      <div class="mb-6">
        <h1 class="text-2xl font-bold text-white mb-1">DatePicker</h1>
        <p class="text-sm text-slate-400">Date picker controls supporting single date and date range selection.</p>
      </div>

      <div class="p-6 border border-slate-700 rounded-2xl bg-slate-800 shadow-lg text-slate-100">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl">
          <!-- Section 1: Single Date -->
          <div class="space-y-3">
            <label for="dp-single" class="block text-sm font-semibold text-slate-200">Single Date</label>
            <p-datepicker
              inputId="dp-single"
              [ngModel]="singleDate()"
              (ngModelChange)="singleDate.set($event)"
              [showIcon]="true"
              class="w-full"
            />
          </div>

          <!-- Section 2: Date Range Selection -->
          <div class="space-y-3">
            <label for="dp-range" class="block text-sm font-semibold text-slate-200">Date Range Selection</label>
            <p-datepicker
              inputId="dp-range"
              [ngModel]="rangeDates()"
              (ngModelChange)="rangeDates.set($event)"
              selectionMode="range"
              [showIcon]="true"
              placeholder="Select date range"
              class="w-full"
            />
          </div>
        </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DatepickerShowcaseComponent {
  singleDate = signal<Date | null>(new Date(2026, 8, 4));
  rangeDates = signal<Date[] | null>([new Date(2026, 8, 1), new Date(2026, 8, 15)]);
}
