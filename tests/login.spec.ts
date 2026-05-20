import { test } from '@playwright/test';
import { LoginPage } from '../pom/pages/loginPage';
import { EXTRA_USERS } from "../data/users";

const PASSWORD = process.env.PASSWORD!;
const USERNAME = process.env.USER_NAME!;

test.describe('Login Tests', () => {

  test('Check for sigh in swag labs', async ({ page }) => {
    const loginPage = new LoginPage(page); // инициализируем прямо внутри
    await loginPage.open();
    await loginPage.checkVisibleInLoginPage();
    await loginPage.login(USERNAME, PASSWORD);
    await loginPage.checkSuccessfulLogin();
  });

  // check for each name - test
  for (const user of EXTRA_USERS) {
    test(`Login test with extra user : ${user}`, async ({ page }) => {
      const loginPage = new LoginPage(page);
      await loginPage.open();
      await loginPage.login(user, PASSWORD);
      await loginPage.checkSuccessfulLogin();
    });
  }

  // one test for all names
  test('Login test with extra user in one ', async ({ page }) => {
    const loginPage = new LoginPage(page);
    for (const user of EXTRA_USERS) {
      await loginPage.open();
      await loginPage.login(user, PASSWORD);
      await loginPage.checkSuccessfulLogin();
    }
  });

  test('Login test with locked_out_user', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.open();
    await loginPage.login('locked_out_user', 'secret_sauce');
    await loginPage.checkErrorMessageText();
  });

});
// npx playwright test -g "Login Tests" --project=chromium
// npx playwright test -g 'Check for sigh in swag labs' --project=chromium --debug
// npx playwright test -g 'Login test with extra user' --project=chromium --debug
// npx playwright test -g 'Login test with locked_out_user' --project=chromium --debug
// npx playwright test -g 'Login test with extra user in one' --project=chromium --debug
