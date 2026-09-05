import { RouterLink } from '@angular/router';
import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-datepicker-showcase',
  standalone: true,
  imports: [CommonModule, MatDatepickerModule, MatInputModule, MatFormFieldModule, MatNativeDateModule, RouterLink],
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
            <label class="block text-sm font-semibold text-slate-200">Single Date</label>
            <mat-form-field appearance="outline" class="w-full">
              <mat-label>Choose a date</mat-label>
              <input matInput [matDatepicker]="picker" [value]="singleDate()">
              <mat-hint>MM/DD/YYYY</mat-hint>
              <mat-datepicker-toggle matIconSuffix [for]="picker"></mat-datepicker-toggle>
              <mat-datepicker #picker></mat-datepicker>
            </mat-form-field>
          </div>

          <!-- Section 2: Date Range Selection -->
          <div class="space-y-3">
            <label class="block text-sm font-semibold text-slate-200">Date Range Selection</label>
            <mat-form-field appearance="outline" class="w-full">
              <mat-label>Enter a date range</mat-label>
              <mat-date-range-input [rangePicker]="rangePicker">
                <input matStartDate placeholder="Start date" [value]="startDate()">
                <input matEndDate placeholder="End date" [value]="endDate()">
              </mat-date-range-input>
              <mat-hint>MM/DD/YYYY – MM/DD/YYYY</mat-hint>
              <mat-datepicker-toggle matIconSuffix [for]="rangePicker"></mat-datepicker-toggle>
              <mat-date-range-picker #rangePicker></mat-date-range-picker>
            </mat-form-field>
          </div>
        </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DatepickerShowcase {
  singleDate = signal(new Date(2026, 8, 4));
  startDate = signal(new Date(2026, 8, 1));
  endDate = signal(new Date(2026, 8, 15));
}