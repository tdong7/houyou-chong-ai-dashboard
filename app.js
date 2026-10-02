const stocks = [
  { rank: 1, symbol: "SNDK", exchange: "NASDAQ", company: "Sandisk Corporation", price: 1722.98, performance: {"1D":-3.62,"5D":-3.85,"1M":12.49,"3M":-15.7,"6M":168.34,"YTD":605.13,"1Y":1238.86,"5Y":4814.38,"10Y":4814.38,"ALL":4814.38}, ytd: 605.13, cap: "252.3B", theme: "Compute", score: 98 },
  { rank: 2, symbol: "MXL", exchange: "NASDAQ", company: "MaxLinear, Inc.", price: 104.82, performance: {"1D":13.79,"5D":19.68,"1M":82.96,"3M":-7.56,"6M":517.68,"YTD":487.89,"1Y":516.59,"5Y":110.4,"10Y":417.12,"ALL":483.96}, ytd: 487.89, cap: "9.5B", theme: "Compute", score: 97 },
  { rank: 3, symbol: "AEHR", exchange: "NASDAQ", company: "Aehr Test Systems", price: 106.66, performance: {"1D":4.98,"5D":8.63,"1M":36.64,"3M":26.49,"6M":194.4,"YTD":407.42,"1Y":214.17,"5Y":772.12,"10Y":3233.13,"ALL":623.12}, ytd: 407.42, cap: "3.5B", theme: "Compute", score: 96 },
  { rank: 4, symbol: "AXTI", exchange: "NASDAQ", company: "AXT, Inc.", price: 85.93, performance: {"1D":5.04,"5D":10.88,"1M":52.44,"3M":35.28,"6M":93.01,"YTD":399.59,"1Y":1643,"5Y":945.38,"10Y":1543.02,"ALL":718.38}, ytd: 399.59, cap: "5.6B", theme: "Compute", score: 95 },
  { rank: 5, symbol: "DELL", exchange: "NYSE", company: "Dell Technologies, Inc. Class C", price: 566.32, performance: {"1D":4.54,"5D":3.67,"1M":22.57,"3M":36.11,"6M":239.13,"YTD":341.06,"1Y":276.32,"5Y":968.86,"10Y":4136.68,"ALL":4538.93}, ytd: 341.06, cap: "360.1B", theme: "Compute", score: 94 },
  { rank: 6, symbol: "MU", exchange: "NASDAQ", company: "Micron Technology, Inc.", price: 1075.24, performance: {"1D":-2.02,"5D":-1.88,"1M":15.51,"3M":3.24,"6M":215.01,"YTD":264.33,"1Y":481.35,"5Y":1423,"10Y":5876.88,"ALL":76023.19}, ytd: 264.33, cap: "1.2T", theme: "Compute", score: 93 },
  { rank: 7, symbol: "WATT", exchange: "NASDAQ", company: "Energous Corp.", price: 13.36, performance: {"1D":3.89,"5D":1.44,"1M":27.85,"3M":-44.05,"6M":-7.54,"YTD":226.65,"1Y":71.28,"5Y":-98.93,"10Y":-99.88,"ALL":-99.77}, ytd: 226.65, cap: "73.8M", theme: "Compute", score: 92 },
  { rank: 8, symbol: "INTC", exchange: "NASDAQ", company: "Intel Corporation", price: 119.94, performance: {"1D":-0.05,"5D":-5.43,"1M":35,"3M":-6.96,"6M":160.41,"YTD":217.57,"1Y":235.42,"5Y":122.41,"10Y":218.24,"ALL":297308.88}, ytd: 217.57, cap: "634B", theme: "Compute", score: 91 },
  { rank: 9, symbol: "AAOI", exchange: "NASDAQ", company: "Applied Optoelectronics, Inc.", price: 115.15, performance: {"1D":7.3,"5D":13.21,"1M":12.79,"3M":-15.24,"6M":41.12,"YTD":216.82,"1Y":297.62,"5Y":1492.67,"10Y":423.41,"ALL":1051.5}, ytd: 216.82, cap: "9.8B", theme: "Optical", score: 90 },
  { rank: 10, symbol: "OPTX", exchange: "NASDAQ", company: "Syntec Optics Holdings, Inc. Class A", price: 9.12, performance: {"1D":12.39,"5D":24.18,"1M":25.72,"3M":-25.29,"6M":19.93,"YTD":214.31,"1Y":469.69,"5Y":-7.93,"10Y":-7.93,"ALL":-7.93}, ytd: 214.31, cap: "367.2M", theme: "Optical", score: 89 },
  { rank: 11, symbol: "MRVL", exchange: "NASDAQ", company: "Marvell Technology, Inc.", price: 272.11, performance: {"1D":1.5,"5D":3.24,"1M":32.57,"3M":0.97,"6M":165.99,"YTD":213.71,"1Y":219.87,"5Y":357.71,"10Y":1961.44,"ALL":2191.45}, ytd: 213.71, cap: "238.6B", theme: "Compute", score: 88 },
  { rank: 12, symbol: "PENG", exchange: "NASDAQ", company: "Penguin Solutions Incorporation", price: 61.28, performance: {"1D":11.47,"5D":13.79,"1M":27.81,"3M":-11.58,"6M":211.25,"YTD":208.27,"1Y":122.21,"5Y":173.72,"10Y":921.42,"ALL":921.42}, ytd: 208.27, cap: "3.1B", theme: "Compute", score: 87 },
  { rank: 13, symbol: "STX", exchange: "NASDAQ", company: "Seagate Technology Holdings PLC", price: 847.42, performance: {"1D":-10.38,"5D":-8.32,"1M":5.16,"3M":-5.92,"6M":111.33,"YTD":200.54,"1Y":221.85,"5Y":906.08,"10Y":2097.67,"ALL":7268.87}, ytd: 200.54, cap: "192.7B", theme: "Compute", score: 86 },
  { rank: 14, symbol: "DOCN", exchange: "NYSE", company: "DigitalOcean Holdings, Inc.", price: 144.26, performance: {"1D":3.19,"5D":-0.12,"1M":33.56,"3M":1.93,"6M":68.25,"YTD":196.59,"1Y":291.9,"5Y":83.84,"10Y":247.61,"ALL":247.61}, ytd: 196.59, cap: "17B", theme: "AI platform", score: 85 },
  { rank: 15, symbol: "AMD", exchange: "NASDAQ", company: "Advanced Micro Devices, Inc.", price: 632, performance: {"1D":2.64,"5D":-0.4,"1M":37.54,"3M":17.44,"6M":209.73,"YTD":188.72,"1Y":274.69,"5Y":521.18,"10Y":8993.53,"ALL":137788.9}, ytd: 188.72, cap: "1T", theme: "Compute", score: 84 },
  { rank: 16, symbol: "LITE", exchange: "NASDAQ", company: "Lumentum Holdings, Inc.", price: 1087.4, performance: {"1D":3.98,"5D":16.17,"1M":25.32,"3M":39.85,"6M":53.46,"YTD":186.63,"1Y":515.22,"5Y":1176.59,"10Y":2489.66,"ALL":5746.24}, ytd: 186.63, cap: "97.5B", theme: "Optical", score: 83 },
  { rank: 17, symbol: "ARM", exchange: "NASDAQ", company: "ARM Holdings PLC Sponsored ADR", price: 308.36, performance: {"1D":5.48,"5D":-3.18,"1M":32.13,"3M":-8.56,"6M":105.89,"YTD":173.3,"1Y":104.41,"5Y":449.66,"10Y":449.66,"ALL":449.66}, ytd: 173.3, cap: "312.2B", theme: "Compute", score: 82 },
  { rank: 18, symbol: "BNAI", exchange: "NASDAQ", company: "Brand Engagement Network Inc.", price: 6.18, performance: {"1D":1.48,"5D":-4.19,"1M":-44.02,"3M":-64.75,"6M":-83.22,"YTD":147.2,"1Y":86.14,"5Y":-93.67,"10Y":-93.66,"ALL":-93.66}, ytd: 147.2, cap: "46.3M", theme: "AI platform", score: 81 },
  { rank: 19, symbol: "WDC", exchange: "NASDAQ", company: "Western Digital Corporation", price: 419.5, performance: {"1D":-9.31,"5D":-7.85,"1M":-5.72,"3M":-29.55,"6M":50.81,"YTD":136.74,"1Y":208.43,"5Y":875.35,"10Y":840.65,"ALL":7975.21}, ytd: 136.74, cap: "151.2B", theme: "Compute", score: 80 },
  { rank: 20, symbol: "CRWD", exchange: "NASDAQ", company: "CrowdStrike Holdings, Inc. Class A", price: 268.84, performance: {"1D":1.03,"5D":3.59,"1M":25.5,"3M":40.57,"6M":174.9,"YTD":126.87,"1Y":114.55,"5Y":337.9,"10Y":1593.48,"ALL":1593.48}, ytd: 126.87, cap: "275.3B", theme: "AI platform", score: 79 },
];

