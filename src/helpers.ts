export function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export function formatPrice(price: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price);
}
