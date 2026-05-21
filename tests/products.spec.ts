import { test } from '@playwright/test';
import { LoginPage } from '../pom/pages/LoginPage';
import { InventoryPage } from '../pom/pages/InventoryPage';

const PASSWORD = process.env.PASSWORD!;
const USERNAME = process.env.USER_NAME!;

test.describe('Inventory Tests', async () => {
  test('Add product to cart', async ({ page }) => {
    const loginPage = new LoginPage(page); // инициализируем прямо внутри
    await loginPage.open();
    await loginPage.login(USERNAME, PASSWORD);
    const inventoryPage = await loginPage.checkSuccessfulLogin();
    await inventoryPage.checkVisibleInInventoryPage();
    await inventoryPage.footer.checkVisibleFooter();
    await inventoryPage.footer.checkFooterLink();
  });
});

// npx playwright test -g 'Inventory Tests'
// npx playwright test -g 'Add product to cart' --project=chromium --debug
