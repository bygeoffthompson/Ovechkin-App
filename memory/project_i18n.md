---
name: project-i18n
description: React i18n implementation — 6 languages, localStorage persistence, React + static HTML coverage
metadata:
  type: project
---

React i18n added Aug 2026 using `i18next` + `react-i18next`.

**Languages:** English (en), Spanish (es), French (fr), Russian (ru), Swedish (sv), Finnish (fi)

**localStorage key:** `ovechkin-app-language` — value is the language code (e.g. `en`, `ru`)

**Architecture:**
- `src/locales/[lang].json` — 6 translation JSON files with all React app strings
- `src/i18n.js` — initializes i18next, reads localStorage on boot
- `src/index.js` — imports `./i18n` before App renders
- React components use `useTranslation()` hook: App.js, WelcomeMessage, NoResults, Results, RandomSearch, GoalAccordions
- `public/i18n-static.js` — self-contained vanilla JS with all static page translations embedded; injected into every HTML file's footer; handles `data-i18n` attribute swaps + language selector `<select>` injection

**Language change flow:** user picks language → `localStorage.setItem` → `location.reload()` → i18n reads localStorage on next boot

**Static HTML coverage:** all 9 HTML files in public/ have `data-i18n` attributes on translatable elements and `<script src="/i18n-static.js"></script>` before `</body>`. 404.html also got a full footer added.

**Not translated (intentional):** player names, team names, goalie names, hockey abbreviations (ENG, GWG, PPG, OT), jersey button labels, help page body text (too technical with code examples).

**Why:** [[user-geoff]] wanted multi-language support for international hockey fans.
