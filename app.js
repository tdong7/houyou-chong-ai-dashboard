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
  { key: "1D", label: "1D", name: "1 day", points: 34, axis: ["09:30", "12:00", "16:00"], tradingView: "1D" },
  { key: "5D", label: "5D", name: "5 days", points: 44, axis: ["Mon", "Wed", "Fri"], tradingView: "5D" },
  { key: "1M", label: "1M", name: "1 month", points: 58, axis: ["May", "Mid", "Jun"], tradingView: "1M" },
  { key: "6M", label: "6M", name: "6 months", points: 64, axis: ["Jan", "Mar", "Jun"], tradingView: "6M" },
  { key: "YTD", label: "YTD", name: "Year to date", points: 72, axis: ["Jan", "Mar", "Jun"], tradingView: "YTD" },
  { key: "1Y", label: "1Y", name: "1 year", points: 78, axis: ["Jul", "Jan", "Jun"], tradingView: "1Y" },
  { key: "5Y", label: "5Y", name: "5 years", points: 88, axis: ["2022", "2024", "2026"], tradingView: "5Y" },
  { key: "ALL", label: "ALL", name: "All time", points: 96, axis: ["IPO", "2024", "Now"], tradingView: "ALL" },
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

function formatSignedPercent(value) {
  return `${value >= 0 ? "+" : ""}${formatPercent(value)}`;
}

function formatPrice(value) {
  return `$${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function median(values) {
  const sorted = [...values].sort((a, b) => a - b);
  const midpoint = Math.floor(sorted.length / 2);
  return (sorted[midpoint - 1] + sorted[midpoint]) / 2;
}

function seededNoise(seed) {
  let value = seed % 2147483647;
  return () => {
    value = (value * 48271) % 2147483647;
    return value / 2147483647;
  };
}

function getRange(key) {
  return timeRanges.find((range) => range.key === key) || timeRanges[2];
}

function getStockRangeKey(stock) {
  return activeRanges.get(stock.symbol) || "1M";
}

function rangeChange(stock, key) {
  const rankDrift = (21 - stock.rank) / 22;
  const dailyPulse = ((stock.symbol.charCodeAt(0) + stock.rank) % 7) - 3;
  const values = {
    "1D": stock.m1 * 0.08 + dailyPulse * 0.34,
    "5D": stock.m1 * 0.26 + dailyPulse * 0.72,
    "1M": stock.m1,
    "6M": Math.max(stock.m3 * 1.42, stock.ytd * 0.34),
    YTD: stock.ytd,
    "1Y": stock.ytd * 1.18 + stock.m3 * 0.36,
    "5Y": stock.ytd * 2.04 + stock.score * 2.6 + rankDrift * 70,
    ALL: stock.ytd * 2.74 + stock.score * 5.5 + rankDrift * 120,
  };

  return values[key] ?? stock.m1;
}

function tradingviewSymbolUrl(stock, key) {
  const exchange = exchangeOverrides[stock.symbol] || "NASDAQ";
  const range = getRange(key);
  const symbolPath = `${exchange}-${stock.symbol}`;
  const widgetSymbol = encodeURIComponent(`${exchange}:${stock.symbol}`);
  return `https://www.tradingview.com/symbols/${symbolPath}/?timeframe=${range.tradingView}&tvwidgetsymbol=${widgetSymbol}`;
}

function makeSeries(stock, key) {
  const range = getRange(key);
  const seed = `${stock.symbol}${range.key}`.split("").reduce((sum, char) => sum + char.charCodeAt(0), 0) * 97;
  const random = seededNoise(seed);
  const count = range.points;
  const change = rangeChange(stock, range.key);
  const start = 100;
  const end = Math.max(5, start * (1 + change / 100));
  const values = [];

  for (let index = 0; index < count; index += 1) {
    const progress = index / (count - 1);
    const trend = start + (end - start) * progress;
    const volatility = Math.max(2.2, Math.min(18, Math.abs(change) / 20));
    const wave = Math.sin(index / 3.7) * volatility + Math.cos(index / 6.5) * volatility * 0.55;
    const shock = (random() - 0.48) * volatility * 1.8;
    const eventLift = index === Math.floor(count * 0.36) || index === Math.floor(count * 0.72) ? random() * volatility * 2.6 : 0;

    if (index === 0) {
      values.push(start);
    } else if (index === count - 1) {
      values.push(end);
    } else {
      values.push(Math.max(4, trend + wave + shock + eventLift));
    }
  }

  return values;
}