let stockListUpdatedAt = "2026-10-02T18:36:34.207Z";

const grid = document.querySelector("#stock-grid");
const search = document.querySelector("#stock-search");
const sortSelect = document.querySelector("#sort-select");
const themeButtons = document.querySelectorAll("[data-theme]");

let activeTheme = "all";
const activeTabs = new Map();
const activeRanges = new Map();

const exchangeOverrides = {
  AEVA: "NASDAQ",
  MYO: "AMEX",
  OUST: "NASDAQ",
  QBTS: "NYSE",
  SMR: "NYSE",
};

const TRADINGVIEW_SCANNER_URL = "https://scanner.tradingview.com/america/scan";
const scannerColumns = [
  "name",
  "description",
  "close",
  "change",
  "Perf.5D",
  "Perf.1M",
  "Perf.3M",
  "Perf.6M",
  "Perf.YTD",
  "Perf.Y",
  "Perf.5Y",
  "Perf.10Y",
  "Perf.All",
  "market_cap_basic",
];
const marketSnapshots = new Map();
const CLIENT_REFRESH_INTERVAL_MS = 6 * 60 * 60 * 1000;
const CLIENT_REFRESH_CHECK_MS = 5 * 60 * 1000;
const TOP_STOCK_COUNT = 20;
const MINIMUM_YTD = 100;
let clientRankRefreshInFlight = false;

