const icons = { bola: "◉", raket: "⌁", sepatu: "⌑", jersey: "▤", running: "↗", alat: "◈" };
const legacySixProductDemo = [
  { id: "demo-1", name: "Bola Basket Molten BG4500", sku: "BKT-001", category: "Bola", supplier: "Sportindo Jaya", stock: 24, min_stock: 8, unit: "pcs" },
  { id: "demo-2", name: "Raket Badminton Carbon Pro", sku: "BDM-014", category: "Raket", supplier: "Prima Atletik", stock: 6, min_stock: 10, unit: "pcs" },
  { id: "demo-3", name: "Sepatu Futsal Flex Court", sku: "FUT-008", category: "Sepatu", supplier: "Sportindo Jaya", stock: 18, min_stock: 6, unit: "pasang" },
  { id: "demo-4", name: "Jersey Training Pro", sku: "JRS-023", category: "Pakaian", stock: 0, min_stock: 5, unit: "pcs" },
  { id: "demo-5", name: "Bola Voli Mikasa V200W", sku: "VOL-006", category: "Bola", supplier: "Prima Atletik", stock: 32, min_stock: 10, unit: "pcs" },
  { id: "demo-6", name: "Matras Yoga Eco Grip", sku: "FIT-011", category: "Fitness", stock: 14, min_stock: 5, unit: "pcs" },
];
const previousEightProductDemo = [
  { id: "demo-1", name: "Bola Basket BG4500 · Size 7", brand: "Molten", sku: "BKT-001", category: "Bola", supplier: "Sportindo Jaya", stock: 24, min_stock: 8, unit: "pcs" },
  { id: "demo-2", name: "Raket Astrox 88D Pro · 4U/G5", brand: "Yonex", sku: "BDM-014", category: "Raket", supplier: "Prima Atletik", stock: 6, min_stock: 10, unit: "pcs" },
  { id: "demo-3", name: "Sepatu Tiempo Legend 10 Academy · 42", brand: "Nike", sku: "FUT-008", category: "Sepatu", supplier: "Sportindo Jaya", stock: 18, min_stock: 6, unit: "pasang" },
  { id: "demo-4", name: "Jersey Tiro 24 Training · M", brand: "Adidas", sku: "JRS-023", category: "Pakaian", supplier: "Sportindo Jaya", stock: 12, min_stock: 5, unit: "pcs" },
  { id: "demo-5", name: "Bola Voli V200W", brand: "Mikasa", sku: "VOL-006", category: "Bola", supplier: "Prima Atletik", stock: 32, min_stock: 10, unit: "pcs" },
  { id: "demo-6", name: "Matras Yoga Comfort · 8 mm", brand: "Decathlon", sku: "FIT-011", category: "Fitness", supplier: "Gerak Sehat", stock: 14, min_stock: 5, unit: "pcs" },
  { id: "demo-7", name: "Senar Badminton BG65 · 0,70 mm", brand: "Yonex", sku: "AKS-031", category: "Aksesori", supplier: "Prima Atletik", stock: 4, min_stock: 6, unit: "set" },
  { id: "demo-8", name: "Kaos Kaki Team Liga · M", brand: "Puma", sku: "PKN-042", category: "Pakaian", supplier: "Sportindo Jaya", stock: 31, min_stock: 10, unit: "pasang" },
];
const catalogItems = [
  ["Sepak Bola & Futsal", "Bola Sepak Bola", "Adidas", "pcs", 450000],
  ["Sepak Bola & Futsal", "Bola Sepak Bola", "Nike", "pcs", 500000],
  ["Sepak Bola & Futsal", "Bola Futsal", "Specs", "pcs", 250000],
  ["Sepak Bola & Futsal", "Bola Futsal", "Mikasa", "pcs", 350000],
  ["Sepak Bola & Futsal", "Sepatu Futsal", "Specs", "pasang", 450000],
  ["Sepak Bola & Futsal", "Sepatu Futsal", "Ortuseight", "pasang", 550000],
  ["Sepak Bola & Futsal", "Sepatu Bola", "Adidas", "pasang", 1200000],
  ["Sepak Bola & Futsal", "Sepatu Bola", "Nike", "pasang", 1350000],
  ["Sepak Bola & Futsal", "Jersey Sepak Bola", "Adidas", "pcs", 650000],
  ["Sepak Bola & Futsal", "Jersey Sepak Bola", "Nike", "pcs", 700000],
  ["Sepak Bola & Futsal", "Kaos Kaki Bola", "Specs", "pasang", 75000],
  ["Sepak Bola & Futsal", "Shin Guard", "Nike", "pasang", 150000],
  ["Sepak Bola & Futsal", "Sarung Tangan Kiper", "Adidas", "pasang", 450000],
  ["Sepak Bola & Futsal", "Tas Sepak Bola", "Adidas", "pcs", 650000],
  ["Sepak Bola & Futsal", "Cone Latihan", "Specs", "pcs", 25000],
  ["Badminton", "Raket Badminton", "Yonex", "pcs", 1200000],
  ["Badminton", "Raket Badminton", "Li-Ning", "pcs", 1000000],
  ["Badminton", "Raket Badminton", "Victor", "pcs", 1300000],
  ["Badminton", "Shuttlecock", "Yonex", "tube", 250000],
  ["Badminton", "Shuttlecock", "RSL", "tube", 220000],
  ["Badminton", "Grip Raket", "Yonex", "pcs", 35000],
  ["Badminton", "Grip Raket", "Li-Ning", "pcs", 30000],
  ["Badminton", "Senar Raket", "Yonex", "pcs", 120000],
  ["Badminton", "Tas Raket", "Yonex", "pcs", 650000],
  ["Badminton", "Sepatu Badminton", "Yonex", "pasang", 850000],
  ["Badminton", "Kaos Badminton", "Li-Ning", "pcs", 350000],
  ["Basket", "Bola Basket", "Molten", "pcs", 550000],
  ["Basket", "Bola Basket", "Spalding", "pcs", 650000],
  ["Basket", "Sepatu Basket", "Nike", "pasang", 1500000],
  ["Basket", "Sepatu Basket", "Adidas", "pasang", 1400000],
  ["Basket", "Jersey Basket", "Nike", "pcs", 650000],
  ["Basket", "Kaos Kaki Basket", "Nike", "pasang", 100000],
  ["Basket", "Ring Basket Mini", "Spalding", "pcs", 850000],
  ["Basket", "Wristband", "Nike", "pcs", 100000],
  ["Running / Lari", "Sepatu Running", "Nike", "pasang", 1500000],
  ["Running / Lari", "Sepatu Running", "Adidas", "pasang", 1400000],
  ["Running / Lari", "Sepatu Running", "Asics", "pasang", 1600000],
  ["Running / Lari", "Sepatu Running", "New Balance", "pasang", 1500000],
  ["Running / Lari", "Running Shorts", "Adidas", "pcs", 400000],
  ["Running / Lari", "Running Shirt", "Nike", "pcs", 450000],
  ["Running / Lari", "Kaos Kaki Running", "Asics", "pasang", 120000],
  ["Running / Lari", "Running Cap", "Nike", "pcs", 250000],
  ["Running / Lari", "Running Belt", "Adidas", "pcs", 300000],
  ["Running / Lari", "Botol Minum", "Adidas", "pcs", 250000],
  ["Gym / Fitness", "Dumbbell 5 kg", "Adidas", "pcs", 450000],
  ["Gym / Fitness", "Dumbbell 10 kg", "Adidas", "pcs", 800000],
  ["Gym / Fitness", "Kettlebell 8 kg", "Adidas", "pcs", 700000],
  ["Gym / Fitness", "Resistance Band", "Adidas", "pcs", 250000],
  ["Gym / Fitness", "Yoga Mat", "Adidas", "pcs", 400000],
  ["Gym / Fitness", "Skipping Rope", "Nike", "pcs", 250000],
  ["Gym / Fitness", "Gym Gloves", "Nike", "pasang", 300000],
  ["Gym / Fitness", "Wrist Wrap", "Adidas", "pasang", 250000],
  ["Gym / Fitness", "Weightlifting Belt", "Adidas", "pcs", 500000],
  ["Gym / Fitness", "Foam Roller", "Adidas", "pcs", 450000],
  ["Gym / Fitness", "Gym Bag", "Nike", "pcs", 600000],
  ["Gym / Fitness", "Shaker Bottle", "Adidas", "pcs", 200000],
  ["Tenis", "Raket Tenis", "Wilson", "pcs", 1500000],
  ["Tenis", "Raket Tenis", "Babolat", "pcs", 1800000],
  ["Tenis", "Bola Tenis", "Wilson", "tube", 150000],
  ["Tenis", "Bola Tenis", "Head", "tube", 140000],
  ["Tenis", "Sepatu Tenis", "Adidas", "pasang", 1300000],
  ["Tenis", "Grip Raket", "Wilson", "pcs", 40000],
  ["Tenis", "Tas Raket Tenis", "Wilson", "pcs", 700000],
];
const categoryCodes = { "Sepak Bola & Futsal": "SFF", Badminton: "BDM", Basket: "BSK", "Running / Lari": "RUN", "Gym / Fitness": "FIT", Tenis: "TNS" };
const categorySequence = {};
const demoProducts = catalogItems.map(([category, name, brand, unit, selling_price], index) => {
  categorySequence[category] = (categorySequence[category] || 0) + 1;
  // These generated balances are clearly marked demo values, not verified physical counts.
  const stock = index % 17 === 6 ? 0 : 6 + ((index * 11 + 4) % 25);
  return {
    id: `demo-${index + 1}`,
    name,
    brand,
    sku: `${categoryCodes[category]}-${String(categorySequence[category]).padStart(3, "0")}`,
    category,
    unit,
    selling_price,
    supplier: "-",
    stock,
    min_stock: 8,
  };
});
const openingDate = new Date().toISOString().slice(0, 10);
const openingDocument = {
  id: "demo-opening",
  document_no: "OPEN-DEMO-001",
  document_type: "opening",
  document_date: openingDate,
  handled_by: "Data contoh",
  recorded_by_name: "Saldo awal aplikasi",
  note: "Saldo kuantitas contoh untuk demo; ganti dengan hasil hitung fisik sebelum operasional.",
};
openingDocument.stock_document_lines = demoProducts.map((product) => ({
  id: `opening-${product.id}`,
  document_id: openingDocument.id,
  product_id: product.id,
  quantity: product.stock,
  system_stock: 0,
  physical_stock: null,
  difference: null,
}));
const demoEntries = demoProducts.filter((product) => product.stock > 0).map((product) => ({
  id: `entry-${product.id}`,
  document_id: openingDocument.id,
  document_line_id: `opening-${product.id}`,
  product_id: product.id,
  product_name: product.name,
  movement_type: "in",
  quantity: product.stock,
  stock_before: 0,
  stock_after: product.stock,
  created_at: new Date().toISOString(),
  document: openingDocument,
}));
const state = { products: demoProducts, documents: [openingDocument], cardEntries: demoEntries, categories: [], suppliers: [], profiles: [], role: "employee", view: "dashboard", search: "", category: "Semua kategori", brand: "Semua merek", cardProduct: "", reportFilters: { type: "all", from: "", to: "", search: "" } };
const content = document.querySelector("#app-content");
const authSessionKey = "sportstock-auth-session-v1";
const roleLabels = { manager: "Manager", supervisor: "SPV", employee: "Karyawan" };
let authSession = null;
let currentUser = null;
let currentProfile = null;
const supabaseConfig = window.SUPABASE_CONFIG || {};
const categoryNames = () => ["Semua kategori", ...new Set(state.products.map((product) => product.category).filter(Boolean))];
const brandNames = () => ["Semua merek", ...new Set(state.products.map((product) => product.brand).filter(Boolean))];
const formatNumber = (value) => new Intl.NumberFormat("id-ID").format(value || 0);
const formatCurrency = (value) => value === null || value === undefined || value === "" ? "—" : new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(Number(value));
const formatDate = (value) => new Intl.DateTimeFormat("id-ID", { day: "numeric", month: "short", year: "numeric" }).format(new Date(value));
const statusFor = (product) => product.stock <= 0 ? ["Habis", "out"] : product.stock <= product.min_stock ? ["Menipis", "low"] : ["Tersedia", ""];
const categoryIcon = (category = "") => /bola|basket/i.test(category) ? icons.bola : /raket|badminton|tenis/i.test(category) ? icons.raket : /sepatu/i.test(category) ? icons.sepatu : /pakaian|jersey/i.test(category) ? icons.jersey : /running|lari/i.test(category) ? icons.running : icons.alat;
const documentTypeLabels = { opening: "Saldo awal", purchase: "Pembelian", sale: "Penjualan", purchase_return: "Retur pembelian", sales_return: "Retur penjualan", stocktake: "Stok opname" };
const documentStatusLabels = { pending: "Menunggu persetujuan", approved: "Disetujui", rejected: "Ditolak" };

