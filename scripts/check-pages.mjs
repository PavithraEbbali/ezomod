// QA for every exported HTML page in out/. Run after `npm run build`:
//   node scripts/check-pages.mjs
// Checks: title/description length, canonical, single H1, duplicate titles, opacity:0 in main,
// JSON-LD parses + expected types + site-level @id references resolve, FAQPage text matches
// the visible page, BreadcrumbList is well-formed, and NO "{{TODO" placeholders anywhere.
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const OUT = "out";
const SITE = "https://www.ezomod.com";

/** Expected JSON-LD @types per page (Organization and WebSite are sitewide). */
function expectedTypes(path, noindex) {
  if (path === "/404") return [];
  const sitewide = ["Organization", "WebSite"];
  if (path === "/") return [...sitewide, "ProfessionalService", "FAQPage"];
  if (path === "/about") return [...sitewide, "ProfessionalService", "BreadcrumbList"];
  if (path === "/services") return [...sitewide, "ItemList", "BreadcrumbList"];
  if (path.startsWith("/services/")) return [...sitewide, "Service", "FAQPage", "BreadcrumbList"];
  if (path === "/industries/real-estate") return [...sitewide, "FAQPage", "BreadcrumbList"];
  if (path === "/faq") return [...sitewide, "FAQPage", "BreadcrumbList"];
  // Draft posts are noindex and must NOT carry Article schema in production.
  if (path.startsWith("/blog/")) return noindex ? [...sitewide, "BreadcrumbList"] : [...sitewide, "BlogPosting", "BreadcrumbList"];
  return [...sitewide, "BreadcrumbList"];
}

const files = [];
(function walk(dir) {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) {
      if (name !== "_next") walk(full);
    } else if (name.endsWith(".html")) files.push(full);
  }
})(OUT);

const decode = (s) =>
  s
    .replace(/&amp;/g, "&")
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&nbsp;/g, " ");
const norm = (s) => s.replace(/\s+/g, " ").trim();
const textOf = (html) =>
  norm(decode(html.replace(/<script[\s\S]*?<\/script>/g, " ").replace(/<!--[\s\S]*?-->/g, "").replace(/<[^>]+>/g, " ")));

/** Walks JSON-LD collecting @types, defined @ids and bare {"@id"} references. */
function walkLd(node, acc) {
  if (Array.isArray(node)) return node.forEach((n) => walkLd(n, acc));
  if (!node || typeof node !== "object") return;
  const keys = Object.keys(node);
  if (node["@id"] && keys.length === 1) acc.refs.add(node["@id"]);
  else if (node["@id"]) acc.ids.add(node["@id"]);
  if (node["@type"]) [].concat(node["@type"]).forEach((t) => acc.types.push(t));
  keys.forEach((k) => walkLd(node[k], acc));
}

const titles = new Map();
const rows = [];
const todoPages = [];
let problems = 0;

