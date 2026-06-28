// Cart pricing for the Folio demo store.

export const FREE_SHIPPING_THRESHOLD = 50;

const PROMOS = {
  SAVE10: { type: 'percent', value: 0.1 },
  WELCOME5: { type: 'amount', value: 5 },
};

export function subtotal(items) {
  return items.reduce((sum, item) => sum + item.price * item.qty, 0);
}

export function summarize(cart) {
  const sub = subtotal(cart.items);
  const promo = cart.promo ? PROMOS[cart.promo.toUpperCase()] : null;
  const discount = promo
    ? promo.type === 'percent'
      ? sub * promo.value
      : promo.value
    : 0;
  const total = sub - discount;
  // Free shipping is keyed off the pre-discount subtotal, so a promo never adds shipping.
  const shipping = sub >= FREE_SHIPPING_THRESHOLD ? 0 : 5;
  return { subtotal: sub, discount, shipping, total };
}

// Confirmation line the cart shows after a promo is applied.
export function savingsLabel(cart) {
  const promo = cart.promo ? PROMOS[cart.promo.toUpperCase()] : null;
  if (!promo) return '';
  const sub = subtotal(cart.items);
  const amount = promo.type === 'percent' ? sub * promo.value : promo.value;
  return `You saved ${amount.toFixed(2)} with code ${cart.promo.toUpperCase()}.`;
}
