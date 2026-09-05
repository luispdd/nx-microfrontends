import { RouterLink } from '@angular/router';
import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dialog-content-example-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  template: `
    <h2 mat-dialog-title class="!text-white font-bold">Benchmark Parameters</h2>
    <mat-dialog-content class="!text-slate-300 text-sm">
      <p>Configuring automated headless browser test run with 5 sample iterations.</p>
    </mat-dialog-content>
    <mat-dialog-actions align="end" class="gap-2 p-4">
      <button mat-button [mat-dialog-close]="'Cancelled'" class="!text-slate-400">Cancel</button>
      <button mat-flat-button color="primary" [mat-dialog-close]="'Confirmed'" cdkFocusInitial>Proceed</button>
    </mat-dialog-actions>
  `,
})
export class DialogContentExampleDialog {}

@Component({
  selector: 'app-dialog-showcase',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, RouterLink],
  template: `
    <div class="p-6 max-w-4xl text-slate-100">
      <div class="mb-6">
        <h1 class="text-2xl font-bold text-white mb-1">Dialog (Modal)</h1>
        <p class="text-sm text-slate-400">Angular Material modal dialog with header, body content, backdrop blur, and action buttons.</p>
      </div>

      <div class="p-6 border border-slate-700 rounded-2xl bg-slate-800 shadow-lg text-slate-100">
        <div class="space-y-4">
          <button mat-flat-button color="primary" (click)="openDialog()">
            Open Material Modal
          </button>

          @if (dialogResult()) {
            <div class="p-3 bg-slate-900 rounded-xl border border-indigo-500/40 text-sm">
              Dialog Result: <strong class="text-indigo-400">{{ dialogResult() }}</strong>
            </div>
          }
        </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DialogShowcase {
  readonly dialog = inject(MatDialog);
  dialogResult = signal<string | null>(null);

  openDialog() {
    const dialogRef = this.dialog.open(DialogContentExampleDialog, {
      width: '25rem'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dialogResult.set(result);
      }
    });
  }
}