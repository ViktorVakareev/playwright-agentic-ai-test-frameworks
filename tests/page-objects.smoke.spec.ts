import { test, expect } from '@playwright/test';
import { LoginPage } from '../page_objects/LoginPage';
import { RegistrationPage } from '../page_objects/RegistrationPage';

test.describe('Page object smoke', () => {
  test('login, open Practice Form and submit a full registration', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const registrationPage = new RegistrationPage(page);

    await loginPage.goto();
    await loginPage.login('Success', 'Success3400');
    await expect(page).toHaveURL(/\/homepage/);

    await registrationPage.clickPracticeForm();
    await expect(registrationPage.heading).toBeVisible();

    await registrationPage.setFirstName('Ann');
    await registrationPage.setLastName('Lee');
    await registrationPage.selectGender('Female');
    await registrationPage.setMobile('5551234567');
    await registrationPage.setEmail('ann@example.com');
    await registrationPage.setDateOfBirth('03/15/2000');
    await registrationPage.setCurrentAddress('1 Main St');
    await registrationPage.checkProgrammingLanguage('Java');
    await registrationPage.selectCountry('USA');
    await registrationPage.selectState('Texas');
    await registrationPage.selectCity('Austin');
    await registrationPage.clickSubmitButton();

    await expect(registrationPage.confirmationTitle).toBeVisible();
    await expect(registrationPage.dialogValue('Student Name')).toHaveText('Ann Lee');
    await expect(registrationPage.dialogValue('Gender')).toHaveText('Female');
    await expect(registrationPage.dialogValue('Date of Birth')).toHaveText('15 March, 2000');
    await expect(registrationPage.dialogValue('Programming Language')).toHaveText('Java');
    await expect(registrationPage.dialogValue('City / County')).toHaveText('Austin');

    await registrationPage.closeConfirmationDialog();
    await expect(registrationPage.confirmationDialog).toBeHidden();
  });

  test('empty login and empty registration show required errors', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.loginButton.click();
    await expect(loginPage.usernameError).toBeVisible();
    await expect(loginPage.passwordError).toBeVisible();

    const registrationPage = new RegistrationPage(page);
    await registrationPage.goto();
    await registrationPage.clickSubmitButton();
    await expect(registrationPage.firstNameError).toBeVisible();
    await expect(registrationPage.lastNameError).toBeVisible();
  });
});
