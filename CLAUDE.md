# Accessibility Training — Haven Design System

## What this is
An interactive accessibility training web app for designers at Move/realtor.com, built with React + Vite. It teaches WCAG 2.2 principles through 9 modules, each with content pages and a knowledge-check quiz.

## How to run
```
cd /Users/cgiraldovanegas/accessibility-training
npm run dev
```
Opens at http://localhost:5173/

## Tech stack
- React 19 + Vite
- `styled-components` for styling
- `@rdc-npm/rdc-ui` for components (internal Artifactory package — registry in `~/.npmrc`)
- `RdcUiThemeProvider` must wrap the app in `src/main.jsx` or rdc-ui components will crash

## Project structure
- `src/App.jsx` — entire app (4800+ lines): all module data, components, and routing logic
- `src/main.jsx` — entry point with `RdcUiThemeProvider` wrapper
- `public/` — all images and SVG assets referenced by the app
- `public/Images/` — per-module illustration assets

## The 9 modules
1. Why accessibility matters
2. WCAG — The Global Standard
3. Inclusive design | Perceivable
4. Inclusive design | Operable
5. Inclusive design | Understandable
6. Inclusive design | Robust
7. Accessibility in Figma
8. Design system & Storybook
9. Your role & checklist

## Key design decisions
- Uses Haven design system branding (logo, colors, fonts: Galano Grotesque Alt)
- Modules unlock sequentially — must complete quiz to proceed
- Quiz supports single and multi-question formats
- `isReadOnly` mode shows module recap after completion

## Workflow
- After every change, always `git add -A && git commit -m "<description>" && git push`
- This keeps GitHub and the live site at https://chela-giraldo.github.io/accessibility-training/ up to date automatically
- No need to ask — just do it after every task

## Known gotchas
- `@rdc-npm/rdc-ui` requires `legacy-peer-deps` to install (peer dep conflict with React 19)
- Missing `RdcUiThemeProvider` causes a blank page crash on any rdc-ui component render
- Images live in `public/` — Vite serves them from `/` root path
