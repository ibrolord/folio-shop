import { describe, it, expect } from 'vitest';
import { subtotal, summarize } from '../src/pricing.js';

const cart = (items, promo) => ({ items, promo });
const notebook = (qty) => ({ name: 'Everyday Notebook', price: 25, qty });

describe('subtotal', () => {
  it('sums price * qty', () => {
    expect(subtotal([notebook(2)])).toBe(50);
  });
});

describe('summarize', () => {
  it('charges no shipping at or above the free-shipping threshold', () => {
    expect(summarize(cart([notebook(2)])).shipping).toBe(0); // $50 subtotal
  });

  it('charges shipping below the threshold', () => {
    expect(summarize(cart([{ name: 'Pen', price: 30, qty: 1 }])).shipping).toBe(5);
  });

  it('keeps free shipping when a promo is applied to a $50 cart', () => {
    // a discount must not drop the order under the free-shipping threshold
    expect(summarize(cart([notebook(2)], 'SAVE10')).shipping).toBe(0);
  });
});
