const { test, expect } = require('@playwright/test');

test.describe('Summer to Remember', () => {
  test('homepage loads with correct content', async ({ page }) => {
    await page.goto('http://localhost:8081');
    
    // Check title contains our app name
    await expect(page).toHaveTitle(/Summer to Remember/);
    
    // Check main content is present
    await expect(page.getByText('Summer 2024')).toBeVisible();
    await expect(page.getByRole('link', { name: 'Summer to Remember' })).toBeVisible();
  });

  test('basic navigation is present', async ({ page }) => {
    await page.goto('http://localhost:8081');
    
    // Check that navigation structure exists
    await expect(page.getByRole('navigation')).toBeVisible();
    await expect(page.locator('.nav-brand')).toBeVisible();
    
    // On desktop, nav links should be visible
    if (page.viewportSize().width >= 768) {
      await expect(page.locator('.nav-desktop').getByRole('link', { name: 'Dashboard' })).toBeVisible();
    } else {
      // On mobile, check that mobile nav toggle exists
      await expect(page.locator('.nav-toggle')).toBeVisible();
    }
  });

  test('dashboard shows activity stats', async ({ page }) => {
    await page.goto('http://localhost:8081');
    
    // Check that activity stats are visible in the stats row
    await expect(page.locator('.stats-row').getByText('Activities Planned')).toBeVisible();
    await expect(page.locator('.stats-row').getByText('Completed')).toBeVisible();
    await expect(page.locator('.stats-row').getByText('Photos')).toBeVisible();
    await expect(page.locator('.stats-row').getByText('Memories')).toBeVisible();
  });

  test('site works on mobile viewport', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('http://localhost:8081');
    
    // Content should still be accessible
    await expect(page.getByText('Summer 2024')).toBeVisible();
    await expect(page.getByRole('navigation')).toBeVisible();
  });
});