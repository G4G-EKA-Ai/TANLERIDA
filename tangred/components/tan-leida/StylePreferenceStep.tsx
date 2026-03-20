'use client'

interface StylePreferenceStepProps {
  values: {
    need: string
    laptopSize: string
    structure: string
    budget: string
    occasion: string
    colours: string
  }
  onChange: (key: string, value: string) => void
  onSubmit: () => void
  loading: boolean
}

const prompts = [
  'What are you looking for today? A bag for your boardroom, a belt to complete your suit, or something else?',
  'Do you carry a laptop? What size — 13 inch or 15 inch? Do you prefer structured or slouchy?',
  'What budget range feels right for this piece?',
  'Is there a specific occasion or cadence of use?',
  'Any colours you prefer or would like to avoid?',
]

export function StylePreferenceStep({ values, onChange, onSubmit, loading }: StylePreferenceStepProps) {
  return (
    <div className="space-y-5">
      {prompts.map((prompt, index) => (
        <div key={prompt} className="rounded-sm border border-[#2A2A2A] bg-[#111111] p-5">
          <p className="font-display text-2xl text-[#F5F5F5]">{prompt}</p>
          {index === 0 ? <textarea className="input-luxury mt-4 min-h-28" value={values.need} onChange={(event) => onChange('need', event.target.value)} /> : null}
          {index === 1 ? (
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <input className="input-luxury" value={values.laptopSize} onChange={(event) => onChange('laptopSize', event.target.value)} placeholder="Laptop size" />
              <input className="input-luxury" value={values.structure} onChange={(event) => onChange('structure', event.target.value)} placeholder="Structured / slouchy" />
            </div>
          ) : null}
          {index === 2 ? <input className="input-luxury mt-4" value={values.budget} onChange={(event) => onChange('budget', event.target.value)} placeholder="Budget range" /> : null}
          {index === 3 ? <input className="input-luxury mt-4" value={values.occasion} onChange={(event) => onChange('occasion', event.target.value)} placeholder="Occasion or use case" /> : null}
          {index === 4 ? <input className="input-luxury mt-4" value={values.colours} onChange={(event) => onChange('colours', event.target.value)} placeholder="Preferred / avoided colours" /> : null}
        </div>
      ))}
      <button type="button" onClick={onSubmit} className="btn-red" disabled={loading}>
        {loading ? 'Saving preferences…' : 'Save preferences'}
      </button>
    </div>
  )
}
