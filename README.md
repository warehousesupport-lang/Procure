# ProcureX — Procurement Price Verification System

A full-featured procurement management web application built with **React + Vite**.

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) v18 or higher
- npm v9 or higher

### Installation & Run

```bash
# 1. Install dependencies
npm install

# 2. Start the development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
npm run preview   # preview the production build locally
```

---

## 📁 Project Structure

```
procurex/
├── index.html                  # HTML entry point
├── vite.config.js              # Vite configuration
├── package.json                # Dependencies & scripts
├── public/
│   └── favicon.svg
└── src/
    ├── main.jsx                # React bootstrap
    ├── App.jsx                 # Root component & state
    ├── index.css               # Global styles & animations
    ├── data.js                 # Seed data, constants, helpers
    └── components/
        ├── Badge.jsx           # Color badge pill
        ├── StatsBar.jsx        # Summary stats cards
        ├── SearchBar.jsx       # Search + filter + view toggle
        ├── ItemTable.jsx       # Table view
        ├── ItemCards.jsx       # Card/grid view
        ├── PriceCard.jsx       # Price detail modal
        ├── AddItemModal.jsx    # Add single item form
        ├── BulkUploadModal.jsx # CSV bulk importer
        ├── EditItemModal.jsx   # Edit existing item
        └── Toast.jsx           # Toast notifications
```

---

## ✨ Features

| Feature | Description |
|---|---|
| **Price Lookup** | Click any item to see a full price breakdown (unit price, qty, subtotal, GST, total) |
| **Add Item** | Add items one-by-one with a guided form; create new categories on the fly |
| **Bulk Upload** | Import multiple items from a CSV file or paste CSV text directly |
| **Edit Items** | Modify any field — price, category, specs, GST — with a live total preview |
| **Delete Items** | Remove items with a confirmation prompt |
| **Search** | Real-time search across category, brand, model, and specifications |
| **Category Filter** | One-click category pill filters |
| **Sort** | Sort by Category, Unit Price, Total, or Brand A–Z |
| **Table / Card View** | Toggle between a detailed table and a visual card grid |
| **Live Stats** | Auto-updating summary: total SKUs, categories, grand total, avg price |

---

## 📋 CSV Bulk Upload Format

```csv
Category,Brand,Model,Specs,Qty,Unit Price,GST%
Laptop,Dell,XPS 15,Intel i7 16GB 1TB,2,95000,18
Monitor,LG,UltraWide 34,34-inch IPS Curved,3,42000,18
```

All columns except `Brand`, `Model`, and `Unit Price` are optional (defaults apply).
