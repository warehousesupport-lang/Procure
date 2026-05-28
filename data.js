export const INITIAL_DATA = [
  { id: 1,  category: "Laptop",       brand: "Dell",     model: "Latitude 5440",     specs: "Intel i5, 16GB RAM, 512GB SSD",   qty: 5,  unitPrice: 68500, gst: 18 },
  { id: 2,  category: "Laptop",       brand: "HP",       model: "ProBook 440 G9",    specs: "Intel i7, 16GB RAM, 1TB SSD",     qty: 3,  unitPrice: 82000, gst: 18 },
  { id: 3,  category: "Desktop",      brand: "Lenovo",   model: "ThinkCentre Neo 50",specs: "Intel i5, 8GB RAM, 512GB SSD",    qty: 4,  unitPrice: 49500, gst: 18 },
  { id: 4,  category: "Monitor",      brand: "Samsung",  model: "LS24R350",          specs: "24-inch LED Full HD",             qty: 6,  unitPrice: 9800,  gst: 18 },
  { id: 5,  category: "Printer",      brand: "Canon",    model: "imageCLASS MF3010", specs: "Mono Laser Multifunction",        qty: 2,  unitPrice: 14200, gst: 18 },
  { id: 6,  category: "Keyboard",     brand: "Logitech", model: "K120",              specs: "USB Wired Keyboard",              qty: 10, unitPrice: 650,   gst: 18 },
  { id: 7,  category: "Mouse",        brand: "Dell",     model: "MS116",             specs: "Optical Wired Mouse",             qty: 10, unitPrice: 450,   gst: 18 },
  { id: 8,  category: "UPS",          brand: "APC",      model: "BX1100C-IN",        specs: "1100VA Backup UPS",               qty: 3,  unitPrice: 6900,  gst: 18 },
  { id: 9,  category: "Router",       brand: "TP-Link",  model: "Archer C6",         specs: "Dual Band WiFi Router",           qty: 4,  unitPrice: 3200,  gst: 18 },
  { id: 10, category: "External HDD", brand: "Seagate",  model: "Expansion 2TB",     specs: "USB 3.0 Portable Drive",          qty: 5,  unitPrice: 5400,  gst: 18 },
  { id: 11, category: "Webcam",       brand: "Logitech", model: "C270 HD",           specs: "720p USB Webcam",                 qty: 4,  unitPrice: 2100,  gst: 18 },
  { id: 12, category: "Headset",      brand: "Jabra",    model: "Evolve 20",         specs: "USB Noise Cancelling",            qty: 6,  unitPrice: 4800,  gst: 18 },
  { id: 13, category: "Tablet",       brand: "Apple",    model: "iPad 10th Gen",     specs: "64GB WiFi",                       qty: 2,  unitPrice: 39500, gst: 18 },
  { id: 14, category: "Smartphone",   brand: "Samsung",  model: "Galaxy A35",        specs: "8GB RAM, 128GB Storage",          qty: 3,  unitPrice: 27000, gst: 18 },
  { id: 15, category: "Projector",    brand: "Epson",    model: "EB-E01",            specs: "XGA Business Projector",          qty: 1,  unitPrice: 34500, gst: 18 },
];

export const CATEGORY_ICONS = {
  Laptop:        "💻",
  Desktop:       "🖥️",
  Monitor:       "🖵",
  Printer:       "🖨️",
  Keyboard:      "⌨️",
  Mouse:         "🖱️",
  UPS:           "🔋",
  Router:        "📡",
  "External HDD":"💾",
  Webcam:        "📷",
  Headset:       "🎧",
  Tablet:        "📱",
  Smartphone:    "📲",
  Projector:     "📽️",
  Default:       "📦",
};

export const fmt = (n) => "₹" + Number(n).toLocaleString("en-IN");
export const totalPrice = (item) => item.qty * item.unitPrice * (1 + item.gst / 100);
