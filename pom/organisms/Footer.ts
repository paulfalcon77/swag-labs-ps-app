import { expect, Locator, Page } from '@playwright/test';

export class Footer {
  readonly socialTwitterButton: Locator;
  readonly socialFacebookButton: Locator;
  readonly socialLinkedInButton: Locator;
  readonly footerMessage: Locator;

  constructor(page: Page) {
    this.socialTwitterButton = page.getByTestId('social-twitter');
    this.socialFacebookButton = page.getByTestId('social-facebook');
    this.socialLinkedInButton = page.getByTestId('social-linkedin');
    this.footerMessage = page.getByTestId('footer-copy');
  }

  async checkVisibleFooter() {
    await expect(this.socialTwitterButton).toBeVisible();
    await expect(this.socialFacebookButton).toBeVisible();
    await expect(this.socialLinkedInButton).toBeVisible();
    await expect(this.footerMessage).toBeVisible();
    await expect(this.footerMessage).toHaveText(
      '© 2026 Sauce Labs. All Rights Reserved. Terms of Service | Privacy Policy'
    );
  }

  async checkFooterLink() {
    await expect(this.socialTwitterButton).toHaveAttribute('href', 'https://twitter.com/saucelabs');
    await expect(this.socialFacebookButton).toHaveAttribute(
      'href',
      'https://www.facebook.com/saucelabs'
    );
    await expect(this.socialLinkedInButton).toHaveAttribute(
      'href',
      'https://www.linkedin.com/company/sauce-labs/'
    );
  }
}
