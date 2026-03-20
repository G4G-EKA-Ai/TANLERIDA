const ALPHANUMERIC = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'

function randomToken(length: number) {
  return Array.from({ length }, () => ALPHANUMERIC[Math.floor(Math.random() * ALPHANUMERIC.length)]).join('')
}

export function generateTanLeidaSessionCode() {
  return `TL-${randomToken(8)}`
}

export function generateTanLeidaId() {
  return `TL-${randomToken(8)}`
}

export function generateOtp(length = 6) {
  return Array.from({ length }, () => Math.floor(Math.random() * 10)).join('')
}

export function generateOrderNumber(sequence = Math.floor(Math.random() * 9999) + 1, date = new Date()) {
  const formattedDate = `${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, '0')}${String(date.getDate()).padStart(2, '0')}`
  return `TAN-${formattedDate}-${String(sequence).padStart(4, '0')}`
}
