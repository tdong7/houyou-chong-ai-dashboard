const stocks = [
  { rank: 1, symbol: "WATT", exchange: "NASDAQ", company: "Energous Corp.", price: 25.81, ytdBase: 4.32, ytd: 497.45, m1: 0.04, m3: 125.41, cap: "142M", theme: "Compute", score: 98 },
  { rank: 2, symbol: "SNDK", exchange: "NASDAQ", company: "Sandisk Corporation", price: 1642, ytdBase: 275.24, ytd: 496.57, m1: 17.76, m3: 174.02, cap: "243.2B", theme: "Compute", score: 97 },
  { rank: 3, symbol: "AXTI", exchange: "NASDAQ", company: "AXT, Inc.", price: 90.78, ytdBase: 16.76, ytd: 441.62, m1: -21.31, m3: 127.11, cap: "5.9B", theme: "Compute", score: 96 },
  { rank: 4, symbol: "AAOI", exchange: "NASDAQ", company: "Applied Optoelectronics, Inc.", price: 196.64, ytdBase: 39.6, ytd: 396.57, m1: 13.11, m3: 75.41, cap: "15.8B", theme: "Optical", score: 95 },
  { rank: 5, symbol: "BNAI", exchange: "NASDAQ", company: "Brand Engagement Network Inc.", price: 18.27, ytdBase: 3.77, ytd: 384.62, m1: -17.33, m3: -52.5, cap: "118.9M", theme: "AI platform", score: 94 },
  { rank: 6, symbol: "AEHR", exchange: "NASDAQ", company: "Aehr Test Systems", price: 95.58, ytdBase: 22.16, ytd: 331.32, m1: 1.68, m3: 138.47, cap: "3B", theme: "Compute", score: 93 },
  { rank: 7, symbol: "MXL", exchange: "NASDAQ", company: "MaxLinear, Inc.", price: 79.27, ytdBase: 18.51, ytd: 328.25, m1: -9.65, m3: 395.13, cap: "7.1B", theme: "Compute", score: 92 },
  { rank: 8, symbol: "OPTX", exchange: "NASDAQ", company: "Syntec Optics Holdings, Inc. Class A", price: 11.91, ytdBase: 3.13, ytd: 280.51, m1: 66.11, m3: 72.61, cap: "479.7M", theme: "Optical", score: 91 },
  { rank: 9, symbol: "DOCN", exchange: "NYSE", company: "DigitalOcean Holdings, Inc.", price: 169.32, ytdBase: 48.97, ytd: 245.76, m1: 11.95, m3: 193.86, cap: "17.7B", theme: "AI platform", score: 90 },
  { rank: 10, symbol: "QUIK", exchange: "NASDAQ", company: "QuickLogic Corporation", price: 20.78, ytdBase: 6.28, ytd: 230.89, m1: 16.09, m3: 143.61, cap: "378.7M", theme: "Compute", score: 89 },
  { rank: 11, symbol: "MRVL", exchange: "NASDAQ", company: "Marvell Technology, Inc.", price: 288.85, ytdBase: 89.39, ytd: 223.13, m1: 75.4, m3: 212.03, cap: "252.7B", theme: "Compute", score: 88 },
  { rank: 12, symbol: "PENG", exchange: "NASDAQ", company: "Penguin Solutions Incorporation", price: 64.63, ytdBase: 20.28, ytd: 218.69, m1: 61.62, m3: 250.49, cap: "3.3B", theme: "Compute", score: 87 },
  { rank: 13, symbol: "DELL", exchange: "NYSE", company: "Dell Technologies, Inc. Class C", price: 400.77, ytdBase: 127.8, ytd: 213.59, m1: 71.57, m3: 173.97, cap: "261.5B", theme: "Compute", score: 86 },
  { rank: 14, symbol: "VPG", exchange: "NYSE", company: "Vishay Precision Group, Inc.", price: 119.96, ytdBase: 39.28, ytd: 205.4, m1: 87.67, m3: 173.44, cap: "1.6B", theme: "Compute", score: 85 },
  { rank: 15, symbol: "STX", exchange: "NASDAQ", company: "Seagate Technology Holdings PLC", price: 876.77, ytdBase: 287.54, ytd: 204.92, m1: 12.41, m3: 131.99, cap: "196.6B", theme: "Compute", score: 84 },
  { rank: 16, symbol: "ARM", exchange: "NASDAQ", company: "ARM Holdings PLC Sponsored ADR", price: 346.39, ytdBase: 114.73, ytd: 201.92, m1: 59.66, m3: 196.06, cap: "364.9B", theme: "Compute", score: 83 },
  { rank: 17, symbol: "MU", exchange: "NASDAQ", company: "Micron Technology, Inc.", price: 949.28, ytdBase: 315.42, ytd: 200.96, m1: 40.33, m3: 140.93, cap: "1.1T", theme: "Compute", score: 82 },
  { rank: 18, symbol: "WOLF", exchange: "NYSE", company: "Wolfspeed Inc", price: 55.42, ytdBase: 18.93, ytd: 192.76, m1: 15.94, m3: 224.47, cap: "2.7B", theme: "Compute", score: 81 },
  { rank: 19, symbol: "NVTS", exchange: "NASDAQ", company: "Navitas Semiconductor Corporation", price: 24.48, ytdBase: 8.38, ytd: 192.12, m1: 54.11, m3: 189.7, cap: "5.7B", theme: "Compute", score: 80 },
  { rank: 20, symbol: "WDC", exchange: "NASDAQ", company: "Western Digital Corporation", price: 526.93, ytdBase: 187.7, ytd: 180.73, m1: 10.92, m3: 96.29, cap: "181.6B", theme: "Compute", score: 79 },
];

