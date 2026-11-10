// Created By AI
// spec: test-artifacts/RQ-796-add-book-success.feature (Scenario-001, Scenario-002)
import { test } from '@playwright/test';
import { AddBookPage, type Book } from '../../page_objects/AddBookPage';

const validBook = (): Book => ({
  isbn: `AI-TEST-${Date.now()}`,
  title: 'Agentic Playwright Testing',
  subTitle: 'An AI-assisted guide',
  author: 'Test Author',
  publisher: 'Test Press',
  pages: 250,
  publishDate: { day: 15, month: 'May', year: 2024 },
  description: 'Created by AI test run - safe to delete',
  website: 'https://example.com/book',
});

test.describe('RQ-796 Successful catalog entry creation', () => {
  test('Submitting all nine valid fields confirms success and clears the form', { tag: ['@RQ-796', '@P0', '@smoke'] }, async ({ page }) => {
    const addBookPage = new AddBookPage(page);
    const book = validBook();

    // Given I open the Add Book page
    await addBookPage.goto();

    // When I fill all nine fields with valid data
    await addBookPage.fillBook(book);

    // And I click Submit
    await addBookPage.submitValidBook();

    // Then a "Success" confirmation is shown
    await addBookPage.verifySuccessConfirmed();

    // And a create request carrying all nine values is sent to the Book Store API
    await addBookPage.verifyCreateRequestPayload(book);

    // And every field is cleared
    await addBookPage.verifyFormCleared();
  });

  // GAP-796-1 BLOCKER: the API returns 403 (request sent with "Authorization: Bearer null") although the UI
  // reports "Success". Needs Book Store credentials and a PO decision — see test-artifacts/RQ-796-add-book-success.feature.
  test.fixme('The submitted book is persisted in the catalog', { tag: ['@RQ-796', '@P0', '@blocked'] }, async ({ page }) => {
    const addBookPage = new AddBookPage(page);

    // Given I am logged in to the Book Store (credentials not yet provided)
    await addBookPage.goto();

    // When I submit all nine fields with valid data
    await addBookPage.fillBook(validBook());
    await addBookPage.submitValidBook();

    // Then the Book Store API responds with a success status
    await addBookPage.verifyBookPersisted();
  });
});
