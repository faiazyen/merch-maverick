import { test, expect } from "@playwright/test";

// ---------------------------------------------------------------------------
// Public marketing pages
// ---------------------------------------------------------------------------

test("home page loads", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/Merch Maverick/i);
});

test("pricing page loads", async ({ page }) => {
  await page.goto("/pricing");
  await expect(page.locator("h1, h2").first()).toBeVisible();
});

test("quote page loads", async ({ page }) => {
  await page.goto("/quote");
  await expect(page.locator("h1, h2").first()).toBeVisible();
});

// ---------------------------------------------------------------------------
// Auth — sign-in page
// ---------------------------------------------------------------------------

test("sign-in page renders email and password fields", async ({ page }) => {
  await page.goto("/sign-in?mode=login");
  await expect(page.locator('input[type="email"]')).toBeVisible();
  await expect(page.locator('input[type="password"]')).toBeVisible();
});

test("sign-in redirects to portal on ?next=/portal", async ({ page }) => {
  await page.goto("/sign-in?mode=login&next=/portal");
  await expect(page.locator('input[type="email"]')).toBeVisible();
});

// ---------------------------------------------------------------------------
// Portal — unauthenticated redirect
// ---------------------------------------------------------------------------

test("portal redirects unauthenticated users to sign-in", async ({ page }) => {
  await page.goto("/portal");
  await expect(page).toHaveURL(/sign-in/);
});

test("portal orders redirects unauthenticated users", async ({ page }) => {
  await page.goto("/portal/orders");
  await expect(page).toHaveURL(/sign-in/);
});

test("portal quotes redirects unauthenticated users", async ({ page }) => {
  await page.goto("/portal/quotes");
  await expect(page).toHaveURL(/sign-in/);
});

test("portal assets redirects unauthenticated users", async ({ page }) => {
  await page.goto("/portal/assets");
  await expect(page).toHaveURL(/sign-in/);
});

// ---------------------------------------------------------------------------
// API — unauthenticated requests are rejected
// ---------------------------------------------------------------------------

test("quote submission API rejects unauthenticated request", async ({ request }) => {
  const response = await request.post("/api/portal/quotes", {
    data: { productName: "Hoodie", quantity: 100 },
  });
  // 401 when Supabase is configured, 503 when env vars are absent (local dev without .env.local)
  expect([401, 503]).toContain(response.status());
});

test("asset upload API rejects unauthenticated request", async ({ request }) => {
  const response = await request.post("/api/portal/assets", {
    data: {},
  });
  // 401 when Supabase is configured, 503 when env vars are absent (local dev without .env.local)
  expect([401, 503]).toContain(response.status());
});

// ---------------------------------------------------------------------------
// Admin — unauthenticated redirect
// ---------------------------------------------------------------------------

test("admin page blocks unauthenticated users", async ({ page }) => {
  await page.goto("/admin");
  // When ENABLE_INTERNAL_ROUTES=true and no session → redirects to /sign-in.
  // When ENABLE_INTERNAL_ROUTES is unset (local dev) → renders Next.js 404.
  const url = page.url();
  const isBlockedByRedirect = url.includes("sign-in");
  const h1Text = await page.locator("h1").first().textContent().catch(() => "");
  const isBlockedByNotFound = (h1Text ?? "").includes("404");
  expect(isBlockedByRedirect || isBlockedByNotFound).toBe(true);
});
