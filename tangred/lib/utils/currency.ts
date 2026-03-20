export const TAN_LEIDA_TOTAL_PAISE = 11682
export const GST_RATE = 0.18

export function formatPaise(value: number) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value / 100)
}

export function paiseToRupees(value: number) {
  return value / 100
}

export function rupeesToPaise(value: number) {
  return Math.round(value * 100)
}

export function calculateGSTFromPaise(value: number) {
  return Math.round(value * GST_RATE)
}
