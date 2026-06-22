import assert from "node:assert/strict";
import {
  collectSources,
  isScheduledNewsWindow,
  mergeArchive,
  translateTitle,
} from "../scripts/update-news.mjs";

assert.equal(isScheduledNewsWindow(new Date("2026-06-22T14:00:00Z")), true, "EDT 10:00 should run");
assert.equal(isScheduledNewsWindow(new Date("2026-12-22T15:00:00Z")), true, "EST 10:00 should run");
assert.equal(isScheduledNewsWindow(new Date("2026-06-22T13:00:00Z")), false, "EDT 09:00 should not run");

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
