// Created By AI
// spec: test-artifacts/TC-290-plan.md (Section 1 — Primary Core Workflow, scenario 1.1)
// seed: tests/seed.spec.ts
import { test } from '@playwright/test';
import { LoginPage } from '../../page_objects/LoginPage';
import { HomePage } from '../../page_objects/HomePage';
import { RegistrationPage } from '../../page_objects/RegistrationPage';

test.describe('TC-290 Student Registration Form', () => {
  test('required-name-errors-with-valid-email', { tag: ['@TC-290', '@P0'] }, async ({ page }) => {
    const loginPage = new LoginPage(page);
    const homePage = new HomePage(page);
    const registrationPage = new RegistrationPage(page);

    // 1. Log in at /login with Username "Success" and Password "Success3400"
    await loginPage.goto();
    await loginPage.login('Success', 'Success3400');
    await homePage.verifyHomePageDisplayed();

    // 2. Click the "Practice Form" link
    await homePage.clickPracticeForm();
    await registrationPage.verifyFormDisplayed();

    // 3. Leave First name and Last name empty
    await registrationPage.verifyNameFieldsEmptyWithoutErrors();

    // 4. Type "RexAllenJones@GMail.com" into Email
    await registrationPage.setEmail('RexAllenJones@GMail.com');
    await registrationPage.verifyEmailValue('RexAllenJones@GMail.com');

    // 5. Click Submit
    await registrationPage.clickSubmitButton();
    await registrationPage.verifyNameRequiredErrorsDisplayed();
  });
});
