import { describe, it, expect } from 'vitest';
import { summarize } from '../src/pricing.js';

describe('reproduction', () => {
  it('SAVE10 takes 10% off the cart total', () => {
    const s = summarize({ items: [{ price: 25, qty: 2 }], promo: 'SAVE10' });
    expect(s.total).toBe(45);
  });
});
