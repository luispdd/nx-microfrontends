import { ChangeDetectionStrategy, Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MOCK_TABLE_DATA, TableRow } from '@nx-microfrontends/shared-models';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="p-6 max-w-6xl mx-auto text-slate-100">
      <div class="mb-6">
        <h1 class="text-2xl font-bold text-white mb-1">Table (100 Rows)</h1>
        <p class="text-sm text-slate-400">Enterprise data table featuring sortable columns, pagination (10 per page), and shared mock employee data.</p>
      </div>

      <div class="p-6 border border-slate-700 rounded-2xl bg-slate-800 shadow-lg overflow-x-auto">
        <!-- Search and Page Size Filter Controls -->
        <div class="mb-5 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          <div class="relative flex-1 max-w-md">
            <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </div>
            <input
              type="text"
              placeholder="Search by name, department, role, status..."
              class="w-full pl-10 pr-4 py-2 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition"
              [ngModel]="searchQuery()"
              (ngModelChange)="onSearchChange($event)"
            />
          </div>

          <div class="flex items-center gap-2 self-end sm:self-auto text-xs text-slate-400">
            <span>Rows per page:</span>
            <select
              [ngModel]="pageSize()"
              (ngModelChange)="pageSize.set(+$event); currentPage.set(1)"
              class="bg-slate-900 border border-slate-700 text-white rounded-lg px-2.5 py-1.5 text-xs focus:ring-2 focus:ring-emerald-500 outline-none"
            >
              <option [value]="5">5</option>
              <option [value]="10">10</option>
              <option [value]="20">20</option>
              <option [value]="50">50</option>
            </select>
          </div>
        </div>

        <!-- Semantic Table -->
        <table class="min-w-full divide-y divide-slate-700 text-left text-sm">
          <thead class="bg-slate-900/80 text-xs uppercase font-semibold text-slate-300">
            <tr>
              <th scope="col" (click)="setSort('id')" class="px-5 py-3.5 cursor-pointer select-none hover:text-emerald-400 transition">
                <div class="flex items-center gap-1.5">
                  ID
                  <span class="text-xs text-slate-500">{{ getSortIcon('id') }}</span>
                </div>
              </th>
              <th scope="col" (click)="setSort('name')" class="px-5 py-3.5 cursor-pointer select-none hover:text-emerald-400 transition">
                <div class="flex items-center gap-1.5">
                  Name
                  <span class="text-xs text-slate-500">{{ getSortIcon('name') }}</span>
                </div>
              </th>
              <th scope="col" (click)="setSort('department')" class="px-5 py-3.5 cursor-pointer select-none hover:text-emerald-400 transition">
                <div class="flex items-center gap-1.5">
                  Department
                  <span class="text-xs text-slate-500">{{ getSortIcon('department') }}</span>
                </div>
              </th>
              <th scope="col" (click)="setSort('role')" class="px-5 py-3.5 cursor-pointer select-none hover:text-emerald-400 transition">
                <div class="flex items-center gap-1.5">
                  Role
                  <span class="text-xs text-slate-500">{{ getSortIcon('role') }}</span>
                </div>
              </th>
              <th scope="col" (click)="setSort('salary')" class="px-5 py-3.5 cursor-pointer select-none hover:text-emerald-400 transition">
                <div class="flex items-center gap-1.5">
                  Salary
                  <span class="text-xs text-slate-500">{{ getSortIcon('salary') }}</span>
                </div>
              </th>
              <th scope="col" (click)="setSort('status')" class="px-5 py-3.5 cursor-pointer select-none hover:text-emerald-400 transition">
                <div class="flex items-center gap-1.5">
                  Status
                  <span class="text-xs text-slate-500">{{ getSortIcon('status') }}</span>
                </div>
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-700/60 bg-slate-800">
            @for (row of paginatedData(); track row.id) {
              <tr class="hover:bg-slate-700/40 transition">
                <td class="px-5 py-4 whitespace-nowrap font-mono text-slate-400">{{ row.id }}</td>
                <td class="px-5 py-4 whitespace-nowrap">
                  <div class="font-semibold text-white">{{ row.name }}</div>
                  <div class="text-xs text-slate-400">{{ row.email }}</div>
                </td>
                <td class="px-5 py-4 whitespace-nowrap text-slate-300">{{ row.department }}</td>
                <td class="px-5 py-4 whitespace-nowrap text-slate-300">{{ row.role }}</td>
                <td class="px-5 py-4 whitespace-nowrap font-mono text-emerald-400 font-semibold">\${{ row.salary.toLocaleString() }}</td>
                <td class="px-5 py-4 whitespace-nowrap">
                  <span
                    class="px-2.5 py-1 inline-flex text-xs leading-4 font-semibold rounded-full uppercase tracking-wider"
                    [class.bg-emerald-950]="row.status === 'active'"
                    [class.text-emerald-400]="row.status === 'active'"
                    [class.border]="true"
                    [class.border-emerald-700]="row.status === 'active'"
                    [class.bg-amber-950]="row.status === 'pending'"
                    [class.text-amber-400]="row.status === 'pending'"
                    [class.border-amber-700]="row.status === 'pending'"
                    [class.bg-rose-950]="row.status === 'inactive'"
                    [class.text-rose-400]="row.status === 'inactive'"
                    [class.border-rose-700]="row.status === 'inactive'"
                  >
                    {{ row.status }}
                  </span>
                </td>
              </tr>
            } @empty {
              <tr>
                <td colspan="6" class="px-5 py-8 text-center text-slate-400">
                  No matching employees found for "{{ searchQuery() }}".
                </td>
              </tr>
            }
          </tbody>
        </table>

        <!-- Pagination Controls -->
        <div class="mt-5 pt-4 border-t border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            Showing <strong class="text-white">{{ totalRows() > 0 ? (currentPage() - 1) * pageSize() + 1 : 0 }}</strong> to
            <strong class="text-white">{{ Math.min(currentPage() * pageSize(), totalRows()) }}</strong> of
            <strong class="text-white">{{ totalRows() }}</strong> entries
          </div>

          <div class="flex items-center gap-1.5">
            <button
              [disabled]="currentPage() === 1"
              (click)="currentPage.set(1)"
              class="px-2.5 py-1.5 rounded-lg border border-slate-700 bg-slate-900 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed text-white transition"
              aria-label="First page"
            >
              «
            </button>
            <button
              [disabled]="currentPage() === 1"
              (click)="currentPage.set(currentPage() - 1)"
              class="px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-900 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed text-white transition"
            >
              Previous
            </button>
            <span class="px-3 py-1.5 text-slate-300 font-medium">Page {{ currentPage() }} of {{ totalPages() }}</span>
            <button
              [disabled]="currentPage() >= totalPages()"
              (click)="currentPage.set(currentPage() + 1)"
              class="px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-900 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed text-white transition"
            >
              Next
            </button>
            <button
              [disabled]="currentPage() >= totalPages()"
              (click)="currentPage.set(totalPages())"
              class="px-2.5 py-1.5 rounded-lg border border-slate-700 bg-slate-900 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed text-white transition"
              aria-label="Last page"
            >
              »
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent {
  Math = Math;
  rawData = signal<TableRow[]>(MOCK_TABLE_DATA);

  searchQuery = signal('');
  sortKey = signal<keyof TableRow>('id');
  sortDesc = signal(false);
  currentPage = signal(1);
  pageSize = signal(10);

  onSearchChange(value: string) {
    this.searchQuery.set(value);
    this.currentPage.set(1);
  }

  setSort(key: keyof TableRow) {
    if (this.sortKey() === key) {
      this.sortDesc.set(!this.sortDesc());
    } else {
      this.sortKey.set(key);
      this.sortDesc.set(false);
    }
  }

  getSortIcon(key: keyof TableRow): string {
    if (this.sortKey() !== key) return '⇅';
    return this.sortDesc() ? '▼' : '▲';
  }

  filteredData = computed(() => {
    let data = [...this.rawData()];
    const query = this.searchQuery().trim().toLowerCase();
    if (query) {
      data = data.filter(item =>
        item.name.toLowerCase().includes(query) ||
        item.email.toLowerCase().includes(query) ||
        item.department.toLowerCase().includes(query) ||
        item.role.toLowerCase().includes(query) ||
        item.status.toLowerCase().includes(query) ||
        item.id.toString().includes(query)
      );
    }

    const key = this.sortKey();
    const desc = this.sortDesc();

    return data.sort((a, b) => {
      const valA = a[key];
      const valB = b[key];
      if (valA < valB) return desc ? 1 : -1;
      if (valA > valB) return desc ? -1 : 1;
      return 0;
    });
  });

  totalRows = computed(() => this.filteredData().length);
  totalPages = computed(() => Math.max(1, Math.ceil(this.totalRows() / this.pageSize())));

  paginatedData = computed(() => {
    const start = (this.currentPage() - 1) * this.pageSize();
    return this.filteredData().slice(start, start + this.pageSize());
  });
}

