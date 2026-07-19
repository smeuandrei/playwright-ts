import { test } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";

test("Open Test Page", async ({ page }) => {
  const loginPageActions = new LoginPage(page);

  await loginPageActions.accessSite();
  await loginPageActions.invalidLogin(
    "standard_user",
    "1234",
    "Epic sadface: Username and password do not match any user in this service",
  );
  await loginPageActions.invalidLogin(
    "locked_out_user",
    "secret_sauce",
    "Epic sadface: Sorry, this user has been locked out.",
  );
});
