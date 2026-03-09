# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build & Development Commands

```bash
npm run dev       # Start Vite dev server
npm run build     # Production build (outputs to dist/)
npm run lint      # Run ESLint
npm run preview   # Preview production build locally
```

No test framework is configured.

## Architecture

**Noxpit** is a single-page React 19 application (Vite, no TypeScript) for a product showcase / e-commerce landing page. All data is hardcoded — there is no backend, API, or database.

### Routing

React Router v7 with `BrowserRouter`. Two routes:
- `/` — Landing page (Hero carousel → Marquee → Categories → Products → Brand → Testimonials → CTA → Footer)
- `/product` — Product detail page

Landing page sections use anchor hash links (`#hero-carousel`, `#about`, `#products`, `#features`, `#contact`).

### State Management

React Context API only — **ThemeContext** manages dark/light theme, persisted to `localStorage` (key: `noxpit-theme`, default: `dark`). Theme is applied via `data-theme` attribute on `<html>`.

### Custom Hooks

- `useCarousel` — 3-slide hero carousel with auto-play (5s interval), keyboard nav, touch/swipe, progress bar synced to slide accent color
- `useScrollReveal` — IntersectionObserver adds `.visible` to `.reveal` elements at 12% threshold

### Styling

Pure CSS with design tokens (CSS custom properties). No CSS framework.

- **Fonts:** Barlow (body), Barlow Condensed (headlines) — loaded from Google Fonts
- **Brand colors:** `--blue` (#0091d0), `--pink` (#f287b7), `--purple` (#7869af)
- **Theme switching:** All colors use CSS variables; dark/light variants swap via `[data-theme]`
- **Layout:** Flexbox + CSS Grid (7-col categories, 3-col products, 2-col specs)
- **Animations:** CSS keyframes for float, pulse, spin, marquee effects; JS-driven scroll reveal

### Conventions

- Components: PascalCase `.jsx` files in `src/components/` and `src/pages/`
- Hooks: `use`-prefixed camelCase `.js` files in `src/hooks/`
- CSS classes: kebab-case (`.hero-content`, `.prod-card`)
- SVGs are inline React functions within components (GearSVG, StatorSVG, etc.)
- Scroll reveal pattern: add `.reveal` class → JS toggles `.visible` on intersection
- Locale: Indonesian (id-ID) for number/currency formatting
- Content language: Indonesian
