# Latest News Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a bilingual, date-archived latest-news page with daily automated collection for AI, Space, and Neuroscience.

**Architecture:** A static `news.html` shell loads a validated `data/news-data.json` archive and delegates sorting, grouping, and per-category expansion to a small browser module. A Node updater collects official-source candidates, scores and deduplicates them, translates selected titles, and atomically updates the archive from a daily GitHub Action.

**Tech Stack:** Static HTML/CSS, browser JavaScript, Node.js 24 standard library, GitHub Actions, Node assert tests.

---

### Task 1: Homepage entry and news page contract

**Files:**
- Modify: `index.html`
- Modify: `styles.css`
- Create: `news.html`
- Create: `news.css`
- Create: `tests/news.test.mjs`

- [ ] **Step 1: Write the failing page contract test**

Create `tests/news.test.mjs` that reads the homepage and news assets, initially asserting that `news.html`, `news.css`, and `news.js` exist; that `index.html` contains `<a class="latest-news-link" href="news.html">最新资讯</a>` before `<section class="controls"`; and that the news page contains AI, Space, and Neuroscience containers plus a return link.

- [ ] **Step 2: Run the page contract test and verify RED**

Run:

```bash
/Users/tdong/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node tests/news.test.mjs
```

Expected: failure because the news page and homepage entry do not exist.

- [ ] **Step 3: Implement the minimal static page shell**

Add the homepage link immediately before the search controls. Create semantic `news.html` markup with a compact brand header, return link, update status, three category sections with `data-category` attributes, an unavailable state, and references to `news.css` and `news.js`.

- [ ] **Step 4: Add Graphite responsive styling**

Create `news.css` using the existing approved palette: `#080c10` background, `#0d1319` panels, `#2d3944` lines, `#e8edf2` text, `#2dd4a0` AI accent, blue Space accent, and violet Neuroscience accent. Use three desktop columns with AI wider and one mobile column below 900px.

- [ ] **Step 5: Run the page contract and dashboard tests**

Run `tests/news.test.mjs` and `tests/dashboard.test.mjs`. Expected: PASS.

### Task 2: News rendering and independent View all behavior

**Files:**
- Create: `news.js`
- Modify: `tests/news.test.mjs`

- [ ] **Step 1: Add failing renderer tests**

Import exported helpers from `news.js` and assert:

```js
assert.deepEqual(groupStoriesByDate(sampleStories).map((group) => group.date), ["2026-06-22", "2026-06-21"]);
assert.equal(visibleStories(sampleStories, false, 10).length, 10);
assert.equal(visibleStories(sampleStories, true, 10).length, sampleStories.length);
```

Also assert that `setCategoryExpanded("ai", true)` changes only AI state.

- [ ] **Step 2: Run the tests and verify RED**

Expected: failure because the helpers are not exported.

- [ ] **Step 3: Implement pure rendering helpers**

Implement and export `sortStories`, `groupStoriesByDate`, `visibleStories`, and an expansion-state controller. Validate category values and use `publishedAt` descending with stable ID as the tie-breaker.

- [ ] **Step 4: Implement browser rendering**

Fetch `data/news-data.json`, render publisher, publication time, linked English title, Chinese translation, and date group headings. Escape text through DOM `textContent`, set links through validated URL properties, and create independent `View all` / `Show less` buttons only when a category has more than ten stories.

- [ ] **Step 5: Verify renderer tests GREEN**

Run `tests/news.test.mjs`. Expected: PASS.

### Task 3: Initial archive and data validation

**Files:**
- Create: `data/news-data.json`
- Create: `scripts/news-lib.mjs`
- Modify: `tests/news.test.mjs`

- [ ] **Step 1: Add failing data validation tests**

Test `validateArchive` with valid fixtures and reject an HTTP URL, an unapproved domain, a pre-June-21 date, an unknown category, and a daily category count above 5/2/2.

- [ ] **Step 2: Run the tests and verify RED**

