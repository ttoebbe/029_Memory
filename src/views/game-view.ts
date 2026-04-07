import { getState } from '../game/game-state';
import { getTheme } from '../game/theme-config';
import type { Card, ThemeUiAssets } from '../types/game.types';

/** Renders the inner face/back structure of a memory card */
function renderCardInner(card: Card, backImage: string): string {
  const backImageTemplate = backImage ? `<img src="${backImage}" alt="" aria-hidden="true">` : '';
  return `
      <div class="memory-card__inner">
        <div class="memory-card__back">
          ${backImageTemplate}
        </div>
        <div class="memory-card__front">
          <img src="${card.imagePath}" alt="Card image">
        </div>
      </div>`;
}

/** Renders a single memory card */
function renderCard(card: Card, backImage: string): string {
  const flippedClass = card.isFlipped || card.isMatched ? 'memory-card--flipped' : '';
  const matchedClass = card.isMatched ? 'memory-card--matched' : '';
  return `
    <button class="memory-card ${flippedClass} ${matchedClass}"
            data-card-id="${card.id}"
            data-action="flip-card"
            aria-label="Memory card"
            type="button">
      ${renderCardInner(card, backImage)}
    </button>`;
}

/** Renders a single player score span */
function renderPlayerScore(color: 'blue' | 'orange', score: number, iconClass: string, iconSrc: string): string {
  return `
        <span class="score-bar__player score-bar__player--${color}">
          <img class="${iconClass}" src="${iconSrc}" alt="" aria-hidden="true">
          ${color === 'blue' ? 'Blue' : 'Orange'} ${score}
        </span>`;
}

/** Renders the current player indicator */
function renderCurrentPlayerIndicator(iconClass: string, iconSrc: string, currentPlayer: string): string {
  return `
      <p class="score-bar__current">
        Current player:
        <img class="${iconClass}" src="${iconSrc}" alt="${currentPlayer} player's turn">
      </p>`;
}

/** Renders the exit button in the score bar */
function renderExitButton(uiAssets: ThemeUiAssets): string {
  return `
      <button class="score-bar__exit-btn" data-action="show-exit-dialog" aria-label="Exit game">
        <img src="${uiAssets.exitButtonSource}"${uiAssets.exitButtonHoverSource ? ` data-hover-src="${uiAssets.exitButtonHoverSource}"` : ''} alt="Exit game">
      </button>`;
}

/** Renders the score header */
export function renderScoreBar(): string {
  const { players, settings } = getState();
  const { uiAssets } = getTheme(settings.themeId);
  const currentIconSrc = settings.currentPlayer === 'blue'
    ? uiAssets.currentPlayerIconBlue
    : uiAssets.currentPlayerIconOrange;
  return `
    <header class="score-bar">
      <div class="score-bar__scores">
        ${renderPlayerScore('blue', players.blue.score, uiAssets.scoreIconClass, uiAssets.scoreIconBlue)}
        ${renderPlayerScore('orange', players.orange.score, uiAssets.scoreIconClass, uiAssets.scoreIconOrange)}
      </div>
      ${renderCurrentPlayerIndicator(uiAssets.currentPlayerIconClass, currentIconSrc, settings.currentPlayer)}
      ${renderExitButton(uiAssets)}
    </header>`;
}

/** Renders the inner content of the exit dialog */
function renderExitDialogContent(uiAssets: ThemeUiAssets): string {
  return `
      <dialog class="exit-dialog" aria-labelledby="exit-dialog-title">
        <p id="exit-dialog-title" class="exit-dialog__title">
          Are you sure you want to quit the game?
        </p>
        <div class="exit-dialog__actions">
          <button class="exit-dialog__btn" data-action="dismiss-exit-dialog" aria-label="Back to game">
            <img src="${uiAssets.popupBackToGameButtonSource}"${uiAssets.popupBackToGameButtonHoverSource ? ` data-hover-src="${uiAssets.popupBackToGameButtonHoverSource}"` : ''} alt="Back to game">
          </button>
          <button class="exit-dialog__btn" data-action="exit-game" aria-label="Exit game">
            <img src="${uiAssets.popupConfirmExitButtonSource}"${uiAssets.popupConfirmExitButtonHoverSource ? ` data-hover-src="${uiAssets.popupConfirmExitButtonHoverSource}"` : ''} alt="Exit game">
          </button>
        </div>
      </dialog>`;
}

/** Renders the exit confirmation dialog overlay */
export function renderExitDialog(): string {
  const { uiAssets } = getTheme(getState().settings.themeId);
  return `
    <div class="exit-dialog-overlay" data-action="dismiss-exit-dialog">
      ${renderExitDialogContent(uiAssets)}
    </div>`;
}

/** Renders the game board view */
export function renderGameView(): string {
  const { cards, settings } = getState();
  const theme = getTheme(settings.themeId);
  const gridClass = `game-board--${settings.boardSize}`;
  const cardTemplate = cards.map((card) => renderCard(card, theme.backCardImage)).join('');
  return `
    <section class="view view--game" data-view="game" data-theme="${settings.themeId}">
      ${renderScoreBar()}
      <div class="game-board ${gridClass}" id="game-board" role="grid" aria-label="Memory board">
        ${cardTemplate}
      </div>
    </section>`;
}
