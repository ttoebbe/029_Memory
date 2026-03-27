import { test, expect } from '@playwright/test';

/**
 * Helper: navigate from home to the game view.
 * Clicks "Start Game" from the settings screen.
 */
async function startGame(page: import('@playwright/test').Page) {
  await page.goto('/');
  // Click settings / play button on home screen
  await page.locator('[data-action="go-to-settings"]').click();
  await page.locator('[data-action="start-game"]').click();
  // Wait for the game board to appear
  await expect(page.locator('[data-view="game"]')).toBeVisible();
}

// ─── Theme 1 ────────────────────────────────────────────────────────────────

test.describe('Exit Game → Game Over (Theme 1)', () => {
  test.beforeEach(async ({ page }) => {
    await startGame(page);
  });

  test('clicking Exit Game in score bar opens the popup', async ({ page }) => {
    await page.locator('[data-action="show-exit-dialog"]').click();
    await expect(page.locator('.exit-dialog-overlay')).toBeVisible();
  });

  test('clicking "Exit game" in popup shows Game Over screen', async ({ page }) => {
    await page.locator('[data-action="show-exit-dialog"]').click();
    await page.locator('.exit-dialog [data-action="exit-game"]').click();

    const gameOverView = page.locator('[data-view="game-over"]');
    await expect(gameOverView).toBeVisible();
  });

  test('Game Over screen shows "Final score"', async ({ page }) => {
    await page.locator('[data-action="show-exit-dialog"]').click();
    await page.locator('.exit-dialog [data-action="exit-game"]').click();

    await expect(page.locator('[data-view="game-over"] .result__subtitle')).toHaveText('Final score');
  });

  test('Game Over screen shows both player scores', async ({ page }) => {
    await page.locator('[data-action="show-exit-dialog"]').click();
    await page.locator('.exit-dialog [data-action="exit-game"]').click();

    await expect(page.locator('[data-view="game-over"] .result__score--blue')).toBeVisible();
    await expect(page.locator('[data-view="game-over"] .result__score--orange')).toBeVisible();
  });

  test('Game Over screen shows home button', async ({ page }) => {
    await page.locator('[data-action="show-exit-dialog"]').click();
    await page.locator('.exit-dialog [data-action="exit-game"]').click();

    await expect(page.locator('[data-view="game-over"] [data-action="go-home"]')).toBeVisible();
  });

  test('"Back to game" in popup dismisses popup without leaving game', async ({ page }) => {
    await page.locator('[data-action="show-exit-dialog"]').click();
    await page.locator('.exit-dialog [data-action="dismiss-exit-dialog"]').first().click();

    await expect(page.locator('.exit-dialog-overlay')).not.toBeVisible();
    await expect(page.locator('[data-view="game"]')).toBeVisible();
  });

  test('home button on Game Over screen resets to home view', async ({ page }) => {
    await page.locator('[data-action="show-exit-dialog"]').click();
    await page.locator('.exit-dialog [data-action="exit-game"]').click();
    await page.locator('[data-view="game-over"] [data-action="go-home"]').click();

    await expect(page.locator('[data-view="home"]')).toBeVisible();
  });
});

// ─── Theme 2 ────────────────────────────────────────────────────────────────

test.describe('Exit Game → Game Over (Theme 2)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.locator('[data-action="go-to-settings"]').click();
    // Switch to theme 2 (radio inputs are visually hidden; click the wrapping label)
    await page.locator('label.settings__option:has(input[name="theme"][value="theme-2"])').click();
    await page.locator('[data-action="start-game"]').click();
    await expect(page.locator('[data-view="game"]')).toBeVisible();
  });

  test('clicking "Exit game" in popup shows Game Over screen (Theme 2)', async ({ page }) => {
    await page.locator('[data-action="show-exit-dialog"]').click();
    await page.locator('.exit-dialog [data-action="exit-game"]').click();

    await expect(page.locator('[data-view="game-over"]')).toBeVisible();
  });

  test('Game Over screen shows "Final score" (Theme 2)', async ({ page }) => {
    await page.locator('[data-action="show-exit-dialog"]').click();
    await page.locator('.exit-dialog [data-action="exit-game"]').click();

    await expect(page.locator('[data-view="game-over"] .result__subtitle')).toHaveText('Final score');
  });

  test('Game Over screen shows both player scores (Theme 2)', async ({ page }) => {
    await page.locator('[data-action="show-exit-dialog"]').click();
    await page.locator('.exit-dialog [data-action="exit-game"]').click();

    await expect(page.locator('[data-view="game-over"] .result__score--blue')).toBeVisible();
    await expect(page.locator('[data-view="game-over"] .result__score--orange')).toBeVisible();
  });
});

// ─── Score accuracy ──────────────────────────────────────────────────────────

test.describe('Game Over screen shows correct scores on exit', () => {
  test('scores default to 0 when exiting without any matches', async ({ page }) => {
    await startGame(page);

    await page.locator('[data-action="show-exit-dialog"]').click();
    await page.locator('.exit-dialog [data-action="exit-game"]').click();

    const blueScore = page.locator('[data-view="game-over"] .result__score--blue');
    const orangeScore = page.locator('[data-view="game-over"] .result__score--orange');

    await expect(blueScore).toContainText('0');
    await expect(orangeScore).toContainText('0');
  });
});
