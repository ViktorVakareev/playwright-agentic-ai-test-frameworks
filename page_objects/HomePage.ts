// Created By AI — Home page shown after login (required by TC:290 Step 1)
// DOM reference: .playwright-cli/tc290-02-home.yml
import { type Page, type Locator, expect } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly logoutButton: Locator;
  readonly practiceFormLink: Locator;
  readonly practiceAutLink: Locator;
  readonly shadowDomLink: Locator;
  readonly uploadDownloadLink: Locator;
  readonly sectionLabels: Locator[];

  constructor(page: Page) {
    this.page = page;
    this.logoutButton = page.getByRole('button', { name: 'Logout' });
    this.practiceFormLink = page.getByRole('link', { name: 'Practice Form' });
    this.practiceAutLink = page.getByRole('link', { name: 'Practice AUT' });
    this.shadowDomLink = page.getByRole('link', { name: 'Shadow DOM' });
    this.uploadDownloadLink = page.getByRole('link', { name: 'Upload & Download' });
    this.sectionLabels = [
      'HTML Elements',
      'Date Picker / Select',
      'Dynamic Waits',
      'Dialogs, Alerts, Windows, Frames',
      'Actions',
      'Book Store Application',
    ].map((label) => page.getByText(label, { exact: true }));
  }

  /** TC:290 Step 1 expected result: the home page lists the test pages. */
  public async verifyHomePageDisplayed(): Promise<void> {
    await expect(this.page).toHaveURL(/\/homepage/);
    await expect(this.logoutButton).toBeVisible();
    for (const link of [this.practiceFormLink, this.practiceAutLink, this.shadowDomLink, this.uploadDownloadLink]) {
      await expect(link).toBeVisible();
    }
    for (const label of this.sectionLabels) {
      await expect(label).toBeVisible();
    }
  }

  public async clickPracticeForm(): Promise<void> {
    await this.practiceFormLink.click();
  }
}
