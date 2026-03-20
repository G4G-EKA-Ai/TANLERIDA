import { Resend } from 'resend'
import { formatPaise } from '@/lib/utils/currency'
import { formatDisplayDate } from '@/lib/utils/date'
import { isConfigured } from '@/lib/utils/guards'

const FROM_EMAIL = process.env.FROM_EMAIL ?? 'noreply@tangred.in'

function getResendClient() {
  if (!isConfigured(process.env.RESEND_API_KEY)) {
    return null
  }

  return new Resend(process.env.RESEND_API_KEY)
}

async function sendEmail(params: { to: string; subject: string; html: string }) {
  const client = getResendClient()

  if (!client) {
    return { id: `mock-email-${Date.now()}`, ...params }
  }

  return client.emails.send({
    from: FROM_EMAIL,
    ...params,
  })
}

function frameEmail(title: string, body: string) {
  return `
    <div style="background:#0A0A0A;color:#F5F5F5;font-family:'DM Sans',Arial,sans-serif;padding:40px;max-width:640px;margin:0 auto;">
      <div style="border:1px solid #2A2A2A;padding:32px;background:#111111;">
        <p style="margin:0 0 8px;color:#C0392B;letter-spacing:0.3em;font-size:12px;text-transform:uppercase;">Tangred</p>
        <h1 style="margin:0 0 20px;font-family:'Cormorant Garamond',serif;font-size:40px;color:#F5F5F5;">${title}</h1>
        <div style="color:#A0A0A0;font-size:15px;line-height:1.8;">${body}</div>
      </div>
    </div>
  `
}

export function sendVerificationEmail(to: string, name: string, otp: string, expiresAt: Date) {
  return sendEmail({
    to,
    subject: `Verify your Tangred account — ${otp}`,
    html: frameEmail('Verify your account', `<p>Dear ${name},</p><p>Your Tangred verification code is <strong style="color:#C0392B;letter-spacing:0.2em;">${otp}</strong>.</p><p>It expires on ${formatDisplayDate(expiresAt)}.</p>`),
  })
}

export function sendPasswordResetEmail(to: string, name: string, otp: string, expiresAt: Date) {
  return sendEmail({
    to,
    subject: `Reset your Tangred password — ${otp}`,
    html: frameEmail('Reset your password', `<p>Dear ${name},</p><p>Your OTP is <strong style="color:#C0392B;letter-spacing:0.2em;">${otp}</strong>.</p><p>It expires on ${formatDisplayDate(expiresAt)}.</p>`),
  })
}

export function sendOrderConfirmationEmail(to: string, name: string, orderNumber: string, totalPaise: number) {
  return sendEmail({
    to,
    subject: `Order confirmed — ${orderNumber}`,
    html: frameEmail('Your Tangred order is confirmed', `<p>Dear ${name},</p><p>Your order <strong style="color:#C0392B;">${orderNumber}</strong> has been placed successfully.</p><p>Total paid: <strong>${formatPaise(totalPaise)}</strong>.</p>`),
  })
}

export function sendTanLeidaAccessEmail(to: string, name: string, tanLeidaId: string) {
  return sendEmail({
    to,
    subject: `Tan Leida access confirmed — ${tanLeidaId}`,
    html: frameEmail('Tan Leida access confirmed', `<p>Dear ${name},</p><p>Your Tan Leida access ID is <strong style="color:#C0392B;letter-spacing:0.2em;">${tanLeidaId}</strong>.</p>`),
  })
}

export function sendTanLeidaCompletionEmail(to: string, name: string, sessionCode: string) {
  return sendEmail({
    to,
    subject: `Tan Leida session ready — ${sessionCode}`,
    html: frameEmail('Your Tan Leida session is ready', `<p>Dear ${name},</p><p>Your bespoke recommendation for session <strong style="color:#C0392B;">${sessionCode}</strong> is ready in your Tangred account.</p>`),
  })
}