const AI_STOCK_UNIVERSE = [
  { ticker: "BNAI", exchange: "NASDAQ", theme: "AI platform" },
  { ticker: "WATT", exchange: "NASDAQ", theme: "Compute" },
  { ticker: "SNDK", exchange: "NASDAQ", theme: "Compute" },
  { ticker: "AXTI", exchange: "NASDAQ", theme: "Compute" },
  { ticker: "AAOI", exchange: "NASDAQ", theme: "Optical" },
  { ticker: "AEHR", exchange: "NASDAQ", theme: "Compute" },
  { ticker: "MXL", exchange: "NASDAQ", theme: "Compute" },
  { ticker: "OPTX", exchange: "NASDAQ", theme: "Optical" },
  { ticker: "DOCN", exchange: "NYSE", theme: "AI platform" },
  { ticker: "NVTS", exchange: "NASDAQ", theme: "Compute" },
  { ticker: "QUIK", exchange: "NASDAQ", theme: "Compute" },
  { ticker: "DELL", exchange: "NYSE", theme: "Compute" },
  { ticker: "WOLF", exchange: "NYSE", theme: "Compute" },
  { ticker: "ARM", exchange: "NASDAQ", theme: "Compute" },
  { ticker: "MRVL", exchange: "NASDAQ", theme: "Compute" },
  { ticker: "VPG", exchange: "NYSE", theme: "Compute" },
  { ticker: "PENG", exchange: "NASDAQ", theme: "Compute" },
  { ticker: "STX", exchange: "NASDAQ", theme: "Compute" },
  { ticker: "MU", exchange: "NASDAQ", theme: "Compute" },
  { ticker: "WDC", exchange: "NASDAQ", theme: "Compute" },
  { ticker: "NVDA", exchange: "NASDAQ", theme: "Compute" },
  { ticker: "SMCI", exchange: "NASDAQ", theme: "Compute" },
  { ticker: "PLTR", exchange: "NASDAQ", theme: "AI platform" },
  { ticker: "AVGO", exchange: "NASDAQ", theme: "Compute" },
  { ticker: "AMD", exchange: "NASDAQ", theme: "Compute" },
  { ticker: "APP", exchange: "NASDAQ", theme: "AI platform" },
  { ticker: "IONQ", exchange: "NYSE", theme: "Quantum" },
  { ticker: "CRWD", exchange: "NASDAQ", theme: "AI platform" },
  { ticker: "SNOW", exchange: "NYSE", theme: "AI platform" },
  { ticker: "COHR", exchange: "NYSE", theme: "Optical" },
  { ticker: "LRCX", exchange: "NASDAQ", theme: "Compute" },
  { ticker: "MELI", exchange: "NASDAQ", theme: "AI platform" },
  { ticker: "PATH", exchange: "NYSE", theme: "AI platform" },
  { ticker: "RKLB", exchange: "NASDAQ", theme: "Robotics" },
  { ticker: "TEM", exchange: "NASDAQ", theme: "AI platform" },
  { ticker: "HUBS", exchange: "NYSE", theme: "AI platform" },
  { ticker: "ALAB", exchange: "NASDAQ", theme: "Compute" },
  { ticker: "TTD", exchange: "NASDAQ", theme: "AI platform" },
  { ticker: "QBTS", exchange: "NYSE", theme: "Quantum" },
  { ticker: "RGTI", exchange: "NASDAQ", theme: "Quantum" },
  { ticker: "QUBT", exchange: "NASDAQ", theme: "Quantum" },
  { ticker: "ARQQ", exchange: "NASDAQ", theme: "Quantum" },
  { ticker: "AI", exchange: "NYSE", theme: "AI platform" },
  { ticker: "SOUN", exchange: "NASDAQ", theme: "AI platform" },
  { ticker: "BBAI", exchange: "NYSE", theme: "AI platform" },
  { ticker: "UPST", exchange: "NASDAQ", theme: "AI platform" },
  { ticker: "APLD", exchange: "NASDAQ", theme: "Compute" },
  { ticker: "IREN", exchange: "NASDAQ", theme: "Compute" },
  { ticker: "CIFR", exchange: "NASDAQ", theme: "Compute" },
  { ticker: "CORZ", exchange: "NASDAQ", theme: "Compute" },
  { ticker: "VRT", exchange: "NYSE", theme: "Compute" },
  { ticker: "CEG", exchange: "NASDAQ", theme: "Compute" },
  { ticker: "ETN", exchange: "NYSE", theme: "Compute" },
  { ticker: "ANET", exchange: "NYSE", theme: "Compute" },
  { ticker: "CLS", exchange: "NYSE", theme: "Compute" },
  { ticker: "CRDO", exchange: "NASDAQ", theme: "Compute" },
  { ticker: "LITE", exchange: "NASDAQ", theme: "Optical" },
  { ticker: "CIEN", exchange: "NYSE", theme: "Optical" },
  { ticker: "NXT", exchange: "NASDAQ", theme: "Compute" },
  { ticker: "ONTO", exchange: "NYSE", theme: "Compute" },
  { ticker: "KLAC", exchange: "NASDAQ", theme: "Compute" },
  { ticker: "AMAT", exchange: "NASDAQ", theme: "Compute" },
  { ticker: "TER", exchange: "NASDAQ", theme: "Compute" },
  { ticker: "MPWR", exchange: "NASDAQ", theme: "Compute" },
  { ticker: "LSCC", exchange: "NASDAQ", theme: "Compute" },
  { ticker: "QCOM", exchange: "NASDAQ", theme: "Compute" },
  { ticker: "TXN", exchange: "NASDAQ", theme: "Compute" },
  { ticker: "INTC", exchange: "NASDAQ", theme: "Compute" },
  { ticker: "TSM", exchange: "NYSE", theme: "Compute" },
  { ticker: "ASML", exchange: "NASDAQ", theme: "Compute" },
  { ticker: "ORCL", exchange: "NYSE", theme: "AI platform" },
  { ticker: "MSFT", exchange: "NASDAQ", theme: "AI platform" },
  { ticker: "GOOGL", exchange: "NASDAQ", theme: "AI platform" },
  { ticker: "META", exchange: "NASDAQ", theme: "AI platform" },
  { ticker: "AMZN", exchange: "NASDAQ", theme: "AI platform" },
  { ticker: "IBM", exchange: "NYSE", theme: "AI platform" },
  { ticker: "CRM", exchange: "NYSE", theme: "AI platform" },
  { ticker: "NOW", exchange: "NYSE", theme: "AI platform" },
  { ticker: "ADBE", exchange: "NASDAQ", theme: "AI platform" },
  { ticker: "TWLO", exchange: "NYSE", theme: "AI platform" },
  { ticker: "DDOG", exchange: "NASDAQ", theme: "AI platform" },
  { ticker: "NET", exchange: "NYSE", theme: "AI platform" },
  { ticker: "ESTC", exchange: "NYSE", theme: "AI platform" },
  { ticker: "GTLB", exchange: "NASDAQ", theme: "AI platform" },
  { ticker: "FROG", exchange: "NASDAQ", theme: "AI platform" },
  { ticker: "ROK", exchange: "NYSE", theme: "Robotics" },
  { ticker: "ISRG", exchange: "NASDAQ", theme: "Robotics" },
  { ticker: "SYM", exchange: "NASDAQ", theme: "Robotics" },
  { ticker: "MBLY", exchange: "NASDAQ", theme: "Robotics" },
  { ticker: "OUST", exchange: "NASDAQ", theme: "Robotics" },
  { ticker: "AEVA", exchange: "NASDAQ", theme: "Robotics" },
  { ticker: "SERV", exchange: "NASDAQ", theme: "Robotics" },
];

