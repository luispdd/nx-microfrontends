import { Component, input } from '@angular/core';

@Component({
  selector: 'lib-page-header',
  standalone: true,
  template: `
    <header class="mb-6">
      <h1 class="text-2xl font-bold text-white">{{ title() }}</h1>
      @if (description()) {
        <p class="mt-2 text-sm text-slate-400">{{ description() }}</p>
      }
    </header>
  `,
})
export class PageHeaderComponent {
  title = input.required<string>();
  description = input<string>();
}
