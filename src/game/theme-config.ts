import type { Theme, ThemeId } from '../types/game.types';

const THEME_1_IMAGES: string[] = [
  '/assets/icons/icons_1/angular-card.svg',
  '/assets/icons/icons_1/bootstrap-card.svg',
  '/assets/icons/icons_1/css-card.svg',
  '/assets/icons/icons_1/database-card.svg',
  '/assets/icons/icons_1/django-card.svg',
  '/assets/icons/icons_1/firebase-card.svg',
  '/assets/icons/icons_1/git-card.svg',
  '/assets/icons/icons_1/github-card.svg',
  '/assets/icons/icons_1/html5-card.svg',
  '/assets/icons/icons_1/js-card.svg',
  '/assets/icons/icons_1/node-card.svg',
  '/assets/icons/icons_1/python-card.svg',
  '/assets/icons/icons_1/react-card.svg',
  '/assets/icons/icons_1/sass-card.svg',
  '/assets/icons/icons_1/terminal-card.svg',
  '/assets/icons/icons_1/ts-card.svg',
  '/assets/icons/icons_1/vscode-card.svg',
  '/assets/icons/icons_1/vue-card.svg',
];

const THEME_2_IMAGES: string[] = Array.from(
  { length: 18 },
  (_, index) => `/assets/icons/icons_2/front-card-${String(index + 1).padStart(2, '0')}.svg`
);

const THEME_4_IMAGES: string[] = [
  '/assets/icons/icons_4/brezel-card.svg',
  '/assets/icons/icons_4/cake-card.svg',
  '/assets/icons/icons_4/chicken-card.svg',
  '/assets/icons/icons_4/chocolate-card.svg',
  '/assets/icons/icons_4/corndog-card.svg',
  '/assets/icons/icons_4/donut-card.svg',
  '/assets/icons/icons_4/hamburger-card.svg',
  '/assets/icons/icons_4/icecream-card.svg',
  '/assets/icons/icons_4/macron-card.svg',
  '/assets/icons/icons_4/muffin-card.svg',
  '/assets/icons/icons_4/pizza-card.svg',
  '/assets/icons/icons_4/pommes-card.svg',
  '/assets/icons/icons_4/pudding-card.svg',
  '/assets/icons/icons_4/salad-card.svg',
  '/assets/icons/icons_4/sandwich-card.svg',
  '/assets/icons/icons_4/sushi-card.svg',
  '/assets/icons/icons_4/taco-card.svg',
  '/assets/icons/icons_4/wrap-card.svg',
];

const T1 = '/assets/designs/theme_1';
const T2 = '/assets/designs/theme_2';
const T4 = '/assets/designs/theme_4';
const T4_ICONS = '/assets/icons/icons_4';

