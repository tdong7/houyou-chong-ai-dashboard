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

function number(value, digits = 2) {
  return Number(value.toFixed(digits));
}

function performanceValue(value) {
  return Number.isFinite(value) ? number(value, 2) : null;
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

async function scheduledCron() {
  if (!process.env.GITHUB_EVENT_PATH) return "";

  try {
    const event = JSON.parse(await readFile(process.env.GITHUB_EVENT_PATH, "utf8"));
    return event.schedule || "";
  } catch (error) {
    console.warn(`Could not read GitHub schedule event: ${error.message}`);
    return "";
  }
}

function parseCronMinuteHour(cron) {
  const [minute, hour] = cron.trim().split(/\s+/);
  const parsedMinute = Number(minute);
  const parsedHour = Number(hour);
  if (!Number.isInteger(parsedMinute) || !Number.isInteger(parsedHour)) return null;
  return { minute: parsedMinute, hour: parsedHour };
}

function isScheduledUpdateSlot(cron, date = new Date()) {
  if (!cron) return true;

  const cronTime = parseCronMinuteHour(cron);
  if (!cronTime) return false;

  const scheduledUtc = new Date(Date.UTC(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate(),
    cronTime.hour,
    cronTime.minute
  ));
  const parts = easternParts(scheduledUtc);
  const easternHour = Number(parts.hour);
  const easternMinute = Number(parts.minute);

  return easternMinute === 30 && (easternHour === 9 || easternHour === 15);
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
    const [symbol, description, price, d1, d5, m1, m3, m6, ytd, y1, y5, y10, all, marketCap] = row.d || [];
    if (!symbol || !Number.isFinite(price)) continue;
    rows.set(symbol, {
      symbol,
      description,
      price,
      performance: {
        "1D": performanceValue(d1),
        "5D": performanceValue(d5),
        "1M": performanceValue(m1),
        "3M": performanceValue(m3),
        "6M": performanceValue(m6),
        YTD: performanceValue(ytd),
        "1Y": performanceValue(y1),
        "5Y": performanceValue(y5),
        "10Y": performanceValue(y10),
        ALL: performanceValue(all),
      },
      marketCap,
    });
  }
  return rows;
}

async function buildRankedStocks() {
  const scannerRows = await fetchTradingViewRows();
  const candidates = [];

  for (const universeStock of AI_STOCK_UNIVERSE) {
    const row = scannerRows.get(universeStock.symbol);
    if (!row) continue;

    const ytd = row.performance.YTD;
    if (!Number.isFinite(ytd) || ytd < MINIMUM_YTD) continue;

    candidates.push({
      symbol: universeStock.symbol,
      exchange: universeStock.exchange,
      company: row.description || universeStock.symbol,
      price: number(row.price, 2),
      performance: row.performance,
      ytd,
      cap: formatMarketCap(row.marketCap),
      theme: universeStock.theme,
    });
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
  return `  { rank: ${stock.rank}, symbol: ${quote(stock.symbol)}, exchange: ${quote(stock.exchange)}, company: ${quote(stock.company)}, price: ${stock.price}, performance: ${quote(stock.performance)}, ytd: ${stock.ytd}, cap: ${quote(stock.cap)}, theme: ${quote(stock.theme)}, score: ${stock.score} }`;
}

async function updateAppStocks(stocks, updatedAt = new Date()) {
  const appSource = await readFile(APP_PATH, "utf8");
  const nextBlock = `const stocks = [\n${stocks.map(stockLiteral).join(",\n")},\n];`;
  const nextTimestamp = `let stockListUpdatedAt = ${quote(updatedAt.toISOString())};`;
  const currentBlockPattern = /const stocks = \[[\s\S]*?\n\];/;
  const currentTimestampPattern = /(?:const|let) stockListUpdatedAt = "[^"]+";/;
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
  const cron = await scheduledCron();
  if (process.argv.includes("--scheduled-window") && !isScheduledUpdateSlot(cron)) {
    console.log(`Skipping scheduled slot ${cron || "unknown"} because it is not 9:30 ET or 15:30 ET.`);
    return;
  }

  const stocks = await buildRankedStocks();
  await updateAppStocks(stocks);
  console.log(`Updated top ${stocks.length} AI stocks. Highest YTD: ${stocks[0].symbol} ${stocks[0].ytd}%`);
}

await main();
