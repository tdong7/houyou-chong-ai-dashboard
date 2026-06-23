import { execFile } from "node:child_process";
import { readFile, rename, writeFile } from "node:fs/promises";
import { pathToFileURL } from "node:url";
import { promisify } from "node:util";
import {
  ARCHIVE_START_DATE,
  ET_TIME_ZONE,
  canonicalizeUrl,
  deduplicateStories,
  normalizeTitle,
  selectDailyStories,
  stableStoryId,
  validateArchive,
} from "./news-lib.mjs";

const ARCHIVE_PATH = new URL("../data/news-data.json", import.meta.url);
const FETCH_TIMEOUT_MS = 12_000;
const execFileAsync = promisify(execFile);
const RELEVANCE_TERMS = {
  ai: ["ai", "artificial intelligence", "model", "gpu", "chip", "data center", "openai", "anthropic", "deepmind", "inference"],
  space: ["space", "launch", "rocket", "starship", "spacex", "orbit", "moon", "mars", "satellite", "nasa"],
  neuroscience: ["brain", "neural", "neuron", "neuroscience", "cognitive", "memory", "synapse", "alzheimer", "neuro"],
};

export const SOURCE_DEFINITIONS = Object.freeze([
  { name: "The Information", category: "ai", url: "https://www.theinformation.com/feed", format: "feed", priority: 20, relevanceRequired: true },
  { name: "Reuters Technology", category: "ai", url: "https://www.reuters.com/arc/outboundfeeds/news-sitemap/?outputType=xml", format: "news-sitemap", priority: 22, relevanceRequired: true },
  { name: "OpenAI News", category: "ai", url: "https://openai.com/news/rss.xml", format: "feed", priority: 18 },
  { name: "Anthropic Newsroom", category: "ai", url: "https://www.anthropic.com/news", format: "html", priority: 18 },
  { name: "SemiAnalysis", category: "ai", url: "https://semianalysis.com/feed/", format: "feed", priority: 19 },
  { name: "Data Center World", category: "ai", url: "https://datacenterworld.com/news-insights/", format: "article-list", priority: 14 },
  { name: "SpaceX Updates", category: "space", url: "https://www.spacex.com/updates", format: "html", priority: 20 },
  { name: "Space.com", category: "space", url: "https://www.space.com/feeds/all", format: "feed", priority: 17 },
  { name: "Nature Neuroscience", category: "neuroscience", url: "https://www.nature.com/neuro.rss", format: "feed", priority: 20 },
  { name: "Science", category: "neuroscience", url: "https://www.science.org/action/showFeed?type=etoc&feed=rss&jc=science", format: "feed", priority: 18 },
  { name: "NINDS News", category: "neuroscience", url: "https://www.ninds.nih.gov/news-events/press-releases/press-releases.rss", format: "feed", priority: 18 },
]);

const REQUEST_HEADERS = Object.freeze({
  accept: "application/rss+xml, application/xml, text/xml, text/html;q=0.9, */*;q=0.8",
  "accept-language": "en-US,en;q=0.9",
  "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/137.0.0.0 Safari/537.36",
});

function easternParts(date) {
  return Object.fromEntries(
    new Intl.DateTimeFormat("en-US", {
      timeZone: ET_TIME_ZONE,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hourCycle: "h23",
    })
      .formatToParts(date)
      .map((part) => [part.type, part.value])
  );
}

export function easternDate(date) {
  const parts = easternParts(date);
  return `${parts.year}-${parts.month}-${parts.day}`;
}

async function scheduledCron() {
  if (!process.env.GITHUB_EVENT_PATH) return "";

  try {
    const event = JSON.parse(await readFile(process.env.GITHUB_EVENT_PATH, "utf8"));
    return event.schedule || "";
  } catch (error) {
    console.warn(`Could not read GitHub schedule event: ${error.message}`);
    return "";
  }
}

function parseCronMinuteHour(cron) {
  const [minute, hour] = cron.trim().split(/\s+/);
  const parsedMinute = Number(minute);
  const parsedHour = Number(hour);
  if (!Number.isInteger(parsedMinute) || !Number.isInteger(parsedHour)) return null;
  return { minute: parsedMinute, hour: parsedHour };
}

