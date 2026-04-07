import { getState } from '../game/game-state';
import { getTheme } from '../game/theme-config';
import type { PlayerId, ThemeUiAssets } from '../types/game.types';

/** Renders the two player score spans */
function renderScoresTemplate(
  blueScore: number,
  orangeScore: number,
  uiAssets: ThemeUiAssets
): string {
  return `
      <div class="result__scores">
        <span class="result__score result__score--player-1">
          <img class="result__label-icon" src="${uiAssets.scoreIconBlue}" alt="" aria-hidden="true">
          Blue ${blueScore}
        </span>
        <span class="result__score result__score--player-2">
          <img class="result__label-icon" src="${uiAssets.scoreIconOrange}" alt="" aria-hidden="true">
          Orange ${orangeScore}
        </span>
      </div>`;
}

/** Renders the optional confetti image */
function renderConfetti(confettiSrc: string | null): string {
  return confettiSrc
    ? `<img class="result__confetti" src="${confettiSrc}" alt="" aria-hidden="true">`
    : '';
}

/** Renders the home button for draw outcomes */
function renderHomeButton(uiAssets: ThemeUiAssets): string {
  return `
      <button class="result__action-btn" data-action="go-home" aria-label="Back to start">
        <img src="${uiAssets.homeButtonSource}" alt="Home">
      </button>`;
}

/** Renders the game-over screen with final scores */
export function renderGameOverView(): string {
  const { players, settings, winner } = getState();
  const { uiAssets } = getTheme(settings.themeId);
  const homeButton = winner === 'draw' ? renderHomeButton(uiAssets) : '';
  return `
    <section class="view view--result" data-view="game-over">
      ${renderConfetti(uiAssets.confettiSrc)}
      <h1 class="visually-hidden">Game over</h1>
      <img class="result__game-over-title" src="${uiAssets.gameOverTitleSrc}" alt="" aria-hidden="true">
      <p class="result__subtitle">Final score</p>
      ${renderScoresTemplate(players.blue.score, players.orange.score, uiAssets)}
      ${homeButton}
    </section>`;
}

/** Resolves display values derived from the winner state */
function resolveWinnerData(
  winner: PlayerId | 'draw' | null,
  uiAssets: ThemeUiAssets
): { label: string; winnerClass: string; decorationSrc: string } {
  const isDraw = winner === 'draw';
  const label = isDraw ? 'Draw!' : `${winner === 'blue' ? 'Blue' : 'Orange'} Player`;
  const winnerClass = isDraw ? '' : `result__winner--${winner === 'blue' ? 'player-1' : 'player-2'}`;
  const pawnColor = isDraw ? 'blue' : winner;
  const decorationSrc = pawnColor === 'blue' ? uiAssets.winnerDecorationBlue : uiAssets.winnerDecorationOrange;
  return { label, winnerClass, decorationSrc };
}

/** Renders the winner screen */
export function renderWinnerView(): string {
  const { winner, players, settings } = getState();
  const { uiAssets } = getTheme(settings.themeId);
  const { label, winnerClass, decorationSrc } = resolveWinnerData(winner, uiAssets);
  return `
    <section class="view view--result view--winner" data-view="winner">
      ${renderConfetti(uiAssets.confettiSrc)}
      <p class="result__subtitle">The winner is</p>
      <h1 class="result__title result__title--winner ${winnerClass}">${label}</h1>
      <img class="${uiAssets.winnerDecorationClass}" src="${decorationSrc}" alt="" aria-hidden="true">
      ${renderHomeButton(uiAssets)}
    </section>`;
}
