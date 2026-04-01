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

const THEME_1_DESIGN_PATH = '/assets/designs/theme_1';
const THEME_2_DESIGN_PATH = '/assets/designs/theme_2';
const THEME_4_DESIGN_PATH = '/assets/designs/theme_4';
const THEME_4_ICONS_PATH = '/assets/icons/icons_4';

const THEMES: Record<ThemeId, Theme> = {
  'theme-1': {
    id: 'theme-1',
    name: 'Code Vibes theme',
    cardBackClass: 'card-back--theme-1',
    cardImages: THEME_1_IMAGES,
    backCardImage: '/assets/icons/icons_1/back-card.svg',
    settingsPreviewSrc: '/assets/designs/settings/settings_pic_theme1.svg',
    uiAssets: {
      scoreIconBlue: `${THEME_1_DESIGN_PATH}/point_label_blue.svg`,
      scoreIconOrange: `${THEME_1_DESIGN_PATH}/point_label_orange.svg`,
      scoreIconClass: 'score-bar__label-icon',
      currentPlayerIconBlue: `${THEME_1_DESIGN_PATH}/point_label_blue.svg`,
      currentPlayerIconOrange: `${THEME_1_DESIGN_PATH}/point_label_orange.svg`,
      currentPlayerIconClass: 'score-bar__label-icon',
      exitButtonSource: `${THEME_1_DESIGN_PATH}/btn-exit.svg`,
      exitButtonHoverSource: `${THEME_1_DESIGN_PATH}/btn-exit-hover.svg`,
      popupBackToGameButtonSource: `${THEME_1_DESIGN_PATH}/btn-popup-back.svg`,
      popupBackToGameButtonHoverSource: `${THEME_1_DESIGN_PATH}/btn-popup-back-hover.svg`,
      popupConfirmExitButtonSource: `${THEME_1_DESIGN_PATH}/exit-game-button.svg`,
      popupConfirmExitButtonHoverSource: `${THEME_1_DESIGN_PATH}/btn-exit-hover.svg`,
      gameOverTitleSrc: `${THEME_1_DESIGN_PATH}/text_game_over.svg`,
      homeButtonSource: `${THEME_1_DESIGN_PATH}/home-button.svg`,
      winnerDecorationBlue: `${THEME_1_DESIGN_PATH}/chess_pawn_blue.svg`,
      winnerDecorationOrange: `${THEME_1_DESIGN_PATH}/chess_pawn_orange.svg`,
      winnerDecorationClass: 'result__pawn',
      confettiSrc: `${THEME_1_DESIGN_PATH}/Confetti.svg`,
    },
  },
  'theme-2': {
    id: 'theme-2',
    name: 'Gaming theme',
    cardBackClass: 'card-back--theme-2',
    cardImages: THEME_2_IMAGES,
    backCardImage: '',
    settingsPreviewSrc: '/assets/designs/settings/settings_pic_theme2.svg',
    uiAssets: {
      scoreIconBlue: `${THEME_2_DESIGN_PATH}/point_chess_pawn_blue.svg`,
      scoreIconOrange: `${THEME_2_DESIGN_PATH}/point_chess_pawn_red.svg`,
      scoreIconClass: 'score-bar__score-icon',
      currentPlayerIconBlue: `${THEME_2_DESIGN_PATH}/point_chess_pawn_blue.svg`,
      currentPlayerIconOrange: `${THEME_2_DESIGN_PATH}/point_chess_pawn_red.svg`,
      currentPlayerIconClass: 'score-bar__score-icon',
      exitButtonSource: `${THEME_2_DESIGN_PATH}/btn-exit.svg`,
      exitButtonHoverSource: `${THEME_2_DESIGN_PATH}/btn-exit-hover.svg`,
      popupBackToGameButtonSource: `${THEME_2_DESIGN_PATH}/btn-popup-back.svg`,
      popupBackToGameButtonHoverSource: `${THEME_2_DESIGN_PATH}/btn-popup-back-hover.svg`,
      popupConfirmExitButtonSource: `${THEME_2_DESIGN_PATH}/btn_yes_quite_game.svg`,
      popupConfirmExitButtonHoverSource: `${THEME_2_DESIGN_PATH}/btn-exit-hover.svg`,
      gameOverTitleSrc: `${THEME_2_DESIGN_PATH}/GAME_OVER_text.svg`,
      homeButtonSource: `${THEME_2_DESIGN_PATH}/home_button.svg`,
      winnerDecorationBlue: `${THEME_2_DESIGN_PATH}/pockal.svg`,
      winnerDecorationOrange: `${THEME_2_DESIGN_PATH}/pockal.svg`,
      winnerDecorationClass: 'result__trophy',
      confettiSrc: null,
    },
  },
  'theme-4': {
    id: 'theme-4',
    name: 'Foods theme',
    cardBackClass: 'card-back--theme-4',
    cardImages: THEME_4_IMAGES,
    backCardImage: `${THEME_4_ICONS_PATH}/back-card.svg`,
    settingsPreviewSrc: `${THEME_4_DESIGN_PATH}/Settings_theme Foods.svg`,
    uiAssets: {
      scoreIconBlue: `${THEME_4_DESIGN_PATH}/player-blue.svg`,
      scoreIconOrange: `${THEME_4_DESIGN_PATH}/player-orange.svg`,
      scoreIconClass: 'score-bar__score-icon',
      currentPlayerIconBlue: `${THEME_4_DESIGN_PATH}/current-player-blue.svg`,
      currentPlayerIconOrange: `${THEME_4_DESIGN_PATH}/player-orange.svg`,
      currentPlayerIconClass: 'score-bar__score-icon',
      exitButtonSource: `${THEME_4_DESIGN_PATH}/btn-exit.svg`,
      exitButtonHoverSource: `${THEME_4_DESIGN_PATH}/btn-exit-hover.svg`,
      popupBackToGameButtonSource: `${THEME_4_DESIGN_PATH}/btn-popup-back.svg`,
      popupBackToGameButtonHoverSource: `${THEME_4_DESIGN_PATH}/btn-popup-back-hover.svg`,
      popupConfirmExitButtonSource: `${THEME_4_DESIGN_PATH}/btn-exit.svg`,
      popupConfirmExitButtonHoverSource: `${THEME_4_DESIGN_PATH}/btn-exit-hover.svg`,
      gameOverTitleSrc: `${THEME_4_DESIGN_PATH}/Game over.svg`,
      homeButtonSource: `${THEME_4_DESIGN_PATH}/home-button.svg`,
      winnerDecorationBlue: `${THEME_4_DESIGN_PATH}/Winner_blue2.svg`,
      winnerDecorationOrange: `${THEME_4_DESIGN_PATH}/Winner_orange2.svg`,
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
