import { RouterLink } from '@angular/router';
import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-paginator-showcase',
  standalone: true,
  imports: [CommonModule, MatPaginatorModule, RouterLink],
  template: `
    <div class="p-6 max-w-4xl text-slate-100">
      <div class="mb-6">
        <h1 class="text-2xl font-bold text-white mb-1">Paginator</h1>
        <p class="text-sm text-slate-400">Standalone pagination control with item count summary and reactive page navigation.</p>
      </div>

      <div class="p-6 border border-slate-700 rounded-2xl bg-slate-800 shadow-lg text-slate-100">
        <div class="max-w-2xl space-y-4">
          <div class="rounded-xl overflow-hidden border border-slate-700 !bg-slate-900">
            <mat-paginator
              [length]="totalRecords"
              [pageSize]="rows()"
              [pageSizeOptions]="[10, 20, 30]"
              [showFirstLastButtons]="true"
              (page)="onPageChange($event)"
              class="!bg-slate-900 !text-slate-200">
            </mat-paginator>
          </div>
          <p class="text-xs text-slate-400 text-center">
            Displaying records <strong class="text-indigo-400">{{ first() + 1 }} – {{ Math.min(first() + rows(), totalRecords) }}</strong> of {{ totalRecords }}
          </p>
        </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaginatorShowcase {
  Math = Math;
  first = signal(0);
  rows = signal(10);
  totalRecords = 120;

  onPageChange(event: PageEvent) {
    this.first.set(event.pageIndex * event.pageSize);
    this.rows.set(event.pageSize);
  }
}