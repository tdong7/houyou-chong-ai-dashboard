import { createHash } from "node:crypto";

export const ARCHIVE_START_DATE = "2026-06-21";
export const ET_TIME_ZONE = "America/New_York";
export const CATEGORY_LIMITS = Object.freeze({ ai: 5, space: 2, neuroscience: 2 });
export const APPROVED_DOMAINS = Object.freeze([
  "theinformation.com",
  "reuters.com",
  "openai.com",
  "anthropic.com",
  "semianalysis.com",
  "datacenterworld.com",
  "spacex.com",
  "space.com",
  "nature.com",
  "science.org",
  "nih.gov",
]);

function requireString(value, field) {
  if (typeof value !== "string" || !value.trim()) throw new Error(`Story ${field} must be a non-empty string`);
}

function isApprovedHostname(hostname) {
  const normalized = hostname.toLowerCase().replace(/^www\./, "");
  return APPROVED_DOMAINS.some((domain) => normalized === domain || normalized.endsWith(`.${domain}`));
}

export function canonicalizeUrl(value) {
  const url = new URL(value);
  if (url.protocol !== "https:") throw new Error("News links must use HTTPS");
  if (!isApprovedHostname(url.hostname)) throw new Error(`News link is not from an approved source: ${url.hostname}`);

  url.hash = "";
  for (const parameter of [...url.searchParams.keys()]) {
    if (parameter.startsWith("utm_") || ["gclid", "fbclid", "cmpid"].includes(parameter)) {
      url.searchParams.delete(parameter);
    }
  }
  return url.toString();
}

export function normalizeTitle(value) {
  return value
    .toLowerCase()
    .replace(/&[a-z]+;/g, " ")
    .replace(/[^a-z0-9\u4e00-\u9fff]+/g, " ")
    .trim()
    .replace(/\s+/g, " ");
}

export function stableStoryId(story) {
  const identity = `${story.category}|${canonicalizeUrl(story.url)}|${normalizeTitle(story.title)}`;
  return createHash("sha256").update(identity).digest("hex").slice(0, 20);
}

export function deduplicateStories(stories) {
  const selected = new Map();
  for (const story of stories) {
    const key = `${story.category}|${canonicalizeUrl(story.url)}|${normalizeTitle(story.title)}`;
    const current = selected.get(key);
    if (!current || (story.score ?? 0) > (current.score ?? 0)) selected.set(key, story);
  }
  return [...selected.values()];
}

export function validateStory(story) {
  if (!story || typeof story !== "object") throw new Error("Story must be an object");
  for (const field of ["id", "category", "publishedAt", "dateET", "source", "title", "url", "translationStatus"]) {
    requireString(story[field], field);
  }
  if (!(story.category in CATEGORY_LIMITS)) throw new Error(`Unknown news category: ${story.category}`);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(story.dateET)) throw new Error("Story dateET must use YYYY-MM-DD");
  if (story.dateET < ARCHIVE_START_DATE) throw new Error(`Story predates archive start date ${ARCHIVE_START_DATE}`);
  if (!Number.isFinite(Date.parse(story.publishedAt))) throw new Error("Story publishedAt must be a valid ISO date");
  canonicalizeUrl(story.url);
  if (story.titleZh != null && typeof story.titleZh !== "string") throw new Error("Story titleZh must be a string");
  if (!Number.isFinite(story.score)) throw new Error("Story score must be a finite number");
  if (!["complete", "pending"].includes(story.translationStatus)) throw new Error("Unknown translation status");
  return story;
}

export function validateArchive(archive, now = new Date()) {
  if (!archive || typeof archive !== "object") throw new Error("News archive must be an object");
  const updatedAt = Date.parse(archive.updatedAt);
  if (!Number.isFinite(updatedAt)) throw new Error("Archive updatedAt must be a valid ISO date");
  if (updatedAt > now.getTime() + 5 * 60_000) throw new Error("Archive updatedAt cannot be in the future");
  if (archive.timezone !== ET_TIME_ZONE) throw new Error(`Archive timezone must be ${ET_TIME_ZONE}`);
  if (!Array.isArray(archive.stories)) throw new Error("Archive stories must be an array");

  const counts = new Map();
  const ids = new Set();
  for (const story of archive.stories) {
    validateStory(story);
    if (ids.has(story.id)) throw new Error(`Duplicate story id: ${story.id}`);
    ids.add(story.id);
    const countKey = `${story.dateET}|${story.category}`;
    const nextCount = (counts.get(countKey) || 0) + 1;
    if (nextCount > CATEGORY_LIMITS[story.category]) {
      throw new Error(`${story.category} daily limit exceeded for ${story.dateET}`);
    }
    counts.set(countKey, nextCount);
  }
  return archive;
}

export function selectDailyStories(stories) {
  const selected = [];
  for (const category of Object.keys(CATEGORY_LIMITS)) {
    selected.push(
      ...deduplicateStories(stories)
        .filter((story) => story.category === category)
        .sort((left, right) => (right.score ?? 0) - (left.score ?? 0) || Date.parse(right.publishedAt) - Date.parse(left.publishedAt))
        .slice(0, CATEGORY_LIMITS[category])
    );
  }
  return selected;
}
