import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

@Component({
  selector: 'app-datepicker',
  standalone: true,
  imports: [],
  template: `
    <div class="p-6 max-w-4xl text-slate-100">
      <div class="mb-6">
        <h1 class="text-2xl font-bold text-white mb-1">DatePicker</h1>
        <p class="text-sm text-slate-400">Date picker controls supporting single date and date range selection.</p>
      </div>

      <div class="p-6 border border-slate-700 rounded-2xl bg-slate-800 shadow-lg text-slate-100">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl">
          <!-- Section 1: Single Date -->
          <div class="space-y-3">
            <label for="native-single-date" class="block text-sm font-semibold text-slate-200">Single Date</label>
            <input
              id="native-single-date"
              type="date"
              [value]="singleDate()"
              (input)="updateSingleDate($event)"
              class="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none shadow-sm cursor-pointer"
            />
          </div>

          <!-- Section 2: Date Range Selection -->
          <div class="space-y-3">
            <label class="block text-sm font-semibold text-slate-200">Date Range Selection</label>
            <div class="flex items-center gap-2">
              <input
                type="date"
                [value]="startDate()"
                (input)="updateStartDate($event)"
                class="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:ring-2 focus:ring-emerald-500 outline-none cursor-pointer"
              />
              <span class="text-slate-400 text-sm">–</span>
              <input
                type="date"
                [value]="endDate()"
                (input)="updateEndDate($event)"
                class="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:ring-2 focus:ring-emerald-500 outline-none cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DatepickerComponent {
  singleDate = signal('2026-09-04');
  startDate = signal('2026-09-01');
  endDate = signal('2026-09-15');

  updateSingleDate(e: Event) {
    this.singleDate.set((e.target as HTMLInputElement).value);
  }
  updateStartDate(e: Event) {
    this.startDate.set((e.target as HTMLInputElement).value);
  }
  updateEndDate(e: Event) {
    this.endDate.set((e.target as HTMLInputElement).value);
  }
}
