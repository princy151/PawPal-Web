import { test, expect } from '@playwright/test';

test.describe('AppointmentCalendar Component Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/mybookings'); // Navigate to the AppointmentCalendar page
  });
  test('Check if the page has a title', async ({ page }) => {
    const title = await page.title();
    expect(title).toBeTruthy(); // Check if the page has a title
  });
test('Check if the page contains a heading', async ({ page }) => {
    const heading = page.locator('h3');
    await expect(heading).toBeVisible(); // Check if a heading is present
  });
});
