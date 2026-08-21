# 3D Bharat Investment Dashboard

A Next.js investment dashboard for curating and evaluating Indian startup and growth-stage opportunities. The project is built with the App Router, Redux Toolkit, Recharts, and mock JSON-backed service layers.

## Architecture

- App routes: app/
- Shared layout shell: src/components/layout/
- UI modules: src/components/
- Data and simulation layer: src/services/
- Redux state: src/features/
- Recommendation logic: src/utils/recommendation.js
- Mock dataset: src/data/

## Data flow

1. The app loads deal and investor data from mock JSON files via simulated API services.
2. Redux Toolkit slices store the request state, filters, search, sorting, page state, and saved interests.
3. UI pages read selectors and render derived views.
4. Saved interests persist in localStorage and restore on refresh.
5. Recommendation scoring ranks deals based on risk fit, industry match, budget compatibility, and ROI attractiveness.

## Features

- Investor dashboard with KPI cards and charts
- Deal explorer with debounced search, filters, sort, and pagination
- Deal detail pages with tabs and ROI/risk analysis
- Recommendation engine with weighted match scoring
- My Investments list with add/remove and localStorage persistence
- Corporate dashboard with trend and distribution charts
- Dark mode and responsive layout

## Optimization strategies

- useMemo for derived chart and filtered data
- useCallback for stable event handlers
- debounced search to reduce unnecessary queries
- Redux selectors to avoid redundant derived logic
- paginated deal results to handle large arrays efficiently

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000 in the browser.

## Production build

```bash
npm run build
npm run start
```

## Submission notes

- This app is intended for local development and Vercel deployment.
- No API keys are required for the mock data setup.
- The UI is kept consistent with the existing design and behavior.
