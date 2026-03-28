import { getAllThemes } from '../game/theme-config';
import { getState } from '../game/game-state';
import type { ThemeId, PlayerId, BoardSize, GameSettings } from '../types/game.types';

const SETTINGS_SVG = '/assets/designs/settings';

/** Maps a ThemeId to its preview image filename */
function resolvePreviewImage(themeId: ThemeId): string {
  return `${SETTINGS_SVG}/settings_pic_${themeId.replace('-', '')}.svg`;
}

/** Renders the HTML template for a single radio option */
function renderRadioTemplate(
  name: string, value: string, label: string,
  checked: boolean, radioIcon: string, selectLine: string
): string {
  return `
    <label class="settings__option ${checked ? 'settings__option--active' : ''}">
      <input type="radio" name="${name}" value="${value}" ${checked ? 'checked' : ''} class="settings__radio-input">
      <img src="${radioIcon}" class="settings__radio-icon" alt="">
      <span class="settings__option-label">${label}</span>
      ${selectLine}
    </label>`;
}

/** Renders a single radio option with custom SVG icon */
function renderRadio(name: string, value: string, label: string, checked: boolean): string {
  const radioIcon = checked
    ? `${SETTINGS_SVG}/mode_standby.svg`
    : `${SETTINGS_SVG}/fiber_manual_record.svg`;
  const selectLine = checked
    ? `<img src="${SETTINGS_SVG}/select-line.svg" class="settings__select-line" alt="">`
    : '';
  return renderRadioTemplate(name, value, label, checked, radioIcon, selectLine);
}

/** Renders a group heading with an icon */
function renderGroupTitle(iconFile: string, title: string): string {
  return `
    <h2 class="settings__group-title">
      <img src="${SETTINGS_SVG}/${iconFile}" class="settings__group-icon" alt="">
      ${title}
    </h2>`;
}

/** Renders the theme selection list */
function renderThemeOptions(currentTheme: ThemeId): string {
  return getAllThemes()
    .map((theme) => renderRadio('theme', theme.id, theme.name, theme.id === currentTheme))
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
    .map((size) => renderRadio('board-size', String(size), `${size} cards`, size === currentSize))
    .join('');
}

/** Renders the left column of the settings screen */
function renderSettingsLeft(settings: GameSettings): string {
  return `
      <div class="settings__left">
        <h1 class="settings__title">Settings</h1>
        <img src="${SETTINGS_SVG}/line_settings.svg" class="settings__title-line" alt="">
        <div class="settings__group">
          ${renderGroupTitle('palette.svg', 'Game themes')}
          ${renderThemeOptions(settings.themeId)}
        </div>
        <div class="settings__group">
          ${renderGroupTitle('chess_pawn.svg', 'Choose player')}
          ${renderPlayerOptions(settings.currentPlayer)}
        </div>
        <div class="settings__group">
          ${renderGroupTitle('style.svg', 'Board size')}
          ${renderBoardSizeOptions(settings.boardSize)}
        </div>
      </div>`;
}

/** Renders the right column of the settings screen */
function renderSettingsRight(settings: GameSettings): string {
  return `
      <div class="settings__right">
        <div class="settings__preview">
          <img src="${resolvePreviewImage(settings.themeId)}" id="settings-preview-img" alt="Theme preview">
        </div>
        <div class="settings__footer">
          <span>Game theme</span>
          <img src="${SETTINGS_SVG}/Line%206.svg" class="settings__footer-sep" alt="">
          <span>Player</span>
          <img src="${SETTINGS_SVG}/Line%206.svg" class="settings__footer-sep" alt="">
          <span>Board size</span>
          <button class="settings__start-btn" data-action="start-game">
            <img src="${SETTINGS_SVG}/small%20button.svg" alt="Start">
          </button>
        </div>
      </div>`;
}

/** Renders the settings screen HTML */
export function renderSettingsView(): string {
  const { settings } = getState();
  return `
    <section class="view view--settings" data-view="settings">
      ${renderSettingsLeft(settings)}
      ${renderSettingsRight(settings)}
    </section>`;
}
