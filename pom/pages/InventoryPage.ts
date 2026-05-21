import { BasePage } from '../base/BasePage';
import { expect, Locator, Page } from '@playwright/test';
import { Button } from '../atom/Button';
import { ProductCard } from '../organisms/ProductCard';
import { Footer } from '../organisms/Footer';

export class InventoryPage extends BasePage {
  readonly shoppingCardContainer: Locator;
  readonly sortContainer: Locator;
  readonly titleProduct: Locator;
  readonly burgerBtn: Button;
  readonly appLogo: Locator;
  private readonly itemContainer: Locator;
  readonly footer: Footer;

  constructor(page: Page) {
    super(page);
    this.shoppingCardContainer = page.getByTestId('shopping-cart-link');
    this.sortContainer = page.getByTestId('product-sort-container');
    this.titleProduct = page.getByTestId('title');
    this.appLogo = page.locator('.app_logo');
    this.burgerBtn = new Button(page.locator('#react-burger-menu-btn'));
    this.itemContainer = page.getByTestId('inventory-item');
    this.footer = new Footer(page);
  }

  async checkVisibleInInventoryPage(): Promise<void> {
    await expect(this.appLogo).toBeVisible();
    await expect(this.titleProduct).toBeVisible();
    await expect(this.sortContainer).toBeVisible();
    await expect(this.shoppingCardContainer).toBeVisible();
    await expect(this.itemContainer.first()).toBeVisible();
    await this.burgerBtn.checkVisibleButton(true);
  }

  async getProductCards(): Promise<ProductCard[]> {
    const countCards = await this.itemContainer.count();
    const cards: ProductCard[] = [];

    for (let i = 0; i < countCards; i++) {
      cards.push(new ProductCard(this.itemContainer.nth(i)));
    }
    return cards;
  }

  // can get card by name of  product
  async getCardByName(name: string): Promise<ProductCard> {
    const cards = await this.getProductCards();
    for (const card of cards) {
      const titleText = await card.cardName.textContent();
      if (titleText === name) {
        return card;
      }
    }
    throw new Error(`Product with name "${name}" was not found on the page!`);
  }
}
