/** Available view names for the single-page router */
export type ViewName = 'home' | 'settings' | 'game' | 'game-over' | 'winner';

/** Player identifier */
export type PlayerId = 'blue' | 'orange';

/** Available board sizes (total card count) */
export type BoardSize = 16 | 24 | 36;

/** Available theme identifiers */
export type ThemeId = 'theme-1' | 'theme-2';

/** A single memory card */
export interface Card {
  id: number;
  pairId: number;
  imagePath: string;
  isFlipped: boolean;
  isMatched: boolean;
}

/** Player data */
export interface Player {
  id: PlayerId;
  score: number;
}

/** User-selected game settings */
export interface GameSettings {
  themeId: ThemeId;
  currentPlayer: PlayerId;
  boardSize: BoardSize;
}

/** Full game state */
export interface GameState {
  view: ViewName;
  settings: GameSettings;
  players: Record<PlayerId, Player>;
  cards: Card[];
  flippedCards: Card[];
  winner: PlayerId | 'draw' | null;
}

/** Theme definition */
export interface Theme {
  id: ThemeId;
  name: string;
  cardBackClass: string;
  cardImages: string[];
  backCardImage: string;
}
