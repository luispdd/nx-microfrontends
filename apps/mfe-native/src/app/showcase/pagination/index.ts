import { ChangeDetectionStrategy, Component, signal, computed } from '@angular/core';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [],
  template: `
    <div class="p-6 max-w-4xl text-slate-100">
      <div class="mb-6">
        <h1 class="text-2xl font-bold text-white mb-1">Paginator</h1>
        <p class="text-sm text-slate-400">Standalone pagination control with item count summary and reactive page navigation.</p>
      </div>

      <div class="p-6 border border-slate-700 rounded-2xl bg-slate-800 shadow-lg text-slate-100">
        <div class="max-w-2xl space-y-4">
          <div class="p-4 bg-slate-900 border border-slate-700 rounded-xl flex flex-wrap items-center justify-between gap-4">
            <!-- Rows per page -->
            <div class="flex items-center gap-2 text-xs text-slate-400">
              <span>Rows per page:</span>
              <select
                [value]="rows()"
                (change)="onRowsChange($event)"
                class="bg-slate-800 border border-slate-700 text-white rounded px-2 py-1 text-xs outline-none"
              >
                <option [value]="10">10</option>
                <option [value]="20">20</option>
                <option [value]="30">30</option>
              </select>
            </div>

            <!-- Page Buttons -->
            <div class="flex items-center space-x-1">
              <button
                type="button"
                (click)="prev()"
                [disabled]="currentPage() === 1"
                class="px-3 py-1.5 border border-slate-700 rounded-lg text-xs font-semibold disabled:opacity-40 hover:bg-slate-800 text-slate-200 transition"
              >Previous</button>

              @for (p of pages(); track p) {
                <button
                  type="button"
                  (click)="setPage(p)"
                  [class.bg-emerald-600]="currentPage() === p"
                  [class.text-white]="currentPage() === p"
                  [class.hover:bg-slate-800]="currentPage() !== p"
                  [class.text-slate-300]="currentPage() !== p"
                  class="w-8 h-8 border border-slate-700 rounded-lg text-xs font-bold transition"
                >{{ p }}</button>
              }

              <button
                type="button"
                (click)="next()"
                [disabled]="currentPage() === totalPages()"
                class="px-3 py-1.5 border border-slate-700 rounded-lg text-xs font-semibold disabled:opacity-40 hover:bg-slate-800 text-slate-200 transition"
              >Next</button>
            </div>
          </div>

          <p class="text-xs text-slate-400 text-center">
            Displaying records <strong class="text-emerald-400">{{ first() + 1 }} – {{ Math.min(first() + rows(), totalRecords) }}</strong> of {{ totalRecords }}
          </p>
        </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginationComponent {
  Math = Math;
  first = signal(0);
  rows = signal(10);
  totalRecords = 120;

  totalPages = computed(() => Math.ceil(this.totalRecords / this.rows()));
  currentPage = computed(() => Math.floor(this.first() / this.rows()) + 1);

  pages = computed(() => {
    const total = this.totalPages();
    const count = Math.min(5, total);
    return Array.from({ length: count }, (_, i) => i + 1);
  });

  setPage(p: number) {
    this.first.set((p - 1) * this.rows());
  }

  prev() {
    this.first.update(f => Math.max(0, f - this.rows()));
  }

  next() {
    this.first.update(f => Math.min((this.totalPages() - 1) * this.rows(), f + this.rows()));
  }

  onRowsChange(e: Event) {
    const newRows = parseInt((e.target as HTMLSelectElement).value, 10);
    this.rows.set(newRows);
    this.first.set(0);
  }
}
