# 猴油冲冲冲

A static AI stock momentum dashboard showing AI-linked U.S. stocks with more
than 100% YTD gains, live TradingView chart widgets, and a generated market
visualization.

Open `index.html` directly or serve the folder with any static web server.

## Automatic Top 20 Updates

The GitHub Action in `.github/workflows/update-stocks.yml` refreshes the ranked
stock list during U.S. trading hours. It is scheduled for the 9:30 ET and
15:30 ET update windows on weekdays, which gives two refreshes roughly six
hours apart while the market is open.

The updater script ranks a curated AI-related U.S. stock universe by
chart-style YTD return, using live TradingView scanner data for prices and
Yahoo Finance daily history for the first trading-day close. When the top 20
changes, the action rewrites `app.js`, bumps the `app.js` cache key in
`index.html`, runs tests, and commits the refreshed data back to `main`.

## Deploy On GitHub Pages

1. Push this repository to GitHub.
2. In GitHub, open **Settings > Pages**.
3. Set **Source** to **Deploy from a branch**.
4. Choose the `main` branch and `/root`.
