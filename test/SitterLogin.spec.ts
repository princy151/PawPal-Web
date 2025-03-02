import { test, expect } from '@playwright/test';

test.describe('Owner Login', () => {

//   test('should login successfully with correct credentials', async ({ page }) => {
//     // Navigate to the login page
//     await page.goto('http://localhost:5173/loginowner'); // Adjust the URL as needed

//     // Fill in the email and password fields with valid data
//     await page.fill('input[name="email"]', 'testuser@example.com');
//     await page.fill('input[name="password"]', 'password123');

//     // Click the login button
//     await page.click('button[type="submit"]');

//     // Wait for the navigation to happen (page redirection)
//     await page.waitForNavigation();

//     // Check if localStorage contains the token and sitterId
//     const token = await page.evaluate(() => localStorage.getItem('token'));
//     const sitterId = await page.evaluate(() => localStorage.getItem('sitterId'));

//     // Assert that the token and sitterId are set
//     expect(token).not.toBeNull();
//     expect(sitterId).not.toBeNull();

//     // Check if the page navigates to the correct dashboard
//     expect(page.url()).toContain('/sitterdashboard');
//   });

  test('should show error message for invalid credentials', async ({ page }) => {
    // Navigate to the login page
    await page.goto('http://localhost:5173/loginowner'); // Adjust the URL as needed

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

  test('should toggle password visibility when clicking "Show/Hide"', async ({ page }) => {
    // Navigate to the login page
    await page.goto('http://localhost:5173/loginowner'); // Adjust the URL as needed

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

  test('should display error message if email is empty', async ({ page }) => {
    // Navigate to the login page
    await page.goto('http://localhost:5173/loginowner'); // Adjust the URL as needed

    // Leave the email field empty and fill in the password
    await page.fill('input[name="password"]', 'password123');

    // Click the login button
    await page.click('button[type="submit"]');

    // Wait for the error message
    await page.waitForSelector('.text-red-500');

    // Assert that the error message contains the expected text
    const errorMessage = await page.innerText('.text-red-500');
    expect(errorMessage).toContain('Login failed. Please check your credentials.');
  });

  test('should display error message if password is empty', async ({ page }) => {
    // Navigate to the login page
    await page.goto('http://localhost:5173/loginowner'); // Adjust the URL as needed

    // Fill the email field and leave the password empty
    await page.fill('input[name="email"]', 'testuser@example.com');

    // Click the login button
    await page.click('button[type="submit"]');

    // Wait for the error message
    await page.waitForSelector('.text-red-500');

    // Assert that the error message contains the expected text
    const errorMessage = await page.innerText('.text-red-500');
    expect(errorMessage).toContain('Login failed. Please check your credentials.');
  });
});

