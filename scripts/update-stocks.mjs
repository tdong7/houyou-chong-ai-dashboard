import { readFile, writeFile } from "node:fs/promises";

const APP_PATH = new URL("../app.js", import.meta.url);
const INDEX_PATH = new URL("../index.html", import.meta.url);
const TRADINGVIEW_SCANNER_URL = "https://scanner.tradingview.com/america/scan";
const ET_TIME_ZONE = "America/New_York";
const MINIMUM_YTD = 100;
const TOP_COUNT = 20;

const AI_STOCK_UNIVERSE = [
  { symbol: "BNAI", exchange: "NASDAQ", theme: "AI platform" },
  { symbol: "WATT", exchange: "NASDAQ", theme: "Compute" },
  { symbol: "SNDK", exchange: "NASDAQ", theme: "Compute" },
  { symbol: "AXTI", exchange: "NASDAQ", theme: "Compute" },
  { symbol: "AAOI", exchange: "NASDAQ", theme: "Optical" },
  { symbol: "AEHR", exchange: "NASDAQ", theme: "Compute" },
  { symbol: "MXL", exchange: "NASDAQ", theme: "Compute" },
  { symbol: "OPTX", exchange: "NASDAQ", theme: "Optical" },
  { symbol: "DOCN", exchange: "NYSE", theme: "AI platform" },
  { symbol: "NVTS", exchange: "NASDAQ", theme: "Compute" },
  { symbol: "QUIK", exchange: "NASDAQ", theme: "Compute" },
  { symbol: "DELL", exchange: "NYSE", theme: "Compute" },
  { symbol: "WOLF", exchange: "NYSE", theme: "Compute" },
  { symbol: "ARM", exchange: "NASDAQ", theme: "Compute" },
  { symbol: "MRVL", exchange: "NASDAQ", theme: "Compute" },
  { symbol: "VPG", exchange: "NYSE", theme: "Compute" },
  { symbol: "PENG", exchange: "NASDAQ", theme: "Compute" },
  { symbol: "STX", exchange: "NASDAQ", theme: "Compute" },
  { symbol: "MU", exchange: "NASDAQ", theme: "Compute" },
  { symbol: "WDC", exchange: "NASDAQ", theme: "Compute" },
  { symbol: "NVDA", exchange: "NASDAQ", theme: "Compute" },
  { symbol: "SMCI", exchange: "NASDAQ", theme: "Compute" },
  { symbol: "PLTR", exchange: "NASDAQ", theme: "AI platform" },
  { symbol: "AVGO", exchange: "NASDAQ", theme: "Compute" },
  { symbol: "AMD", exchange: "NASDAQ", theme: "Compute" },
  { symbol: "APP", exchange: "NASDAQ", theme: "AI platform" },
  { symbol: "IONQ", exchange: "NYSE", theme: "Quantum" },
  { symbol: "CRWD", exchange: "NASDAQ", theme: "AI platform" },
  { symbol: "SNOW", exchange: "NYSE", theme: "AI platform" },
  { symbol: "COHR", exchange: "NYSE", theme: "Optical" },
  { symbol: "LRCX", exchange: "NASDAQ", theme: "Compute" },
  { symbol: "MELI", exchange: "NASDAQ", theme: "AI platform" },
  { symbol: "PATH", exchange: "NYSE", theme: "AI platform" },
  { symbol: "RKLB", exchange: "NASDAQ", theme: "Robotics" },
  { symbol: "TEM", exchange: "NASDAQ", theme: "AI platform" },
  { symbol: "HUBS", exchange: "NYSE", theme: "AI platform" },
  { symbol: "ALAB", exchange: "NASDAQ", theme: "Compute" },
  { symbol: "TTD", exchange: "NASDAQ", theme: "AI platform" },
  { symbol: "QBTS", exchange: "NYSE", theme: "Quantum" },
  { symbol: "RGTI", exchange: "NASDAQ", theme: "Quantum" },
  { symbol: "QUBT", exchange: "NASDAQ", theme: "Quantum" },
  { symbol: "ARQQ", exchange: "NASDAQ", theme: "Quantum" },
  { symbol: "AI", exchange: "NYSE", theme: "AI platform" },
  { symbol: "SOUN", exchange: "NASDAQ", theme: "AI platform" },
  { symbol: "BBAI", exchange: "NYSE", theme: "AI platform" },
  { symbol: "UPST", exchange: "NASDAQ", theme: "AI platform" },
  { symbol: "APLD", exchange: "NASDAQ", theme: "Compute" },
  { symbol: "IREN", exchange: "NASDAQ", theme: "Compute" },
  { symbol: "CIFR", exchange: "NASDAQ", theme: "Compute" },
  { symbol: "CORZ", exchange: "NASDAQ", theme: "Compute" },
  { symbol: "VRT", exchange: "NYSE", theme: "Compute" },
  { symbol: "CEG", exchange: "NASDAQ", theme: "Compute" },
  { symbol: "ETN", exchange: "NYSE", theme: "Compute" },
  { symbol: "ANET", exchange: "NYSE", theme: "Compute" },
  { symbol: "CLS", exchange: "NYSE", theme: "Compute" },
  { symbol: "CRDO", exchange: "NASDAQ", theme: "Compute" },
  { symbol: "LITE", exchange: "NASDAQ", theme: "Optical" },
  { symbol: "CIEN", exchange: "NYSE", theme: "Optical" },
  { symbol: "NXT", exchange: "NASDAQ", theme: "Compute" },
  { symbol: "ONTO", exchange: "NYSE", theme: "Compute" },
  { symbol: "KLAC", exchange: "NASDAQ", theme: "Compute" },
  { symbol: "AMAT", exchange: "NASDAQ", theme: "Compute" },
  { symbol: "TER", exchange: "NASDAQ", theme: "Compute" },
  { symbol: "MPWR", exchange: "NASDAQ", theme: "Compute" },
  { symbol: "LSCC", exchange: "NASDAQ", theme: "Compute" },
  { symbol: "QCOM", exchange: "NASDAQ", theme: "Compute" },
  { symbol: "TXN", exchange: "NASDAQ", theme: "Compute" },
  { symbol: "INTC", exchange: "NASDAQ", theme: "Compute" },
  { symbol: "TSM", exchange: "NYSE", theme: "Compute" },
  { symbol: "ASML", exchange: "NASDAQ", theme: "Compute" },
  { symbol: "ORCL", exchange: "NYSE", theme: "AI platform" },
  { symbol: "MSFT", exchange: "NASDAQ", theme: "AI platform" },
  { symbol: "GOOGL", exchange: "NASDAQ", theme: "AI platform" },
  { symbol: "META", exchange: "NASDAQ", theme: "AI platform" },
  { symbol: "AMZN", exchange: "NASDAQ", theme: "AI platform" },
  { symbol: "IBM", exchange: "NYSE", theme: "AI platform" },
  { symbol: "CRM", exchange: "NYSE", theme: "AI platform" },
  { symbol: "NOW", exchange: "NYSE", theme: "AI platform" },
  { symbol: "ADBE", exchange: "NASDAQ", theme: "AI platform" },
  { symbol: "TWLO", exchange: "NYSE", theme: "AI platform" },
  { symbol: "DDOG", exchange: "NASDAQ", theme: "AI platform" },
  { symbol: "NET", exchange: "NYSE", theme: "AI platform" },
  { symbol: "ESTC", exchange: "NYSE", theme: "AI platform" },
  { symbol: "GTLB", exchange: "NASDAQ", theme: "AI platform" },
  { symbol: "FROG", exchange: "NASDAQ", theme: "AI platform" },
  { symbol: "ROK", exchange: "NYSE", theme: "Robotics" },
  { symbol: "ISRG", exchange: "NASDAQ", theme: "Robotics" },
  { symbol: "SYM", exchange: "NASDAQ", theme: "Robotics" },
  { symbol: "MBLY", exchange: "NASDAQ", theme: "Robotics" },
  { symbol: "OUST", exchange: "NASDAQ", theme: "Robotics" },
  { symbol: "AEVA", exchange: "NASDAQ", theme: "Robotics" },
  { symbol: "SERV", exchange: "NASDAQ", theme: "Robotics" },
];

