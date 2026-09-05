import { RouterLink } from '@angular/router';
import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-badge-showcase',
  standalone: true,
  imports: [CommonModule, MatBadgeModule, MatButtonModule, MatIconModule, RouterLink],
  template: `
    <div class="p-6 max-w-4xl text-slate-100">
      <div class="mb-6">
        <h1 class="text-2xl font-bold text-white mb-1">Badge</h1>
        <p class="text-sm text-slate-400">Status indicators, pill counters, and interactive notification badge.</p>
      </div>

      <div class="p-6 border border-slate-700 rounded-2xl bg-slate-800 shadow-lg text-slate-100">
        <div class="max-w-xl space-y-8">
          <!-- Section 1: Interactive Notification Badge -->
          <div class="space-y-3">
            <div class="flex items-center justify-between">
              <h2 class="text-sm font-semibold text-slate-200">Interactive Notification Badge</h2>
              <div class="flex gap-2">
                <button mat-stroked-button color="primary" class="text-xs" (click)="incrementBadge()">+1 Notification</button>
                <button mat-button class="text-xs !text-slate-400" (click)="clearBadge()">Clear</button>
              </div>
            </div>

            <div class="flex items-center gap-6 p-4 bg-slate-900 rounded-xl border border-slate-700/80">
              <button mat-flat-button color="primary" [matBadge]="badgeCount()" [matBadgeHidden]="badgeCount() === 0" matBadgeColor="warn">
                Notifications
              </button>
              <div [matBadge]="badgeCount()" [matBadgeHidden]="badgeCount() === 0" matBadgeColor="accent" class="cursor-pointer">
                <mat-icon class="text-2xl text-slate-300">notifications</mat-icon>
              </div>
            </div>
          </div>

          <!-- Section 2: Status Badges -->
          <div class="space-y-3 pt-4 border-t border-slate-700/60">
            <h2 class="text-sm font-semibold text-slate-200">Status Indicators</h2>
            <div class="flex flex-wrap gap-3">
              <span class="px-3 py-1 text-xs font-semibold rounded-full bg-emerald-950 text-emerald-300 border border-emerald-700">Online</span>
              <span class="px-3 py-1 text-xs font-semibold rounded-full bg-amber-950 text-amber-300 border border-amber-700">Degraded</span>
              <span class="px-3 py-1 text-xs font-semibold rounded-full bg-rose-950 text-rose-300 border border-rose-700">Critical</span>
              <span class="px-3 py-1 text-xs font-semibold rounded-full bg-blue-950 text-blue-300 border border-blue-700">Pending</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BadgeShowcase {
  badgeCount = signal(5);

  incrementBadge() {
    this.badgeCount.update(c => c + 1);
  }

  clearBadge() {
    this.badgeCount.set(0);
  }
}