export function formatDisplayDate(input: Date | string) {
  const date = typeof input === 'string' ? new Date(input) : input
  return new Intl.DateTimeFormat('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(date)
}

export function formatDeliveryEstimate(leadTimeDays: number, startDate = new Date()) {
  const end = new Date(startDate)
  end.setDate(end.getDate() + leadTimeDays)

  return `Ready in ${leadTimeDays} working days · by ${formatDisplayDate(end)}`
}
