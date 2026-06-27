import { describe, it, expect } from 'vitest';
import { isValidEmail } from '../src/email.js';

describe('reproduction', () => {
  it('accepts plus-addressing', () => {
    expect(isValidEmail('priya+deals@folio.com')).toBe(true);
  });
});
