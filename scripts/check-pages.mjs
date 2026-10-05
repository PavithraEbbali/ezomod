// Checks every exported HTML page in out/: title, description, canonical, H1 count, word count.
// Run after `npm run build`: node scripts/check-pages.mjs
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const OUT = "out";
const files = [];
(function walk(dir) {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) { if (name !== "_next") walk(full); }
    else if (name.endsWith(".html")) files.push(full);
  }
})(OUT);

const decode = (s) => s.replace(/&amp;/g, "&").replace(/&#x27;|&#39;/g, "'").replace(/&quot;/g, '"').replace(/&lt;/g, "<").replace(/&gt;/g, ">");
const titles = new Map();
let problems = 0;
const rows = [];

for (const file of files.sort()) {
  const html = readFileSync(file, "utf8");
  const path = "/" + file.slice(OUT.length + 1).split(String.fromCharCode(92)).join("/").replace(/(index)?\.html$/, "");
  const title = decode(html.match(/<title>([^<]*)<\/title>/)?.[1] ?? "");
  const desc = decode(html.match(/<meta name="description" content="([^"]*)"/)?.[1] ?? "");
  const canonical = html.match(/<link rel="canonical" href="([^"]*)"/)?.[1] ?? "";
  const h1 = (html.match(/<h1[\s>]/g) ?? []).length;
  const noindex = /<meta name="robots" content="[^"]*noindex/.test(html);
  const main = html.match(/<main[^>]*>([\s\S]*?)<\/main>/)?.[1] ?? "";
  const words = decode(main.replace(/<script[\s\S]*?<\/script>/g, "").replace(/<[^>]+>/g, " ")).split(/\s+/).filter(Boolean).length;
  const issues = [];
  if (!title) issues.push("no title"); else if (title.length > 60) issues.push(`title ${title.length}ch`);
  if (!desc) issues.push("no description"); else if (desc.length > 155) issues.push(`desc ${desc.length}ch`);
  if (h1 !== 1) issues.push(`${h1} h1`);
  if (!noindex && !canonical) issues.push("no canonical");
  if (canonical && canonical !== `https://www.ezomod.com${path === "/" ? "" : path}`) issues.push(`canonical ${canonical}`);
  if (!noindex) { if (titles.has(title)) issues.push(`dup title with ${titles.get(title)}`); titles.set(title, path); }
  if (/opacity:0/.test(main)) issues.push("opacity:0 in main");
  problems += issues.length;
  rows.push({ path, words, noindex: noindex ? "noindex" : "", issues: issues.join("; ") || "ok" });
}
console.table(rows);
if (problems) { console.error(`${problems} problem(s)`); process.exit(1); }
