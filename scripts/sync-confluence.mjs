/**
 * Parses src/content.js and syncs all written content to a Confluence page.
 * Run via: node scripts/sync-confluence.mjs
 * Required env vars: CONFLUENCE_EMAIL, CONFLUENCE_API_TOKEN
 */

import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const CLOUD_ID  = "cf0dc8c2-47a8-4929-8d48-2e03205ce9da";
const PAGE_ID   = "118882533466";
const BASE_URL  = `https://api.atlassian.com/ex/confluence/${CLOUD_ID}/wiki/rest/api`;
const EMAIL     = process.env.CONFLUENCE_EMAIL;
const API_TOKEN = process.env.CONFLUENCE_API_TOKEN;

if (!EMAIL || !API_TOKEN) {
  console.error("Missing CONFLUENCE_EMAIL or CONFLUENCE_API_TOKEN");
  process.exit(1);
}

const auth = Buffer.from(`${EMAIL}:${API_TOKEN}`).toString("base64");

// ── Load content ──────────────────────────────────────────────────────────────

const { QUIZZES }      = await import(resolve(__dirname, "../src/quizzes.js"));
const { MODULES_DATA } = await import(resolve(__dirname, "../src/content.js"));

// ── HTML helpers ──────────────────────────────────────────────────────────────

