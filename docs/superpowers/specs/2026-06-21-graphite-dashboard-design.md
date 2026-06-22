# Graphite Dashboard Visual Design

## Goal

Refresh the AI stock dashboard into a restrained professional trading terminal while preserving all current stock data, TradingView integrations, tabs, filters, schedules, and two-column desktop workflow.

This design is approved as a local preview direction only. It must not be pushed to the public GitHub Pages site until the user explicitly approves the implemented preview.

## Visual Direction

- Style: Graphite Precision.
- Background: neutral near-black graphite, without decorative gradients or glow effects.
- Panels: subtle tonal separation with thin cool-gray borders and minimal shadow.
- Positive data: emerald green.
- Negative data: restrained red.
- Selection and interactive focus: cool blue.
- Primary text: soft white rather than pure white.
- Secondary text: cool neutral gray.
- Corners: 3-6px for a precise terminal feel.

## Page Structure

### Header

Use a compact 72px header with:

- Brand mark, title, and `AI MOMENTUM / US EQUITIES` descriptor on the left.
- Universe definition in the middle: Top 20 names with YTD above 100%.
- Market status, Share, and USD controls on the right.

The header should read as an application toolbar, not a marketing hero.

### Market Pulse Strip

Replace the tall four-card summary with one low-height full-width data strip containing:

1. Highest YTD return.
2. Top-20 median YTD return.
3. Number of themes represented.
4. Last stock-list ranking update time.

Each metric uses a label, one strong value, and no decorative icon circle.

### Workspace Toolbar

Place search, theme filters, sorting, and update information on one compact row on desktop. Controls retain their existing behavior. On narrower screens, the toolbar wraps into logical rows and theme filters scroll horizontally without widening the page.

### Stock Grid

Keep two stock cards per desktop row and one per mobile row. Cards use:

- A compact header with rank, ticker, company, theme, live price, YTD return, and Full Chart command.
- A horizontally scrollable tab row.
- The current per-stock TradingView performance ranges.
- A large interactive TradingView chart area.

Cards use thin borders and flat surfaces. No nested decorative cards are added.

## Interaction

- Every stock retains independent tab and chart-range state.
- Emerald communicates positive returns only.
- Red communicates negative returns only.
- Blue communicates the selected filter, tab, or chart range.
- Hover and focus states use border or background changes without glow.
- Full Chart continues to open the corresponding TradingView page.
- Live prices and TradingView hover tracking remain unchanged.

## Responsive Behavior

- Desktop: two stock cards per row.
- Tablet: two columns when space permits; toolbars wrap cleanly.
- Mobile: one stock card per row.
- Header metadata wraps below the primary controls.
- Tabs and filter groups scroll inside their own containers.
- No page-level horizontal overflow.
- Performance labels remain readable without viewport-scaled font sizing.

## Data And Automation

No changes are planned to:

- TradingView scanner fields or range-return calculations.
- Top-20 ranking logic.
- Six-hour trading-day refresh behavior.
- GitHub Actions workflow.
- TradingView widget links and data tabs.

## Validation

The local implementation preview must pass:

- Existing dashboard and automation tests.
- JavaScript syntax checks.
- Desktop visual review at 1440px width.
- Mobile visual review at 390px width.
- Confirmation that SNDK and another stock show price, YTD, ranges, and interactive charts.
- Confirmation that filter and chart-range interactions remain independent.

## Non-Goals

- No ranking or financial-data methodology changes.
- No new application features.
- No new charting library.
- No public deployment before explicit user approval of the implemented local preview.
