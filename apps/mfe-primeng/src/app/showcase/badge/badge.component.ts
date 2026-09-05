import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Badge, BadgeModule } from 'primeng/badge';
import { Button, ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-badge-showcase',
  standalone: true,
  imports: [CommonModule, Badge, BadgeModule, Button, ButtonModule],
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
                <p-button (onClick)="incrementBadge()" label="+1 Notification" size="small" />
                <p-button (onClick)="clearBadge()" label="Clear" severity="secondary" [text]="true" size="small" />
              </div>
            </div>

            <div class="flex items-center gap-6 p-4 bg-slate-900 rounded-xl border border-slate-700/80">
              <p-button
                label="Notifications"
                [badge]="badgeCount() > 0 ? '' + badgeCount() : undefined"
                badgeSeverity="danger"
                size="small"
              />
              @if (badgeCount() > 0) {
                <p-badge [value]="badgeCount()" severity="warn" />
              }
            </div>
          </div>

          <!-- Section 2: Status Badges -->
          <div class="space-y-3 pt-4 border-t border-slate-700/60">
            <h2 class="text-sm font-semibold text-slate-200">Status Indicators</h2>
            <div class="flex flex-wrap gap-3">
              <p-badge value="Online" severity="success" />
              <p-badge value="Degraded" severity="warn" />
              <p-badge value="Critical" severity="danger" />
              <p-badge value="Pending" severity="info" />
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BadgeShowcaseComponent {
  badgeCount = signal(5);

  incrementBadge() {
    this.badgeCount.update(c => c + 1);
  }

  clearBadge() {
    this.badgeCount.set(0);
  }
}