function backendUrl(path) {
  if (!supabaseConfig.url || !supabaseConfig.publishableKey) {
    throw new Error("Konfigurasi Supabase belum lengkap. Periksa frontend/supabase-config.js.");
  }
  return `${supabaseConfig.url.replace(/\/$/, "")}${path}`;
}

async function responseData(response) {
  const text = await response.text();
  const data = text ? JSON.parse(text) : null;
  if (!response.ok) {
    throw new Error(data?.msg || data?.message || data?.details || `Permintaan backend gagal (${response.status}).`);
  }
  return data;
}

function saveAuthSession(session) {
  authSession = session;
  localStorage.setItem(authSessionKey, JSON.stringify(session));
}

async function authRequest(path, { method = "GET", body, token } = {}) {
  const headers = { apikey: supabaseConfig.publishableKey };
  if (token) headers.Authorization = `Bearer ${token}`;
  if (body !== undefined) headers["Content-Type"] = "application/json";
  const response = await fetch(backendUrl(`/auth/v1/${path}`), {
    method,
    headers,
    body: body === undefined ? undefined : JSON.stringify(body),
  });
  return responseData(response);
}

async function refreshAuthSession() {
  if (!authSession?.refresh_token) throw new Error("Sesi berakhir. Silakan masuk kembali.");
  const session = await authRequest("token?grant_type=refresh_token", {
    method: "POST",
    body: { refresh_token: authSession.refresh_token },
  });
  saveAuthSession(session);
  return session;
}

async function backendRequest(path, { method = "GET", body, prefer } = {}, retry = true) {
  if (!authSession?.access_token) throw new Error("Sesi login tidak ditemukan. Silakan masuk kembali.");
  const headers = {
    apikey: supabaseConfig.publishableKey,
    Authorization: `Bearer ${authSession.access_token}`,
  };
  if (body !== undefined) headers["Content-Type"] = "application/json";
  if (prefer) headers.Prefer = prefer;
  const response = await fetch(backendUrl(`/rest/v1/${path}`), {
    method,
    headers,
    body: body === undefined ? undefined : JSON.stringify(body),
  });
  if (response.status === 401 && retry && authSession.refresh_token) {
    await refreshAuthSession();
    return backendRequest(path, { method, body, prefer }, false);
  }
  return responseData(response);
}

async function loadRemoteData() {
  const profileRows = await backendRequest(`user_profiles?select=*&user_id=eq.${encodeURIComponent(currentUser.id)}`);
  if (!profileRows.length || !profileRows[0].is_active) {
    throw new Error("Akun belum memiliki role aktif. Hubungi manager untuk mengaktifkan akses.");
  }
  currentProfile = profileRows[0];
  state.role = currentProfile.role;
  const canReview = ["manager", "supervisor"].includes(state.role);
  const [categories, suppliers, products, documents, lines, entries, profiles] = await Promise.all([
    backendRequest("categories?select=*&order=name.asc"),
    backendRequest("suppliers?select=*&order=name.asc"),
    backendRequest("products?select=*&order=name.asc"),
    backendRequest("stock_documents?select=*&order=document_date.asc,created_at.asc"),
    backendRequest("stock_document_lines?select=*"),
    backendRequest("warehouse_card_entries?select=*&order=created_at.asc"),
    canReview && state.role === "manager" ? backendRequest("user_profiles?select=*&order=email.asc") : Promise.resolve(profileRows),
  ]);
  const categoriesById = new Map(categories.map((category) => [category.id, category.name]));
  const suppliersById = new Map(suppliers.map((supplier) => [supplier.id, supplier.name]));
  state.categories = categories;
  state.suppliers = suppliers;
  state.products = products.map((product) => ({
    ...product,
    stock: Number(product.stock),
    min_stock: Number(product.min_stock),
    category: categoriesById.get(product.category_id) || "-",
    supplier: suppliersById.get(product.supplier_id) || "-",
  }));
  const linesByDocument = new Map();
  for (const line of lines) {
    if (!linesByDocument.has(line.document_id)) linesByDocument.set(line.document_id, []);
    linesByDocument.get(line.document_id).push({
      ...line,
      quantity: Number(line.quantity),
      system_stock: Number(line.system_stock),
      physical_stock: line.physical_stock === null ? null : Number(line.physical_stock),
      difference: line.difference === null ? null : Number(line.difference),
    });
  }
  state.documents = documents.map((document) => ({
    ...document,
    recorded_by_name: document.recorded_by_email || "",
    approved_by_name: document.approved_by_email || "",
    stock_document_lines: linesByDocument.get(document.id) || [],
  }));
  const documentsById = new Map(state.documents.map((document) => [document.id, document]));
  const productsById = new Map(state.products.map((product) => [product.id, product]));
  state.cardEntries = entries.map((entry) => ({
    ...entry,
    quantity: Number(entry.quantity),
    stock_before: Number(entry.stock_before),
    stock_after: Number(entry.stock_after),
    product_name: productsById.get(entry.product_id)?.name || "Barang",
    document: documentsById.get(entry.document_id) || {},
  }));
  state.profiles = profiles;
}

function setAuthenticatedShell(isAuthenticated) {
  const shell = document.querySelector(".app-shell");
  shell.classList.toggle("is-auth", !isAuthenticated);
  document.querySelector("#sidebar").hidden = !isAuthenticated;
  document.querySelector(".topbar").hidden = !isAuthenticated;
}

