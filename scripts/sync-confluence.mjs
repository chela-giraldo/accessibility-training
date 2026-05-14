/**
 * Parses src/content.js and syncs all written content to a Confluence page.
 * Run via: node scripts/sync-confluence.mjs
 * Required env vars: CONFLUENCE_EMAIL, CONFLUENCE_API_TOKEN
 */

import { readFileSync } from "fs";
import { createRequire } from "module";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const CLOUD_ID   = "cf0dc8c2-47a8-4929-8d48-2e03205ce9da";
const PAGE_ID    = "118882533466";
const BASE_URL   = `https://api.atlassian.com/ex/confluence/${CLOUD_ID}/wiki/rest/api`;
const EMAIL      = process.env.CONFLUENCE_EMAIL;
const API_TOKEN  = process.env.CONFLUENCE_API_TOKEN;

if (!EMAIL || !API_TOKEN) {
  console.error("Missing CONFLUENCE_EMAIL or CONFLUENCE_API_TOKEN");
  process.exit(1);
}

const auth = Buffer.from(`${EMAIL}:${API_TOKEN}`).toString("base64");

// ── Load content ─────────────────────────────────────────────────────────────

const require = createRequire(import.meta.url);

// Quizzes stub so content.js import doesn't fail without the full app context
const quizzesPath = resolve(__dirname, "../src/quizzes.js");
const quizzesContent = readFileSync(quizzesPath, "utf8");
// Evaluate quizzes.js as a module by dynamic import
const { QUIZZES } = await import(resolve(__dirname, "../src/quizzes.js"));
const { MODULES_DATA } = await import(resolve(__dirname, "../src/content.js"));

// ── HTML builder ─────────────────────────────────────────────────────────────

