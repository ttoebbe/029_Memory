import { getState } from '../game/game-state';

const ASSETS = '/assets/designs/theme_1';

/** Renders the game-over screen with final scores */
export function renderGameOverView(): string {
  const { players } = getState();
  return `
    <section class="view view--result" data-view="game-over">
      <img class="result__confetti" src="${ASSETS}/Confetti.svg" alt="" aria-hidden="true">
      <img class="result__game-over-title" src="${ASSETS}/text_game_over.svg" alt="Game over">
      <p class="result__subtitle">Final score</p>
      <div class="result__scores">
        <span class="result__score result__score--blue">
          <img class="result__label-icon" src="${ASSETS}/point_label_blue.svg" alt="" aria-hidden="true">
          Blue ${players.blue.score}
        </span>
        <span class="result__score result__score--orange">
          <img class="result__label-icon" src="${ASSETS}/point_label_orange.svg" alt="" aria-hidden="true">
          Orange ${players.orange.score}
        </span>
      </div>
      <button class="result__action-btn" data-action="go-home" aria-label="Back to start">
        <img src="${ASSETS}/back-to-start-button.svg" alt="Back to start">
      </button>
    </section>
  `;
}

/** Renders the winner screen */
export function renderWinnerView(): string {
  const { winner, players } = getState();
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

  return `
    <section class="view view--result view--winner" data-view="winner">
      <img class="result__confetti" src="${ASSETS}/Confetti.svg" alt="" aria-hidden="true">
      <img class="result__pawn" src="${ASSETS}/chess_pawn_${pawnColor}.svg" alt="" aria-hidden="true">
      <p class="result__subtitle">The winner is</p>
      <h1 class="result__title result__title--winner ${winnerClass}">${winnerLabel}</h1>
      <div class="result__score-row">
        <img class="result__label-icon" src="${ASSETS}/point_label_${pawnColor}.svg" alt="" aria-hidden="true">
        <span class="result__score-display">${score}</span>
      </div>
      <button class="result__action-btn" data-action="go-home" aria-label="Back to start">
        <img src="${ASSETS}/back-to-start-button.svg" alt="Back to start">
      </button>
    </section>
  `;
}
