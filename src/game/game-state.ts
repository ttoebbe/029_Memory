import type { GameState, GameSettings, ViewName, PlayerId } from '../types/game.types';

const DEFAULT_SETTINGS: GameSettings = {
  themeId: 'theme-1',
  currentPlayer: 'blue',
  boardSize: 16,
};

const DEFAULT_STATE: GameState = {
  view: 'home',
  settings: { ...DEFAULT_SETTINGS },
  players: {
    blue: { id: 'blue', score: 0 },
    orange: { id: 'orange', score: 0 },
  },
  cards: [],
  flippedCards: [],
  winner: null,
};

let state: GameState = structuredClone(DEFAULT_STATE);

/** Returns a read-only snapshot of the current state */
export function getState(): Readonly<GameState> {
  return state;
}

/** Navigates to a new view */
export function setView(view: ViewName): void {
  state.view = view;
}

/** Updates game settings */
export function updateSettings(partial: Partial<GameSettings>): void {
  state.settings = { ...state.settings, ...partial };
}

/** Sets the active player */
export function setCurrentPlayer(player: PlayerId): void {
  state.settings.currentPlayer = player;
}

/** Resets scores and cards for a new game, preserving settings */
export function resetGame(cards: GameState['cards']): void {
  state.players = {
    blue: { id: 'blue', score: 0 },
    orange: { id: 'orange', score: 0 },
  };
  state.cards = cards;
  state.flippedCards = [];
  state.winner = null;
}

/** Adds a point to the given player */
export function addScore(player: PlayerId): void {
  state.players[player].score += 1;
}

/** Registers a flipped card; returns current flipped cards */
export function registerFlip(cardId: number): GameState['flippedCards'] {
  const card = state.cards.find((c) => c.id === cardId);
  if (card) {
    card.isFlipped = true;
    state.flippedCards.push(card);
  }
  return state.flippedCards;
}

/** Marks both flipped cards as matched and clears the flip buffer */
export function resolveMatch(): void {
  state.flippedCards.forEach((c) => (c.isMatched = true));
  state.flippedCards = [];
}

/** Unflips both cards in the flip buffer and clears it */
export function resolveNoMatch(): void {
  state.flippedCards.forEach((c) => (c.isFlipped = false));
  state.flippedCards = [];
}

/** Switches to the other player */
export function switchPlayer(): void {
  state.settings.currentPlayer =
    state.settings.currentPlayer === 'blue' ? 'orange' : 'blue';
}

/** Sets the winner after game over */
export function setWinner(winner: GameState['winner']): void {
  state.winner = winner;
}

/** Fully resets state to defaults */
export function resetAll(): void {
  state = structuredClone(DEFAULT_STATE);
}
