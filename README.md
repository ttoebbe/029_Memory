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
| Spieleinstellungen | 2 Spielerfarben, 3 Boardgrößen (4×4 / 4×6 / 8×8), 3 Themes |
| Theme-Auswahl | 3 Layouts – ändern Farbschema **und** Kartenmotive |
| Spielfeld | Karten-Flip-Animation, Punktestand, aktiver Spieler, Exit-Button |
| Spielende | Game-Over-Screen, Gewinner-Anzeige, Zurück zur Startseite |

---

## Themes

| Theme-Klasse | Name | Kartenmotive |
|---|---|---|
| `theme-1` | Code Vibes | Tech-Icons (React, Vue, Angular, Node, Python …) |
| `theme-2` | Gaming | Gaming-Icons |
| `theme-4` | Foods | Lebensmittel-Illustrationen (Pizza, Sushi, Donuts …) |

---

## Tech Stack

- **TypeScript** – strikte Typisierung, keine `any`-Typen, max. 14 Zeilen pro Funktion
- **SCSS** – 7-1-Pattern (abstract / base / components / layout / pages / themes)
- **Vite** – Build-Tool & Dev-Server
- **HTML5** – semantisch, barrierefrei (kein Div-Soup)

---

## Projektstruktur

```
029_Memory/
│
├── src/                             # TypeScript-Quellcode
│   ├── app.ts                       # View-Router & Event-Delegation
│   ├── main.ts                      # Einstiegspunkt (importiert styles & app)
│   │
│   ├── game/                        # Spiellogik & State
│   │   ├── board-builder.ts         # Karten generieren & mischen (Fisher-Yates)
│   │   ├── card-logic.ts            # Flip-Logik & Match-Prüfung
│   │   ├── game-state.ts            # Globales State-Management
│   │   └── theme-config.ts          # Theme-Definitionen (3 Themes)
│   │
│   ├── views/                       # UI-Rendering (reine Funktionen → HTML-Strings)
│   │   ├── home-view.ts             # Startseite
│   │   ├── settings-view.ts         # Einstellungsseite
│   │   ├── game-view.ts             # Spielfeld & Score-Bar
│   │   └── result-view.ts           # Game-Over & Gewinner-Screen
│   │
│   ├── types/
│   │   └── game.types.ts            # Interfaces, Union Types, Type-Aliases
│   │
│   └── styles/                      # SCSS (7-1-Pattern)
│       ├── main.scss                # Einstiegspunkt (@use-Imports)
│       ├── abstract/
│       │   ├── _variables.scss      # CSS Custom Properties, Breakpoints
│       │   ├── _mixin.scss          # flex-center, fade-in, respond()
│       │   └── _functions.scss      # px-to-rem()
│       ├── base/
│       │   ├── _reset.scss          # CSS-Reset
│       │   └── _typography.scss     # Schriften & Text-Utilities
│       ├── components/
│       │   ├── _button.scss         # Button-Varianten
│       │   ├── _card.scss           # Flip-Animation, Vorder-/Rückseite
│       │   ├── _score-bar.scss      # Punkte- & Spieler-Anzeige
│       │   └── _main.scss           # @forward aller Komponenten
│       ├── layout/
│       │   └── _game-board.scss     # CSS-Grid (4×4 / 4×6 / 8×8)
│       ├── pages/
│       │   ├── _home.scss
│       │   ├── _settings.scss
│       │   ├── _game.scss
│       │   └── _result.scss
│       └── themes/
│           ├── _theme-1.scss        # Code Vibes – Farbschema
│           ├── _theme-2.scss        # Gaming – Farbschema
│           └── _theme-4.scss        # Foods – Farbschema
│
├── public/assets/                   # Statische Assets (SVG, PNG)
│   ├── designs/                     # Theme-spezifische UI-Grafiken
│   │   ├── theme_1/
│   │   ├── theme_2/
│   │   ├── theme_4/
│   │   └── settings/
│   └── icons/                       # Karten-Icons nach Theme
│       ├── icons_1/                 # Tech-Icons (Code Vibes)
│       ├── icons_2/                 # Gaming-Icons
│       └── icons_4/                 # Food-Icons
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
| Kommentare | JSDoc (`/** ... */`) |
| HTML | Semantisch, kein Div-Soup |

Vollständige Vorgaben: [.helpdesk/Coding Konvention TypeScript.md](.helpdesk/Coding%20Konvention%20TypeScript.md) · [.helpdesk/Coding Convention HTML.md](.helpdesk/Coding%20Convention%20HTML.md)

---

## Design

Referenz-Screenshots unter `.DA/design/template-screens/`:

| Theme | Ordner |
|---|---|
| Code Vibes | `.DA/design/template-screens/theme1/` |
| Gaming | `.DA/design/template-screens/theme2/` |
| Foods | `.DA/design/template-screens/theme4/` |

---

## Projektregeln

Checkliste & Abnahmekriterien: [.DA/projectRules/Memory Checkliste.md](.DA/projectRules/Memory%20Checkliste.md)
