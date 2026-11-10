import { type Page, type Locator } from '@playwright/test';

export type Gender = 'Male' | 'Female' | 'Other';
export type ProgrammingLanguage = 'Java' | 'Python' | 'JavaScript' | 'TypeScript' | 'C#';

export class RegistrationPage {
  readonly page: Page;

  // Navigation
  readonly practiceFormLink: Locator;
  readonly heading: Locator;
  readonly subtitle: Locator;

  // Fields
  readonly firstNameField: Locator;
  readonly lastNameField: Locator;
  readonly mobileField: Locator;
  readonly emailField: Locator;
  readonly dateOfBirthField: Locator;
  readonly currentAddressField: Locator;
  readonly countrySelect: Locator;
  readonly stateSelect: Locator;
  readonly citySelect: Locator;
  readonly submitButton: Locator;

  // Validation errors
  readonly firstNameError: Locator;
  readonly lastNameError: Locator;

  // Confirmation dialog
  readonly confirmationDialog: Locator;
  readonly confirmationTitle: Locator;
  readonly dialogCloseButton: Locator;
  readonly dialogCloseIcon: Locator;

  constructor(page: Page) {
    this.page = page;

    this.practiceFormLink = page.getByRole('link', { name: 'Practice Form' });
    this.heading = page.getByRole('heading', { name: 'Practice Form' });
    this.subtitle = page.getByText('Student Registration Form', { exact: true });

    this.firstNameField = page.locator('#first_name');
    this.lastNameField = page.locator('#last_name');
    this.mobileField = page.locator('#mobile');
    this.emailField = page.locator('#email');
    this.dateOfBirthField = page.locator('.react-datepicker-wrapper input');
    this.currentAddressField = page.locator('#current_address');
    // The three dropdowns have no id/name/label association, so they are matched by their placeholder option.
    this.countrySelect = page.locator('select').filter({ has: page.locator('option', { hasText: 'Select Country:' }) });
    this.stateSelect = page.locator('select').filter({ has: page.locator('option', { hasText: 'Select State / Province:' }) });
    this.citySelect = page.locator('select').filter({ has: page.locator('option', { hasText: 'Select City / County:' }) });
    this.submitButton = page.getByRole('button', { name: 'Submit' });

    this.firstNameError = page.getByText('First Name is a required field');
    this.lastNameError = page.getByText('Last Name is a required field');

    this.confirmationDialog = page.getByRole('dialog');
    this.confirmationTitle = this.confirmationDialog.getByText('Thanks for submitting the form').first();
    this.dialogCloseButton = this.confirmationDialog.getByText('Close', { exact: true });
    this.dialogCloseIcon = this.confirmationDialog.getByLabel('Close');
  }

  public async goto(): Promise<void> {
    await this.page.goto('/practice-form');
  }

  public async clickPracticeForm(): Promise<void> {
    await this.practiceFormLink.click();
  }

  public async setFirstName(firstName: string): Promise<void> {
    await this.firstNameField.fill(firstName);
  }

  public async setLastName(lastName: string): Promise<void> {
    await this.lastNameField.fill(lastName);
  }

  /** Radios are visually styled, so a forced check is required. data-testid avoids "Male" matching "Female". */
  public async selectGender(gender: Gender): Promise<void> {
    await this.genderRadio(gender).check({ force: true });
  }

  public genderRadio(gender: Gender): Locator {
    return this.page.getByTestId(gender.toLowerCase());
  }

  public async setMobile(mobile: string): Promise<void> {
    await this.mobileField.fill(mobile);
  }

  public async setEmail(email: string): Promise<void> {
    await this.emailField.fill(email);
  }

  /** Types a date (e.g. "03/15/2000") and closes the calendar. */
  public async setDateOfBirth(date: string): Promise<void> {
    await this.dateOfBirthField.fill(date);
    await this.dateOfBirthField.press('Enter');
  }

  public async setCurrentAddress(address: string): Promise<void> {
    await this.currentAddressField.fill(address);
  }

  /** Uses the element id, so "Java" never matches "JavaScript". */
  public async checkProgrammingLanguage(language: ProgrammingLanguage): Promise<void> {
    await this.programmingLanguageCheckbox(language).check({ force: true });
  }

  public programmingLanguageCheckbox(language: ProgrammingLanguage): Locator {
    return this.page.locator(`[id="${language}"]`);
  }

  public async selectCountry(country: string): Promise<void> {
    await this.countrySelect.selectOption({ label: country });
  }

  public async selectState(state: string): Promise<void> {
    await this.stateSelect.locator('option', { hasText: state }).waitFor({ state: 'attached' });
    await this.stateSelect.selectOption({ label: state });
  }

  public async selectCity(city: string): Promise<void> {
    await this.citySelect.locator('option', { hasText: city }).first().waitFor({ state: 'attached' });
    await this.citySelect.selectOption({ label: city });
  }

  public async clickSubmitButton(): Promise<void> {
    await this.submitButton.click();
  }

  /** Returns the value shown next to a label in the confirmation dialog, e.g. "Student Name". */
  public dialogValue(label: string): Locator {
    return this.confirmationDialog.getByRole('row').filter({ has: this.page.getByRole('cell', { name: label, exact: true }) }).getByRole('cell').nth(1);
  }

  public async closeConfirmationDialog(): Promise<void> {
    await this.dialogCloseButton.click();
  }
}
