import { test, expect } from '@playwright/test';
import { RegistrationPage } from '../../page_objects/RegistrationPage';

const OPTIONAL_ROWS = ['Student Email', 'Mobile', 'Date of Birth', 'Address', 'Country', 'State / Province', 'City / County'];

test.describe('Registration form - partial fields', () => {
  let registrationPage: RegistrationPage;

  test.beforeEach(async ({ page }) => {
    registrationPage = new RegistrationPage(page);
    await registrationPage.goto();
    await registrationPage.setFirstName('Ann');
    await registrationPage.setLastName('Lee');
    await registrationPage.selectGender('Male');
    await registrationPage.checkProgrammingLanguage('Java');
  });

  test('submits with only the mandatory fields and leaves optional rows empty', async () => {
    await registrationPage.clickSubmitButton();

    await expect(registrationPage.confirmationTitle).toBeVisible();
    await expect(registrationPage.dialogValue('Student Name')).toHaveText('Ann Lee');
    await expect(registrationPage.dialogValue('Gender')).toHaveText('Male');
    await expect(registrationPage.dialogValue('Programming Language')).toHaveText('Java');
    for (const row of OPTIONAL_ROWS) {
      await expect(registrationPage.dialogValue(row), `${row} should be empty`).toHaveText('');
    }
  });

  test('submits with mandatory fields plus Email and Mobile', async () => {
    await registrationPage.setEmail('ann@example.com');
    await registrationPage.setMobile('5551234567');
    await registrationPage.clickSubmitButton();

    await expect(registrationPage.dialogValue('Student Email')).toHaveText('ann@example.com');
    await expect(registrationPage.dialogValue('Mobile')).toHaveText('5551234567');
    await expect(registrationPage.dialogValue('Address')).toHaveText('');
  });

  test('submits with Country only, leaving State and City empty', async () => {
    await registrationPage.selectCountry('Canada');
    await registrationPage.clickSubmitButton();

    await expect(registrationPage.dialogValue('Country')).toHaveText('Canada');
    await expect(registrationPage.dialogValue('State / Province')).toHaveText('');
    await expect(registrationPage.dialogValue('City / County')).toHaveText('');
  });

  test('lists every selected programming language', async () => {
    await registrationPage.checkProgrammingLanguage('TypeScript');
    await registrationPage.checkProgrammingLanguage('C#');
    await registrationPage.clickSubmitButton();

    const languages = registrationPage.dialogValue('Programming Language');
    await expect(languages).toContainText('Java');
    await expect(languages).toContainText('TypeScript');
    await expect(languages).toContainText('C#');
    await expect(languages).not.toContainText('JavaScript');
  });

  test('keeps the entered values after the confirmation dialog is closed', async () => {
    await registrationPage.clickSubmitButton();
    await registrationPage.closeConfirmationDialog();

    await expect(registrationPage.confirmationDialog).toBeHidden();
    await expect(registrationPage.firstNameField).toHaveValue('Ann');
    await expect(registrationPage.programmingLanguageCheckbox('Java')).toBeChecked();
  });
});
