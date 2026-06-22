import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import {
  deduplicateStories,
  stableStoryId,
  validateArchive,
} from "../scripts/news-lib.mjs";

function story(overrides = {}) {
  return {
    id: "valid-story",
    category: "ai",
    publishedAt: "2026-06-22T13:00:00.000Z",
    dateET: "2026-06-22",
    source: "OpenAI News",
    title: "A verified AI headline",
    titleZh: "一条经过验证的人工智能标题",
    url: "https://openai.com/news/example",
    score: 80,
    translationStatus: "complete",
    ...overrides,
  };
}

const validArchive = {
  updatedAt: "2026-06-22T14:00:00.000Z",
  timezone: "America/New_York",
  stories: [story()],
};

assert.doesNotThrow(() => validateArchive(validArchive), "Valid news archive should pass");
assert.throws(
  () => validateArchive({ ...validArchive, stories: [story({ url: "http://openai.com/news/example" })] }),
  /HTTPS/,
  "HTTP links should be rejected"
);
assert.throws(
  () => validateArchive({ ...validArchive, stories: [story({ url: "https://example.com/story" })] }),
  /approved source/,
  "Unknown domains should be rejected"
);
assert.throws(
  () => validateArchive({ ...validArchive, stories: [story({ dateET: "2026-06-20" })] }),
  /archive start date/,
  "Pre-June-21 stories should be rejected"
);
assert.throws(
  () => validateArchive({ ...validArchive, stories: [story({ category: "markets" })] }),
  /category/,
  "Unknown categories should be rejected"
);
assert.throws(
  () =>
    validateArchive({
      ...validArchive,
      stories: Array.from({ length: 6 }, (_, index) => story({ id: `ai-${index}`, url: `https://openai.com/news/${index}` })),
    }),
  /daily limit/,
  "Daily AI selection should not exceed five stories"
);

assert.equal(
  stableStoryId(story()),
  stableStoryId(story({ titleZh: "不同的翻译", score: 12 })),
  "Stable IDs should ignore translated and ranking fields"
);
assert.equal(
  deduplicateStories([story({ score: 50 }), story({ id: "duplicate", score: 90 })]).length,
  1,
  "Duplicate canonical stories should collapse"
);

const publishedArchive = JSON.parse(readFileSync(new URL("../data/news-data.json", import.meta.url), "utf8"));
assert.doesNotThrow(() => validateArchive(publishedArchive), "Published news archive should stay valid");
