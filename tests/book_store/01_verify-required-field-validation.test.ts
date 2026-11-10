// Created By AI
// spec: test-artifacts/RQ-795-add-book-validation.feature (Scenario-001, Scenario-002)
import { test } from '@playwright/test';
import { AddBookPage } from '../../page_objects/AddBookPage';

test.describe('RQ-795 Add Book form validation and required fields', () => {
  test('Submitting an empty form shows a red required message under every text field and sends no API request',
    { tag: ['@RQ-795', '@P0', '@smoke'] }, async ({ page }) => {
      const addBookPage = new AddBookPage(page);

      // Given I open the Add Book page
      await addBookPage.goto();
      await addBookPage.verifyPageDisplayed();

      // When I click Submit
      await addBookPage.clickSubmit();

      // Then I see these messages in red beneath their fields
      await addBookPage.verifyRequiredErrorsInRed(['ISBN', 'Title', 'Sub Title', 'Author', 'Publisher', 'Description', 'Website']);

      // And no request is sent to the Book Store API
      await addBookPage.verifyNoBookApiRequestSent();
    });

  test('Pages and Publish Date show their own messages on an empty submit', { tag: ['@RQ-795', '@P1'] }, async ({ page }) => {
    const addBookPage = new AddBookPage(page);

    // Given I open the Add Book page
    await addBookPage.goto();

    // When I click Submit
    await addBookPage.clickSubmit();

    // Then I see "Pages must be a number" and "Publish Date must be a date"
    await addBookPage.verifyPagesAndPublishDateErrors();
  });
});
