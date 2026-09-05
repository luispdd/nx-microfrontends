import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule, SortIcon } from 'primeng/table';
import { SharedModule } from 'primeng/api';
import { Tag } from 'primeng/tag';
import { MOCK_TABLE_DATA, TableRow } from '@nx-microfrontends/shared-models';

@Component({
  selector: 'app-table-showcase',
  standalone: true,
  imports: [CommonModule, TableModule, SharedModule, Tag, SortIcon],
  template: `
    <div class="p-6 max-w-6xl mx-auto text-slate-100">
      <div class="mb-6">
        <h1 class="text-2xl font-bold mb-1 text-white">Table (100 Rows)</h1>
        <p class="text-sm text-slate-400">Enterprise data table featuring sortable columns, pagination (10 per page), and shared mock employee data.</p>
      </div>
      
      <div class="card bg-slate-800 p-6 rounded-2xl shadow-lg border border-slate-700">
        <p-table [value]="employees()" [paginator]="true" [rows]="10" [tableStyle]="{'min-width': '50rem'}" [rowsPerPageOptions]="[5, 10, 20, 50]">
          <ng-template #header>
              <tr>
                  <th pSortableColumn="id" style="width: 80px">ID <p-sort-icon field="id" /></th>
                  <th pSortableColumn="name">Name <p-sort-icon field="name" /></th>
                  <th pSortableColumn="department">Department <p-sort-icon field="department" /></th>
                  <th pSortableColumn="role">Role <p-sort-icon field="role" /></th>
                  <th pSortableColumn="salary">Salary <p-sort-icon field="salary" /></th>
                  <th pSortableColumn="status">Status <p-sort-icon field="status" /></th>
              </tr>
          </ng-template>
          <ng-template #body let-employee>
              <tr>
                  <td class="font-mono text-slate-400">{{ employee.id }}</td>
                  <td>
                    <div class="font-semibold text-white">{{ employee.name }}</div>
                    <div class="text-xs text-slate-400">{{ employee.email }}</div>
                  </td>
                  <td>{{ employee.department }}</td>
                  <td>{{ employee.role }}</td>
                  <td class="font-mono text-amber-400">\${{ employee.salary.toLocaleString() }}</td>
                  <td>
                    <p-tag [value]="employee.status" [severity]="getSeverity(employee.status)" />
                  </td>
              </tr>
          </ng-template>
        </p-table>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableShowcaseComponent {
  employees = signal<TableRow[]>(MOCK_TABLE_DATA);

  getSeverity(status: string): 'success' | 'warn' | 'danger' | 'info' {
    switch (status) {
      case 'active':
        return 'success';
      case 'pending':
        return 'warn';
      case 'inactive':
        return 'danger';
      default:
        return 'info';
    }
  }
}
