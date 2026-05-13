# Accessibility Training — Haven Design System

## What this is
An interactive accessibility training web app for designers at Move/realtor.com, built with React + Vite. It teaches WCAG 2.2 principles through 7 modules, each with content pages and a knowledge-check quiz.

## How to run
```
cd /Users/cgiraldovanegas/Desktop/accessibility-training
npm run dev
```
Opens at http://localhost:5173/

## Tech stack
- React 19 + Vite
- `styled-components` for styling
- `@rdc-npm/rdc-ui` icons still imported in App.jsx (node_modules must be present locally)
- Theme and components are local implementations — no `RdcUiThemeProvider` needed

## Project structure
- `src/content.js` — all written copy: module titles, body text, quiz questions/answers. Edit text here.
- `src/App.jsx` — all components and routing logic (~4800 lines)
- `src/main.jsx` — entry point
- `public/` — all images and SVG assets referenced by the app
- `public/Images/` — per-module illustration assets

## The 7 modules
1. Why accessibility matters
2. WCAG: The Global Standard for Accessibility
3. WCAG principles | Perceivable
4. WCAG principles | Operable
5. WCAG principles | Understandable
6. WCAG principles | Robust
7. Your role & checklist

## Key design decisions
- Uses Haven design system branding (logo, colors, fonts: Galano Grotesque Alt)
- Modules unlock sequentially — must complete quiz to proceed
- Quiz supports single and multi-question formats
- `isReadOnly` mode shows module recap after completion

## Workflow
- After every change, always run `npm run build` first, then `git add -A && git commit -m "<description>" && git push`
- `dist/` is committed to the repo — the CI workflow deploys it directly (no build step on the runner)
- This keeps GitHub and the live site at https://chela-giraldo.github.io/accessibility-training/ up to date automatically
- No need to ask — just do it after every task

## Known gotchas
- Images use `import.meta.env.BASE_URL` prefix (via `withBase()`) so they work both locally and on GitHub Pages
- `src/content.js` is the single source of truth for all written content
