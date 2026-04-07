import { getAllThemes, getTheme } from '../game/theme-config';
import { getState } from '../game/game-state';
import type { ThemeId, PlayerId, BoardSize, GameSettings } from '../types/game.types';

const SETTINGS_SVG = '/assets/designs/settings';

/** Returns the settings preview image path for a given theme */
function resolvePreviewImage(themeId: ThemeId): string {
  return getTheme(themeId).settingsPreviewSrc;
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
      <span class="settings__option-label" data-label="${label}">${label}</span>
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
    <legend class="settings__group-title">
      <img src="${SETTINGS_SVG}/${iconFile}" class="settings__group-icon" alt="">
      ${title}
    </legend>`;
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

/** Renders the settings header with title and decorative line */
function renderSettingsHeader(): string {
  return `
        <h1 class="settings__title">Settings</h1>
        <img src="${SETTINGS_SVG}/line_settings.svg" class="settings__title-line" alt="">`;
}

/** Renders the fieldset groups for theme, player and board size */
function renderSettingsGroups(settings: GameSettings): string {
  return `
        <fieldset class="settings__group">
          ${renderGroupTitle('palette.svg', 'Game themes')}
          ${renderThemeOptions(settings.themeId)}
        </fieldset>
        <fieldset class="settings__group">
          ${renderGroupTitle('chess_pawn.svg', 'Choose player')}
          ${renderPlayerOptions(settings.currentPlayer)}
        </fieldset>
        <fieldset class="settings__group">
          ${renderGroupTitle('style.svg', 'Board size')}
          ${renderBoardSizeOptions(settings.boardSize)}
        </fieldset>`;
}

/** Renders the left column of the settings screen */
function renderSettingsLeft(settings: GameSettings): string {
  return `
      <section class="settings__left" aria-label="Game settings">
        ${renderSettingsHeader()}
        ${renderSettingsGroups(settings)}
      </section>`;
}

/** Renders the three info spans with separators inside the footer */
function renderFooterInfo(themeName: string, playerLabel: string, boardLabel: string): string {
  const sep = `<img src="${SETTINGS_SVG}/Line%206.svg" class="settings__footer-sep" alt="">`;
  return `
            <span>${themeName}</span>
            ${sep}
            <span>${playerLabel}</span>
            ${sep}
            <span>${boardLabel}</span>`;
}

/** Renders the settings footer with current selected values and start button */
function renderSettingsFooter(settings: GameSettings): string {
  const themeName = getTheme(settings.themeId).name;
  const playerLabel = settings.currentPlayer === 'blue' ? 'Blue' : 'Orange';
  const boardLabel = `${settings.boardSize} cards`;
  return `
        <footer class="settings__footer">
          <div class="settings__footer-info">
            ${renderFooterInfo(themeName, playerLabel, boardLabel)}
          </div>
          <button class="settings__start-btn" data-action="start-game">
            <img src="${SETTINGS_SVG}/small%20button.svg" data-hover-src="${SETTINGS_SVG}/btn-small-hover.svg" alt="Start">
          </button>
        </footer>`;
}

/** Renders the right column of the settings screen */
function renderSettingsRight(settings: GameSettings): string {
  return `
      <section class="settings__right" aria-label="Preview and start">
        <figure class="settings__preview">
          <img src="${resolvePreviewImage(settings.themeId)}" id="settings-preview-img" alt="Theme preview">
        </figure>
        ${renderSettingsFooter(settings)}
      </section>`;
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
