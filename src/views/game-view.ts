import { getState } from '../game/game-state';
import { getTheme } from '../game/theme-config';
import type { Card } from '../types/game.types';

const ASSETS = '/assets/designs/theme_1';

/** Renders a single memory card */
function renderCard(card: Card, backImage: string): string {
  const flippedClass = card.isFlipped || card.isMatched ? 'memory-card--flipped' : '';
  const matchedClass = card.isMatched ? 'memory-card--matched' : '';
  return `
    <div class="memory-card ${flippedClass} ${matchedClass}"
         data-card-id="${card.id}"
         data-action="flip-card"
         role="button"
         aria-label="Memory card">
      <div class="memory-card__inner">
        <div class="memory-card__back">
          <img src="${backImage}" alt="" aria-hidden="true">
        </div>
        <div class="memory-card__front">
          <img src="${card.imagePath}" alt="Card image">
        </div>
      </div>
    </div>
  `;
}

/** Renders the score header */
function renderScoreBar(): string {
  const { players, settings } = getState();
  return `
    <header class="score-bar">
      <div class="score-bar__scores">
        <span class="score-bar__player score-bar__player--blue">
          <img class="score-bar__label-icon" src="${ASSETS}/point_label_blue.svg" alt="" aria-hidden="true">
          Blue ${players.blue.score}
        </span>
        <span class="score-bar__player score-bar__player--orange">
          <img class="score-bar__label-icon" src="${ASSETS}/point_label_orange.svg" alt="" aria-hidden="true">
          Orange ${players.orange.score}
        </span>
      </div>
      <p class="score-bar__current">
        Current player:
        <img class="score-bar__pawn"
             src="${ASSETS}/chess_pawn_${settings.currentPlayer}.svg"
             alt="${settings.currentPlayer} player's turn">
      </p>
      <button class="score-bar__exit-btn" data-action="show-exit-dialog" aria-label="Exit game">
        <img src="${ASSETS}/exit-game-button.svg" alt="Exit game">
      </button>
    </header>
  `;
}

/** Renders the exit confirmation dialog overlay */
export function renderExitDialog(): string {
  return `
    <div class="exit-dialog-overlay" data-action="dismiss-exit-dialog">
      <div class="exit-dialog" role="dialog" aria-modal="true" aria-labelledby="exit-dialog-title">
        <p id="exit-dialog-title" class="exit-dialog__title">
          Are you sure you want to quit the game?
        </p>
        <div class="exit-dialog__actions">
          <button class="exit-dialog__btn" data-action="dismiss-exit-dialog" aria-label="Back to game">
            <img src="${ASSETS}/back-to-game-button.svg" alt="Back to game">
          </button>
          <button class="exit-dialog__btn" data-action="exit-game" aria-label="Exit game">
            <img src="${ASSETS}/exit-game-button.svg" alt="Exit game">
          </button>
        </div>
      </div>
    </div>
  `;
}

/** Renders the game board view */
export function renderGameView(): string {
  const { cards, settings } = getState();
  const theme = getTheme(settings.themeId);
  const gridClass = `game-board--${settings.boardSize}`;
  const cardHtml = cards.map((card) => renderCard(card, theme.backCardImage)).join('');

  return `
    <section class="view view--game" data-view="game" data-theme="${settings.themeId}">
      ${renderScoreBar()}
      <div class="game-board ${gridClass}" id="game-board">
        ${cardHtml}
      </div>
    </section>
  `;
}
