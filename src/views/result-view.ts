import { getState } from '../game/game-state';
import { getTheme } from '../game/theme-config';

/** Renders the game-over screen with final scores */
export function renderGameOverView(): string {
  const { players, settings } = getState();
  const { uiAssets } = getTheme(settings.themeId);

  const confetti = uiAssets.confettiSrc
    ? `<img class="result__confetti" src="${uiAssets.confettiSrc}" alt="" aria-hidden="true">`
    : '';

  return `
    <section class="view view--result" data-view="game-over">
      ${confetti}
      <img class="result__game-over-title" src="${uiAssets.gameOverTitleSrc}" alt="Game over">
      <p class="result__subtitle">Final score</p>
      <div class="result__scores">
        <span class="result__score result__score--blue">
          <img class="result__label-icon" src="${uiAssets.scoreIconBlue}" alt="" aria-hidden="true">
          Blue ${players.blue.score}
        </span>
        <span class="result__score result__score--orange">
          <img class="result__label-icon" src="${uiAssets.scoreIconOrange}" alt="" aria-hidden="true">
          Orange ${players.orange.score}
        </span>
      </div>
      <button class="result__action-btn" data-action="go-home" aria-label="Back to start">
        <img src="${uiAssets.homeBtnSrc}" alt="Home">
      </button>
    </section>
  `;
}

/** Renders the winner screen */
export function renderWinnerView(): string {
  const { winner, players, settings } = getState();
  const { uiAssets } = getTheme(settings.themeId);
  const isDraw = winner === 'draw';
  const winnerLabel = isDraw
    ? 'Draw!'
    : `${winner === 'blue' ? 'Blue' : 'Orange'} Player`;
  const winnerClass = isDraw ? '' : `result__winner--${winner}`;
  const score = isDraw
    ? `${players.blue.score} : ${players.orange.score}`
    : winner === 'blue'
    ? String(players.blue.score)
    : String(players.orange.score);
  const pawnColor = isDraw ? 'blue' : (winner as string);
  const decorationSrc = pawnColor === 'blue'
    ? uiAssets.winnerDecorationBlue
    : uiAssets.winnerDecorationOrange;
  const scoreLabelSrc = pawnColor === 'blue'
    ? uiAssets.scoreIconBlue
    : uiAssets.scoreIconOrange;

  const confetti = uiAssets.confettiSrc
    ? `<img class="result__confetti" src="${uiAssets.confettiSrc}" alt="" aria-hidden="true">`
    : '';

  return `
    <section class="view view--result view--winner" data-view="winner">
      ${confetti}
      <img class="${uiAssets.winnerDecorationClass}" src="${decorationSrc}" alt="" aria-hidden="true">
      <p class="result__subtitle">The winner is</p>
      <h1 class="result__title result__title--winner ${winnerClass}">${winnerLabel}</h1>
      <div class="result__score-row">
        <img class="result__label-icon" src="${scoreLabelSrc}" alt="" aria-hidden="true">
        <span class="result__score-display">${score}</span>
      </div>
      <button class="result__action-btn" data-action="go-home" aria-label="Back to start">
        <img src="${uiAssets.homeBtnSrc}" alt="Home">
      </button>
    </section>
  `;
}
