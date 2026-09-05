import { test, expect } from '@playwright/test';

test.describe('Interaction Latency Performance', () => {
  const mfes = ['material', 'primeng', 'native'];
  const results: Record<string, any> = {};

  test.afterAll(() => {
    console.log('Interaction Latencies (ms):', results);
  });

  for (const mfe of mfes) {
    test(`Measure interactions for ${mfe}`, async ({ page }) => {
      await page.goto(`/${mfe}/components`); // Update with actual route
      
      results[mfe] = {};

      // Dropdown
      const dropdownStart = await page.evaluate(() => performance.now());
      await page.click('[data-testid="dropdown-trigger"]'); // Update selector
      await page.waitForSelector('[data-testid="dropdown-content"]', { state: 'visible' });
      const dropdownEnd = await page.evaluate(() => performance.now());
      results[mfe].dropdown = dropdownEnd - dropdownStart;

      // Slider (Assuming there's an input type=range or similar)
      const sliderStart = await page.evaluate(() => performance.now());
      const slider = page.locator('[data-testid="slider"]');
      if (await slider.isVisible()) {
          const boundingBox = await slider.boundingBox();
          if (boundingBox) {
            await page.mouse.click(boundingBox.x + boundingBox.width / 2, boundingBox.y + boundingBox.height / 2);
          }
      }
      const sliderEnd = await page.evaluate(() => performance.now());
      results[mfe].slider = sliderEnd - sliderStart;

      // Dialog
      const dialogStart = await page.evaluate(() => performance.now());
      await page.click('[data-testid="dialog-trigger"]');
      await page.waitForSelector('[data-testid="dialog-content"]', { state: 'visible' });
      const dialogEnd = await page.evaluate(() => performance.now());
      results[mfe].dialogOpen = dialogEnd - dialogStart;

      const dialogCloseStart = await page.evaluate(() => performance.now());
      await page.click('[data-testid="dialog-close"]');
      await page.waitForSelector('[data-testid="dialog-content"]', { state: 'hidden' });
      const dialogCloseEnd = await page.evaluate(() => performance.now());
      results[mfe].dialogClose = dialogCloseEnd - dialogCloseStart;
    });
  }
});
