import { test, expect } from '@playwright/test';
import { LoginPage } from '../../page_objects/LoginPage';
import { RegistrationPage } from '../../page_objects/RegistrationPage';

test.describe('Registration form - page title', () => {
  test('shows the Practice Form heading and subtitle after navigating from the homepage', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const registrationPage = new RegistrationPage(page);

    await loginPage.goto();
    await loginPage.login('Success', 'Success3400');
    await registrationPage.clickPracticeForm();

    await expect(page).toHaveURL(/\/practice-form/);
    await expect(registrationPage.heading).toBeVisible();
    await expect(registrationPage.subtitle).toBeVisible();
  });

  test('old /automation-practice-form URL redirects to the Practice Form', async ({ page }) => {
    const registrationPage = new RegistrationPage(page);

    await page.goto('/automation-practice-form');

    await expect(page).toHaveURL(/\/practice-form/);
    await expect(registrationPage.heading).toBeVisible();
  });
});