function renderAuthScreen(message = "", signUp = false) {
  setAuthenticatedShell(false);
  content.innerHTML = `<section class="auth-panel panel"><p class="eyebrow">SPORTSTOCK · AKSES TERKENDALI</p><h1>${signUp ? "Buat akun karyawan" : "Masuk ke Sportstock"}</h1><p class="page-subtitle">${signUp ? "Akun baru mendapat role karyawan. Manager akan menetapkan role lain bila diperlukan." : "Masuk dengan akun usaha untuk membuka data persediaan sesuai role Anda."}</p>${message ? `<p class="auth-message" role="status">${escapeHtml(message)}</p>` : ""}<form id="auth-form" class="modal-form">${signUp ? `<label class="form-field"><span>Nama lengkap</span><input class="field" name="full_name" required autocomplete="name" /></label>` : ""}<label class="form-field"><span>Email</span><input class="field" name="email" type="email" required autocomplete="email" /></label><label class="form-field"><span>Kata sandi</span><input class="field" name="password" type="password" minlength="8" required autocomplete="${signUp ? "new-password" : "current-password"}" /></label><button class="button button-primary" type="submit">${signUp ? "Buat akun karyawan" : "Masuk"}</button></form><button class="text-link auth-switch" id="auth-switch" type="button">${signUp ? "Sudah punya akun? Masuk" : "Belum punya akun? Daftar sebagai karyawan"}</button></section>`;
  document.querySelector("#auth-form").addEventListener("submit", (event) => submitAuth(event, signUp));
  document.querySelector("#auth-switch").addEventListener("click", () => renderAuthScreen("", !signUp));
}

function renderBackendError(error) {
  setAuthenticatedShell(false);
  content.innerHTML = `<section class="auth-panel panel" role="alert"><p class="eyebrow">KONEKSI TERKENDALA</p><h1>Data persediaan belum dapat dibuka</h1><p class="page-subtitle">${escapeHtml(error.message || "Periksa koneksi dan penerapan skema backend.")}</p><div class="auth-actions"><button class="button button-primary" id="retry-backend" type="button">Coba lagi</button><button class="button button-secondary" id="error-sign-out" type="button">Keluar</button></div></section>`;
  document.querySelector("#retry-backend").addEventListener("click", () => initialize());
  document.querySelector("#error-sign-out").addEventListener("click", () => signOut());
}

async function submitAuth(event, signUp) {
  event.preventDefault();
  const values = Object.fromEntries(new FormData(event.currentTarget));
  const submitButton = event.currentTarget.querySelector("button[type='submit']");
  submitButton.disabled = true;
  try {
    const response = await authRequest(signUp ? "signup" : "token?grant_type=password", {
      method: "POST",
      body: signUp
        ? { email: values.email.trim(), password: values.password, data: { full_name: values.full_name.trim() } }
        : { email: values.email.trim(), password: values.password },
    });
    if (!response.access_token) {
      renderAuthScreen("Akun dibuat. Periksa email untuk konfirmasi, lalu masuk.", false);
      return;
    }
    saveAuthSession(response);
    currentUser = response.user;
  } catch (error) {
    renderAuthScreen(error.message || "Autentikasi gagal. Periksa email dan kata sandi.", signUp);
    return;
  }
  try {
    await finishSignIn();
  } catch (error) {
    renderBackendError(error);
  }
}

async function finishSignIn() {
  await loadRemoteData();
  setAuthenticatedShell(true);
  document.querySelector("#connection-label").textContent = `Terhubung · ${roleLabels[state.role] || state.role}`;
  document.querySelector(".connection-dot").classList.add("is-online");
  document.querySelector(".connection-dot").classList.remove("has-error");
  const roleBadge = document.querySelector("#user-role-badge");
  roleBadge.textContent = `${roleLabels[state.role] || state.role} · ${currentProfile.display_name || currentProfile.email}`;
  roleBadge.title = currentProfile.email;
  document.querySelector("#export-data").hidden = state.role === "employee";
  document.querySelector('[data-view="approvals"]').hidden = state.role !== "supervisor";
  document.querySelector('[data-view="users"]').hidden = state.role !== "manager";
  state.view = "dashboard";
  render();
}

async function signOut() {
  const session = authSession;
  localStorage.removeItem(authSessionKey);
  authSession = null;
  currentUser = null;
  currentProfile = null;
  state.products = [];
  state.documents = [];
  state.cardEntries = [];
  state.profiles = [];
  if (session?.access_token) {
    try {
      await authRequest("logout", { method: "POST", token: session.access_token });
    } catch (error) {
      renderAuthScreen(`Sesi lokal sudah ditutup, tetapi server belum mengonfirmasi logout: ${error.message}`);
      return;
    }
  }
  renderAuthScreen();
}

async function initialize() {
  document.querySelector("#today-label").textContent = new Intl.DateTimeFormat("id-ID", { weekday: "long", day: "numeric", month: "long", year: "numeric" }).format(new Date());
  const storedSession = localStorage.getItem(authSessionKey);
  if (!storedSession) {
    renderAuthScreen();
    return;
  }
  try {
    authSession = JSON.parse(storedSession);
    try {
      currentUser = await authRequest("user", { token: authSession.access_token });
    } catch (error) {
      if (!authSession.refresh_token) throw error;
      await refreshAuthSession();
      currentUser = await authRequest("user", { token: authSession.access_token });
    }
    await finishSignIn();
  } catch (error) {
    renderBackendError(error);
  }
}

function pageHeading(eyebrow, title, subtitle, action = "") {
  return `<div class="page-heading"><div><p class="eyebrow">${eyebrow}</p><h1>${title}</h1><p class="page-subtitle">${subtitle}</p></div>${action}</div>`;
}

function productRows(products, showSupplier = true) {
  if (!products.length) return `<tr><td class="empty-state" colspan="8">Belum ada barang yang cocok dengan pencarian.</td></tr>`;
  return products.map((product) => {
    const [status, klass] = statusFor(product);
    const color = product.category === "Bola" ? "orange" : product.category === "Raket" ? "blue" : product.category === "Pakaian" ? "yellow" : "";
    const action = state.role === "employee" ? `<button class="row-action" data-move-product="${escapeHtml(product.id)}">Catat stok</button>` : "-";
    return `<tr><td><div class="product-cell"><span class="product-thumb ${color}">${categoryIcon(product.category)}</span><span><span class="product-name">${escapeHtml(product.name)}</span><span class="product-sku">${escapeHtml(product.sku)}</span></span></div></td><td><span class="brand-pill">${escapeHtml(product.brand || "Belum diisi")}</span></td><td>${escapeHtml(product.category || "-")}</td>${showSupplier ? `<td>${escapeHtml(product.supplier || "-")}</td>` : ""}<td class="price-cell">${formatCurrency(product.selling_price)}</td><td class="stock-cell">${formatNumber(product.stock)} <span class="stock-unit">${escapeHtml(product.unit || "pcs")}</span></td><td><span class="status-pill ${klass}">${status}</span></td><td>${action}</td></tr>`;
  }).join("");
}

