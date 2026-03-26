import { getAllThemes } from '../game/theme-config';
import { getState } from '../game/game-state';
import type { ThemeId, PlayerId, BoardSize } from '../types/game.types';

/** Renders a single radio option */
function renderRadio(name: string, value: string, label: string, checked: boolean): string {
  return `
    <label class="settings__option">
      <input type="radio" name="${name}" value="${value}" ${checked ? 'checked' : ''}>
      <span class="settings__option-label">${label}</span>
    </label>
  `;
}

/** Renders the theme selection list */
function renderThemeOptions(currentTheme: ThemeId): string {
  return getAllThemes()
    .map((t) => renderRadio('theme', t.id, t.name, t.id === currentTheme))
    .join('');
}

/** Renders player selection */
function renderPlayerOptions(currentPlayer: PlayerId): string {
  return (
    renderRadio('player', 'blue', 'Blue', currentPlayer === 'blue') +
    renderRadio('player', 'orange', 'Orange', currentPlayer === 'orange')
  );
}

/** Renders board size selection */
function renderBoardSizeOptions(currentSize: BoardSize): string {
  const sizes: BoardSize[] = [16, 24, 36];
  return sizes
    .map((s) => renderRadio('board-size', String(s), `${s} cards`, s === currentSize))
    .join('');
}

/** Renders the settings screen HTML */
export function renderSettingsView(): string {
  const { settings } = getState();
  return `
    <section class="view view--settings" data-view="settings">
      <div class="settings__left">
        <h1 class="settings__title">Settings</h1>
        <div class="settings__group">
          <h2 class="settings__group-title">Game themes</h2>
          ${renderThemeOptions(settings.themeId)}
        </div>
        <div class="settings__group">
          <h2 class="settings__group-title">Choose player</h2>
          ${renderPlayerOptions(settings.currentPlayer)}
        </div>
        <div class="settings__group">
          <h2 class="settings__group-title">Board size</h2>
          ${renderBoardSizeOptions(settings.boardSize)}
        </div>
      </div>
      <div class="settings__right">
        <div class="settings__preview" id="settings-preview"></div>
        <div class="settings__footer">
          <span>Game theme</span><span class="settings__separator">/</span>
          <span>Player</span><span class="settings__separator">/</span>
          <span>Board size</span>
          <button class="btn btn--primary" data-action="start-game">
            &#9654; Start
          </button>
        </div>
      </div>
    </section>
  `;
}
