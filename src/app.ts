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

/** Adds the flipped CSS class to a card DOM element */
function animateCardFlip(cardId: number): void {
  document.querySelector<HTMLElement>(`[data-card-id="${cardId}"]`)
    ?.classList.add('memory-card--flipped');
}

/** Handles matched card pair: marks DOM elements and transitions to result view if game over */
function handleMatchResult(matchedIds: number[]): void {
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
}

/** Handles a non-matching card pair: unflips cards after a delay */
function handleNoMatchResult(noMatchIds: number[]): void {
  isProcessing = true;
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

/** Handles card flip with no-match delay */
function handleFlip(cardId: number): void {
  if (isProcessing) return;
  const prevFlippedIds = getState().flippedCards.map(card => card.id);
  const result = processFlip(cardId);
  if (result === 'blocked') return;
  animateCardFlip(cardId);
  if (result === 'match') handleMatchResult([...prevFlippedIds, cardId]);
  else if (result === 'no-match') handleNoMatchResult([...prevFlippedIds, cardId]);
}

/** Returns the hoverable img inside the button nearest to event.target */
function getHoverableImg(target: EventTarget | null): HTMLImageElement | null {
  const btn = (target as HTMLElement)?.closest('button');
  return btn?.querySelector<HTMLImageElement>('[data-hover-src]') ?? null;
}

/** Returns true when the related element is outside the button */
function isLeavingButton(btn: HTMLElement, related: EventTarget | null): boolean {
  return !(related instanceof Node) || !btn.contains(related);
}

/** Swaps button image to its hover variant on mouse enter */
function handleButtonMouseOver(event: MouseEvent): void {
  const btn = (event.target as HTMLElement).closest('button');
  if (!btn || !isLeavingButton(btn, event.relatedTarget)) return;
  const img = getHoverableImg(btn);
  if (!img?.dataset['hoverSrc'] || img.src.includes('hover')) return;
  img.dataset['defaultSrc'] = img.src;
  img.src = img.dataset['hoverSrc'];
}

/** Restores button image to default on mouse leave */
function handleButtonMouseOut(event: MouseEvent): void {
  const btn = (event.target as HTMLElement).closest('button');
  if (!btn || !isLeavingButton(btn, event.relatedTarget)) return;
  const img = getHoverableImg(btn);
  if (!img?.dataset['defaultSrc']) return;
  img.src = img.dataset['defaultSrc'];
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
  else if (action === 'exit-game') { resetGame([]); setView('settings'); renderCurrentView(); }
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
  document.addEventListener('mouseover', handleButtonMouseOver as EventListener);
  document.addEventListener('mouseout', handleButtonMouseOut as EventListener);
  renderCurrentView();
}
