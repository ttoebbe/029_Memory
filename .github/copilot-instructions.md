# copilot instructions

Informationen speziell zu diesem Projekt. 
Es ist ein Projekt der Developerakademie aus München. Es gibt auf Github somit viele Beispiele. 
Ich möchte hier das Design1 und 2 realisieren. 
Die Nutzung von Typescript und scss steht hier im Vordergrund.
im Ordner ".DA/design/template-screens" sind optische Vorlagen, an denen sich orientiert werden soll.
Im Ordner "assets" sind die Bilder und Icons, welche benötigt werden. Wenn etwas fehlt, dann melden, dann lade ich es bei Figma herunter.




## Allgemeine Anweisungen
- Antwortsprache: Deutsch.
- Antworten kurz und präzise halten.
- Keine zusätzlichen Features oder Informationen ergänzen, die nicht explizit angefragt wurden.
- Offensichtliche Fehler, fehlende Teile oder Unklarheiten höflich ansprechen und nachfragen.
- Immer die bestehende Codestruktur des Projekts einhalten und konsistent erweitern. Auf Fehlendes oder Unklares hinweisen.

## Code-Regeln
- Maximal 14 Zeilen pro Funktion (JSDoc-Kommentare und schließende Klammern zählen nicht). Bei Bedarf aufteilen.
- Bezeichner und Kommentare auf Englisch.
- UI-Texte auf Englisch.
- Klare, aussagekräftige Namen. Keine kryptischen Abkürzungen.
  - **Verboten:** Einzelbuchstaben wie `i`, `j`, `c`, `e`, `t`, `s`, `a`, `b` — auch als Loop-Index oder Callback-Parameter.
  - **DOM-Referenzen:** Nicht mit Suffix `El` oder `Elem` abkürzen, sondern den Zweck beschreiben (z. B. `themeInput`, `rootElement`).
  - **Ausnahme:** `_` für explizit ignorierte Parameter (z. B. `(_, index)`).
- Funktionsnamen beginnen mit einem Verb (z. B. `getUserById`, `renderCard`).
- Eine Leerzeile zwischen allen Funktionen.
- HTML-Templates in separate Funktionen auslagern und als Template-Strings zurückgeben.
- `camelCase` für Funktionen und Variablen.
- `PascalCase` für Klassen und TypeScript-Interfaces (z. B. `class UserProfile`, `interface ApiResponse`).
- `UPPER_CASE` nur für unveränderliche globale Konstanten (z. B. `MAX_RETRIES`), sonst `camelCase`.
- `kebab-case` für Dateinamen, CSS-Klassen und IDs.
- CSS Custom Properties in `--kebab-case`, thematisch gruppiert (z. B. `:root { --color-primary: #0066cc; --space-1: 0.5rem; }`).
- IDs sparsam verwenden — nur für JS-Hooks oder Anker, nie für Styling.
- Namen beschreiben den Zweck, nicht das Aussehen (z. B. `.main-nav` statt `.blue-text`).
- `data-`-Attribute in `kebab-case` mit Präfix (z. B. `data-user-id="42"`).
- Test-Hooks als `data-test-*` (z. B. `data-test-id="login-button"`) — nie styling-abhängig.
- ARIA-Attribute in lowercase mit Bindestrich, WCAG-konform (z. B. `aria-label="Hauptmenü"`).
- Custom DOM Events in `kebab-case` (z. B. `new CustomEvent('user-logged-in', { detail: {} })`).
- JSDoc-Kommentare für Funktionen, Klassen und Module bevorzugen (auf Englisch). Inline-Kommentare nur wenn nötig.
- Tooling-Empfehlung: ESLint + Prettier zur Durchsetzung der Regeln.
- HTML5-Validierung nicht ausführen, außer explizit angefragt.
- Validierungen als eigenes JavaScript implementieren, außer native HTML5-Validierung ist explizit gewünscht.
- Eine Script-Datei darf maximal 400 Zeilen haben (bis 500 nur bei umfangreichem JSDoc). Bei mehr in Module aufteilen.
- Jede Schriftgröße mindestens 16px.

## Performance-Prinzipien
- **Lazy-Loading:** Daten nur laden, wenn sie tatsächlich benötigt werden (z. B. Detail-Daten erst beim Klick laden).
- **Fetch-then-Render:** Erst vollständig laden, dann rendern — kein leeres DOM befüllen.
- **Caching:** Geladene Inhalte zwischenspeichern und nicht mehrfach fetchen.

## CSS-Responsiveness
- `overflow: hidden` nicht als Layout-Fix verwenden — Ursache beheben.
- Ausnahme erlaubt: semantisches Clipping (Bild-Zuschnitt, border-radius, Card-Thumbnails) mit `object-fit`.
- Bilder: immer `width: 100%; max-width: 100%; height: auto;` oder `object-fit: cover` mit expliziten Container-Maßen.