function dashboardView() {
  const products = state.products;
  const low = products.filter((product) => product.stock > 0 && product.stock <= product.min_stock).length;
  const out = products.filter((product) => product.stock <= 0).length;
  const needsReview = low + out;
  const totalUnits = products.reduce((total, product) => total + Number(product.stock || 0), 0);
  const categories = [...new Set(products.map((product) => product.category).filter(Boolean))].map((name) => ({ name, count: products.filter((product) => product.category === name).length })).sort((a, b) => b.count - a.count);
  const max = Math.max(1, ...categories.map((category) => category.count));
  const latest = [...state.cardEntries].reverse().slice(0, 4);
  const pendingCount = state.documents.filter((doc) => doc.status === "pending").length;
  const createAction = state.role === "employee" ? `<button class="button button-primary hero-primary" data-action="document"><span class="button-icon">＋</span>Catat dokumen stok</button>` : "";
  return `<div class="demo-notice" role="note"><span class="demo-tag">DATA DEMO</span><span>Saldo contoh perlu diverifikasi lewat hitung fisik. Dokumen demo menunjukkan alur pencatatan dan persetujuan; harga hanya informasi katalog.</span></div><section class="dashboard-hero"><div class="hero-copy"><p class="hero-kicker">RINGKASAN PERSEDIAAN</p><h1>Semua stok, satu tempat.</h1><p>Pantau barang, merek, dan jumlah tersedia. Catat setiap perubahan agar kartu gudang selalu jelas.</p><div class="hero-actions">${createAction}<button class="button hero-secondary" data-view="inventory">Jelajahi barang <span aria-hidden="true">→</span></button></div><div class="hero-summary"><span>${formatNumber(products.length)} jenis barang</span><span>${formatNumber(brandNames().length - 1)} merek</span><span>${formatNumber(totalUnits)} unit tersedia</span>${["manager", "supervisor"].includes(state.role) ? `<span>${formatNumber(pendingCount)} menunggu persetujuan</span>` : ""}</div></div><div class="hero-art" aria-hidden="true"><div class="hero-sun"></div><div class="hero-court"></div><div class="hero-racket"><span></span></div><div class="hero-ball">S</div><div class="hero-sticker">STOK<br />TERJAGA</div></div></section>
    <div class="metrics-grid">
      <article class="metric-card"><div class="metric-top"><span>Jenis barang</span><span class="metric-symbol">▦</span></div><strong class="metric-value">${formatNumber(products.length)}</strong><span class="metric-note">SKU aktif di katalog</span></article>
      <article class="metric-card"><div class="metric-top"><span>Unit tersedia</span><span class="metric-symbol">▤</span></div><strong class="metric-value">${formatNumber(totalUnits)}</strong><span class="metric-note">Jumlah menurut catatan gudang</span></article>
      <article class="metric-card warning"><div class="metric-top"><span>Perlu diperiksa</span><span class="metric-symbol">↘</span></div><strong class="metric-value">${formatNumber(needsReview)}</strong><span class="metric-note">${formatNumber(low)} menipis · ${formatNumber(out)} habis</span></article>
      <article class="metric-card"><div class="metric-top"><span>Merek terdaftar</span><span class="metric-symbol">✳</span></div><strong class="metric-value">${formatNumber(brandNames().length - 1)}</strong><span class="metric-note">Telusuri dari katalog</span></article>
    </div>
    <div class="overview-grid">
      <section class="panel"><div class="panel-header"><div><h2 class="panel-title">Perlu perhatian</h2><p class="panel-description">Barang di bawah batas minimum</p></div><button class="text-link" data-view="inventory">Buka katalog →</button></div>
        <div class="table-wrap"><table><thead><tr><th>Barang</th><th>Merek</th><th>Stok</th><th>Status</th></tr></thead><tbody>${needsReview ? products.filter((product) => product.stock <= product.min_stock).slice(0, 4).map((product) => { const [status, klass] = statusFor(product); return `<tr><td><div class="product-cell"><span class="product-thumb">${categoryIcon(product.category)}</span><span><span class="product-name">${escapeHtml(product.name)}</span><span class="product-sku">${escapeHtml(product.sku)}</span></span></div></td><td>${escapeHtml(product.brand || "-")}</td><td class="stock-cell">${formatNumber(product.stock)} <span class="stock-unit">${escapeHtml(product.unit || "pcs")}</span></td><td><span class="status-pill ${klass}">${status}</span></td></tr>`; }).join("") : `<tr><td class="empty-state" colspan="4">Semua barang berada di atas batas minimum stok.</td></tr>`}</tbody></table></div>
      </section>
      <section class="panel"><div class="panel-header"><div><h2 class="panel-title">Aktivitas terbaru</h2><p class="panel-description">Catatan mutasi stok terakhir</p></div><button class="text-link" data-view="movements">Semua →</button></div><div class="activity-list">${activityItems(latest)}</div></section>
    </div>
    <div class="lower-grid"><section class="panel"><div class="panel-header"><div><h2 class="panel-title">Barang per kategori</h2><p class="panel-description">Jumlah jenis barang dalam katalog</p></div></div><div class="category-list">${categories.map((category) => `<div class="category-row"><span>${escapeHtml(category.name)}</span><span class="category-track"><span class="category-fill" style="display:block;width:${Math.round(category.count / max * 100)}%"></span></span><span class="category-count">${category.count}</span></div>`).join("") || `<div class="empty-state">Belum ada data kategori.</div>`}</div></section>
      <section class="panel attention-panel"><span class="attention-mark">↗</span><div><h3>${low + out ? `${low + out} barang perlu ditinjau` : "Stok dalam kondisi baik"}</h3><p>${low + out ? "Periksa daftar stok menipis agar perlengkapan penting tetap tersedia." : "Belum ada barang di bawah batas minimum."}</p><button class="text-link" data-view="inventory">Buka persediaan →</button></div></section></div>`;
}

function activityItems(movements) {
  if (!movements.length) return `<div class="empty-state">Belum ada perubahan stok tercatat.</div>`;
  return movements.map((movement) => {
    const incoming = movement.movement_type === "in";
    const document = movement.document || {};
    return `<div class="activity-item"><span class="activity-mark ${incoming ? "" : "out"}">${incoming ? "↓" : "↑"}</span><span style="min-width:0;flex:1"><span class="activity-name">${escapeHtml(movement.product_name)}</span><span class="activity-meta">${escapeHtml(documentTypeLabels[document.document_type] || "Penyesuaian")} · ${escapeHtml(document.document_no || "-")} · ${formatDate(document.document_date || movement.created_at)}</span></span><span class="activity-quantity ${incoming ? "" : "out"}">${incoming ? "+" : "−"}${formatNumber(movement.quantity)}</span></div>`;
  }).join("");
}

function inventoryView() {
  const matching = state.products.filter((product) => `${product.name} ${product.brand} ${product.sku} ${product.category} ${product.supplier}`.toLowerCase().includes(state.search.toLowerCase()) && (state.category === "Semua kategori" || product.category === state.category) && (state.brand === "Semua merek" || product.brand === state.brand));
  const addProduct = state.role === "manager" ? `<button class="button button-primary" data-action="product"><span class="button-icon">＋</span>Tambah barang</button>` : "";
  return `${pageHeading("Katalog barang", "Persediaan", `${formatNumber(state.products.length)} barang · saldo awal demo, verifikasi fisik sebelum operasional · harga jual hanya referensi.`, addProduct)}
    <div class="toolbar"><label class="search-wrap"><span class="search-icon">⌕</span><input class="field" id="inventory-search" type="search" placeholder="Cari nama, merek, SKU, atau pemasok..." value="${escapeHtml(state.search)}" /></label><select class="select-field filter-select" id="category-filter" aria-label="Filter kategori">${categoryNames().map((category) => `<option ${state.category === category ? "selected" : ""}>${escapeHtml(category)}</option>`).join("")}</select><select class="select-field filter-select" id="brand-filter" aria-label="Filter merek">${brandNames().map((brand) => `<option ${state.brand === brand ? "selected" : ""}>${escapeHtml(brand)}</option>`).join("")}</select></div>
    <section class="panel table-panel"><div class="table-wrap"><table><thead><tr><th>Nama barang</th><th>Merek</th><th>Kategori</th><th>Pemasok</th><th>Harga jual · info</th><th>Stok</th><th>Status</th><th>Aksi</th></tr></thead><tbody>${productRows(matching)}</tbody></table></div></section>`;
}

function movementsView() {
  const docs = state.documents.filter((doc) => doc.document_no !== "SALDO-AWAL-SKEMA-V1").slice().reverse();
  const createAction = state.role === "employee" ? `<button class="button button-primary" data-action="document"><span class="button-icon">＋</span>Buat dokumen</button>` : "";
  return `${pageHeading("Pencatatan barang", "Dokumen stok", "Dokumen baru menunggu pemeriksaan SPV sebelum mengubah saldo dan kartu gudang.", createAction)}
    <section class="panel table-panel"><div class="table-wrap"><table><thead><tr><th>Tanggal</th><th>Nomor dokumen</th><th>Jenis</th><th>Status</th><th>Vendor / mitra</th><th>Lokasi beli</th><th>Diterima oleh</th><th>Dicatat oleh</th><th>Diproses oleh</th><th>Jumlah barang</th></tr></thead><tbody>${docs.length ? docs.map((doc) => `<tr><td>${formatDate(doc.document_date)}</td><td><span class="product-name">${escapeHtml(doc.document_no)}</span></td><td>${escapeHtml(documentTypeLabels[doc.document_type] || doc.document_type)}</td><td>${escapeHtml(documentStatusLabels[doc.status] || "Disetujui")}${doc.rejection_reason ? `<span class="product-sku">${escapeHtml(doc.rejection_reason)}</span>` : ""}</td><td>${escapeHtml(doc.partner_name || "-")}</td><td>${escapeHtml(doc.purchase_location || "-")}</td><td>${escapeHtml(doc.received_by || doc.handled_by || "-")}</td><td>${escapeHtml(doc.recorded_by_name || "-")}</td><td>${escapeHtml(doc.approved_by_email || doc.rejected_by_email || "-")}</td><td>${formatNumber(doc.stock_document_lines?.length || 0)} jenis</td></tr>`).join("") : `<tr><td class="empty-state" colspan="10">Belum ada dokumen barang.</td></tr>`}</tbody></table></div></section>`;
}

function stocktakeView() {
  const docs = state.documents.filter((doc) => doc.document_type === "stocktake").slice().reverse();
  const createAction = state.role === "employee" ? `<button class="button button-primary" data-action="stocktake"><span class="button-icon">＋</span>Catat stok opname</button>` : "";
  return `${pageHeading("Hitung fisik dan selisih", "Stok opname", "Stok fisik dikirim untuk persetujuan; saldo baru berubah setelah disetujui.", createAction)}
    <section class="panel table-panel"><div class="table-wrap"><table><thead><tr><th>Tanggal</th><th>Merek / barang</th><th>Status</th><th>Stok sistem</th><th>Stok fisik</th><th>Selisih</th><th>Penghitung fisik</th><th>Penanggung jawab opname</th><th>Dicatat oleh</th><th>Diproses oleh</th></tr></thead><tbody>${docs.length ? docs.flatMap((doc) => (doc.stock_document_lines || []).map((line) => {
      const product = state.products.find((item) => item.id === line.product_id);
      const difference = Number(line.difference || 0);
      const currentStock = Number(product?.stock);
      const stockChanged = doc.status === "pending" && Number.isFinite(currentStock) && currentStock !== Number(line.system_stock);
      return `<tr><td>${formatDate(doc.document_date)}</td><td><span class="product-name">${escapeHtml(product?.brand ? `${product.brand} · ${product.name}` : product?.name || "Barang")}</span><span class="product-sku">${escapeHtml(product?.sku || doc.document_no)}</span></td><td>${escapeHtml(documentStatusLabels[doc.status] || "Disetujui")}</td><td>${formatNumber(line.system_stock)}${stockChanged ? `<span class="product-sku">Kini ${formatNumber(currentStock)} · hitung ulang</span>` : ""}</td><td>${formatNumber(line.physical_stock)}</td><td><span class="status-pill ${difference < 0 ? "low" : ""}">${difference > 0 ? "+" : ""}${formatNumber(difference)}</span></td><td>${escapeHtml(line.counted_by || "-")}</td><td>${escapeHtml(doc.handled_by || "-")}</td><td>${escapeHtml(doc.recorded_by_name || "-")}</td><td>${escapeHtml(doc.approved_by_email || doc.rejected_by_email || "-")}</td></tr>`;
    })).join("") : `<tr><td class="empty-state" colspan="10">Belum ada hasil stok opname.</td></tr>`}</tbody></table></div></section>`;
}

