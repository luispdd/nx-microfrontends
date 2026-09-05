import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Paginator, PaginatorState } from 'primeng/paginator';

@Component({
  selector: 'app-paginator-showcase',
  standalone: true,
  imports: [CommonModule, Paginator],
  template: `
    <div class="p-6 max-w-4xl text-slate-100">
      <div class="mb-6">
        <h1 class="text-2xl font-bold text-white mb-1">Paginator</h1>
        <p class="text-sm text-slate-400">Standalone pagination control with item count summary and reactive page navigation.</p>
      </div>

      <div class="p-6 border border-slate-700 rounded-2xl bg-slate-800 shadow-lg text-slate-100">
        <div class="max-w-2xl space-y-4">
          <p-paginator
            [first]="first()"
            [rows]="rows()"
            [totalRecords]="totalRecords"
            [rowsPerPageOptions]="[10, 20, 30]"
            (onPageChange)="onPageChange($event)"
          />
          <p class="text-xs text-slate-400 text-center">
            Displaying records <strong class="text-amber-400">{{ first() + 1 }} – {{ Math.min(first() + rows(), totalRecords) }}</strong> of {{ totalRecords }}
          </p>
        </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaginatorShowcaseComponent {
  Math = Math;
  first = signal(0);
  rows = signal(10);
  totalRecords = 120;

  onPageChange(event: PaginatorState) {
    this.first.set(event.first ?? 0);
    this.rows.set(event.rows ?? 10);
  }
}
