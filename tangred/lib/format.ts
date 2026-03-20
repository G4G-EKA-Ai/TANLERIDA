export function formatPrice(paise: number) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 2,
  }).format(paise / 100)
}

export function formatDate(input: Date | string) {
  const date = typeof input === 'string' ? new Date(input) : input
  return new Intl.DateTimeFormat('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(date)
}

export function formatDeliveryWindow(days: number) {
  return `Ships in ${days}–${days + 4} working days`
}

export function calculateGST(amount: number) {
  return Math.round(amount * 0.18)
}
