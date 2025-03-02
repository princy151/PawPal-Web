import { test, expect } from '@playwright/test';

test.describe('AvailablePetSitters Component Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/ownerdashboard'); // Navigate to the AvailablePetSitters page
  });

  test('Check if the "Available Pet Sitters" heading is visible', async ({ page }) => {
    const heading = page.locator('h3:has-text("Available Pet Sitters")');
    await expect(heading).toBeVisible(); // Check if the heading is visible
  });
});