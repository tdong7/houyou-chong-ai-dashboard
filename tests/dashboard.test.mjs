import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const appSource = readFileSync(new URL("../app.js", import.meta.url), "utf8");
const stylesSource = readFileSync(new URL("../styles.css", import.meta.url), "utf8");
const indexSource = readFileSync(new URL("../index.html", import.meta.url), "utf8");

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

const stockSymbolMatches = appSource.match(/symbol:\s*"[A-Z]+"/g) || [];
assert.equal(stockSymbolMatches.length, 20, "Dashboard should contain exactly 20 ranked stocks");
const stockBlock = appSource.match(/const stocks = \[[\s\S]*?\n\];/)?.[0] || "";
const rangePerformanceMatches = stockBlock.match(/performance:\s*\{/g) || [];
assert.equal(rangePerformanceMatches.length, 20, "Every ranked stock should carry TradingView range performance");

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
assert.match(appSource, /function getYtdSummary/, "Summary should be derived from a YTD summary helper");
assert.doesNotMatch(appSource, /function calculateYtd/, "Dashboard should not recalculate TradingView YTD from another baseline");
assert.doesNotMatch(appSource, /ytdBase/, "Dashboard should not keep a competing Yahoo YTD baseline");
assert.match(appSource, /const activeRanges = new Map\(\)/, "Each stock should keep its own selected chart range");
assert.match(appSource, /data-range-target/, "Overview charts should expose independent range controls");
assert.match(appSource, /function stockRangePerformance/, "Range labels should read TradingView performance values");
assert.match(appSource, /chartOnly:\s*true/, "Embedded charts should hide their conflicting range percentage header");
assert.match(appSource, /function formatSignedPercent/, "Summary percentages should render their own sign");
assert.match(appSource, /stockListUpdatedAt/, "Dashboard should keep the stock list update timestamp");
assert.match(appSource, /function renderStockListUpdateTime/, "Dashboard should render the stock list update time");
assert.match(appSource, /Stock list update time:/, "Dashboard should label the stock list update time");
assert.match(indexSource, /id="stock-list-update-time"/, "Controls should include a stock list update-time label next to sort");
assert.match(appSource, /CLIENT_REFRESH_INTERVAL_MS/, "Dashboard should define the browser-side stock refresh interval");
assert.match(appSource, /AI_STOCK_UNIVERSE/, "Dashboard should have a client-side AI universe for fallback ranking refreshes");
assert.match(appSource, /function refreshRankedStocks/, "Dashboard should refresh ranked stocks in the browser");
assert.match(appSource, /function scheduleClientRankRefresh/, "Dashboard should schedule browser-side rank refreshes");
assert.match(appSource, /TRADINGVIEW_SCANNER_URL/, "Dashboard should have a TradingView scanner data source");
assert.match(appSource, /refreshMarketSnapshot/, "Dashboard should refresh market data from TradingView");
assert.match(appSource, /"Perf\.YTD"/, "TradingView scanner should request YTD performance");
assert.match(appSource, /text\/plain;charset=UTF-8/, "TradingView scanner request should avoid a CORS preflight");
assert.match(appSource, /function formatMarketCap/, "Live market cap values should be formatted for cards");
assert.match(appSource, /class="card-ytd"/, "Cards should show the same YTD return used by the summary");
assert.match(appSource, /class="card-price"/, "Cards should keep showing the live price when the widget header is hidden");
assert.match(appSource, /stock\.exchange/, "TradingView symbol building should use each stock exchange");
const stockExchangeMatches = stockBlock.match(/exchange:\s*"(NASDAQ|NYSE|AMEX)"/g) || [];
assert.equal(stockExchangeMatches.length, 20, "Every ranked stock should include its TradingView exchange code");
assert.doesNotMatch(appSource, /stocks\[0\]\.ytd/, "Highest YTD should not depend on the first stock row");
assert.doesNotMatch(appSource, /stocks\[0\]\.symbol/, "Highest stock label should not depend on the first stock row");
assert.match(appSource, /stock\.performance\s*=\s*snapshot\.performance/, "Live TradingView performance should refresh every range");
assert.match(
  stylesSource,
  /\.stock-grid\s*\{[\s\S]*grid-template-columns:\s*repeat\(2,\s*minmax\(0,\s*1fr\)\)/,
  "Desktop stock grid should render two charts per row"
);
assert.match(stylesSource, /\.stock-card\s*\{[\s\S]*min-width:\s*0/, "Stock cards should be allowed to shrink on mobile");
assert.match(stylesSource, /\.stock-tabs\s*\{[^}]*overflow-x:\s*auto/, "Stock tabs should scroll instead of widening mobile cards");
assert.match(stylesSource, /@media \(max-width:\s*640px\)[\s\S]*\.updated strong\s*\{[^}]*white-space:\s*normal/, "Mobile update time should wrap instead of widening the page");
assert.match(stylesSource, /body\s*\{[^}]*overflow-x:\s*hidden/, "Page-level horizontal overflow should be contained");
assert.doesNotMatch(appSource, /class="momentum-row"/, "Per-card YTD gain row should be removed");
assert.doesNotMatch(appSource, /class="stats-row"/, "Custom 1M/3M stats row should be removed");
assert.doesNotMatch(appSource, /embed-widget-mini-symbol-overview\.js/, "Mini chart widget should not be used for screenshot-style Overview charts");
