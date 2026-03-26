import type { PlayerId } from '../types/game.types';
import {
  getState,
  registerFlip,
  resolveMatch,
  resolveNoMatch,
  addScore,
  switchPlayer,
  setWinner,
  setView,
} from './game-state';

/** Returns true if a card can be flipped right now */
export function canFlipCard(cardId: number): boolean {
  const { cards, flippedCards } = getState();
  if (flippedCards.length >= 2) return false;
  const card = cards.find((card) => card.id === cardId);
  return !!card && !card.isFlipped && !card.isMatched;
}

/** Determines the winner from current scores */
function determineWinner(): PlayerId | 'draw' {
  const { players } = getState();
  if (players.blue.score > players.orange.score) return 'blue';
  if (players.orange.score > players.blue.score) return 'orange';
  return 'draw';
}

/** Checks if all cards are matched */
function isGameOver(): boolean {
  return getState().cards.every((card) => card.isMatched);
}

/** Handles post-match logic: score, next turn or game over */
function handleMatch(currentPlayer: PlayerId): void {
  addScore(currentPlayer);
  resolveMatch();
  if (isGameOver()) {
    setWinner(determineWinner());
    setView('game-over');
  }
}

/**
 * Processes a card flip attempt.
 * Returns 'flipped' | 'match' | 'no-match' | 'blocked'.
 * On 'no-match', the caller must wait ~1s before calling processNoMatch().
 */
export function processFlip(cardId: number): 'flipped' | 'match' | 'no-match' | 'blocked' {
  if (!canFlipCard(cardId)) return 'blocked';

  const flipped = registerFlip(cardId);
  if (flipped.length < 2) return 'flipped';

  const [firstCard, secondCard] = flipped;
  if (firstCard.pairId === secondCard.pairId) {
    handleMatch(getState().settings.currentPlayer);
    return 'match';
  }
  return 'no-match';
}

/** Resolves a non-match: unflips cards and switches player */
export function processNoMatch(): void {
  resolveNoMatch();
  switchPlayer();
}
