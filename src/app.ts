import { getState, setView, updateSettings, resetGame, resetAll } from './game/game-state';
import { buildCards } from './game/board-builder';
import { processFlip, processNoMatch } from './game/card-logic';
import { renderHomeView } from './views/home-view';
import { renderSettingsView } from './views/settings-view';
import { renderGameView } from './views/game-view';
import { renderGameOverView, renderWinnerView } from './views/result-view';
import type { ThemeId, PlayerId, BoardSize, ViewName } from './types/game.types';

const ROOT_ID = 'app';
let isProcessing = false;

/** Returns the root element */
function getRoot(): HTMLElement {
  const el = document.getElementById(ROOT_ID);
  if (!el) throw new Error(`#${ROOT_ID} not found`);
  return el;
}

/** Renders the current view into #app */
function renderCurrentView(): void {
  const { view } = getState();
  const map: Record<ViewName, () => string> = {
    home: renderHomeView,
    settings: renderSettingsView,
    game: renderGameView,
    'game-over': renderGameOverView,
    winner: renderWinnerView,
  };
  getRoot().innerHTML = map[view]();
  applyThemeClass();
}

/** Applies the active theme class to <body> */
function applyThemeClass(): void {
  document.body.className = document.body.className.replace(/theme-\S+/g, '').trim();
  document.body.classList.add(getState().settings.themeId);
}

/** Reads settings form values and updates state */
function syncSettingsFromForm(): void {
  const themeEl = document.querySelector<HTMLInputElement>('input[name="theme"]:checked');
  const playerEl = document.querySelector<HTMLInputElement>('input[name="player"]:checked');
  const sizeEl = document.querySelector<HTMLInputElement>('input[name="board-size"]:checked');
  if (themeEl) updateSettings({ themeId: themeEl.value as ThemeId });
  if (playerEl) updateSettings({ currentPlayer: playerEl.value as PlayerId });
  if (sizeEl) updateSettings({ boardSize: Number(sizeEl.value) as BoardSize });
}

/** Starts a new game from settings */
function startGame(): void {
  syncSettingsFromForm();
  const cards = buildCards(getState().settings.boardSize);
  resetGame(cards);
  setView('game');
  renderCurrentView();
}

/** Handles card flip with no-match delay */
function handleFlip(cardId: number): void {
  if (isProcessing) return;
  const result = processFlip(cardId);
  renderCurrentView();
  if (result === 'no-match') {
    isProcessing = true;
    setTimeout(() => {
      processNoMatch();
      isProcessing = false;
      renderCurrentView();
    }, 1000);
  }
  if (result === 'match' && getState().view === 'game-over') {
    setTimeout(() => {
      if (getState().winner !== 'draw') setView('winner');
      renderCurrentView();
    }, 800);
  }
}

/** Global click handler via event delegation */
function handleClick(event: Event): void {
  const target = (event.target as HTMLElement).closest<HTMLElement>('[data-action]');
  if (!target) return;
  const action = target.dataset['action'];

  if (action === 'go-to-settings') { setView('settings'); renderCurrentView(); }
  else if (action === 'start-game') startGame();
  else if (action === 'exit-game') { setView('home'); renderCurrentView(); }
  else if (action === 'go-home') { resetAll(); renderCurrentView(); }
  else if (action === 'flip-card') {
    const cardId = Number(target.dataset['cardId']);
    handleFlip(cardId);
  }
}

/** Bootstraps the app */
export function initApp(): void {
  document.addEventListener('click', handleClick);
  renderCurrentView();
}
