import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";

const workflowPath = new URL("../.github/workflows/update-stocks.yml", import.meta.url);
const updaterPath = new URL("../scripts/update-stocks.mjs", import.meta.url);

assert.equal(existsSync(workflowPath), true, "Missing scheduled GitHub Action workflow");
assert.equal(existsSync(updaterPath), true, "Missing stock updater script");

const workflowSource = readFileSync(workflowPath, "utf8");
const updaterSource = readFileSync(updaterPath, "utf8");

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
assert.match(updaterSource, /query1\.finance\.yahoo\.com/, "Updater should fetch first-trading-day closes for chart-style YTD");
assert.match(updaterSource, /AI_STOCK_UNIVERSE/, "Updater should rank from a broader AI stock universe");
assert.match(updaterSource, /const stocks = \[/, "Updater should rewrite the dashboard stock block");
assert.match(updaterSource, /stockListUpdatedAt/, "Updater should refresh the displayed stock-list timestamp");
assert.match(updaterSource, /\?:const\|let/, "Updater should support mutable dashboard timestamp declarations");