Expected: failure because `scripts/news-lib.mjs` does not exist.

- [ ] **Step 3: Implement the archive library**

Export constants for category limits, approved domains, and archive start date. Implement `validateStory`, `validateArchive`, `canonicalizeUrl`, `stableStoryId`, `normalizeTitle`, `deduplicateStories`, and `selectDailyStories` using only Node standard libraries.

- [ ] **Step 4: Create the initial archive**

Populate `data/news-data.json` with verified source-dated stories published on June 21 or June 22, 2026. Include only confirmed direct source URLs and Chinese translations; an empty category/date is acceptable when no qualified article exists.

- [ ] **Step 5: Verify archive tests GREEN**

Run `tests/news.test.mjs`. Expected: PASS.

### Task 4: Daily updater with source isolation and translation fallback

**Files:**
- Create: `scripts/update-news.mjs`
- Modify: `scripts/news-lib.mjs`
- Modify: `tests/news.test.mjs`
- Modify: `tests/automation.test.mjs`

- [ ] **Step 1: Add failing updater behavior tests**

Assert source adapters are independently settled, existing stories survive an all-source failure, duplicate events collapse, pending translations are retried, and scheduled execution accepts only local hour 10 in `America/New_York` unless `--force` is supplied.

- [ ] **Step 2: Run updater tests and verify RED**

Expected: failure because updater functions are missing.

- [ ] **Step 3: Implement source collection**

Implement a source registry for the approved publishers. Prefer official RSS/Atom endpoints and use source-specific sitemap or HTML extraction when feeds are unavailable. Apply per-source abort timeouts, decode basic HTML entities, reject unapproved URLs, and return normalized candidate objects without article bodies.

- [ ] **Step 4: Implement scoring and translation**

Score recency, cross-source duplicate coverage, source prominence markers, and category relevance. Select up to 5/2/2 daily stories. Translate selected or pending English titles through MyMemory with timeout and retry; preserve pending English entries if translation fails.

- [ ] **Step 5: Implement safe archive persistence**

Merge by stable ID, validate the complete archive, and write to a temporary file before renaming it over `data/news-data.json`. Do not modify the archive when no qualified stories are returned.

- [ ] **Step 6: Verify updater tests GREEN**

Run `tests/news.test.mjs`, `tests/automation.test.mjs`, and `node --check scripts/update-news.mjs`. Expected: PASS.

### Task 5: Daily GitHub Action

**Files:**
- Create: `.github/workflows/update-news.yml`
- Modify: `tests/automation.test.mjs`

- [ ] **Step 1: Add failing workflow contract tests**

Assert schedules `0 14 * * *` and `0 15 * * *`, `workflow_dispatch`, Node 24, `node scripts/update-news.mjs --scheduled-window`, news tests, syntax checks, and a data-only conditional commit.

- [ ] **Step 2: Run automation tests and verify RED**

Expected: failure because the workflow does not exist.

- [ ] **Step 3: Create the workflow**

Checkout, set up Node 24, run the updater, run dashboard/news/automation tests and syntax checks, then commit only `data/news-data.json` when it changed.

- [ ] **Step 4: Verify workflow tests GREEN**

Run all Node tests and syntax checks. Expected: PASS.

### Task 6: Browser verification and preview

**Files:**
- Modify only if visual defects are discovered: `news.css`, `news.html`, `news.js`, `styles.css`

- [ ] **Step 1: Start a local static server**

Serve the repository on an available localhost port.

- [ ] **Step 2: Verify desktop presentation**

At 1440px width, confirm the homepage link is above Search, the news page uses three columns, titles wrap without overlap, source metadata stays readable, and each category has independent controls.

- [ ] **Step 3: Verify mobile presentation**

At 390px width, confirm one-column stacking, no horizontal overflow, readable long Chinese and English headlines, and working View all controls.

- [ ] **Step 4: Run final verification**

Run all tests, syntax checks, `git diff --check`, and inspect `git status`. Keep the preview local until the user approves uploading.
