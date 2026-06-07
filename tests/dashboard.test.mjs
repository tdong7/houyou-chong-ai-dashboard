import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const appSource = readFileSync(new URL("../app.js", import.meta.url), "utf8");

const expectedRanges = ["1D", "5D", "1M", "6M", "YTD", "1Y", "5Y", "ALL"];

for (const range of expectedRanges) {
  assert.match(appSource, new RegExp(`label:\\s*"${range}"`), `Missing ${range} chart range`);
}

assert.match(appSource, /tradingviewSymbolUrl/, "Missing TradingView URL builder");
assert.match(appSource, /https:\/\/www\.tradingview\.com\/symbols\/\$\{symbolPath\}/, "Missing TradingView symbol link");
assert.match(appSource, /tvwidgetsymbol=\$\{widgetSymbol\}/, "TradingView link should include widget symbol");
assert.match(appSource, /target="_blank"/, "Full chart links should open TradingView in a new tab");
assert.match(appSource, /embed-widget-mini-symbol-overview\.js/, "Cards should use TradingView live Mini Chart widgets");
assert.match(appSource, /hydrateTradingViewCharts/, "Missing TradingView chart hydration");
assert.match(appSource, /dateRange/, "TradingView widgets should receive the selected date range");
assert.match(appSource, /updateStockRange/, "Range clicks should update one stock card at a time");
assert.doesNotMatch(appSource, /class="momentum-row"/, "Per-card YTD gain row should be removed");
assert.doesNotMatch(appSource, /class="stats-row"/, "Custom 1M/3M stats row should be removed");
