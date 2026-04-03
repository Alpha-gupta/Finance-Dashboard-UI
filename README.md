# Finance Dashboard UI

A clean React + Vite finance dashboard built with Tailwind CSS, Zustand state management, and Recharts visualizations.

## Features

- Summary cards for current balance, total income, total expenses, and savings rate
- Time-based line chart for monthly income and expense trends
- Categorical pie chart for spending breakdown
- Transaction list with search, sorting, and admin-powered add transaction form
- Role switcher to simulate Viewer vs Admin behavior
- Insights panel with top spending, monthly comparison, and largest transaction
- Local storage persistence for transactions, role, filters, and sort state

## Setup

1. Install dependencies:

   npm install

2. Run the development server:

   npm run dev

3. Build for production:

   npm run build

## Notes

- Viewer role can browse summaries, charts, insights, and transactions
- Admin role can add new transactions through the UI
- The dashboard is intentionally static / frontend-only with mock data

## Improvements included

- Responsive layout for smaller screens
- Graceful empty state handling in the transactions table
- Visual polish with rounded cards and soft color palette
- Local state persistence via `localStorage`