## TypeScript
- `strict: true` immer in der `tsconfig.json` aktivieren.
- Alle Funktionsparameter und Rückgabewerte explizit typisieren.
- `interface` für Objektstrukturen bevorzugen (statt Inline-Typen).
- Union Types und Literal Types gezielt einsetzen — `any` vermeiden.
- Named Exports verwenden (`export function`, `export interface`) — Default Exports nur wenn ein Framework es erfordert.
- Empfohlene `tsconfig.json` für Vite-Projekte:
  ```json
  {
    "compilerOptions": {
      "target": "ESNext",
      "lib": ["ESNext", "DOM"],
      "module": "ESNext",
      "moduleResolution": "Bundler",
      "isolatedModules": true,
      "strict": true,
      "skipLibCheck": true,
      "noEmit": true,
      "esModuleInterop": true,
      "resolveJsonModule": true,
      "forceConsistentCasingInFileNames": true
    },
    "include": ["src"],
    "exclude": ["node_modules", "dist"]
  }
  ```

## Vite Toolchain
- Vite als Dev-Server und Bundler für TS + SCSS Projekte verwenden.
- Standardprojektstruktur:
  ```
  src/
    main.ts         ← Einstiegspunkt, SCSS hier importieren
    styles/
      style.scss    ← Haupt-Stylesheet
  index.html        ← bindet main.ts via <script type="module">
  tsconfig.json
  vite.config.ts
  package.json
  ```
- SCSS in `main.ts` importieren: `import './styles/style.scss';`
- Empfohlene `package.json`-Scripts:
  ```json
  "scripts": {
    "dev": "vite",
    "build": "tsc --noEmit && vite build",
    "preview": "vite preview"
  }
  ```
- `npm run dev` für die Entwicklung verwenden (HMR, kein separates Watch nötig).
- Für Deployment in einem Unterordner `base` in `vite.config.ts` setzen:
  ```ts
  import { defineConfig } from 'vite';
  export default defineConfig({ base: '/meinprojekt/' });
  ```

## SCSS: Struktur, Module, Funktionen

Immer zuerst an der vorhandenen Projektstruktur orientieren und konsistent erweitern, statt neue Muster einzuführen.

### Architektur (7-1 Pattern)

- `abstracts/` → Variablen, Mixins, Funktionen
- `base/` → Grundstyles (Reset, Typografie, HTML-Elemente)
- `components/` → UI-Bausteine (Buttons, Cards, Navbars)
- `layout/` → Grid, Header, Footer, Sidebar
- `pages/` → Seitenspezifische Styles
- `themes/` → Varianten (z. B. Dark/Light Mode)
- `vendors/` → Fremd-Libs (z. B. normalize.css)
- Zentrale Entry-Datei für den Build: `main.scss` oder `style.scss`.
- Komponentenbezogene Exporte über Index-Dateien mit `@forward` sammeln.
- SCSS-Partials beginnen mit `_` (z. B. `_colors.scss`).

### Sass-Modulsystem (verbindlich)

- Ausschließlich `@use` und `@forward` verwenden — kein `@import`.
- Namespace-Aliasse stabil und konsistent halten: Alias in `@use` muss exakt zu `@include` bzw. Funktionsaufrufen passen.
- Immer von Modul-Scope ausgehen: Variablen sind nicht automatisch in anderen Modulen verfügbar. Gemeinsame Tokens zentral bereitstellen und explizit per `@use` einbinden.

### Wiederverwendung statt Duplikation

- Gemeinsame Logik in `abstracts` kapseln:
  - Mixins: Layout, Animation, Media Queries (z. B. `flex-center`, `respond`)
  - Funktionen: Werteumrechnung, mathematische Helfer (z. B. `px-to-rem`)
- Maps & `@each` für Utility-Klassen nutzen (z. B. Farbpaletten automatisch generieren).
- In Komponenten nur konsumieren: Mixins via `@include`, Funktionen für berechnete Werte.

### Responsive-Konventionen

- Breakpoints als Map zentral verwalten.
- Media Queries über ein zentrales `respond`-Mixin erzeugen.
- Keine hartcodierten Breakpoints in Komponenten, wenn bereits ein Breakpoint-System existiert.

### Stil und Benennung

- BEM-Klassennamen für Komponenten und Varianten (`.block__element--modifier`).
- Verschachtelung nur wo sie Lesbarkeit verbessert — maximal 3 Ebenen tief.
- Neue Patterns nur einführen, wenn sie mit bestehenden Konventionen kompatibel sind.

### Qualitäts-Checks vor Abschluss

- Relative `@use`-Pfade prüfen.
- Namespace-Konsistenz prüfen (Alias und Aufruf stimmen überein).
- Keine implizite Variablen-Sichtbarkeit zwischen Modulen annehmen.
- Sicherstellen, dass der SCSS-Build ohne Import-/Namespace-Fehler durchläuft.
- Moderne Sass-Syntax bevorzugen (`math.div` statt Slash-Division).

### Antwortverhalten bei SCSS-Aufgaben

Bei SCSS-Code-Vorschlägen kurz erläutern:
- welches bestehende Projektmuster wiederverwendet wird,
- warum die gewählte `@use`/`@forward`-Struktur passt,
- wie die Änderung validiert werden kann (Build/Check).

### Projekt-spezifische Defaults

Wenn im Projekt vorhanden, bestehende Funktionen und Mixins nutzen, statt neue einzuführen (z. B. `px-to-rem`, `respond`, Layout-/Animation-Mixins).
