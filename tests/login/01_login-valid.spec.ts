import { test, expect } from '@playwright/test';
import { LoginPage } from '../../page_objects/LoginPage';

test.describe('Login - valid credentials', () => {
  test('logs in with the demo credentials and lands on the homepage', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();

    await loginPage.login('Success', 'Success3400');

    await expect(page).toHaveURL(/\/homepage/);
    await expect(page.getByRole('link', { name: 'Practice Form' })).toBeVisible();
  });

  test('masks the password field', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();

    await expect(loginPage.passwordField).toHaveAttribute('type', 'password');
  });
});
