# Latest News Design

## Goal

Add a `最新资讯` entry above the homepage search controls and a dedicated news page that archives important AI, Space, and Neuroscience headlines from June 21, 2026 onward. Headlines link to the original publisher, show a Chinese translation, and update automatically every day at 10:00 AM America/New_York time.

## User Experience

### Homepage entry

The dashboard adds one compact `最新资讯` link immediately above the search bar. It uses the existing Graphite Precision visual language and opens `news.html` in the same tab.

### News page

The page keeps the dashboard header and provides a `返回市场看板` link. Desktop uses three columns:

- AI is the wider primary column.
- Space is a secondary column.
- Neuroscience is a secondary column.

On narrow screens the columns stack into a single reading flow. Each category shows:

- Category title and current story count.
- Date groups in reverse chronological order.
- Original English headline as the clickable link.
- Chinese translation directly below the English title.
- Publisher and publication time.

Each category initially displays at most ten stories across all archived dates. When more than ten exist, `View all` expands only that category and changes to `Show less`. Collapsing returns it to the newest ten stories without changing the state of other categories.

The page also shows the latest successful update time and a note that Chinese translations are provided for convenience and the source article is authoritative.

## Daily Selection Rules

The daily archive limits are:

- AI: up to 5 stories.
- Space: up to 2 stories.
- Neuroscience: up to 2 stories.

Fewer items are acceptable when qualified stories are unavailable. The updater never fills a quota with fabricated, stale, or off-topic content.

Candidate importance uses a deterministic score:

1. Cross-source coverage of the same event.
2. Featured, trending, or top placement on the publisher page when available.
3. Recency within the collection window.
4. Direct relevance to frontier AI, AI infrastructure, major launches or missions, or significant neuroscience findings.
5. Source priority as a final tie-breaker, not as a substitute for relevance.

Near-duplicate headlines are grouped using normalized titles and canonical URLs. The highest-scoring original source is retained.

## Sources

Only HTTPS links from the approved source domains are stored.

### AI

- The Information: `theinformation.com`
- Reuters Technology: `reuters.com`
- OpenAI News: `openai.com`
- Anthropic Newsroom: `anthropic.com`
- SemiAnalysis: `semianalysis.com`
- Data Center World: `datacenterworld.com`

### Space

- SpaceX Updates: `spacex.com`
- Space.com: `space.com`

### Neuroscience

- Nature Neuroscience: `nature.com`
- Science: `science.org`
- NIH News: `nih.gov`

The updater uses RSS or Atom where an official feed exists and a source-specific HTML or sitemap adapter otherwise. The Information may expose paywalled stories; the dashboard links to the publisher but does not bypass access controls or copy article text.

## Data Model

`data/news-data.json` is the published archive and contains:

```json
{
  "updatedAt": "2026-06-22T14:00:00.000Z",
  "timezone": "America/New_York",
  "stories": [
    {
      "id": "sha256-derived-stable-id",
      "category": "ai",
      "publishedAt": "2026-06-22T13:18:00.000Z",
      "dateET": "2026-06-22",
      "source": "Reuters Technology",
      "title": "Original English headline",
      "titleZh": "中文标题翻译",
      "url": "https://www.reuters.com/...",
      "score": 86,
      "translationStatus": "complete"
    }
  ]
}
```

Stories are appended or updated by stable ID. Existing archive entries are never removed merely because a later source request fails. The initial run backfills source-dated stories published on or after June 21, 2026; it does not assign a June 21 date to older material.

## Translation

The updater requests English-to-Simplified-Chinese title translation from the no-key MyMemory translation endpoint with a short timeout and limited retries. At most nine selected titles are translated per daily run, keeping requests within the free-service use case.

If translation fails, the story remains in the archive with `translationStatus: "pending"` and the English title as a temporary fallback. Future runs retry pending translations before translating newly selected stories. Translation failure does not fail the full news update.

## Scheduling

`.github/workflows/update-news.yml` runs at both 14:00 and 15:00 UTC every day and also supports manual dispatch. `scripts/update-news.mjs` checks `America/New_York` local time and proceeds only when the local hour is 10, so daylight-saving and standard time both result in one daily update.

The script also records the last completed America/New_York date. The second UTC trigger exits without changes if that local date has already been processed. Manual dispatch can bypass the hour guard and supports initial backfill.

## Failure Handling

- Each source adapter has an independent timeout and error boundary.
- A failed source does not block successful sources.
- Invalid dates, non-HTTPS URLs, and links outside the approved domains are rejected.
- The new archive is written only after JSON validation succeeds.
- If no qualified stories are found, the previous archive remains unchanged and the workflow exits successfully with an explanatory log.
- Translation failures preserve the selected English story and remain retryable.
- The page handles an unavailable or malformed JSON file with an inline unavailable state and a working return link.

## Files

- Modify `index.html` to add the homepage entry.
- Modify `styles.css` for the compact homepage entry.
- Create `news.html` for the news page shell.
- Create `news.css` for responsive Graphite news styling.
- Create `news.js` for loading, grouping, sorting, and independent View all controls.
- Create `data/news-data.json` for the archive.
- Create `scripts/update-news.mjs` for collection, scoring, translation, deduplication, validation, and persistence.
- Create `.github/workflows/update-news.yml` for the daily schedule and manual updates.
- Create `tests/news.test.mjs` for page and data contracts.
- Extend `tests/automation.test.mjs` for workflow scheduling and updater safety.

## Verification

Automated tests verify:

- The homepage link is above the search controls and points to `news.html`.
- The three required categories render.
- Stories sort newest first and group by America/New_York date.
- Each category initially renders no more than ten stories.
- View all and Show less affect only the selected category.
- Every stored story has an approved HTTPS source URL and a publication date on or after June 21, 2026.
- Daily selected counts do not exceed 5, 2, and 2.
- The updater preserves existing data when sources fail.
- The workflow covers 10:00 AM in both EDT and EST and supports manual dispatch.

Visual verification covers desktop and mobile layouts, long English and Chinese titles, empty categories, pending translations, and more-than-ten-story archives.
