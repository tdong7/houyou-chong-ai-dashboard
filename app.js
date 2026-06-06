const stocks = [
  {
    rank: 1,
    symbol: "BNAI",
    exchange: "NASDAQ",
    company: "Brand Engagement Network",
    ytd: 2197.26,
    theme: "AI platform",
    info: "Conversational AI agents and enterprise engagement workflows.",
  },
  {
    rank: 2,
    symbol: "STRC",
    exchange: "NASDAQ",
    company: "Sarcos Technology and Robotics",
    ytd: 951.54,
    theme: "Robotics",
    info: "Robotics systems and autonomy technology with industrial AI relevance.",
  },
  {
    rank: 3,
    symbol: "WATT",
    exchange: "NASDAQ",
    company: "Energous",
    ytd: 467.73,
    theme: "Compute",
    info: "Wireless power and sensing technology adjacent to connected AI devices.",
  },
  {
    rank: 4,
    symbol: "HSCS",
    exchange: "NASDAQ",
    company: "HeartSciences",
    ytd: 416.46,
    theme: "AI platform",
    info: "AI-assisted ECG and cardiac screening technology.",
  },
  {
    rank: 5,
    symbol: "KSCP",
    exchange: "NASDAQ",
    company: "Knightscope",
    ytd: 324.53,
    theme: "Robotics",
    info: "Autonomous security robots and AI-enabled monitoring systems.",
  },
  {
    rank: 6,
    symbol: "CRNC",
    exchange: "NASDAQ",
    company: "Cerence",
    ytd: 237.09,
    theme: "AI platform",
    info: "Automotive voice assistants and embedded generative AI experiences.",
  },
  {
    rank: 7,
    symbol: "CSAI",
    exchange: "NASDAQ",
    company: "Cloudastructure",
    ytd: 213.2,
    theme: "AI platform",
    info: "Cloud video surveillance and AI computer-vision analytics.",
  },
  {
    rank: 8,
    symbol: "MYO",
    exchange: "AMEX",
    company: "Myomo",
    ytd: 202.23,
    theme: "Robotics",
    info: "Wearable robotic orthotics using sensor-driven assistive motion.",
  },
  {
    rank: 9,
    symbol: "PHUN",
    exchange: "NASDAQ",
    company: "Phunware",
    ytd: 195.8,
    theme: "AI platform",
    info: "Mobile cloud software with AI personalization and data products.",
  },
  {
    rank: 10,
    symbol: "QBTS",
    exchange: "NYSE",
    company: "D-Wave Quantum",
    ytd: 186.9,
    theme: "Quantum",
    info: "Quantum computing systems used for optimization and AI research workloads.",
  },
  {
    rank: 11,
    symbol: "RVSN",
    exchange: "NASDAQ",
    company: "Rail Vision",
    ytd: 177.49,
    theme: "Robotics",
    info: "AI-based railway safety, object detection, and machine-vision systems.",
  },
  {
    rank: 12,
    symbol: "TSSI",
    exchange: "NASDAQ",
    company: "TSS",
    ytd: 160.73,
    theme: "Compute",
    info: "Data-center integration and deployment services for AI infrastructure.",
  },
  {
    rank: 13,
    symbol: "RGTI",
    exchange: "NASDAQ",
    company: "Rigetti Computing",
    ytd: 154.4,
    theme: "Quantum",
    info: "Quantum processors and cloud quantum services for advanced compute.",
  },
  {
    rank: 14,
    symbol: "SOUN",
    exchange: "NASDAQ",
    company: "SoundHound AI",
    ytd: 153.84,
    theme: "AI platform",
    info: "Voice AI, speech recognition, and conversational intelligence.",
  },
  {
    rank: 15,
    symbol: "OUST",
    exchange: "NYSE",
    company: "Ouster",
    ytd: 151.2,
    theme: "Robotics",
    info: "Digital lidar for autonomy, robotics, smart infrastructure, and mapping.",
  },
  {
    rank: 16,
    symbol: "AEVA",
    exchange: "NYSE",
    company: "Aeva Technologies",
    ytd: 148.5,
    theme: "Robotics",
    info: "4D lidar and perception hardware for autonomous systems.",
  },
  {
    rank: 17,
    symbol: "SMR",
    exchange: "NYSE",
    company: "NuScale Power",
    ytd: 140.85,
    theme: "Compute",
    info: "Small modular nuclear power, a key theme for AI data-center energy demand.",
  },
  {
    rank: 18,
    symbol: "LITE",
    exchange: "NASDAQ",
    company: "Lumentum",
    ytd: 137.15,
    theme: "Compute",
    info: "Optical components and photonics used in high-speed AI networking.",
  },
  {
    rank: 19,
    symbol: "WDC",
    exchange: "NASDAQ",
    company: "Western Digital",
    ytd: 137.1,
    theme: "Compute",
    info: "Storage hardware for data-heavy AI training, inference, and cloud systems.",
  },
  {
    rank: 20,
    symbol: "AAOI",
    exchange: "NASDAQ",
    company: "Applied Optoelectronics",
    ytd: 134.51,
    theme: "Compute",
    info: "Optical transceivers and datacenter connectivity for AI clusters.",
  },
];

const grid = document.querySelector("#stock-grid");
const search = document.querySelector("#stock-search");
const themeButtons = document.querySelectorAll("[data-theme]");
let activeTheme = "all";
const timeFormatter = new Intl.DateTimeFormat(undefined, {
  year: "numeric",
  month: "short",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  timeZoneName: "short",
});

function formatPercent(value) {
  return `${value.toLocaleString(undefined, { maximumFractionDigits: 2 })}%`;
}

function getMedianYtd() {
  const sortedYtd = stocks.map((stock) => stock.ytd).sort((a, b) => a - b);
  return (sortedYtd[9] + sortedYtd[10]) / 2;
}

function formatPointDelta(value) {
  const sign = value >= 0 ? "+" : "";
  return `${sign}${value.toLocaleString(undefined, { maximumFractionDigits: 2 })} pts`;
}

function getThemePeerCount(theme) {
  return stocks.filter((stock) => stock.theme === theme).length;
}

function renderSummary() {
  document.querySelector("#highest-ytd").textContent = `${stocks[0].symbol} ${formatPercent(stocks[0].ytd)}`;
  document.querySelector("#median-ytd").textContent = formatPercent(getMedianYtd());
}

function renderSourceTime() {
  document.querySelector("#source-time").textContent = timeFormatter.format(new Date());
}

function getFullChartUrl(stock) {
  const widgetSymbol = encodeURIComponent(`${stock.exchange}:${stock.symbol}`);
  return `https://www.tradingview.com/symbols/${stock.exchange}-${stock.symbol}/?timeframe=1M&tvwidgetsymbol=${widgetSymbol}`;
}

function createMetric(label, value, tone = "") {
  return `
    <div class="metric ${tone}">
      <dt>${label}</dt>
      <dd>${value}</dd>
    </div>
  `;
}

function renderStockInsights(stock) {
  const medianYtd = getMedianYtd();
  const themePeers = getThemePeerCount(stock.theme);
  const rankPercentile = Math.ceil((stock.rank / stocks.length) * 100);

  return `
    <section class="insights" aria-label="${stock.symbol} key stats">
      <div class="insight-section">
        <h3>Key stats</h3>
        <dl class="metric-grid">
          ${createMetric("YTD momentum", formatPercent(stock.ytd), "positive")}
          ${createMetric("Momentum rank", `#${stock.rank} / ${stocks.length}`)}
          ${createMetric("Rank percentile", `Top ${rankPercentile}%`)}
          ${createMetric("Above +100%", formatPointDelta(stock.ytd - 100), "positive")}
          ${createMetric("Vs median", formatPointDelta(stock.ytd - medianYtd), stock.ytd >= medianYtd ? "positive" : "negative")}
          ${createMetric("Theme peers", `${themePeers} / ${stocks.length}`)}
          ${createMetric("Chart window", "1 month")}
          ${createMetric("Hover readout", "Price + %")}
        </dl>
      </div>
    </section>
  `;
}

function createTradingViewWidget(container, stock) {
  container.innerHTML = "";
  const chartPanel = document.createElement("div");
  chartPanel.className = "chart-panel";

  const chartTop = document.createElement("div");
  chartTop.className = "chart-top";
  chartTop.innerHTML = `
    <div class="chart-tabs" aria-label="${stock.symbol} chart sections">
      <span class="active">Overview</span>
      <span>Financials</span>
      <span>News</span>
      <span>Technicals</span>
    </div>
    <div class="chart-actions">
      <span>Hover for price + %</span>
      <a href="${getFullChartUrl(stock)}" target="_blank" rel="noopener noreferrer">Full chart</a>
    </div>
  `;

  const chartBox = document.createElement("div");
  chartBox.className = "chart-box tradingview-widget-container";

  const widget = document.createElement("div");
  widget.className = "tradingview-widget-container__widget";

  const copyright = document.createElement("div");
  copyright.className = "tradingview-widget-copyright";
  copyright.innerHTML = `<a href="${getFullChartUrl(stock)}" rel="noopener nofollow" target="_blank">${stock.symbol} full chart</a>`;

  const script = document.createElement("script");
  script.src = "https://s3.tradingview.com/external-embedding/embed-widget-symbol-overview.js";
  script.async = true;
  script.textContent = JSON.stringify({
    lineWidth: 2,
    lineType: 0,
    chartType: "area",
    fontColor: "rgb(74, 78, 89)",
    gridLineColor: "rgba(46, 46, 46, 0.06)",
    backgroundColor: "#ffffff",
    widgetFontColor: "#111111",
    upColor: "#22ab94",
    downColor: "#f7525f",
    borderUpColor: "#22ab94",
    borderDownColor: "#f7525f",
    wickUpColor: "#22ab94",
    wickDownColor: "#f7525f",
    colorTheme: "light",
    isTransparent: false,
    locale: "en",
    chartOnly: true,
    scalePosition: "right",
    scaleMode: "Normal",
    fontFamily: "-apple-system, BlinkMacSystemFont, Trebuchet MS, Roboto, Ubuntu, sans-serif",
    valuesTracking: "1",
    changeMode: "price-and-percent",
    symbols: [[stock.symbol, `${stock.exchange}:${stock.symbol}|30`]],
    dateRanges: ["1d|1", "5d|5", "1m|30", "6m|120", "ytd|1D", "12m|1D", "60m|1W", "120m|1W", "all|1M"],
    fontSize: "12",
    width: "100%",
    height: "100%",
    autosize: true,
    noTimeScale: false,
    hideDateRanges: false,
    hideMarketStatus: true,
    hideSymbolLogo: true,
    showVolume: false,
    showMA: false,
  });

  chartBox.append(widget, copyright, script);
  chartPanel.append(chartTop, chartBox);
  chartPanel.insertAdjacentHTML("beforeend", renderStockInsights(stock));
  container.append(chartPanel);
}

function renderStocks() {
  const query = search.value.trim().toLowerCase();
  const filtered = stocks.filter((stock) => {
    const matchesTheme = activeTheme === "all" || stock.theme === activeTheme;
    const haystack = `${stock.symbol} ${stock.company} ${stock.theme} ${stock.info}`.toLowerCase();
    return matchesTheme && haystack.includes(query);
  });

  grid.innerHTML = filtered
    .map(
      (stock) => `
        <article class="stock-card" data-symbol="${stock.symbol}">
          <div class="card-topline">
            <span class="rank">#${stock.rank}</span>
            <span class="theme">${stock.theme}</span>
          </div>
          <div class="stock-heading">
            <div>
              <h2>${stock.symbol}</h2>
              <p>${stock.company}</p>
            </div>
            <div class="card-actions">
              <strong class="gain">${formatPercent(stock.ytd)}</strong>
            </div>
          </div>
          <div class="chart-shell" aria-label="${stock.symbol} live stock chart"></div>
          <dl class="facts">
            <div>
              <dt>YTD</dt>
              <dd>${formatPercent(stock.ytd)}</dd>
            </div>
            <div>
              <dt>Market</dt>
              <dd>${stock.exchange}</dd>
            </div>
            <div>
              <dt>Signal</dt>
              <dd>${stock.theme}</dd>
            </div>
          </dl>
          <p class="description">${stock.info}</p>
        </article>
      `
    )
    .join("");

  document.querySelectorAll(".chart-shell").forEach((container) => {
    const stock = stocks.find((item) => item.symbol === container.closest(".stock-card").dataset.symbol);
    createTradingViewWidget(container, stock);
  });
}

themeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activeTheme = button.dataset.theme;
    themeButtons.forEach((item) => item.classList.toggle("active", item === button));
    renderStocks();
  });
});

search.addEventListener("input", renderStocks);

renderSummary();
renderSourceTime();
setInterval(renderSourceTime, 1000);
renderStocks();
