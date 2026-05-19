import { BasePage } from '../base/BasePage';
import { SERVICE_URL } from '../../config/env-data';
import { Page, Locator, expect } from '@playwright/test';
import { Button } from '../atom/Button';

export class LoginPage extends BasePage {
  readonly url: string = SERVICE_URL;
  readonly signInButton: Button;
  readonly usernameField: Locator;
  readonly passwordField: Locator;
  readonly credentialsBlock: Locator;
  readonly passwordBlock: Locator;
  readonly errorMessageInLogin: Locator;
  readonly errorButtonExit: Locator;

  constructor(page: Page) {
    super(page);
    this.signInButton = new Button(page.getByTestId('login-button'));
    this.usernameField = page.getByTestId('username');
    this.passwordField = page.getByTestId('password');
    this.credentialsBlock = page.getByTestId('login-credentials');
    this.passwordBlock = page.getByTestId('login-password');
    this.errorMessageInLogin = page.getByTestId('error');
    this.errorButtonExit = page.getByTestId('error-button');
  }

  async open() {
    await this.page.goto(this.url);
  }

  async checkVisibleInLoginPage() {
    await expect(this.usernameField).toBeVisible();
    await expect(this.passwordField).toBeVisible();
    await this.signInButton.checkVisibleButton(true);
    await expect(this.credentialsBlock).toBeVisible();
    await expect(this.passwordBlock).toBeVisible();
  }

  async login(username: string, password: string) {
    await this.usernameField.fill(username);
    await this.passwordField.fill(password);
    await this.signInButton.clickButton();
  }

  async checkErrorMessageText(): Promise<this> {
    await expect(this.errorMessageInLogin).toBeVisible();
    await expect(this.errorMessageInLogin).toContainText(
      'Epic sadface: Sorry, this user has been locked out.'
    );
    await expect(this.errorButtonExit).toBeVisible();
    await this.errorButtonExit.click();
    return this; // back to LoginPage
  }

  async checkSuccessfulLogin(): Promise<this> {
    await expect(this.page).toHaveURL(/.*inventory.html/);
    return this;
  }
}
