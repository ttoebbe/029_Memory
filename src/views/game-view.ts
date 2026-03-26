import { getState } from '../game/game-state';
import { getTheme } from '../game/theme-config';
import type { Card } from '../types/game.types';

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
          <span class="score-bar__dot score-bar__dot--blue"></span>
          Blue ${players.blue.score}
        </span>
        <span class="score-bar__player score-bar__player--orange">
          <span class="score-bar__dot score-bar__dot--orange"></span>
          Orange ${players.orange.score}
        </span>
      </div>
      <p class="score-bar__current">
        Current player:
        <span class="score-bar__dot score-bar__dot--${settings.currentPlayer}"></span>
      </p>
      <button class="btn btn--ghost" data-action="exit-game">
        &#x2386; Exit game
      </button>
    </header>
  `;
}

/** Renders the game board view */
export function renderGameView(): string {
  const { cards, settings } = getState();
  const theme = getTheme(settings.themeId);
  const gridClass = `game-board--${settings.boardSize}`;
  const cardHtml = cards.map((c) => renderCard(c, theme.backCardImage)).join('');

  return `
    <section class="view view--game" data-view="game" data-theme="${settings.themeId}">
      ${renderScoreBar()}
      <div class="game-board ${gridClass}" id="game-board">
        ${cardHtml}
      </div>
    </section>
  `;
}
