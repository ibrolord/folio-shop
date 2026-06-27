import { describe, it, expect } from 'vitest';
import { searchProducts } from '../src/catalog.js';

describe('searchProducts', () => {
  it('finds a product by a name fragment', () => {
    expect(searchProducts('Notebook').map((p) => p.id)).toContain('notebook');
  });

  it('returns nothing when there is no match', () => {
    expect(searchProducts('zzz')).toEqual([]);
  });
});
