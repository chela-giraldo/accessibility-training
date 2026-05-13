# Accessibility Training

Interactive accessibility training for designers, built with React + Vite. Covers WCAG 2.2 across 9 modules with knowledge-check quizzes.

**Live site:** https://chela-giraldo.github.io/accessibility-training/
**Repo:** https://github.com/chela-giraldo/accessibility-training

---

## Editing content

All written content (module text, quiz questions, answers, explanations) lives in two files:

- `src/content.js` — module pages, body text, examples
- `src/quizzes.js` — quiz questions, answer options, correct answers, explanations

You can edit these directly, or use Claude Code (see below).

---

## Using Claude Code to make changes

Claude Code is an AI coding assistant you can run in your terminal to edit this project conversationally — the same way this project was built.

**Setup (one time per person):**

1. Install Claude Code:
   ```
   npm install -g @anthropic-ai/claude-code
   ```
2. You'll need an [Anthropic account](https://claude.ai) with a Claude subscription, or access through your company's setup.

3. Clone the repo:
   ```
   git clone https://github.com/chela-giraldo/accessibility-training.git
   cd accessibility-training
   npm install
   ```

4. Start a Claude session:
   ```
   claude
   ```

Claude will automatically read `CLAUDE.md` for project context, so it already knows the file structure, how to build, and how to deploy. You can ask it to change text, update quizzes, add content, fix bugs, etc.

---

## Running locally

```
npm run dev
```

Opens at http://localhost:5173/

---

## Deploying

After any change, build and push:

```
npm run build
git add -A
git commit -m "your message"
git push
```

The `dist/` folder is committed to the repo. GitHub Pages deploys it automatically — no build step needed on the server.
