import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Toolbar } from 'primeng/toolbar';
import { Button } from 'primeng/button';
import { InputText } from 'primeng/inputtext';

@Component({
  selector: 'app-toolbar-showcase',
  standalone: true,
  imports: [CommonModule, Toolbar, Button, InputText],
  template: `
    <div class="p-6 max-w-4xl text-slate-100">
      <div class="mb-6">
        <h1 class="text-2xl font-bold text-white mb-1">Toolbar</h1>
        <p class="text-sm text-slate-400">Action toolbar container with search input, filter controls, and primary action buttons.</p>
      </div>

      <div class="p-6 border border-slate-700 rounded-2xl bg-slate-800 shadow-lg text-slate-100">
        <div class="max-w-3xl">
          <p-toolbar [style]="{ 'background': '#0f172a', 'border': '1px solid #334155' }">
            <ng-template #start>
              <div class="flex items-center gap-2">
                <input type="text" pInputText placeholder="Filter benchmark..." size="small" />
                <p-button label="Filter" severity="secondary" size="small" />
              </div>
            </ng-template>
            <ng-template #end>
              <div class="flex items-center gap-2">
                <p-button label="Export" severity="secondary" size="small" />
                <p-button label="+ New Test" size="small" />
              </div>
            </ng-template>
          </p-toolbar>
        </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToolbarShowcaseComponent {}
