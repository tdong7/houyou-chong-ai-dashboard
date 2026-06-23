import assert from "node:assert/strict";
import {
  SOURCE_DEFINITIONS,
  collectSources,
  extractArticleLinks,
  fetchText,
  isScheduledNewsWindow,
  isRelevantCandidate,
  mergeArchive,
  parseArticlePage,
  parseNewsSitemap,
  translateTitle,
} from "../scripts/update-news.mjs";

assert.equal(isScheduledNewsWindow(new Date("2026-06-22T14:00:00Z")), true, "EDT 10:00 should run");
assert.equal(isScheduledNewsWindow(new Date("2026-12-22T15:00:00Z")), true, "EST 10:00 should run");
assert.equal(isScheduledNewsWindow(new Date("2026-06-22T13:00:00Z")), false, "EDT 09:00 should not run");
assert.equal(
  isScheduledNewsWindow(new Date("2026-06-23T16:28:36Z"), "0 14 * * *"),
  true,
  "A delayed GitHub scheduled run should use the cron slot, not runner start time"
);

const sourcesByName = Object.fromEntries(SOURCE_DEFINITIONS.map((source) => [source.name, source]));
assert.equal(sourcesByName["The Information"].relevanceRequired, true, "The Information's broad feed should require AI relevance");
assert.equal(sourcesByName["Reuters Technology"].format, "news-sitemap", "Reuters should use its public news sitemap");
assert.equal(sourcesByName["OpenAI News"].url, "https://openai.com/news/rss.xml", "OpenAI should use its official RSS feed");
assert.equal(sourcesByName["Data Center World"].format, "article-list", "Data Center World should collect article metadata");
assert.equal(sourcesByName["NINDS News"].url, "https://www.ninds.nih.gov/news-events/press-releases/press-releases.rss");

const sitemapStories = parseNewsSitemap(`
  <urlset xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
    <url>
      <loc>https://www.reuters.com/technology/artificial-intelligence/example-2026-06-22/</loc>
      <news:news>
        <news:publication_date>2026-06-22T14:30:00Z</news:publication_date>
        <news:title><![CDATA[Example AI headline]]></news:title>
      </news:news>
    </url>
  </urlset>
`, { source: "Reuters Technology", category: "ai" });
assert.deepEqual(sitemapStories, [{
  source: "Reuters Technology",
  category: "ai",
  title: "Example AI headline",
  url: "https://www.reuters.com/technology/artificial-intelligence/example-2026-06-22/",
  publishedAt: "2026-06-22T14:30:00.000Z",
  featured: false,
}]);

assert.deepEqual(
  extractArticleLinks('<a href="/article/example-ai-story/">Story</a><a href="/contact/">Contact</a>', "https://datacenterworld.com/news-insights/"),
  ["https://datacenterworld.com/article/example-ai-story/"],
  "Data Center World should expose article links from its listing"
);

assert.deepEqual(parseArticlePage(`
  <meta property="og:title" content="AI data centers expand" />
  <meta property="og:url" content="https://datacenterworld.com/article/ai-data-centers-expand/" />
  <script>window.state={"datePublished":"2026-06-22T12:00:00Z"}</script>
`, { source: "Data Center World", category: "ai" }), [{
  source: "Data Center World",
  category: "ai",
  title: "AI data centers expand",
  url: "https://datacenterworld.com/article/ai-data-centers-expand/",
  publishedAt: "2026-06-22T12:00:00.000Z",
  featured: false,
}]);

const fallbackFeed = await fetchText(
  "https://www.theinformation.com/feed",
  async () => ({ ok: false, status: 403 }),
  async () => "<rss>fallback</rss>"
);
assert.equal(fallbackFeed, "<rss>fallback</rss>", "Blocked feeds should use the curl fallback");

assert.equal(isRelevantCandidate({
  category: "ai",
  title: "World Cup Photo Daily",
  relevanceRequired: true,
}), false, "The letters ai inside an unrelated word must not count as AI relevance");
assert.equal(isRelevantCandidate({
  category: "ai",
  title: "New AI models pose an urgent cyber risk",
  relevanceRequired: true,
}), true, "A Reuters headline with an AI term should qualify");

const sourceResults = await collectSources(
  [
    { name: "working", collect: async () => [{ title: "kept" }] },
    { name: "failing", collect: async () => { throw new Error("offline"); } },
  ],
  () => {}
);
assert.deepEqual(sourceResults, [{ title: "kept" }], "A failed source should not discard successful sources");

const existingArchive = {
  updatedAt: "2026-06-21T14:00:00.000Z",
  timezone: "America/New_York",
  stories: [{ id: "existing" }],
};
assert.deepEqual(
  mergeArchive(existingArchive, [], new Date("2026-06-22T14:00:00Z")),
  existingArchive,
  "An empty update should preserve the existing archive unchanged"
);

const translated = await translateTitle("New AI system", async () => ({
  ok: true,
  json: async () => ({ responseData: { translatedText: "新的人工智能系统" } }),
}));
assert.equal(translated, "新的人工智能系统", "Translation response should return Simplified Chinese title");

const pending = await translateTitle("New AI system", async () => { throw new Error("timeout"); });
assert.equal(pending, "", "Translation failure should return a retryable empty translation");