function approvalsView() {
  const pending = state.documents.filter((doc) => doc.status === "pending");
  return `${pageHeading("Pemeriksaan independen", "Persetujuan dokumen", "SPV meninjau dokumen karyawan. Pencatat tidak dapat menyetujui dokumennya sendiri.")}
    <section class="panel table-panel"><div class="table-wrap"><table><thead><tr><th>Tanggal</th><th>No. dokumen / jenis</th><th>Barang</th><th>Vendor / lokasi</th><th>Diterima oleh</th><th>Dibuat oleh</th><th>Aksi</th></tr></thead><tbody>${pending.length ? pending.map((doc) => {
      const products = (doc.stock_document_lines || []).map((line) => {
        const product = state.products.find((item) => item.id === line.product_id);
        if (doc.document_type === "stocktake") {
          const difference = Number(line.difference || 0);
          const currentStock = Number(product?.stock);
          const stockChanged = Number.isFinite(currentStock) && currentStock !== Number(line.system_stock);
          return `${product?.name || "Barang"} (sistem ${formatNumber(line.system_stock)}${stockChanged ? `; terkini ${formatNumber(currentStock)}` : ""} → fisik ${formatNumber(line.physical_stock)}; selisih ${difference > 0 ? "+" : ""}${formatNumber(difference)}; dihitung ${line.counted_by || "-"})`;
        }
        return `${product?.name || "Barang"} (${formatNumber(line.quantity)} ${product?.unit || ""})`;
      }).join(", ");
      const isOwnDocument = doc.recorded_by === currentUser.id;
      const hasStaleStocktake = doc.document_type === "stocktake" && (doc.stock_document_lines || []).some((line) => {
        const product = state.products.find((item) => item.id === line.product_id);
        return product && Number(product.stock) !== Number(line.system_stock);
      });
      return `<tr><td>${formatDate(doc.document_date)}</td><td><span class="product-name">${escapeHtml(doc.document_no)}</span><span class="product-sku">${escapeHtml(documentTypeLabels[doc.document_type] || doc.document_type)}</span></td><td>${escapeHtml(products || "-")}</td><td>${escapeHtml(doc.partner_name || "-")}${doc.purchase_location ? `<span class="product-sku">${escapeHtml(doc.purchase_location)}</span>` : ""}</td><td>${escapeHtml(doc.received_by || doc.handled_by || "-")}</td><td>${escapeHtml(doc.recorded_by_email || "-")}</td><td><div class="approval-actions"><button class="button button-primary" data-approve-document="${escapeHtml(doc.id)}" ${isOwnDocument || hasStaleStocktake ? "disabled" : ""}>Setujui</button><button class="button button-secondary" data-reject-document="${escapeHtml(doc.id)}" ${isOwnDocument ? "disabled" : ""}>Tolak</button></div>${hasStaleStocktake ? `<span class="product-sku">Saldo berubah; minta opname ulang</span>` : isOwnDocument ? `<span class="product-sku">Anda pencatat dokumen ini</span>` : ""}</td></tr>`;
    }).join("") : `<tr><td class="empty-state" colspan="7">Tidak ada dokumen yang menunggu persetujuan.</td></tr>`}</tbody></table></div></section>`;
}

function usersView() {
  return `${pageHeading("Administrasi akses", "Pengguna & role", "Akun baru otomatis menjadi karyawan. Manager menetapkan role sesuai pemisahan tugas.")}
    <section class="panel table-panel"><div class="table-wrap"><table><thead><tr><th>Nama</th><th>Email</th><th>Role</th><th>Status</th><th>Aksi</th></tr></thead><tbody>${state.profiles.map((profile) => {
      const isSelf = profile.user_id === currentUser.id;
      return `<tr><td>${escapeHtml(profile.display_name || "-")}${isSelf ? `<span class="product-sku">Akun Anda</span>` : ""}</td><td>${escapeHtml(profile.email)}</td><td><select class="select-field role-select" data-user-role="${escapeHtml(profile.user_id)}" ${isSelf ? "disabled" : ""}>${Object.entries(roleLabels).map(([role, label]) => `<option value="${role}" ${profile.role === role ? "selected" : ""}>${label}</option>`).join("")}</select></td><td><label class="active-toggle"><input type="checkbox" data-user-active="${escapeHtml(profile.user_id)}" ${profile.is_active ? "checked" : ""} ${isSelf ? "disabled" : ""} />Aktif</label></td><td><button class="row-action" data-save-user-role="${escapeHtml(profile.user_id)}" ${isSelf ? "disabled" : ""}>Simpan perubahan</button></td></tr>`;
    }).join("") || `<tr><td class="empty-state" colspan="5">Belum ada akun.</td></tr>`}</tbody></table></div></section>`;
}

function warehouseCardView() {
  const product = state.products.find((item) => item.id === state.cardProduct);
  const entries = product ? state.cardEntries.filter((entry) => entry.product_id === product.id).slice().reverse() : [];
  return `${pageHeading("Kartu persediaan per barang", "Kartu gudang", "Riwayat barang masuk/keluar dan saldo berjalan; siap dicetak sebagai output gudang.", `<button class="button button-secondary" type="button" data-action="print-card" ${product ? "" : "disabled"}>Cetak kartu</button>`)}
    <div class="toolbar"><label class="form-field"><span>Pilih barang</span><select class="select-field" id="card-product"><option value="">Pilih barang untuk melihat kartu</option>${state.products.map((item) => `<option value="${escapeHtml(item.id)}" ${item.id === state.cardProduct ? "selected" : ""}>${escapeHtml(item.brand || "Tanpa merek")} · ${escapeHtml(item.name)} · ${escapeHtml(item.sku)}</option>`).join("")}</select></label></div>
    ${product ? `<section class="panel table-panel card-print-area"><div class="panel-header"><div><h2 class="panel-title">${escapeHtml(product.name)} · ${escapeHtml(product.sku)}</h2><p class="panel-description">Merek: ${escapeHtml(product.brand || "-")} · Satuan: ${escapeHtml(product.unit || "pcs")} · Saldo saat ini: ${formatNumber(product.stock)}</p></div></div><div class="table-wrap"><table><thead><tr><th>Tanggal</th><th>No. dokumen</th><th>Keterangan</th><th>Masuk</th><th>Keluar</th><th>Saldo</th></tr></thead><tbody>${entries.length ? entries.map((entry) => {
      const doc = entry.document || {};
      const line = (state.documents.find((item) => item.id === entry.document_id)?.stock_document_lines || []).find((item) => item.product_id === product.id);
      const note = doc.document_type === "purchase"
        ? `Vendor: ${doc.partner_name || "-"} · Lokasi: ${doc.purchase_location || "-"} · Terima: ${doc.received_by || "-"} · Input: ${doc.recorded_by_email || "-"} · Setuju: ${doc.approved_by_email || "-"}`
        : doc.document_type === "stocktake" && line
          ? `Opname: sistem ${formatNumber(line.system_stock)}, fisik ${formatNumber(line.physical_stock)}, selisih ${Number(line.difference) > 0 ? "+" : ""}${formatNumber(line.difference)} · dihitung ${line.counted_by || "-"} · pelaksana ${doc.handled_by || "-"} · input ${doc.recorded_by_email || "-"} · setuju ${doc.approved_by_email || "-"}`
          : doc.partner_name || doc.note || "-";
      return `<tr><td>${formatDate(doc.document_date || entry.created_at)}</td><td>${escapeHtml(doc.document_no || "-")}</td><td>${escapeHtml(documentTypeLabels[doc.document_type] || "Perubahan stok")} · ${escapeHtml(note)}</td><td>${entry.movement_type === "in" ? formatNumber(entry.quantity) : "-"}</td><td>${entry.movement_type === "out" ? formatNumber(entry.quantity) : "-"}</td><td>${formatNumber(entry.stock_after)}</td></tr>`;
    }).join("") : `<tr><td class="empty-state" colspan="6">Belum ada perubahan saldo untuk barang ini.</td></tr>`}</tbody></table></div></section>` : `<section class="panel"><div class="empty-state">Pilih barang untuk menampilkan kartu gudang.</div></section>`}`;
}

function reportsView() {
  const products = state.products;
  const totalUnits = products.reduce((sum, product) => sum + Number(product.stock || 0), 0);
  const categories = [...new Set(products.map((product) => product.category).filter(Boolean))];
  const brands = [...new Set(products.map((product) => product.brand).filter(Boolean))];
  const filters = state.reportFilters;
  const reportDocuments = state.documents.filter((doc) =>
    doc.document_no !== "SALDO-AWAL-SKEMA-V1" &&
    doc.status === "approved" &&
    (filters.type === "all" || doc.document_type === filters.type) &&
    (!filters.from || doc.document_date >= filters.from) &&
    (!filters.to || doc.document_date <= filters.to)).slice().reverse();
  const query = filters.search.trim().toLowerCase();
  const reportRows = reportDocuments.flatMap((doc) => (doc.stock_document_lines || []).flatMap((line) => {
    const product = products.find((item) => item.id === line.product_id);
    const entry = state.cardEntries.find((item) => item.document_line_id === line.id);
    const haystack = `${doc.document_no} ${doc.partner_name || ""} ${doc.purchase_location || ""} ${doc.received_by || ""} ${doc.recorded_by_name || ""} ${product?.name || ""} ${product?.brand || ""} ${product?.sku || ""}`.toLowerCase();
    if (query && !haystack.includes(query)) return [];
    const incoming = entry?.movement_type === "in" ? Number(entry.quantity) : 0;
    const outgoing = entry?.movement_type === "out" ? Number(entry.quantity) : 0;
    const afterStock = line.physical_stock !== null && line.physical_stock !== undefined
      ? Number(line.physical_stock)
      : entry ? Number(entry.stock_after) : Number(line.system_stock || 0) + incoming - outgoing;
    return [`<tr><td>${formatDate(doc.document_date)}</td><td><span class="product-name">${escapeHtml(doc.document_no)}</span><span class="product-sku">${escapeHtml(documentTypeLabels[doc.document_type] || doc.document_type)}</span></td><td><span class="product-name">${escapeHtml(product?.brand ? `${product.brand} · ${product.name}` : product?.name || "Barang")}</span><span class="product-sku">${escapeHtml(product?.sku || "-")}</span></td><td>${formatNumber(line.system_stock)}</td><td>${incoming ? formatNumber(incoming) : "-"}</td><td>${outgoing ? formatNumber(outgoing) : "-"}</td><td>${formatNumber(afterStock)}</td><td>${escapeHtml(doc.partner_name || "-")}${doc.purchase_location ? `<span class="product-sku">${escapeHtml(doc.purchase_location)}</span>` : ""}</td><td>${escapeHtml(doc.received_by || "-")}</td><td>${escapeHtml(doc.recorded_by_name || "-")}</td><td>${escapeHtml(doc.approved_by_email || "-")}</td></tr>`];
  }));
  const reportRowsHtml = reportRows.join("");
  const purchaseDocuments = state.documents.filter((doc) => doc.document_type === "purchase" && doc.status === "approved");
  const purchasedUnits = purchaseDocuments.reduce((sum, doc) =>
    sum + (doc.stock_document_lines || []).reduce((lineSum, line) => lineSum + Number(line.quantity || 0), 0), 0);
  return `${pageHeading("Analisis persediaan", "Laporan", "Saldo dan pergerakan stok, vendor/lokasi pembelian, penerima barang, serta pencatat.")}
    <div class="report-grid"><section class="panel report-card"><h2 class="panel-title">Ringkasan stok</h2><div class="report-stat"><span>Total jenis barang</span><strong>${formatNumber(products.length)}</strong></div><div class="report-stat"><span>Total unit tersedia</span><strong>${formatNumber(totalUnits)}</strong></div><div class="report-stat"><span>Merek terdaftar</span><strong>${formatNumber(brands.length)}</strong></div><div class="report-stat"><span>Stok menipis atau habis</span><strong>${formatNumber(products.filter((product) => product.stock <= product.min_stock).length)}</strong></div></section>
    <section class="panel report-card"><h2 class="panel-title">Komposisi katalog</h2>${categories.map((category) => `<div class="report-stat"><span>${escapeHtml(category)}</span><strong>${formatNumber(products.filter((product) => product.category === category).length)} barang</strong></div>`).join("") || `<p class="page-subtitle">Belum ada data kategori.</p>`}</section>
    <section class="panel report-card"><h2 class="panel-title">Dokumen persediaan</h2><div class="report-stat"><span>Dokumen tercatat</span><strong>${formatNumber(state.documents.filter((doc) => doc.document_no !== "SALDO-AWAL-SKEMA-V1").length)}</strong></div><div class="report-stat"><span>Dokumen pembelian</span><strong>${formatNumber(purchaseDocuments.length)}</strong></div><div class="report-stat"><span>Unit masuk dari pembelian</span><strong>${formatNumber(purchasedUnits)}</strong></div><div class="report-stat"><span>Stok opname</span><strong>${formatNumber(state.documents.filter((doc) => doc.document_type === "stocktake").length)}</strong></div></section></div>
    <div class="report-toolbar">
      <label class="form-field"><span>Cari barang, vendor, atau dokumen</span><input class="field" id="report-search" type="search" value="${escapeHtml(filters.search)}" placeholder="Nama barang, SKU, vendor..." /></label>
      <label class="form-field"><span>Jenis dokumen</span><select class="select-field" id="report-type"><option value="all" ${filters.type === "all" ? "selected" : ""}>Semua jenis</option>${Object.entries(documentTypeLabels).filter(([type]) => type !== "opening").map(([type, label]) => `<option value="${type}" ${filters.type === type ? "selected" : ""}>${escapeHtml(label)}</option>`).join("")}</select></label>
      <label class="form-field"><span>Dari tanggal</span><input class="field" id="report-from" type="date" value="${escapeHtml(filters.from)}" /></label>
      <label class="form-field"><span>Sampai tanggal</span><input class="field" id="report-to" type="date" value="${escapeHtml(filters.to)}" /></label>
      <button class="button button-primary" type="button" id="apply-report-filter">Terapkan</button>
      <button class="button button-secondary" type="button" id="print-report">Cetak laporan</button>
    </div>
    <section class="panel table-panel report-print-area"><div class="panel-header"><div><h2 class="panel-title">Riwayat pergerakan persediaan</h2><p class="panel-description">${formatNumber(reportRows.length)} baris · hanya dokumen yang disetujui; saldo belum berubah untuk dokumen menunggu.</p></div></div><div class="table-wrap"><table><thead><tr><th>Tanggal</th><th>Dokumen / jenis</th><th>Barang / SKU</th><th>Stok sistem</th><th>Masuk</th><th>Keluar</th><th>Saldo akhir</th><th>Vendor / lokasi</th><th>Diterima oleh</th><th>Dicatat oleh</th><th>Disetujui oleh</th></tr></thead><tbody>${reportRowsHtml || `<tr><td class="empty-state" colspan="11">Tidak ada pergerakan yang cocok dengan filter.</td></tr>`}</tbody></table></div></section>`;
}

function render() {
  const views = { dashboard: dashboardView, inventory: inventoryView, movements: movementsView, stocktake: stocktakeView, "warehouse-card": warehouseCardView, reports: reportsView, approvals: approvalsView, users: usersView };
  const labels = { dashboard: "Ringkasan", inventory: "Persediaan", movements: "Dokumen stok", stocktake: "Stok opname", "warehouse-card": "Kartu gudang", reports: "Laporan stok", approvals: "Persetujuan", users: "Pengguna & role" };
  if (!canAccessView(state.view)) state.view = "dashboard";
  content.innerHTML = views[state.view]();
  document.querySelector("#breadcrumb-current").textContent = labels[state.view];
  document.querySelectorAll(".nav-item").forEach((item) => item.classList.toggle("is-active", item.dataset.view === state.view));
  document.querySelector('[data-view="reports"]').hidden = !["manager", "supervisor"].includes(state.role);
  document.querySelector('[data-view="approvals"]').hidden = state.role !== "supervisor";
  document.querySelector('[data-view="users"]').hidden = state.role !== "manager";
  bindViewControls();
}

function canAccessView(view) {
  const viewsByRole = {
    employee: ["dashboard", "inventory", "movements", "stocktake", "warehouse-card"],
    supervisor: ["dashboard", "inventory", "movements", "stocktake", "warehouse-card", "reports", "approvals"],
    manager: ["dashboard", "inventory", "movements", "stocktake", "warehouse-card", "reports", "users"],
  };
  return viewsByRole[state.role]?.includes(view) || false;
}

function bindViewControls() {
  content.querySelectorAll("[data-view]").forEach((button) => button.addEventListener("click", () => setView(button.dataset.view)));
  content.querySelectorAll("[data-action]:not([data-action='print-card'])").forEach((button) => button.addEventListener("click", () => openModal(button.dataset.action)));
  content.querySelectorAll("[data-move-product]").forEach((button) => button.addEventListener("click", () => openModal("document", button.dataset.moveProduct)));
  const search = document.querySelector("#inventory-search");
  if (search) search.addEventListener("input", (event) => { state.search = event.target.value; const cursor = event.target.selectionStart; render(); const nextSearch = document.querySelector("#inventory-search"); nextSearch.focus(); nextSearch.setSelectionRange(cursor, cursor); });
  const filter = document.querySelector("#category-filter");
  if (filter) filter.addEventListener("change", (event) => { state.category = event.target.value; render(); });
  const brandFilter = document.querySelector("#brand-filter");
  if (brandFilter) brandFilter.addEventListener("change", (event) => { state.brand = event.target.value; render(); });
  const cardProduct = document.querySelector("#card-product");
  if (cardProduct) cardProduct.addEventListener("change", (event) => { state.cardProduct = event.target.value; render(); });
  content.querySelector("[data-action='print-card']")?.addEventListener("click", () => window.print());
  const applyReportFilter = document.querySelector("#apply-report-filter");
  if (applyReportFilter) applyReportFilter.addEventListener("click", () => {
    state.reportFilters = {
      type: document.querySelector("#report-type").value,
      from: document.querySelector("#report-from").value,
      to: document.querySelector("#report-to").value,
      search: document.querySelector("#report-search").value.trim(),
    };
    render();
  });
  content.querySelector("#print-report")?.addEventListener("click", () => window.print());
  content.querySelectorAll("[data-approve-document]").forEach((button) => button.addEventListener("click", () => processDocument(button.dataset.approveDocument, "approve")));
  content.querySelectorAll("[data-reject-document]").forEach((button) => button.addEventListener("click", () => {
    const reason = window.prompt("Tuliskan alasan penolakan dokumen:");
    if (reason?.trim()) processDocument(button.dataset.rejectDocument, "reject", reason.trim());
  }));
  content.querySelectorAll("[data-save-user-role]").forEach((button) => button.addEventListener("click", () => saveUserRole(button.dataset.saveUserRole)));
}

async function processDocument(documentId, action, reason = "") {
  let processed = false;
  try {
    await backendRequest(`rpc/${action === "approve" ? "approve_stock_document" : "reject_stock_document"}`, {
      method: "POST",
      body: action === "approve" ? { p_document_id: documentId } : { p_document_id: documentId, p_reason: reason },
    });
    processed = true;
    await loadRemoteData();
    render();
    showToast(action === "approve" ? "Dokumen disetujui dan saldo diperbarui." : "Dokumen ditolak; saldo tidak berubah.");
  } catch (error) {
    if (processed) {
      renderBackendError(new Error(`Dokumen sudah diproses, tetapi data terbaru gagal dimuat: ${error.message}`));
    } else {
      showToast(error.message || "Dokumen tidak dapat diproses.", true);
    }
  }
}

async function saveUserRole(userId) {
  const role = content.querySelector(`[data-user-role="${userId}"]`).value;
  const isActive = content.querySelector(`[data-user-active="${userId}"]`).checked;
  let saved = false;
  try {
    await backendRequest("rpc/set_user_role", {
      method: "POST",
      body: { p_user_id: userId, p_role: role, p_is_active: isActive },
    });
    saved = true;
    await loadRemoteData();
    render();
    showToast("Role dan status akun diperbarui.");
  } catch (error) {
    if (saved) {
      renderBackendError(new Error(`Perubahan role tersimpan, tetapi daftar pengguna gagal dimuat: ${error.message}`));
    } else {
      showToast(error.message || "Role akun tidak dapat diubah.", true);
    }
  }
}

function setView(view) {
  if (!canAccessView(view)) {
    showToast("Role Anda tidak memiliki akses ke menu tersebut.", true);
    return;
  }
  state.view = view;
  render();
  closeSidebar();
}

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[character]);
}

function openModal(type, selectedProduct = "") {
  const isProduct = type === "product";
  const isStocktake = type === "stocktake";
  const lineMarkup = (isFirst = false) => `<div class="document-line form-grid"><div class="form-field"><label>Barang</label><select class="select-field" name="product_id" required><option value="">Pilih barang</option>${state.products.map((product, index) => `<option value="${escapeHtml(product.id)}" ${isFirst && (selectedProduct ? product.id === selectedProduct : index === 0) ? "selected" : ""}>${escapeHtml(product.brand || "Tanpa merek")} · ${escapeHtml(product.name)} · ${escapeHtml(product.sku)} (stok ${formatNumber(product.stock)})</option>`).join("")}</select></div><div class="form-field"><label>${isStocktake ? "Stok fisik" : "Jumlah"}</label><input class="field" name="${isStocktake ? "physical_stock" : "quantity"}" type="number" min="${isStocktake ? 0 : 1}" step="1" value="${isStocktake ? "" : 1}" required /></div>${isStocktake ? `<div class="form-field"><label>Dihitung oleh</label><input class="field" name="counted_by" required placeholder="Nama penghitung" /></div>` : ""}<button class="row-action remove-document-line" type="button" aria-label="Hapus baris" ${isFirst ? "hidden" : ""}>Hapus</button></div>`;
  const categoryOptions = [...new Set(state.products.map((product) => product.category).filter(Boolean))].map((category) => `<option>${escapeHtml(category)}</option>`).join("");
  const brandOptions = [...new Set(state.products.map((product) => product.brand).filter(Boolean))].map((brand) => `<option>${escapeHtml(brand)}</option>`).join("");
  const supplierOptions = [...new Set(state.products.map((product) => product.supplier).filter(Boolean))].map((supplier) => `<option>${escapeHtml(supplier)}</option>`).join("");
  const today = new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, 10);
  const defaultNumber = `${isStocktake ? "SO" : "DOC"}-${today.replace(/-/g, "")}-${String(Date.now()).slice(-6)}`;
  const title = isProduct ? "Tambah barang" : isStocktake ? "Stok opname" : "Dokumen persediaan";
  const documentForm = `<div class="form-grid"><div class="form-field"><label for="document-type">Jenis dokumen</label><select class="select-field" id="document-type" name="document_type" ${isStocktake ? "disabled" : ""}>${isStocktake ? `<option value="stocktake" selected>Stok opname · penyesuaian</option>` : `<option value="opening">Saldo awal · barang masuk</option><option value="purchase">Pembelian · barang masuk</option><option value="sale">Penjualan · barang keluar</option><option value="purchase_return">Retur pembelian · barang keluar</option><option value="sales_return">Retur penjualan · barang masuk</option>`}</select>${isStocktake ? `<input type="hidden" name="document_type" value="stocktake" />` : ""}</div><div class="form-field"><label for="document-date">Tanggal</label><input class="field" id="document-date" name="document_date" type="date" value="${today}" required /></div></div>
    <div class="form-field"><label for="document-number">Nomor dokumen</label><input class="field" id="document-number" name="document_no" value="${defaultNumber}" required /></div>
    <p class="panel-description">${isStocktake ? "Stok sistem akan direkam saat dokumen disimpan. Selisih fisik menjadi penyesuaian saldo." : "Dokumen ini mencatat jumlah barang, bukan nilai pembelian/penjualan."}</p><div id="document-lines">${lineMarkup(true)}</div><button class="text-link" type="button" id="add-document-line">＋ Tambah barang</button>
    ${isStocktake ? `<div class="form-field"><label for="handled-by">Stok opname dilakukan oleh</label><input class="field" id="handled-by" name="handled_by" required placeholder="Nama penanggung jawab opname" /></div>` : `<fieldset class="document-fields" id="general-document-fields"><div class="form-grid"><div class="form-field"><label for="document-partner">Pemasok / pembeli (opsional)</label><input class="field" id="document-partner" name="partner_name" placeholder="Nama pihak terkait" /></div><div class="form-field"><label for="handled-by">Petugas gudang</label><input class="field" id="handled-by" name="handled_by" placeholder="Nama petugas (opsional)" /></div></div></fieldset><fieldset class="document-fields" id="purchase-fields" disabled hidden><div class="form-grid"><div class="form-field"><label for="purchase-vendor">Vendor / toko tempat membeli</label><input class="field" id="purchase-vendor" name="partner_name" required placeholder="Contoh: Toko Olahraga Jaya" /></div><div class="form-field"><label for="purchase-location">Lokasi / kanal pembelian</label><input class="field" id="purchase-location" name="purchase_location" required placeholder="Contoh: Bandung atau Tokopedia" /></div></div><div class="form-field"><label for="received-by">Diterima oleh</label><input class="field" id="received-by" name="received_by" required placeholder="Nama petugas yang menerima barang" /></div></fieldset>`}
    <div class="auth-identity-note">Dicatat otomatis sebagai <strong>${escapeHtml(currentProfile?.email || currentUser?.email || "akun login")}</strong> saat dokumen dikirim.</div>
    <div class="form-field"><label for="document-note">Catatan persediaan</label><input class="field" id="document-note" name="note" placeholder="Catatan barang atau dokumen" /></div>`;
  document.querySelector("#modal-root").innerHTML = `<div class="modal-backdrop" data-dismiss="true"><section class="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title"><header class="modal-header"><div><h2 id="modal-title">${title}</h2><p>${isProduct ? "Merek dan harga jual hanya menjadi informasi katalog." : isStocktake ? "Stok sistem dan selisih akan dicatat otomatis." : "Catat pergerakan barang saja, tanpa nilai transaksi."}</p></div><button class="modal-close" type="button" data-close aria-label="Tutup">×</button></header>
    <form class="modal-form" id="modal-form">${isProduct ? `<div class="form-field"><label for="product-name">Nama barang dan varian</label><input class="field" id="product-name" name="name" required placeholder="Contoh: Raket Badminton · 4U/G5" /></div><div class="form-grid"><div class="form-field"><label for="product-brand">Merek</label><input class="field" id="product-brand" name="brand" list="brand-list" required placeholder="Contoh: Yonex" /><datalist id="brand-list">${brandOptions}</datalist></div><div class="form-field"><label for="product-sku">SKU / kode barang</label><input class="field" id="product-sku" name="sku" required placeholder="BDM-014" /></div></div><div class="form-grid"><div class="form-field"><label for="product-category">Kategori</label><input class="field" id="product-category" name="category" list="category-list" required placeholder="Contoh: Raket" /><datalist id="category-list">${categoryOptions}</datalist></div><div class="form-field"><label for="product-unit">Satuan</label><input class="field" id="product-unit" name="unit" value="pcs" required /></div></div><div class="form-grid"><div class="form-field"><label for="product-price">Harga jual · referensi saja</label><input class="field" id="product-price" name="selling_price" type="number" min="0" step="1" placeholder="450000" /><span class="form-hint">Tidak digunakan untuk HPP atau perhitungan transaksi.</span></div><div class="form-field"><label for="product-min">Batas minimum stok</label><input class="field" id="product-min" name="min_stock" type="number" min="0" value="8" required /></div></div><div class="form-field"><label for="product-supplier">Pemasok <span class="optional-label">opsional</span></label><input class="field" id="product-supplier" name="supplier" list="supplier-list" placeholder="Tambahkan bila diketahui" /><datalist id="supplier-list">${supplierOptions}</datalist></div>` : documentForm}
    <div class="modal-actions"><button class="button button-secondary" type="button" data-close>Batal</button><button class="button button-primary" type="submit">${isProduct ? "Simpan barang" : isStocktake ? "Simpan hasil opname" : "Simpan dokumen"}</button></div></form></section></div>`;
  const modalRoot = document.querySelector("#modal-root");
  modalRoot.querySelectorAll("[data-close], [data-dismiss]").forEach((element) => element.addEventListener("click", (event) => { if (element.hasAttribute("data-close") || event.target === element) modalRoot.innerHTML = ""; }));
  modalRoot.querySelector("#modal-form").addEventListener("submit", (event) => submitModal(event, type));
  const documentType = modalRoot.querySelector("#document-type");
  const purchaseFields = modalRoot.querySelector("#purchase-fields");
  const generalFields = modalRoot.querySelector("#general-document-fields");
  const syncPurchaseFields = () => {
    if (!purchaseFields) return;
    const isPurchase = documentType.value === "purchase";
    purchaseFields.hidden = !isPurchase;
    purchaseFields.disabled = !isPurchase;
    if (generalFields) {
      generalFields.hidden = isPurchase;
      generalFields.disabled = isPurchase;
    }
  };
  documentType?.addEventListener("change", syncPurchaseFields);
  syncPurchaseFields();
  modalRoot.querySelector(isProduct ? "#product-name" : "[name='product_id']")?.focus();
  modalRoot.querySelector("#add-document-line")?.addEventListener("click", () => {
    modalRoot.querySelector("#document-lines").insertAdjacentHTML("beforeend", lineMarkup());
    modalRoot.querySelector("#document-lines .document-line:last-child [name='product_id']")?.focus();
  });
  modalRoot.querySelector("#document-lines")?.addEventListener("click", (event) => {
    const removeButton = event.target.closest(".remove-document-line");
    if (removeButton) removeButton.closest(".document-line").remove();
  });
}

async function submitModal(event, type) {
  event.preventDefault();
  const form = event.currentTarget;
  const submitButton = form.querySelector("button[type='submit']");
  submitButton.disabled = true;
  const isProduct = type === "product";
  const values = Object.fromEntries(new FormData(form));
  let saved = false;
  try {
    if (isProduct) {
      const sku = values.sku.trim();
      const sellingPrice = values.selling_price ? Number(values.selling_price) : null;
      const minStock = Number(values.min_stock);
      if (sellingPrice !== null && (!Number.isSafeInteger(sellingPrice) || sellingPrice < 0)) {
        throw new Error("Harga jual referensi harus berupa angka rupiah nol atau lebih.");
      }
      if (!Number.isInteger(minStock) || minStock < 0) {
        throw new Error("Batas minimum stok harus berupa bilangan bulat nol atau lebih.");
      }
      if (state.products.some((product) => product.sku.toLowerCase() === sku.toLowerCase())) {
        throw new Error("SKU sudah digunakan. Gunakan SKU yang berbeda.");
      }
      const categoryName = values.category.trim();
      const supplierName = values.supplier.trim();
      let category = state.categories.find((item) => item.name.toLowerCase() === categoryName.toLowerCase());
      if (!category) {
        const result = await backendRequest("categories?on_conflict=name", { method: "POST", body: { name: categoryName }, prefer: "resolution=merge-duplicates,return=representation" });
        category = result[0];
      }
      let supplier = state.suppliers.find((item) => item.name.toLowerCase() === supplierName.toLowerCase());
      if (supplierName && !supplier) {
        const result = await backendRequest("suppliers?on_conflict=name", { method: "POST", body: { name: supplierName }, prefer: "resolution=merge-duplicates,return=representation" });
        supplier = result[0];
      }
      await backendRequest("products", {
        method: "POST",
        body: {
          category_id: category.id,
          supplier_id: supplier?.id || null,
          name: values.name.trim(),
          brand: values.brand.trim(),
          sku,
          unit: values.unit.trim(),
          selling_price: sellingPrice,
          min_stock: minStock,
        },
      });
      saved = true;
    } else {
      const documentType = type === "stocktake" ? "stocktake" : values.document_type;
      if (documentType === "purchase" && (!values.partner_name?.trim() || !values.purchase_location?.trim() || !values.received_by?.trim())) {
        throw new Error("Isi vendor, lokasi/kanal pembelian, dan petugas yang menerima barang.");
      }
      const lines = [...form.querySelectorAll(".document-line")].map((row) => {
        const line = { product_id: row.querySelector("[name='product_id']").value };
        if (documentType === "stocktake") {
          line.physical_stock = Number(row.querySelector("[name='physical_stock']").value);
          line.counted_by = row.querySelector("[name='counted_by']").value.trim();
        } else {
          line.quantity = Number(row.querySelector("[name='quantity']").value);
        }
        return line;
      });
      if (lines.some((line) => !line.product_id) || new Set(lines.map((line) => line.product_id)).size !== lines.length) {
        throw new Error("Pilih barang yang berbeda untuk setiap baris.");
      }
      for (const line of lines) {
        const product = state.products.find((item) => item.id === line.product_id);
        if (!product) throw new Error("Barang pada dokumen tidak ditemukan.");
        if (documentType === "stocktake") {
          if (!Number.isInteger(line.physical_stock) || line.physical_stock < 0 || !line.counted_by) {
            throw new Error("Isi stok fisik dengan bilangan bulat nol atau lebih, dan masukkan nama pencatat hitung.");
          }
        } else if (!Number.isInteger(line.quantity) || line.quantity <= 0) {
          throw new Error("Jumlah barang harus berupa bilangan bulat lebih dari nol.");
        }
      }
      await backendRequest("rpc/record_stock_document", {
        method: "POST",
        body: {
          p_document_no: values.document_no.trim(),
          p_document_type: documentType,
          p_document_date: values.document_date,
          p_partner_name: values.partner_name?.trim() || null,
          p_handled_by: values.handled_by?.trim() || null,
          p_purchase_location: values.purchase_location?.trim() || null,
          p_received_by: values.received_by?.trim() || null,
          p_note: values.note.trim() || null,
          p_lines: lines,
        },
      });
      saved = true;
    }
    await loadRemoteData();
    document.querySelector("#modal-root").innerHTML = "";
    showToast(isProduct ? "Barang berhasil ditambahkan." : "Dokumen dikirim untuk ditinjau; saldo berubah setelah disetujui.");
    render();
  } catch (error) {
    if (saved) {
      document.querySelector("#modal-root").innerHTML = "";
      renderBackendError(new Error(`Data sudah tersimpan, tetapi pembaruan tampilan gagal: ${error.message}`));
    } else {
      showToast(error.message || "Data tidak dapat disimpan.", true);
      submitButton.disabled = false;
    }
  }
}

function showToast(message, isError = false) {
  const toast = document.createElement("div");
  toast.className = `toast${isError ? " error" : ""}`;
  toast.textContent = message;
  document.querySelector("#toast-root").append(toast);
  setTimeout(() => toast.remove(), 3400);
}

function exportLocalData() {
  const backup = JSON.stringify({ version: 1, exported_at: new Date().toISOString(), products: state.products, documents: state.documents, cardEntries: state.cardEntries }, null, 2);
  const url = URL.createObjectURL(new Blob([backup], { type: "application/json" }));
  const link = document.createElement("a");
  link.href = url;
  link.download = `sportstock-cadangan-${new Date().toISOString().slice(0, 10)}.json`;
  link.click();
  URL.revokeObjectURL(url);
  showToast("Cadangan persediaan berhasil diunduh.");
}

const sidebar = document.querySelector("#sidebar");
const mobileBackdrop = document.createElement("div");
mobileBackdrop.className = "mobile-backdrop";
document.body.append(mobileBackdrop);
function closeSidebar() { sidebar.classList.remove("is-open"); mobileBackdrop.classList.remove("is-visible"); }
document.querySelector("#mobile-menu").addEventListener("click", () => { sidebar.classList.add("is-open"); mobileBackdrop.classList.add("is-visible"); });
mobileBackdrop.addEventListener("click", closeSidebar);
document.querySelectorAll(".nav-item").forEach((item) => item.addEventListener("click", () => setView(item.dataset.view)));
document.querySelector("#export-data").addEventListener("click", exportLocalData);
document.querySelector("#sign-out").addEventListener("click", () => signOut());
document.querySelector("#today-label").textContent = new Intl.DateTimeFormat("id-ID", { weekday: "long", day: "numeric", month: "long", year: "numeric" }).format(new Date());
initialize();