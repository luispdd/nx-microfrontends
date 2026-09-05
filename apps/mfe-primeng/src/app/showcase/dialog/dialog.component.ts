import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Dialog } from 'primeng/dialog';
import { Button } from 'primeng/button';

@Component({
  selector: 'app-dialog-showcase',
  standalone: true,
  imports: [CommonModule, Dialog, Button],
  template: `
    <div class="p-6 max-w-4xl text-slate-100">
      <div class="mb-6">
        <h1 class="text-2xl font-bold text-white mb-1">Dialog (Modal)</h1>
        <p class="text-sm text-slate-400">PrimeNG modal dialog with header, body content, backdrop blur, and action buttons.</p>
      </div>

      <div class="p-6 border border-slate-700 rounded-2xl bg-slate-800 shadow-lg text-slate-100">
        <div class="space-y-4">
          <p-button (onClick)="open()" label="Open PrimeNG Modal" />

          <p-dialog
            header="Benchmark Parameters"
            [visible]="visible()"
            (visibleChange)="visible.set($event)"
            [modal]="true"
            [style]="{ width: '25rem' }"
          >
            <p class="text-sm text-slate-300 mb-4">
              Configuring automated headless browser test run with 5 sample iterations.
            </p>
            <ng-template #footer>
              <p-button label="Cancel" severity="secondary" (onClick)="close('Cancelled')" size="small" />
              <p-button label="Proceed" (onClick)="close('Confirmed')" size="small" />
            </ng-template>
          </p-dialog>

          @if (dialogResult()) {
            <div class="p-3 bg-slate-900 rounded-xl border border-amber-500/40 text-sm">
              Dialog Result: <strong class="text-amber-400">{{ dialogResult() }}</strong>
            </div>
          }
        </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DialogShowcaseComponent {
  visible = signal(false);
  dialogResult = signal<string | null>(null);

  open() { this.visible.set(true); }
  close(result: string) {
    this.visible.set(false);
    this.dialogResult.set(result);
  }
}