const scannerColumns = ["name", "description", "close", "Perf.YTD", "Perf.1M", "Perf.3M", "market_cap_basic"];

function number(value, digits = 2) {
  return Number(value.toFixed(digits));
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
  if (!unit) return String(Math.round(value));
  return `${number(value / unit.limit, 1)}${unit.suffix}`;
}

function easternParts(date = new Date()) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: ET_TIME_ZONE,
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(date);

  return Object.fromEntries(parts.map((part) => [part.type, part.value]));
}

function isScheduledTradingWindow(date = new Date()) {
  const parts = easternParts(date);
  if (["Sat", "Sun"].includes(parts.weekday)) return false;

  const hour = Number(parts.hour);
  const minute = Number(parts.minute);
  const morningWindow = hour === 9 && minute >= 30;
  const morningGrace = hour === 10 && minute < 30;
  const afternoonWindow = hour === 15 && minute >= 30;

  return morningWindow || morningGrace || afternoonWindow;
}

async function fetchTradingViewRows() {
  const response = await fetch(TRADINGVIEW_SCANNER_URL, {
    method: "POST",
    headers: { "content-type": "text/plain;charset=UTF-8" },
    body: JSON.stringify({
      symbols: {
        tickers: AI_STOCK_UNIVERSE.map((stock) => `${stock.exchange}:${stock.symbol}`),
        query: { types: [] },
      },
      columns: scannerColumns,
    }),
  });

  if (!response.ok) throw new Error(`TradingView scanner returned ${response.status}`);

  const payload = await response.json();
  const rows = new Map();
  for (const row of payload.data || []) {
    const [symbol, description, price, scannerYtd, m1, m3, marketCap] = row.d || [];
    if (!symbol || !Number.isFinite(price)) continue;
    rows.set(symbol, { symbol, description, price, scannerYtd, m1, m3, marketCap });
  }
  return rows;
}

