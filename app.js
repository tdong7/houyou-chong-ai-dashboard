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
const activeRanges = new Map();

const exchangeOverrides = {
  AEVA: "NYSE",
  MYO: "NYSEAMERICAN",
  OUST: "NYSE",
  SMR: "NYSE",
};

const timeRanges = [
  { key: "1D", label: "1D", name: "1 day", tradingView: "1D", miniRange: "1D" },
  { key: "5D", label: "5D", name: "5 days", tradingView: "5D", miniRange: "5D" },
  { key: "1M", label: "1M", name: "1 month", tradingView: "1M", miniRange: "1M" },
  { key: "6M", label: "6M", name: "6 months", tradingView: "6M", miniRange: "6M" },
  { key: "YTD", label: "YTD", name: "Year to date", tradingView: "YTD", miniRange: "YTD" },
  { key: "1Y", label: "1Y", name: "1 year", tradingView: "1Y", miniRange: "12M" },
  { key: "5Y", label: "5Y", name: "5 years", tradingView: "5Y", miniRange: "60M" },
  { key: "ALL", label: "ALL", name: "All time", tradingView: "ALL", miniRange: "ALL" },
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

function escapeAttribute(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function median(values) {
  const sorted = [...values].sort((a, b) => a - b);
  const midpoint = Math.floor(sorted.length / 2);
  return (sorted[midpoint - 1] + sorted[midpoint]) / 2;
}

function getRange(key) {
  return timeRanges.find((range) => range.key === key) || timeRanges[2];
}

function getStockRangeKey(stock) {
  return activeRanges.get(stock.symbol) || "1M";
}

function tradingviewSymbol(stock) {
  const exchange = exchangeOverrides[stock.symbol] || "NASDAQ";
  return `${exchange}:${stock.symbol}`;
}

function tradingviewSymbolUrl(stock, key) {
  const range = getRange(key);
  const symbol = tradingviewSymbol(stock);
  const symbolPath = symbol.replace(":", "-");
  const widgetSymbol = encodeURIComponent(symbol);
  return `https://www.tradingview.com/symbols/${symbolPath}/?timeframe=${range.tradingView}&tvwidgetsymbol=${widgetSymbol}`;
}

function hydrateTradingViewCharts() {
  document.querySelectorAll(".tv-live-chart").forEach((container) => {
    const range = getRange(container.dataset.range);
    const fullChartUrl = container.dataset.fullChartUrl;
    const widgetShell = document.createElement("div");
    const widgetMount = document.createElement("div");
    const script = document.createElement("script");

    widgetShell.className = "tradingview-widget-container";
    widgetMount.className = "tradingview-widget-container__widget";
    script.type = "text/javascript";
    script.async = true;
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-mini-symbol-overview.js";
    script.text = JSON.stringify(
      {
        symbol: container.dataset.tvSymbol,
        chartOnly: false,
        dateRange: range.miniRange,
        noTimeScale: false,
        colorTheme: "dark",
        isTransparent: false,
        locale: "en",
        width: "100%",
        autosize: true,
        height: "100%",
        largeChartUrl: fullChartUrl,
      },
      null,
      2
    );

    widgetShell.append(widgetMount, script);
    container.replaceChildren(widgetShell);
  });
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
      const rangeKey = getStockRangeKey(stock);
      const fullChartUrl = tradingviewSymbolUrl(stock, rangeKey);
      const rangeButtons = timeRanges
        .map(
          (range) => `
            <button
              type="button"
              class="${range.key === rangeKey ? "active" : ""}"
              data-symbol="${stock.symbol}"
              data-range="${range.key}"
              aria-pressed="${range.key === rangeKey}"
              title="${range.name}"
            >${range.label}</button>
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
          <div class="momentum-row">
            <span>YTD gain</span>
            <strong>+${formatPercent(stock.ytd)}</strong>
          </div>
          <div
            class="tv-live-chart"
            data-tv-symbol="${tradingviewSymbol(stock)}"
            data-range="${rangeKey}"
            data-full-chart-url="${escapeAttribute(fullChartUrl)}"
          >
            <span>Loading live TradingView quote...</span>
          </div>
          <div class="range-strip" role="group" aria-label="${stock.symbol} chart range">
            ${rangeButtons}
          </div>
          <dl class="stats-row">
            <div><dt>1M</dt><dd>+${formatPercent(stock.m1)}</dd></div>
            <div><dt>3M</dt><dd>+${formatPercent(stock.m3)}</dd></div>
            <div><dt>Mkt Cap</dt><dd>$${stock.cap}</dd></div>
            <div><dt>Mom. Score</dt><dd>${stock.score}</dd></div>
          </dl>
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
  const rangeButton = event.target.closest("[data-range]");
  if (!rangeButton) return;

  activeRanges.set(rangeButton.dataset.symbol, rangeButton.dataset.range);
  renderStocks();
});

renderSummary();
renderTime();
setInterval(renderTime, 1000);
renderStocks();