const timeRanges = [
  { key: "1D", label: "1D", name: "1 day", overviewRange: "1d|1" },
  { key: "5D", label: "5D", name: "5 days", overviewRange: "5d|5" },
  { key: "1M", label: "1M", name: "1 month", overviewRange: "1m|30" },
  { key: "6M", label: "6M", name: "6 months", overviewRange: "6m|120" },
  { key: "YTD", label: "YTD", name: "Year to date", overviewRange: "ytd|1D" },
  { key: "1Y", label: "1Y", name: "1 year", overviewRange: "12m|1D" },
  { key: "5Y", label: "5Y", name: "5 years", overviewRange: "60m|1W" },
  { key: "10Y", label: "10Y", name: "10 years", overviewRange: "120m|1W" },
  { key: "ALL", label: "ALL", name: "All time", overviewRange: "all|1M" },
];

const stockTabs = [
  { key: "overview", label: "Overview", kind: "widget", script: "embed-widget-symbol-overview.js" },
  { key: "financials", label: "Financials", kind: "widget", script: "embed-widget-financials.js" },
  { key: "news", label: "News", kind: "widget", script: "embed-widget-timeline.js" },
  { key: "documents", label: "Documents", kind: "source" },
  { key: "community", label: "Community", kind: "source" },
  { key: "technicals", label: "Technicals", kind: "widget", script: "embed-widget-technical-analysis.js" },
  { key: "forecasts", label: "Forecasts", kind: "source" },
  { key: "seasonals", label: "Seasonals", kind: "source" },
  { key: "options", label: "Options", kind: "source" },
  { key: "bonds", label: "Bonds", kind: "source" },
  { key: "etfs", label: "ETFs", kind: "source" },
];

const timeFormatter = new Intl.DateTimeFormat(undefined, {
  year: "numeric",
  month: "short",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  timeZoneName: "short",
});

const dateFormatter = new Intl.DateTimeFormat(undefined, {
  year: "numeric",
  month: "short",
  day: "2-digit",
});

const stockListTimeFormatter = new Intl.DateTimeFormat(undefined, {
  month: "short",
  day: "2-digit",
  hour: "numeric",
  minute: "2-digit",
});

function formatPercent(value) {
  return `${value.toLocaleString(undefined, { maximumFractionDigits: 1 })}%`;
}

