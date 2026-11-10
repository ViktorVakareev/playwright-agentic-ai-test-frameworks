// Created By AI
// spec: test-artifacts/RQ-790-student-registration.feature (Scenario-001, @P0 @smoke)
// page objects: page_objects/RegistrationPage.ts
import { test, expect } from '@playwright/test';
import { RegistrationPage } from '../../page_objects/RegistrationPage';

test.describe('Student Registration Form', () => {
  test('Submit the form with all fields valid', { tag: ['@P0', '@smoke', '@RQ-790', '@Scenario-001'] }, async ({ page }) => {
    const registrationPage = new RegistrationPage(page);

    // Background: Given I open the Student Registration Form page
    await registrationPage.goto();
    await expect(registrationPage.subtitle).toBeVisible();

    // When I enter "Ann" as First name and "Lee" as Last name
    await registrationPage.setFirstName('Ann');
    await registrationPage.setLastName('Lee');

    // And I select the "Female" gender
    await registrationPage.selectGender('Female');

    // And I enter "5551234567" as Mobile and "ann@example.com" as Email
    await registrationPage.setMobile('5551234567');
    await registrationPage.setEmail('ann@example.com');

    // And I pick "5 November, 2006" as Date of birth from the calendar
    await registrationPage.pickDateOfBirthFromCalendar(5, 'November', 2006);

    // And I enter "1 Main St" as Current Address
    await registrationPage.setCurrentAddress('1 Main St');

    // And I check the "Python" programming language
    await registrationPage.checkProgrammingLanguage('Python');

    // And I select "USA", then "Texas", then "Abernathy" as Country, State and City
    await registrationPage.selectCountry('USA');
    await registrationPage.selectState('Texas');
    await registrationPage.selectCity('Abernathy');

    // And I click Submit
    await registrationPage.clickSubmitButton();

    // Then the "Thanks for submitting the form" dialog is displayed
    await expect(registrationPage.confirmationTitle).toBeVisible();

    // And the dialog shows "Student Name" as "Ann Lee"
    await expect(registrationPage.dialogValue('Student Name')).toHaveText('Ann Lee');

    // And the dialog shows "Student Email" as "ann@example.com"
    await expect(registrationPage.dialogValue('Student Email')).toHaveText('ann@example.com');

    // And the dialog shows "Gender" as "Female"
    await expect(registrationPage.dialogValue('Gender')).toHaveText('Female');

    // And the dialog shows "Mobile" as "5551234567"
    await expect(registrationPage.dialogValue('Mobile')).toHaveText('5551234567');

    // And the dialog shows "Date of Birth" as "5 November, 2006"
    await expect(registrationPage.dialogValue('Date of Birth')).toHaveText('5 November, 2006');

    // And the dialog shows "Address" as "1 Main St"
    await expect(registrationPage.dialogValue('Address')).toHaveText('1 Main St');

    // And the dialog shows "Programming Language" as "Python"
    await expect(registrationPage.dialogValue('Programming Language')).toHaveText('Python');

    // And the dialog shows "Country" as "USA", "State / Province" as "Texas" and "City / County" as "Abernathy"
    await expect(registrationPage.dialogValue('Country')).toHaveText('USA');
    await expect(registrationPage.dialogValue('State / Province')).toHaveText('Texas');
    await expect(registrationPage.dialogValue('City / County')).toHaveText('Abernathy');
  });
});
