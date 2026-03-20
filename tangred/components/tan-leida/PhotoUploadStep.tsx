'use client'

interface PhotoUploadStepProps {
  values: Record<string, string>
  onChange: (key: string, value: string) => void
  onSubmit: () => void
  loading: boolean
}

const slots = [
  ['casual', 'Casual / Everyday Look'],
  ['formal', 'Formal / Office Look'],
  ['fullBody', 'Full Body Shot'],
  ['ethnic', 'Ethnic / Traditional Look (optional)'],
] as const

export function PhotoUploadStep({ values, onChange, onSubmit, loading }: PhotoUploadStepProps) {
  return (
    <div className="space-y-5">
      <div className="grid gap-4 md:grid-cols-2">
        {slots.map(([key, label]) => (
          <label key={key} className="block border border-[#2A2A2A] bg-[#111111] p-4">
            <span className="mb-2 block text-xs uppercase tracking-[0.18em] text-[#A0A0A0]">{label}</span>
            <input
              className="input-luxury"
              value={values[key] ?? ''}
              onChange={(event) => onChange(key, event.target.value)}
              placeholder="Paste a Cloudinary or image URL"
            />
          </label>
        ))}
      </div>
      <div className="rounded-sm border border-[#2A2A2A] bg-black/20 p-4 text-sm text-[#A0A0A0]">
        By uploading photos, you confirm you own the likeness, consent to AI processing, and understand Tangred will use the images only for styling analysis and generated recommendations.
      </div>
      <button type="button" onClick={onSubmit} className="btn-red" disabled={loading}>
        {loading ? 'Analysing your photos…' : 'Save photos'}
      </button>
    </div>
  )
}
