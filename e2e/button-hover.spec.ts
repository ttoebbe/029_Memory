import { test, expect, Page } from '@playwright/test';

/** Returns the current src of the first img inside the matched element */
async function getImgSrc(page: Page, selector: string): Promise<string> {
  return page.locator(selector).first().evaluate((el) => {
    const img = el.tagName === 'IMG' ? (el as HTMLImageElement) : el.querySelector<HTMLImageElement>('img');
    return img?.getAttribute('src') ?? '';
  });
}

/** Simulates hover and returns the resulting img src.
 *  Fires mouseout first (reset) then mouseover (swap). */
async function hoverAndWaitSrcChange(page: Page, selector: string): Promise<string> {
  // Reset any pre-existing hover state from automatic browser mouseover
  await page.locator(selector).first().dispatchEvent('mouseout');
  await page.waitForTimeout(50);
  const before = await getImgSrc(page, selector);
  await page.locator(selector).first().dispatchEvent('mouseover');
  await page.waitForFunction(
    ([sel, prev]) => {
      const el = document.querySelector(sel);
      const img = el?.tagName === 'IMG' ? el as HTMLImageElement : el?.querySelector<HTMLImageElement>('img');
      return img ? img.getAttribute('src') !== prev : false;
    },
    [selector, before] as [string, string],
    { timeout: 3000 }
  ).catch(() => null);
  return getImgSrc(page, selector);
}

/** Clicks the label for a visually hidden radio input */
async function selectRadio(page: Page, name: string, value: string): Promise<void> {
  await page.locator(`label:has(input[name="${name}"][value="${value}"])`).click();
}

/** Navigates to a running game for a given theme */
async function startGame(page: Page, themeValue: string): Promise<void> {
  await page.goto('/');
  await page.locator('.btn-home-play').click();
  await selectRadio(page, 'theme', themeValue);
  await selectRadio(page, 'player', 'blue');
  await selectRadio(page, 'board-size', '16');
  await page.locator('.settings__start-btn').click();
  await page.waitForSelector('.score-bar__exit-btn');
}

/** Returns all visible game card ids from the current board */
async function getGameCardIds(page: Page): Promise<number[]> {
  return page.locator('.memory-card').evaluateAll((cardElements) =>
    cardElements.map((cardElement) => Number(cardElement.getAttribute('data-card-id')))
  );
}

/** Returns the front image source key for a specific card id */
async function getCardFrontSource(page: Page, cardId: number): Promise<string> {
  const selector = `[data-card-id="${cardId}"] .memory-card__front img`;
  return page.locator(selector).getAttribute('src').then((value) => value ?? '');
}

/** Plays through all matching pairs to reach a real game-over screen */
async function finishCurrentGame(page: Page): Promise<void> {
  const cardIds = await getGameCardIds(page);
  const cardsByImage = new Map<string, number[]>();
  for (const cardId of cardIds) {
    const imageSource = await getCardFrontSource(page, cardId);
    const group = cardsByImage.get(imageSource) ?? [];
    group.push(cardId);
    cardsByImage.set(imageSource, group);
  }
  for (const pair of cardsByImage.values()) {
    if (pair.length < 2) continue;
    await page.locator(`[data-card-id="${pair[0]}"]`).click();
    await page.locator(`[data-card-id="${pair[1]}"]`).click();
    await page.waitForTimeout(900);
  }
  await page.waitForSelector('.result__action-btn');
}

test.describe('Home – Play button hover', () => {
  test('SVG wechselt auf Hover', async ({ page }) => {
    await page.goto('/');
    const defaultSrc = await getImgSrc(page, '.btn-home-play');
    expect(defaultSrc).toContain('btn-primary.svg');
    const hoverSrc = await hoverAndWaitSrcChange(page, '.btn-home-play');
    expect(hoverSrc).toContain('btn-primary-hover.svg');
  });

  test('SVG kehrt auf Mouse-Leave zurück', async ({ page }) => {
    await page.goto('/');
    await page.locator('.btn-home-play').dispatchEvent('mouseover');
    await page.waitForTimeout(100);
    await page.locator('.btn-home-play').dispatchEvent('mouseout');
    await page.waitForTimeout(100);
    const src = await getImgSrc(page, '.btn-home-play');
    expect(src).toContain('btn-primary.svg');
  });
});

