import { Locator } from '@playwright/test';
import { Button } from '../atom/Button';

export class ProductCard {
  readonly cardContainer: Locator;
  readonly cardName: Locator;
  readonly cardImage: Locator;
  readonly cardDescription: Locator;
  readonly cardPrice: Locator;
  readonly cardBtn: Button;

  constructor(cardContainer: Locator) {
    this.cardContainer = cardContainer;
    this.cardName = cardContainer.getByTestId('inventory_item_name');
    this.cardDescription = cardContainer.getByTestId('inventory_item_desc');
    this.cardPrice = cardContainer.getByTestId('inventory_item_price');
    this.cardImage = cardContainer.locator('.inventory_item_img img');
    this.cardBtn = new Button(cardContainer.locator('button[data-test^="add-to-cart"]'));
  }
}
