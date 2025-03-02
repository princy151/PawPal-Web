import { test, expect } from '@playwright/test';

test.describe('Owner Login', () => {

  // Test to check if the email input field is visible
  test('should display the email input field', async ({ page }) => {
    await page.goto('http://localhost:5173/loginowner'); // Adjust to your actual URL
    const emailField = await page.locator('input[name="email"]');
    expect(await emailField.isVisible()).toBe(true);
  });

  // Test to check if the password input field is visible
  test('should display the password input field', async ({ page }) => {
    await page.goto('http://localhost:5173/loginowner'); // Adjust to your actual URL
    const passwordField = await page.locator('input[name="password"]');
    expect(await passwordField.isVisible()).toBe(true);
  });

  // Test to ensure that the "Forgot Password?" link is visible
  test('should display the "Forgot Password?" link', async ({ page }) => {
    await page.goto('http://localhost:5173/loginowner'); // Adjust to your actual URL
    const forgotPasswordLink = await page.locator('a:text("Forgot Password?")');
    expect(await forgotPasswordLink.isVisible()).toBe(true);
  });

  // Test for the error message on invalid login credentials
  test('should show error message for invalid credentials', async ({ page }) => {
    // Navigate to the login page
    await page.goto('http://localhost:5173/loginowner'); // Adjust to your actual URL

    // Fill in the email and password fields with incorrect data
    await page.fill('input[name="email"]', 'invaliduser@example.com');
    await page.fill('input[name="password"]', 'wrongpassword');

    // Click the login button
    await page.click('button[type="submit"]');

    // Wait for the error message to appear
    await page.waitForSelector('.text-red-500'); // Selector for error message

    // Assert that the error message is displayed
    const errorMessage = await page.innerText('.text-red-500');
    expect(errorMessage).toContain('Login failed. Please check your credentials.');
  });

  // Test to ensure that the "Show/Hide" password visibility toggle works
  test('should toggle password visibility when clicking "Show/Hide"', async ({ page }) => {
    // Navigate to the login page
    await page.goto('http://localhost:5173/loginowner'); // Adjust to your actual URL

    // Find the password input field
    const passwordField = page.locator('input[name="password"]');

    // Assert that the password is initially hidden (type="password")
    expect(await passwordField.getAttribute('type')).toBe('password');

    // Click the "Show" button
    await page.click('button[type="button"]');

    // Assert that the password field is now visible (type="text")
    expect(await passwordField.getAttribute('type')).toBe('text');

    // Click the "Hide" button
    await page.click('button[type="button"]');

    // Assert that the password field is hidden again (type="password")
    expect(await passwordField.getAttribute('type')).toBe('password');
  });
});
