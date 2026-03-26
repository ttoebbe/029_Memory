import { getState } from '../game/game-state';

/** Renders the game-over screen with final scores */
export function renderGameOverView(): string {
  const { players } = getState();
  return `
    <section class="view view--result" data-view="game-over">
      <h1 class="result__title result__title--game-over">Game over</h1>
      <p class="result__subtitle">Final score</p>
      <div class="result__scores">
        <span class="result__score result__score--blue">
          <span class="score-bar__dot score-bar__dot--blue"></span>
          Blue ${players.blue.score}
        </span>
        <span class="result__score result__score--orange">
          <span class="score-bar__dot score-bar__dot--orange"></span>
          Orange ${players.orange.score}
        </span>
      </div>
      <button class="btn btn--ghost result__home-btn" data-action="go-home">Home</button>
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

  return `
    <section class="view view--result view--winner" data-view="winner">
      <div class="confetti" aria-hidden="true"></div>
      <p class="result__subtitle">The winner is</p>
      <h1 class="result__title result__title--winner ${winnerClass}">${winnerLabel}</h1>
      <p class="result__score-display">${score}</p>
      <button class="btn btn--ghost result__home-btn" data-action="go-home">
        Back to start
      </button>
    </section>
  `;
}