function formatPrice(value) {
  if (!Number.isFinite(value)) return "--";
  return `$${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function formatSignedPercent(value) {
  return `${value >= 0 ? "+" : ""}${formatPercent(value)}`;
}

function formatMarketCap(value) {
  if (!Number.isFinite(value)) return "";

  const units = [
    { limit: 1e12, suffix: "T" },
    { limit: 1e9, suffix: "B" },
    { limit: 1e6, suffix: "M" },
    { limit: 1e3, suffix: "K" },
  ];
  const unit = units.find((item) => Math.abs(value) >= item.limit);
  if (!unit) return value.toLocaleString(undefined, { maximumFractionDigits: 0 });

  return `${(value / unit.limit).toLocaleString(undefined, { maximumFractionDigits: 1 })}${unit.suffix}`;
}

function median(values) {
  const sorted = [...values].sort((a, b) => a - b);
  const midpoint = Math.floor(sorted.length / 2);
  return (sorted[midpoint - 1] + sorted[midpoint]) / 2;
}

function stockRangePerformance(stock, rangeKey) {
  const snapshotValue = marketSnapshots.get(stock.symbol)?.performance?.[rangeKey];
  if (Number.isFinite(snapshotValue)) return snapshotValue;

  const storedValue = stock.performance?.[rangeKey];
  return Number.isFinite(storedValue) ? storedValue : NaN;
}

function stockYtd(stock) {
  const scannerYtd = stockRangePerformance(stock, "YTD");
  return Number.isFinite(scannerYtd) ? scannerYtd : stock.ytd;
}

function easternTimeParts(date = new Date()) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/New_York",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(date);

  return Object.fromEntries(parts.map((part) => [part.type, part.value]));
}

function isTradingWindow(date = new Date()) {
  const parts = easternTimeParts(date);
  if (["Sat", "Sun"].includes(parts.weekday)) return false;

  const minutes = Number(parts.hour) * 60 + Number(parts.minute);
  return minutes >= 9 * 60 + 30 && minutes <= 16 * 60;
}

function shouldRefreshRankedStocks(date = new Date()) {
  const updatedAt = new Date(stockListUpdatedAt);
  if (Number.isNaN(updatedAt.getTime())) return isTradingWindow(date);
  return isTradingWindow(date) && date.getTime() - updatedAt.getTime() >= CLIENT_REFRESH_INTERVAL_MS;
}

function getYtdSummary(items = stocks) {
  const values = items
    .map((stock) => ({ stock, ytd: stockYtd(stock) }))
    .filter((item) => Number.isFinite(item.ytd));

  if (!values.length) {
    return { highest: null, highestYtd: 0, medianYtd: 0 };
  }

  const highest = values.reduce((best, item) => (item.ytd > best.ytd ? item : best), values[0]);
  return {
    highest: highest.stock,
    highestYtd: highest.ytd,
    medianYtd: median(values.map((item) => item.ytd)),
  };
}

function getActiveTab(stock) {
  return activeTabs.get(stock.symbol) || "overview";
}

function getActiveRange(stock) {
  return activeRanges.get(stock.symbol) || "YTD";
}

function tradingviewSymbol(stock) {
  const exchange = stock.exchange || exchangeOverrides[stock.symbol] || "NASDAQ";
  return `${exchange}:${stock.symbol}`;
}

function tradingviewSymbolUrl(stock, path = "") {
  const symbol = tradingviewSymbol(stock);
  const symbolPath = symbol.replace(":", "-");
  const widgetSymbol = encodeURIComponent(symbol);
  return `https://www.tradingview.com/symbols/${symbolPath}/${path}?tvwidgetsymbol=${widgetSymbol}`;
}

function makeWidgetConfig(stock, tabKey, rangeKey = getActiveRange(stock)) {
  const symbol = tradingviewSymbol(stock);
  const symbolName = stock.symbol;

  if (tabKey === "overview") {
    const selectedRange = timeRanges.find((range) => range.key === rangeKey) || timeRanges[4];
    return {
      script: "embed-widget-symbol-overview.js",
      config: {
        lineWidth: 2,
        lineType: 0,
        chartType: "area",
        fontColor: "#7f8d98",
        gridLineColor: "rgba(127, 141, 152, 0.12)",
        backgroundColor: "#0d1319",
        widgetFontColor: "#d8e0e6",
        upColor: "#2dd4a0",
        downColor: "#f87171",
        borderUpColor: "#2dd4a0",
        borderDownColor: "#f87171",
        wickUpColor: "#2dd4a0",
        wickDownColor: "#f87171",
        colorTheme: "dark",
        isTransparent: false,
        locale: "en",
        chartOnly: true,
        scalePosition: "right",
        scaleMode: "Normal",
        valuesTracking: "1",
        changeMode: "price-and-percent",
        symbols: [[symbolName, `${symbol}|1D`]],
        dateRanges: [selectedRange.overviewRange],
        fontSize: "12",
        headerFontSize: "medium",
        autosize: true,
        width: "100%",
        height: "100%",
        noTimeScale: false,
        hideDateRanges: true,
        hideMarketStatus: true,
        hideSymbolLogo: true,
      },
    };
  }

  if (tabKey === "financials") {
    return {
      script: "embed-widget-financials.js",
      config: {
        symbol,
        colorTheme: "dark",
        displayMode: "regular",
        isTransparent: false,
        locale: "en",
        width: "100%",
        height: "100%",
      },
    };
  }

  if (tabKey === "news") {
    return {
      script: "embed-widget-timeline.js",
      config: {
        feedMode: "symbol",
        symbol,
        colorTheme: "dark",
        isTransparent: false,
        displayMode: "regular",
        width: "100%",
        height: "100%",
        locale: "en",
      },
    };
  }

  if (tabKey === "technicals") {
    return {
      script: "embed-widget-technical-analysis.js",
      config: {
        symbol,
        colorTheme: "dark",
        displayMode: "single",
        isTransparent: false,
        locale: "en",
        interval: "1m",
        disableInterval: false,
        width: "100%",
        height: "100%",
        showIntervalTabs: true,
      },
    };
  }

  return null;
}

