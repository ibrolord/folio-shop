import { describe, it, expect } from 'vitest';
import { isValidEmail } from '../public/src/email.js';

describe('isValidEmail', () => {
  it('accepts a normal address', () => {
    expect(isValidEmail('priya@folio.com')).toBe(true);
  });

  it('accepts subdomains', () => {
    expect(isValidEmail('p@mail.folio.io')).toBe(true);
  });

  it('rejects junk', () => {
    expect(isValidEmail('not-an-email')).toBe(false);
  });

  it('rejects a missing domain', () => {
    expect(isValidEmail('p@')).toBe(false);
  });
});
