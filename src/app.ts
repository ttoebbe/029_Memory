import { getState, setView, updateSettings, resetGame } from './game/game-state';
import { buildCards } from './game/board-builder';
import { processFlip, processNoMatch } from './game/card-logic';
import { renderHomeView } from './views/home-view';
import { renderSettingsView } from './views/settings-view';
import { renderGameView, renderExitDialog } from './views/game-view';
import { renderGameOverView, renderWinnerView } from './views/result-view';
import type { ThemeId, PlayerId, BoardSize, ViewName } from './types/game.types';

const ROOT_ID = 'app';
const FLIP_DURATION_MS = 500;
const RESULT_TRANSITION_DELAY_MS = 3000;
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

/** Renders game-over first and transitions to winner after delay for non-draw outcomes */
function handleGameOverTransition(): void {
  renderCurrentView();
  if (getState().winner === 'draw') return;
  setTimeout(() => {
    if (getState().view !== 'game-over') return;
    setView('winner');
    renderCurrentView();
  }, RESULT_TRANSITION_DELAY_MS);
}

/** Handles matched card pair: marks DOM elements and transitions to result view if game over */
function handleMatchResult(matchedIds: number[]): void {
  setTimeout(() => {
    matchedIds.forEach((cardId) => {
      document.querySelector(`[data-card-id="${cardId}"]`)
        ?.classList.add('memory-card--matched');
    });
    if (getState().view !== 'game-over') return renderCurrentView();
    handleGameOverTransition();
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
function getHoverableImage(target: EventTarget | null): HTMLImageElement | null {
  const button = (target as HTMLElement)?.closest('button');
  return button?.querySelector<HTMLImageElement>('[data-hover-src]') ?? null;
}

/** Returns true when the related element is outside the button */
function isLeavingButton(parentButton: HTMLElement, related: EventTarget | null): boolean {
  return !(related instanceof Node) || !parentButton.contains(related);
}

/** Swaps button image to its hover variant on mouse enter */
function handleButtonMouseOver(event: MouseEvent): void {
  const button = (event.target as HTMLElement).closest('button');
  if (!button || !isLeavingButton(button, event.relatedTarget)) return;
  const hoverableImage = getHoverableImage(button);
  if (!hoverableImage?.dataset['hoverSrc'] || hoverableImage.src.includes('hover')) return;
  hoverableImage.dataset['defaultSrc'] = hoverableImage.src;
  hoverableImage.style.width = `${hoverableImage.offsetWidth}px`;
  hoverableImage.style.height = `${hoverableImage.offsetHeight}px`;
  hoverableImage.src = hoverableImage.dataset['hoverSrc'];
}

/** Restores button image to default on mouse leave */
function handleButtonMouseOut(event: MouseEvent): void {
  const button = (event.target as HTMLElement).closest('button');
  if (!button || !isLeavingButton(button, event.relatedTarget)) return;
  const hoverableImage = getHoverableImage(button);
  if (!hoverableImage?.dataset['defaultSrc']) return;
  hoverableImage.style.width = '';
  hoverableImage.style.height = '';
  hoverableImage.src = hoverableImage.dataset['defaultSrc'];
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
  else if (action === 'go-home') { resetGame([]); setView('settings'); renderCurrentView(); }
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