for (const file of files.sort()) {
  const html = readFileSync(file, "utf8");
  const path = "/" + file.slice(OUT.length + 1).split(String.fromCharCode(92)).join("/").replace(/(index)?\.html$/, "");
  const head = html.match(/<head>([\s\S]*?)<\/head>/)?.[1] ?? html;
  const title = decode(head.match(/<title>([^<]*)<\/title>/)?.[1] ?? "");
  const desc = decode(head.match(/<meta name="description" content="([^"]*)"/)?.[1] ?? "");
  const canonical = head.match(/<link rel="canonical" href="([^"]*)"/)?.[1] ?? "";
  const noindex = /<meta name="robots" content="[^"]*noindex/.test(html);
  const body = html.match(/<body[^>]*>([\s\S]*)<\/body>/)?.[1] ?? "";
  const main = body.match(/<main[^>]*>([\s\S]*?)<\/main>/)?.[1] ?? "";
  const h1 = (body.match(/<h1[\s>]/g) ?? []).length;
  const visible = textOf(body);
  const words = textOf(main).split(" ").filter(Boolean).length;
  const issues = [];

  // --- Meta ---
  if (!title) issues.push("no title");
  else if (title.length > 60) issues.push(`title ${title.length}ch`);
  if (!desc) issues.push("no description");
  else if (desc.length > 155) issues.push(`desc ${desc.length}ch`);
  if (h1 !== 1) issues.push(`${h1} h1`);
  if (!noindex && !canonical) issues.push("no canonical");
  if (canonical && canonical !== `${SITE}${path === "/" ? "" : path}`) issues.push(`canonical ${canonical}`);
  if (!noindex) {
    if (titles.has(title)) issues.push(`dup title with ${titles.get(title)}`);
    titles.set(title, path);
  }
  if (/opacity:0/.test(main)) issues.push("opacity:0 in main");

  // --- JSON-LD ---
  const blocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((m) => m[1]);
  const acc = { types: [], ids: new Set(), refs: new Set() };
  const parsed = [];
  for (const raw of blocks) {
    try {
      const data = JSON.parse(raw);
      parsed.push(data);
      walkLd(data, acc);
      if (data["@context"] !== "https://schema.org") issues.push(`ld missing @context (${data["@type"]})`);
    } catch (e) {
      issues.push(`ld parse error: ${e.message}`);
    }
  }
  const topTypes = parsed.map((d) => d["@type"]);
  for (const t of expectedTypes(path, noindex)) if (!topTypes.includes(t)) issues.push(`missing ${t}`);
  if (noindex && topTypes.includes("BlogPosting")) issues.push("draft has BlogPosting");
  const dupTypes = topTypes.filter((t, i) => topTypes.indexOf(t) !== i);
  if (dupTypes.length) issues.push(`duplicate ld: ${dupTypes.join(",")}`);
  for (const r of acc.refs) if (r.startsWith(`${SITE}/#`) && !acc.ids.has(r)) issues.push(`unresolved @id ${r}`);

  for (const d of parsed) {
    if (d["@type"] === "FAQPage") {
      for (const q of d.mainEntity ?? []) {
        if (!visible.includes(norm(q.name))) issues.push(`FAQ question not visible: "${q.name.slice(0, 40)}"`);
        if (!visible.includes(norm(q.acceptedAnswer?.text ?? ""))) issues.push(`FAQ answer not visible: "${q.name.slice(0, 40)}"`);
      }
    }
    if (d["@type"] === "BreadcrumbList") {
      (d.itemListElement ?? []).forEach((li, i) => {
        if (li.position !== i + 1 || !String(li.item).startsWith(SITE)) issues.push(`bad breadcrumb item ${i + 1}`);
      });
      const last = d.itemListElement?.at(-1)?.item;
      if (last !== `${SITE}${path === "/" ? "" : path}`) issues.push(`breadcrumb ends at ${last}`);
    }
  }

  // --- Placeholders: must never ship ---
  const todoVisible = (visible.match(/\{\{TODO/g) ?? []).length;
  const todoLd = blocks.join("").includes("{{TODO");
  if (todoVisible) issues.push(`${todoVisible}x {{TODO in visible HTML`);
  if (todoLd) issues.push("{{TODO in JSON-LD");
  if (todoVisible || todoLd) todoPages.push(path);

  problems += issues.length;
  rows.push({ path, words, ld: [...new Set(topTypes)].join(", "), noindex: noindex ? "yes" : "", issues: issues.join("; ") || "ok" });
}

for (const r of rows) {
  console.log(`${r.issues === "ok" ? "PASS" : "FAIL"}  ${r.path}  (${r.words} words${r.noindex ? ", noindex" : ""})`);
  console.log(`      JSON-LD: ${r.ld || "none"}`);
  if (r.issues !== "ok") console.log(`      ${r.issues}`);
}
console.log(`\n${rows.length} pages checked.`);
if (todoPages.length) console.log(`Placeholders ({{TODO) found on: ${todoPages.join(", ")}`);
if (problems) {
  console.error(`${problems} problem(s) found.`);
  process.exit(1);
}
console.log("All checks passed.");
