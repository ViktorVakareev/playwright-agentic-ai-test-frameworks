import { test, expect } from '@playwright/test';
import { LoginPage } from '../../page_objects/LoginPage';

test.describe('Login - invalid input', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('shows required errors when both fields are empty', async ({ page }) => {
    await loginPage.loginButton.click();

    await expect(loginPage.usernameError).toBeVisible();
    await expect(loginPage.passwordError).toBeVisible();
    await expect(page).toHaveURL(/\/login/);
  });

  test('shows the username error when only the password is entered', async () => {
    await loginPage.login('', 'Success3400');

    await expect(loginPage.usernameError).toBeVisible();
    await expect(loginPage.passwordError).toBeHidden();
  });

  test('shows the password error when only the username is entered', async () => {
    await loginPage.login('Success', '');

    await expect(loginPage.passwordError).toBeVisible();
    await expect(loginPage.usernameError).toBeHidden();
  });

  test('rejects a password shorter than 6 characters', async ({ page }) => {
    await loginPage.login('Success', 'bad');

    await expect(loginPage.passwordLengthError).toBeVisible();
    await expect(page).toHaveURL(/\/login/);
  });

  test('does not log in with a wrong password', async ({ page }) => {
    await loginPage.login('Success', 'WrongPassword1');

    await expect(page).not.toHaveURL(/\/homepage/);
  });
});
