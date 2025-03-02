import { test, expect } from '@playwright/test';

test.describe('ADDPET Component', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the ADDPET page
    await page.goto('http://localhost:5173/ownerdashboard'); // Adjust the URL as needed
  });

  test('should display the "Pets" section', async ({ page }) => {
    // Check if the "Pets" section is visible
    await expect(page.getByText('Pets')).toBeVisible();
  });
});