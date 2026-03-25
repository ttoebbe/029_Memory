# Memory Game

![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white)
![SCSS](https://img.shields.io/badge/SCSS-7--1_Pattern-CC6699?logo=sass&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-Bundler-646CFF?logo=vite&logoColor=white)

Ein klassisches Memory-Kartenspiel für 2 Spieler, entwickelt im Rahmen der **Developer Akademie München**.
Wählbare Themes, Boardgrößen und Spielerfarben sorgen für maximale Konfigurierbarkeit.

---

## Features

| User Story | Beschreibung |
|---|---|
| Homescreen | Animierter Controller-Icon, Start-Button zur Einstellungsseite |
| Spieleinstellungen | 2 Spielerfarben, 3 Boardgrößen (4×4 / 4×6 / 8×8), min. 2 Themes |
| Theme-Auswahl | Min. 2 Layouts – ändern Farbschema **und** Kartenmotive |
| Spielfeld | Karten-Flip-Animation, Punktestand, aktiver Spieler, Exit-Button |
| Spielende | Game-Over-Screen, Gewinner-Anzeige, Zurück zur Startseite |

---

## Tech Stack

- **TypeScript** – strikte Typisierung, keine `any`-Typen, max. 14 Zeilen pro Funktion
- **SCSS** – 7-1-Pattern (abstract / base / components / pages / themes)
- **Vite** – Build-Tool & Dev-Server
- **HTML5** – semantisch, barrierefrei (kein Div-Soup)

---

## Projektstruktur

```
029_Memory/
│
├── src/                             # TypeScript-Quellcode
│   ├── models/                      # Datenmodelle (Klassen)
│   │   ├── card.ts                  # Card: id, theme, imageUrl, isFlipped, isMatched
│   │   ├── player.ts                # Player: name, color, score
│   │   ├── game-settings.ts         # GameSettings: boardSize, theme, players[]
│   │   └── game-state.ts            # GameState: currentPlayer, moves, status
│   │
│   ├── services/                    # Business-Logik
│   │   ├── card-service.ts          # Karten generieren & mischen (Fisher-Yates)
│   │   ├── game-service.ts          # Spielablauf, Match-Prüfung, Gewinner ermitteln
│   │   └── score-service.ts         # Punkte verwalten
│   │
│   ├── views/                       # DOM-Rendering (UI-Layer)
│   │   ├── home-view.ts             # Startseite rendern
│   │   ├── settings-view.ts         # Einstellungsseite rendern
│   │   ├── board-view.ts            # Spielfeld aufbauen & Flip-Animation
│   │   ├── game-over-view.ts        # Game-Over-Screen
│   │   └── winner-view.ts           # Gewinner-Screen mit Confetti
│   │
│   ├── utils/                       # Pure Hilfsfunktionen
│   │   ├── dom-utils.ts             # createElement- und querySelector-Wrapper
│   │   └── shuffle-utils.ts         # Fisher-Yates-Shuffle
│   │
│   ├── types/
│   │   └── types.ts                 # Interfaces, Enums, Type-Aliases
│   │
│   └── app.ts                       # Einstiegspunkt & View-Router
│
├── assets/                          # Statische Assets (Figma-Export)
│   ├── icons/                       # SVG-Icons
│   │   ├── logo.svg
│   │   ├── logo-icon.svg
│   │   ├── logo-text.svg
│   │   ├── stadia-controller.svg    # Home-Button-Icon
│   │   ├── chess-pawn.svg           # Spieler-Icon
│   │   ├── move-item.svg            # Zug-Anzeige
│   │   ├── fiber-manual-record.svg  # Farb-Indikator
│   │   ├── palette.svg              # Theme-Auswahl
│   │   ├── mode-standby.svg
│   │   ├── smart-display.svg
│   │   ├── coderr.svg               # Coderr-Logo
│   │   └── label.svg
│   │
│   └── images/
│       ├── cards/
│       │   ├── back/                # card-back.png  (Kartenrückseite)
│       │   ├── code-vibes/          # card-01.png … card-18.png
│       │   ├── games/               # card-01.png … card-18.png
│       │   ├── da-projects/         # card-01.png … card-18.png
│       │   └── food/                # card-01.png … card-18.png
│       ├── ui/
│       │   └── confetti.png         # Gewinner-Animation
│       └── screens/                 # Referenz-Screenshots aus Figma (JPG)
│
├── scss/                            # Styles (7-1-Pattern)
│   ├── abstract/
│   │   ├── _variables.scss          # Breakpoints, Farb-Tokens, Spacing
│   │   ├── _mixin.scss              # flex-center, fade-in, respond()
│   │   └── _functions.scss          # px-to-rem()
│   ├── base/
│   │   ├── _reset.scss              # CSS-Reset
│   │   ├── _typography.scss         # Schriften, Text-Utilities
│   │   └── _spacing.scss            # Spacing-Klassen
│   ├── components/
│   │   ├── _button.scss             # Primary, Secondary, Small, Radial
│   │   ├── _card.scss               # Flip-Animation, Vorder-/Rückseite
│   │   ├── _board.scss              # CSS-Grid (4×4 / 4×6 / 8×8)
│   │   ├── _score-bar.scss          # Punkte- & Spieler-Anzeige
│   │   ├── _popup.scss              # Match-Popup, Game-Over-Overlay
│   │   └── _main.scss               # @forward aller Komponenten
│   ├── pages/
│   │   ├── _home.scss
│   │   ├── _settings.scss
│   │   ├── _game.scss
│   │   └── _imprint.scss
│   ├── themes/
│   │   ├── _code-vibes.scss         # Farbschema Theme 1
│   │   └── _games.scss              # Farbschema Theme 2
│   └── main.scss                    # Einstiegspunkt (@use-Imports)
│
├── index.html                       # HTML-Einstiegspunkt (Vite)
├── package.json
├── tsconfig.json
├── vite.config.ts
├── .gitignore
└── README.md
```

---

## Setup

```bash
# Abhängigkeiten installieren
npm install

# Dev-Server starten (http://localhost:5173)
npm run dev

# Produktion bauen
npm run build
```

---

## Coding Conventions

| Bereich | Regel |
|---|---|
| Dateinamen | `kebab-case.ts` |
| Klassen / Interfaces / Types | `PascalCase` |
| Funktionen / Variablen | `camelCase` |
| Konstanten | `UPPER_CASE` |
| Funktionslänge | max. 14 Zeilen |
| Typisierung | explizit – kein `any` |
| Kommentare | TSDoc (`/** ... */`) |
| HTML | Semantisch, kein Div-Soup |

Vollständige Vorgaben: [.helpdesk/Coding Konvention TypeScript.md](.helpdesk/Coding%20Konvention%20TypeScript.md) · [.helpdesk/Coding Convention HTML.md](.helpdesk/Coding%20Convention%20HTML.md)

---

## Design

Figma-Datei: `https://www.figma.com/design/teDxq4ywNg46iqiWHpHQYM/Memory`

Referenz-Screenshots unter `assets/images/screens/` (lokal verfügbar):

| Screen | Datei |
|---|---|
| Home | `screens/home.jpg` |
| Einstellungen (Code Vibes) | `screens/settings-code-vibes.jpg` |
| Einstellungen (Games) | `screens/settings-games.jpg` |
| Spielfeld 4×4 | `screens/game-code-vibes-16.jpg` |
| Spielfeld 4×6 | `screens/game-code-vibes-24.jpg` |
| Spielfeld 8×8 | `screens/game-code-vibes-36.jpg` |
| Game Over | `screens/game-over-01.jpg` |
| Gewinner | `screens/winner-01.jpg` |

---

## Projektregeln

Checkliste & Abnahmekriterien: [.DA/projectRules/Memory Checkliste.md](.DA/projectRules/Memory%20Checkliste.md)
