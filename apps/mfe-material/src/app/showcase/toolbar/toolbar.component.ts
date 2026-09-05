import { RouterLink } from '@angular/router';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-toolbar-showcase',
  standalone: true,
  imports: [CommonModule, MatToolbarModule, MatButtonModule, MatInputModule, MatFormFieldModule, RouterLink],
  template: `
    <div class="p-6 max-w-4xl text-slate-100">
      <div class="mb-6">
        <h1 class="text-2xl font-bold text-white mb-1">Toolbar</h1>
        <p class="text-sm text-slate-400">Action toolbar container with search input, filter controls, and primary action buttons.</p>
      </div>

      <div class="p-6 border border-slate-700 rounded-2xl bg-slate-800 shadow-lg text-slate-100">
        <div class="max-w-3xl">
          <mat-toolbar class="!bg-slate-900 !text-slate-100 rounded-xl border border-slate-700 !p-3 !h-auto flex flex-wrap items-center justify-between gap-4">
            <div class="flex items-center gap-2">
              <input
                type="text"
                placeholder="Filter benchmark..."
                class="px-3 py-1.5 bg-slate-800 border border-slate-700 rounded-lg text-sm text-white outline-none focus:border-indigo-500"
              />
              <button mat-stroked-button class="!border-slate-700 !text-slate-200 text-xs">Filter</button>
            </div>
            <div class="flex items-center gap-2">
              <button mat-stroked-button class="!border-slate-700 !text-slate-200 text-xs">Export</button>
              <button mat-flat-button color="primary" class="text-xs">+ New Test</button>
            </div>
          </mat-toolbar>
        </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToolbarShowcase {}