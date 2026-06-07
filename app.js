const stocks = [
  { rank: 1, symbol: "BNAI", company: "Brand Engagement Network", price: 22.17, ytd: 2197.26, m1: 18.4, m3: 246.8, cap: "142M", theme: "AI platform", score: 97 },
  { rank: 2, symbol: "STRC", company: "Sarcos Technology and Robotics", price: 4.12, ytd: 951.54, m1: 24.7, m3: 112.6, cap: "91M", theme: "Robotics", score: 94 },
  { rank: 3, symbol: "WATT", company: "Energous", price: 7.38, ytd: 467.73, m1: 17.2, m3: 84.1, cap: "53M", theme: "Compute", score: 91 },
  { rank: 4, symbol: "HSCS", company: "HeartSciences", price: 3.64, ytd: 416.46, m1: 31.6, m3: 96.4, cap: "37M", theme: "AI platform", score: 90 },
  { rank: 5, symbol: "KSCP", company: "Knightscope", price: 18.72, ytd: 324.53, m1: 22.9, m3: 77.8, cap: "207M", theme: "Robotics", score: 88 },
  { rank: 6, symbol: "CRNC", company: "Cerence", price: 14.83, ytd: 237.09, m1: 12.3, m3: 38.7, cap: "623M", theme: "AI platform", score: 86 },
  { rank: 7, symbol: "CSAI", company: "Cloudastructure", price: 9.41, ytd: 213.2, m1: 21.6, m3: 58.8, cap: "188M", theme: "AI platform", score: 84 },
  { rank: 8, symbol: "MYO", company: "Myomo", price: 6.86, ytd: 202.23, m1: 16.8, m3: 54.1, cap: "214M", theme: "Robotics", score: 83 },
  { rank: 9, symbol: "PHUN", company: "Phunware", price: 8.28, ytd: 195.8, m1: 22.9, m3: 71.6, cap: "95M", theme: "AI platform", score: 82 },
  { rank: 10, symbol: "QBTS", company: "D-Wave Quantum", price: 15.43, ytd: 186.9, m1: 24.2, m3: 67.4, cap: "4.1B", theme: "Quantum", score: 81 },
  { rank: 11, symbol: "RVSN", company: "Rail Vision", price: 4.06, ytd: 177.49, m1: 15.3, m3: 42.2, cap: "41M", theme: "Robotics", score: 80 },
  { rank: 12, symbol: "TSSI", company: "TSS", price: 17.61, ytd: 160.73, m1: 19.4, m3: 40.1, cap: "393M", theme: "Compute", score: 78 },
  { rank: 13, symbol: "RGTI", company: "Rigetti Computing", price: 14.97, ytd: 154.4, m1: 11.1, m3: 27.8, cap: "4.7B", theme: "Quantum", score: 77 },
  { rank: 14, symbol: "SOUN", company: "SoundHound AI", price: 18.32, ytd: 153.84, m1: 10.4, m3: 25.6, cap: "7.1B", theme: "AI platform", score: 76 },
  { rank: 15, symbol: "OUST", company: "Ouster", price: 26.54, ytd: 151.2, m1: 14.2, m3: 29.4, cap: "1.2B", theme: "Robotics", score: 75 },
  { rank: 16, symbol: "AEVA", company: "Aeva Technologies", price: 9.92, ytd: 148.5, m1: 13.6, m3: 34.2, cap: "759M", theme: "Robotics", score: 74 },
  { rank: 17, symbol: "SMR", company: "NuScale Power", price: 42.88, ytd: 140.85, m1: 12.5, m3: 27.1, cap: "11.3B", theme: "Compute", score: 73 },
  { rank: 18, symbol: "LITE", company: "Lumentum", price: 106.77, ytd: 137.15, m1: 8.6, m3: 21.5, cap: "7.4B", theme: "Optical", score: 72 },
  { rank: 19, symbol: "WDC", company: "Western Digital", price: 108.92, ytd: 137.1, m1: 13.1, m3: 29.4, cap: "37.6B", theme: "Compute", score: 71 },
  { rank: 20, symbol: "AAOI", company: "Applied Optoelectronics", price: 28.46, ytd: 134.51, m1: 7.9, m3: 18.7, cap: "1.4B", theme: "Optical", score: 70 },
];

const grid = document.querySelector("#stock-grid");
const search = document.querySelector("#stock-search");
const sortSelect = document.querySelector("#sort-select");
const themeButtons = document.querySelectorAll("[data-theme]");

let activeTheme = "all";
const activeTabs = new Map();

const exchangeOverrides = {
  AEVA: "NYSE",
  MYO: "NYSEAMERICAN",
  OUST: "NYSE",
  SMR: "NYSE",
};

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

function formatPercent(value) {
  return `${value.toLocaleString(undefined, { maximumFractionDigits: 1 })}%`;
}

function median(values) {
  const sorted = [...values].sort((a, b) => a - b);
  const midpoint = Math.floor(sorted.length / 2);
  return (sorted[midpoint - 1] + sorted[midpoint]) / 2;
}

function getActiveTab(stock) {
  return activeTabs.get(stock.symbol) || "overview";
}

function tradingviewSymbol(stock) {
  const exchange = exchangeOverrides[stock.symbol] || "NASDAQ";
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
  document.querySelector("#highest-ytd").textContent = `+${formatPercent(stocks[0].ytd)}`;
  document.querySelector("#highest-name").textContent = `${stocks[0].symbol} · ${stocks[0].company}`;
  document.querySelector("#median-ytd").textContent = `+${formatPercent(median(stocks.map((stock) => stock.ytd)))}`;
  document.querySelector("#theme-count").textContent = themes.size;
}

function renderTime() {
  const now = new Date();
  document.querySelector("#source-time").textContent = timeFormatter.format(now);
  document.querySelector("#source-date").textContent = dateFormatter.format(now);
  document.querySelector("#source-detail").textContent = `Live local time · ${now.toLocaleTimeString()}`;
}

function themeClass(theme) {
  return theme.toLowerCase().replace(/\s+/g, "-");
}

function sortStocks(items) {
  const mode = sortSelect.value;
  if (mode === "rank-asc") return [...items].sort((a, b) => a.rank - b.rank);
  if (mode === "symbol-asc") return [...items].sort((a, b) => a.symbol.localeCompare(b.symbol));
  return [...items].sort((a, b) => b.ytd - a.ytd);
}

function renderStocks() {
  const query = search.value.trim().toLowerCase();
  const filtered = stocks.filter((stock) => {
    const haystack = `${stock.symbol} ${stock.company} ${stock.theme}`.toLowerCase();
    const themeMatch = activeTheme === "all" || stock.theme === activeTheme;
    return themeMatch && haystack.includes(query);
  });

  grid.innerHTML = sortStocks(filtered)
    .map((stock) => {
      const tabKey = getActiveTab(stock);
      const fullChartUrl = tradingviewSymbolUrl(stock);
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
              <span class="rank">#${stock.rank}</span>
              <h2>${stock.symbol}</h2>
              <p>${stock.company}</p>
            </div>
            <div class="card-badges">
              <span class="theme ${themeClass(stock.theme)}">${stock.theme}</span>
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
setInterval(renderTime, 1000);
renderStocks();
