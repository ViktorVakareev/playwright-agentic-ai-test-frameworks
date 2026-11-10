// Created By AI — Add Book page (RQ:795, RQ:796)
// DOM reference: .playwright-cli/rq795-01-add-book.yml, rq795-02-empty-submit.yml, rq796-02-after-alert.yml
import { type Page, type Locator, type Request, type Response, expect } from '@playwright/test';

export type TextField = 'ISBN' | 'Title' | 'Sub Title' | 'Author' | 'Publisher' | 'Description' | 'Website';

export interface Book {
  isbn: string;
  title: string;
  subTitle: string;
  author: string;
  publisher: string;
  pages: number;
  publishDate: { day: number; month: string; year: number };
  description: string;
  website: string;
}

/** Chakra UI "red.500" — the colour the error messages render in. */
const ERROR_RED = 'rgb(229, 62, 62)';
const BOOK_API = /api\.rexjones2\.com\/api\/books/;

export class AddBookPage {
  readonly page: Page;
  readonly heading: Locator;
  readonly isbnField: Locator;
  readonly titleField: Locator;
  readonly subTitleField: Locator;
  readonly authorField: Locator;
  readonly publisherField: Locator;
  readonly pagesField: Locator;
  readonly publishDateField: Locator;
  readonly descriptionField: Locator;
  readonly websiteField: Locator;
  readonly submitButton: Locator;
  readonly pagesError: Locator;
  readonly publishDateError: Locator;
  readonly datePickerCalendar: Locator;
  readonly datePickerYearSelect: Locator;
  readonly datePickerMonthSelect: Locator;

  private readonly bookApiRequests: Request[] = [];
  private lastDialogMessage: string | null = null;
  private lastBookApiResponse: Response | null = null;

  constructor(page: Page) {
    this.page = page;
    // Healed: the sidebar also has <h2><a>Add Book</a></h2>; exclude headings that wrap a link.
    this.heading = page.getByRole('heading', { name: 'Add Book', exact: true }).filter({ hasNot: page.getByRole('link') });
    // exact: true — "Title" would otherwise also match "Sub Title"
    this.isbnField = page.getByRole('textbox', { name: 'ISBN', exact: true });
    this.titleField = page.getByRole('textbox', { name: 'Title', exact: true });
    this.subTitleField = page.getByRole('textbox', { name: 'Sub Title', exact: true });
    this.authorField = page.getByRole('textbox', { name: 'Author', exact: true });
    this.publisherField = page.getByRole('textbox', { name: 'Publisher', exact: true });
    this.pagesField = page.getByRole('spinbutton', { name: 'Pages', exact: true });
    this.publishDateField = page.getByRole('textbox', { name: 'Publish Date', exact: true });
    this.descriptionField = page.getByRole('textbox', { name: 'Description', exact: true });
    this.websiteField = page.getByRole('textbox', { name: 'Website', exact: true });
    this.submitButton = page.getByRole('button', { name: 'Submit' });
    this.pagesError = page.getByText('Pages must be a number', { exact: true });
    this.publishDateError = page.getByText('Publish Date must be a date', { exact: true });
    this.datePickerCalendar = page.locator('.react-datepicker');
    this.datePickerYearSelect = this.datePickerCalendar.locator('.react-datepicker__year-select');
    this.datePickerMonthSelect = this.datePickerCalendar.locator('.react-datepicker__month-select');

    page.on('request', (request) => {
      if (request.method() === 'POST' && BOOK_API.test(request.url())) this.bookApiRequests.push(request);
    });
  }

  // ---------- actions ----------

  public async goto(): Promise<void> {
    await this.page.goto('/add-book');
  }

  public requiredError(field: TextField): Locator {
    return this.page.getByText(`${field} is a required field`, { exact: true });
  }

