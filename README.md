# Costco Analytics Dashboard & Receipt Scraper

An interactive, local-first web application to visualize, analyze, and track your Costco shopping history, spending trends, price inflation, and store breakdown.

![Costco Dashboard](https://img.shields.gradient.is/Costco-Dashboard-v2.0)

## Features

- 🧾 **Receipt JSON Downloader**: Browser console script to automatically query and save your official Costco receipt history.
- ✨ **Demo Mode**: Includes a built-in sample data generator so you can test the dashboard instantly without uploading receipts.
- 📊 **Spending Analytics**:
  - **Summary Metrics**: Total spent, shopping trips count, total unit quantity, unique SKUs, average spend per trip, average unit price.
  - **Most Spent Items**: Ranked by total dollar spend over time.
  - **Price Inflation Tracking**: Chronologically compares initial purchase prices vs. latest prices to track price increases and inflation rates.
  - **Most Purchased Items**: Ranked by total units bought across all visits.
  - **Premium Items**: Highest average unit price items.
  - **Monthly Spending Trend**: Bar chart grouped and sorted by year/month (`YYYY-MM`).
  - **Store Warehouse Breakdown**: Spending distribution across different Costco store locations.
- 🔍 **Interactive Search & Filtering**: Real-time search by item description or SKU, plus date range filters (All Time, Last 6 Months, Last 1 Year, Specific Years).
- 🔎 **Item Details Modal**: Click any item row to view its full purchase history timeline, warehouse locations, and price trend chart.
- 📥 **CSV Export**: Export processed item purchase records to a clean CSV file for Excel or Google Sheets.
- 🌙 **Dark / Light Theme**: Built-in modern theme toggle with glassmorphism design system.
- 🔒 **Privacy-First**: 100% client-side data processing — no receipt data is ever sent to external servers.

---

## Setup Instructions

### Step 1: Download Your Receipts

1. Open your web browser, navigate to [https://www.costco.com/OrderStatusCmd](https://www.costco.com/OrderStatusCmd), and log in to your Costco account.
2. Open your browser's Developer Tools Console:
   - **Chrome / Edge / Brave**: Press `F12` or `Cmd + Option + I` (Mac) / `Ctrl + Shift + I` (Windows/Linux)
   - **Firefox**: Press `F12` or `Cmd + Option + K` (Mac) / `Ctrl + Shift + K` (Windows/Linux)
   - **Safari**: Enable the Develop menu in Safari Preferences, then press `Cmd + Option + C`
3. Copy the entire contents of [`download_costco_receipts.js`](./download_costco_receipts.js) and paste it into the console.
4. Press `Enter` to run the script. By default, it fetches your receipts from the last 2 years and saves a file named `costco-receipts-YYYY-MM-DD.json`.

*(Note: You can pass custom options, e.g. `await downloadReceipts({ yearsBack: 3 });` or specify a custom `startDate: '01/01/2023'`)*

### Step 2: Open the Dashboard

1. Double-click [`CostcoTracker.html`](./CostcoTracker.html) to open it in any modern web browser.
2. Either:
   - Drag and drop your downloaded `costco-receipts-YYYY-MM-DD.json` file into the top upload zone.
   - Or click **"✨ Load Demo Data"** in the top right to test the dashboard with realistic sample data.

---

## File Structure

- [`CostcoTracker.html`](./CostcoTracker.html) - Interactive dashboard web app (HTML5, CSS3, ES6 JavaScript, Chart.js).
- [`download_costco_receipts.js`](./download_costco_receipts.js) - Browser console script to query Costco GraphQL API.
- [`README.md`](./README.md) - Project documentation and setup guide.

---

## Troubleshooting

- **"idToken not found" Warning**: Make sure you are logged into your account on [Costco.com](https://www.costco.com/OrderStatusCmd) before running the scraper script in the console.
- **No receipts downloaded**: Verify that your account has in-warehouse or online purchases within the selected date range.

---

## Credits

- Original idea: [u/ikeee](https://www.reddit.com/user/ikeee/) (Reddit)
- HTML dashboard built on that idea: [u/ViKoToMo](https://www.reddit.com/user/ViKoToMo/) (Reddit)
- Receipt scraper script: [ankurdave](https://github.com/ankurdave) (GitHub)
