import { Page } from '@playwright/test';
import { SERVICE_URL } from '../../config/env-data';

export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigate(path: string = '') {
    await this.page.goto(`${SERVICE_URL}${path}`);
  }

  async getUrl() {
    return this.page.url();
  }
}
