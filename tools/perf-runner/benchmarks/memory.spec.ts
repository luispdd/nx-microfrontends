import { test, expect } from '@playwright/test';

test.describe('Memory Footprint Performance', () => {
  const mfes = ['material', 'primeng', 'native'];
  const results: Record<string, number> = {};

  test.afterAll(() => {
    console.log('JS Heap Size (MB):', results);
  });

  for (const mfe of mfes) {
    test(`Measure memory for ${mfe}`, async ({ page }) => {
      await page.goto(`/${mfe}`);
      
      // Wait for a bit to let things settle
      await page.waitForTimeout(2000);
      
      const memory = await page.evaluate(() => {
        const perf = performance as any;
        if (perf.memory) {
          return perf.memory.usedJSHeapSize;
        }
        return 0;
      });
      
      results[mfe] = memory / (1024 * 1024); // Convert to MB
    });
  }
});
