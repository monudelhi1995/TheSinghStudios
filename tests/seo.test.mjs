// Run from the repo root: node --test tests/seo.test.mjs
import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";

const ORIGIN = "https://thesinghstudios.com";
const read = (p) => fs.readFileSync(p, "utf8");
const fileFor = (url) => {
  const path = url.slice(ORIGIN.length + 1);
  return path === "" || path.endsWith("/") ? `${path}index.html` : path;
};
const meta = (html, attr, name) =>
  html.match(
    new RegExp(`<meta\\s+${attr}="${name}"\\s+content="([^"]*)"`, "s"),
  )?.[1];

const urls = [...read("sitemap.xml").matchAll(/<loc>(.*?)<\/loc>/g)].map(
  (m) => m[1],
);
const pages = urls.map((url) => ({ url, html: read(fileFor(url)) }));
const legacy = fs.readdirSync("template").map((f) => `template/${f}`);

test("sitemap lists the expected canonical URLs", () => {
  assert.deepEqual(urls, [
    `${ORIGIN}/`,
    `${ORIGIN}/rush-strike/`,
    `${ORIGIN}/zombie-killer/`,
    `${ORIGIN}/privacy-policy.html`,
  ]);
});

test("robots.txt references the sitemap and does not block legacy pages", () => {
  const robots = read("robots.txt");
  assert.match(robots, new RegExp(`^Sitemap: ${ORIGIN}/sitemap\\.xml\\s*$`, "m"));
  assert.doesNotMatch(robots, /Disallow: \/template/);
});

for (const { url, html } of pages) {
  test(`${url} has correct indexing and social metadata`, () => {
    const canonicals = [...html.matchAll(/rel="canonical"\s+href="([^"]*)"/g)];
    assert.deepEqual(canonicals.map((m) => m[1]), [url]);
    assert.doesNotMatch(html, /name="robots"/);
    assert.match(html, /<html lang="en">/);
    assert.equal(meta(html, "property", "og:url"), url);
    assert.equal(meta(html, "name", "twitter:card"), "summary_large_image");
    for (const key of ["og:title", "og:description", "og:type", "og:site_name"])
      assert.ok(meta(html, "property", key), key);
    assert.equal(meta(html, "property", "og:image:width"), "1200");
    assert.equal(meta(html, "property", "og:image:height"), "630");
    const image = meta(html, "property", "og:image");
    assert.ok(image.startsWith(`${ORIGIN}/`), image);
    assert.ok(fs.existsSync(fileFor(image)), image);
  });
}

test("titles and descriptions are unique", () => {
  for (const pick of [
    (h) => h.match(/<title>(.*?)<\/title>/s)[1],
    (h) => meta(h, "name", "description"),
  ]) {
    const values = pages.map((p) => pick(p.html));
    assert.ok(values.every(Boolean));
    assert.equal(new Set(values).size, values.length);
  }
});

test("JSON-LD parses and game pages describe their own game", () => {
  for (const { url, html } of pages.filter((p) => !p.url.endsWith(".html"))) {
    const blocks = [
      ...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs),
    ].map((m) => JSON.parse(m[1]));
    assert.equal(blocks.length, 1, url);
    const graph = blocks[0]["@graph"];
    assert.ok(graph.every((node) => node["@type"]));
    if (url === `${ORIGIN}/`) continue;
    const game = graph.find((node) => node["@type"] === "VideoGame");
    assert.equal(game["@id"], `${url}#game`);
    assert.equal(game.url, url);
    for (const banned of ["aggregateRating", "review"])
      assert.ok(!(banned in game), banned);
  }
});

test("legacy and 404 pages are noindex and stay out of the sitemap", () => {
  for (const file of [...legacy, "404.html"]) {
    assert.equal(meta(read(file), "name", "robots"), "noindex", file);
    assert.ok(!urls.includes(`${ORIGIN}/${file}`), file);
  }
});
