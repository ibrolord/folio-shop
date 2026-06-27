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
  const promo = PROMOS[cart.promo];
  const discount = promo
    ? promo.type === 'percent'
      ? sub * promo.value
      : promo.value
    : 0;
  const shipping = sub >= FREE_SHIPPING_THRESHOLD ? 0 : 5;
  const total = sub - discount;
  return { subtotal: sub, discount, shipping, total };
}
