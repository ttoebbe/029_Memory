import { getState, setView, updateSettings, resetGame, resetAll } from './game/game-state';
import { buildCards } from './game/board-builder';
import { processFlip, processNoMatch } from './game/card-logic';
import { renderHomeView } from './views/home-view';
import { renderSettingsView } from './views/settings-view';
import { renderGameView, renderExitDialog } from './views/game-view';
import { renderGameOverView, renderWinnerView } from './views/result-view';
import type { ThemeId, PlayerId, BoardSize, ViewName } from './types/game.types';

const ROOT_ID = 'app';
const FLIP_DURATION_MS = 500;
let isProcessing = false;

/** Returns the root element */
function getRoot(): HTMLElement {
  const rootElement = document.getElementById(ROOT_ID);
  if (!rootElement) throw new Error(`#${ROOT_ID} not found`);
  return rootElement;
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
  const themeInput = document.querySelector<HTMLInputElement>('input[name="theme"]:checked');
  const playerInput = document.querySelector<HTMLInputElement>('input[name="player"]:checked');
  const sizeInput = document.querySelector<HTMLInputElement>('input[name="board-size"]:checked');
  if (themeInput) updateSettings({ themeId: themeInput.value as ThemeId });
  if (playerInput) updateSettings({ currentPlayer: playerInput.value as PlayerId });
  if (sizeInput) updateSettings({ boardSize: Number(sizeInput.value) as BoardSize });
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

  const prevFlippedIds = getState().flippedCards.map(c => c.id);
  const result = processFlip(cardId);
  if (result === 'blocked') return;

  // Animate by toggling class on the existing DOM element so CSS transition fires
  document.querySelector<HTMLElement>(`[data-card-id="${cardId}"]`)
    ?.classList.add('memory-card--flipped');

  if (result === 'match') {
    const matchedIds = [...prevFlippedIds, cardId];
    setTimeout(() => {
      matchedIds.forEach(id =>
        document.querySelector(`[data-card-id="${id}"]`)?.classList.add('memory-card--matched')
      );
      if (getState().view === 'game-over') {
        setView('game');
        renderCurrentView();
        setTimeout(() => {
          setView(getState().winner !== 'draw' ? 'winner' : 'game-over');
          renderCurrentView();
        }, 800);
      } else {
        renderCurrentView();
      }
    }, FLIP_DURATION_MS);
  } else if (result === 'no-match') {
    isProcessing = true;
    const noMatchIds = [...prevFlippedIds, cardId];
    setTimeout(() => {
      noMatchIds.forEach(id =>
        document.querySelector(`[data-card-id="${id}"]`)?.classList.remove('memory-card--flipped')
      );
      setTimeout(() => {
        processNoMatch();
        isProcessing = false;
        renderCurrentView();
      }, FLIP_DURATION_MS);
    }, 1000);
  }
}

/** Global click handler via event delegation */
function handleClick(event: Event): void {
  const target = (event.target as HTMLElement).closest<HTMLElement>('[data-action]');
  if (!target) return;
  const action = target.dataset['action'];

  if (action === 'go-to-settings') { setView('settings'); renderCurrentView(); }
  else if (action === 'start-game') startGame();
  else if (action === 'show-exit-dialog') { getRoot().insertAdjacentHTML('beforeend', renderExitDialog()); }
  else if (action === 'dismiss-exit-dialog') { document.querySelector('.exit-dialog-overlay')?.remove(); }
  else if (action === 'exit-game') { setView('home'); renderCurrentView(); }
  else if (action === 'go-home') { resetAll(); renderCurrentView(); }
  else if (action === 'flip-card') {
    const cardId = Number(target.dataset['cardId']);
    handleFlip(cardId);
  }
}

/** Syncs a single changed radio to state and re-renders the settings view */
function handleSettingsChange(event: Event): void {
  const target = event.target as HTMLInputElement;
  if (!target.name) return;

  if (target.name === 'theme') updateSettings({ themeId: target.value as ThemeId });
  else if (target.name === 'player') updateSettings({ currentPlayer: target.value as PlayerId });
  else if (target.name === 'board-size') updateSettings({ boardSize: Number(target.value) as BoardSize });
  else return;

  renderCurrentView();
}

/** Bootstraps the app */
export function initApp(): void {
  document.addEventListener('click', handleClick);
  document.addEventListener('change', handleSettingsChange);
  renderCurrentView();
}
