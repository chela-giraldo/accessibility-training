# Accessibility Training

Interactive accessibility training for designers, built with React + Vite. Covers WCAG 2.2 across 7 modules with knowledge-check quizzes.

**Live site:** https://curly-goggles-r314ew1.pages.github.io/
**Repo:** https://github.com/MoveRDC/accessibility-training

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
   git clone https://github.com/MoveRDC/accessibility-training.git
   cd accessibility-training
   npm install
   ```

4. Start a Claude session:
   ```
   claude
   ```

Claude will automatically read `CLAUDE.md` for project context, so it already knows the file structure, how to build, and how to deploy. You can ask it to change text, update quizzes, add content, fix bugs, etc.

---

## Editing examples and layout (Figma)

Images, illustrations, and example layouts used throughout the training are sourced from the Figma file. To update them:

1. Open the [Accessibility Training Source File](https://www.figma.com/design/0sYcVsaK1cEP7mVPgmvD0k/Accessibility-Training-Source-File?node-id=0-1&t=1OaFkuSBu8ghj25u-1) in Figma
2. Make your changes
3. Export the updated asset as SVG or PNG
4. Replace the corresponding file in `public/Images/` in the repo (same filename)
5. Build and push (see Deploying below)

---

## Running locally

```
npm run dev
```

Opens at http://localhost:5173/

---

## Confluence sync

All written content is automatically synced to a Confluence page whenever `src/content.js` or `src/quizzes.js` is pushed to `main`.

**Confluence page:** https://moveinc.atlassian.net/wiki/spaces/systems/pages/118882533466

The sync is handled by a GitHub Action (`.github/workflows/sync-confluence.yml`) that runs `scripts/sync-confluence.mjs`. It parses the content files and overwrites the Confluence page via the Atlassian REST API.

**Required GitHub secrets** (already configured):
- `CONFLUENCE_EMAIL` — your moveinc email
- `CONFLUENCE_API_TOKEN` — an [Atlassian API token](https://id.atlassian.com/manage-profile/security/api-tokens)

To trigger a manual sync without making a content change, go to [Actions → Sync content to Confluence](https://github.com/MoveRDC/accessibility-training/actions/workflows/sync-confluence.yml) and click **Run workflow**.

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
