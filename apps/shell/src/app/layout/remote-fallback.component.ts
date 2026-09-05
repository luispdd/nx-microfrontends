import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-remote-fallback',
  standalone: true,
  template: `
    <div class="p-8 max-w-2xl mx-auto my-12 bg-white rounded-2xl border border-amber-200 shadow-md text-center">
      <div class="text-5xl mb-4">⏳</div>
      <h2 class="text-2xl font-bold text-gray-800 mb-2">Microfrontend Starting or Offline</h2>
      <p class="text-gray-600 mb-6">
        The remote <strong>{{ remoteName() }}</strong> could not be reached. If you are running the monorepo locally, make sure the remote is being served.
      </p>
      <div class="bg-gray-50 p-4 rounded-lg font-mono text-sm text-left text-gray-700 mb-6 border">
        <p class="text-gray-500 mb-1"># Start this MFE individually:</p>
        <p class="font-bold text-blue-600">bunx nx serve {{ remoteName() }}</p>
        <p class="text-gray-500 mt-3 mb-1"># Or serve all apps together:</p>
        <p class="font-bold text-blue-600">bunx nx run-many --target=serve --projects=shell,mfe-material,mfe-primeng,mfe-native --parallel=4</p>
      </div>
      <button
        (click)="reload()"
        class="px-5 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition cursor-pointer"
      >
        🔄 Retry Loading
      </button>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RemoteFallbackComponent {
  remoteName = input<string>('microfrontend');

  reload() {
    window.location.reload();
  }
}
