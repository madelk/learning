import { expect, test } from "@playwright/test";

test("has title", async ({ page }) => {
  await page.goto("/");

  // Expect h1 to contain a substring.
  expect(await page.locator("h1").textContent()).toContain(
    "Hi and welcome to my study app for"
  );
});
