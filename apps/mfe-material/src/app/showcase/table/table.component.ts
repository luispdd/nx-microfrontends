import { RouterLink } from '@angular/router';
import { Component, ChangeDetectionStrategy, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { MOCK_TABLE_DATA, TableRow } from '@nx-microfrontends/shared-models';

@Component({
  selector: 'app-table-showcase',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatPaginatorModule, MatSortModule, RouterLink],
  template: `
    <div class="p-6 max-w-6xl text-slate-100">
      <div class="mb-6">
        <h1 class="text-2xl font-bold text-white mb-1">Table (100 Rows)</h1>
        <p class="text-sm text-slate-400">Enterprise data table featuring sortable columns, pagination (10 per page), and shared mock employee data.</p>
      </div>
      
      <div class="border border-slate-700 rounded-2xl bg-slate-800 shadow-lg overflow-hidden">
        <table mat-table [dataSource]="dataSource" matSort class="w-full">
          
          <ng-container matColumnDef="id">
            <th mat-header-cell *matHeaderCellDef mat-sort-header> ID </th>
            <td mat-cell *matCellDef="let element"> {{element.id}} </td>
          </ng-container>

          <ng-container matColumnDef="name">
            <th mat-header-cell *matHeaderCellDef mat-sort-header> Name </th>
            <td mat-cell *matCellDef="let element"> 
              <div class="font-medium text-white">{{element.name}}</div>
              <div class="text-xs text-slate-400">{{element.email}}</div>
            </td>
          </ng-container>

          <ng-container matColumnDef="department">
            <th mat-header-cell *matHeaderCellDef mat-sort-header> Department </th>
            <td mat-cell *matCellDef="let element"> {{element.department}} </td>
          </ng-container>

          <ng-container matColumnDef="role">
            <th mat-header-cell *matHeaderCellDef mat-sort-header> Role </th>
            <td mat-cell *matCellDef="let element"> {{element.role}} </td>
          </ng-container>

          <ng-container matColumnDef="salary">
            <th mat-header-cell *matHeaderCellDef mat-sort-header> Salary </th>
            <td mat-cell *matCellDef="let element" class="font-mono"> \${{element.salary.toLocaleString()}} </td>
          </ng-container>

          <ng-container matColumnDef="status">
            <th mat-header-cell *matHeaderCellDef mat-sort-header> Status </th>
            <td mat-cell *matCellDef="let element">
              <span class="px-2.5 py-0.5 rounded-full text-xs font-semibold capitalize"
                    [class.bg-emerald-950]="element.status === 'active'"
                    [class.text-emerald-300]="element.status === 'active'"
                    [class.border]="true"
                    [class.border-emerald-800]="element.status === 'active'"
                    [class.bg-rose-950]="element.status === 'inactive'"
                    [class.text-rose-300]="element.status === 'inactive'"
                    [class.border-rose-800]="element.status === 'inactive'"
                    [class.bg-amber-950]="element.status === 'pending'"
                    [class.text-amber-300]="element.status === 'pending'"
                    [class.border-amber-800]="element.status === 'pending'">
                {{element.status}}
              </span>
            </td>
          </ng-container>

          <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
          <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
        </table>

        <mat-paginator [pageSizeOptions]="[5, 10, 20, 50]"
                       [pageSize]="10"
                       showFirstLastButtons
                       aria-label="Select page of employee records">
        </mat-paginator>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableShowcase implements AfterViewInit {
  displayedColumns: string[] = ['id', 'name', 'department', 'role', 'salary', 'status'];
  dataSource = new MatTableDataSource<TableRow>(MOCK_TABLE_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}