import { expect, test, Page } from '@playwright/test';

const settingsSelector = '[data-view="settings"]';
const layoutSelector = '.view--settings';
const previewSelector = '.settings__preview';
const previewImageSelector = '#settings-preview-img';
const footerSelector = '.settings__footer';

async function openSettings(page: Page, width: number, height: number): Promise<void> {
  await page.setViewportSize({ width, height });
  await page.goto('/');
  await page.locator('.btn-home-play').click();
  await expect(page.locator(settingsSelector)).toBeVisible();
}

async function getGridColumns(page: Page): Promise<string> {
  return page.locator(layoutSelector).evaluate((layoutElement) => {
    return getComputedStyle(layoutElement).gridTemplateColumns;
  });
}

async function getCssValue(page: Page, selector: string, propertyName: string): Promise<string> {
  return page.locator(selector).evaluate((elementNode, property) => {
    return getComputedStyle(elementNode).getPropertyValue(property).trim();
  }, propertyName);
}

async function hasHorizontalOverflow(page: Page): Promise<boolean> {
  return page.evaluate(() => {
    return document.documentElement.scrollWidth > window.innerWidth;
  });
}

async function isElementInViewport(page: Page, selector: string): Promise<boolean> {
  return page.locator(selector).evaluate((elementNode) => {
    const rect = elementNode.getBoundingClientRect();
    return rect.top >= 0 && rect.left >= 0 && rect.right <= window.innerWidth;
  });
}

test.describe('Settings responsive layout', () => {
  test('Desktop keeps two columns without overflow', async ({ page }) => {
    await openSettings(page, 1280, 900);
    const gridColumns = await getGridColumns(page);
    const overflowExists = await hasHorizontalOverflow(page);
    await expect(page.locator(previewSelector)).toBeVisible();
    expect(gridColumns).toContain(' ');
    expect(overflowExists).toBe(false);
  });

  test('Tablet collapses to one column and keeps footer in viewport', async ({ page }) => {
    await openSettings(page, 768, 1024);
    const gridColumns = await getGridColumns(page);
    const footerMarginLeft = await getCssValue(page, footerSelector, 'margin-left');
    const footerInViewport = await isElementInViewport(page, footerSelector);
    expect(gridColumns).toBe('720px');
    expect(footerMarginLeft).toBe('0px');
    expect(footerInViewport).toBe(true);
  });

  test('Mobile applies responsive preview sizing and image fit', async ({ page }) => {
    await openSettings(page, 393, 851);
    const previewMinHeight = await getCssValue(page, previewSelector, 'min-height');
    const imageObjectFit = await getCssValue(page, previewImageSelector, 'object-fit');
    const overflowExists = await hasHorizontalOverflow(page);
    expect(previewMinHeight).toBe('160px');
    expect(imageObjectFit).toBe('contain');
    expect(overflowExists).toBe(false);
  });

  test('XS keeps controls usable after resize', async ({ page }) => {
    await openSettings(page, 1280, 900);
    await page.locator('label:has(input[name="theme"][value="theme-2"])').click();
    await page.setViewportSize({ width: 360, height: 740 });
    const previewMinHeight = await getCssValue(page, previewSelector, 'min-height');
    const selectedTheme = page.locator('input[name="theme"][value="theme-2"]');
    await expect(selectedTheme).toBeChecked();
    await expect(page.locator('.settings__start-btn')).toBeVisible();
    expect(previewMinHeight).toBe('140px');
  });
});
