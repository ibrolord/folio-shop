import { describe, it, expect } from 'vitest';
import { formatPrice } from '../public/src/format.js';

describe('formatPrice', () => {
  it('formats dollars and cents', () => {
    expect(formatPrice(50)).toBe('$50.00');
  });

  it('pads cents', () => {
    expect(formatPrice(45.5)).toBe('$45.50');
  });

  it('handles zero', () => {
    expect(formatPrice(0)).toBe('$0.00');
  });
});
