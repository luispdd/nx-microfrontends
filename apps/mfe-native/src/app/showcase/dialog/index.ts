import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [],
  template: `
    <div class="p-6 max-w-4xl text-slate-100">
      <div class="mb-6">
        <h1 class="text-2xl font-bold text-white mb-1">Dialog (Modal)</h1>
        <p class="text-sm text-slate-400">Native HTML modal dialog with header, body content, backdrop blur, and action buttons.</p>
      </div>

      <div class="p-6 border border-slate-700 rounded-2xl bg-slate-800 shadow-lg text-slate-100">
        <div class="space-y-4">
          <button
            type="button"
            (click)="openDialog(nativeModal)"
            class="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-sm shadow transition"
          >
            Open Native Modal
          </button>

          <dialog
            #nativeModal
            class="p-0 rounded-2xl shadow-2xl backdrop:bg-gray-900/60 backdrop:backdrop-blur-sm max-w-md w-full border border-slate-700 bg-slate-900 text-slate-100"
          >
            <div class="p-6 space-y-4">
              <div class="flex justify-between items-center">
                <h3 class="text-lg font-bold text-white">Benchmark Parameters</h3>
                <button type="button" aria-label="Close dialog" (click)="closeDialog(nativeModal, 'Cancelled')" class="text-slate-400 hover:text-slate-300 font-bold text-lg">&times;</button>
              </div>
              <p class="text-sm text-slate-300">
                Configuring automated headless browser test run with 5 sample iterations.
              </p>
              <div class="flex justify-end gap-3 pt-4 border-t border-slate-800">
                <button type="button" (click)="closeDialog(nativeModal, 'Cancelled')" class="px-4 py-2 border border-slate-700 rounded-lg text-sm font-semibold hover:bg-slate-800 text-slate-300">Cancel</button>
                <button type="button" (click)="closeDialog(nativeModal, 'Confirmed')" class="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm font-semibold">Proceed</button>
              </div>
            </div>
          </dialog>

          @if (dialogResult()) {
            <div class="p-3 bg-slate-900 rounded-xl border border-emerald-500/40 text-sm">
              Dialog Result: <strong class="text-emerald-400">{{ dialogResult() }}</strong>
            </div>
          }
        </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogComponent {
  dialogResult = signal<string | null>(null);

  openDialog(dialog: HTMLDialogElement) {
    dialog.showModal();
  }
  closeDialog(dialog: HTMLDialogElement, result: string) {
    dialog.close();
    this.dialogResult.set(result);
  }
}
