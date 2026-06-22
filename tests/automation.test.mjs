import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";

const workflowPath = new URL("../.github/workflows/update-stocks.yml", import.meta.url);
const updaterPath = new URL("../scripts/update-stocks.mjs", import.meta.url);
const newsWorkflowPath = new URL("../.github/workflows/update-news.yml", import.meta.url);
const newsUpdaterPath = new URL("../scripts/update-news.mjs", import.meta.url);

assert.equal(existsSync(workflowPath), true, "Missing scheduled GitHub Action workflow");
assert.equal(existsSync(updaterPath), true, "Missing stock updater script");
assert.equal(existsSync(newsWorkflowPath), true, "Missing scheduled news workflow");
assert.equal(existsSync(newsUpdaterPath), true, "Missing news updater script");

const workflowSource = readFileSync(workflowPath, "utf8");
const updaterSource = readFileSync(updaterPath, "utf8");
const newsWorkflowSource = readFileSync(newsWorkflowPath, "utf8");
const newsUpdaterSource = readFileSync(newsUpdaterPath, "utf8");

assert.match(workflowSource, /name:\s*Update top AI stocks/, "Workflow should be named for stock updates");
for (const hour of [13, 14, 19, 20]) {
  assert.match(workflowSource, new RegExp(`30 ${hour} \\* \\* 1-5`), `Workflow should include the ${hour}:30 UTC schedule`);
}
assert.match(workflowSource, /node-version:\s*24/, "Workflow should use the same modern Node runtime used by tests");
assert.match(workflowSource, /node scripts\/update-stocks\.mjs --scheduled-window/, "Workflow should run the updater with a scheduled-slot guard");
assert.match(workflowSource, /node tests\/dashboard\.test\.mjs/, "Workflow should run dashboard tests before committing");
assert.match(workflowSource, /node tests\/automation\.test\.mjs/, "Workflow should run automation tests before committing");
assert.match(workflowSource, /git diff --quiet/, "Workflow should commit only when refreshed data changes");

assert.match(updaterSource, /America\/New_York/, "Updater should evaluate market windows in Eastern time");
assert.match(updaterSource, /scheduledCron/, "Updater should inspect the scheduled cron slot from GitHub");
assert.match(updaterSource, /isScheduledUpdateSlot/, "Updater should guard by scheduled update slot, not delayed runner start time");
assert.match(updaterSource, /TRADINGVIEW_SCANNER_URL/, "Updater should pull live market ranking data from TradingView");
for (const field of ["change", "Perf.5D", "Perf.1M", "Perf.6M", "Perf.YTD", "Perf.Y", "Perf.5Y", "Perf.10Y", "Perf.All"]) {
  assert.match(updaterSource, new RegExp(field.replace(".", "\\.")), `Updater should request TradingView ${field}`);
}
assert.doesNotMatch(updaterSource, /Perf\.1Y/, "TradingView's one-year scanner field is Perf.Y, not Perf.1Y");
assert.doesNotMatch(updaterSource, /query1\.finance\.yahoo\.com/, "Updater should not replace TradingView performance with a Yahoo baseline");
assert.doesNotMatch(updaterSource, /fetchYtdBaseline/, "Updater should rank directly from TradingView YTD performance");
assert.match(updaterSource, /AI_STOCK_UNIVERSE/, "Updater should rank from a broader AI stock universe");
assert.match(updaterSource, /const stocks = \[/, "Updater should rewrite the dashboard stock block");
assert.match(updaterSource, /stockListUpdatedAt/, "Updater should refresh the displayed stock-list timestamp");
assert.match(updaterSource, /\?:const\|let/, "Updater should support mutable dashboard timestamp declarations");

assert.match(newsWorkflowSource, /name:\s*Update latest news/, "News workflow should have a clear name");
for (const hour of [14, 15]) {
  assert.match(newsWorkflowSource, new RegExp(`0 ${hour} \\* \\* \\*`), `News workflow should include ${hour}:00 UTC`);
}
assert.match(newsWorkflowSource, /workflow_dispatch:/, "News updates should support manual dispatch");
assert.match(newsWorkflowSource, /node-version:\s*24/, "News workflow should use Node 24");
assert.match(newsWorkflowSource, /node scripts\/update-news\.mjs --scheduled-window/, "News workflow should enforce the ET hour guard");
assert.match(newsWorkflowSource, /github\.event_name/, "News workflow should distinguish manual and scheduled runs");
assert.match(newsWorkflowSource, /node scripts\/update-news\.mjs --force/, "Manual news updates should bypass the ET hour guard");
assert.match(newsWorkflowSource, /node tests\/news\.test\.mjs/, "News workflow should run page tests");
assert.match(newsWorkflowSource, /node tests\/news-data\.test\.mjs/, "News workflow should run data tests");
assert.match(newsWorkflowSource, /node tests\/news-updater\.test\.mjs/, "News workflow should run updater tests");
assert.match(newsWorkflowSource, /git add data\/news-data\.json/, "News workflow should commit only the generated archive");
assert.match(newsUpdaterSource, /America\/New_York/, "News updater should evaluate time in New York");
assert.match(newsUpdaterSource, /isScheduledNewsWindow/, "News updater should guard the daily schedule");
assert.match(newsUpdaterSource, /MyMemory|mymemory/i, "News updater should provide automatic Chinese title translation");