test.describe('Settings – Start button hover', () => {
  test('SVG wechselt auf Hover', async ({ page }) => {
    await page.goto('/');
    await page.locator('.btn-home-play').click();
    const defaultSrc = await getImgSrc(page, '.settings__start-btn');
    expect(defaultSrc).toContain('small');
    const hoverSrc = await hoverAndWaitSrcChange(page, '.settings__start-btn');
    expect(hoverSrc).toContain('btn-small-hover.svg');
  });
});

test.describe('Game – Exit button hover (alle Themes)', () => {
  for (const theme of ['theme-1', 'theme-2', 'theme-4']) {
    test(`${theme}: Exit-Button wechselt SVG auf Hover`, async ({ page }) => {
      await startGame(page, theme);
      const defaultSrc = await getImgSrc(page, '.score-bar__exit-btn');
      expect(defaultSrc).toContain('btn-exit.svg');
      const hoverSrc = await hoverAndWaitSrcChange(page, '.score-bar__exit-btn');
      expect(hoverSrc).toContain('btn-exit-hover.svg');
    });
  }
});

test.describe('Popup – Buttons hover', () => {
  for (const theme of ['theme-1', 'theme-2', 'theme-4']) {
    test(`${theme}: Popup "Back to game" hover ist korrekt`, async ({ page }) => {
      await startGame(page, theme);
      await page.locator('.score-bar__exit-btn').click();
      await page.waitForSelector('button[data-action="dismiss-exit-dialog"]');
      const defaultSrc = await getImgSrc(page, 'button[data-action="dismiss-exit-dialog"]');
      expect(defaultSrc).toContain('btn-popup-back.svg');
      const hoverSrc = await hoverAndWaitSrcChange(page, 'button[data-action="dismiss-exit-dialog"]');
      expect(hoverSrc).toContain('btn-popup-back-hover.svg');
    });

    test(`${theme}: Popup "Quit" hover zeigt btn-exit-hover (nicht back-hover)`, async ({ page }) => {
      await startGame(page, theme);
      await page.locator('.score-bar__exit-btn').click();
      await page.waitForSelector('button[data-action="exit-game"]');
      const defaultSrc = await getImgSrc(page, 'button[data-action="exit-game"]');
      expect(defaultSrc).toContain('btn-exit.svg');
      const hoverSrc = await hoverAndWaitSrcChange(page, 'button[data-action="exit-game"]');
      expect(hoverSrc).toContain('btn-exit-hover.svg');
      expect(hoverSrc).not.toContain('popup-back');
    });
  }
});

test.describe('Exit flow', () => {
  test('Bestätigter Exit führt zu Settings statt Game-Over', async ({ page }) => {
    await startGame(page, 'theme-1');
    await page.locator('.score-bar__exit-btn').click();
    const confirmExitButton = page.locator('.exit-dialog button[data-action="exit-game"]');
    await expect(confirmExitButton).toBeVisible();
    await confirmExitButton.dispatchEvent('click');
    await expect(page.locator('[data-view="settings"]')).toBeVisible();
    await expect(page.locator('[data-view="game-over"]')).toHaveCount(0);
  });
});

test.describe('Result – Home button hover', () => {
  async function reachGameOver(page: Page, theme: string): Promise<void> {
    await startGame(page, theme);
    await finishCurrentGame(page);
    await page.waitForSelector('.result__action-btn');
  }

  for (const theme of ['theme-2', 'theme-4']) {
    test(`${theme}: Home-Button hover wechselt SVG`, async ({ page }) => {
      await reachGameOver(page, theme);
      await page.locator('.result__action-btn').first().dispatchEvent('mouseout');
      await page.waitForTimeout(100);
      const defaultSrc = await getImgSrc(page, '.result__action-btn');
      const hoverSrc = await hoverAndWaitSrcChange(page, '.result__action-btn');
      expect(defaultSrc).not.toContain('hover');
      expect(hoverSrc).not.toBe(defaultSrc);
      expect(hoverSrc).toContain('hover');
    });
  }
});
