import { type Page, type Locator } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly usernameField: Locator;
  readonly passwordField: Locator;
  readonly loginButton: Locator;
  readonly forgotPasswordLink: Locator;
  readonly usernameError: Locator;
  readonly passwordError: Locator;
  readonly passwordLengthError: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameField = page.getByRole('textbox', { name: 'Username' });
    this.passwordField = page.getByRole('textbox', { name: 'Password' });
    this.loginButton = page.getByRole('button', { name: 'Login' });
    this.forgotPasswordLink = page.getByRole('link', { name: 'Forgot your password?' });
    this.usernameError = page.getByText('Username is a required field');
    this.passwordError = page.getByText('Password is a required field');
    this.passwordLengthError = page.getByText('Password must be at least 6 characters');
  }

  public async goto(): Promise<void> {
    await this.page.goto('/login');
  }

  public async login(username: string, password: string): Promise<void> {
    await this.usernameField.fill(username);
    await this.passwordField.fill(password);
    await this.loginButton.click();
  }
}
