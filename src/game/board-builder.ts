import type { Card, BoardSize } from '../types/game.types';
import { getTheme } from './theme-config';
import { getState } from './game-state';

/** Shuffles an array in-place using Fisher-Yates */
function shuffleArray<T>(array: T[]): T[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

/** Returns the number of unique pairs for a given board size */
function getPairCount(boardSize: BoardSize): number {
  return boardSize / 2;
}

/** Picks the required number of images from the theme's card images */
function pickImages(allImages: string[], pairCount: number): string[] {
  return allImages.slice(0, pairCount);
}

/** Creates a flat array of shuffled Card objects */
export function buildCards(boardSize: BoardSize): Card[] {
  const { settings } = getState();
  const theme = getTheme(settings.themeId);
  const pairCount = getPairCount(boardSize);
  const images = pickImages(theme.cardImages, pairCount);

  const paired = images.flatMap((imagePath, index): Card[] => [
    { id: index * 2, pairId: index, imagePath, isFlipped: false, isMatched: false },
    { id: index * 2 + 1, pairId: index, imagePath, isFlipped: false, isMatched: false },
  ]);

  return shuffleArray(paired);
}
