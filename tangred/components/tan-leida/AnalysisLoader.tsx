'use client'

const messages = [
  'Tan Leida is studying your photographs…',
  'Analysing your body profile and style markers…',
  'Matching with the finest Tangred pieces…',
  'Crafting your personalised look…',
]

export function AnalysisLoader() {
  return (
    <div className="border border-[#2A2A2A] bg-[#111111] p-8 text-center">
      <div className="mx-auto h-16 w-16 rounded-full border border-[#C0392B] animate-pulse" />
      <h2 className="mt-6 font-heading text-3xl">Tan Leida is at work</h2>
      <div className="mt-6 space-y-3 text-sm text-[#A0A0A0]">
        {messages.map((message) => (
          <p key={message}>{message}</p>
        ))}
      </div>
    </div>
  )
}
