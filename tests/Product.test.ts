import { test } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { ProductPage } from "../pages/ProductPage";

test("Test product ordering by name", async ({ page }) => {
  const loginPageActions = new LoginPage(page);
  const productPageActions = new ProductPage(page);

  //Login to app
  await loginPageActions.accessSite();
  await loginPageActions.validLogin("standard_user", "secret_sauce");

  //Filter by ascendent name
  await productPageActions.filterProduct("az");

  //Check first & last products
  await productPageActions.verifyFirstProductName("Sauce Labs Backpack");
  await productPageActions.verifyLastProductName("Test.allTheThings() T-Shirt (Red)");

  //Filter by descendent name
  await productPageActions.filterProduct("za");

  //Check first & last products
  await productPageActions.verifyFirstProductName("Test.allTheThings() T-Shirt (Red)");
  await productPageActions.verifyLastProductName("Sauce Labs Backpack");
});

test("Test product ordering by price", async ({ page }) => {
  const loginPageActions = new LoginPage(page);
  const productPageActions = new ProductPage(page);

  //Login to app
  await loginPageActions.accessSite();
  await loginPageActions.validLogin("standard_user", "secret_sauce");

  //Filter by ascendent price
  await productPageActions.filterProduct("lohi");

  //Check first & last products
  await productPageActions.verifyFirstProductName("Sauce Labs Onesie");
  await productPageActions.verifyLastProductName("Sauce Labs Fleece Jacket");

  //Filter by descendent price
  await productPageActions.filterProduct("hilo");

  //Check first & last products
  await productPageActions.verifyFirstProductName("Sauce Labs Fleece Jacket");
  await productPageActions.verifyLastProductName("Sauce Labs Onesie");
});

test("Test product data", async ({ page }) => {
  const loginPageActions = new LoginPage(page);
  const productPageActions = new ProductPage(page);

  //Login to app
  await loginPageActions.accessSite();
  await loginPageActions.validLogin("standard_user", "secret_sauce");

  //Check product data
  const productName = "Sauce Labs Bike Light";
  const productDescription =
    "A red light isn't the desired state in testing but it sure helps when riding your bike at night. Water-resistant with 3 lighting modes, 1 AAA battery included.";
  const productPrice = "$9.99";
  await productPageActions.verifyProductData(
    productName,
    productDescription,
    productPrice,
  );

  //Access the product page
  await productPageActions.accessProductPage(productName);

  //Verify the product data
  await productPageActions.verifyProductPageData(productName, productDescription, productPrice);
});