async function fetchYtdBaseline(symbol, now = new Date()) {
  const year = Number(new Intl.DateTimeFormat("en-US", { timeZone: ET_TIME_ZONE, year: "numeric" }).format(now));
  const period1 = Math.floor(Date.UTC(year, 0, 1) / 1000);
  const period2 = Math.floor((now.getTime() + 24 * 60 * 60 * 1000) / 1000);
  const url = `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}?period1=${period1}&period2=${period2}&interval=1d&events=history`;
  const response = await fetch(url, { headers: { "user-agent": "Mozilla/5.0" } });

  if (!response.ok) throw new Error(`Yahoo chart returned ${response.status} for ${symbol}`);

  const payload = await response.json();
  const closes = payload.chart?.result?.[0]?.indicators?.quote?.[0]?.close || [];
  return closes.find((close) => Number.isFinite(close));
}

async function buildRankedStocks() {
  const scannerRows = await fetchTradingViewRows();
  const candidates = [];

  for (const universeStock of AI_STOCK_UNIVERSE) {
    const row = scannerRows.get(universeStock.symbol);
    if (!row) continue;

    try {
      const ytdBase = await fetchYtdBaseline(universeStock.symbol);
      const ytd = ((row.price / ytdBase) - 1) * 100;
      if (!Number.isFinite(ytd) || ytd < MINIMUM_YTD) continue;

      candidates.push({
        symbol: universeStock.symbol,
        exchange: universeStock.exchange,
        company: row.description || universeStock.symbol,
        price: number(row.price, 2),
        ytdBase: number(ytdBase, 4),
        ytd: number(ytd, 2),
        m1: Number.isFinite(row.m1) ? number(row.m1, 2) : 0,
        m3: Number.isFinite(row.m3) ? number(row.m3, 2) : 0,
        cap: formatMarketCap(row.marketCap),
        theme: universeStock.theme,
      });
    } catch (error) {
      console.warn(`Skipping ${universeStock.symbol}: ${error.message}`);
    }
  }

  const ranked = candidates.sort((a, b) => b.ytd - a.ytd).slice(0, TOP_COUNT);
  if (ranked.length < TOP_COUNT) {
    throw new Error(`Only found ${ranked.length} AI stocks above ${MINIMUM_YTD}% YTD`);
  }

  return ranked.map((stock, index) => ({
    rank: index + 1,
    ...stock,
    score: TOP_COUNT + 78 - index,
  }));
}

function quote(value) {
  return JSON.stringify(value);
}

function stockLiteral(stock) {
  return `  { rank: ${stock.rank}, symbol: ${quote(stock.symbol)}, exchange: ${quote(stock.exchange)}, company: ${quote(stock.company)}, price: ${stock.price}, ytdBase: ${stock.ytdBase}, ytd: ${stock.ytd}, m1: ${stock.m1}, m3: ${stock.m3}, cap: ${quote(stock.cap)}, theme: ${quote(stock.theme)}, score: ${stock.score} }`;
}

async function updateAppStocks(stocks, updatedAt = new Date()) {
  const appSource = await readFile(APP_PATH, "utf8");
  const nextBlock = `const stocks = [\n${stocks.map(stockLiteral).join(",\n")},\n];`;
  const nextTimestamp = `const stockListUpdatedAt = ${quote(updatedAt.toISOString())};`;
  const currentBlockPattern = /const stocks = \[[\s\S]*?\n\];/;
  const currentTimestampPattern = /const stockListUpdatedAt = "[^"]+";/;
  if (!currentBlockPattern.test(appSource)) throw new Error("Could not find stock block in app.js");
  if (!currentTimestampPattern.test(appSource)) throw new Error("Could not find stock list timestamp in app.js");

  const nextAppSource = appSource.replace(currentBlockPattern, nextBlock).replace(currentTimestampPattern, nextTimestamp);
  if (nextAppSource !== appSource) {
    await writeFile(APP_PATH, nextAppSource);
    await bumpScriptVersion();
  }
}

async function bumpScriptVersion() {
  const indexSource = await readFile(INDEX_PATH, "utf8");
  const stamp = new Date().toISOString().replace(/\D/g, "").slice(0, 12);
  const nextIndexSource = indexSource.replace(/app\.js\?v=[^"]+/, `app.js?v=${stamp}`);
  if (nextIndexSource !== indexSource) await writeFile(INDEX_PATH, nextIndexSource);
}

async function main() {
  if (process.argv.includes("--market-window") && !isScheduledTradingWindow()) {
    console.log("Outside the 9:30 ET or 15:30 ET trading-hour update windows; skipping.");
    return;
  }

  const stocks = await buildRankedStocks();
  await updateAppStocks(stocks);
  console.log(`Updated top ${stocks.length} AI stocks. Highest YTD: ${stocks[0].symbol} ${stocks[0].ytd}%`);
}

await main();
