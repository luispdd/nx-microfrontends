import { test, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

test.describe('Route Load Performance', () => {
  const mfes = ['material', 'primeng', 'native'];
  const results: Record<string, number> = {};

  test.afterAll(() => {
    console.log('Route Load Times (ms):', results);
    // Write results to a file if needed
    fs.mkdirSync(path.join(process.cwd(), 'test-results'), { recursive: true });
    fs.writeFileSync(
      path.join(process.cwd(), 'test-results', 'route-load.json'),
      JSON.stringify(results, null, 2)
    );
  });

  for (const mfe of mfes) {
    test(`Measure load time for ${mfe}`, async ({ page }) => {
      await page.goto('/');
      
      const startTime = Date.now();
      await page.click(`text=${mfe}`); // Assuming links with text
      
      // Wait for network idle to ensure fully loaded
      await page.waitForLoadState('networkidle');
      
      const endTime = Date.now();
      results[mfe] = endTime - startTime;
      
      // Basic assertion to ensure page loaded
      await expect(page).not.toHaveURL('/');
    });
  }
});
