import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-list-page',
  standalone: true,
  imports: [RouterModule],
  template: `
    <div class="p-8 max-w-6xl mx-auto bg-slate-900 min-h-screen text-slate-100">
      <div class="mb-8">
        <h1 class="text-3xl font-extrabold mb-2 text-white">Native HTML Showcases</h1>
        <p class="text-slate-400">A collection of native HTML elements styled exclusively with Tailwind CSS.</p>
      </div>

      <!-- Featured Benchmark Card -->
      <a routerLink="table" class="block p-6 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 hover:border-emerald-500 transition-all mb-8 shadow-lg">
        <div class="flex items-center justify-between">
          <div>
            <div class="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-1">Featured Benchmark</div>
            <h3 class="text-xl font-bold text-white">📊 Data Table (100 rows, Sort, Pagination)</h3>
            <p class="text-sm text-slate-400">Zero-dependency native table featuring 100 mock employees, sortable headers, and page sizing.</p>
          </div>
          <span class="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold rounded-xl transition">View Showcase →</span>
        </div>
      </a>

      <!-- Form Controls -->
      <h2 class="text-xl font-bold text-white mt-6 mb-4">Form Controls (7)</h2>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
        <a routerLink="text-input" class="p-3 bg-slate-800 border border-slate-700 text-slate-200 rounded-lg shadow-sm hover:border-emerald-500 hover:text-white transition">text-input</a>
        <a routerLink="checkbox" class="p-3 bg-slate-800 border border-slate-700 text-slate-200 rounded-lg shadow-sm hover:border-emerald-500 hover:text-white transition">checkbox</a>
        <a routerLink="radio" class="p-3 bg-slate-800 border border-slate-700 text-slate-200 rounded-lg shadow-sm hover:border-emerald-500 hover:text-white transition">radio</a>
        <a routerLink="select" class="p-3 bg-slate-800 border border-slate-700 text-emerald-400 rounded-lg shadow-sm hover:border-emerald-500 hover:text-white transition font-medium">select</a>
        <a routerLink="datepicker" class="p-3 bg-slate-800 border border-slate-700 text-slate-200 rounded-lg shadow-sm hover:border-emerald-500 hover:text-white transition">datepicker</a>
        <a routerLink="range-slider" class="p-3 bg-slate-800 border border-slate-700 text-emerald-400 rounded-lg shadow-sm hover:border-emerald-500 hover:text-white transition font-medium">range-slider</a>
        <a routerLink="toggle-switch" class="p-3 bg-slate-800 border border-slate-700 text-slate-200 rounded-lg shadow-sm hover:border-emerald-500 hover:text-white transition">toggle-switch</a>
      </div>

      <!-- Layout & Navigation -->
      <h2 class="text-xl font-bold text-white mt-6 mb-4">Layout & Navigation (7)</h2>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
        <a routerLink="card" class="p-3 bg-slate-800 border border-slate-700 text-slate-200 rounded-lg shadow-sm hover:border-emerald-500 hover:text-white transition">card</a>
        <a routerLink="divider" class="p-3 bg-slate-800 border border-slate-700 text-slate-200 rounded-lg shadow-sm hover:border-emerald-500 hover:text-white transition">divider</a>
        <a routerLink="accordion" class="p-3 bg-slate-800 border border-slate-700 text-slate-200 rounded-lg shadow-sm hover:border-emerald-500 hover:text-white transition">accordion</a>
        <a routerLink="stepper" class="p-3 bg-slate-800 border border-slate-700 text-slate-200 rounded-lg shadow-sm hover:border-emerald-500 hover:text-white transition">stepper</a>
        <a routerLink="tabs" class="p-3 bg-slate-800 border border-slate-700 text-slate-200 rounded-lg shadow-sm hover:border-emerald-500 hover:text-white transition">tabs</a>
        <a routerLink="toolbar" class="p-3 bg-slate-800 border border-slate-700 text-slate-200 rounded-lg shadow-sm hover:border-emerald-500 hover:text-white transition">toolbar</a>
        <a routerLink="menu" class="p-3 bg-slate-800 border border-slate-700 text-slate-200 rounded-lg shadow-sm hover:border-emerald-500 hover:text-white transition">menu</a>
      </div>

      <!-- Data & Feedback -->
      <h2 class="text-xl font-bold text-white mt-6 mb-4">Data & Feedback (7)</h2>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
        <a routerLink="table" class="p-3 bg-slate-800 border border-slate-700 rounded-lg shadow-sm hover:border-emerald-500 hover:text-white transition font-semibold text-emerald-400">📊 table</a>
        <a routerLink="pagination" class="p-3 bg-slate-800 border border-slate-700 text-slate-200 rounded-lg shadow-sm hover:border-emerald-500 hover:text-white transition">pagination</a>
        <a routerLink="dialog" class="p-3 bg-slate-800 border border-slate-700 text-emerald-400 rounded-lg shadow-sm hover:border-emerald-500 hover:text-white transition font-medium">dialog</a>
        <a routerLink="tooltip" class="p-3 bg-slate-800 border border-slate-700 text-slate-200 rounded-lg shadow-sm hover:border-emerald-500 hover:text-white transition">tooltip</a>
        <a routerLink="badge" class="p-3 bg-slate-800 border border-slate-700 text-slate-200 rounded-lg shadow-sm hover:border-emerald-500 hover:text-white transition">badge</a>
        <a routerLink="progress" class="p-3 bg-slate-800 border border-slate-700 text-slate-200 rounded-lg shadow-sm hover:border-emerald-500 hover:text-white transition">progress</a>
        <a routerLink="spinner" class="p-3 bg-slate-800 border border-slate-700 text-slate-200 rounded-lg shadow-sm hover:border-emerald-500 hover:text-white transition">spinner</a>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListPageComponent {}
