import { test, expect } from '@playwright/test';
import { RegistrationPage } from '../../page_objects/RegistrationPage';

test.describe('Registration form - validation messages', () => {
  let registrationPage: RegistrationPage;

  test.beforeEach(async ({ page }) => {
    registrationPage = new RegistrationPage(page);
    await registrationPage.goto();
  });

  test('empty submit shows First Name and Last Name required errors', async () => {
    await registrationPage.clickSubmitButton();

    await expect(registrationPage.firstNameError).toBeVisible();
    await expect(registrationPage.lastNameError).toBeVisible();
    await expect(registrationPage.confirmationDialog).toBeHidden();
  });

  test('only Last Name error remains when First Name is filled', async () => {
    await registrationPage.setFirstName('Ann');
    await registrationPage.clickSubmitButton();

    await expect(registrationPage.firstNameError).toBeHidden();
    await expect(registrationPage.lastNameError).toBeVisible();
  });

  test('only First Name error remains when Last Name is filled', async () => {
    await registrationPage.setLastName('Lee');
    await registrationPage.clickSubmitButton();

    await expect(registrationPage.firstNameError).toBeVisible();
    await expect(registrationPage.lastNameError).toBeHidden();
  });

  // Validation runs on submit only: typing or blurring does not clear the error (confirm with PO).
  test('required error clears after the field is filled and the form is resubmitted', async () => {
    await registrationPage.clickSubmitButton();
    await expect(registrationPage.firstNameError).toBeVisible();

    await registrationPage.setFirstName('Ann');
    await expect(registrationPage.firstNameError).toBeVisible();

    await registrationPage.clickSubmitButton();
    await expect(registrationPage.firstNameError).toBeHidden();
  });

  test('missing Gender blocks submission', async () => {
    await registrationPage.setFirstName('Ann');
    await registrationPage.setLastName('Lee');
    await registrationPage.checkProgrammingLanguage('Java');
    await registrationPage.clickSubmitButton();

    await expect(registrationPage.confirmationDialog).toBeHidden();
  });

  test('missing Programming language blocks submission', async () => {
    await registrationPage.setFirstName('Ann');
    await registrationPage.setLastName('Lee');
    await registrationPage.selectGender('Male');
    await registrationPage.clickSubmitButton();

    await expect(registrationPage.confirmationDialog).toBeHidden();
  });

  // Known gap G-01 (see test-artifacts/RQ-790-test-strategy.md): the form blocks submission
  // but shows no message for Gender or Programming language. Remove .fail once fixed.
  test('missing Gender and Programming language show error messages', async ({ page }) => {
    test.fail(true, 'G-01: no error message is shown for Gender / Programming language');
    await registrationPage.setFirstName('Ann');
    await registrationPage.setLastName('Lee');
    await registrationPage.clickSubmitButton();

    await expect(page.locator('.chakra-form__error-message')).toHaveCount(2, { timeout: 3000 });
  });
});
