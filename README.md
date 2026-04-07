# Memory Game

![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white)
![SCSS](https://img.shields.io/badge/SCSS-7--1_Pattern-CC6699?logo=sass&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-Bundler-646CFF?logo=vite&logoColor=white)

A classic card-matching game for 2 players, built with TypeScript, SCSS and Vite.
Choose from 3 themes, 2 player colors and 3 board sizes.

---

## Features

- Animated home screen with start button
- Settings page: player color, board size (4x4 / 4x6 / 8x8), theme selection
- 3 themes that change both color scheme and card artwork
- Card flip animation with match detection
- Score tracking, active player indicator
- Game over screen with winner announcement

## Themes

| Class | Name | Card Motifs |
|---|---|---|
| `theme-1` | Code Vibes | Tech icons (React, Vue, Angular, Node, Python, ...) |
| `theme-2` | Gaming | Gaming icons |
| `theme-4` | Foods | Food illustrations (Pizza, Sushi, Donuts, ...) |

## Tech Stack

- **TypeScript** with strict mode
- **SCSS** using the 7-1 pattern
- **Vite** as build tool and dev server

## Setup

```bash
npm install

# Development
npm run dev

# Production build
npm run build
```

## Project Structure

```
src/
  main.ts                    Entry point (imports styles & app)
  app.ts                     View router & event delegation

  game/
    board-builder.ts         Card generation & shuffle (Fisher-Yates)
    card-logic.ts            Flip logic & match detection
    game-state.ts            Global state management
    theme-config.ts          Theme definitions

  views/
    home-view.ts             Home screen
    settings-view.ts         Settings page
    game-view.ts             Game board & score bar
    result-view.ts           Game over & winner screen

  types/
    game.types.ts            Interfaces & type aliases

  styles/                    SCSS (7-1 pattern)
    main.scss                Entry point (@use imports)
    abstract/                Variables, mixins, functions
    base/                    Reset, typography
    components/              Buttons, cards, score bar
    layout/                  Game board grid
    pages/                   Page-specific styles
    themes/                  Theme color schemes

public/assets/               Static assets (SVG, PNG)
  designs/                   Theme-specific UI graphics
  icons/                     Card icons per theme
```
