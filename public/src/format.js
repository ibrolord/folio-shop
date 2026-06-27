// Currency formatting for the Folio storefront.

export function formatPrice(amount) {
  return '$' + Number(amount).toFixed(2);
}