function esc(str) {
  return String(str ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function renderPart(part) {
  if (typeof part === "string") return esc(part);
  let text = esc(part.text ?? "");
  if (part.href)                        text = `<a href="${esc(part.href)}">${text}</a>`;
  if (part.bold || part.semibold || part.semiboldItalic) text = `<strong>${text}</strong>`;
  if (part.italic || part.semiboldItalic) text = `<em>${text}</em>`;
  return text;
}

function renderRichText(value) {
  if (!value) return "";
  if (typeof value === "string") return `<p>${esc(value)}</p>`;
  if (Array.isArray(value)) {
    return value.map(item => {
      if (typeof item === "string") return `<p>${esc(item)}</p>`;
      if (item.parts) return `<p>${item.parts.map(renderPart).join("")}</p>`;
      return "";
    }).filter(Boolean).join("\n");
  }
  return "";
}

function renderBodyNote(note) {
  if (!note) return "";
  if (typeof note === "string") return `<blockquote><p>${esc(note)}</p></blockquote>`;
  if (Array.isArray(note)) {
    return `<blockquote><p>${note.map(renderPart).join("")}</p></blockquote>`;
  }
  return "";
}

// ── Section renderers ─────────────────────────────────────────────────────────

function renderCriterion(c) {
  const parts = [];

  // Title with level badge and link
  const levelBadge = c.level ? ` <strong>[${esc(c.level)}]</strong>` : "";
  const titleText  = c.titleUrl && !c.noTitleLink
    ? `<a href="${esc(c.titleUrl)}">${esc(c.title)}</a>`
    : esc(c.title);
  parts.push(`<h4>${titleText}${levelBadge}</h4>`);

  // WCAG tag links
  if (c.tagLinks?.length) {
    parts.push("<p>" + c.tagLinks.map(t => `<a href="${esc(t.url)}">${esc(t.label)}</a>`).join(" | ") + "</p>");
  } else if (c.tags?.length) {
    parts.push(`<p><em>${c.tags.map(esc).join(", ")}</em></p>`);
  }

  // Body text
  if (c.body) parts.push(`<p>${esc(c.body)}</p>`);

  // Body paragraphs
  if (c.bodyParagraphs?.length) {
    parts.push(c.bodyParagraphs.map(p => `<p>${esc(p)}</p>`).join("\n"));
  }

  // Body items (bullet list)
  if (c.bodyItems?.length) {
    parts.push("<ul>" + c.bodyItems.map(item => `<li>${esc(item)}</li>`).join("") + "</ul>");
  }

  // Body note / pro tip
  if (c.bodyNote) parts.push(renderBodyNote(c.bodyNote));

  return parts.join("\n");
}

function renderSection(s) {
  const parts = [];

  switch (s.type) {

    case "page-title": {
      const headingText = s.headingUrl
        ? `<a href="${esc(s.headingUrl)}">${esc(s.heading)}</a>`
        : esc(s.heading);
      parts.push(`<h2>${headingText}</h2>`);
      if (s.body) parts.push(renderRichText(s.body));
      break;
    }

    case "guideline-cards": {
      const headingText = s.href
        ? `<a href="${esc(s.href)}">${esc(s.heading)}</a>`
        : esc(s.heading);
      parts.push(`<h2>${headingText}</h2>`);
      if (s.intro) parts.push(renderRichText(s.intro));
      if (s.cards?.length) {
        parts.push("<ul>" + s.cards.map(card => {
          const t = card.titleUrl
            ? `<a href="${esc(card.titleUrl)}">${esc(card.title)}</a>`
            : `<strong>${esc(card.title)}</strong>`;
          return `<li>${t}: ${esc(card.desc)}</li>`;
        }).join("") + "</ul>");
      }
      break;
    }

    case "guideline-detail": {
      const headingText = s.headingUrl
        ? `<a href="${esc(s.headingUrl)}">${esc(s.heading)}</a>`
        : esc(s.heading);
      parts.push(`<h3>${headingText}</h3>`);
      if (s.intro) parts.push(`<p>${esc(s.intro)}</p>`);
      if (s.criteria?.length) {
        parts.push(s.criteria.map(renderCriterion).join("\n"));
      }
      break;
    }

    case "pour-grid-rich": {
      if (s.heading) parts.push(`<h3>${esc(s.heading)}</h3>`);
      if (s.items?.length) {
        parts.push("<ul>" + s.items.map(item =>
          `<li><strong>${esc(item.word)}</strong>: ${esc(item.title)} ${esc(item.body)}</li>`
        ).join("") + "</ul>");
      }
      break;
    }

    case "stat-grid": {
      if (s.heading) parts.push(`<h3>${esc(s.heading)}</h3>`);
      if (s.stats?.length) {
        parts.push("<ul>" + s.stats.map(st => {
          const val = st.href
            ? `<a href="${esc(st.href)}">${esc(st.value)}</a>`
            : `<strong>${esc(st.value)}</strong>`;
          return `<li>${val} — ${esc(st.label)}</li>`;
        }).join("") + "</ul>");
      }
      break;
    }

    case "impact-note": {
      if (s.heading) parts.push(`<h3>${esc(s.heading)}</h3>`);
      if (s.body)    parts.push(`<blockquote><p>${esc(s.body)}</p></blockquote>`);
      break;
    }

    case "curb-cut": {
      if (s.heading) parts.push(`<h3>${esc(s.heading)}</h3>`);
      if (s.body)    parts.push(`<p>${esc(s.body)}</p>`);
      if (s.items?.length) {
        parts.push("<ul>" + s.items.map(item => `<li>${esc(item)}</li>`).join("") + "</ul>");
      }
      break;
    }

    case "spectrum": {
      if (s.heading) parts.push(`<h3>${esc(s.heading)}</h3>`);
      if (s.items?.length) {
        parts.push("<ul>" + s.items.map(item =>
          `<li><strong>${esc(item.category)}</strong>: ${esc(item.subtitle)}</li>`
        ).join("") + "</ul>");
      }
      break;
    }

    case "text": {
      if (s.heading) parts.push(`<h3>${esc(s.heading)}</h3>`);
      if (s.body)    parts.push(renderRichText(s.body));
      break;
    }

    default: {
      // Fallback for any other section type — render what we can
      if (s.heading) parts.push(`<h3>${esc(s.heading)}</h3>`);
      if (s.body)    parts.push(renderRichText(s.body));
      if (s.intro && typeof s.intro === "string") parts.push(`<p>${esc(s.intro)}</p>`);
      if (s.intro && Array.isArray(s.intro))      parts.push(renderRichText(s.intro));
      if (s.criteria?.length) parts.push(s.criteria.map(renderCriterion).join("\n"));
      break;
    }
  }

  return parts.join("\n");
}

function renderQuiz(quiz) {
  if (!quiz?.questions?.length) return "";
  const lines = ["<h2>Quiz</h2>"];
  quiz.questions.forEach((q, i) => {
    lines.push(`<h4>Q${i + 1}: ${esc(q.question)}</h4>`);
    if (q.options?.length) {
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
  const pages   = (mod.pages ?? []).map(p =>
    (p.sections ?? []).map(renderSection).join("\n")
  ).join("\n<hr />\n");
  const quiz = renderQuiz(mod.quiz);
  return [heading, pages, quiz].filter(Boolean).join("\n");
}).join("\n<hr /><hr />\n");

const fullBody = [
  `<p><em>Auto-generated from <a href="https://github.com/chela-giraldo/accessibility-training/blob/main/src/content.js">src/content.js</a>. Do not edit this page directly — changes will be overwritten on the next push to main.</em></p>`,
  html,
].join("\n");

// ── Confluence API ────────────────────────────────────────────────────────────

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

// Fetch page — try published first, fall back to draft
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

console.log("Done.");
console.log(`View: https://moveinc.atlassian.net/wiki/spaces/${spaceKey}/pages/${PAGE_ID}`);