function linePath(points) {
  return points.map((point, index) => `${index === 0 ? "M" : "L"}${point.x.toFixed(2)},${point.y.toFixed(2)}`).join(" ");
}

function renderSparkline(stock, key) {
  const rangeMeta = getRange(key);
  const width = 280;
  const height = 90;
  const pad = { top: 8, right: 34, bottom: 18, left: 8 };
  const values = makeSeries(stock, rangeMeta.key);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;
  const points = values.map((value, index) => ({
    value,
    price: stock.price * (value / values.at(-1)),
    change: ((value - values[0]) / values[0]) * 100,
    x: pad.left + (index / (values.length - 1)) * (width - pad.left - pad.right),
    y: pad.top + (1 - (value - min) / range) * (height - pad.top - pad.bottom),
  }));
  const path = linePath(points);
  const areaPath = `${path} L${points.at(-1).x.toFixed(2)},${height - pad.bottom} L${points[0].x.toFixed(2)},${height - pad.bottom} Z`;
  const latest = points.at(-1);

  return `
    <div class="sparkline" data-series='${JSON.stringify(points.map(({ price, change }) => [price, change]))}'>
      <svg viewBox="0 0 ${width} ${height}" role="img" aria-label="${stock.symbol} ${rangeMeta.name} price sparkline">
        <defs>
          <linearGradient id="fill-${stock.symbol}-${rangeMeta.key}" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stop-color="#24f29a" stop-opacity="0.34" />
            <stop offset="100%" stop-color="#24f29a" stop-opacity="0.02" />
          </linearGradient>
        </defs>
        <g class="grid-lines">
          <line x1="8" y1="18" x2="246" y2="18" />
          <line x1="8" y1="42" x2="246" y2="42" />
          <line x1="8" y1="66" x2="246" y2="66" />
          <line x1="70" y1="8" x2="70" y2="72" />
          <line x1="150" y1="8" x2="150" y2="72" />
        </g>
        <path d="${areaPath}" fill="url(#fill-${stock.symbol}-${rangeMeta.key})" />
        <path class="spark-line" d="${path}" />
        <circle class="last-dot" cx="${latest.x.toFixed(2)}" cy="${latest.y.toFixed(2)}" r="2.2" />
        <g class="axis">
          <text x="258" y="20">${Math.round(stock.price * (max / values.at(-1)))}</text>
          <text x="258" y="70">0</text>
          <text x="18" y="84">${rangeMeta.axis[0]}</text>
          <text x="116" y="84">${rangeMeta.axis[1]}</text>
          <text x="216" y="84">${rangeMeta.axis[2]}</text>
        </g>
      </svg>
      <div class="spark-tooltip" aria-hidden="true"></div>
    </div>
  `;
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
      const currentChange = rangeChange(stock, rangeKey);
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
              <a class="full-chart-link" href="${tradingviewSymbolUrl(stock, rangeKey)}" target="_blank" rel="noopener noreferrer">Full chart</a>
            </div>
          </div>
          <div class="quote-row">
            <span>${formatPrice(stock.price)}</span>
            <strong class="${currentChange >= 0 ? "positive" : "negative"}">${formatSignedPercent(currentChange)}</strong>
          </div>
          ${renderSparkline(stock, rangeKey)}
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

  wireSparklineTooltips();
}

function wireSparklineTooltips() {
  document.querySelectorAll(".sparkline").forEach((chart) => {
    const series = JSON.parse(chart.dataset.series);
    const tooltip = chart.querySelector(".spark-tooltip");

    chart.addEventListener("mousemove", (event) => {
      const rect = chart.getBoundingClientRect();
      const ratio = Math.min(1, Math.max(0, (event.clientX - rect.left) / rect.width));
      const index = Math.round(ratio * (series.length - 1));
      const [price, change] = series[index];
      document.querySelectorAll(".spark-tooltip.visible").forEach((visibleTooltip) => {
        if (visibleTooltip !== tooltip) visibleTooltip.classList.remove("visible");
      });
      tooltip.textContent = `${formatPrice(price)} · ${change >= 0 ? "+" : ""}${formatPercent(change)}`;
      tooltip.style.left = `${ratio * 100}%`;
      tooltip.classList.add("visible");
    });

    chart.addEventListener("mouseleave", () => {
      tooltip.classList.remove("visible");
    });
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