const stockListUpdatedAt = "2026-06-09T04:58:00.000Z";

const grid = document.querySelector("#stock-grid");
const search = document.querySelector("#stock-search");
const sortSelect = document.querySelector("#sort-select");
const themeButtons = document.querySelectorAll("[data-theme]");

let activeTheme = "all";
const activeTabs = new Map();

const exchangeOverrides = {
  AEVA: "NASDAQ",
  MYO: "AMEX",
  OUST: "NASDAQ",
  QBTS: "NYSE",
  SMR: "NYSE",
};

const TRADINGVIEW_SCANNER_URL = "https://scanner.tradingview.com/america/scan";
const scannerColumns = ["name", "description", "close", "Perf.YTD", "Perf.1M", "Perf.3M", "market_cap_basic"];
const marketSnapshots = new Map();

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

function calculateYtd(price, baseline) {
  if (!Number.isFinite(price) || !Number.isFinite(baseline) || baseline <= 0) return NaN;
  return ((price / baseline) - 1) * 100;
}

function stockYtd(stock) {
  const snapshot = marketSnapshots.get(stock.symbol);
  const price = Number.isFinite(snapshot?.price) ? snapshot.price : stock.price;
  const chartYtd = calculateYtd(price, stock.ytdBase);
  if (Number.isFinite(chartYtd)) return chartYtd;

  return Number.isFinite(snapshot?.scannerYtd) ? snapshot.scannerYtd : stock.ytd;
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

function makeWidgetConfig(stock, tabKey) {
  const symbol = tradingviewSymbol(stock);
  const symbolName = stock.symbol;

  if (tabKey === "overview") {
    return {
      script: "embed-widget-symbol-overview.js",
      config: {
        lineWidth: 2,
        lineType: 0,
        chartType: "area",
        fontColor: "rgb(60, 60, 60)",
        gridLineColor: "rgba(46, 46, 46, 0.06)",
        backgroundColor: "#ffffff",
        widgetFontColor: "#0F0F0F",
        upColor: "#4a9b87",
        downColor: "#ef5350",
        borderUpColor: "#4a9b87",
        borderDownColor: "#ef5350",
        wickUpColor: "#4a9b87",
        wickDownColor: "#ef5350",
        colorTheme: "light",
        isTransparent: false,
        locale: "en",
        chartOnly: false,
        scalePosition: "right",
        scaleMode: "Normal",
        valuesTracking: "1",
        changeMode: "price-and-percent",
        symbols: [[symbolName, `${symbol}|1D`]],
        dateRanges: timeRanges.map((range) => range.overviewRange),
        fontSize: "12",
        headerFontSize: "medium",
        autosize: true,
        width: "100%",
        height: "100%",
        noTimeScale: false,
        hideDateRanges: false,
        hideMarketStatus: false,
        hideSymbolLogo: false,
      },
    };
  }

  if (tabKey === "financials") {
    return {
      script: "embed-widget-financials.js",
      config: {
        symbol,
        colorTheme: "light",
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
        colorTheme: "light",
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
        colorTheme: "light",
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
  const widget = stock ? makeWidgetConfig(stock, tabKey) : null;
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

function hydrateTradingViewCharts(root = document) {
  root.querySelectorAll(".stock-tab-panel[data-kind='widget']").forEach(renderTradingViewWidget);
}

function applyMarketSnapshot(rows) {
  rows.forEach((row) => {
    const [symbol, description, price, ytd, m1, m3, marketCap] = row.d || [];
    if (!symbol) return;

    marketSnapshots.set(symbol, {
      description,
      price,
      scannerYtd: ytd,
      m1,
      m3,
      cap: formatMarketCap(marketCap),
    });
  });

  stocks.forEach((stock) => {
    const snapshot = marketSnapshots.get(stock.symbol);
    if (!snapshot) return;

    if (Number.isFinite(snapshot.price)) stock.price = snapshot.price;
    if (Number.isFinite(snapshot.m1)) stock.m1 = snapshot.m1;
    if (Number.isFinite(snapshot.m3)) stock.m3 = snapshot.m3;
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

function renderTabPanel(stock, tabKey) {
  const tab = stockTabs.find((item) => item.key === tabKey) || stockTabs[0];

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