function renderTradingViewWidget(container) {
  const stock = stocks.find((item) => item.symbol === container.dataset.symbol);
  const tabKey = container.dataset.tab;
  const widget = stock ? makeWidgetConfig(stock, tabKey, container.dataset.range) : null;
  if (!widget) return;

  const widgetShell = document.createElement("div");
  const widgetMount = document.createElement("div");
  const script = document.createElement("script");

  widgetShell.className = "tradingview-widget-container";
  widgetMount.className = "tradingview-widget-container__widget";
  script.type = "text/javascript";
  script.async = true;
  script.src = `https://s3.tradingview.com/external-embedding/${widget.script}`;
  script.text = JSON.stringify(widget.config, null, 2);

  widgetShell.append(widgetMount, script);
  container.replaceChildren(widgetShell);
}

const chartObserver =
  "IntersectionObserver" in window
    ? new IntersectionObserver(
        (entries, observer) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            renderTradingViewWidget(entry.target);
            observer.unobserve(entry.target);
          });
        },
        { rootMargin: "500px 0px" }
      )
    : null;

function hydrateTradingViewCharts(root = document) {
  root.querySelectorAll(".stock-tab-panel[data-kind='widget']").forEach((container) => {
    if (chartObserver) {
      chartObserver.observe(container);
    } else {
      renderTradingViewWidget(container);
    }
  });
}

function applyMarketSnapshot(rows) {
  rows.forEach((row) => {
    const [symbol, description, price, d1, d5, m1, m3, m6, ytd, y1, y5, y10, all, marketCap] = row.d || [];
    if (!symbol) return;

    marketSnapshots.set(symbol, {
      description,
      price,
      performance: {
        "1D": d1,
        "5D": d5,
        "1M": m1,
        "3M": m3,
        "6M": m6,
        YTD: ytd,
        "1Y": y1,
        "5Y": y5,
        "10Y": y10,
        ALL: all,
      },
      cap: formatMarketCap(marketCap),
    });
  });

  stocks.forEach((stock) => {
    const snapshot = marketSnapshots.get(stock.symbol);
    if (!snapshot) return;

    if (Number.isFinite(snapshot.price)) stock.price = snapshot.price;
    stock.performance = snapshot.performance;
    if (Number.isFinite(snapshot.performance.YTD)) stock.ytd = snapshot.performance.YTD;
    if (snapshot.cap) stock.cap = snapshot.cap;
  });
}

async function refreshMarketSnapshot() {
  try {
    const response = await fetch(TRADINGVIEW_SCANNER_URL, {
      method: "POST",
      headers: { "content-type": "text/plain;charset=UTF-8" },
      body: JSON.stringify({
        symbols: {
          tickers: stocks.map(tradingviewSymbol),
          query: { types: [] },
        },
        columns: scannerColumns,
      }),
    });

    if (!response.ok) throw new Error(`TradingView scanner returned ${response.status}`);

    const payload = await response.json();
    applyMarketSnapshot(payload.data || []);
    renderSummary();
    renderStocks();
  } catch (error) {
    console.warn("TradingView scanner refresh failed", error);
  }
}

async function fetchScannerRowsForUniverse() {
  const response = await fetch(TRADINGVIEW_SCANNER_URL, {
    method: "POST",
    headers: { "content-type": "text/plain;charset=UTF-8" },
    body: JSON.stringify({
      symbols: {
        tickers: AI_STOCK_UNIVERSE.map((stock) => `${stock.exchange}:${stock.ticker}`),
        query: { types: [] },
      },
      columns: scannerColumns,
    }),
  });

  if (!response.ok) throw new Error(`TradingView scanner returned ${response.status}`);

  return response.json();
}

function rankedStocksFromScannerRows(rows) {
  const universeByTicker = new Map(AI_STOCK_UNIVERSE.map((stock) => [stock.ticker, stock]));
  const candidates = (rows || [])
    .map((row) => {
      const [symbol, description, price, d1, d5, m1, m3, m6, ytd, y1, y5, y10, all, marketCap] = row.d || [];
      const universeStock = universeByTicker.get(symbol);
      if (!universeStock || !Number.isFinite(price) || !Number.isFinite(ytd) || ytd < MINIMUM_YTD) return null;

      return {
        symbol,
        exchange: universeStock.exchange,
        company: description || symbol,
        price,
        performance: {
          "1D": d1,
          "5D": d5,
          "1M": m1,
          "3M": m3,
          "6M": m6,
          YTD: ytd,
          "1Y": y1,
          "5Y": y5,
          "10Y": y10,
          ALL: all,
        },
        ytd,
        cap: formatMarketCap(marketCap),
        theme: universeStock.theme,
      };
    })
    .filter(Boolean)
    .sort((a, b) => b.ytd - a.ytd)
    .slice(0, TOP_STOCK_COUNT);

  if (candidates.length < TOP_STOCK_COUNT) return null;

  return candidates.map((stock, index) => ({
    ...stock,
    rank: index + 1,
    score: TOP_STOCK_COUNT + 78 - index,
    price: Number(stock.price.toFixed(2)),
    ytd: Number(stock.ytd.toFixed(2)),
    performance: Object.fromEntries(
      Object.entries(stock.performance).map(([key, value]) => [key, Number.isFinite(value) ? Number(value.toFixed(2)) : null])
    ),
  }));
}

