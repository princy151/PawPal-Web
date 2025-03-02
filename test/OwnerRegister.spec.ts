import { test, expect } from '@playwright/test';

test.describe('Register Component Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/ownerregister'); // Navigate to the Register page
  });

  test('Check if the "Name" input field is visible', async ({ page }) => {
    const nameInput = page.locator('input[placeholder="Name"]');
    await expect(nameInput).toBeVisible(); // Check if the input is visible
  });

  test('Check if the "Add Pet" button is visible and clickable', async ({ page }) => {
    const nextButton = page.locator('button:has-text("Next")');
    await nextButton.click(); // Navigate to step 2
    const addPetButton = page.locator('button:has-text("Add Pet")');
    await expect(addPetButton).toBeVisible(); // Check if the button is visible
    await addPetButton.click(); // Click the button
    await expect(page.locator('input[placeholder="Pet Name"]')).toHaveCount(1); // Verify a pet input is added
  });

  test('Check if the "Register" button is visible', async ({ page }) => {
    const nextButton = page.locator('button:has-text("Next")');
    await nextButton.click(); // Navigate to step 2
    const registerButton = page.locator('button:has-text("Register")');
    await expect(registerButton).toBeVisible(); // Check if the button is visible
  });
});