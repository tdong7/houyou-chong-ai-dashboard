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

function makeSeries(stock) {
  const random = seededNoise(stock.symbol.split("").reduce((sum, char) => sum + char.charCodeAt(0), 0) * 97);
  const count = 58;
  const slope = Math.min(stock.ytd / 460, 6.8);
  let current = 24 + random() * 12;
  const values = [];

  for (let index = 0; index < count; index += 1) {
    const wave = Math.sin(index / 4.3) * 1.5 + Math.cos(index / 7.2) * 1.1;
    const shock = (random() - 0.42) * (3.1 + slope * 0.28);
    current += slope * 0.18 + wave * 0.12 + shock;

    if (index === 18 || index === 35) current -= random() * 4.5;
    if (index === 26 || index === 48) current += random() * 4.8;

    values.push(Math.max(3, current));
  }

  return values;
}

function linePath(points) {
  return points.map((point, index) => `${index === 0 ? "M" : "L"}${point.x.toFixed(2)},${point.y.toFixed(2)}`).join(" ");
}

function renderSparkline(stock) {
  const width = 280;
  const height = 90;
  const pad = { top: 8, right: 34, bottom: 18, left: 8 };
  const values = makeSeries(stock);
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
      <svg viewBox="0 0 ${width} ${height}" role="img" aria-label="${stock.symbol} one month price sparkline">
        <defs>
          <linearGradient id="fill-${stock.symbol}" x1="0" x2="0" y1="0" y2="1">
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
        <path d="${areaPath}" fill="url(#fill-${stock.symbol})" />
        <path class="spark-line" d="${path}" />
        <circle class="last-dot" cx="${latest.x.toFixed(2)}" cy="${latest.y.toFixed(2)}" r="2.2" />
        <g class="axis">
          <text x="258" y="20">${Math.round(stock.price * 1.18)}</text>
          <text x="258" y="70">0</text>
          <text x="18" y="84">Jan</text>
          <text x="116" y="84">Mar</text>
          <text x="216" y="84">May</text>
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
    .map(
      (stock) => `
        <article class="stock-card">
          <div class="card-head">
            <div>
              <span class="rank">#${stock.rank}</span>
              <h2>${stock.symbol}</h2>
              <p>${stock.company}</p>
            </div>
            <span class="theme ${themeClass(stock.theme)}">${stock.theme}</span>
          </div>
          <div class="quote-row">
            <span>${formatPrice(stock.price)}</span>
            <strong>+${formatPercent(stock.ytd)}</strong>
          </div>
          ${renderSparkline(stock)}
          <dl class="stats-row">
            <div><dt>1M</dt><dd>+${formatPercent(stock.m1)}</dd></div>
            <div><dt>3M</dt><dd>+${formatPercent(stock.m3)}</dd></div>
            <div><dt>Mkt Cap</dt><dd>$${stock.cap}</dd></div>
            <div><dt>Mom. Score</dt><dd>${stock.score}</dd></div>
          </dl>
        </article>
      `
    )
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

renderSummary();
renderTime();
setInterval(renderTime, 1000);
renderStocks();
