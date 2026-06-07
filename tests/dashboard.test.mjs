import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const appSource = readFileSync(new URL("../app.js", import.meta.url), "utf8");
const stylesSource = readFileSync(new URL("../styles.css", import.meta.url), "utf8");

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
const expectedTopSymbols = [
  "BNAI",
  "SNDK",
  "WATT",
  "AXTI",
  "AAOI",
  "AEHR",
  "MXL",
  "OPTX",
  "DOCN",
  "NVTS",
  "QUIK",
  "DELL",
  "WOLF",
  "ARM",
  "MRVL",
  "VPG",
  "PENG",
  "STX",
  "MU",
  "WDC",
];

for (const range of expectedRanges) {
  assert.match(appSource, new RegExp(`label:\\s*"${range}"`), `Missing ${range} chart range`);
}

for (const tab of expectedTabs) {
  assert.match(appSource, new RegExp(`label:\\s*"${tab}"`), `Missing ${tab} stock tab`);
}

for (const symbol of expectedTopSymbols) {
  assert.match(appSource, new RegExp(`symbol:\\s*"${symbol}"`), `Missing ${symbol} from current top AI stock list`);
}

const stockSymbolMatches = appSource.match(/symbol:\s*"[A-Z]+"/g) || [];
assert.equal(stockSymbolMatches.length, 20, "Dashboard should contain exactly 20 ranked stocks");

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
assert.match(appSource, /function formatSignedPercent/, "Summary percentages should render their own sign");
assert.match(appSource, /TRADINGVIEW_SCANNER_URL/, "Dashboard should have a TradingView scanner data source");
assert.match(appSource, /refreshMarketSnapshot/, "Dashboard should refresh market data from TradingView");
assert.match(appSource, /"Perf\.YTD"/, "TradingView scanner should request YTD performance");
assert.match(appSource, /text\/plain;charset=UTF-8/, "TradingView scanner request should avoid a CORS preflight");
assert.match(appSource, /function formatMarketCap/, "Live market cap values should be formatted for cards");
assert.match(appSource, /class="card-ytd"/, "Cards should show the same YTD return used by the summary");
assert.match(appSource, /stock\.exchange/, "TradingView symbol building should use each stock exchange");
assert.match(appSource, /symbol:\s*"DOCN",\s*exchange:\s*"NYSE"/, "DOCN should use TradingView's NYSE exchange code");
assert.match(appSource, /symbol:\s*"DELL",\s*exchange:\s*"NYSE"/, "DELL should use TradingView's NYSE exchange code");
assert.match(appSource, /symbol:\s*"WOLF",\s*exchange:\s*"NYSE"/, "WOLF should use TradingView's NYSE exchange code");
assert.match(appSource, /symbol:\s*"VPG",\s*exchange:\s*"NYSE"/, "VPG should use TradingView's NYSE exchange code");
assert.doesNotMatch(appSource, /stocks\[0\]\.ytd/, "Highest YTD should not depend on the first stock row");
assert.doesNotMatch(appSource, /stocks\[0\]\.symbol/, "Highest stock label should not depend on the first stock row");
assert.match(
  stylesSource,
  /\.stock-grid\s*\{[\s\S]*grid-template-columns:\s*repeat\(2,\s*minmax\(0,\s*1fr\)\)/,
  "Desktop stock grid should render two charts per row"
);
assert.doesNotMatch(appSource, /class="momentum-row"/, "Per-card YTD gain row should be removed");
assert.doesNotMatch(appSource, /class="stats-row"/, "Custom 1M/3M stats row should be removed");
assert.doesNotMatch(appSource, /embed-widget-mini-symbol-overview\.js/, "Mini chart widget should not be used for screenshot-style Overview charts");