  public async pickPublishDate(day: number, month: string, year: number): Promise<void> {
    await this.publishDateField.click();
    await this.datePickerCalendar.waitFor();
    await this.datePickerYearSelect.selectOption(String(year));
    await this.datePickerMonthSelect.selectOption({ label: month });
    const suffix = day % 10 === 1 && day !== 11 ? 'st' : day % 10 === 2 && day !== 12 ? 'nd' : day % 10 === 3 && day !== 13 ? 'rd' : 'th';
    await this.datePickerCalendar.getByRole('option', { name: new RegExp(`, ${month} ${day}${suffix}, ${year}$`) }).click();
  }

  public async fillBook(book: Book): Promise<void> {
    await this.isbnField.fill(book.isbn);
    await this.titleField.fill(book.title);
    await this.subTitleField.fill(book.subTitle);
    await this.authorField.fill(book.author);
    await this.publisherField.fill(book.publisher);
    await this.pagesField.fill(String(book.pages));
    await this.pickPublishDate(book.publishDate.day, book.publishDate.month, book.publishDate.year);
    await this.descriptionField.fill(book.description);
    await this.websiteField.fill(book.website);
  }

  public async clickSubmit(): Promise<void> {
    await this.submitButton.click();
  }

  /**
   * Submits a valid form, waits for the Book Store API response AND the native alert
   * (healed: the alert opens only after the API responds, ~3 s later), then accepts the alert.
   */
  public async submitValidBook(): Promise<void> {
    const response = this.page.waitForResponse((r) => r.request().method() === 'POST' && BOOK_API.test(r.url()));
    const dialog = this.page.waitForEvent('dialog', { timeout: 15_000 });
    await this.submitButton.click();
    this.lastBookApiResponse = await response;
    const alert = await dialog;
    this.lastDialogMessage = alert.message();
    await alert.accept();
  }

  // ---------- verifications ----------

  public async verifyPageDisplayed(): Promise<void> {
    await expect(this.page).toHaveURL(/\/add-book/);
    await expect(this.heading).toBeVisible();
  }

  /** RQ:795 AC1 — each message is visible and rendered in red. */
  public async verifyRequiredErrorsInRed(fields: TextField[]): Promise<void> {
    for (const field of fields) {
      const error = this.requiredError(field);
      await expect(error, `${field} error`).toBeVisible();
      await expect(error, `${field} error colour`).toHaveCSS('color', ERROR_RED);
    }
  }

  public async verifyPagesAndPublishDateErrors(): Promise<void> {
    await expect(this.pagesError).toBeVisible();
    await expect(this.publishDateError).toBeVisible();
  }

  /** RQ:795 AC2 — call after the error messages are visible, so the submit handler has finished. */
  public async verifyNoBookApiRequestSent(): Promise<void> {
    expect(this.bookApiRequests, 'POST requests to the Book Store API').toHaveLength(0);
  }

  public async verifySuccessConfirmed(): Promise<void> {
    expect(this.lastDialogMessage, 'confirmation alert').toBe('Success');
  }

  /** RQ:796 — the create request carries all nine values. */
  public async verifyCreateRequestPayload(book: Book): Promise<void> {
    expect(this.lastBookApiResponse, 'Book Store API response').not.toBeNull();
    const payload = this.lastBookApiResponse!.request().postDataJSON();
    expect(payload).toMatchObject({
      isbn: book.isbn,
      title: book.title,
      subTitle: book.subTitle,
      author: book.author,
      publisher: book.publisher,
      pages: book.pages,
      description: book.description,
      website: book.website,
    });
    expect(payload.publishDate, 'publishDate is sent').toBeTruthy();
  }

  /** RQ:796 AC1 — the API accepted the record. */
  public async verifyBookPersisted(): Promise<void> {
    expect(this.lastBookApiResponse, 'Book Store API response').not.toBeNull();
    expect(this.lastBookApiResponse!.ok(), `API status ${this.lastBookApiResponse!.status()}`).toBe(true);
  }

  /** RQ:796 AC2 — the form state is reset after a successful submit. */
  public async verifyFormCleared(): Promise<void> {
    for (const field of [this.isbnField, this.titleField, this.subTitleField, this.authorField, this.publisherField,
      this.pagesField, this.publishDateField, this.descriptionField, this.websiteField]) {
      await expect(field).toBeEmpty();
    }
  }
}
