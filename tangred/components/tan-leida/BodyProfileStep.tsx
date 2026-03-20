'use client'

interface BodyProfileStepProps {
  values: {
    gender: string
    ageRange: string
    heightCm: number
    bodyBuild: string
    skinTone: string
    resonance: string[]
  }
  onChange: (key: string, value: string | number | string[]) => void
  onSubmit: () => void
  loading: boolean
}

const resonanceOptions = ['Classic Professional', 'Contemporary Smart', 'Traditional Indian', 'Minimalist', 'Bold Statement']

export function BodyProfileStep({ values, onChange, onSubmit, loading }: BodyProfileStepProps) {
  const toggleResonance = (value: string) => {
    const next = values.resonance.includes(value)
      ? values.resonance.filter((item) => item !== value)
      : [...values.resonance, value]

    onChange('resonance', next)
  }

  return (
    <div className="space-y-5">
      <div className="grid gap-4 md:grid-cols-2">
        <input className="input-luxury" value={values.gender} onChange={(event) => onChange('gender', event.target.value)} placeholder="Gender" />
        <input className="input-luxury" value={values.ageRange} onChange={(event) => onChange('ageRange', event.target.value)} placeholder="Age range" />
        <input className="input-luxury" value={values.heightCm} onChange={(event) => onChange('heightCm', Number(event.target.value))} placeholder="Height in cm" type="number" />
        <input className="input-luxury" value={values.bodyBuild} onChange={(event) => onChange('bodyBuild', event.target.value)} placeholder="Body build" />
        <input className="input-luxury md:col-span-2" value={values.skinTone} onChange={(event) => onChange('skinTone', event.target.value)} placeholder="Skin tone" />
      </div>
      <div>
        <p className="mb-3 text-xs uppercase tracking-[0.18em] text-[#A0A0A0]">Style resonance</p>
        <div className="flex flex-wrap gap-3">
          {resonanceOptions.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => toggleResonance(option)}
              className={`border px-4 py-3 text-xs uppercase tracking-[0.16em] ${values.resonance.includes(option) ? 'border-[#C0392B] text-[#F5F5F5]' : 'border-[#2A2A2A] text-[#A0A0A0]'}`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
      <button type="button" onClick={onSubmit} className="btn-red" disabled={loading}>
        {loading ? 'Saving profile…' : 'Save profile'}
      </button>
    </div>
  )
}
