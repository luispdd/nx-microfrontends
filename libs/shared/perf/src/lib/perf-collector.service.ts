import { Injectable, inject } from '@angular/core';
import { onLCP, onINP, onCLS, onFCP, onTTFB, Metric } from 'web-vitals';
import { PerformanceMetric } from '@nx-microfrontends/shared-models';

@Injectable({
  providedIn: 'root'
})
export class PerfCollectorService {
  private channel = new BroadcastChannel('perf-metrics');
  
  startCollecting(source: string) {
    const handleMetric = (metric: Metric) => {
      const perfMetric: PerformanceMetric = {
        name: metric.name,
        value: metric.value,
        rating: metric.rating,
        source,
        timestamp: Date.now()
      };
      this.channel.postMessage(perfMetric);
    };

    onLCP(handleMetric);
    onINP(handleMetric);
    onCLS(handleMetric);
    onFCP(handleMetric);
    onTTFB(handleMetric);
  }
}
