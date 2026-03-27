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
  { length: 16 },
  (_, index) => `/assets/icons/icons_2/front-card-${String(index + 1).padStart(2, '0')}.svg`
);

const T1 = '/assets/designs/theme_1';
const T2 = '/assets/designs/theme_2';

const THEMES: Record<ThemeId, Theme> = {
  'theme-1': {
    id: 'theme-1',
    name: 'Code Vibes',
    cardBackClass: 'card-back--theme-1',
    cardImages: THEME_1_IMAGES,
    backCardImage: '/assets/icons/icons_1/back-card.svg',
    uiAssets: {
      scoreIconBlue: `${T1}/point_label_blue.svg`,
      scoreIconOrange: `${T1}/point_label_orange.svg`,
      scoreIconClass: 'score-bar__label-icon',
      currentPlayerIconBlue: `${T1}/point_label_blue.svg`,
      currentPlayerIconOrange: `${T1}/point_label_orange.svg`,
      currentPlayerIconClass: 'score-bar__label-icon',
      exitBtnSrc: `${T1}/btn_exit_game_icon.svg`,
      popupBackToGameBtnSrc: `${T1}/back-to-game-button.svg`,
      popupConfirmExitBtnSrc: `${T1}/exit-game-button.svg`,
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
    name: 'Gaming',
    cardBackClass: 'card-back--theme-2',
    cardImages: THEME_2_IMAGES,
    backCardImage: '/assets/icons/icons_2/back-card.svg',
    uiAssets: {
      scoreIconBlue: `${T2}/point_chess_pawn_blue.svg`,
      scoreIconOrange: `${T2}/point_chess_pawn_red.svg`,
      scoreIconClass: 'score-bar__score-icon',
      currentPlayerIconBlue: `${T2}/point_chess_pawn_blue.svg`,
      currentPlayerIconOrange: `${T2}/point_chess_pawn_red.svg`,
      currentPlayerIconClass: 'score-bar__score-icon',
      exitBtnSrc: `${T2}/btn_exit_game_default.svg`,
      popupBackToGameBtnSrc: `${T2}/btn-no-back-to-game_default.svg`,
      popupConfirmExitBtnSrc: `${T2}/btn_yes_quite_game.svg`,
      gameOverTitleSrc: `${T2}/GAME_OVER_text.svg`,
      homeBtnSrc: `${T2}/home_button.svg`,
      winnerDecorationBlue: `${T2}/pockal.svg`,
      winnerDecorationOrange: `${T2}/pockal.svg`,
      winnerDecorationClass: 'result__trophy',
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
