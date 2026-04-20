#!/usr/bin/env node
// One-time helper: exports all quiz data from content.js as a CSV you can import into Google Sheets
// Run: node scripts/export-quizzes-to-csv.js

import { MODULES_DATA } from "../src/content.js";
import { writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = join(__dirname, "quizzes-template.csv");

function escape(s) {
  const str = String(s ?? "");
  return str.includes(",") || str.includes('"') || str.includes("\n")
    ? `"${str.replace(/"/g, '""')}"` : str;
}

const header = "module_id,question,option_a,option_b,option_c,option_d,answer_index,explanation";
const rows = [header];

for (const mod of MODULES_DATA) {
  const quizzes = Array.isArray(mod.quiz) ? mod.quiz : [mod.quiz];
  for (const q of quizzes) {
    if (!q?.question) continue;
    const opts = q.options ?? [];
    rows.push([
      escape(mod.id),
      escape(q.question),
      escape(opts[0] ?? ""),
      escape(opts[1] ?? ""),
      escape(opts[2] ?? ""),
      escape(opts[3] ?? ""),
      escape(q.answer),
      escape(q.explanation),
    ].join(","));
  }
}

writeFileSync(OUT, rows.join("\n"), "utf8");
console.log(`✅  Wrote scripts/quizzes-template.csv (${rows.length - 1} questions)`);
console.log("   Import this file into Google Sheets: File → Import → Upload");
