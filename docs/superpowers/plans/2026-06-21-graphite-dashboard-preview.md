# Graphite Dashboard Preview Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a local-only Graphite Precision preview of the AI stock dashboard without changing financial data, refresh automation, or the public GitHub Pages site.

**Architecture:** Preserve the existing HTML structure and JavaScript behavior. Add a small amount of semantic header markup, then implement the redesign through CSS tokens and component-level rules so every existing stock card, TradingView widget, filter, and tab continues to work unchanged.

**Tech Stack:** Static HTML, CSS, vanilla JavaScript, Node assertion tests, TradingView widgets, headless Chrome visual verification.

---

### Task 1: Add Visual Contract Tests

**Files:**
- Modify: `tests/dashboard.test.mjs`
- Test: `tests/dashboard.test.mjs`

- [ ] **Step 1: Write failing Graphite visual assertions**

Add source assertions for the approved design contracts:

```js
assert.match(stylesSource, /--bg:\s*#080c10/, "Graphite preview should use the approved neutral background");
assert.match(stylesSource, /--positive:\s*#2dd4a0/, "Positive returns should use emerald");
assert.match(stylesSource, /--interactive:\s*#3b82f6/, "Selections should use cool blue");
assert.doesNotMatch(stylesSource, /radial-gradient/, "Graphite preview should not use decorative radial gradients");
assert.match(stylesSource, /\.summary-grid\s*\{[^}]*border/, "Summary metrics should form one compact data strip");
assert.match(indexSource, /class="market-status"/, "Header should expose market status");
```

- [ ] **Step 2: Run the test and verify RED**

Run:

```bash
node tests/dashboard.test.mjs
```

Expected: FAIL because the old navy gradient palette and icon-card summary are still present.

- [ ] **Step 3: Commit the failing visual contract**

```bash
git add tests/dashboard.test.mjs
git commit -m "Test graphite dashboard visual contract"
```

### Task 2: Refine Header Semantics

**Files:**
- Modify: `index.html`
- Test: `tests/dashboard.test.mjs`

- [ ] **Step 1: Add compact market-terminal header markup**

Inside `.brand-lockup`, replace the subtitle text with:

```html
<p>AI MOMENTUM / US EQUITIES</p>
```

Inside `.header-actions`, before the USD control, add:

```html
<span class="market-status"><i aria-hidden="true"></i>Market live</span>
```

Keep `#source-time`, USD, and Share elements unchanged so current behavior is preserved.

- [ ] **Step 2: Run the dashboard test and verify header assertions pass**

Run:

```bash
node tests/dashboard.test.mjs
```

Expected: Header markup assertion passes; palette assertions remain red until Task 3.

- [ ] **Step 3: Commit header markup**

```bash
git add index.html
git commit -m "Refine dashboard terminal header"
```

### Task 3: Implement Graphite Precision CSS

**Files:**
- Modify: `styles.css`
- Test: `tests/dashboard.test.mjs`

- [ ] **Step 1: Replace color tokens and page background**

Use these tokens at `:root`:

```css
--bg: #080c10;
--panel: #0d1319;
--panel-strong: #111820;
--panel-soft: #141d25;
--line: #2d3944;
--line-soft: rgba(127, 141, 152, 0.2);
--text: #e8edf2;
--muted: #7f8d98;
--positive: #2dd4a0;
--positive-soft: rgba(45, 212, 160, 0.1);
--interactive: #3b82f6;
--negative: #f87171;
```

Set `body` to a flat `background: var(--bg)` and remove radial gradients and glow decoration.

- [ ] **Step 2: Convert the header and summary into terminal bands**

Implement a 72px application header with a flat graphite surface, 1px border, 5px brand mark radius, and no glow. Style `.market-status` with a 6px emerald dot.

Convert `.summary-grid` into one bordered strip. Give summary articles a 66px minimum height, remove individual card shadows/backgrounds, use border separators, and hide `.summary-icon` because the rank-like circles do not carry information.

- [ ] **Step 3: Tighten the workspace toolbar**

Use a compact 36px control height, 4px radius, flat graphite backgrounds, emerald only for financial gains, and blue only for selected filters/focus. Preserve the existing desktop grid and responsive wrapping.

- [ ] **Step 4: Restyle stock cards without changing their structure**

Use 5px card radii, `#0d1319` surfaces, thin `#2d3944` borders, no inset highlights, and compact 60px headers. Keep two desktop columns and one mobile column. Style active tabs and range controls with `--interactive`; style positive and negative values with `--positive` and `--negative`.

Keep `.stock-tab-panel` dimensions and TradingView iframe sizing intact so hover tracking and chart interaction do not regress.

- [ ] **Step 5: Restyle footer as a low-contrast information band**

Remove the decorative card treatment from `.notes`. Use one top border, compact columns, muted typography, and the same graphite page background.

- [ ] **Step 6: Run tests and verify GREEN**

Run:

```bash
node tests/dashboard.test.mjs
node tests/automation.test.mjs
node --check app.js
```

Expected: all commands exit 0.

- [ ] **Step 7: Commit the local preview CSS**

```bash
git add styles.css
git commit -m "Preview graphite dashboard styling"
```

### Task 4: Local Visual Verification

**Files:**
- Modify only if verification identifies a concrete layout defect: `styles.css`
- Test: `tests/dashboard.test.mjs`

- [ ] **Step 1: Start a local server**

Run:

```bash
python3 -m http.server 4174
```

Expected: local preview available at `http://127.0.0.1:4174/index.html`.

- [ ] **Step 2: Capture desktop and mobile previews**

Capture the local page at:

- Desktop: 1440x1200.
- Mobile: 390x1800.

Verify two desktop columns, one mobile column, compact summary strip, internal tab scrolling, no page-level horizontal overflow, readable price/YTD values, and visible TradingView charts.

- [ ] **Step 3: Verify interactions**

Confirm on SNDK and BNAI:

- Changing a chart range affects only that card.
- Overview/Financials tab switching affects only that card.
- Full Chart retains the TradingView URL.
- Price, YTD, and range values remain visible.

- [ ] **Step 4: Re-run final verification**

Run:

```bash
node tests/dashboard.test.mjs
node tests/automation.test.mjs
node --check app.js
node --check scripts/update-stocks.mjs
git diff --check
```

Expected: every command exits 0.

- [ ] **Step 5: Present local preview without pushing**

Provide the local URL and desktop/mobile screenshots. Do not run `git push`; wait for explicit user approval before public deployment.
