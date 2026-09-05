import { Directive, ElementRef, inject, afterNextRender } from '@angular/core';

@Directive({
  selector: '[libRenderTiming]',
  standalone: true
})
export class RenderTimingDirective {
  private el = inject(ElementRef);
  private startTime = performance.now();

  constructor() {
    afterNextRender(() => {
      const endTime = performance.now();
      const renderTime = endTime - this.startTime;
      console.log(`Render timing for ${this.el.nativeElement.tagName}: ${renderTime.toFixed(2)}ms`);
    });
  }
}
