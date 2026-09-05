import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-primeng-showcase-home',
  standalone: true,
  imports: [RouterModule],
  template: `
    <div class="p-8 max-w-6xl mx-auto bg-slate-900 min-h-screen text-slate-100">
      <div class="mb-8">
        <h1 class="text-3xl font-extrabold text-amber-400 mb-2">PrimeNG Component Showcases</h1>
        <p class="text-slate-400">Comprehensive suite of PrimeNG components with Aura dark theme and Tailwind CSS integration.</p>
      </div>

      <!-- Quick Benchmark Highlight -->
      <div class="mb-8 p-6 bg-slate-800 border border-amber-500/40 rounded-xl shadow-lg">
        <h2 class="text-lg font-bold text-amber-300 mb-2">⚡ Core Performance Benchmark Target</h2>
        <p class="text-slate-300 text-sm mb-4">Compare DataTable, Dropdown, Slider, and Dialog against Material & Native equivalents:</p>
        <div class="flex flex-wrap gap-3">
          <a routerLink="table" class="px-4 py-2 bg-amber-600 text-white font-medium rounded-lg hover:bg-amber-500 transition shadow-sm">📊 Data Table (100 rows, Sort, Pagination)</a>
          <a routerLink="dropdown" class="px-4 py-2 bg-slate-900 border border-amber-500/50 text-amber-300 font-medium rounded-lg hover:bg-slate-800 transition">Select / Dropdown</a>
          <a routerLink="slider" class="px-4 py-2 bg-slate-900 border border-amber-500/50 text-amber-300 font-medium rounded-lg hover:bg-slate-800 transition">Slider</a>
          <a routerLink="dialog" class="px-4 py-2 bg-slate-900 border border-amber-500/50 text-amber-300 font-medium rounded-lg hover:bg-slate-800 transition">Dialog / Modal</a>
        </div>
      </div>

      <!-- Form Controls -->
      <h2 class="text-xl font-bold text-white mt-6 mb-4">Form Controls (7)</h2>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
        <a routerLink="input-text" class="p-3 bg-slate-800 border border-slate-700 text-slate-200 rounded-lg shadow-sm hover:border-amber-500 hover:text-white transition">InputText</a>
        <a routerLink="checkbox" class="p-3 bg-slate-800 border border-slate-700 text-slate-200 rounded-lg shadow-sm hover:border-amber-500 hover:text-white transition">Checkbox</a>
        <a routerLink="radio" class="p-3 bg-slate-800 border border-slate-700 text-slate-200 rounded-lg shadow-sm hover:border-amber-500 hover:text-white transition">RadioButton</a>
        <a routerLink="dropdown" class="p-3 bg-slate-800 border border-slate-700 text-amber-400 rounded-lg shadow-sm hover:border-amber-500 hover:text-white transition font-medium">Select / Dropdown</a>
        <a routerLink="datepicker" class="p-3 bg-slate-800 border border-slate-700 text-slate-200 rounded-lg shadow-sm hover:border-amber-500 hover:text-white transition">DatePicker</a>
        <a routerLink="slider" class="p-3 bg-slate-800 border border-slate-700 text-amber-400 rounded-lg shadow-sm hover:border-amber-500 hover:text-white transition font-medium">Slider</a>
        <a routerLink="toggle-switch" class="p-3 bg-slate-800 border border-slate-700 text-slate-200 rounded-lg shadow-sm hover:border-amber-500 hover:text-white transition">ToggleSwitch</a>
      </div>

      <!-- Layout & Navigation -->
      <h2 class="text-xl font-bold text-white mt-6 mb-4">Layout & Navigation (7)</h2>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
        <a routerLink="card" class="p-3 bg-slate-800 border border-slate-700 text-slate-200 rounded-lg shadow-sm hover:border-amber-500 hover:text-white transition">Card</a>
        <a routerLink="divider" class="p-3 bg-slate-800 border border-slate-700 text-slate-200 rounded-lg shadow-sm hover:border-amber-500 hover:text-white transition">Divider</a>
        <a routerLink="accordion" class="p-3 bg-slate-800 border border-slate-700 text-slate-200 rounded-lg shadow-sm hover:border-amber-500 hover:text-white transition">Accordion</a>
        <a routerLink="stepper" class="p-3 bg-slate-800 border border-slate-700 text-slate-200 rounded-lg shadow-sm hover:border-amber-500 hover:text-white transition">Stepper</a>
        <a routerLink="tab-view" class="p-3 bg-slate-800 border border-slate-700 text-slate-200 rounded-lg shadow-sm hover:border-amber-500 hover:text-white transition">TabView</a>
        <a routerLink="toolbar" class="p-3 bg-slate-800 border border-slate-700 text-slate-200 rounded-lg shadow-sm hover:border-amber-500 hover:text-white transition">Toolbar</a>
        <a routerLink="menu" class="p-3 bg-slate-800 border border-slate-700 text-slate-200 rounded-lg shadow-sm hover:border-amber-500 hover:text-white transition">Menu</a>
      </div>

      <!-- Data & Feedback -->
      <h2 class="text-xl font-bold text-white mt-6 mb-4">Data & Feedback (7)</h2>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
        <a routerLink="table" class="p-3 bg-slate-800 border border-slate-700 rounded-lg shadow-sm hover:border-amber-500 hover:text-white transition font-semibold text-amber-400">📊 Table (DataTable)</a>
        <a routerLink="paginator" class="p-3 bg-slate-800 border border-slate-700 text-slate-200 rounded-lg shadow-sm hover:border-amber-500 hover:text-white transition">Paginator</a>
        <a routerLink="dialog" class="p-3 bg-slate-800 border border-slate-700 text-amber-400 rounded-lg shadow-sm hover:border-amber-500 hover:text-white transition font-medium">Dialog</a>
        <a routerLink="tooltip" class="p-3 bg-slate-800 border border-slate-700 text-slate-200 rounded-lg shadow-sm hover:border-amber-500 hover:text-white transition">Tooltip</a>
        <a routerLink="badge" class="p-3 bg-slate-800 border border-slate-700 text-slate-200 rounded-lg shadow-sm hover:border-amber-500 hover:text-white transition">Badge</a>
        <a routerLink="progress-bar" class="p-3 bg-slate-800 border border-slate-700 text-slate-200 rounded-lg shadow-sm hover:border-amber-500 hover:text-white transition">ProgressBar</a>
        <a routerLink="progress-spinner" class="p-3 bg-slate-800 border border-slate-700 text-slate-200 rounded-lg shadow-sm hover:border-amber-500 hover:text-white transition">ProgressSpinner</a>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrimeNgShowcaseHomeComponent {}
