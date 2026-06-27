// Product catalog + search for the Folio store.

export const PRODUCTS = [
  { id: 'notebook', name: 'Everyday Notebook', price: 25 },
  { id: 'pen', name: 'Folio Fineliner Pen', price: 12 },
  { id: 'planner', name: 'Weekly Planner', price: 30 },
];

export function searchProducts(query) {
  const q = String(query).trim().toLowerCase();
  return PRODUCTS.filter((p) => p.name.toLowerCase().includes(q));
}