async function refreshRankedStocks({ force = false } = {}) {
  if (clientRankRefreshInFlight || (!force && !shouldRefreshRankedStocks())) return;

  clientRankRefreshInFlight = true;
  try {
    const payload = await fetchScannerRowsForUniverse();
    const ranked = rankedStocksFromScannerRows(payload.data);
    if (!ranked) throw new Error("TradingView scanner returned fewer than 20 AI stocks above 100% YTD");

    stocks.splice(0, stocks.length, ...ranked);
    marketSnapshots.clear();
    stockListUpdatedAt = new Date().toISOString();
    renderSummary();
    renderStockListUpdateTime();
    renderStocks();
  } catch (error) {
    console.warn("Browser stock list refresh failed", error);
  } finally {
    clientRankRefreshInFlight = false;
  }
}

function scheduleClientRankRefresh() {
  refreshRankedStocks();
  setInterval(refreshRankedStocks, CLIENT_REFRESH_CHECK_MS);
}

function sourceLinks(stock, tabKey) {
  const symbol = stock.symbol;
  const secSearch = `https://www.sec.gov/edgar/search/#/q=${encodeURIComponent(symbol)}`;
  const paths = {
    documents: [
      ["TradingView documents", tradingviewSymbolUrl(stock, "documents/")],
      ["SEC filings", secSearch],
    ],
    community: [["TradingView community ideas", tradingviewSymbolUrl(stock, "ideas/")]],
    forecasts: [["TradingView forecasts", tradingviewSymbolUrl(stock, "forecast/")]],
    seasonals: [["TradingView seasonals", tradingviewSymbolUrl(stock, "seasonals/")]],
    options: [["TradingView options", tradingviewSymbolUrl(stock, "options/")]],
    bonds: [["TradingView bonds", tradingviewSymbolUrl(stock, "bonds/")]],
    etfs: [["TradingView ETFs", tradingviewSymbolUrl(stock, "etfs/")]],
  };

  return paths[tabKey] || [["Open on TradingView", tradingviewSymbolUrl(stock)]];
}

function renderSourcePanel(stock, tabKey) {
  const tab = stockTabs.find((item) => item.key === tabKey);
  const links = sourceLinks(stock, tabKey)
    .map(([label, href]) => `<a href="${href}" target="_blank" rel="noopener noreferrer">${label}</a>`)
    .join("");

  return `
    <div class="source-panel">
      <h3>${tab.label}</h3>
      <p>TradingView does not provide an embeddable ${tab.label.toLowerCase()} widget for this symbol tab, so this panel opens the corresponding source directly.</p>
      <div class="source-links">${links}</div>
    </div>
  `;
}

function renderOverviewPanel(stock) {
  const activeRange = getActiveRange(stock);
  const rangeControls = timeRanges
    .map((range) => {
      const value = stockRangePerformance(stock, range.key);
      const returnLabel = Number.isFinite(value) ? formatSignedPercent(value) : "--";
      const direction = Number.isFinite(value) && value < 0 ? "negative" : "positive";

      return `
        <button
          type="button"
          class="range-option ${range.key === activeRange ? "active" : ""}"
          data-symbol="${stock.symbol}"
          data-range-target="${range.key}"
          aria-pressed="${range.key === activeRange}"
        >
          <span>${range.name}</span>
          <strong class="${direction}">${returnLabel}</strong>
        </button>
      `;
    })
    .join("");

  return `
    <div class="overview-range-controls" role="group" aria-label="${stock.symbol} chart range">
      ${rangeControls}
    </div>
    <div
      class="stock-tab-panel overview-panel"
      data-kind="widget"
      data-symbol="${stock.symbol}"
      data-tab="overview"
      data-range="${activeRange}"
    >
      <span>Loading Overview from TradingView...</span>
    </div>
  `;
}

function renderTabPanel(stock, tabKey) {
  const tab = stockTabs.find((item) => item.key === tabKey) || stockTabs[0];

  if (tab.key === "overview") return renderOverviewPanel(stock);

  if (tab.kind === "source") {
    return `
      <div class="stock-tab-panel source-tab" data-kind="source" data-symbol="${stock.symbol}" data-tab="${tab.key}">
        ${renderSourcePanel(stock, tab.key)}
      </div>
    `;
  }

  return `
    <div class="stock-tab-panel ${tab.key}-panel" data-kind="widget" data-symbol="${stock.symbol}" data-tab="${tab.key}">
      <span>Loading ${tab.label} from TradingView...</span>
    </div>
  `;
}

function updateStockTab(symbol, tabKey) {
  const stock = stocks.find((item) => item.symbol === symbol);
  const card = grid.querySelector(`.stock-card[data-symbol="${symbol}"]`);
  if (!stock || !card) return;

  activeTabs.set(symbol, tabKey);

  card.querySelectorAll("[data-tab-target]").forEach((button) => {
    const isActive = button.dataset.tabTarget === tabKey;
    button.classList.toggle("active", isActive);
    button.setAttribute("aria-selected", String(isActive));
  });

  const panelHost = card.querySelector(".stock-panel-host");
  panelHost.innerHTML = renderTabPanel(stock, tabKey);
  hydrateTradingViewCharts(panelHost);
}

