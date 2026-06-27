// Email validation for the Folio newsletter + checkout.

const EMAIL = /^[a-z0-9._-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;

export function isValidEmail(email) {
  return EMAIL.test(String(email).trim());
}
