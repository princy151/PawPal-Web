import { test, expect } from '@playwright/test';

test.describe('Dashboard Component Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/ownerdashboard'); // Navigate to the Dashboard page
  });

  test('Check if the "Pet Sitters" button is visible and clickable', async ({ page }) => {
    const petSittersButton = page.locator('button:has-text("Pet Sitters")');
    await expect(petSittersButton).toBeVisible(); // Check if the button is visible
    await petSittersButton.click(); // Click the button
    await expect(page.locator('text="Available Pet Sitters"')).toBeVisible(); // Verify the correct component is displayed
  });
});