const THEMES: Record<ThemeId, Theme> = {
  'theme-1': {
    id: 'theme-1',
    name: 'Code Vibes theme',
    cardBackClass: 'card-back--theme-1',
    cardImages: THEME_1_IMAGES,
    backCardImage: '/assets/icons/icons_1/back-card.svg',
    settingsPreviewSrc: '/assets/designs/settings/settings_pic_theme1.svg',
    uiAssets: {
      scoreIconBlue: `${T1}/point_label_blue.svg`,
      scoreIconOrange: `${T1}/point_label_orange.svg`,
      scoreIconClass: 'score-bar__label-icon',
      currentPlayerIconBlue: `${T1}/point_label_blue.svg`,
      currentPlayerIconOrange: `${T1}/point_label_orange.svg`,
      currentPlayerIconClass: 'score-bar__label-icon',
      exitBtnSrc: `${T1}/btn-exit.svg`,
      exitBtnHoverSrc: `${T1}/btn-exit-hover.svg`,
      popupBackToGameBtnSrc: `${T1}/btn-popup-back.svg`,
      popupBackToGameBtnHoverSrc: `${T1}/btn-popup-back-hover.svg`,
      popupConfirmExitBtnSrc: `${T1}/exit-game-button.svg`,
      popupConfirmExitBtnHoverSrc: `${T1}/btn-exit-hover.svg`,
      gameOverTitleSrc: `${T1}/text_game_over.svg`,
      homeBtnSrc: `${T1}/back-to-start-button.svg`,
      winnerDecorationBlue: `${T1}/chess_pawn_blue.svg`,
      winnerDecorationOrange: `${T1}/chess_pawn_orange.svg`,
      winnerDecorationClass: 'result__pawn',
      confettiSrc: `${T1}/Confetti.svg`,
    },
  },
  'theme-2': {
    id: 'theme-2',
    name: 'Gaming theme',
    cardBackClass: 'card-back--theme-2',
    cardImages: THEME_2_IMAGES,
    backCardImage: '/assets/icons/icons_2/back-card.svg',
    settingsPreviewSrc: '/assets/designs/settings/settings_pic_theme2.svg',
    uiAssets: {
      scoreIconBlue: `${T2}/point_chess_pawn_blue.svg`,
      scoreIconOrange: `${T2}/point_chess_pawn_red.svg`,
      scoreIconClass: 'score-bar__score-icon',
      currentPlayerIconBlue: `${T2}/point_chess_pawn_blue.svg`,
      currentPlayerIconOrange: `${T2}/point_chess_pawn_red.svg`,
      currentPlayerIconClass: 'score-bar__score-icon',
      exitBtnSrc: `${T2}/btn-exit.svg`,
      exitBtnHoverSrc: `${T2}/btn-exit-hover.svg`,
      popupBackToGameBtnSrc: `${T2}/btn-popup-back.svg`,
      popupBackToGameBtnHoverSrc: `${T2}/btn-popup-back-hover.svg`,
      popupConfirmExitBtnSrc: `${T2}/btn_yes_quite_game.svg`,
      popupConfirmExitBtnHoverSrc: `${T2}/btn-exit-hover.svg`,
      gameOverTitleSrc: `${T2}/GAME_OVER_text.svg`,
      homeBtnSrc: `${T2}/btn-exit.svg`,
      homeBtnHoverSrc: `${T2}/btn-exit-hover.svg`,
      winnerDecorationBlue: `${T2}/pockal.svg`,
      winnerDecorationOrange: `${T2}/pockal.svg`,
      winnerDecorationClass: 'result__trophy',
      confettiSrc: null,
    },
  },
  'theme-4': {
    id: 'theme-4',
    name: 'Foods theme',
    cardBackClass: 'card-back--theme-4',
    cardImages: THEME_4_IMAGES,
    backCardImage: `${T4_ICONS}/back-card.svg`,
    settingsPreviewSrc: `${T4}/Settings_theme Foods.svg`,
    uiAssets: {
      scoreIconBlue: `${T4}/player-blue.svg`,
      scoreIconOrange: `${T4}/player-orange.svg`,
      scoreIconClass: 'score-bar__score-icon',
      currentPlayerIconBlue: `${T4}/current-player-blue.svg`,
      currentPlayerIconOrange: `${T4}/player-orange.svg`,
      currentPlayerIconClass: 'score-bar__score-icon',
      exitBtnSrc: `${T4}/btn-exit.svg`,
      exitBtnHoverSrc: `${T4}/btn-exit-hover.svg`,
      popupBackToGameBtnSrc: `${T4}/btn-popup-back.svg`,
      popupBackToGameBtnHoverSrc: `${T4}/btn-popup-back-hover.svg`,
      popupConfirmExitBtnSrc: `${T4}/btn-exit.svg`,
      popupConfirmExitBtnHoverSrc: `${T4}/btn-exit-hover.svg`,
      gameOverTitleSrc: `${T4}/Game over.svg`,
      homeBtnSrc: `${T4}/btn-popup-back.svg`,
      homeBtnHoverSrc: `${T4}/btn-popup-back-hover.svg`,
      winnerDecorationBlue: `${T4}/Winner_blue2.svg`,
      winnerDecorationOrange: `${T4}/Winner_orange2.svg`,
      winnerDecorationClass: 'result__pawn',
      confettiSrc: null,
    },
  },
};

/** Returns the theme config for a given theme id */
export function getTheme(id: ThemeId): Theme {
  return THEMES[id];
}

/** Returns all available themes */
export function getAllThemes(): Theme[] {
  return Object.values(THEMES);
}
