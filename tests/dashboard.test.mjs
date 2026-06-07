import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const appSource = readFileSync(new URL("../app.js", import.meta.url), "utf8");

const expectedRanges = ["1D", "5D", "1M", "6M", "YTD", "1Y", "5Y", "10Y", "ALL"];
const expectedTabs = [
  "Overview",
  "Financials",
  "News",
  "Documents",
  "Community",
  "Technicals",
  "Forecasts",
  "Seasonals",
  "Options",
  "Bonds",
  "ETFs",
];

for (const range of expectedRanges) {
  assert.match(appSource, new RegExp(`label:\\s*"${range}"`), `Missing ${range} chart range`);
}

for (const tab of expectedTabs) {
  assert.match(appSource, new RegExp(`label:\\s*"${tab}"`), `Missing ${tab} stock tab`);
}

assert.match(appSource, /tradingviewSymbolUrl/, "Missing TradingView URL builder");
assert.match(appSource, /https:\/\/www\.tradingview\.com\/symbols\/\$\{symbolPath\}/, "Missing TradingView symbol link");
assert.match(appSource, /tvwidgetsymbol=\$\{widgetSymbol\}/, "TradingView link should include widget symbol");
assert.match(appSource, /target="_blank"/, "Full chart links should open TradingView in a new tab");
assert.match(appSource, /embed-widget-symbol-overview\.js/, "Overview tabs should use TradingView Symbol Overview widgets");
assert.match(appSource, /embed-widget-financials\.js/, "Financials tabs should use TradingView financials widgets");
assert.match(appSource, /embed-widget-timeline\.js/, "News tabs should use TradingView timeline widgets");
assert.match(appSource, /embed-widget-technical-analysis\.js/, "Technicals tabs should use TradingView technical analysis widgets");
assert.match(appSource, /hydrateTradingViewCharts/, "Missing TradingView chart hydration");
assert.match(appSource, /dateRanges/, "Overview widgets should expose TradingView date ranges");
assert.match(appSource, /updateStockTab/, "Tab clicks should update one stock card at a time");
assert.match(appSource, /renderSourcePanel/, "Unsupported tabs should render source-backed panels");
assert.doesNotMatch(appSource, /class="momentum-row"/, "Per-card YTD gain row should be removed");
assert.doesNotMatch(appSource, /class="stats-row"/, "Custom 1M/3M stats row should be removed");
assert.doesNotMatch(appSource, /embed-widget-mini-symbol-overview\.js/, "Mini chart widget should not be used for screenshot-style Overview charts");
