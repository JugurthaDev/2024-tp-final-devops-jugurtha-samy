// e2e/simple.spec.ts
import { test, expect } from '@playwright/test';

test('example test', async ({ page }) => {
  await page.goto('https://example.com');
  expect(await page.title()).toBe('Example Domain');
});