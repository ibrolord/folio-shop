import { describe, it, expect } from 'vitest';
import { searchProducts } from '../src/catalog.js';

describe('reproduction', () => {
  it('matches regardless of case', () => {
    expect(searchProducts('NOTEBOOK').map((p) => p.id)).toContain('notebook');
  });
});