function updateOverviewRange(symbol, rangeKey) {
  const stock = stocks.find((item) => item.symbol === symbol);
  const card = grid.querySelector(`.stock-card[data-symbol="${symbol}"]`);
  if (!stock || !card || !timeRanges.some((range) => range.key === rangeKey)) return;

  activeRanges.set(symbol, rangeKey);
  const panelHost = card.querySelector(".stock-panel-host");
  panelHost.innerHTML = renderOverviewPanel(stock);
  hydrateTradingViewCharts(panelHost);
}

function renderSummary() {
  const themes = new Set(stocks.map((stock) => stock.theme));
  const { highest, highestYtd, medianYtd } = getYtdSummary(stocks);
  document.querySelector("#highest-ytd").textContent = formatSignedPercent(highestYtd);
  document.querySelector("#highest-name").textContent = highest ? `${highest.symbol} · ${highest.company}` : "Awaiting market data";
  document.querySelector("#median-ytd").textContent = formatSignedPercent(medianYtd);
  document.querySelector("#theme-count").textContent = themes.size;
}

function renderTime() {
  const now = new Date();
  document.querySelector("#source-time").textContent = timeFormatter.format(now);
  document.querySelector("#source-date").textContent = dateFormatter.format(now);
  document.querySelector("#source-detail").textContent = `Live local time · ${now.toLocaleTimeString()}`;
}

function renderStockListUpdateTime() {
  const target = document.querySelector("#stock-list-update-time");
  if (!target) return;

  const updatedAt = new Date(stockListUpdatedAt);
  target.textContent = Number.isNaN(updatedAt.getTime())
    ? "Stock list update time: --"
    : `Stock list update time: ${stockListTimeFormatter.format(updatedAt)}`;
}

function themeClass(theme) {
  return theme.toLowerCase().replace(/\s+/g, "-");
}

function sortStocks(items) {
  const mode = sortSelect.value;
  if (mode === "rank-asc") return [...items].sort((a, b) => a.rank - b.rank);
  if (mode === "symbol-asc") return [...items].sort((a, b) => a.symbol.localeCompare(b.symbol));
  return [...items].sort((a, b) => stockYtd(b) - stockYtd(a));
}

function renderStocks() {
  const query = search.value.trim().toLowerCase();
  const filtered = stocks.filter((stock) => {
    const haystack = `${stock.symbol} ${stock.company} ${stock.theme}`.toLowerCase();
    const themeMatch = activeTheme === "all" || stock.theme === activeTheme;
    return themeMatch && haystack.includes(query);
  });

  const sorted = sortStocks(filtered);

  grid.innerHTML = sorted
    .map((stock, index) => {
      const tabKey = getActiveTab(stock);
      const fullChartUrl = tradingviewSymbolUrl(stock);
      const displayRank = sortSelect.value === "ytd-desc" ? index + 1 : stock.rank;
      const tabButtons = stockTabs
        .map(
          (tab) => `
            <button
              type="button"
              class="${tab.key === tabKey ? "active" : ""}"
              data-symbol="${stock.symbol}"
              data-tab-target="${tab.key}"
              aria-selected="${tab.key === tabKey}"
              role="tab"
            >${tab.label}</button>
          `
        )
        .join("");

      return `
        <article class="stock-card" data-symbol="${stock.symbol}">
          <div class="card-head">
            <div>
              <span class="rank">#${displayRank}</span>
              <h2>${stock.symbol}</h2>
              <span class="card-price">${formatPrice(stock.price)}</span>
              <p>${stock.company}</p>
            </div>
            <div class="card-badges">
              <span class="theme ${themeClass(stock.theme)}">${stock.theme}</span>
              <span class="card-ytd">YTD ${formatSignedPercent(stockYtd(stock))}</span>
              <a class="full-chart-link" href="${fullChartUrl}" target="_blank" rel="noopener noreferrer">Full chart</a>
            </div>
          </div>
          <div class="stock-tabs" role="tablist" aria-label="${stock.symbol} data tabs">
            ${tabButtons}
          </div>
          <div class="stock-panel-host">
            ${renderTabPanel(stock, tabKey)}
          </div>
        </article>
      `;
    })
    .join("");

  hydrateTradingViewCharts();
}

themeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activeTheme = button.dataset.theme;
    themeButtons.forEach((item) => item.classList.toggle("active", item === button));
    renderStocks();
  });
});

search.addEventListener("input", renderStocks);
sortSelect.addEventListener("change", renderStocks);
grid.addEventListener("click", (event) => {
  const rangeButton = event.target.closest("[data-range-target]");
  if (rangeButton) {
    updateOverviewRange(rangeButton.dataset.symbol, rangeButton.dataset.rangeTarget);
    return;
  }

  const tabButton = event.target.closest("[data-tab-target]");
  if (!tabButton) return;

  updateStockTab(tabButton.dataset.symbol, tabButton.dataset.tabTarget);
});

renderSummary();
renderTime();
renderStockListUpdateTime();
setInterval(renderTime, 1000);
renderStocks();
refreshMarketSnapshot();
scheduleClientRankRefresh();
