import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import {
  groupStoriesByDate,
  isCategoryExpanded,
  setCategoryExpanded,
  visibleStories,
} from "../news.js";

const rootUrl = new URL("../", import.meta.url);
const indexPath = new URL("index.html", rootUrl);
const newsPath = new URL("news.html", rootUrl);
const newsCssPath = new URL("news.css", rootUrl);
const newsJsPath = new URL("news.js", rootUrl);

assert.equal(existsSync(newsPath), true, "Missing dedicated latest-news page");
assert.equal(existsSync(newsCssPath), true, "Missing latest-news stylesheet");
assert.equal(existsSync(newsJsPath), true, "Missing latest-news renderer");

const indexSource = readFileSync(indexPath, "utf8");
const newsSource = readFileSync(newsPath, "utf8");
const latestNewsLink = '<a class="latest-news-link" href="news.html">最新资讯</a>';

assert.match(indexSource, new RegExp(latestNewsLink), "Homepage should link to 最新资讯");
assert.ok(
  indexSource.indexOf(latestNewsLink) < indexSource.indexOf('<section class="controls"'),
  "Latest-news entry should appear above Search controls"
);
assert.match(newsSource, /href="index\.html"/, "News page should link back to the market dashboard");
for (const category of ["ai", "space", "neuroscience"]) {
  assert.match(newsSource, new RegExp(`data-category="${category}"`), `Missing ${category} news category`);
}

const sampleStories = Array.from({ length: 12 }, (_, index) => ({
  id: `story-${index}`,
  category: "ai",
  dateET: index < 3 ? "2026-06-22" : "2026-06-21",
  publishedAt: new Date(Date.UTC(2026, 5, index < 3 ? 22 : 21, 14, 0, index)).toISOString(),
}));

assert.deepEqual(
  groupStoriesByDate(sampleStories).map((group) => group.date),
  ["2026-06-22", "2026-06-21"],
  "News should group dates newest first"
);
assert.equal(visibleStories(sampleStories, false, 10).length, 10, "Collapsed categories should show ten stories");
assert.equal(visibleStories(sampleStories, true, 10).length, 12, "Expanded categories should show all stories");

setCategoryExpanded("ai", false);
setCategoryExpanded("space", false);
setCategoryExpanded("ai", true);
assert.equal(isCategoryExpanded("ai"), true, "Selected category should expand");
assert.equal(isCategoryExpanded("space"), false, "Other categories should remain collapsed");