export function isScheduledNewsWindow(date = new Date(), cron = "") {
  const cronTime = cron ? parseCronMinuteHour(cron) : null;
  const checkedDate = cronTime
    ? new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), cronTime.hour, cronTime.minute))
    : date;
  const parts = easternParts(checkedDate);
  return Number(parts.hour) === 10 && Number(parts.minute) === 0;
}

function decodeEntities(value = "") {
  const named = { amp: "&", apos: "'", quot: '"', lt: "<", gt: ">", nbsp: " " };
  return value
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
    .replace(/&#x([0-9a-f]+);/gi, (_, code) => String.fromCodePoint(Number.parseInt(code, 16)))
    .replace(/&([a-z]+);/gi, (match, name) => named[name.toLowerCase()] ?? match)
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function xmlValue(block, names) {
  for (const name of names) {
    const paired = block.match(new RegExp(`<${name}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${name}>`, "i"));
    if (paired) return decodeEntities(paired[1]);
    if (name === "link") {
      const attribute = block.match(/<link[^>]+href=["']([^"']+)["']/i);
      if (attribute) return decodeEntities(attribute[1]);
    }
  }
  return "";
}

export function parseFeed(xml, source) {
  const blocks = xml.match(/<(?:item|entry)\b[\s\S]*?<\/(?:item|entry)>/gi) || [];
  return blocks
    .map((block) => {
      const title = xmlValue(block, ["title"]);
      const url = xmlValue(block, ["link", "guid"]);
      const date = xmlValue(block, ["pubDate", "published", "updated", "dc:date"]);
      const publishedAt = new Date(date);
      if (!title || !url || !Number.isFinite(publishedAt.getTime())) return null;
      return { ...source, title, url, publishedAt: publishedAt.toISOString(), featured: false };
    })
    .filter(Boolean);
}

export function parseNewsSitemap(xml, source) {
  const blocks = xml.match(/<url\b[\s\S]*?<\/url>/gi) || [];
  const nonEnglishPath = /^\/(?:ar|de|es|fr|it|ja|pt|ru|zh)\//i;
  return blocks
    .map((block) => {
      const title = xmlValue(block, ["news:title"]);
      const url = xmlValue(block, ["loc"]);
      const date = xmlValue(block, ["news:publication_date", "lastmod"]);
      const publishedAt = new Date(date);
      if (!title || !url || nonEnglishPath.test(new URL(url).pathname) || !Number.isFinite(publishedAt.getTime())) return null;
      return { ...source, title, url, publishedAt: publishedAt.toISOString(), featured: false };
    })
    .filter(Boolean);
}

function metaContent(html, property) {
  const escaped = property.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const propertyFirst = html.match(new RegExp(`<meta[^>]+property=["']${escaped}["'][^>]+content=["']([^"']+)["']`, "i"));
  const contentFirst = html.match(new RegExp(`<meta[^>]+content=["']([^"']+)["'][^>]+property=["']${escaped}["']`, "i"));
  return decodeEntities(propertyFirst?.[1] || contentFirst?.[1] || "");
}

export function extractArticleLinks(html, baseUrl) {
  const links = [];
  for (const match of html.matchAll(/href=["']([^"']*\/article\/[^"'#?]+\/?)["']/gi)) {
    const url = new URL(decodeEntities(match[1]), baseUrl).toString();
    if (!links.includes(url)) links.push(url);
  }
  return links;
}

export function parseArticlePage(html, source) {
  const title = metaContent(html, "og:title");
  const url = metaContent(html, "og:url");
  const date = html.match(/["']datePublished["']\s*:\s*["']([^"']+)["']/i)?.[1] || "";
  const publishedAt = new Date(date);
  if (!title || !url || !Number.isFinite(publishedAt.getTime())) return [];
  return [{ ...source, title, url, publishedAt: publishedAt.toISOString(), featured: false }];
}

function collectJsonLd(value, output) {
  if (Array.isArray(value)) {
    value.forEach((item) => collectJsonLd(item, output));
    return;
  }
  if (!value || typeof value !== "object") return;
  if (value.headline && value.datePublished && (value.url || value.mainEntityOfPage)) output.push(value);
  Object.values(value).forEach((item) => collectJsonLd(item, output));
}

export function parseHtml(html, source) {
  const objects = [];
  for (const match of html.matchAll(/<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)) {
    try {
      collectJsonLd(JSON.parse(match[1]), objects);
    } catch {
      // Invalid publisher metadata is ignored while other blocks continue.
    }
  }
  return objects
    .map((item) => {
      const mainEntity = typeof item.mainEntityOfPage === "string" ? item.mainEntityOfPage : item.mainEntityOfPage?.["@id"];
      const publishedAt = new Date(item.datePublished);
      if (!Number.isFinite(publishedAt.getTime())) return null;
      return {
        ...source,
        title: decodeEntities(item.headline),
        url: item.url || mainEntity,
        publishedAt: publishedAt.toISOString(),
        featured: Boolean(item.isAccessibleForFree === false || item.position === 1),
      };
    })
    .filter((item) => item?.title && item.url);
}

async function fetchWithCurl(url) {
  const { stdout } = await execFileAsync("curl", [
    "--fail",
    "--location",
    "--silent",
    "--show-error",
    "--max-time",
    String(FETCH_TIMEOUT_MS / 1_000),
    "--user-agent",
    REQUEST_HEADERS["user-agent"],
    "--header",
    `Accept: ${REQUEST_HEADERS.accept}`,
    url,
  ], { maxBuffer: 5 * 1024 * 1024 });
  return stdout;
}

export async function fetchText(url, fetchImpl = fetch, fallbackImpl = fetchWithCurl) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
  try {
    const response = await fetchImpl(url, {
      signal: controller.signal,
      headers: REQUEST_HEADERS,
    });
    if ([401, 403].includes(response.status)) return await fallbackImpl(url);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return await response.text();
  } finally {
    clearTimeout(timeout);
  }
}

export function createSources(fetchImpl = fetch) {
  return SOURCE_DEFINITIONS.map((definition) => ({
    name: definition.name,
    collect: async () => {
      const content = await fetchText(definition.url, fetchImpl);
      const source = {
        source: definition.name,
        category: definition.category,
        priority: definition.priority,
        relevanceRequired: Boolean(definition.relevanceRequired),
      };
      if (definition.format === "feed") return parseFeed(content, source);
      if (definition.format === "news-sitemap") return parseNewsSitemap(content, source);
      if (definition.format === "article-list") {
        const articleUrls = extractArticleLinks(content, definition.url).slice(0, 16);
        const pages = await Promise.allSettled(articleUrls.map((url) => fetchText(url, fetchImpl)));
        return pages.flatMap((result) => result.status === "fulfilled" ? parseArticlePage(result.value, source) : []);
      }
      return parseHtml(content, source);
    },
  }));
}

export async function collectSources(sources, onError = console.warn) {
  const results = await Promise.allSettled(sources.map((source) => source.collect()));
  const stories = [];
  results.forEach((result, index) => {
    if (result.status === "fulfilled") stories.push(...result.value);
    else onError(`${sources[index].name}: ${result.reason?.message || result.reason}`);
  });
  return stories;
}

function relevanceScore(candidate) {
  const title = normalizeTitle(candidate.title);
  const paddedTitle = ` ${title} `;
  return RELEVANCE_TERMS[candidate.category].reduce((score, term) => score + (paddedTitle.includes(` ${term} `) ? 4 : 0), 0);
}

export function isRelevantCandidate(candidate) {
  return !candidate.relevanceRequired || relevanceScore(candidate) > 0;
}

export function scoreCandidates(candidates, now = new Date()) {
  const titleCoverage = new Map();
  for (const candidate of candidates) {
    const key = normalizeTitle(candidate.title).split(" ").slice(0, 8).join(" ");
    titleCoverage.set(key, (titleCoverage.get(key) || 0) + 1);
  }
  return candidates.map((candidate) => {
    const ageHours = Math.max(0, (now - new Date(candidate.publishedAt)) / 3_600_000);
    const recency = Math.max(0, 30 - ageHours);
    const key = normalizeTitle(candidate.title).split(" ").slice(0, 8).join(" ");
    const coverage = Math.max(0, (titleCoverage.get(key) || 1) - 1) * 12;
    return { ...candidate, score: Math.round((candidate.priority || 0) + recency + coverage + relevanceScore(candidate) + (candidate.featured ? 8 : 0)) };
  });
}

export async function translateTitle(title, fetchImpl = fetch) {
  try {
    const endpoint = new URL("https://api.mymemory.translated.net/get");
    endpoint.searchParams.set("q", title);
    endpoint.searchParams.set("langpair", "en|zh-CN");
    const response = await fetchImpl(endpoint, {
      signal: AbortSignal.timeout(8_000),
      headers: { "user-agent": "houyou-news-dashboard/1.0" },
    });
    if (!response.ok) return "";
    const payload = await response.json();
    return decodeEntities(payload.responseData?.translatedText || "");
  } catch {
    return "";
  }
}

export function mergeArchive(existing, newStories, now = new Date()) {
  if (!newStories.length) return existing;
  const merged = new Map(existing.stories.map((story) => [story.id, story]));
  newStories.forEach((story) => merged.set(story.id, story));
  const archive = {
    updatedAt: now.toISOString(),
    timezone: ET_TIME_ZONE,
    stories: [...merged.values()].sort((left, right) => Date.parse(right.publishedAt) - Date.parse(left.publishedAt)),
  };
  return validateArchive(archive);
}

async function buildSelectedStories(candidates, existing, now) {
  const today = easternDate(now);
  const qualified = scoreCandidates(candidates, now)
    .filter(isRelevantCandidate)
    .map((candidate) => {
      try {
        return { ...candidate, url: canonicalizeUrl(candidate.url), dateET: easternDate(new Date(candidate.publishedAt)) };
      } catch {
        return null;
      }
    })
    .filter((candidate) => candidate && candidate.dateET >= ARCHIVE_START_DATE && candidate.dateET === today);

  const selected = selectDailyStories(deduplicateStories(qualified));
  const stories = [];
  for (const candidate of selected) {
    const titleZh = await translateTitle(candidate.title);
    const story = {
      id: "",
      category: candidate.category,
      publishedAt: candidate.publishedAt,
      dateET: candidate.dateET,
      source: candidate.source,
      title: candidate.title,
      titleZh,
      url: candidate.url,
      score: candidate.score,
      translationStatus: titleZh ? "complete" : "pending",
    };
    story.id = stableStoryId(story);
    stories.push(story);
  }

  for (const story of existing.stories.filter((item) => item.translationStatus === "pending")) {
    const titleZh = await translateTitle(story.title);
    if (titleZh) stories.push({ ...story, titleZh, translationStatus: "complete" });
  }
  return stories;
}

export async function runUpdate({ now = new Date(), force = false, scheduledWindow = false } = {}) {
  const cron = scheduledWindow ? await scheduledCron() : "";
  if (scheduledWindow && !force && !isScheduledNewsWindow(now, cron)) {
    console.log("Skipping: it is not 10:00 in America/New_York.");
    return false;
  }

  const existing = validateArchive(JSON.parse(await readFile(ARCHIVE_PATH, "utf8")));
  const candidates = await collectSources(createSources(), (message) => console.warn(`Source unavailable: ${message}`));
  const selected = await buildSelectedStories(candidates, existing, now);
  const archive = mergeArchive(existing, selected, now);
  if (archive === existing) {
    console.log("No qualified news stories found; archive preserved.");
    return false;
  }

  const temporaryPath = new URL("../data/news-data.json.tmp", import.meta.url);
  await writeFile(temporaryPath, `${JSON.stringify(archive, null, 2)}\n`, "utf8");
  await rename(temporaryPath, ARCHIVE_PATH);
  console.log(`Updated news archive with ${selected.length} story changes.`);
  return true;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const args = new Set(process.argv.slice(2));
  await runUpdate({ force: args.has("--force"), scheduledWindow: args.has("--scheduled-window") });
}
