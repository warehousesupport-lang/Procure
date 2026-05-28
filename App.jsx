import { useState, useMemo, useCallback } from 'react';
import { INITIAL_DATA, CATEGORY_ICONS, fmt, totalPrice } from './data.js';

import StatsBar        from './components/StatsBar.jsx';
import SearchBar       from './components/SearchBar.jsx';
import ItemTable       from './components/ItemTable.jsx';
import ItemCards       from './components/ItemCards.jsx';
import PriceCard       from './components/PriceCard.jsx';
import AddItemModal    from './components/AddItemModal.jsx';
import BulkUploadModal from './components/BulkUploadModal.jsx';
import EditItemModal   from './components/EditItemModal.jsx';
import Toast           from './components/Toast.jsx';

let nextId = INITIAL_DATA.length + 1;

export default function App() {
  /* ── State ─────────────────────────────────────────────── */
  const [items,        setItems]        = useState(INITIAL_DATA);
  const [search,       setSearch]       = useState("");
  const [catFilter,    setCatFilter]    = useState("All");
  const [sortBy,       setSortBy]       = useState("category");
  const [view,         setView]         = useState("table");
  const [selectedItem, setSelectedItem] = useState(null);
  const [editItem,     setEditItem]     = useState(null);
  const [showAdd,      setShowAdd]      = useState(false);
  const [showBulk,     setShowBulk]     = useState(false);
  const [toast,        setToast]        = useState(null);

  /* ── Derived ────────────────────────────────────────────── */
  const categories = useMemo(
    () => ["All", ...Array.from(new Set(items.map(i => i.category))).sort()],
    [items]
  );

  const filtered = useMemo(() => {
    let arr = items;
    if (catFilter !== "All") arr = arr.filter(i => i.category === catFilter);
    if (search.trim()) {
      const q = search.toLowerCase();
      arr = arr.filter(i =>
        `${i.category} ${i.brand} ${i.model} ${i.specs}`.toLowerCase().includes(q)
      );
    }
    return [...arr].sort((a, b) => {
      if (sortBy === "price")  return b.unitPrice - a.unitPrice;
      if (sortBy === "total")  return totalPrice(b) - totalPrice(a);
      if (sortBy === "brand")  return a.brand.localeCompare(b.brand);
      return a.category.localeCompare(b.category);
    });
  }, [items, catFilter, search, sortBy]);

  /* ── Helpers ────────────────────────────────────────────── */
  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 2800);
  };

  const addItem = useCallback((item) => {
    setItems(prev => [...prev, { ...item, id: nextId++ }]);
    showToast("Item added successfully");
  }, []);

  const bulkAdd = useCallback((newItems) => {
    setItems(prev => [...prev, ...newItems.map(item => ({ ...item, id: nextId++ }))]);
    showToast(`${newItems.length} item${newItems.length > 1 ? "s" : ""} imported`);
  }, []);

  const saveItem = useCallback((updated) => {
    setItems(prev => prev.map(i => i.id === updated.id ? updated : i));
    showToast("Item updated");
  }, []);

  const deleteItem = useCallback((id) => {
    setItems(prev => prev.filter(i => i.id !== id));
    showToast("Item deleted", "warning");
  }, []);

  const nonAllCategories = categories.filter(c => c !== "All");

  /* ── Render ─────────────────────────────────────────────── */
  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(160deg, #020d1a 0%, #041c35 45%, #061f3a 100%)",
      color: "#b5d4f4",
    }}>

      {/* ── Header ────────────────────────────────────────── */}
      <header style={{
        padding: "1.25rem 2rem",
        borderBottom: "1px solid rgba(55,138,221,0.12)",
        background: "rgba(4,28,53,0.55)",
        backdropFilter: "blur(14px)",
        position: "sticky",
        top: 0,
        zIndex: 200,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: 12,
      }}>
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{
            width: 44, height: 44,
            background: "linear-gradient(135deg,#185fa5,#0f6e56)",
            borderRadius: 12,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 22,
          }}>⚡</div>
          <div>
            <div style={{ fontSize: 20, fontWeight: 800, color: "#e6f1fb", letterSpacing: -0.5 }}>ProcureX</div>
            <div style={{ fontSize: 10, color: "rgba(183,212,244,0.4)", letterSpacing: 2, textTransform: "uppercase" }}>
              Price Verification System
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <button
            onClick={() => setShowBulk(true)}
            style={{ padding: "8px 18px", background: "rgba(255,255,255,0.07)", border: "1px solid rgba(55,138,221,0.25)", borderRadius: 10, color: "#85b7eb", cursor: "pointer", fontSize: 13, fontWeight: 500 }}
          >📤 Bulk Upload</button>
          <button
            onClick={() => setShowAdd(true)}
            style={{ padding: "8px 20px", background: "linear-gradient(135deg,#185fa5,#0f6e56)", border: "none", borderRadius: 10, color: "#fff", cursor: "pointer", fontSize: 13, fontWeight: 600 }}
          >+ Add Item</button>
        </div>
      </header>

      {/* ── Main content ──────────────────────────────────── */}
      <main style={{ padding: "1.75rem 2rem", maxWidth: 1400, margin: "0 auto" }}>

        <StatsBar items={items} />

        <SearchBar
          search={search}       setSearch={setSearch}
          sortBy={sortBy}       setSortBy={setSortBy}
          view={view}           setView={setView}
          catFilter={catFilter} setCatFilter={setCatFilter}
          categories={categories}
        />

        {/* Results count */}
        <div style={{ fontSize: 12, color: "rgba(183,212,244,0.38)", marginBottom: 14 }}>
          Showing&nbsp;
          <span style={{ color: "#5dcaa5", fontWeight: 600 }}>{filtered.length}</span>
          &nbsp;of {items.length} items
          {search && <> matching "<span style={{ color: "#85b7eb" }}>{search}</span>"</>}
        </div>

        {/* Views */}
        {filtered.length > 0 ? (
          view === "table" ? (
            <ItemTable
              items={filtered}
              onSelect={setSelectedItem}
              onEdit={setEditItem}
              onDelete={deleteItem}
            />
          ) : (
            <ItemCards
              items={filtered}
              onSelect={setSelectedItem}
              onEdit={setEditItem}
              onDelete={deleteItem}
            />
          )
        ) : (
          <div style={{ textAlign: "center", padding: "5rem 2rem", color: "rgba(183,212,244,0.25)" }}>
            <div style={{ fontSize: 52, marginBottom: 16 }}>🔍</div>
            <div style={{ fontSize: 20, marginBottom: 8 }}>No items found</div>
            <div style={{ fontSize: 13 }}>Try adjusting your search or category filter</div>
          </div>
        )}
      </main>

      {/* ── Modals ────────────────────────────────────────── */}
      {selectedItem && (
        <PriceCard item={selectedItem} onClose={() => setSelectedItem(null)} />
      )}
      {showAdd && (
        <AddItemModal
          onAdd={addItem}
          onClose={() => setShowAdd(false)}
          categories={nonAllCategories}
        />
      )}
      {showBulk && (
        <BulkUploadModal
          onBulkAdd={bulkAdd}
          onClose={() => setShowBulk(false)}
        />
      )}
      {editItem && (
        <EditItemModal
          item={editItem}
          onSave={saveItem}
          onClose={() => setEditItem(null)}
          categories={nonAllCategories}
        />
      )}

      <Toast toast={toast} />
    </div>
  );
}
