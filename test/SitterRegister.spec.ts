import { test, expect } from '@playwright/test';

test('Sitter Registration Form - Simple Test', async ({ page }) => {
  // Navigate to the registration page
  await page.goto('http://localhost:5173/sitterregister');

  // Fill out the registration form
  await page.fill('input[name="name"]', 'John Doe');
  await page.fill('input[name="email"]', 'johndoe@example.com');
  await page.fill('input[name="address"]', '123 Main St');
  await page.fill('input[name="password"]', 'password123');
  await page.fill('input[name="phone"]', '1234567890');

  // Click the submit button
  await page.click('button[type="submit"]');

  // Check if the login link exists (after submission, a redirect might occur)
  await expect(page.locator('text=Already have an account? Login here')).toBeVisible();
});
