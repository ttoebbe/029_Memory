import { getState } from '../game/game-state';
import { getTheme } from '../game/theme-config';
import type { PlayerId, ThemeUiAssets } from '../types/game.types';

/** Renders the two player score spans */
function renderScoresHtml(
  blueScore: number,
  orangeScore: number,
  uiAssets: ThemeUiAssets
): string {
  return `
      <div class="result__scores">
        <span class="result__score result__score--blue">
          <img class="result__label-icon" src="${uiAssets.scoreIconBlue}" alt="" aria-hidden="true">
          Blue ${blueScore}
        </span>
        <span class="result__score result__score--orange">
          <img class="result__label-icon" src="${uiAssets.scoreIconOrange}" alt="" aria-hidden="true">
          Orange ${orangeScore}
        </span>
      </div>`;
}

/** Renders the game-over screen with final scores */
export function renderGameOverView(): string {
  const { players, settings, winner } = getState();
  const { uiAssets } = getTheme(settings.themeId);
  const confetti = uiAssets.confettiSrc
    ? `<img class="result__confetti" src="${uiAssets.confettiSrc}" alt="" aria-hidden="true">`
    : '';
  const homeBtn = winner === 'draw' ? `
      <button class="result__action-btn" data-action="go-home" aria-label="Back to start">
        <img src="${uiAssets.homeBtnSrc}"${uiAssets.homeBtnHoverSrc ? ` data-hover-src="${uiAssets.homeBtnHoverSrc}"` : ''} alt="Home">
      </button>` : '';
  return `
    <section class="view view--result" data-view="game-over">
      ${confetti}
      <img class="result__game-over-title" src="${uiAssets.gameOverTitleSrc}" alt="Game over">
      <p class="result__subtitle">Final score</p>
      ${renderScoresHtml(players.blue.score, players.orange.score, uiAssets)}
      ${homeBtn}
    </section>`;
}

/** Resolves all display values derived from the winner state */
function resolveWinnerData(
  winner: PlayerId | 'draw' | null,
  blueScore: number,
  orangeScore: number,
  uiAssets: ThemeUiAssets
): { label: string; winnerClass: string; score: string; decorationSrc: string; scoreLabelSrc: string } {
  const isDraw = winner === 'draw';
  const label = isDraw ? 'Draw!' : `${winner === 'blue' ? 'Blue' : 'Orange'} Player`;
  const winnerClass = isDraw ? '' : `result__winner--${winner}`;
  const score = isDraw ? `${blueScore} : ${orangeScore}` : String(winner === 'blue' ? blueScore : orangeScore);
  const pawnColor = isDraw ? 'blue' : winner;
  const decorationSrc = pawnColor === 'blue' ? uiAssets.winnerDecorationBlue : uiAssets.winnerDecorationOrange;
  const scoreLabelSrc = pawnColor === 'blue' ? uiAssets.scoreIconBlue : uiAssets.scoreIconOrange;
  return { label, winnerClass, score, decorationSrc, scoreLabelSrc };
}

/** Renders the winner screen */
export function renderWinnerView(): string {
  const { winner, players, settings } = getState();
  const { uiAssets } = getTheme(settings.themeId);
  const { label, winnerClass, decorationSrc } = resolveWinnerData(
    winner, players.blue.score, players.orange.score, uiAssets
  );
  const confetti = uiAssets.confettiSrc
    ? `<img class="result__confetti" src="${uiAssets.confettiSrc}" alt="" aria-hidden="true">`
    : '';
  return `
    <section class="view view--result view--winner" data-view="winner">
      ${confetti}
      <p class="result__subtitle">The winner is</p>
      <h1 class="result__title result__title--winner ${winnerClass}">${label}</h1>
      <img class="${uiAssets.winnerDecorationClass}" src="${decorationSrc}" alt="" aria-hidden="true">
      <button class="result__action-btn" data-action="go-home" aria-label="Back to start">
        <img src="${uiAssets.homeBtnSrc}"${uiAssets.homeBtnHoverSrc ? ` data-hover-src="${uiAssets.homeBtnHoverSrc}"` : ''} alt="Home">
      </button>
    </section>`;
}
