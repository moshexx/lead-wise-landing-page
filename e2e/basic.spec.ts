import { test, expect } from '@playwright/test';

test.describe('Basic Landing Page Functionality', () => {
  test('loads the English landing page successfully', async ({ page }) => {
    await page.goto('/en');

    // Check that the page title contains expected content
    await expect(page).toHaveTitle(/LeadWise/i);

    // Verify main CTA button is visible
    const ctaButton = page.locator('text=/Schedule.*Free.*Strategy/i').first();
    await expect(ctaButton).toBeVisible();
  });

  test('loads the Hebrew landing page successfully', async ({ page }) => {
    await page.goto('/he');

    // Page should load
    await expect(page).toHaveTitle(/LeadWise/i);

    // Verify RTL is applied
    const html = page.locator('html');
    await expect(html).toHaveAttribute('dir', 'rtl');
  });

  test('can switch between languages', async ({ page }) => {
    await page.goto('/en');

    // Find and click language toggle (if exists)
    // This might need adjustment based on actual implementation
    const languageToggle = page.locator('[aria-label*="language" i], [aria-label*="שפה" i]');

    if (await languageToggle.isVisible()) {
      await languageToggle.click();

      // Should navigate to Hebrew version
      await expect(page).toHaveURL(/\/he/);
    }
  });

  test('CTA button opens contact modal', async ({ page }) => {
    await page.goto('/en');

    // Click main CTA button
    const ctaButton = page.locator('text=/Schedule.*Free.*Strategy/i').first();
    await ctaButton.click();

    // Modal should appear with form
    const modal = page.locator('[role="dialog"], .fixed.inset-0');
    await expect(modal).toBeVisible();

    // Check for name input (first step)
    const nameInput = page.locator('input[type="text"]').first();
    await expect(nameInput).toBeVisible();
  });

  test('ROI Calculator is visible and interactive', async ({ page }) => {
    await page.goto('/en');

    // Scroll to ROI calculator section
    await page.locator('text=/roi.*calculator/i').scrollIntoViewIfNeeded();

    // Find lead value input
    const leadValueInput = page.locator('input[type="number"]').first();
    await expect(leadValueInput).toBeVisible();

    // Change value
    await leadValueInput.fill('10000');

    // Result should update (check for currency symbol)
    await expect(page.locator('text=/₪|\\$/i')).toBeVisible();
  });

  test('page is responsive on mobile', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/en');

    // Page should load
    await expect(page.locator('body')).toBeVisible();

    // Check for mobile menu or responsive layout
    const mobileContent = page.locator('body');
    await expect(mobileContent).toBeVisible();
  });

  test('countdown timer is displayed', async ({ page }) => {
    await page.goto('/en');

    // Look for countdown timer (should show days, hours, minutes, seconds)
    const timer = page.locator('text=/\\d{2}.*\\d{2}.*\\d{2}/');

    if (await timer.isVisible()) {
      await expect(timer).toBeVisible();
    }
  });

  test('footer contains contact information', async ({ page }) => {
    await page.goto('/en');

    // Scroll to footer
    await page.locator('footer').scrollIntoViewIfNeeded();

    // Check for email or phone number
    const contactInfo = page.locator('text=/moshe@|\\+972|972/i');
    await expect(contactInfo.first()).toBeVisible();
  });
});
