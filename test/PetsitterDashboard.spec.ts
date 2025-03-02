import { test, expect } from '@playwright/test';

test.describe('PetSitterDashboard Component Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/sitterdashboard'); // Navigate to the PetSitterDashboard page
  });

  test('Check if the "Welcome Pet Sitter" heading is visible', async ({ page }) => {
    const heading = page.locator('h1:has-text("Welcome Pet Sitter")');
    await expect(heading).toBeVisible(); // Check if the heading is visible
  });

  test('Check if the "View Details" button opens the modal', async ({ page }) => {
    const viewDetailsButton = page.locator('button:has-text("View Details")').first();
    await viewDetailsButton.click(); // Click the first "View Details" button
    const modal = page.locator('text="Owner Details"'); // Locate the modal
    await expect(modal).toBeVisible(); // Check if the modal is visible
  });

  test('Check if the date pickers are functional', async ({ page }) => {
    const viewDetailsButton = page.locator('button:has-text("View Details")').first();
    await viewDetailsButton.click(); // Open the modal
    const startDatePicker = page.locator('input[type="date"]').first(); // Locate the start date picker
    const endDatePicker = page.locator('input[type="date"]').nth(1); // Locate the end date picker

    // Set a start date
    await startDatePicker.fill('2023-10-01');
    expect(await startDatePicker.inputValue()).toBe('2023-10-01'); // Verify the start date

    // Set an end date
    await endDatePicker.fill('2023-10-05');
    expect(await endDatePicker.inputValue()).toBe('2023-10-05'); // Verify the end date
  });

  test('Check if the "Close" button in the modal works', async ({ page }) => {
    const viewDetailsButton = page.locator('button:has-text("View Details")').first();
    await viewDetailsButton.click(); // Open the modal
    const closeButton = page.locator('button:has-text("Close")'); // Locate the close button
    await closeButton.click(); // Click the close button
    const modal = page.locator('text="Owner Details"'); // Locate the modal
    await expect(modal).not.toBeVisible(); // Check if the modal is closed
  });
});