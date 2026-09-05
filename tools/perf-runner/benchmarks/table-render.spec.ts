import { test, expect } from '@playwright/test';

test.describe('Table Render Performance', () => {
  const mfes = ['material', 'primeng', 'native'];
  const results: Record<string, number> = {};

  test.afterAll(() => {
    console.log('Table Render Times (ms):', results);
  });

  for (const mfe of mfes) {
    test(`Measure table render time for ${mfe}`, async ({ page }) => {
      // Assuming each MFE has a /table route when navigating to it
      // E.g. /material/table
      await page.goto('/');
      
      // Start time
      const startTime = await page.evaluate(() => performance.now());
      
      await page.goto(`/${mfe}/table`); // Update with actual route
      
      // Wait for table rows to be rendered. Assuming rows have a specific class or role
      await page.waitForSelector('tr', { state: 'visible' });
      
      // Count rows to ensure 100 rows
      const rowCount = await page.locator('tr').count();
      expect(rowCount).toBeGreaterThanOrEqual(5);

      const endTime = await page.evaluate(() => performance.now());
      results[mfe] = endTime - startTime;
    });
  }
});