function esc(str) {
  return String(str ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function renderPart(part) {
  if (typeof part === "string") return esc(part);
  let text = esc(part.text ?? "");
  if (part.href)    text = `<a href="${esc(part.href)}">${text}</a>`;
  if (part.bold || part.semibold) text = `<strong>${text}</strong>`;
  if (part.italic)  text = `<em>${text}</em>`;
  return text;
}

function renderBody(body) {
  if (!Array.isArray(body)) return `<p>${esc(body)}</p>`;
  return body.map(item => {
    if (typeof item === "string") return `<p>${esc(item)}</p>`;
    if (item.parts) return `<p>${item.parts.map(renderPart).join("")}</p>`;
    return `<p>${esc(JSON.stringify(item))}</p>`;
  }).join("\n");
}

function renderSection(s) {
  const parts = [];

  if (s.heading) parts.push(`<h3>${esc(s.heading)}</h3>`);

  if (s.body)  parts.push(renderBody(s.body));
  if (s.intro && typeof s.intro === "string") parts.push(`<p>${esc(s.intro)}</p>`);
  if (s.intro && Array.isArray(s.intro)) parts.push(renderBody(s.intro));

  // stat-grid
  if (s.stats) {
    parts.push("<ul>" + s.stats.map(st =>
      `<li><strong>${esc(st.value)}</strong> — ${esc(st.label)}</li>`
    ).join("") + "</ul>");
  }

  // curb-cut items / bullet lists
  if (s.items && s.type !== "spectrum" && s.type !== "pour-grid-rich") {
    parts.push("<ul>" + s.items.map(item =>
      typeof item === "string"
        ? `<li>${esc(item)}</li>`
        : `<li><strong>${esc(item.category ?? item.word ?? "")}</strong>${item.subtitle ? ": " + esc(item.subtitle) : ""}${item.body ? " — " + esc(item.body) : ""}</li>`
    ).join("") + "</ul>");
  }

  // pour-grid-rich
  if (s.type === "pour-grid-rich" && s.items) {
    parts.push("<ul>" + s.items.map(item =>
      `<li><strong>${esc(item.word)}</strong>: ${esc(item.title)} ${esc(item.body)}</li>`
    ).join("") + "</ul>");
  }

  // guideline-cards
  if (s.type === "guideline-cards" && s.cards) {
    parts.push("<ul>" + s.cards.map(card => {
      const titlePart = card.titleUrl
        ? `<a href="${esc(card.titleUrl)}">${esc(card.title)}</a>`
        : `<strong>${esc(card.title)}</strong>`;
      return `<li>${titlePart}: ${esc(card.desc)}</li>`;
    }).join("") + "</ul>");
  }

  // conformance-table / comparison-table rows
  if (s.rows) {
    parts.push("<table><tbody>" + s.rows.map(row =>
      "<tr>" + row.map(cell => `<td>${esc(cell)}</td>`).join("") + "</tr>"
    ).join("") + "</tbody></table>");
  }

  // detail-list
  if (s.details) {
    parts.push("<ul>" + s.details.map(d =>
      `<li><strong>${esc(d.label ?? d.title ?? "")}</strong>: ${esc(d.value ?? d.body ?? "")}</li>`
    ).join("") + "</ul>");
  }

  // card-grid / principle-cards
  if (s.cards && s.type !== "guideline-cards") {
    parts.push("<ul>" + s.cards.map(card =>
      `<li><strong>${esc(card.title ?? card.heading ?? "")}</strong>${card.desc ? ": " + esc(card.desc) : ""}${card.body ? " — " + esc(card.body) : ""}</li>`
    ).join("") + "</ul>");
  }

  return parts.join("\n");
}

function renderPage(page, pageIndex) {
  const sections = page.sections ?? [];
  return sections.map(s => renderSection(s)).join("\n");
}

function renderQuiz(quiz) {
  if (!quiz?.questions?.length) return "";
  const lines = [`<h2>Quiz</h2>`];
  quiz.questions.forEach((q, i) => {
    lines.push(`<h4>Q${i + 1}: ${esc(q.question)}</h4>`);
    if (q.options) {
      lines.push("<ul>" + q.options.map(opt =>
        `<li>${opt.correct ? "<strong>✓ " : ""}${esc(opt.text)}${opt.correct ? "</strong>" : ""}</li>`
      ).join("") + "</ul>");
    }
    if (q.explanation) lines.push(`<p><em>${esc(q.explanation)}</em></p>`);
  });
  return lines.join("\n");
}

// ── Build full HTML body ──────────────────────────────────────────────────────

const html = MODULES_DATA.map(mod => {
  const heading = `<h1>${esc(mod.title)}</h1>`;
  const pages   = (mod.pages ?? []).map((p, i) => renderPage(p, i)).join("\n<hr />\n");
  const quiz    = renderQuiz(mod.quiz);
  return [heading, pages, quiz].filter(Boolean).join("\n");
}).join("\n<hr /><hr />\n");

const fullBody = `<p><em>Auto-generated from <a href="https://github.com/chela-giraldo/accessibility-training/blob/main/src/content.js">src/content.js</a>. Do not edit this page directly — changes will be overwritten on the next push to main.</em></p>\n${html}`;

// ── Fetch current version ─────────────────────────────────────────────────────

async function confluenceRequest(path, method = "GET", body = undefined) {
  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers: {
      "Authorization": `Basic ${auth}`,
      "Content-Type":  "application/json",
      "Accept":        "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Confluence ${method} ${path} → ${res.status}: ${text}`);
  }
  return res.json();
}

// Fetch page — try current first, fall back to draft
let current;
try {
  current = await confluenceRequest(`/content/${PAGE_ID}?expand=version,space`);
} catch {
  current = await confluenceRequest(`/content/${PAGE_ID}?expand=version,space&status=draft`);
}
const isDraft     = current.status === "draft";
const nextVersion = isDraft ? 1 : current.version.number + 1;
const spaceKey    = current.space.key;
const title       = current.title;

console.log(`Updating "${title}" (space: ${spaceKey}, status: ${current.status}, v${current.version.number} → v${nextVersion})`);

await confluenceRequest(`/content/${PAGE_ID}`, "PUT", {
  version: { number: nextVersion },
  title,
  type: "page",
  status: "current",
  body: {
    storage: {
      value:          fullBody,
      representation: "storage",
    },
  },
});

console.log("Confluence page updated successfully.");
console.log(`View: https://moveinc.atlassian.net/wiki/spaces/${spaceKey}/pages/${PAGE_ID}`);
